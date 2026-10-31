# Windows 93 — full site archive, playable on GitHub Pages

**Play it:** https://xerohour.github.io/windows93-fork/

A complete, working mirror of [windows93.net](http://www.windows93.net) — the in-browser
Windows 93 parody OS — archived file-by-file and patched to run from a GitHub Pages subpath.

## What's here

- **144,012 site files**: the full OS (`/42`), BIOS, themes, icons, wallpapers, sounds,
  fonts, screensavers, apps, and docs.
- **Full `/c/users/` mirror**: 8,040 user files (books, documents, models, pictures,
  sounds, videos) plus 122,757 ROMs and music files — every uploadable file,
  hash-verified against the repo tree (0 mismatching, 0 missing).
- **Patched for the `/windows93-fork/` subpath**: idempotent URL rewriting, icon-theme
  path fixes, iframe-app theme loading, a bundled WebVoxel socket.io client, and more
  (see the commit history for the full list of fixes, all verified live).

## Not here (yet)

48 files exceed GitHub's 35 MB single-blob API limit and need a separate route
(a local git-clone push, Git LFS, or a release asset):

- 35 oversize ROMs
- 13 oversize soundfonts

## Notes

- The service worker is intentionally disabled — it can't scope correctly under the
  subpath. Everything else runs as-is.
- After updates, returning visitors with old cached site data may need a hard reload
  (or a one-time `?reset-data` boot) before fixes become visible; fresh visitors are
  unaffected.
- All credit for Windows 93 itself goes to its creators at windows93.net — this repo
  is a preservation mirror.
