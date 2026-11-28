# Plan de développement — Page pro Korvo (`pro.korvo-studio.fr`)

> **Rôle de ce document :** découper le développement de la page pro en **6 phases**, chacune menée dans **une conversation séparée**. Chaque phase a son objectif, ce qu'il faut lire, ce qu'elle livre, ce qu'elle ne fait pas, ses critères de fin et un **prompt de démarrage** prêt à coller.
> **Statut :** maquette v2 validée (27/11/2026). Développement pas encore commencé.

---

## 0. À lire dans chaque conversation

### Sources de vérité

| Quoi | Où |
|---|---|
| **Maquette v2 (référence visuelle)** | Figma, page « Page pro — Maquette finale v2 » : https://www.figma.com/design/PPonPlOdxWkRgvF2fG80uJ/Personal-Brand?node-id=207-564 |
| Desktop 1440 | nœud `207-569` : https://www.figma.com/design/PPonPlOdxWkRgvF2fG80uJ/Personal-Brand?node-id=207-569 |
| Mobile 390 | nœud `207-1206` : https://www.figma.com/design/PPonPlOdxWkRgvF2fG80uJ/Personal-Brand?node-id=207-1206 |
| Spécification mouvement & accessibilité | nœud `214-83` : https://www.figma.com/design/PPonPlOdxWkRgvF2fG80uJ/Personal-Brand?node-id=214-83 |
| Images sources (photos, gravures, textures, captures) | page « Page pro — Propositions », cadre « Composants & assets » (`186-2`) |
| Contenu, offres, prix, règles de discours | [`docs/brief-page-pro.md`](brief-page-pro.md) |
| Contexte business, fourchettes de prix | [`brief_page_client_freelance_contexte_claude.md`](../brief_page_client_freelance_contexte_claude.md) |
| Conventions Next.js de cette version | `node_modules/next/dist/docs/` (voir `AGENTS.md` : Next **16.3**, `middleware` est devenu `proxy`) |

Lire la maquette **via le MCP Figma** (`get_design_context`, `get_screenshot` sur les nœuds de section listés en §3), pas via le navigateur.

### Règles non négociables

1. **Zéro jargon technique et aucune stack citée** dans les textes visibles. On parle de résultats.
2. **Rien d'inventé :** pas de faux clients, pas de chiffres, pas de témoignages. Toute démo porte l'étiquette « Démo ».
3. **Agence Popote jamais nommée :** on écrit « en agence de communication en Haute-Savoie, au pôle digital ».
4. **Pas de statut étudiant ni alternant.** Pas d'Alibaba. Obrado est cité **sans** chiffre d'utilisateurs.
5. **La DA de la page pro ne fuit pas** dans le portfolio, et inversement (voir §1).
6. **Ce qui faisait « généré par IA » a été retiré de la v2, ne pas le réintroduire :** carrés devant les titres de section, étiquettes en police mono, petites capitales espacées, mot en italique dans les titres, grands traits fins décoratifs, badges et slogans flottants.
7. **Illustrations limitées à quatre :** paysage du lac (hero), sentier (processus), trousseau de clés, montagnes (pied de page). Aucune autre.
8. **Contraste :** texte courant ≥ 4,5:1, grands textes ≥ 3:1, y compris sur le papier texturé.
9. **Si la maquette et le spec mouvement se contredisent, la maquette v2 l'emporte.** Par exemple : le spec parle d'un filet sous la barre du haut, mais la v2 l'a supprimé.
10. Une branche Git par phase (`pro/01-fondations`, `pro/02-statique`, …). Commit uniquement quand Killian le demande.

---

## 1. Décisions techniques (validées)

| Sujet | Décision |
|---|---|
| Emplacement | **Même repo** (`korvo`), même projet Vercel. |
| Isolation de la DA | **Deuxième mise en page racine** : `src/app/pro/[lang]/layout.tsx` avec son propre `<html lang>`, ses propres CSS (`pro-tokens.css`) et ses propres polices. Le portfolio garde `src/app/[lang]/layout.tsx`. Aucun fichier de style partagé. Passer de l'un à l'autre recharge la page entièrement, ce qui est voulu. |
| Sous-domaine | `src/proxy.ts` : si l'hôte est `pro.korvo-studio.fr`, **réécriture** de `/` vers `/pro/fr` et de `/en` vers `/pro/en`. Sur le domaine principal, `/pro/*` redirige (308) vers le sous-domaine, pour éviter tout contenu en double. À vérifier contre `proxy.md` : l'ordre d'exécution (le proxy passe avant les `rewrites` de `next.config.ts`) et la cohabitation avec la réécriture `/` → `/fr` du portfolio. |
| Langues | **FR (par défaut, à la racine `/`) + EN (`/en`)**, avec un sélecteur FR / EN dans la barre du haut (voir Figma). Balises `hreflang` fr / en / x-default. Réutiliser `src/i18n/config.ts` pour la liste des langues, mais avec des **dictionnaires propres à la page pro**. |
| Styles | Tailwind v4 (déjà installé) + variables CSS issues des variables Figma « Korvo ». Préfixe `--pro-` pour éviter toute collision avec `korvo-tokens.css`. |
| Polices | **Fraunces** (titres, remplace The Seasons), **Source Sans 3** (texte et interface), via `next/font/google`. **Caveat** uniquement pour les petites annotations manuscrites (« à votre nom »). **Signature « Killian » exportée en SVG** (pas de police Mr Dafoe chargée pour un seul mot). |
| Contenu | Tous les textes dans deux dictionnaires typés, `src/app/pro/content/fr.ts` et `en.ts`, de même structure (TypeScript bloque toute clé manquante). On peut les relire et les corriger sans toucher aux composants. |
| Mouvement | **Décidé en phase 3 : pas de bibliothèque.** Un moteur de ressort maison (`src/components/pro/motion/spring.ts`, ~1 ko) au lieu de Motion (~18 ko gzip pour `animate` avec ressorts JS) : solution analytique réglée en amortissement + réponse comme Apple, interruptible avec reprise de vitesse. Carrousels : défilement natif au doigt + glisser à la souris avec élan projeté (`useCarousel`). Tout ce qui ne se saisit pas (appui, apparitions, fondus, FAQ) est en CSS (`src/app/pro/pro-motion.css`), avec une courbe `linear()` tirée du même ressort. **Retours de Killian (28/11) :** peu d'animations mais ciblées — titres mot à mot sous un masque, cartes du hero « posées sur la table », étiquettes des clés qui se balancent, frise du processus tracée au défilement, pied de page en rideau. Plus d'apparition générique des blocs. Pas d'animation de chiffres qui défilent sur les prix (essayée puis retirée : trop de bugs visuels) ; les prix changent en fondu à la bascule € / CHF. Onglet par défaut des Offres : « J'ai besoin d'un site », en €. |
| Prise de rendez-vous | Cal.com intégré dans la page (phase 4). |
| Assistant IA | **Claude (Anthropic)**, petit modèle rapide, appelé depuis un Route Handler serveur, avec un plafond de dépense (phase 5). |

---

## 2. Design system (relevé dans Figma, collection de variables « Korvo »)

### Couleurs

| Rôle | Token | Hex |
|---|---|---|
| Papier (fond principal) | `paper` | `#F7F5EE` |
| Papier surélevé (cartes) | `paper-raised` | `#FFFDF7` |
| Papier creusé (sections alternées) | `paper-sunken` | `#F1EEE5` |
| Papier incrusté | `paper-inset` | `#EAE6DA` |
| Papier vieilli | `paper-aged` | `#F0E8D6` |
| Encre | `ink` / `ink-2` / `ink-3` | `#000000` / `#33322E` / `#6F6D66` |
| Sauge (section Offres) | `sage` / `sage-700` / `sage-900` | `#666D57` / `#545A47` / `#3F4335` |
| Sauge claire | `sage-400` / `sage-200` / `sage-050` | `#8B9078` / `#C7C9BC` / `#EEEDE5` |
| Vert forêt (Réalisations, FAQ, pied de page) | `forest` / `forest-2` | `#2B2F24` / `#363B2D` |
| Ocre (accent chaud) | `ochre` / `ochre-soft` | `#996624` / `#EDDEBF` |
| Sépia (texte sur ocre clair) | `sepia` | `#4A3B26` |
| Bordures | `border-faint` / `border-default` / `border-strong` | `#E3E2DE` / `#D0D0CE` / `#BBB5A7` |

`ink-4` (`#9C9A92`) existe mais **ne doit pas servir pour du texte** : contraste insuffisant.

Le pied de page utilise `#272F1D`, le fond exact de la gravure des montagnes, pour que l'image se fonde sans bord visible.

### Typographie (styles de texte Figma)

| Style | Police | Taille / interligne | Approche |
|---|---|---|---|
| Display XL / L / M / S / XS | Fraunces Regular | 104/100 · 76/80 · 56/62 · 40/46 · 28/34 | −3 % → −1 % |
| Display Mobile XL / L / M | Fraunces Regular | 48/50 · 36/40 · 28/32 | −2,5 % → −1,5 % |
| Body LG / MD / SM | Source Sans 3 Regular | 20/31 · 17/27 · 15/22 | 0 |
| Body Strong | Source Sans 3 SemiBold | 17/24 | 0 |
| UI Button / Small | Source Sans 3 SemiBold | 16/16 · 14/16 | 0 |

Les styles `Label/Caps` et `Label/Mono` existent dans le fichier mais **ne sont plus utilisés** en v2 : ne pas les porter.

Les titres de section utilisent **Display M** (desktop) et **Display Mobile L** (mobile). Le titre du hero utilise **Display XL / Mobile XL**.

### Rayons et rythme

- Rayons : `999` (pilules et boutons), `14` (images), `18–28` (cartes et surfaces).
- Section : 120–130 px de marge verticale en desktop, 72–88 px en mobile. Marges latérales : 64 px desktop, 20 px mobile. Largeur de contenu : 1312 px.
- Cibles tactiles ≥ 44 px sur mobile.

### Matières et motifs (à reproduire en CSS ou en images)

- **Papier texturé :** couleur de fond + image de papier en `multiply` + grain très léger en `overlay` (≈ 8 %). Les images sont dans Figma (`img/gen/papier`, `img/tex/grain`).
- **Déchirures entre sections :** à chaque changement de couleur, le **haut de la section suivante** forme un bord de papier déchiré (frange claire + ombre légère). Tracé différent à chaque fois. À faire en SVG inline ou en `mask-image`, avec une version desktop et une version mobile.
- **Gravures :** en `mix-blend-mode: multiply` sur le papier. Il y a quatre fichiers : paysage du lac, sentier, clés, montagnes du pied de page.
- **Ombres :** douces et chaudes, jamais grises (voir les effets sur les cartes dans Figma).

### Composants de base (primitives à créer en phase 1)

`Button` (plein encre, contour, inversé sur fond sombre), `TextLink` (souligné, avec ou sans flèche ↗), `Section` (fond, texture, déchirure), `TornEdge`, `Card`, `Pill`/`Tag` (dont « Maquette offerte » en ocre clair avec icône cadeau), `SegmentedToggle` (€ / CHF), `Tabs` (onglets en pilule vert forêt avec icône), `IconButton` (rond, 44–48 px), `Container`.

---

## 3. Inventaire de la maquette (ordre de la page)

| # | Section | Desktop | Mobile | Fond | À noter |
|---|---|---|---|---|---|
| — | Barre du haut | dans `207-570` | dans `207-1207` | papier texturé (identique au hero) | Logotype KORVO **sans filet**. Sélecteur **FR / EN** (langue active soulignée en sauge). Lien « Mon parcours & mes projets ↗ » vers `korvo-studio.fr` (« Mon parcours ↗ » en mobile). Bouton « Réserver un appel » (desktop). |
| 1 | Hero | `207-570` | `207-1207` | papier | Titre « Votre entreprise, à l'heure de l'IA. », photo en arche, paysage du lac gravé, 4 cartes-problèmes reliées à la photo par des pointillés. Mobile : cartes en **carrousel** « Vous vous reconnaissez ? » avec pagination ocre. |
| 2 | Offres | `207-619` | `207-1226` | sauge | Onglets « J'ai besoin d'un site » / « Je veux gagner du temps » avec icônes, bascule Annecy € / Genève CHF, 2 offres visibles par onglet, bandeau Sérénité vert forêt, mention TVA. |
| 3 | Réalisations | `210-44` | `210-102` | vert forêt | Défilé horizontal de 3 projets (Debatium, Les Ignobles, ADN Studio). Visuel + nom + contexte + description en 3 phrases + bouton vers le site. Barre de progression ocre + flèches. |
| 4 | Démo assistant | `207-750` | `207-1354` | papier | « Et maintenant, essayez. » Desktop : téléphone réaliste (21:47) avec l'assistant en volet sur la page. Mobile : volet seul. **Ici l'assistant devient le vrai (phase 5).** |
| 5 | Tout reste à vous | `211-44` | `211-107` | ocre clair | Gravure du trousseau + 4 étiquettes « à votre nom » reliées à l'anneau par des cordelettes. Bloc « Mes engagements » (5 garanties). |
| 6 | Processus | `207-913` | `207-1461` | papier creusé | Gravure du sentier, frise de 6 étapes (étape 3 en vert forêt avec le tag « Maquette offerte »), bouton « Réserver l'appel découverte ». |
| 7 | Qui je suis | `211-165` | `211-202` | papier | Titre, portrait en **tirage photo posé** (marge blanche, penché −2°, ombre des cartes, légende manuscrite « Killian, entre Annecy et Genève ») — remplace le cercle ocre et la signature de la v2 (décision du 28/11) —, 4 repères en texte, bio, bouton. |
| 8 | FAQ | `207-1037` | `207-1564` | vert forêt | Accordéon, 6 questions, première ouverte. |
| 9 | Contact + pied de page | `207-1085` | `207-1609` | papier → `#272F1D` | Calendrier Cal.com, WhatsApp, e-mail. Pied de page : zones, bouton, gravure des montagnes, KORVO géant, mentions (SIRET, TVA, mentions légales). |
| — | Barre fixe mobile | — | `207-1677` | verre papier | « Réserver 20 min » + WhatsApp. Apparaît après le hero, masquée dans la section Contact et quand le clavier est ouvert. |

---

## 4. Les phases

### Phase 1 — Fondations & design system

**Objectif :** que la page pro existe sur sa propre route, isolée du portfolio, avec tout son design system en code, et un panneau de démonstration des composants.

**À lire :** §0 à §3, `node_modules/next/dist/docs/` (`proxy.md`, `route-groups.md`, `layout.md`, polices), `src/app/[lang]/layout.tsx` et `next.config.ts` pour ne rien casser.

**Livrables :**
- `src/app/pro/[lang]/layout.tsx` (mise en page racine, `<html lang>`, polices Fraunces, Source Sans 3 et Caveat), `src/app/pro/[lang]/page.tsx` (vide ou composée des primitives), `src/app/pro/pro-tokens.css`.
- Squelette i18n : `content/fr.ts`, `content/en.ts` (structure partagée, typée), fonction de chargement, primitive `LangSwitch`.
- `src/proxy.ts` : réécriture de l'hôte `pro.korvo-studio.fr` (`/` vers `/pro/fr`, `/en` vers `/pro/en`), redirection de `korvo-studio.fr/pro/*` vers le sous-domaine. Testable en local, par exemple avec `pro.localhost:3000`.
- Tokens couleurs, typo, rayons et espacements en variables CSS `--pro-*`, branchés sur Tailwind v4.
- Export des images depuis Figma vers `public/pro/` (WebP ou AVIF, tailles 1× et 2×) : photo du hero, portrait à la rivière, avatar, 4 gravures, papier, grain, captures des projets.
- Primitives de §2 dans `src/components/pro/`.
- `TornEdge` (SVG, variantes desktop et mobile, couleur paramétrable).
- Une route de démonstration `/pro/design-system`, avec `noindex` (ou retirée avant la phase 6), qui montre tous les composants.

**Hors périmètre :** les sections de la page, toute animation, Cal.com, l'assistant.

**Terminé quand :**
- `npm run build` passe ;
- le portfolio est **inchangé** (vérifier `/`, `/en`) ;
- `/pro` affiche le papier texturé et les polices de la maquette ;
- `/pro/design-system` montre chaque primitive, conforme à Figma ;
- aucun style de `korvo-tokens.css` ne s'applique dans `/pro`.

**Prompt de démarrage :**
```
Phase 1/6 de la page pro Korvo : fondations & design system.
Lis docs/dev-page-pro.md (sections 0 à 4, phase 1) puis docs/brief-page-pro.md.
Maquette v2 (référence) : https://www.figma.com/design/PPonPlOdxWkRgvF2fG80uJ/Personal-Brand?node-id=207-564
Lis-la via le MCP Figma. Crée une branche pro/01-fondations.
Livre uniquement la phase 1. Pose-moi tes questions avant d'inventer.
```

---

### Phase 2 — Intégration statique desktop + mobile

**Objectif :** toute la page, section par section, fidèle à la maquette en 1440 et en 390, **sans aucune animation**, mais déjà responsive entre les deux (tablette comprise).

**À lire :** §0, §3, les nœuds Figma de chaque section, `src/components/pro/` livré en phase 1.

**Livrables :**
- `content/fr.ts` avec tous les textes de la maquette, et `content/en.ts` avec leur **traduction anglaise**. La traduction est écrite dans cette phase, mêmes règles de discours, puis **relue et validée par Killian** avant le merge.
- Sélecteur FR / EN fonctionnel : il mène à la même page dans l'autre langue, et les balises `hreflang` sont en place.
- Vérifier que les textes anglais, souvent plus longs ou plus courts, ne cassent aucune mise en page (onglets, cartes, boutons).
- Un composant par section (`Hero`, `Offres`, `Realisations`, `DemoAssistant`, `ToutResteAVous`, `Processus`, `QuiJeSuis`, `Faq`, `Contact`, `Footer`, `BarreFixeMobile`), assemblés dans `page.tsx`.
- Déchirures entre sections aux bons endroits, avec les bonnes couleurs.
- États par défaut figés : onglet « gagner du temps » actif, prix en €, première question de la FAQ ouverte, premier projet visible.
- **Démo assistant :** l'interface du volet en dur, avec la conversation de la maquette et l'étiquette « Démo », non fonctionnelle.
- **Contact :** un emplacement à la taille du calendrier (Cal.com arrive en phase 4).
- HTML sémantique : un seul `h1`, des `h2` par section, `<nav>`, `<footer>`, textes alternatifs sur toutes les images.

**Hors périmètre :** les interactions (bascule, onglets, accordéon, carrousels peuvent être de simples liens ou rester figés), Cal.com, l'assistant.

**Terminé quand :**
- comparaison visuelle section par section avec Figma en 1440 et en 390 (captures côte à côte) ;
- rien ne casse en 768 ni en 1024 ;
- aucun texte inventé ni différent du brief sans accord ;
- contraste vérifié ;
- Lighthouse Accessibilité ≥ 95.

**Prompt de démarrage :**
```
Phase 2/6 de la page pro Korvo : intégration statique desktop + mobile.
Lis docs/dev-page-pro.md (sections 0 à 3 et phase 2). La phase 1 est mergée.
Maquette v2 : https://www.figma.com/design/PPonPlOdxWkRgvF2fG80uJ/Personal-Brand?node-id=207-564
Desktop : node 207-569 · Mobile : node 207-1206. Lis chaque section via le MCP Figma.
Branche pro/02-statique. Avance section par section et montre-moi chacune.
```

---

### Phase 3 — Mouvement, interactions et dynamisme

**Objectif :** rendre la page vivante selon le spec « Mouvement & accessibilité », en respectant les principes de design d'Apple (skill `apple-design`).

**À lire :** le panneau spec Figma `214-83`, le skill `apple-design`, §0 (règle 9).

**Livrables :**
- Choix et installation d'une bibliothèque de ressorts légère, justifiée par son poids.
- **Bascule € / CHF :** pastille qui glisse en ressort, prix en fondu, choix mémorisé, paramètre `?ville=geneve`.
- **Onglets des Offres :** pastille qui glisse, paramètre `?besoin=site|temps`.
- **Réalisations :** défilement horizontal au doigt (suivi 1:1, élan, aimantation), flèches, barre de progression.
- **Carrousel « Vous vous reconnaissez ? »** (mobile) : même comportement, avec la pagination.
- **FAQ :** accordéon accessible (`aria-expanded`, toute la ligne cliquable, une seule question ouverte).
- **Barre fixe mobile :** apparaît après le hero, entre et sort par le bas, masquée dans Contact et quand le clavier est ouvert.
- **Hero :** apparition en cascade une seule fois. Sur desktop, léger suivi de la souris des cartes (± 4 px). **Pas de flottement en boucle.**
- **Apparitions au défilement :** fondu + 14 px, une seule fois.
- Retour visuel dès l'appui sur tous les boutons (échelle 0,97).
- **Préférences du visiteur :** `prefers-reduced-motion` (fondus seulement), `prefers-reduced-transparency` (barres opaques), `prefers-contrast: more` (bordures).

**Hors périmètre :** Cal.com, l'assistant.

**Terminé quand :**
- tout est utilisable au clavier et au lecteur d'écran ;
- aucune animation ne bloque le défilement ;
- 60 fps sur un téléphone milieu de gamme (vérification au profiler) ;
- tout se comporte proprement avec « réduire les animations ».

**Prompt de démarrage :**
```
Phase 3/6 de la page pro Korvo : mouvement et interactions.
Lis docs/dev-page-pro.md (section 0 et phase 3). Les phases 1 et 2 sont mergées.
Maquette v2 : https://www.figma.com/design/PPonPlOdxWkRgvF2fG80uJ/Personal-Brand?node-id=207-564
Spec mouvement : node 214-83 (la maquette v2 l'emporte en cas de contradiction).
Charge le skill apple-design. Branche pro/03-mouvement.
```

---

### Phase 4 — Branchements : Cal.com, WhatsApp, e-mail, liens

**Objectif :** que chaque bouton d'action mène quelque part de réel.

**Prérequis (Killian) :**
- compte Cal.com avec un événement « Appel découverte — 20 min », créneaux le midi et le soir ;
- numéro WhatsApp ;
- adresse e-mail pro.

**Livrables :**
- Calendrier Cal.com **intégré** dans la section Contact, habillé aux couleurs de la page (au plus près de la maquette, en acceptant les limites de personnalisation de Cal.com).
- Tous les boutons « Réserver… » mènent au calendrier : défilement vers la section, ou ouverture du calendrier en volet sur mobile (à trancher).
- Lien WhatsApp (`wa.me`) avec un message prérempli, lien `mailto:`.
- Liens « Voir le site » : `lesignobles.com` et `adn-studio-by-nelly.fr`, avec `target="_blank" rel="noopener"`.
- Lien « Mon parcours & mes projets » vers `https://korvo-studio.fr`.
- Si le site d'ADN Studio est encore en maintenant au moment de la mise en ligne : décider avec Killian de masquer temporairement son bouton.

**Terminé quand :** une réservation de test passe de bout en bout, et chaque lien est vérifié en desktop et en mobile.

**Prompt de démarrage :**
```
Phase 4/6 de la page pro Korvo : branchements (Cal.com, WhatsApp, e-mail, liens).
Lis docs/dev-page-pro.md (section 0 et phase 4). Les phases 1 à 3 sont mergées.
Maquette v2 : https://www.figma.com/design/PPonPlOdxWkRgvF2fG80uJ/Personal-Brand?node-id=207-564
Section Contact : node 207-1085 (desktop) / 207-1609 (mobile). Branche pro/04-branchements.
Demande-moi les identifiants (Cal.com, WhatsApp, e-mail) avant de commencer.
```

---

### Phase 5 — Assistant IA

**Objectif :** remplacer la démo figée par un vrai assistant, qui répond sur l'offre Korvo et transmet les demandes à Killian.

**Prérequis (Killian) :**
- compte API Anthropic à son nom, avec un **plafond de dépense** ;
- clé API dans les variables d'environnement Vercel (jamais dans le repo) ;
- choix du moyen d'envoi du résumé (e-mail via un service transactionnel, ou autre) : **à trancher au début de la phase**.

**Livrables :**
- Route Handler serveur (`src/app/pro/api/assistant/route.ts` ou équivalent) qui appelle Claude, avec réponse en streaming. **Charger le skill `claude-api`** pour le choix du modèle et les paramètres.
- Prompt système construit à partir des dictionnaires de contenu. L'assistant **répond dans la langue de la page** (ou dans celle du visiteur s'il écrit autrement) :
  - il ne répond **que** sur l'offre Korvo (offres, délais, zones, fonctionnement) ;
  - il **n'invente aucun prix** hors grille et donne toujours des prix « dès » ;
  - il renvoie vers la réservation de l'appel ;
  - il refuse poliment tout le reste ;
  - jamais de jargon technique.
- Récupération du besoin et du contact (avec consentement explicite), puis envoi d'un **résumé à Killian**.
- **Garde-fous :**
  - limite de messages par session et par IP ;
  - longueur maximale des messages ;
  - protection anti-abus ;
  - message de repli si l'API est indisponible ou si le plafond est atteint.
- Interface : le volet de la maquette, réellement fonctionnel. Étiquette « Démo · assistant IA » toujours visible. Sur desktop, la conversation vit dans le téléphone (décider si un clic l'agrandit en volet).
- **RGPD / nLPD :** mention courte de ce qui est conservé et pourquoi, sans stockage inutile.

**Terminé quand :**
- jeu de 20 questions de test (offres, prix €/CHF, délais, Suisse, hors sujet, tentative de détournement) : aucune réponse hors grille, aucun jargon ;
- le résumé arrive bien à Killian ;
- les limites fonctionnent.

**Prompt de démarrage :**
```
Phase 5/6 de la page pro Korvo : assistant IA (Claude).
Lis docs/dev-page-pro.md (section 0 et phase 5) et docs/brief-page-pro.md (section 3 « Démo »).
Maquette v2 : https://www.figma.com/design/PPonPlOdxWkRgvF2fG80uJ/Personal-Brand?node-id=207-564
Démo assistant : node 207-750 (desktop) / 207-1354 (mobile).
Charge le skill claude-api. Branche pro/05-assistant. Commence par me faire trancher l'envoi du résumé.
```

---

### Phase 6 — SEO, performance, accessibilité, mentions légales et mise en ligne

**Objectif :** mettre en ligne `pro.korvo-studio.fr`, rapide, accessible, bien présentée sur Google et dans les aperçus de liens.

**Prérequis (Killian) :** accès DNS du domaine, SIRET et informations des mentions légales (hébergeur, contact).

**Livrables :**
- Métadonnées dédiées **par langue** (titre, description, URL canonique sur le sous-domaine, `hreflang` fr / en / x-default) et **image Open Graph dans la DA pro, en FR et en EN** (papier, titre Fraunces, KORVO).
- Données structurées `ProfessionalService` : zones (Annecy, Haute-Savoie, Genève), contact. Rien d'inventé : pas de notes ni d'avis.
- Page **mentions légales** dans la DA pro, mention TVA (art. 293 B du CGI).
- `robots` et `sitemap` propres au sous-domaine. Pas d'indexation de `/pro` sur le domaine principal.
- Suppression de la route `/pro/design-system` (ou `noindex`).
- Performance :
  - images au bon format et à la bonne taille ;
  - polices limitées aux graisses utilisées ;
  - textures légères ;
  - **objectif Lighthouse mobile ≥ 90 partout**.
- Audit d'accessibilité final (skill `audit` possible).
- Vercel : ajout du domaine `pro.korvo-studio.fr`, DNS, HTTPS, vérification du proxy en production.

**Terminé quand :**
- la page est en ligne sur le sous-domaine, le portfolio est intact ;
- l'aperçu du lien est correct sur WhatsApp, LinkedIn et iMessage ;
- le QR code de la carte de visite ouvre la page en moins de 2 s en 4G.

**Prompt de démarrage :**
```
Phase 6/6 de la page pro Korvo : SEO, performance, accessibilité, mentions légales, mise en ligne.
Lis docs/dev-page-pro.md (section 0 et phase 6) et docs/plans/06-vercel-deploy.md.
Maquette v2 : https://www.figma.com/design/PPonPlOdxWkRgvF2fG80uJ/Personal-Brand?node-id=207-564
Branche pro/06-lancement. Ne touche pas au comportement du portfolio.
```

---

## 5. À fournir par Killian (au fil des phases)

| Élément | Pour quelle phase | Statut |
|---|---|---|
| Relecture et validation des textes anglais | 2 | à faire en fin de phase |
| Capture HD du back-office Debatium (l'actuelle fait 565×423 px) | 2 | à fournir |
| Capture mobile d'ADN Studio (site en maintenance au 27/11/2026) | 2 | à fournir quand le site revient |
| Compte Cal.com + événement « Appel découverte — 20 min » | 4 | à créer |
| Numéro WhatsApp et adresse e-mail pro | 4 | à fournir |
| Compte API Anthropic + plafond de dépense | 5 | à créer |
| Moyen d'envoi du résumé de l'assistant | 5 | à trancher |
| SIRET, informations des mentions légales | 6 | SIRET saisi dans Figma, reste à compléter |
| Accès DNS de `korvo-studio.fr` | 6 | — |
| Licence web de The Seasons (optionnel, sinon Fraunces reste) | n'importe quand | non prévu |
