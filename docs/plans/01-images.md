# Plan 01 — Images (biggest win)

`public/images/` weighs ~34 MB. Every image is rendered through `next/image` (good — Vercel optimizes on the fly), but the **source files** are massively oversized, and Vercel's optimizer can refuse or slow down on very large sources. Deploy size, git size, and optimization latency all suffer.

## Current inventory (worst offenders)

| File | Size | Pixels | Rendered at (max) |
|------|------|--------|-------------------|
| giza.jpg | 11 MB | 5712×4284 | ~700 px wide (gallery col-span-7) |
| adn-studio.png | 3.9 MB | — | ~200 px thumb (timeline) |
| atelier.jpg | 3.5 MB | — | inline word-image, ~100 px tall |
| toutankamon.png | 2.7 MB | — | gallery ~500 px |
| pyramid.png | 2.7 MB | 1086×1448 | gallery ~500 px |
| egypte-atterissage.png | 2.3 MB | — | gallery ~300 px |
| colise.jpg | 1.5 MB | — | gallery |
| startup-weekend.jpg | 1.3 MB | — | ~530 px (nomination band) |
| alyssia.jpg | 1.0 MB | — | gallery |
| batem.jpg / arc-rome.jpg | ~900 KB each | — | ~460 px |

The `.webp` files (obrado, eos-*, cr-*, les-ignobles) are already fine (<100 KB).

## Tasks

1. **Recompress every image > 200 KB** to WebP (quality ~80–82), resizing so the longest edge is at most **2× its largest rendered size** (cap at 2000 px for gallery photos, ~800 px for timeline thumbs, ~400 px for word-images like atelier/iot/obrado-logo). Use `sips`, `cwebp`, or `sharp` in a one-off script (put it in `scripts/`, or just run shell commands). Keep the photographic look — don't over-crush the photography section, it's the point of the site.
2. **Convert photo-content PNGs to WebP** (pyramid, toutankamon, egypte-atterissage, adn-studio, sketch, bambu, egypte…). PNG is the wrong format for photos. Keep PNG/SVG only for flat graphics (startup-weekend-logo.png is 4 KB, fine; SWA.svg fine).
3. **Update the `src` paths** in `src/app/[lang]/page.tsx` (constants `GALLERY_META`, `MAKER_STEPS_META`, `WORD_IMAGES`, `TIMELINE_IMAGES`, plus inline `portrait.jpg`, `startup-weekend.jpg`) and any reference in `src/components/korvo/`. Grep for `/images/` to catch all.
4. **Delete junk from `public/`**: `public/.DS_Store`, `public/images/.DS_Store`, and the unused Next starter SVGs (`file.svg`, `vercel.svg`, `next.svg`, `globe.svg`, `window.svg`) — grep first to confirm they're unreferenced.
5. **Check `sizes` attributes** still match reality after resizing (they're mostly set already in `page.tsx` / `Figure` in `src/components/korvo/ui.tsx`).
6. Add `.DS_Store` to `.gitignore` if not already there.

## Acceptance

- `du -sh public/images` ≤ ~4 MB.
- `npm run build` succeeds; user visually checks the site (dev or preview) — image quality must stay excellent, especially the photography gallery.
- No broken image references (grep `/images/` and cross-check files exist).
