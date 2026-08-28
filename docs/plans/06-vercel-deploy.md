# Plan 06 — Vercel deploy & korvo-studio.fr checklist

Mostly dashboard work + a few config touches. Do last, after the other plans.

## Domain

1. In Vercel project → Domains: add `korvo-studio.fr` **and** `www.korvo-studio.fr`; make the apex (`korvo-studio.fr`) primary so `www` 308-redirects to it. Configure the registrar DNS as Vercel instructs (A/ALIAS for apex, CNAME for www).
2. Verify HTTPS + redirect: `curl -sI http://www.korvo-studio.fr` → 308 to `https://korvo-studio.fr`.

## Config

3. **Locale routing sanity**: `next.config.ts` rewrites `/` → `/fr`. Confirm in production that `/` serves French with URL unchanged, `/en` serves English, and `/fr` still works (it's canonicalized to `/` by plan 03). Also decide: optionally 308-redirect `/fr` → `/` to remove the duplicate URL entirely (nicer than canonical-only; add a `redirects()` entry — but then keep the rewrite for `/`, and check the language switcher in `src/components/korvo/SiteHeader.tsx` links to `/` not `/fr`).
4. **Security headers** (optional, cheap points): add `headers()` in `next.config.ts` for `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/mic/geolocation off). HSTS is handled by Vercel. Skip CSP unless motivated — it's fiddly with inline styles and next/font.
5. **No analytics** — user decision. Don't add `@vercel/analytics` or Speed Insights.

## Pre-launch verification

6. `npm run build` locally: green, all routes static.
7. Deploy to a preview; user checks fr + en visually, mobile + desktop.
8. After production deploy on the domain: run through plan 03's acceptance (canonical/OG/sitemap/robots), plan 04's Lighthouse pass on the live URL.
9. Search Console: add the domain property for korvo-studio.fr, submit `sitemap.xml`.

## Acceptance

- `https://korvo-studio.fr` live, www and http redirect to it.
- `/`, `/en` serve correct locales; no duplicate-content URL indexed.
- Search Console verified, sitemap submitted, no coverage errors after a few days.
