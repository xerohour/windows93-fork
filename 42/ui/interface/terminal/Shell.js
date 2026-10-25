/* eslint-disable no-eval */
/* eslint-disable complexity */

// https://github.com/xtermjs/xtermjs.org/blob/master/js/demo.js#L111

import { os } from "../../../api/os.js"
import { keep } from "../../../api/keep.js"
import { parseExec } from "../../../api/os/exec.js"
import { joinPath } from "../../../lib/syntax/path/joinPath.js"
import { resolvePath } from "../../../lib/syntax/path/resolvePath.js"
import { stringify } from "../../../lib/type/any/stringify.js"
import { ansi } from "../../../api/log/ansi.js"
import { highlight } from "../../../api/log/formatters/highlight.js"
import { expandEnvVariables } from "../../../api/os/expandEnvVariables.js"
import { displayError } from "../../../api/log/displayError.js"

const stripAnsi = (str) =>
  str.replaceAll(
    // eslint-disable-next-line no-control-regex
    /[\u001b\u009b][#();?[]*(?:\d{1,4}(?:;\d{0,4})*)?[\d<=>A-ORZcf-nqry]/g,
    "",
  )

class Stream {
  constructor() {
    this.data = []
    this.closed = false
  }

  onData(callback) {
    this.callback = callback
    this.drain()
  }

  drain() {
    while (this.data.length > 0) {
      const args = this.data.shift()
      this.callback(...args)
    }
  }

  unbind() {
    this.callback = null
  }

  onClosed(callback) {
    this.closedCallback = callback
    if (this.closed) this.closedCallback()
  }

  close() {
    this.closed = true
    if (this.closedCallback) this.closedCallback()
  }

  write(...args) {
    this.data.push(args)
    if (this.callback) this.drain()
  }

  writeln(string) {
    this.write(string + "\n")
  }

  pipe(emitter) {
    this.callback = emitter.emit
  }

  get dataAsString() {
    const parts = []
    this.data.forEach((part) => parts.push(part[0]))
    return parts.join("\n")
  }
}

const CURSOR_DEL = "\b \b"
const CURSOR_UP = "\x1B[A"
const CURSOR_DOWN = "\x1B[B"
const CURSOR_RIGHT = "\x1B[C"
const CURSOR_LEFT = "\x1B[D"
const CURSOR_HOME = "\x1B[H"
const CURSOR_END = "\x1B[F"
const END_OF_TEXT = "\x03"
const SHIFT_TAB = "\x1B[Z"

const SUCCESS = 0
const ERROR = 1
const MISUSE_OF_SHELL_BUILTINS = 2 // (e.g., invalid options, missing arguments)
const COMMAND_NOT_FOUND = 127 // 126
const INVALID_ARGUMENT_TO_EXIT = 128
const SCRIPT_TERMINATED_BY_CTRL_C = 130
const EXIT_STATUS_OUT_OF_RANGE = 255 // (exit codes are typically limited to the range 0-255)

function formatList(list, options) {
  const cols = options?.cols ?? 60
  const sp = options?.space ?? " "
  const comma = options?.comma ?? ","

  const lines = []
  let line = ""

  for (const item of list) {
    if (line.length + item.length + sp.length + comma.length > cols) {
      lines.push(line)
      line = ""
    }

    if (line) line += sp
    line += item + comma
  }

  if (line) lines.push(line)

  lines[lines.length - 1] = lines.at(-1).slice(0, -1)

  return lines.join("\n")
}

/**
 * @typedef {{shell: Shell, _: string[]}} CommandOptions
 */

const builtins = {
  /** @param {CommandOptions} param0 */
  clear: ({ shell }) => shell.clear(),

  /** @param {CommandOptions} param0 */
  pwd: ({ shell }) => {
    shell.stdout.writeln(shell.cwd)
  },

  /** @param {CommandOptions} param0 */
  echo: ({ shell, _ }) => {
    shell.stdout.writeln(_.map((str) => shell.expandVariables(str)).join(" "))
  },

  /** @param {CommandOptions} param0 */
  ls: ({ shell }) => {
    shell.stdout.writeln(
      os.fileIndex
        .readDir(shell.cwd)
        .map((path) =>
          path.endsWith("/")
            ? `\x1b[36m\x1b[1m${path.slice(0, -1)}\x1b[0m`
            : path,
        )
        .join("\r\n"),
    )
  },

  /** @param {CommandOptions} param0 */
  cd: ({ shell, _ }) => {
    if (_.length === 0) {
      shell.cwd = shell.env.HOME
      return SUCCESS
    }

    if (_[0] === "-") {
      shell.cwd = shell.env.OLDPWD
      return SUCCESS
    }

    let target = shell.expandVariables(_[0])
    let path = resolvePath(shell.cwd, target)

    for (let n = 1; !os.fileIndex.has(path) && n < _.length; n++) {
      target = shell.expandVariables(_.slice(0, n + 1).join(" "))
      path = resolvePath(shell.cwd, target)
    }

    if (os.fileIndex.isDir(path)) {
      shell.cwd = path
      return SUCCESS
    }

    shell.stderr.writeln(
      ansi(
        os.fileIndex.has(path)
          ? `{redBright cd: Not a directory: ${target}}`
          : `{redBright cd: No such file or directory: ${target}}`,
      ),
    )

    return ERROR
  },

  /** @param {CommandOptions} param0 */
  cat: async ({ shell, _ }) => {
    if (_.length > 0) {
      const undones = []
      for (const item of _) {
        const path = joinPath(shell.cwd, item)
        undones.push(os.fs.readText(path))
      }

      try {
        for (const data of await Promise.all(undones)) {
          shell.stdout.writeln(data)
        }
      } catch (err) {
        shell.stderr.writeln(ansi(`{redBright cat: ${err.message}}`))
        return ERROR
      }
    } else {
      return new Promise((resolve) => {
        shell.stdin.onData((data) => {
          if (data === END_OF_TEXT) resolve(SUCCESS)
          else if (data === "\r") shell.stdout.write("\r\n")
          else shell.stdout.write(data)
        })
      })
    }
  },

  /** @param {CommandOptions} param0 */
  open: async ({ shell, _, ...flags }) => {
    if (_.length > 0) {
      const paths = []
      for (const item of _) {
        paths.push(joinPath(shell.cwd, item))
      }

      os.apps.open(paths, flags)
    }
  },

  /** @param {CommandOptions} param0 */
  help: ({ shell }) => {
    const { cols } = shell.term
    const commands = []
    const apps = []

    for (const { command, terminal } of Object.values(os.apps.value)) {
      if (terminal) commands.push(command)
      else apps.push(command)
    }

    let help = ""

    help += "{cyan Builtins:}\n"
    help += formatList(Object.keys(shell.builtins).sort(), { cols })

    if (commands.length > 0) {
      help += "\n\n{cyan Commands:}\n"
      help += formatList(commands.sort(), { cols })
    }

    if (apps.length > 0) {
      help += "\n\n{cyan Desktop Programs:}\n"
      help += formatList(apps.sort(), { cols })
    }

    shell.stdout.writeln(ansi(help))
  },
}

// builtins["do a barrel roll"] = ({ shell }) => {
//   console.log("do a barrel roll")
//   shell.stdout.writeln(ansi("--- YEP ---"))
// }

export class Shell {
  CURSOR_DEL = CURSOR_DEL
  CURSOR_UP = CURSOR_UP
  CURSOR_DOWN = CURSOR_DOWN
  CURSOR_RIGHT = CURSOR_RIGHT
  CURSOR_LEFT = CURSOR_LEFT
  CURSOR_HOME = CURSOR_HOME
  CURSOR_END = CURSOR_END
  END_OF_TEXT = END_OF_TEXT

  SUCCESS = SUCCESS
  ERROR = ERROR
  MISUSE_OF_SHELL_BUILTINS = MISUSE_OF_SHELL_BUILTINS
  COMMAND_NOT_FOUND = COMMAND_NOT_FOUND
  INVALID_ARGUMENT_TO_EXIT = INVALID_ARGUMENT_TO_EXIT
  SCRIPT_TERMINATED_BY_CTRL_C = SCRIPT_TERMINATED_BY_CTRL_C
  EXIT_STATUS_OUT_OF_RANGE = EXIT_STATUS_OUT_OF_RANGE

  constructor(term, options) {
    this.term = term
    this.prompt = options?.prompt
      ? () => this.expandVariables(options.prompt.call(this, this))
      : () => "$ "

    this.line = ""
    this.position = 0
    this.history = []
    this.status = SUCCESS

    /** @type {any} */
    this.env = Object.defineProperties(
      {},
      Object.getOwnPropertyDescriptors(os.env),
    )

    this.env.OLDPWD = this.env.PWD

    this.builtins = options?.builtins ?? builtins
    this.aliases = options?.aliases

    this.stdin = new Stream()
    this.stdout = new Stream()
    this.stderr = new Stream()

    this.init(options)
  }

  get cwd() {
    return this.env.PWD
  }

  set cwd(dir) {
    this.env.OLDPWD = this.env.PWD
    this.env.PWD = dir
  }

  init(options) {
    const out = (data) => {
      if (typeof data === "string") data = data.replaceAll("\n", "\r\n")
      this.term.write(data)
    }

    this.stdout.onData(out)
    this.stderr.onData(out)

    this.stdin.onData((data) => this.handleData(data))
    this.term.onData((data) => this.stdin.write(data))

    this.sessionCommands = []
    keep("~/config/terminal/history.json5", { commands: [] }).then((store) => {
      this.history = [...new Set([...this.history, ...store.commands])]
    })
    options?.signal?.addEventListener("abort", () => this.persistHistory())

    if (options?.exec) this.exec(options?.exec, { linebreak: false })
    else if (options?.greet) {
      this.term.write(
        ansi(this.expandVariables(options.greet).replaceAll("\n", "\n\r")),
      )
      this.term.write(this.prompt())
    } else this.term.write(this.prompt())
  }

  expandVariables(str) {
    return expandEnvVariables(str, this.env, this.status)
  }

  mergeExistingPaths(line) {
    const spaceIdx = line.search(/\s/)
    if (spaceIdx === -1) return line

    const exists = (word) =>
      Boolean(word) &&
      os.fileIndex.has(resolvePath(this.cwd, this.expandVariables(word)))

    const argsText = line.slice(spaceIdx + 1)
    const tokens = []
    let buf = ""
    let quote
    for (let i = 0; i < argsText.length; i++) {
      const char = argsText[i]
      if (char === "\\" && i + 1 < argsText.length) {
        buf += char + argsText[i + 1]
        i++
        continue
      }
      if (quote) {
        buf += char
        if (char === quote) quote = undefined
        continue
      }
      if (char === "'" || char === '"') {
        quote = char
        buf += char
        continue
      }
      if (char === " ") {
        if (buf) tokens.push(buf)
        buf = ""
        continue
      }
      buf += char
    }
    if (buf) tokens.push(buf)

    const merged = []
    for (let i = 0; i < tokens.length; i++) {
      if (/^['"]/.test(tokens[i])) {
        merged.push(tokens[i])
        continue
      }
      let combined = tokens[i]
      let consumed = 1
      if (!exists(combined)) {
        for (let n = i + 1; n < tokens.length; n++) {
          if (/^['"]/.test(tokens[n])) break
          const extended = tokens.slice(i, n + 1).join(" ")
          if (exists(extended)) {
            combined = extended
            consumed = n - i + 1
            break
          }
        }
      }
      merged.push(consumed > 1 ? `"${combined}"` : combined)
      i += consumed - 1
    }

    return line.slice(0, spaceIdx + 1) + merged.join(" ")
  }

  async persistHistory() {
    if (this.sessionCommands.length === 0) return
    const store = await keep("~/config/terminal/history.json5", {
      commands: [],
    })
    store.commands = [
      ...new Set([...this.sessionCommands, ...store.commands]),
    ].slice(0, 500)
  }

  commandCandidates(prefix) {
    const names = new Set(Object.keys(this.builtins))
    for (const { command } of Object.values(os.apps.value)) {
      if (command) names.add(command)
    }
    const lower = prefix.toLowerCase()
    return [...names].filter((name) => name.toLowerCase().startsWith(lower)).sort()
  }

  resolveDirPart(word) {
    const slash = word.lastIndexOf("/")
    if (slash === -1) return this.cwd
    const expandedDirPart = this.expandVariables(word.slice(0, slash + 1))
    return resolvePath(this.cwd, expandedDirPart)
  }

  fileCandidates(word) {
    const slash = word.lastIndexOf("/")
    const dirPart = slash === -1 ? "" : word.slice(0, slash + 1)
    const base = slash === -1 ? word : word.slice(slash + 1)
    const lowerBase = base.toLowerCase()
    const dir = this.resolveDirPart(word)
    let entries
    try {
      entries = os.fileIndex.readDir(dir)
    } catch {
      return []
    }
    return entries
      .filter((entry) => entry.toLowerCase().startsWith(lowerBase))
      .sort()
      .map((entry) => dirPart + entry)
  }

  complete(direction) {
    if (!this.completion) {
      const prefix = this.line.slice(0, this.position)
      const tokenStarts = [0]
      for (let i = 0; i < prefix.length; i++) {
        if (prefix[i] === " ") tokenStarts.push(i + 1)
      }
      const suffix = this.line.slice(this.position)
      const isFirstWord = tokenStarts.length === 1

      let start = tokenStarts.at(-1)
      if (!isFirstWord) {
        for (let i = tokenStarts.length - 2; i > 0; i--) {
          if (os.fileIndex.isDir(this.resolveDirPart(prefix.slice(start)))) break
          start = tokenStarts[i]
        }
      }
      const word = prefix.slice(start)

      const candidates = isFirstWord
        ? this.commandCandidates(word)
        : this.fileCandidates(word)
      if (candidates.length === 0) return
      this.completion = { start, suffix, candidates, index: -1 }
    }

    const { completion } = this
    completion.index =
      (completion.index + direction + completion.candidates.length) %
      completion.candidates.length
    const replacement = completion.candidates[completion.index]
    this.replaceLine(
      this.line.slice(0, completion.start) + replacement + completion.suffix,
    )
  }

  backspace() {
    if (this.line.length > 0 && this.position > 0) {
      const rest = this.line.slice(this.position)
      this.line = this.line.slice(0, this.position - 1) + rest
      this.term.write(
        CURSOR_DEL +
          rest +
          " " + // Clear last character (To offset the deleted character)
          CURSOR_LEFT.repeat(rest.length + 1), // Move cursor back,
      )
      this.position--
    }
  }

  replaceLine(line = "") {
    const cols = this.term.cols || 80

    // We only care about the last line of the prompt for offset calculations
    const promptText = stripAnsi(this.prompt())
    const promptLines = promptText.split(/\r?\n/)
    const startOffset = promptLines.at(-1).length

    // Calculate how many terminal rows the current input taking
    const currentRow = Math.floor((startOffset + this.position) / cols)
    const startRow = Math.floor(startOffset / cols)
    const dy = currentRow - startRow

    const moveUp = dy > 0 ? CURSOR_UP.repeat(dy) : ""
    const moveRight =
      startOffset % cols > 0 ? CURSOR_RIGHT.repeat(startOffset % cols) : ""

    this.term.write(
      "\r" + // Move to left margin
        moveUp + // Move up to the row where the input started
        moveRight + // Move right to the exact prompt offset
        "\x1b[J" + // Clear from cursor to end of screen
        line, // Draw new line
    )

    this.line = line
    this.position = line.length
  }

  async exec(line = this.line, options) {
    if (options?.linebreak !== false) this.term.write("\r\n")

    line = line.trim()

    if (line) {
      this.history.unshift(line)
      this.history = [...new Set(this.history)]
      this.sessionCommands.unshift(line)
      this.sessionCommands = [...new Set(this.sessionCommands)]

      try {
        const parsed = await parseExec(this.mergeExistingPaths(line), {
          builtins: this.builtins,
          aliases: this.aliases,
          shell: this,
        })
        const res = await parsed.run()
        this.status = typeof res === "number" ? res : SUCCESS
        if (res?.once) {
          this.stdin.onData((data) => {
            if (data === END_OF_TEXT) res.destroy()
          })
          await res.once("destroy")
        }
      } catch (err) {
        try {
          let res = await eval.call(
            globalThis,
            `with(sys42){(async () => (${line}))()}`,
          )
          res = ansi(highlight(stringify.inspect(res)))

          this.stdout.write(res + "\r\n")
          this.status = SUCCESS
        } catch (jsErr) {
          console.log(jsErr)
          if (
            jsErr.name === "SyntaxError" ||
            (jsErr.name === "ReferenceError" &&
              jsErr.message === `${line} is not defined`)
          ) {
            this.stderr.write(ansi(`{redBright ${err.message}\r\n}`))
            this.status = COMMAND_NOT_FOUND
          } else {
            const res = ansi(displayError(jsErr, { returnString: true }))
            this.stderr.write(res + "\r\n")
            this.status = ERROR
          }
        }
      }
    } else this.status = SUCCESS

    this.stdin.onData((data) => this.handleData(data))

    this.term.write(this.prompt())
    this.position = 0
    this.line = ""
  }

  clear(str = "") {
    const { rows } = this.term
    this.term.write(`\x1B[${rows};0f\r${"\n".repeat(rows)}\x1B[0;0f${str}`)
  }

  handleData(data) {
    // console.log({ data })

    if (data !== "\t" && data !== SHIFT_TAB) this.completion = undefined

    switch (data) {
      case "\t":
        this.complete(1)
        break

      case SHIFT_TAB:
        this.complete(-1)
        break

      case "\r": // Enter
        delete this.historyIdx
        this.exec(this.line)
        break

      case "\f": // Ctrl+L
        this.clear(this.prompt() + this.line)
        break

      case END_OF_TEXT: // Ctrl+C
        this.term.write("^C" + this.prompt())
        this.position = 0
        this.line = ""
        this.status = SCRIPT_TERMINATED_BY_CTRL_C
        break

      case "\x7F": // Backspace (DEL)
        this.backspace()
        break

      case CURSOR_UP:
        if (this.historyIdx === undefined) {
          this.historyIdx = 0
        } else if (this.historyIdx < this.history.length - 1) {
          this.historyIdx++
        }

        this.replaceLine(this.history[this.historyIdx])
        break

      case CURSOR_DOWN:
        if (this.historyIdx === undefined) {
          this.historyIdx = -1
        } else if (this.historyIdx > -1) {
          this.historyIdx--
        }

        this.replaceLine(
          this.historyIdx === -1 ? "" : this.history[this.historyIdx],
        )
        break

      case CURSOR_RIGHT:
        if (this.position < this.line.length) {
          this.position++
          this.term.write(CURSOR_RIGHT)
        }

        break

      case CURSOR_LEFT:
        if (this.position > 0) {
          this.position--
          this.term.write(CURSOR_LEFT)
        }

        break

      case CURSOR_HOME:
        if (this.position > 0) {
          this.term.write(CURSOR_LEFT.repeat(this.position))
          this.position = 0
        }

        break

      case CURSOR_END:
        if (this.position < this.line.length) {
          this.term.write(CURSOR_RIGHT.repeat(this.line.length - this.position))
          this.position = this.line.length
        }

        break

      default:
        if ((data >= " " && data <= "~") || data >= "\u00a0") {
          // Print all other characters
          if (this.position === this.line.length) {
            this.line += data
            this.term.write(data)
          } else {
            this.line =
              this.line.slice(0, this.position) +
              data +
              this.line.slice(this.position)
            const rest = this.line.slice(this.position + 1)
            this.term.write(data + rest + CURSOR_LEFT.repeat(rest.length))
          }

          this.position += data.length
        }
    }
  }
}
