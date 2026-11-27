# Brief — Page pro Korvo (clients B2B, Annecy & Genève)

> **Statut :** structure, positionnement et preuves **validés** (27/11/2026).
> **Prochaine étape :** Killian fournit des inspirations → maquette Figma section par section.
> **Complète :** [`brief_page_client_freelance_contexte_claude.md`](../brief_page_client_freelance_contexte_claude.md) (objectifs financiers, catalogue et fourchettes de prix détaillés).

---

## 1. En une phrase

Une page unique sur `pro.korvo-studio.fr` qui convainc un artisan, un indépendant ou une PME entre Annecy et Genève que Killian peut **moderniser son entreprise avec le numérique et l'IA pour lui faire gagner du temps et des clients**, et qui l'amène à **réserver un appel de 20 min**.

## 2. Pour qui, dans quel contexte

- **Visiteur type :** dirigeant d'une petite structure locale (artisans et bâtiment haut de gamme, professions libérales, commerces, hôtellerie-restauration, loisirs autour du lac). Il n'est pas technique.
- **Il arrive « chaud » :** après un appel, une visite ou une carte de visite avec QR code. Il est donc **sur mobile** dans la majorité des cas.
- **Second lecteur :** l'associé, le conjoint ou le comptable à qui on transfère le lien. La page doit tenir seule, sans le contexte du premier échange.
- **La page n'est pas** un outil de SEO national. Elle **crédibilise**, **explique les offres** et **déclenche le rendez-vous**.

## 3. Décisions validées

| Sujet | Décision |
|---|---|
| Façade | **Logotype KORVO** dans la barre du haut (pas le nom). Killian = l'interlocuteur unique, présenté dans « Qui je suis ». |
| Adresse | Sous-domaine `pro.korvo-studio.fr`. Pas de lien appuyé vers le portfolio (cible recruteurs). |
| Fil rouge | **Digitaliser et passer à l'IA** pour gagner du temps, donc des clients. L'IA est le *comment*, le temps gagné est le *pourquoi*. |
| Titre du hero | **« Votre entreprise, à l'heure de l'IA. »** |
| Prix | Affichés en **« dès … »**, avec une **bascule Annecy € / Genève CHF**. |
| Langues | **Français (par défaut) + anglais**, avec un sélecteur FR / EN dans la barre du haut. |
| Action principale | **Réserver un appel de 20 min** (Cal.com). WhatsApp en secondaire. Pas de téléphone en avant : Killian est en alternance la journée. |
| Statut étudiant | **Pas mis en avant.** Formulation : « Développeur & designer indépendant, basé entre Annecy et Genève ». |
| Preuves | Parcours + 2 études de cas + démo de l'assistant IA + garanties. **Pas de section témoignages** pour l'instant. |
| Exclu | Alibaba (restaurant) n'apparaît pas. |
| Délais annoncés | Site Essentiel : **2 semaines et plus**. Site Autonome : **3 à 4 semaines**. |
| Direction artistique | **Univers Korvo** comme point de départ, adaptable pour un rendu plus moderne (palette et typos peuvent évoluer). Inspirations rassemblées dans le fichier Figma [Personal Brand](https://www.figma.com/design/PPonPlOdxWkRgvF2fG80uJ/Personal-Brand?node-id=179-7), nœud `179-7` (dont la sélection Cosmos « website-pro »). |

## 4. Règles de discours (non négociables)

1. **Zéro jargon technique et aucune stack citée** (ni Astro, ni Next.js, ni OpenAI, etc.). On parle de résultats.
2. **L'IA est concrète :** « vos demandes sont triées et résumées pour vous », plutôt que « solution IA innovante ».
3. Le forfait Sérénité **n'est jamais présenté comme de l'hébergement**.
4. **Rien de faux ni d'enjolivé :** pas de faux clients, pas de chiffres inventés. Toute démo est **étiquetée « Démo »**.
5. Le ton est direct, chaleureux et local, au **vous**. Les phrases sont courtes et un artisan doit les comprendre du premier coup.

## 5. Structure de la page

Ordre : **Barre → Hero → Offres → Réalisations & démo → Tout reste à vous → Processus → Qui je suis → FAQ → Contact.**

### 0. Barre du haut
- **Desktop :** logotype KORVO à gauche. À droite : sélecteur de langue **FR / EN**, lien « Mon parcours & mes projets ↗ » vers le portfolio, bouton « Réserver un appel ».
- **Sélecteur FR / EN (ajouté le 27/11/2026) :** deux libellés nus, la langue active en encre soulignée d'un filet sauge, l'autre en gris. Même principe que le portfolio. Zones tactiles de 44 px. Sur mobile, il est dans la barre, entre le logo et « Mon parcours ↗ ».
- **Version anglaise :** la page existe en français (par défaut) et en anglais, pour la clientèle internationale de Genève et de l'arc lémanique. Mêmes règles de discours en anglais. Les prix restent en € / CHF.
- **Mobile :** une **barre fixe en bas d'écran** avec « Réserver 20 min » (principal) et « WhatsApp » (secondaire). Elle apparaît après le hero.

### 1. Hero
- **Objectif :** dire en 5 secondes ce que Killian fait, pour qui et où.
- **Titre :** *Votre entreprise, à l'heure de l'IA.*
- **Sous-titre (à affiner) :** *Sites internet, automatisations et assistants IA pour les artisans, indépendants et PME d'Annecy à Genève. Moins d'administratif, plus de clients.*
- **Boutons :** « Réserver un appel de 20 min » (principal) et « Voir les offres » (ancre).
- **Visuel :** photo de Killian (voir section 7).
- **Pas de ligne de preuve** ni de logos clients dans le hero.

### 2. Offres
- **Objectif :** que chacun trouve *son* offre sans lire le reste.
- **Bascule Annecy € / Genève CHF** en tête de section.
- **3 familles** plutôt que 5 cartes à plat :

| Famille | Offre | Pour qui | Affichage |
|---|---|---|---|
| **Votre site** | Essentiel | Présence pro et crédible, des demandes reçues sans toucher au site | dès 1 400 € / 2 000 CHF |
| | Autonome | Modifier soi-même textes, photos, réalisations, tarifs (+ mini-formation) | dès 2 200 € / 3 000 CHF |
| **Gagner du temps** | Automatisation | Demandes, devis, relances, prise de RDV, tri des mails | dès 1 500 € / 2 200 CHF |
| | Assistant 24/7 | Répond aux questions, qualifie les prospects, envoie un résumé au gérant | dès 900 € / 1 300 CHF seul · dès +500 € / +700 CHF sur un site neuf |
| **Sérénité** | Suivi mensuel | Mises à jour, sauvegardes, surveillance du site et de l'assistant, 30 min à 1 h de modifications incluses | dès 70 € / 100 CHF par mois, sans engagement |

- Chaque carte : **pour qui**, **ce que vous obtenez** (3 à 4 bénéfices) et le **prix « dès »**. Sérénité prend la forme d'un **bandeau fin** sous les cartes.
- La mention « TVA non applicable, art. 293 B du CGI » va en petit sous la grille.

### 3. Réalisations & démo
- **Objectif :** prouver par le concret malgré peu de projets. **Profondeur plutôt que quantité.**
- **Format de chaque étude de cas :** *la situation → ce que j'ai mis en place → ce que ça change au quotidien*, avec 1 ou 2 visuels. Résultat qualitatif accepté, sans chiffre inventé.

**Cas 1 : Les Ignobles**, studio d'applications mobiles à Annecy. Deux volets :
- **Landing page :** refonte, intégration et animations. ⚠️ Les maquettes venaient de leurs designers, donc on parle d'*intégration et d'animations*, pas de design.
- **Back-office de leur application Debatium :** outil d'administration (gestion des questions et des packs de contenu) **avec IA intégrée**. L'IA **traduit le contenu en plusieurs langues** et **génère du nouveau contenu en quelques secondes** pour l'application. C'est l'angle IA de la page. Formulation métier possible : *« Ce qui prenait des heures (traduire, rédiger) se fait maintenant en quelques clics. »*

**Cas 2 : ADN Studio by Nelly**, salon de coiffure.
- **Site vitrine + prise de rendez-vous en ligne.** Angle : les clientes réservent seules, 24 h/24, sans appeler le salon. C'est l'angle gain de temps.

**Démo : l'assistant IA de la page elle-même.**
- Un encart « Posez-lui vos questions ». L'assistant répond sur les offres, les délais, les zones et le fonctionnement. Il récupère le besoin et le contact, puis envoie un résumé à Killian.
- **C'est le produit qui se démontre**, et il prend les demandes pendant que Killian est en alternance.
- **Garde-fous :** il ne répond que sur l'offre Korvo, n'invente aucun prix hors grille et renvoie vers la réservation de l'appel. Il porte une mention claire du type « assistant IA ».
- **Coût :** compte API au nom de Killian, quelques euros par mois. Prévoir un plafond de dépense.

### 4. « Tout reste à vous » + garanties
- **Objectif :** l'argument différenciant face aux agences, et ce qui remplace les témoignages.
- **Comparatif sur 4 lignes**, *Agence classique* vs *Avec Korvo* : nom de domaine, hébergement, adresses mail pro, compte IA. Avec Korvo, tout est **à votre nom** et Killian intervient par **accès délégué**.
- **Vos données restent chez vous :** l'automatisation et l'assistant tournent sur les comptes du client (argument RGPD, et nLPD côté suisse).
- **Garanties :**
  - **vous voyez votre site avant de signer** (maquette et prototype offerts avec le devis)
  - prix fixe annoncé au devis
  - frais annexes présentés en toute transparence avant le lancement
  - guide de prise en main pour une autonomie totale
  - suivi sans engagement

### 5. Comment ça se passe
6 étapes claires et rassurantes :
1. **Appel découverte** (20 min, réservé en ligne).
2. **Analyse de votre besoin**, avec un second appel si des précisions sont nécessaires.
3. **Devis + première maquette**, avec un **prototype offert** pour orienter le site.
4. **Mise en place :** présentation de l'hébergement et des frais annexes, création des comptes **à votre nom**.
5. **Développement** (Essentiel : 2 semaines et plus · Autonome : 3 à 4 semaines).
6. **Mise en ligne + guide de prise en main.**

### 6. Qui je suis
- **Photo** et 3 à 4 lignes : *développeur avant tout, avec une vraie touche design (maquettes, petite direction artistique), basé entre Annecy et Genève, un interlocuteur unique du premier appel au suivi.*
- **Bandeau de faits clés :**
  - **Je conçois et développe depuis 2021** (5 ans).
  - **Cofondateur et responsable technique d'Obrado**, un logiciel en ligne utilisé par ~30 personnes. *Formulation B2B : « je construis des outils utilisés au quotidien, pas seulement des vitrines ».*
  - **Nominé au Startup Weekend Annecy 2025.**
  - **En agence de communication en Haute-Savoie**, au pôle digital : sites web et automatisation IA (voir le point de vigilance 9.1).
- Pas de mention « étudiant » ni « alternant ».

### 7. FAQ (5 à 6 questions)
- Combien de temps pour avoir mon site ?
- Combien coûtent vraiment l'hébergement et les abonnements ? (payés directement par vous, montant indicatif)
- Je suis en Suisse : comment se passe la facturation ? (CHF ou €, TVA non applicable)
- Et si on arrête de travailler ensemble ? (tout est à votre nom, rien n'est bloqué)
- Je ne suis pas à l'aise avec l'informatique, est-ce un problème ?
- L'IA, concrètement, ça fait quoi pour moi ?

### 8. Contact final + pied de page
- Le **créneau Cal.com est intégré** directement dans la page, avec e-mail et WhatsApp en dessous.
- **Pied de page :** logotype KORVO, zones couvertes (Annecy, Grand Annecy, Haute-Savoie, Genève, arc lémanique), SIRET, mentions légales, mention TVA.

## 6. Ce que la page ne contient pas (volontairement)

- Pas de section témoignages ni de logos clients pour l'instant (la page reste prête à en accueillir plus tard).
- Pas de stack, pas de compétences techniques, pas de projets du portfolio (Éos, impression 3D, LiDAR…).
- Pas de blog, ni de menu à plusieurs entrées.

## 7. Matière disponible

### Photos (`Photo-Killian/`)
| Fichier | Usage |
|---|---|
| `WhatsApp Image 2026-11-23 at 11.07.32.jpeg` (montagne, arc-en-ciel) | **Principale** : « Qui je suis » ou hero, recadrée serrée à droite (couper le bus et le panneau). |
| `WhatsApp Image 2026-11-23 at 11.07.31 (5).jpeg` (rivière, t-shirt vert) | **Avatar** de l'assistant et du bloc contact (recadrage visage). |
| `20251010-StartupWeekend-Dimanche-107.jpg` | Vignette seulement (492×643), à côté du fait « Startup Weekend ». |
| `… (2).jpeg` (sur scène) | Écartée par défaut : l'écran affiche du jargon (ARKit, YOLO). Possible si recadrée. |
| Les autres (vacances, de dos) | Non utilisées. |

➡️ **Recommandé :** une séance de 15 minutes pour une photo **en situation de travail** (ordinateur, bureau ou café, haut uni). C'est l'image idéale pour le hero.

### Visuels projets (`public/images/`)
`les-ignobles.webp`, `adn-studio.webp`, `debatium.png` : à vérifier en qualité et à compléter par des captures propres (desktop + mobile).

### Identité
- **Logotype :** « KORVO » en *The Seasons*, lettres espacées (0.14em), filet sauge (cf. `src/app/[lang]/opengraph-image.tsx`).
- **Palette Korvo existante** (point de départ possible, à décider à l'étape DA) : floral white `#f7f5ee`, noir, sauge `#666d57`, sand `#bbb5a7`, cloud `#d0d0ce`. Typos : *The Seasons* (titres) et *Source Sans Pro* (texte). Voir `content/07-brand-korvo.md`.

## 8. À prévoir hors page (avant le premier client)

- [ ] Compte **Cal.com** : créneau « Appel découverte 20 min », soirs et pauses.
- [ ] **Mentions légales** (SIRET, hébergeur), **CGV**, **modèle de devis** avec la mention TVA 293 B.
- [ ] **Fiche Google Business Profile** : avis futurs et visibilité locale.
- [ ] **Cartes de visite + QR code** pointant vers la page (option : paramètre par métier, ex. `?pour=artisans`, pour adapter le hero plus tard).
- [ ] Compte API de l'assistant avec un **plafond de dépense**.

## 9. Points de vigilance & questions ouvertes

1. **⚠️ Popote et la concurrence.** Agence Popote est une agence de communication 360° à Megève, Annecy et Aix-les-Bains. Elle sert le **même type de clients locaux** (hôtellerie, restauration, commerces des Alpes) et vend aussi des sites. Même sans clause d'exclusivité :
   - **ne pas démarcher les clients ni les prospects de Popote**, et ne jamais montrer leurs projets comme réalisations ;
   - **demander l'accord de l'agence** avant de la **nommer** sur la page. En attendant : « en agence de communication en Haute-Savoie, au pôle digital » ;
   - en parler ouvertement en interne évite un malaise si un client commun te croise.
2. ✅ **Accords clients :** Les Ignobles et ADN Studio acceptent qu'on montre leurs sites (noms + captures).
3. **Sous-titre du hero** et textes : à finaliser pendant la maquette.
4. ✅ **Direction artistique :** on reprend l'**univers Korvo** (couleurs et typos, voir section 7), nourri par les inspirations rassemblées dans le Figma. L'objectif est une page **vraiment sympa et mémorable**, pas un template sage.
5. **Stack et hébergement de la page** (même repo Next.js avec routage par sous-domaine, ou projet séparé) : décision technique après la maquette.
