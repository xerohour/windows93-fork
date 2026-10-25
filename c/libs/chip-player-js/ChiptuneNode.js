import { loadArrayBuffer } from "../../../42/api/load/loadArrayBuffer.js"
import { AudioProcessorNode } from "../../../42/lib/audio/AudioProcessorNode.js"
import { Emittable } from "../../../42/lib/class/mixin/Emittable.js"
import { defer } from "../../../42/lib/type/promise/defer.js"
import { MIDIFilePlayer } from "./players/MIDIPlayer/MIDIFilePlayer.js"
import { MIDIFile } from "../../../42/formats/midi/MIDIFile.js"
import { AudioClock } from "../../../42/lib/audio/AudioClock.js"

// Module-level (not per-instance) so it survives a codec being torn down
// and recreated when switching file types mid-session -- avoids
// re-downloading a soundfont over the network just because you played a
// VGM track in between two MIDI ones. This is a *network* cache: it never
// touches the WASM virtual FS (see MIDIPlayer.js's loadSoundfont(), which
// only ever keeps one soundfont mounted there at a time). Unbounded by
// entry count, bounded in practice by how many distinct soundfonts one
// session actually tries -- worth revisiting only if that stops holding.
const soundfontCache = new Map()

// chip-player-js upstream (the lineage this port is built from) runs its
// whole MIDI player on the main thread via a ScriptProcessorNode -- so a
// Web MIDI send is one direct, synchronous call: compute the timestamp,
// call output.send(message, timestamp), done. This port instead runs
// MIDIFilePlayer inside an AudioWorkletProcessor (ChiptuneProcessor.js,
// better for the FluidSynth/OPL3 rendering cases, which do need a
// dedicated audio thread) -- but Web MIDI output produces no audio at all
// (silent buffer, see ChiptuneProcessor.js's useWebMIDI branch), so
// there's nothing about it that actually needs the worklet. Routing its
// timing through there anyway means every single outgoing message needs a
// worklet -> postMessage -> main thread round trip, and the worklet
// itself -- rendering nothing audible -- has no guarantee from the
// browser that it keeps getting scheduled promptly.
//
// A second, independent MIDIFilePlayer instance here removes both of
// those: same clock this thread already runs on (performance.now(), no
// shimming/conversion needed), same call stack as the actual
// output.send(). The worklet's own MIDIFilePlayer keeps running
// completely unmodified alongside it -- it still owns file loading,
// duration/voiceNames metadata, and position tracking for the UI -- it
// just no longer needs to be the one actually dispatching Web MIDI
// messages, so its own attempts are ignored below (see "midiOut").
//
// What actually drives this instance's processPlay() calls is an
// AudioClock (same one Nimoloop uses, audio-thread-ticked, sample-accurate
// -- more reliable than a plain setInterval under main-thread load). Only
// the *tick* goes through AudioClock, though -- individual Web MIDI
// messages are still handed straight to output.send(message, timestamp),
// never to AudioClock.callbackAtTime(). That distinction matters: this
// port used to route every outgoing message itself through AudioClock,
// which silently *drops* an event once its deadline is more than
// toleranceLate (0.1s) in the past by the time it's checked, instead of
// just sending it late -- exactly the "notes never arrive, then a burst
// minutes later" failure this rewrite fixed. A late tick just calls
// processPlay() a little later than intended; processPlay() itself always
// computes a real, valid timestamp from however much time has actually
// passed, and the browser's native MIDI scheduler (not JS) is what
// delivers precisely from there -- nothing about a late tick can make a
// message vanish.
const WEB_MIDI_TICK_SECONDS = 0.015

// A <input type="range"> fires "input" on every micro-movement while being
// dragged -- often 30-60 times/second -- and each Mod Wheel/Pitch Bend
// change is a real MIDI CC sent on all 16 channels (see
// setPlayerParameter() below). Unthrottled, a couple hundred ms of
// dragging can queue hundreds of messages onto a real 31.25 kbaud wire,
// starving the actual note timing right behind it -- the same class of
// bug as the old 128-note panic() sweep, just from a UI source instead of
// a cleanup one. This is how often #sendLiveControllerThrottled() actually
// lets a send through; anything faster gets coalesced into one trailing
// send of the latest value once the window passes.
const LIVE_CONTROLLER_THROTTLE_MS = 50

export class ChiptuneNode extends Emittable(AudioProcessorNode) {
  static module = new URL(
    "./ChiptuneProcessor.js", //
    import.meta.url,
  ).href

  paused = true
  #currentTime = 0
  #currentTimeSab
  get currentTime() {
    return this.#currentTimeSab?.[0] ?? this.#currentTime
  }

  set currentTime(currentTime) {
    if (this.#currentTimeSab) {
      this.#currentTimeSab[0] = currentTime
    } else {
      this.#currentTime = currentTime
    }
    this.port.postMessage({ currentTime })
    this.#webMidiPlayer?.setPosition(currentTime * 1000)
  }

  /** @type {MIDIFilePlayer} Main-thread Web MIDI player -- see the comment
   * above this class for why this exists alongside the worklet's own. */
  #webMidiPlayer
  /** @type {AudioClock} Drives #webMidiPlayer's processPlay() tick. */
  #webMidiClock
  #webMidiDeviceIndex
  #trackUrl
  // Shared by every play()/#ensureWebMidiPlayer() call site that starts or
  // resumes #webMidiPlayer, instead of each re-declaring its own identical
  // closure.
  #webMidiEndCallback = () => {
    if (!this.stoppedFromGUI) this.emit("ended")
  }

  constructor(context, options) {
    const { type, soundfont, bufferSize: requestedBufferSize, ...parameterData } =
      options

    // Make sure bufferSize is at least baseLatency -- floored at 2048
    // samples (~46ms @ 44.1kHz) by default, inaudible for file playback
    // (MediaPlayer, every existing caller) since nothing there is
    // real-time-input-driven. A caller doing live/real-time input instead
    // (e.g. MidiXpander routing a physical MIDI IN device -- keypress to
    // sound felt directly, unlike a file already mid-playback) can pass
    // its own smaller bufferSize explicitly to opt out of that floor; this
    // computed default is unchanged for anyone who doesn't.
    const bufferSize =
      requestedBufferSize ??
      Math.max(
        2 **
          Math.ceil(
            Math.log2((context.baseLatency || 0.001) * context.sampleRate),
          ),
        2048,
      )

    // Loaded straight into the core at creation time -- callers (see
    // player.js's initChipPlayerCodec) should always pass the actually
    // desired soundfont. Without it, the core used to always start on this
    // hardcoded fallback regardless of what the caller wanted, then swap to
    // the right one moments later once requested separately: audible as a
    // brief flash of the wrong soundfont at the start of the first MIDI
    // track played in a session.
    const soundfontURL = import.meta.resolve(
      `./soundfonts/${soundfont ?? "gmgsx-plus.sf2"}`,
    )

    super(context, "chiptune", {
      numberOfInputs: 0,
      channelCountMode: "explicit",
      outputChannelCount: [2],
      processorOptions: { bufferSize, type, soundfontURL },
      parameterData,
    })

    this.type = type

    this.ready = defer()
    // Resolves once the worklet has actually constructed its player (core +
    // soundfont), independent of loadTrack() ever running -- `ready` above
    // only ever resolves from a track's first "playerStateUpdate"
    // (durationMs), which never fires for a node driven live (noteOn/
    // noteOff, no file loaded -- see MidiXpander's engine.js). Awaiting
    // `ready` in that usage would hang forever.
    this.coreReady = defer()

    this.port.addEventListener("message", ({ data }) => {
      if (data.coreReady) {
        // [{label, value}, ...] of real OPL3 bank names, or undefined for
        // a non-"midi" player type -- see ChiptuneProcessor.js's own
        // comment on why this rides along here rather than through the
        // normal paramDefs/playerStateUpdate relay.
        this.opl3Banks = data.opl3Banks
        this.coreReady.resolve()
      } else if (data.requestWasm) {
        loadArrayBuffer(import.meta.resolve("./chip-core.wasm")) //
          .then(async (arrayBuffer) => {
            let soundfontBuffer
            const transfers = [arrayBuffer]
            if (type === "midi") {
              const result = await this.loadSoundfontBuffer(soundfontURL)
              soundfontBuffer = result.buffer
              if (result.fellBack) this.soundfontFallback = "gmgsx-plus.sf2"
              transfers.push(soundfontBuffer)
            }
            this.port.postMessage(
              { createCore: arrayBuffer, soundfontBuffer },
              transfers,
            )
          })
      } else if (data.requestSoundfont) {
        this.loadSoundfontBuffer(soundfontURL).then(({ buffer, fellBack }) => {
          if (fellBack) this.soundfontFallback = "gmgsx-plus.sf2"
          this.port.postMessage({ createCore: true, soundfontBuffer: buffer }, [
            buffer,
          ])
        })
      } else if (data.event) {
        if (data.event.type === "playerStateUpdate") {
          if (data.event.data.isStopped) {
            // The worklet's own MIDIFilePlayer keeps running in parallel
            // purely for position/UI tracking while the main-thread Web
            // MIDI player is active (see the big comment atop this class),
            // so it reaches end-of-track around the same time too -- its
            // own endCallback (#webMidiEndCallback) is the authoritative
            // "ended" signal in that case; emitting here too would fire it
            // twice for one track.
            if (!this.stoppedFromGUI && !this.#webMidiPlayer) this.emit("ended")
            this.stoppedFromGUI = false
          } else if (data.event.data.durationMs) {
            this.state = data.event.data
            this.duration = data.event.data.durationMs / 1000
            this.ready.resolve()
            this.emit("state", this.state)
          } else if (this.state) {
            // Partial update, e.g. a mid-song program-change event that
            // only carries fresh voiceNames -- merge rather than replace.
            Object.assign(this.state, data.event.data)
            this.emit("state", this.state)
          }
        } else if (data.event.type === "crashed") {
          this.emit("crashed", data.event.data)
        }
      } else if (data.initSAB) {
        this.#currentTimeSab = new Float64Array(data.initSAB)
      } else if (data.requestMidiAccess) {
        this.ensureWebMidi().catch((err) => {
          console.warn("Web MIDI access failed:", err)
        })
      } else if (data.midiOut) {
        // The worklet's own MIDIFilePlayer still runs processPlay() (kept
        // for its position/duration/voiceNames tracking -- see the big
        // comment above this class), which still calls send() -> tries to
        // get here -- but once the main-thread player exists it's the one
        // actually driving output, so these are stale duplicates. Without
        // this, both would send the same note.
        if (this.#webMidiPlayer) return
        const { deviceIndex, message, timestamp } = data.midiOut
        const output = this.midiOutputs?.[deviceIndex]
        if (!output) return
        // timestamp (when present) is in audioContext.currentTime seconds --
        // see MIDIPlayer.js's midiDevices proxy. The Web MIDI API's own
        // send(data, timestamp) expects a DOMHighResTimeStamp instead (same
        // unit/origin as performance.now(), a different clock). Both clocks
        // are monotonic with a fixed relative offset, captured once in
        // ensureWebMidi() below (this.performanceEpochOffset).
        //
        // Passed straight to the browser's own native MIDI scheduler, with
        // no JS-side clock in between -- matching chip-player-js upstream
        // (the same lineage this port is built from) exactly: its send()
        // is `this.output.send(message, timestamp)`, nothing else. This
        // replaces an AudioClock-based scheduler that silently *dropped*
        // any message whose deadline had passed its tolerance window by the
        // time it was checked ("event expired" in console, message never
        // sent) instead of just sending it late -- upstream's callers rely
        // on exactly that graceful "late is fine" native behavior (e.g.
        // panic() scheduled at `lastSendTimestamp + 10`, routinely stale
        // after any pause), which is harmless for them but was silently
        // losing messages here.
        try {
          if (typeof timestamp === "number") {
            output.send(message, timestamp * 1000 + this.performanceEpochOffset)
          } else {
            // panic()/reset() fire without a timestamp -- no precise timing
            // to begin with, send as soon as possible.
            output.send(message)
          }
        } catch (err) {
          console.warn("MIDIOutput.send() failed:", err, message)
        }
      }
    })

    this.port.start()
  }

  async loadTrack(url) {
    if (!url) return
    this.#trackUrl = url
    // A fresh deferred per track: this.ready is resolved once by the
    // worklet's first "playerStateUpdate" after loading -- reusing the
    // same one across tracks would resolve instantly on reload, before
    // this.state (voiceNames/voiceMask/duration) reflects the new track.
    this.ready = defer()
    await loadArrayBuffer(url).then((arrayBuffer) => {
      this.port.postMessage({ track: { arrayBuffer, url } }, [arrayBuffer])
    })

    await this.ready

    if (this.#webMidiPlayer) {
      const player = this.#webMidiPlayer
      await this.#loadWebMidiTrack(url)
      // A track switch while Web MIDI is already the active engine (e.g.
      // advancing to the next track) -- matches MIDIPlayer.js's own
      // loadData(), which always starts a freshly loaded track playing.
      if (this.#webMidiPlayer === player) player.play(this.#webMidiEndCallback)
    }
  }

  /**
   * Switch to a different subsong within the already-loaded track (e.g.
   * GME formats like .gbs/.nsf/.spc, which bundle many subtunes in one
   * file) -- no re-fetch/re-parse, the worklet's player just restarts
   * playback from this index into data it already has open. See
   * GMEPlayer.playSubtune(), the only Player subclass that currently does
   * anything with this (every other type's base Player.getNumSubtunes()
   * stays at 1, so player.js/MediaPlayer.js never have a reason to call
   * this there).
   * @param {number} subtune
   */
  playSubtune(subtune) {
    this.port.postMessage({ playSubtune: subtune })
  }

  /**
   * Fetches and parses `url` into the main-thread Web MIDI player -- a
   * completely separate fetch/parse from loadTrack()'s own (which
   * transfers its ArrayBuffer to the worklet, neutering this thread's
   * reference to it -- there's nothing left here to reuse).
   * @param {string} url
   */
  async #loadWebMidiTrack(url) {
    const arrayBuffer = await loadArrayBuffer(url)
    const midiFile = new MIDIFile(new Uint8Array(arrayBuffer))
    this.#webMidiPlayer.load(midiFile)
  }

  /**
   * Fetched buffers get transferred (not copied) to the worklet via
   * postMessage, which neuters this thread's reference -- so the cache
   * keeps the pristine "master" ArrayBuffer and always hands out a fresh
   * .slice(0) copy to transfer away, never the master itself.
   * @param {string} url
   */
  async fetchSoundfont(url) {
    const cached = soundfontCache.get(url)
    if (cached) return cached.slice(0)
    const master = await loadArrayBuffer(url)
    soundfontCache.set(url, master)
    return master.slice(0)
  }

  /**
   * Fetches a soundfont, falling back to the app default if the requested
   * one 404s (e.g. it was moved/deleted on disk since it was last
   * selected/persisted) -- otherwise a stale soundfont reference breaks
   * track loading entirely instead of just falling back to something that
   * works.
   * @param {string} url
   */
  async loadSoundfontBuffer(url) {
    const fallbackURL = import.meta.resolve("./soundfonts/gmgsx-plus.sf2")
    try {
      return { buffer: await this.fetchSoundfont(url), fellBack: false }
    } catch (err) {
      if (url === fallbackURL) throw err
      console.warn(`Soundfont not found (${url}), falling back to default.`, err)
      return { buffer: await this.fetchSoundfont(fallbackURL), fellBack: true }
    }
  }

  /**
   * Applies an already-fetched soundfont buffer (MIDI only), without
   * recreating the node or interrupting playback. Split out from
   * setSoundfont() so a caller can await the (possibly slow, over a
   * network) fetch step separately -- the currently-loaded soundfont keeps
   * playing normally throughout that wait -- and only needs to account for
   * this step's own (fast, bounded: the buffer's already in memory) timing,
   * e.g. to duck audio around it without ducking through the whole fetch.
   * @param {string} url
   * @param {ArrayBuffer} buffer
   * @param {boolean} [fellBack]
   */
  applySoundfontBuffer(url, buffer, fellBack = false) {
    if (this.type !== "midi") return
    const value = fellBack ? "gmgsx-plus.sf2" : url.split("/").pop()
    this.port.postMessage({ setSoundfont: { value, buffer } }, [buffer])
  }

  /**
   * Switch the soundfont used by the softsynth (MIDI only), without
   * recreating the node or interrupting playback. Fetches then applies in
   * one step -- see loadSoundfontBuffer()/applySoundfontBuffer() to control
   * the two phases separately.
   * @param {string} url
   */
  async setSoundfont(url) {
    if (this.type !== "midi") return
    const { buffer, fellBack } = await this.loadSoundfontBuffer(url)
    this.applySoundfontBuffer(url, buffer, fellBack)
  }

  /**
   * Mute/unmute individual voices/channels, by index into
   * this.state.voiceNames/voiceMask. Generic across player types (MIDI,
   * VGM, ...) -- every Player subclass implements its own get/setVoiceMask.
   * @param {boolean[]} voiceMask
   */
  setVoiceMask(voiceMask) {
    if (this.state) this.state.voiceMask = voiceMask
    this.port.postMessage({ setVoiceMask: voiceMask })
    // voiceMask is indexed by position in the *active* channels list (not
    // by raw MIDI channel 0-15 -- a file rarely uses all 16), same mapping
    // MIDIPlayer.js's own setVoiceMask() uses against its activeChannels.
    if (this.#webMidiPlayer) {
      let i = 0
      for (let ch = 0; ch < 16; ch++) {
        if (!this.#webMidiPlayer.getChannelInUse(ch)) continue
        this.#webMidiPlayer.setChannelMute(ch, voiceMask[i] === false)
        i++
      }
    }
  }

  /**
   * Switch the synth engine (0 = SoundFont/FluidLite, 1 = Adlib/OPL3,
   * 2 = Web MIDI device). Triggers the Web MIDI permission bridge below
   * when switching to 2, since the worklet itself has no navigator.
   * @param {number} value
   */
  setSynthEngine(value) {
    if (this.type !== "midi") return
    this.port.postMessage({ setSynthEngine: value })
    if (value === 2) {
      this.#ensureWebMidiPlayer().catch((err) => {
        console.warn("Web MIDI (main-thread player) setup failed:", err)
      })
    } else {
      this.#teardownWebMidiPlayer()
    }
  }

  /** @param {number} value */
  setOpl3Bank(value) {
    if (this.type !== "midi") return
    this.port.postMessage({ setOpl3Bank: value })
  }

  /** @param {number} index */
  setMidiDevice(index) {
    if (this.type !== "midi") return
    this.port.postMessage({ setMidiDevice: index })
    // `index` is into the worklet's own MIDIPlayer.js's `midiDevices`
    // array, which has a dummy placeholder at 0 (real devices start at 1
    // there -- see its own "TODO: remove if removing Dummy Device"). This
    // thread's `midiOutputs` has no such dummy -- real devices start at 0
    // -- so it needs the -1 to land on the same real device.
    this.#webMidiDeviceIndex = index - 1
  }

  async #ensureWebMidiPlayer() {
    if (this.#webMidiPlayer) return
    // The worklet's own MIDIPlayer.setMidiDeviceNames() defaults its
    // internal device index to 1 the moment the device list arrives (see
    // "TODO: remove if removing Dummy Device" there) entirely on its own
    // -- it's an internal call, never relayed back to this thread. Without
    // this, #webMidiDeviceIndex would stay undefined (every send() a
    // silent no-op) until the user explicitly re-picks a device in the
    // Settings dropdown, since setMidiDevice() below is only ever called
    // from that dropdown's change handler or from a persisted-preference
    // match on load (see applyPersistedMidiDevice() in settings/midi.js,
    // which skips calling it at all when there's no persisted device name
    // yet to match). Match that default here -- but 0, not 1: this
    // thread's own midiOutputs has no dummy-device placeholder at 0 the
    // way the worklet's midiDevices does, so index 0 here is the same
    // real first device as index 1 there.
    this.#webMidiDeviceIndex ??= 0
    const player = (this.#webMidiPlayer = new MIDIFilePlayer({
      skipSilence: false,
      sampleRate: this.context.sampleRate,
      // Required (called unconditionally from handleProgramChange(), see
      // summarizeMidiEvents()) -- a no-op here since voiceNames/UI
      // metadata still comes from the worklet's own instance, unaffected
      // by this one.
      programChangeCb: () => {},
      output: {
        // Real performance.now() throughout -- this instance never runs in
        // a worklet, so unlike the shimmed clock in ChiptuneProcessor.js,
        // there's no conversion needed between what processPlay() computes
        // and what MIDIOutput.send()'s own timestamp expects.
        send: (message, timestamp) => {
          const output = this.midiOutputs?.[this.#webMidiDeviceIndex]
          if (!output) return
          try {
            output.send(message, timestamp)
          } catch (err) {
            console.warn("MIDIOutput.send() failed:", err, message)
          }
        },
      },
    }))
    player.useWebMIDI = true

    if (this.#trackUrl) await this.#loadWebMidiTrack(this.#trackUrl)
    // #teardownWebMidiPlayer() may have already run (engine switched away
    // again) while the await above was in flight -- don't resurrect it.
    if (this.#webMidiPlayer !== player) return

    // A fresh instance always starts at position 0 after load() -- for a
    // mid-track engine switch (the worklet's own MIDIFilePlayer has been
    // tracking position the whole time regardless of which engine was
    // actually producing sound, see this.currentTime), catch this one up
    // to the same point instead of restarting the track from the top.
    // play() itself only knows how to start from 0 (position !== 0 makes
    // it a no-op), so seek first, then resume directly.
    if (this.currentTime > 0) {
      player.endCallback = this.#webMidiEndCallback
      player.setPosition(this.currentTime * 1000)
      if (!this.paused) player.resume()
    } else if (!this.paused) {
      player.play(this.#webMidiEndCallback)
    }

    if (!this.#webMidiClock) {
      // Same AudioClock Nimoloop uses -- audio-thread-ticked, so this
      // stays on schedule under main-thread load the way a plain
      // setInterval wouldn't. Used only to drive the tick, though -- see
      // the big comment atop this class for why individual messages never
      // go through AudioClock.callbackAtTime() the way they used to.
      this.#webMidiClock = new AudioClock(this.context)
      await this.#webMidiClock.init()
      // #teardownWebMidiPlayer() may have run again while init() awaited.
      if (this.#webMidiPlayer !== player) return
    }
    this.#webMidiClock.start()
    this.#webMidiClock
      .setTimeout(
        () => this.#webMidiPlayer?.processPlay(),
        WEB_MIDI_TICK_SECONDS,
      )
      .repeat(WEB_MIDI_TICK_SECONDS)
  }

  #teardownWebMidiPlayer() {
    if (!this.#webMidiPlayer) return
    this.#webMidiClock?.stop()
    this.#webMidiPlayer.stop()
    this.#webMidiPlayer = undefined
  }

  /**
   * Playback speed. Generic across player types -- both MIDIPlayer and
   * VGMPlayer implement setTempo(), each clamping to their own engine's
   * valid range.
   * @param {number} value
   */
  setTempo(value) {
    this.port.postMessage({ setTempo: value })
    this.#webMidiPlayer?.setSpeed(Number.parseFloat(value))
  }

  /** @param {number} value Semitones, -12 to +12. */
  setTranspose(value) {
    if (this.type !== "midi") return
    this.port.postMessage({ setTranspose: value })
    this.#webMidiPlayer?.setTranspose(value)
  }

  /**
   * Mirrors the player's own volume onto real MIDI Device output, which
   * bypasses this node's GainNode entirely (sound comes from the external
   * synth, not from this app's audio graph).
   * @param {number} value 0-1.
   */
  setMidiVolume(value) {
    if (this.type !== "midi") return
    this.port.postMessage({ setMidiVolume: value })
    this.#webMidiPlayer?.setMasterVolume(value)
  }

  /**
   * Generic passthrough to a player's own custom paramDefs, for params
   * that aren't common enough across player types to earn a dedicated
   * setXyz() method (e.g. XMPPlayer's "interpolation"). "modwheel" and
   * "pitchbend" (the only two the Web MIDI player also understands, via
   * its own setLiveController()) are mirrored to it; anything else is
   * softsynth-only paramDefs it has no use for.
   * @param {string} id
   * @param {*} value
   */
  setPlayerParameter(id, value) {
    this.port.postMessage({ setPlayerParameter: { id, value } })
    if ((id === "modwheel" || id === "pitchbend") && this.#webMidiPlayer) {
      this.#sendLiveControllerThrottled(id, Number.parseInt(value, 10))
    }
  }

  #liveControllerThrottle = new Map()
  /** @param {"modwheel"|"pitchbend"} id @param {number} value */
  #sendLiveControllerThrottled(id, value) {
    let state = this.#liveControllerThrottle.get(id)
    if (!state) {
      state = { lastSent: -Infinity, timer: undefined, pending: undefined }
      this.#liveControllerThrottle.set(id, state)
    }
    state.pending = value
    const elapsed = performance.now() - state.lastSent
    if (elapsed >= LIVE_CONTROLLER_THROTTLE_MS) {
      state.lastSent = performance.now()
      this.#webMidiPlayer.setLiveController(id, value)
    } else if (!state.timer) {
      // Only ever one trailing send in flight per controller -- reads
      // state.pending fresh when it fires, not a captured `value`, so
      // several throttled updates in a row still collapse into a single
      // send of whatever the slider's latest position actually was.
      state.timer = setTimeout(() => {
        state.timer = undefined
        state.lastSent = performance.now()
        this.#webMidiPlayer?.setLiveController(id, state.pending)
      }, LIVE_CONTROLLER_THROTTLE_MS - elapsed)
    }
  }

  /** @param {number} value 0-1. */
  setReverb(value) {
    if (this.type !== "midi") return
    this.port.postMessage({ setReverb: value })
  }

  /** @param {number} value 0-1. */
  setChorus(value) {
    if (this.type !== "midi") return
    this.port.postMessage({ setChorus: value })
  }

  /** @param {number} value 4-256. */
  setPolyphony(value) {
    if (this.type !== "midi") return
    this.port.postMessage({ setPolyphony: value })
    this.#webMidiPlayer?.setPolyphonyLimit(Number.parseInt(value, 10))
  }

  /** @param {number} value 0-1, 0 = off. */
  setHumanize(value) {
    if (this.type !== "midi") return
    this.port.postMessage({ setHumanize: value })
    this.#webMidiPlayer?.setHumanize(Number.parseFloat(value))
  }

  /** @param {string} value Scale name, e.g. "Chromatic". */
  setScaleName(value) {
    if (this.type !== "midi") return
    this.port.postMessage({ setScaleName: value })
    this.#webMidiPlayer?.setScaleName(value)
  }

  /** @param {number} value MIDI pitch class, 0-11 (0 = C). */
  setScaleRoot(value) {
    if (this.type !== "midi") return
    this.port.postMessage({ setScaleRoot: value })
    this.#webMidiPlayer?.setScaleRoot(Number.parseInt(value, 10))
  }

  /** @param {number} value 0-100, percent chance per Note On. */
  setDrunk(value) {
    if (this.type !== "midi") return
    this.port.postMessage({ setDrunk: value })
    this.#webMidiPlayer?.setDrunk(Number.parseFloat(value))
  }

  /** Sends a General MIDI Reset sysex and resets all controllers. */
  resetGm() {
    if (this.type !== "midi") return
    this.port.postMessage({ gmReset: true })
    this.#webMidiPlayer?.reset()
  }

  /**
   * Live note injection straight into this instance's synth, bypassing
   * loadTrack()'s file-driven sequencer entirely -- for driving this node
   * from a live source (e.g. MidiXpander routing a physical MIDI IN
   * device) instead of playing a loaded .mid file. Remember to call play()
   * once after creating the node: the worklet starts paused
   * (processorOptions.paused defaults to true) and renders no audio, hence
   * no sound, until it isn't. Raw MIDI values throughout: velocity/
   * program/controller/value 0-127, pitchBend 0-16383 (14-bit).
   *
   * Fires immediately -- no scheduled lookahead. Reverted here after two
   * scheduled attempts (5ms, then the "textbook" 25ms Chris Wilson figure)
   * both failed live testing -- the 25ms version was a clear regression
   * (audible crackling, not just imprecise timing), so this is rolled back
   * to the simplest version rather than tuned further blind. Matches OBXD
   * (a WAM synth in this same OS, confirmed stable on live MIDI from the
   * same Ableton source): immediate, unscheduled, port.postMessage() on
   * arrival straight into an immediate DSP call in the worklet's own
   * onmessage. The underlying instability this was meant to fix is still
   * unresolved -- see MidiXpander's project notes for where that
   * investigation stands.
   */
  noteOn(channel, note, velocity) {
    if (this.type !== "midi") return
    this.port.postMessage({ noteOn: { channel, note, velocity } })
  }

  noteOff(channel, note) {
    if (this.type !== "midi") return
    this.port.postMessage({ noteOff: { channel, note } })
  }

  programChange(channel, program) {
    if (this.type !== "midi") return
    this.port.postMessage({ programChange: { channel, program } })
  }

  controlChange(channel, controller, value) {
    if (this.type !== "midi") return
    this.port.postMessage({ controlChange: { channel, controller, value } })
  }

  pitchBend(channel, value) {
    if (this.type !== "midi") return
    this.port.postMessage({ pitchBend: { channel, value } })
  }

  /** Releases any note currently ringing on every channel. */
  panic() {
    if (this.type !== "midi") return
    this.port.postMessage({ panic: true })
  }

  /**
   * Web MIDI (navigator.requestMIDIAccess) only exists on the main thread
   * -- AudioWorkletGlobalScope has no navigator at all. This holds the
   * real MIDIOutput objects here and only sends their names to the
   * worklet; the worklet's MIDIFilePlayer output.send() calls come back
   * through the "midiOut" message above and get dispatched from here.
   */
  async ensureWebMidi() {
    if (this.midiAccess) return this.midiAccess
    // Constant offset between the two clocks a Web MIDI send needs to
    // straddle: this.context.currentTime (seconds, what the worklet's
    // events are timed against) and performance.now() (ms, what
    // MIDIOutput.send()'s own timestamp parameter expects). Both are
    // monotonic clocks ticking at the same rate, so one snapshot here is
    // all that's needed -- see the "midiOut" handler above for where it's
    // applied.
    this.performanceEpochOffset = performance.now() - this.context.currentTime * 1000
    this.midiAccess = await navigator.requestMIDIAccess({ sysex: true })
    this.midiOutputs = [...this.midiAccess.outputs.values()]
    this.port.postMessage({
      midiDevices: this.midiOutputs.map((o) => o.name),
    })
    return this.midiAccess
  }

  async play() {
    this.paused = false
    this.port.postMessage({ paused: false })
    const player = this.#webMidiPlayer
    if (player?.paused) {
      if (player.position === 0) player.play(this.#webMidiEndCallback)
      else player.togglePause()
    }
  }

  pause() {
    this.paused = true
    this.port.postMessage({ paused: true })
    if (this.#webMidiPlayer && !this.#webMidiPlayer.paused) {
      this.#webMidiPlayer.togglePause()
    }
  }

  stop(options) {
    this.paused = true
    this.port.postMessage({ paused: true })
    if (this.#webMidiPlayer) {
      this.#webMidiPlayer.stop()
      this.#webMidiPlayer.position = 0
      this.#webMidiPlayer.elapsedTime = 0
    }
    if (options?.ended) return
    this.stoppedFromGUI = true
    this.port.postMessage({ stopPlayer: true })
  }
}
