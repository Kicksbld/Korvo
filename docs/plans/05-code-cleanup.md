# Plan 05 — Code & dependency cleanup

Small, safe housekeeping before going live. Verify each removal with grep before deleting; run `npx tsc --noEmit` and `npm run build` after.

## Tasks

1. **Remove unused dependencies** from `package.json`:
   - `lucide-react` — zero imports in `src/` (icons are hand-written inline SVGs).
   - `shadcn` — this is a CLI, not a runtime library, and no shadcn components exist in the repo. If the user wants to keep using the CLI later, `npx shadcn` works without it being a dependency.
   - After plan 02: `ttf2woff2` (devDep) + `scripts/convert-fonts.mjs`.
   - Run `npm install` to sync the lockfile.
2. **Add a lint setup or drop the pretense**: there's no `lint` script and no ESLint config. Recommended: add ESLint with `eslint-config-next` (check `node_modules/next/dist/docs/` for this version's recommended setup) and a `"lint"` script; fix whatever it reports.
3. **Gitignore hygiene**: ensure `.gitignore` covers `.DS_Store` and `tsconfig.tsbuildinfo` (a `tsconfig.tsbuildinfo` sits at repo root — untrack it with `git rm --cached` if committed).
4. **Split `src/app/[lang]/page.tsx`** (~710 lines; project rule says keep files under 500). Natural cut: move each top-level section (`Hero`, `Positionnement`, `Projets`, `Maker`, `Parcours`, `Competences`, `Aviation`, `Photographie`, `Contact`, `Footer`) into `src/components/korvo/sections/*.tsx`, keeping the per-section meta constants (`GALLERY_META`, etc.) next to the section that uses them. Pure mechanical refactor — zero visual change allowed. This is optional polish; skip if time is short.
5. **Dead public assets**: covered in plan 01 (starter SVGs, .DS_Store).

## Acceptance

- `npm run build` green, site visually identical (user checks).
- `package.json` dependencies: only `next`, `react`, `react-dom` (+ tailwind/postcss/types/typescript in devDeps, and eslint if added).
- `git status` clean of generated files.
