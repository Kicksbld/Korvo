# Plan 03 — SEO & metadata

Today `generateMetadata` in `src/app/[lang]/layout.tsx` returns only `title` and `description` (from `dict.meta`). Everything else is missing. Domain: **https://korvo-studio.fr**.

⚠️ Read `node_modules/next/dist/docs/` (App Router → metadata / sitemap / robots guides) before implementing — this Next 16 version may differ from training data.

## Key structural fact

`next.config.ts` **rewrites** `/` → `/fr` (URL stays `/`). So French content is reachable at both `/` and `/fr` → duplicate content risk. Decision: **canonical French URL is `/`** (the clean root), English is `/en`.

## Tasks

1. **`metadataBase` + canonical + hreflang** in `generateMetadata`:
   - `metadataBase: new URL("https://korvo-studio.fr")`
   - `alternates`: canonical `/` for fr, `/en` for en; `languages: { fr: "/", en: "/en", "x-default": "/" }`.
2. **Open Graph + Twitter metadata**: `openGraph` (type website, locale `fr_FR`/`en_US`, siteName "Korvo", url, title, description, images) and `twitter` (`summary_large_image`). Titles/descriptions already exist in `src/i18n/dictionaries/{fr,en}.ts` under `meta` — extend the dictionaries if per-locale OG text is wanted.
3. **Generate an OG image** (user chose this): 1200×630, matching the Korvo brand — warm paper background (`--surface-page` ≈ warm off-white), "KORVO" wordmark in the display serif, name + one-line tagline, sage accent. Two options:
   - Static: design once, export `public/og.jpg` (< 300 KB). Simplest, recommended.
   - Dynamic: `src/app/[lang]/opengraph-image.tsx` with `next/og` (ImageResponse) — per-locale text for free. Check the bundled docs for the exact convention in this Next version.
4. **`sitemap.ts`** at `src/app/sitemap.ts`: entries for `https://korvo-studio.fr/` and `/en` with hreflang alternates.
5. **`robots.ts`** at `src/app/robots.ts`: allow all, point to the sitemap.
6. **JSON-LD structured data** (`Person` schema) injected in the page or layout: name Killian Boularand, url, sameAs (the social links live in `src/components/korvo/socials.tsx` — reuse those URLs), jobTitle from dictionary. Use a `<script type="application/ld+json">` with `dangerouslySetInnerHTML`.
7. **Icons**: currently only `src/app/favicon.ico`. Add `icon.png`/`apple-icon.png` (App Router file conventions) derived from the Korvo mark so iOS/Android home-screen and tab icons look right.
8. **Verify after deploy**: check `<head>` output on `/`, `/fr`, `/en`; run the site through an OG preview tool (opengraph.xyz) and Google Rich Results test. `/fr` should canonicalize to `/`.

## Acceptance

- `curl -s https://korvo-studio.fr | grep -E 'canonical|og:|hreflang'` shows canonical `/`, OG tags with absolute image URL, hreflang fr/en/x-default.
- `/sitemap.xml` and `/robots.txt` respond 200.
- Sharing the URL in iMessage/LinkedIn shows the branded OG card.
