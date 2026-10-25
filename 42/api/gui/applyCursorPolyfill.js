import { scrapeCSSUrls } from "../../lib/cssom/scrapeCSSUrls.js"
import { getCSSVar } from "../../lib/cssom/cssVar.js"
import { loadArrayBuffer } from "../load/loadArrayBuffer.js"
import { generateCursorCSS } from "../../formats/container/ANI.js"
import { untilCSSVar } from "../../lib/cssom/untilCSSVar.js"

export const CURSORS = [
  "default",
  "none",
  "context-menu",
  "help",
  "pointer",
  "progress",
  "wait",
  "cell",
  "crosshair",
  "text",
  "vertical-text",
  "alias",
  "copy",
  "move",
  "no-drop",
  "not-allowed",
  "grab",
  "grabbing",
  "all-scroll",
  "col-resize",
  "row-resize",
  "n-resize",
  "e-resize",
  "s-resize",
  "w-resize",
  "ne-resize",
  "nw-resize",
  "se-resize",
  "sw-resize",
  "ew-resize",
  "ns-resize",
  "nesw-resize",
  "nwse-resize",
  "zoom-in",
  "zoom-out",
  // "button",
]

let styleEl

export function resetCursorPolyfill() {
  for (const anim of document.documentElement.getAnimations({
    subtree: true,
  })) {
    // @ts-ignore
    const { animationName } = anim
    if (animationName?.startsWith("cursor-")) anim.cancel()
  }

  if (styleEl) styleEl.textContent = ""
}

export async function applyCursorPolyfill() {
  resetCursorPolyfill()

  const undones = []

  for (let cursor of CURSORS) {
    if (cursor === "none") continue
    cursor = `cursor-${cursor}`
    const value = getCSSVar(cursor)
    if (value.includes("url(")) {
      const [url] = scrapeCSSUrls(value)
      if (url?.endsWith(".ani")) {
        // CSS custom-property values are not resolved against the
        // stylesheet that defines them, so resolve them here: absolute
        // site paths ("/42/...") against the document's directory (the
        // Pages project subpath), and stylesheet-relative paths
        // ("windows9x/cursors/...") against the theme stylesheet that
        // defines the cursor variables (found via document.styleSheets,
        // with the theme <link> as a fallback).
        let themeBase = location.href
        try {
          for (const sheet of document.styleSheets) {
            try {
              const rules = sheet.cssRules
              if (!rules || !sheet.href) continue
              for (const rule of rules) {
                if (
                  rule.style?.getPropertyValue?.("--cursor-progress") ||
                  rule.style?.getPropertyValue?.("--cursor-wait")
                ) {
                  themeBase = sheet.href
                  break
                }
              }
            } catch {}
            if (themeBase !== location.href) break
          }
        } catch {}
        if (themeBase === location.href) {
          const themeLink = document.querySelector(
            'link[href*=".theme.css"]',
          )
          if (themeLink) {
            themeBase = new URL(
              themeLink.getAttribute("href"),
              location.href,
            ).href
          }
        }
        const base = url.startsWith("/") ? location.href : themeBase
        const { pathname } = new URL(
          url.replace(/^\//, ""),
          base,
        )
        // console.log(pathname)

        undones.push(
          loadArrayBuffer(pathname).then((arrayBuffer) =>
            generateCursorCSS(cursor, new Uint8Array(arrayBuffer)),
          ),
        )
      }
    }
  }

  if (undones.length > 0) {
    // A single missing cursor file must not fail the whole boot:
    // ignore individual failures and use the cursors that did load.
    const settled = await Promise.allSettled(undones)
    const rules = settled
      .filter((r) => r.status === "fulfilled")
      .map((r) => r.value)
    const cssText = rules.join("\n")
    if (!styleEl) {
      styleEl = document.createElement("style")
      styleEl.className = "js-loaded cursor-polyfill"
      document.head.append(styleEl)
    }
    styleEl.textContent = cssText
    // console.log(cssText)
  }
}

export async function initCursorPolyfill() {
  try {
    await untilCSSVar("--cursor-pointer")
    applyCursorPolyfill()
  } catch (err) {
    console.log(err)
  }
}
