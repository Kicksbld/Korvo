# Obrado — SaaS dédié à l'alternance

Projet vedette #2 du site (après Éos). Montre le leadership technique & la vision produit.

## En une phrase

Plateforme SaaS de mise en relation étudiants / écoles / entreprises, pensée pour
valoriser les compétences réelles autrement qu'avec un CV.

## Mon rôle

**CTO & cofondateur** — responsable technique, depuis juin 2025.

## Le problème

Je vis moi-même la galère de chercher une alternance avec un CV qui ne montre jamais
ce que je sais vraiment faire — comme des milliers d'étudiants créatifs et techniques
dont les compétences ne tiennent pas sur un PDF standardisé. *(Angle fort : ce site
lui-même est né du même constat.)*

## La solution / fonctionnalités

- Page profil publique type portfolio (`/[slug]`) qui remplace le CV classique
- Pages projets détaillées, contenu riche, contributeurs multiples
- Blocs de compétences modulaires (hard, soft, langues, centres d'intérêt)
- Vitrine école (`/hub/[slug]`) qui vérifie l'appartenance d'un étudiant en un clic
- Messagerie directe étudiants ↔ écoles ↔ entreprises

## Stack technique

*(stack réelle — pas Supabase, corrigé)*
- **Front** : Next.js 15 (App Router) + React 19 — SSR pour les pages publiques
  indexables, client pour l'app connectée.
- **Back** : NestJS 11 en **Clean Architecture / DDD** — use-cases, ports, infra
  Prisma découplés ; code testable.
- **Données** : PostgreSQL + Prisma — modèle très interconnecté, migrations versionnées.
- **Auth** : Better-Auth — sessions cookie, OAuth, vérification email.
- **Monorepo Nx** : lib UI mutualisée (ShadCN + Tailwind v4) + SDK client entre
  `obrado_client` et `obrado_admin`.
- **Stockage** : AWS S3 via URLs présignées (avatars, bannières, images projets).

## Stade & résultats

MVP en ligne, ~30 utilisateurs (élèves de **By CCI**, école partenaire).
Nominé **Startup Weekend Annecy 2025 (SWA)**.

## Ce que ça prouve pour l'aéro

Porter un produit complexe de bout en bout, leadership technique, architecture
propre, vision produit.

## Visuels

- `assets/projets/obrado/obrado.webp` — visuel principal
- `assets/projets/obrado/startup-weekend.jpeg` — nomination SWA 2025
- Lien détail complet → https://obrado.app/cto (et la plateforme https://obrado.app)
