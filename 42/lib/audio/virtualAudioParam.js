const DISPATCH_THROTTLE_MS = 100

const virtualAudioParams = new WeakMap()

export function getVirtualAudioParam(el) {
  return virtualAudioParams.get(el)
}

export function createVirtualAudioParam(el) {
  let currentValue = el.valueAsNumber
  let lastDispatchTime = 0
  let pendingTimeoutId

  const dispatchInput = () => {
    lastDispatchTime = performance.now()
    el.dataset.modulationUpdate = "1"
    el.dispatchEvent(new Event("input", { bubbles: true }))
    delete el.dataset.modulationUpdate
  }

  const param = {
    isVirtualParam: true,
    minValue: el.min === "" ? 0 : Number(el.min),
    maxValue: el.max === "" ? 100 : Number(el.max),
    defaultValue: el.valueAsNumber,
    onRangeChange: undefined,
    playhead: undefined,
    onPlayheadChange: undefined,
    setPlayhead(playhead) {
      param.playhead = playhead
      param.onPlayheadChange?.(playhead)
    },
    get value() {
      return currentValue
    },
    set value(v) {
      currentValue = v
    },
    cancelScheduledValues() {},
    setTargetAtTime(v) {
      param.value = v
    },
    applyModulatedValue(v) {
      const margin = (param.maxValue - param.minValue) * 0.001
      v = Math.min(
        param.maxValue - margin,
        Math.max(param.minValue + margin, v),
      )
      param.value = v
      el.valueAsNumber = v
      const elapsed = performance.now() - lastDispatchTime
      if (elapsed >= DISPATCH_THROTTLE_MS) {
        clearTimeout(pendingTimeoutId)
        pendingTimeoutId = undefined
        dispatchInput()
      } else if (!pendingTimeoutId) {
        pendingTimeoutId = setTimeout(() => {
          pendingTimeoutId = undefined
          dispatchInput()
        }, DISPATCH_THROTTLE_MS - elapsed)
      }
    },
  }

  new MutationObserver(() => {
    const min = el.min === "" ? 0 : Number(el.min)
    const max = el.max === "" ? 100 : Number(el.max)
    if (min === param.minValue && max === param.maxValue) return
    param.minValue = min
    param.maxValue = max
    param.onRangeChange?.(min, max)
  }).observe(el, { attributes: true, attributeFilter: ["min", "max"] })

  virtualAudioParams.set(el, param)

  return param
}
