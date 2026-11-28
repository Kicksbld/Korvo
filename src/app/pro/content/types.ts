/* Structure des textes de la page pro. fr.ts et en.ts implémentent ce type :
   TypeScript refuse toute clé manquante ou en trop dans l'une des langues.

   Les sections suivent l'ordre de la page (docs/dev-page-pro.md §3). */

export interface ProContent {
  meta: {
    title: string;
    description: string;
  };
  header: {
    /** Nom accessible du logotype (lien vers le haut de page). */
    homeLabel: string;
    /** Nom accessible du sélecteur de langue. */
    langLabel: string;
    /** Nom complet de chaque langue, lu par les lecteurs d'écran. */
    langNames: { fr: string; en: string };
    portfolio: {
      /** Libellé desktop. */
      label: string;
      /** Libellé mobile, plus court. */
      labelShort: string;
      /** Précision pour les lecteurs d'écran : le lien ouvre un autre site. */
      external: string;
    };
    bookCall: string;
  };
  hero: {
    kicker: string;
    /** Accroche raccourcie du mobile. */
    kickerShort: string;
    /** Deux lignes, sans le point final (posé en bronze par le composant). */
    title: [string, string];
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    photoAlt: string;
    /** Titre du carrousel mobile ; titre caché des cartes en desktop. */
    problemsTitle: string;
    /** Les 4 cartes-problèmes, dans l'ordre : haut gauche, bas gauche,
     *  haut droite, bas droite (desktop) — ordre de lecture du carrousel. */
    problems: [Problem, Problem, Problem, Problem];
  };
  offers: {
    title: string;
    /** Masqué en mobile (absent de la maquette 390). */
    subtitle: string;
    tabsLabel: string;
    tabs: Record<Need, string>;
    currencyLabel: string;
    currencies: Record<Currency, string>;
    /** « dès », au-dessus des prix. */
    from: string;
    groups: Record<Need, [Offer, Offer]>;
    serenity: { name: string; text: string; price: Price; note: string };
    legal: string;
  };
  work: {
    title: string;
    /** Deux lignes. */
    intro: [string, string];
    trackLabel: string;
    prev: string;
    next: string;
    /** Lu après le libellé du lien vers un site client. */
    external: string;
    projects: Project[];
  };
  demo: {
    title: string;
    /** Masquée en mobile (absente de la maquette 390). */
    intro: string;
    /** Nom accessible de la démo figée (phase 2). */
    figureLabel: string;
    featuresTitle: string;
    features: string[];
    /** Page Korvo floutée derrière le volet, dans le téléphone (desktop). */
    phone: { time: string; brand: string; title: string; text: string };
    assistant: {
      name: string;
      /** Étiquette « Démo » toujours visible. */
      badge: string;
      close: string;
      question: string;
      answer: string;
      offer: { name: string; delay: string; price: string; priceAlt: string };
      followUp: string;
      actions: [string, string];
      placeholder: string;
      /** Questions d'exemple qui s'écrivent seules dans le champ (invitation à essayer). */
      examples: string[];
      send: string;
    };
  };
  keys: {
    title: string;
    text: string;
    aside: string;
    /** Les 4 étiquettes du trousseau : haut gauche, haut droite, bas gauche, bas droite. */
    tags: [string, string, string, string];
    /** Annotation manuscrite sous chaque étiquette. */
    tagNote: string;
    commitments: {
      title: string;
      /** Masqué en mobile (absent de la maquette 390), comme les détails. */
      text: string;
      items: Array<{ title: string; text: string }>;
    };
  };
  process: {
    title: string;
    steps: Array<{ title: string; text: string }>;
    /** Étiquette de l'étape mise en avant (3) : courte en desktop, longue en mobile. */
    highlightTag: { short: string; long: string };
    /** Masquée en mobile (absente de la maquette 390). */
    ctaNote: string;
    cta: string;
  };
  about: {
    /** Deux lignes. */
    title: [string, string];
    portraitAlt: string;
    /** Légende manuscrite sous le tirage photo. */
    photoCaption: string;
    /** Les 4 repères : haut gauche, bas gauche, haut droite, bas droite (desktop). */
    milestones: [Milestone, Milestone, Milestone, Milestone];
    bio: string;
    cta: string;
  };
  faq: {
    /** Deux lignes. */
    title: [string, string];
    /** Masqués en mobile (absents de la maquette 390). */
    intro: string;
    cta: string;
    items: Array<{ question: string; answer: string }>;
  };
  contact: {
    title: string;
    text: string;
    /** Version mobile du texte, plus courte. */
    textShort: string;
    otherLabel: string;
    whatsapp: string;
    email: string;
    calendar: {
      title: string;
      meta: string;
      /** Emplacement réservé : Cal.com est intégré en phase 4. */
      placeholder: string;
    };
  };
  footer: {
    zonesLabel: string;
    zones: string;
    tagline: string;
    cta: string;
    siret: string;
    vat: string;
    legal: string;
    copyright: string;
  };
  mobileBar: {
    label: string;
    book: string;
    whatsapp: string;
  };
}

export interface Milestone {
  title: string;
  text: string;
}

export type Currency = "eur" | "chf";
export type Need = "site" | "temps";
/** Un montant dans chaque devise, déjà formaté pour la langue. */
export type Price = Record<Currency, string>;

export interface Offer {
  name: string;
  description: string;
  benefits: string[];
  price: Price;
  /** Précision sous le prix (ex. « ou dès +500 € sur un site neuf »). */
  priceNote?: Price;
}

export type ProjectVisual = "debatium" | "ignobles" | "adn";

export interface Project {
  id: string;
  visual: ProjectVisual;
  name: string;
  /** Client · lieu · nature du projet. */
  meta: string;
  text: string;
  /** Texte alternatif de la (des) capture(s). */
  alt: string;
  /** Adresse affichée dans la barre du faux navigateur. */
  domain?: string;
  link?: { href: string; label: string };
  /** Remplace le lien quand le projet n'est pas public. */
  note?: string;
}

export interface Problem {
  title: string;
  text: string;
}
