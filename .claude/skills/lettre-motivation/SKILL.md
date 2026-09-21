---
name: lettre-motivation
description: Rédige des lettres de motivation en français pour des candidatures dans le développement logiciel (web, mobile, embarqué), au modèle suisse ou français. À utiliser quand l'utilisateur veut écrire, adapter ou relire une lettre de motivation, une candidature spontanée, ou un message d'accompagnement pour un poste, un stage ou une alternance. Lit le profil du candidat depuis docs/cv-contenu-fr.md pour rester toujours à jour, sélectionne les expériences pertinentes pour le poste visé, applique les codes suisses ou français (structure, formules de politesse, mention des pièces jointes), et sauvegarde chaque lettre dans candidatures/.
---

# Rédacteur de Lettres de Motivation

Rédige des lettres de motivation **en français** pour Killian Boularand, développeur (web, mobile, systèmes embarqués), actuellement en recherche d'alternance en ingénierie logicielle embarquée à Genève. Le skill doit produire une lettre prête à envoyer, sobre, factuelle, qui sonne comme lui — pas comme un template générique.

## Avant de rédiger

1. **Lire le profil à jour** : toujours relire [docs/cv-contenu-fr.md](../../../docs/cv-contenu-fr.md) au moment de la demande, jamais depuis une mémoire ou un résumé mis en cache. C'est la source unique de vérité pour l'identité, les coordonnées, le parcours, les expériences, les compétences et les projets. Ne jamais inventer ou extrapoler un fait qui n'y figure pas et que l'utilisateur n'a pas fourni.
2. **Récolter les infos sur le poste**, si elles ne sont pas déjà données :
   - Intitulé du poste et entreprise
   - Ville / pays de l'entreprise (détermine le modèle par défaut, voir plus bas)
   - Nom du destinataire si connu (sinon `Madame, Monsieur,`)
   - Référence de l'annonce si mentionnée
   - Ce que l'utilisateur sait déjà de l'entreprise ou pourquoi elle l'intéresse (s'il ne donne rien, demander plutôt que d'inventer une accroche générique)
   - Candidature spontanée ou réponse à une annonce précise
3. **Demander quel modèle utiliser** : suisse ou français. Si le lieu de l'entreprise donné par l'utilisateur tranche clairement (ex. Genève, Lausanne, Suisse → suisse ; Paris, Lyon, France → français), le proposer comme défaut et laisser confirmer plutôt que d'imposer. Voir [references/modele-suisse.md](references/modele-suisse.md) et [references/modele-france.md](references/modele-france.md) pour le détail structurel de chaque modèle et [references/differences.md](references/differences.md) pour le tableau comparatif.

## Sélectionner les expériences pertinentes

Ne pas plaquer tout le CV dans la lettre. Choisir 2-3 éléments qui parlent directement au poste visé, parmi :

- **Embarqué / hardware** : Éos (Swift, ARKit, LiDAR, Core ML, Metal — dispositif d'assistance visuelle), STI2D spécialité SIN, prototypage Arduino/ESP32/Raspberry Pi, impression 3D et itération conception-fabrication.
- **Architecture logicielle / rigueur backend** : Obrado (CTO cofondateur, Clean Architecture, DDD, NestJS, Prisma, monorepo Nx, MVP en production).
- **Livraison produit / autonomie** : ControlResell (frontend + contributions Java SOLID, croissance d'utilisateurs), missions freelance (cadrage à mise en production en autonomie complète), Les Ignobles (intégration API OpenAI).
- **Polyvalence produit** : passage du code à l'objet physique (Fusion 360, Bambu Lab), design (Figma, design systems).

Pour un poste en ingénierie logicielle embarquée, faire porter le paragraphe "Moi" sur Éos et le parcours STI2D + prototypage, et utiliser Obrado/ControlResell pour montrer la rigueur logicielle. Pour un poste web/mobile pur, inverser l'emphase. Toujours vérifier auprès de l'utilisateur si le poste a un angle particulier (l'annonce mentionne des technos précises) pour ajuster.

## Structure Vous-Moi-Nous

Les deux modèles suisse et français utilisent cette trame en trois temps pour le corps de la lettre :

1. **Vous** : pourquoi ce poste, cette entreprise, précisément — jamais une accroche interchangeable. S'appuyer sur ce que l'utilisateur a dit de l'entreprise, ou sur les infos vérifiables qu'il a fournies (annonce, site, actualité).
2. **Moi** : les 2-3 expériences sélectionnées, avec un chiffre ou un fait concret par expérience quand c'est possible (ex. "MVP utilisé par une trentaine d'utilisateurs actifs", "base utilisateurs passée d'environ 50 à 150").
3. **Nous** : ce que la collaboration future apporte des deux côtés — pas une formule creuse, un lien concret entre ce que Killian sait faire et ce que le poste demande.

## Style (référence rapide)

Lire [references/style-guide.md](references/style-guide.md) pour le détail complet et [references/exemples.md](references/exemples.md) pour deux lettres réelles de calibration (à utiliser pour le TON uniquement — leurs faits sont datés, ne jamais en reprendre le contenu factuel).

Points clés :
- **Longueur** : une page. Vise 250 à 350 mots / environ 1600 à 2200 caractères. Paragraphes courts (2-4 phrases), aérés.
- **Voix** : première personne, factuelle, concrète. Jamais grandiloquente. Les faits et les chiffres portent l'enthousiasme, pas les adjectifs.
- **Aucun cadratin (—)** : trait d'union espacé si besoin d'un aparté.
- **Formule d'appel** : jamais "Bonjour" en ouverture. `Madame,` / `Monsieur,` / `Madame, Monsieur,` selon ce qui est connu du destinataire.
- **Anti-slop** : bannir les tournures de lettre de motivation clichées ("passionné depuis toujours", "je suis convaincu que mon profil correspond parfaitement à vos attentes", "fort d'une solide expérience", "n'hésitez pas à me contacter", "dynamique et motivé"). Chaque phrase doit être vérifiable ou spécifique à Killian, pas interchangeable avec n'importe quel candidat.

## Après rédaction

1. **Présenter le brouillon** dans la conversation, lisible, sans méta-commentaire.
2. **Annoncer le compteur** : mots et caractères, et confirmer que ça tient sur une page.
3. **Vérifier avec l'utilisateur** que les expériences choisies et l'accroche "Vous" sont justes, avant de considérer la lettre finale. Itérer si besoin.
4. **Sauvegarder** une fois validée : fichier `.md` dans `candidatures/{entreprise-slug}/lettre-{suisse|france}-{YYYY-MM-DD}.md` à la racine du projet (créer le dossier si besoin). Ne jamais écraser un fichier existant — si un fichier du même nom existe déjà pour la même date, suffixer `-2`, `-3`, etc. Ce dossier est volontairement hors du dépôt public (voir note ci-dessous).

## Note sur `candidatures/`

Korvo est un dépôt public (portfolio). Le dossier `candidatures/` est ajouté à `.gitignore` par ce skill pour que les lettres ciblant des entreprises précises, avec adresse et téléphone personnels, ne soient jamais publiées par erreur. Si `candidatures/` n'est pas encore dans `.gitignore` à la racine du projet, l'ajouter avant la première sauvegarde.
