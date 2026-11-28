import type { ProContent } from "./types";

/* Textes de la maquette v2 (Figma, page « Page pro — Maquette finale v2 »).
   Règles : vouvoiement, zéro jargon, rien d'inventé. Voir docs/brief-page-pro.md. */

const fr: ProContent = {
  meta: {
    title: "Korvo — Votre entreprise, à l'heure de l'IA",
    description:
      "Sites internet, automatisations et assistants IA pour les artisans, indépendants et PME d'Annecy à Genève. Moins d'administratif, plus de clients.",
  },
  header: {
    homeLabel: "Korvo, haut de page",
    langLabel: "Langue",
    langNames: { fr: "Français", en: "English" },
    portfolio: {
      label: "Mon parcours & mes projets",
      labelShort: "Mon parcours",
      external: "(ouvre korvo-studio.fr)",
    },
    bookCall: "Réserver un appel",
  },
  hero: {
    kicker: "Développeur & designer indépendant · Annecy - Genève",
    kickerShort: "Indépendant · Annecy - Genève",
    title: ["Votre entreprise,", "à l'heure de l'IA"],
    subtitle:
      "Sites internet, automatisations et assistants IA pour les artisans, indépendants et PME d'Annecy à Genève. Moins d'administratif, plus de clients.",
    ctaPrimary: "Réserver un appel de 20 min",
    ctaSecondary: "Voir les offres",
    photoAlt: "Killian, développeur et designer indépendant, souriant, en polo blanc",
    problemsTitle: "Vous vous reconnaissez ?",
    problems: [
      { title: "On ne vous trouve pas sur Google.", text: "Un site clair, pensé pour être trouvé près de chez vous." },
      { title: "Votre site date, ou s'affiche mal sur téléphone.", text: "Un site neuf, net sur tous les écrans." },
      { title: "Vous ratez des appels sur le chantier.", text: "Un assistant répond et note les demandes, jour et nuit." },
      { title: "Vos soirées partent en devis et en relances.", text: "Les relances et les rendez-vous se gèrent tout seuls." },
    ],
  },
  offers: {
    title: "Par quoi on commence ?",
    subtitle: "Choisissez votre besoin : je vous montre les offres qui y répondent.",
    tabsLabel: "Votre besoin",
    tabs: { site: "J'ai besoin d'un site", temps: "Je veux gagner du temps" },
    currencyLabel: "Afficher les prix pour",
    currencies: { eur: "Annecy · €", chf: "Genève · CHF" },
    from: "dès",
    groups: {
      // ⚠️ À VALIDER : l'onglet « site » n'est pas dessiné dans la maquette v2.
      // Textes tirés du brief (§5.2), bénéfices rédigés en phase 2.
      site: [
        {
          name: "Essentiel",
          description: "Une présence pro et crédible, et des demandes reçues sans toucher au site.",
          benefits: [
            "Un site clair, net sur tous les écrans",
            "Pensé pour être trouvé près de chez vous",
            "Les demandes de vos clients arrivent directement chez vous",
            "En ligne en 2 semaines et plus",
          ],
          price: { eur: "1\u00a0400\u00a0€", chf: "2\u00a0000\u00a0CHF" },
        },
        {
          name: "Autonome",
          description: "Vous modifiez vous-même textes, photos, réalisations et tarifs.",
          benefits: [
            "Tout ce que contient l'Essentiel",
            "Textes, photos, réalisations et tarifs modifiables par vous",
            "Une mini-formation pour être à l'aise",
            "En ligne en 3 à 4 semaines",
          ],
          price: { eur: "2\u00a0200\u00a0€", chf: "3\u00a0000\u00a0CHF" },
        },
      ],
      temps: [
        {
          name: "Automatisation",
          description: "Moins d'administratif : demandes, devis, relances, rendez-vous et tri des mails.",
          benefits: [
            "Vos demandes triées et résumées pour vous",
            "Devis et relances envoyés à temps",
            "Rendez-vous pris en ligne, sans appel",
            "Vos mails rangés automatiquement",
          ],
          price: { eur: "1\u00a0500\u00a0€", chf: "2\u00a0200\u00a0CHF" },
        },
        {
          name: "Assistant 24/7",
          description: "Il répond à vos clients, comprend leur besoin et vous envoie un résumé.",
          benefits: [
            "Répond aux questions fréquentes, jour et nuit",
            "Récupère le besoin et le contact",
            "Un résumé envoyé directement au gérant",
            "Sur votre site actuel ou sur un site neuf",
          ],
          price: { eur: "900\u00a0€", chf: "1\u00a0300\u00a0CHF" },
          priceNote: { eur: "ou dès +500\u00a0€ sur un site neuf", chf: "ou dès +700\u00a0CHF sur un site neuf" },
        },
      ],
    },
    serenity: {
      name: "Sérénité",
      text: "Mises à jour, sauvegardes, surveillance du site et de l'assistant, et 30 min à 1 h de modifications incluses chaque mois.",
      price: { eur: "dès 70\u00a0€\u00a0/ mois", chf: "dès 100\u00a0CHF\u00a0/ mois" },
      note: "sans engagement",
    },
    legal: "TVA non applicable, art. 293 B du CGI. Le prix exact est fixé au devis, avant de commencer.",
  },
  work: {
    title: "Mes réalisations.",
    intro: ["Deux clients près d'Annecy, trois projets.", "Faites défiler pour les découvrir."],
    trackLabel: "Projets",
    prev: "Projet précédent",
    next: "Projet suivant",
    external: "(nouvel onglet)",
    projects: [
      {
        id: "debatium",
        visual: "debatium",
        name: "Debatium",
        meta: "Les Ignobles · Annecy · outil interne avec IA",
        text: "Les Ignobles, studio d'applications à Annecy, avaient besoin d'un outil pour gérer les questions et les packs de contenu de leur application Debatium. J'ai construit ce back-office et j'y ai intégré une IA : elle traduit le contenu en plusieurs langues et génère de nouvelles questions en quelques secondes. Ce qui prenait des heures se fait maintenant en quelques clics.",
        alt: "Écran de l'outil d'administration de Debatium : la liste des questions de l'application.",
        note: "Outil interne : non accessible au public.",
      },
      {
        id: "les-ignobles",
        visual: "ignobles",
        name: "Les Ignobles",
        meta: "Studio d'applications · Annecy · page d'accueil",
        text: "Pour la refonte de leur page d'accueil, leurs designers ont dessiné les maquettes ; je les ai intégrées et animées. Le résultat : une page fluide, fidèle au design, qui s'affiche aussi bien sur ordinateur que sur téléphone.",
        alt: "Page d'accueil de lesignobles.com, sur ordinateur et sur téléphone.",
        domain: "lesignobles.com",
        link: { href: "https://www.lesignobles.com/", label: "lesignobles.com" },
      },
      {
        id: "adn-studio",
        visual: "adn",
        name: "ADN Studio by Nelly",
        meta: "Salon de coiffure · Haute-Savoie · site et réservation",
        text: "Un salon de coiffure qui voulait une vitrine à son image et un moyen simple de prendre rendez-vous. J'ai réalisé le site et mis en place la réservation en ligne : les clientes choisissent leur créneau seules, 24 h/24, sans appeler le salon.",
        alt: "Page d'accueil du site d'ADN Studio by Nelly.",
        domain: "adn-studio-by-nelly.fr",
        link: { href: "https://www.adn-studio-by-nelly.fr/", label: "adn-studio-by-nelly.fr" },
      },
    ],
  },
  demo: {
    title: "Et maintenant, essayez.",
    intro: "Voici l'assistant que je peux installer sur votre site. Posez-lui une vraie question sur mes offres.",
    figureLabel: "Aperçu de l'assistant : un exemple de conversation.",
    featuresTitle: "Ce qu'il fait",
    features: [
      "Répond sur les offres, délais et zones",
      "Récupère votre besoin et votre contact",
      "M'envoie un résumé, même le soir",
      "Ne promet rien hors de la grille",
    ],
    phone: {
      time: "21:47",
      brand: "KORVO",
      title: "Votre entreprise, à l'heure de l'IA.",
      text: "Sites internet, automatisations et assistants IA pour les artisans, indépendants et PME.",
    },
    assistant: {
      name: "Assistant Korvo",
      badge: "Démo · assistant IA, répond à la place de Killian",
      close: "Fermer",
      question: "Bonjour, c'est combien un site pour mon entreprise de paysagisme ?",
      answer: "Bonjour ! Pour un site vitrine, c'est l'offre Essentiel. Le prix exact est fixé au devis, après un appel de 20 minutes.",
      offer: { name: "Site Essentiel", delay: "En ligne en 2 semaines et plus", price: "dès 1\u00a0400\u00a0€", priceAlt: "2\u00a0000\u00a0CHF à Genève" },
      followUp: "Je vous propose un créneau pour en parler avec Killian ?",
      actions: ["Réserver 20 min", "Laisser mon numéro"],
      placeholder: "Écrire un message…",
      examples: ["Combien coûte un site\u00a0?", "Vous intervenez à Genève\u00a0?", "En combien de temps c'est en ligne\u00a0?"],
      send: "Envoyer",
    },
  },
  keys: {
    title: "Les clés restent dans votre poche.",
    text: "Nom de domaine, hébergement, adresses mail, compte de l'assistant : tout est créé à votre nom. Je travaille avec un accès que vous me donnez, et que vous pouvez reprendre quand vous voulez.",
    aside: "Si on arrête de travailler ensemble, rien n'est bloqué. Et vos données restent sur vos comptes.",
    tags: ["Nom de domaine", "Hébergement", "Adresses mail pro", "Compte de l'assistant IA"],
    tagNote: "à votre nom",
    commitments: {
      title: "Mes engagements",
      text: "L'automatisation et l'assistant tournent sur vos propres comptes : vos données restent chez vous.",
      items: [
        { title: "Vous voyez votre site avant de signer", text: "Une maquette et un prototype accompagnent le devis." },
        { title: "Un prix fixe", text: "Annoncé au devis, il ne bouge pas." },
        { title: "Les frais annexes, en clair", text: "Présentés avant le lancement, payés directement par vous." },
        { title: "Un guide de prise en main", text: "Pour être autonome dès la mise en ligne." },
        { title: "Un suivi sans engagement", text: "Vous arrêtez quand vous voulez." },
      ],
    },
  },
  process: {
    title: "Du premier appel à la mise en ligne.",
    steps: [
      { title: "Appel découverte", text: "20 minutes, réservées en ligne. Vous me parlez de votre activité et de ce qui vous fait perdre du temps." },
      { title: "Analyse de votre besoin", text: "Je reviens vers vous avec des questions précises, et un second appel si des précisions sont nécessaires." },
      { title: "Devis + première maquette", text: "Un prix fixe, et un prototype offert pour voir votre site avant de signer." },
      { title: "Mise en place", text: "Je vous présente l'hébergement et les frais annexes. Les comptes sont créés à votre nom." },
      { title: "Développement", text: "Essentiel : 2 semaines et plus. Autonome : 3 à 4 semaines." },
      { title: "Mise en ligne + guide", text: "Votre site est en ligne, avec un guide de prise en main pour être autonome." },
    ],
    highlightTag: { short: "Maquette offerte", long: "Maquette et prototype offerts" },
    ctaNote: "L'étape 1 prend 20 minutes.",
    cta: "Réserver l'appel découverte",
  },
  about: {
    title: ["Un seul interlocuteur,", "du premier appel au suivi."],
    portraitAlt: "Killian, au bord d'une rivière, en t-shirt vert, souriant",
    photoCaption: "Killian, entre Annecy et Genève",
    milestones: [
      { title: "Depuis 2021", text: "Je conçois et je développe des sites et des outils." },
      { title: "Obrado", text: "Cofondateur et responsable technique de ce logiciel en ligne." },
      { title: "Startup Weekend", text: "Nominé à l'édition d'Annecy 2025." },
      { title: "Pôle digital", text: "En agence de communication en Haute-Savoie : sites web et automatisation IA." },
    ],
    bio: "Développeur avant tout, avec une vraie touche design : je dessine les maquettes et je construis ce qu'il y a derrière. Basé entre Annecy et Genève, c'est moi que vous avez au bout du fil, du premier appel au suivi.",
    cta: "Réserver un appel avec moi",
  },
  faq: {
    title: ["Vos questions,", "mes réponses."],
    intro: "Une autre question ? Posez-la à l'assistant de la page, ou parlons-en de vive voix.",
    cta: "Réserver un appel",
    // ⚠️ À VALIDER : seule la première réponse figure dans la maquette v2.
    // Les autres sont rédigées d'après le brief (§5.7), sans aucun montant.
    items: [
      {
        question: "Combien de temps pour avoir mon site ?",
        answer: "Comptez 2 semaines et plus pour un site Essentiel, et 3 à 4 semaines pour un site Autonome. Le délai exact est écrit dans le devis.",
      },
      {
        question: "Combien coûtent vraiment l'hébergement et les abonnements ?",
        answer: "Ils sont payés directement par vous, à votre nom. Je vous donne un montant indicatif avant le lancement, pour que rien ne vous surprenne.",
      },
      {
        question: "Je suis en Suisse : comment se passe la facturation ?",
        answer: "Je facture en francs suisses ou en euros, comme vous préférez. La TVA n'est pas applicable : le prix du devis est le prix que vous payez.",
      },
      {
        question: "Et si on arrête de travailler ensemble ?",
        answer: "Rien n'est bloqué. Le nom de domaine, l'hébergement, les adresses mail et le compte de l'assistant sont à votre nom : vous gardez tout, et vous reprenez l'accès que vous m'aviez donné.",
      },
      {
        question: "Je ne suis pas à l'aise avec l'informatique, est-ce un problème ?",
        answer: "Pas du tout. Je m'occupe de la technique, je vous explique tout simplement, et vous recevez un guide de prise en main à la mise en ligne. Vous avez un seul interlocuteur, du premier appel au suivi.",
      },
      {
        question: "L'IA, concrètement, ça fait quoi pour moi ?",
        answer: "Elle vous fait gagner du temps sur l'administratif : vos demandes sont triées et résumées pour vous, les devis et relances partent à temps, et un assistant répond à vos clients jour et nuit, puis vous envoie un résumé.",
      },
    ],
  },
  contact: {
    title: "Parlons de votre entreprise.",
    text: "Choisissez un créneau de 20 minutes, le midi ou le soir. On fait le point sur votre besoin, sans jargon.",
    textShort: "Un créneau de 20 minutes, le midi ou le soir.",
    otherLabel: "Ou, si vous préférez :",
    whatsapp: "Écrire sur WhatsApp",
    email: "Écrire un e-mail",
    calendar: {
      title: "Appel découverte",
      meta: "20 min · avec Killian",
      placeholder: "Le calendrier de réservation s'affichera ici.",
    },
  },
  footer: {
    zonesLabel: "Zones couvertes",
    zones: "Annecy · Grand Annecy · Haute-Savoie · Genève · arc lémanique",
    tagline: "Développeur & designer indépendant",
    cta: "Réserver un appel",
    siret: "SIRET : 94325886300027",
    vat: "TVA non applicable, art. 293 B du CGI",
    legal: "Mentions légales",
    copyright: "© 2026 Korvo · Killian Boularand",
  },
  mobileBar: {
    label: "Prendre contact",
    book: "Réserver 20 min",
    whatsapp: "WhatsApp",
  },
};

export default fr;
