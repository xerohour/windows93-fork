import { encodePath } from "../encodePath.js"

/**
 * Returns blob URL if service worker isn't active.
 *
 * @template {string | URL | Request} T
 * @param {T} url
 * @param {{
 *   ignoreFileSystem?: boolean,
 *   signal?: AbortSignal,
 * }} [options]
 * @returns {Promise<T>}
 */
export async function ensureURL(url, options) {
  if (
    options?.ignoreFileSystem !== true &&
    !globalThis.navigator?.serviceWorker?.controller &&
    globalThis.location?.origin &&
    globalThis.sys42?.fs &&
    typeof url === "string" &&
    url.startsWith("blob:") === false
  ) {
    const parsedURL = new URL(encodePath(url), location.origin)

    if (
      parsedURL.origin !== location.origin ||
      parsedURL.protocol !== location.protocol
    ) {
      return url
    }

    let path = parsedURL.pathname
    try {
      path = decodeURIComponent(path)
    } catch {}

    if (globalThis.sys42.fileIndex.get(path)) {
      url = await globalThis.sys42.fs.getURL(path, options)
    }
  }

  // Preemptive GitHub Pages fix: any web URL that is still an absolute
  // site path ("/42/...", "/c/...", or a filename returned by the FS
  // for an inode-0 web file) would resolve to the domain root. Rewrite
  // it against the site base, which is the Pages project subpath
  // ("/windows93-fork/") on Pages and "/" on the original site.
  // Blob URLs and full http(s) URLs are left alone.
  // Idempotency (2026-10-26, broken desktop/folder icons): ensureURL is
  // called more than once for the same resource — e.g. desktop icons go
  // getIconPath -> ensureURL, then loadDataURL -> httpGet -> ensureURL
  // again. Without this guard the second call rewrote an already-correct
  // "/windows93-fork/42/..." to "/windows93-fork/windows93-fork/42/...",
  // which 404s on Pages and left every desktop and folder icon as a
  // broken-image placeholder. Skip the rewrite when the URL already
  // starts with the site base; on the original site that base is "/",
  // so skipping there changes nothing.
  // Site base, NOT document directory (2026-10-26, PowerNOOB style.css
  // 404): the previous version used the document's own directory, which
  // is wrong for iframe apps — PowerNOOB runs at
  // "/windows93-fork/c/programs/editors/PowerNOOB/index.html", so its
  // ThemesManager loadText("/style.css?original") was rewritten to
  // "/windows93-fork/c/programs/editors/PowerNOOB/style.css", a file
  // that does not exist, instead of "/windows93-fork/style.css". The
  // site base is the top window's directory when this document is an
  // iframe (the desktop itself), and otherwise the first path segment
  // unless that segment is a virtual FS root ("42", "c", "bios",
  // "trash") or a filename (contains "."), in which case the base is
  // "/". This derivation names no project, so it stays correct if the
  // subpath ever changes.
  if (
    typeof url === "string" &&
    url.startsWith("/") &&
    globalThis.location?.pathname
  ) {
    // String concatenation, NOT new URL(): new URL() percent-encodes
    // spaces to %20, which a later encodePath() would double-encode
    // to %2520 (this broke "Windows 93.theme"). Concatenation leaves
    // the raw path for encodePath() to encode exactly once.
    let dir = ""
    try {
      const topPath = globalThis.top?.location?.pathname
      if (topPath && topPath !== globalThis.location.pathname) {
        dir = topPath.replace(/[^/]*$/, "")
      }
    } catch {
      // Cross-origin top window: fall through to the segment fallback.
    }
    if (!dir) {
      const first = globalThis.location.pathname.split("/")[1] || ""
      const virtualRoots = new Set(["42", "c", "bios", "trash"])
      dir =
        !first || first.includes(".") || virtualRoots.has(first)
          ? "/"
          : `/${first}/`
    }
    if (!url.startsWith(dir)) {
      url = dir + url.slice(1)
    }
  }

  return url
}

