import "../../ui/media/picto.js"
import { isURLImage } from "../../lib/syntax/url/isURLImage.js"
import { ensureURL } from "../os/ensureURL.js"
import { iconsManager } from "../os/managers/iconsManager.js"

export async function normalizePlanIcon(config, size) {
  if (config.picto) {
    return { tag: "ui-picto", value: config.picto }
  }

  let src = config.img

  if (config.icon) {
    src = isURLImage(config.icon)
      ? config.icon
      : await iconsManager.getIconPath(config.icon, size)
  }

  if (src) {
    const img = new Image()
    // 2026-10-26, same Pages root-absolute bug as ui-picto: a raw
    // "/c/..." image path assigned straight to img.src resolves to the
    // domain root and 404s on Pages. Rewrite root-absolute paths only.
    img.src = src.startsWith("/")
      ? await ensureURL(src).catch(() => src)
      : src
    img.draggable = false
    img.style.userSelect = "none"
    img.setAttribute("aria-hidden", "true")

    try {
      await img.decode()
      return img
    } catch (err) {
      console.log(err)
    }
  }
}
