# Content — Source de vérité du site

Ce dossier contient **tout le contexte** sur Killian, organisé en petits fichiers.
Le site web sera construit **à partir de ces fichiers**. Tant qu'ils ne sont pas
complets, on ne bétonne pas le site.

## Décisions de cadrage (validées le 2026-08-22)

- **Positionnement** : *le maker qui vise l'aérospatial*. Le code, l'impression 3D,
  la photo et l'aviation convergent vers un but : l'ingénierie aérospatiale. Le dev
  est une **preuve de capacité**, pas la finalité.
- **Identité** : *Killian × Korvo*. Le nom en tête, Korvo comme **signature discrète**
  (emblème corbeau minimal).
- **Direction artistique** : **sobre & lisible** (PAS le thème boutique/old craft).
  Épuré, technique, priorité aux infos et aux visuels. Voir `07-brand-korvo.md`.
- **Langue** : bilingue **FR / EN**.
- **Objectif concret** : trouver une **alternance en ingénierie aérospatiale**,
  disponible dès maintenant, jusqu'à juillet 2027 (rythme 2 sem. entreprise / 1 sem.
  école).
- **Piliers prioritaires** : Projets tech (Éos, Obrado) + Impression 3D / hardware.
- **Piliers secondaires** : Photographie & voyages, Aviation & aérospatial.

## Relation avec le profil Obrado (`/cto`)

Le profil **https://obrado.app/cto** est le **CV/portfolio détaillé** (timeline
complète, compétences, langues, 5 projets, positionné « web dev & entrepreneur »).

Ce site-ci est **complémentaire, pas redondant** : c'est le showcase **humain &
visuel** au cadrage « maker → aérospatial ». Il met en avant ce qu'Obrado ne montre
pas (3D, photo, aviation, l'histoire/le « pourquoi »), fait d'Éos une vedette, et
**renvoie vers Obrado** pour le détail des projets. Donc : peu de texte, pas de pages
projet (slug), beaucoup de visuel.

## Méthode de construction

1. **Structure d'abord** : poser les éléments (texte + images) section par section,
   sans style ni composants, pour valider le contenu et l'ordre.
2. **Puis style & composants** : Next.js + ShadCN + Tailwind, thème sobre.
3. **Enfin** : animations / polish (via agents de design).

Stack retenue : **Next.js** (i18n FR/EN), **ShadCN + Tailwind**, déploiement Vercel.

## Comment remplir

Chaque fichier a des blocs `> TODO:` — ce sont les infos qu'il me manque.
Réponds directement dans le fichier (ou dis-les moi, je remplis). Une fois un
fichier complété, supprime ses `TODO`.

## Arborescence

| Fichier | Contenu |
|---|---|
| `01-identite.md` | Qui je suis, one-liner, valeurs, personnalité |
| `02-parcours.md` | Timeline scolaire + pro (chronologie) |
| `03-positionnement.md` | Le pitch « maker → aérospatial », la vision, l'alternance visée |
| `04-competences.md` | Stack tech, hardware/3D, soft skills |
| `05-photographie.md` | Galerie voyages, ton œil créatif |
| `06-aviation-aerospatial.md` | La passion aéro comme fil rouge |
| `07-brand-korvo.md` | Univers visuel, DA, le corbeau, old craft |
| `08-contact.md` | Liens, réseaux, CV, email |
| `projets/eos.md` | Étude de cas Éos (assistance visuelle DMLA) |
| `projets/obrado.md` | Étude de cas Obrado (SaaS alternance) |
| `projets/freelance.md` | Projets freelance (micro-entreprise) |
| `projets/impression-3d.md` | Créations & réparations 3D |
| `reference/00-source-profile.md` | Doc brut d'origine (ne pas éditer, archive) |
| `assets/` | Photos, rendus 3D, screenshots projets (à créer) |
