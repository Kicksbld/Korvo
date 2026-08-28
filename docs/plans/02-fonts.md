# Plan 02 — Fonts

## Already done (2026-08-28)

The heading font **The Seasons** was only available as TRIAL files (no production license). It has been replaced by **Cormorant Garamond** via `next/font/google` in `src/app/[lang]/layout.tsx`, keeping the same weights (300–700) and the same CSS variable `--font-seasons`, so no CSS changed. Body font remains Source Sans 3.

⚠️ Pending user visual approval of Cormorant Garamond. If they dislike it, the fallback candidate is **Fraunces** (also on Google Fonts, warmer old-style serif).

## Remaining tasks

1. **After the user approves the new font**, delete `public/fonts/seasons/` entirely — 24 trial `.woff2` files, ~1.4 MB, all now unused (only 5 were ever loaded; the 19 others were always dead weight).
2. Delete `scripts/convert-fonts.mjs` and remove the `ttf2woff2` devDependency from `package.json` (they existed only to produce those woff2 files). Run `npm install` to update the lockfile.
3. Optionally rename the CSS variable `--font-seasons` → `--font-display` for clarity (`layout.tsx` + grep `font-seasons` in `src/app/*.css`). Cosmetic only — skip if in doubt.
4. Verify: `npx tsc --noEmit`, `npm run build`, and check the deployed HTML head — fonts should be self-hosted by next/font (no runtime request to fonts.googleapis.com), with `font-display: swap`.

## Notes for the implementer

- `Cormorant_Garamond` is loaded with explicit `weight: ["300","400","500","600","700"]` and `subsets: ["latin"]`. French accented characters are in the latin subset — no extra subset needed.
- Cormorant renders visually smaller than most serifs at the same px size. If headings look too small, the fix belongs in the token file `src/app/korvo-tokens.css` (the `k-display-*` / `k-title-*` sizes), not in components.
