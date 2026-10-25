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
  if (
    typeof url === "string" &&
    url.startsWith("/") &&
    globalThis.document?.baseURI?.startsWith("http")
  ) {
    url = new URL(url.slice(1), globalThis.document.baseURI).href
  }

  return url
}
