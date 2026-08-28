# Plan 04 — Performance audit

Do this **after** plans 01 (images) and 02 (fonts) land — they are the bulk of the weight. This plan is a verification + fine-tuning pass. No analytics/monitoring packages: the user explicitly wants **none**.

## Current state (from investigation, 2026-08-28)

- Fully static site: `generateStaticParams` covers fr/en, no data fetching, no API routes → both pages should prerender at build time. Good baseline.
- Hero portrait uses `preload` on `next/image` (this Next 16's equivalent of `priority`) with `sizes="112px"` — correct, it's the LCP candidate along with the h1.
- Only client components: `ScrollReveal` (IntersectionObserver, ~38 lines) and `SiteHeader` (menu). Small; no heavy JS.
- Dependencies `lucide-react` and `shadcn` are in package.json but **unused in src/** (see plan 05) — they don't ship to the client, but confirm nothing pulls them in.

## Tasks

1. **Build audit**: `npm run build` — confirm both `/[lang]` pages show as prerendered/static (SSG symbols in build output), and note First Load JS. For a site like this it should be well under 130 KB. If not, investigate what's in the bundle.
2. **Lighthouse** (or PageSpeed Insights on the preview URL) for mobile: target ≥ 95 performance, 100 SEO/best-practices/accessibility. Fix what it flags.
3. **LCP check**: the hero is `min-h-[calc(100dvh-64px)]` with a small portrait — LCP is likely the h1 text. Ensure the display font (Cormorant Garamond via next/font) is preloaded (next/font does this automatically) and no layout shift occurs when it swaps.
4. **CLS check**: `Figure` components use explicit ratios (good). Scroll-reveal animations (`k-reveal`, `--reveal-i`) must animate opacity/transform only — check `src/app/korvo-tokens.css`; verify `prefers-reduced-motion` is respected (add a media query disabling reveals if missing).
5. **Accessibility quick pass** (counts toward Lighthouse): heading order (h1 → h2 → h3 looks fine), all `Figure` images get translated `alt` from dictionaries (verify none empty), color contrast of `--text-muted` on `--surface-page`, focus states on `.k-btn`/`.k-social`/menu, `aria-label`s on icon links (present in footer).
6. **Caching**: nothing to do — Vercel serves `_next/static` and next/image with immutable caching automatically. Just don't add custom headers that fight it.

## Acceptance

- Build output: all routes static.
- Mobile Lighthouse ≥ 95 perf, 100 a11y/SEO.
- No visible font-swap layout jump; reveals respect reduced motion.
