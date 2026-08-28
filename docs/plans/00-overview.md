# Korvo — Production Optimization Plans

Context for any Claude conversation picking up one of these plans.

## The project

- Portfolio one-pager of Killian Boularand, deployed on **Vercel** with the custom domain **korvo-studio.fr**.
- **Next.js 16.3.2** (App Router), React 19, Tailwind CSS v4. ⚠️ `AGENTS.md` warns this Next version has breaking changes vs. training data — read the relevant guide in `node_modules/next/dist/docs/` before writing code.
- i18n: two locales, `fr` (default) and `en`, via `src/app/[lang]/`. The root `/` is **rewritten** (not redirected) to `/fr` in `next.config.ts`, so French lives at both `/` and `/fr`.
- Single page: `src/app/[lang]/page.tsx` (~710 lines). Components in `src/components/korvo/`. Dictionaries in `src/i18n/dictionaries/{fr,en}.ts`.
- `content/` at repo root is source material (markdown notes), not shipped — leave it alone.
- The user checks visual results themselves in the browser — don't try to screenshot/verify UI.

## The plans (rough priority order)

| # | File | Impact | Status |
|---|------|--------|--------|
| 1 | [01-images.md](01-images.md) | **Highest** — 35 MB of images in `public/`, one file is 11 MB | Done (2026-08-28, 34 MB → 4 MB) |
| 2 | [02-fonts.md](02-fonts.md) | High — trial-license fonts replaced; cleanup remains | Done (2026-08-28; optional `--font-seasons` rename skipped) |
| 3 | [03-seo.md](03-seo.md) | High — no OG/canonical/hreflang/sitemap/robots today | Done (2026-08-28) — post-deploy checks (task 8) remain |
| 4 | [04-performance.md](04-performance.md) | Medium — audit pass after images/fonts land | Done (2026-08-28; CLS/reduced-motion/a11y/contrast all already solid, no fixes needed) |
| 5 | [05-code-cleanup.md](05-code-cleanup.md) | Low-medium — unused deps, stray files | Done (2026-08-28; optional page.tsx split not done, 1 lint warning fixed in SiteHeader.tsx) |
| 6 | [06-vercel-deploy.md](06-vercel-deploy.md) | Checklist for going live on korvo-studio.fr | To do — user handling this one |

Decisions already made by the user:
- **No analytics** (no Vercel Analytics, no Speed Insights, nothing).
- **OG image: generate one** matching the Korvo brand (see SEO plan).
- Heading font: The Seasons (trial) **replaced by Cormorant Garamond** (done, 2026-08-28).

When you finish a plan, update its Status here.
