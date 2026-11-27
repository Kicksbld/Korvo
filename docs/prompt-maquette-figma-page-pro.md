On attaque la maquette Figma de ma page pro Korvo, destinée à mes clients freelance B2B (artisans, indépendants et PME entre Annecy et Genève). Toute la stratégie est déjà décidée, ton rôle ici est le **design UI/UX**.

## À lire avant tout (dans cet ordre)

1. `docs/brief-page-pro.md` : **la source de vérité**. Structure validée, textes, offres, preuves, règles de discours, photos. Tout ce qui y est marqué comme décidé n'est plus à rediscuter.
2. `brief_page_client_freelance_contexte_claude.md` : le brief d'origine (contexte business, fourchettes de prix complètes).
3. `content/07-brand-korvo.md` et `src/app/korvo-tokens.css` : mon univers Korvo (palette, typos *The Seasons* et *Source Sans Pro*, échelle typographique, logotype « KORVO » espacé avec filet sauge).

## Inspirations (à analyser en premier)

Toutes mes inspirations sont rassemblées dans le **fichier Figma, nœud `179-7`** (dont ma sélection Cosmos « website-pro »). C'est aussi dans ce fichier que tu designes. Lien : https://www.figma.com/design/PPonPlOdxWkRgvF2fG80uJ/Personal-Brand?node-id=179-7

Lis-les via le MCP Figma (captures du nœud et de ses enfants), pas via le navigateur.

⚠️ **Il y a encore peu d'inspirations pour l'instant.** Prends-les comme une indication de goût, pas comme un catalogue à copier. Je compte sur toi pour **proposer aussi tes propres pistes originales**, qui vont au-delà de ce que j'ai rassemblé. Pour chaque section, au moins une variante doit venir de ta propre idée plutôt que des inspirations. Signale-la comme telle dans sa note.

Commence par les analyser, puis résume-moi en quelques lignes ce que tu en retiens (mises en page, gestes graphiques, rythme, typo, couleurs, détails) et comment tu comptes les marier à l'univers Korvo. Attends mon retour avant de designer.

## Le fichier Figma
- Charge les skills Figma (`figma-use`, `figma-generate-design`) avant d'écrire dans le fichier. Regarde aussi les styles et variables déjà présents : réutilise-les ou crée les tokens Korvo s'ils n'existent pas.

## Ce que j'attends

**Direction :** l'univers Korvo (couleurs, typos) est le **point de départ, pas une contrainte figée**. Je ne m'arrête pas forcément aux mêmes couleurs ni aux mêmes typos : tu peux les **adapter ou les faire évoluer pour un rendu encore plus moderne** (nuances de palette, une couleur d'accent en plus, une autre typo de titre ou de texte…), tant qu'on garde un air de famille avec Korvo. Je veux quelque chose de **vraiment sympa et mémorable**, pas un template de landing page générique. Les inspirations donnent le ton. Quand une variante s'éloigne de la charte Korvo, dis-le dans sa note et explique pourquoi.

**Méthode : plusieurs propositions par section, je choisis, puis on fusionne.**
1. Crée une page Figma « Page pro — Propositions ».
2. Pour **chaque section** de la structure du brief (barre du haut, hero, offres, réalisations & démo, « Tout reste à vous », processus, qui je suis, FAQ, contact + pied de page), conçois **2 à 3 variantes UI/UX vraiment différentes** (mise en page, hiérarchie, interaction), pas de simples variations de couleur.
   - Une ligne par section, les variantes côte à côte, nommées `Hero — A`, `Hero — B`…
   - Chaque variante en **desktop 1440** avec son **adaptation mobile 390**. La majorité des visiteurs arrivent sur mobile via le QR code de ma carte de visite, donc le mobile n'est pas secondaire.
   - Sous chaque variante, une note courte : l'idée, son point fort, son risque.
   - Pour les animations et interactions envisagées (bascule €/CHF, assistant IA, survols, apparition au défilement), une annotation suffit.
3. Avance section par section ou par petits lots, et montre-moi le résultat (capture) au fur et à mesure.
4. Quand j'ai choisi une variante par section, tu les **fusionnes** sur une page « Page pro — Maquette finale », en desktop et en mobile, cohérentes entre elles.

## Contenu et contraintes (détail dans le brief)

- **Vrais textes en français** tirés du brief, pas de lorem ipsum. Titre du hero : *« Votre entreprise, à l'heure de l'IA. »*
- **Zéro jargon technique, aucune stack citée.** Je ne suis pas présenté comme étudiant ni alternant.
- **Barre du haut :** le logotype KORVO, pas mon nom. Sur mobile, une barre fixe en bas avec « Réserver 20 min » et WhatsApp.
- **Action principale :** réserver un appel de 20 min (Cal.com intégré dans le bloc contact).
- **Offres :** prix en « dès … » avec une bascule Annecy € / Genève CHF, regroupés en 3 familles (Votre site / Gagner du temps / Sérénité).
- **Réalisations :**
  - **Les Ignobles** : refonte de la landing page, intégration et animations faites à partir des maquettes de leurs designers, donc on ne dit pas que j'ai fait le design.
  - **Le back-office de leur application Debatium** : l'IA y traduit le contenu en plusieurs langues et génère du contenu rapidement.
  - **ADN Studio by Nelly** : site vitrine et prise de rendez-vous en ligne.
  - Les deux clients sont d'accord pour être montrés. Pas d'Alibaba.
  - La **démo de l'assistant IA** (intégré à la page) est clairement étiquetée.
- **Pas de section témoignages.**
- **Photos :** dans `Photo-Killian/`, avec la sélection et les recadrages indiqués dans la section 7 du brief. Visuels des projets dans `public/images/` (`les-ignobles.webp`, `adn-studio.webp`, `debatium.png`).
- **Popote :** ne pas la nommer. Écrire « en agence de communication en Haute-Savoie, au pôle digital ».

## Règles de travail

- **Tu proposes, je tranche.** Ne fusionne rien et ne passe pas au code avant mon choix.
- Pas de code dans cette conversation : on reste dans Figma.
- Si une info manque ou te paraît contradictoire avec le brief, demande-moi plutôt que d'inventer.
