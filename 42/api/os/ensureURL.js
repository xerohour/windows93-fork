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
  // it against the document's own directory, which is the Pages project
  // subpath ("/windows93-fork/") on Pages and "/" on the original site.
  // Blob URLs and full http(s) URLs are left alone.
  // Idempotency (2026-10-26, broken desktop/folder icons): ensureURL is
  // called more than once for the same resource — e.g. desktop icons go
  // getIconPath -> ensureURL, then loadDataURL -> httpGet -> ensureURL
  // again. Without this guard the second call rewrote an already-correct
  // "/windows93-fork/42/..." to "/windows93-fork/windows93-fork/42/...",
  // which 404s on Pages and left every desktop and folder icon as a
  // broken-image placeholder. Skip the rewrite when the URL already
  // starts with this document's directory; on the original site that
  // directory is "/", so skipping there changes nothing.
  if (
    typeof url === "string" &&
    url.startsWith("/") &&
    globalThis.location?.pathname
  ) {
    // String concatenation, NOT new URL(): new URL() percent-encodes
    // spaces to %20, which a later encodePath() would double-encode
    // to %2520 (this broke "Windows 93.theme"). Concatenation leaves
    // the raw path for encodePath() to encode exactly once.
    const dir = globalThis.location.pathname.replace(/[^/]*$/, "")
    if (!url.startsWith(dir)) {
      url = dir + url.slice(1)
    }
  }

  return url
}
