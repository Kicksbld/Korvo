/** Segment de texte enrichi : un mot ou groupe de mots, avec ou sans
 * l'accent sage (`--sage-700`). Permet à chaque langue de garder son
 * propre ordre de mots sans dupliquer le balisage. */
export type RichSegment = { text: string; accent?: boolean };

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  header: {
    brand: string;
    menuOpen: string;
    menuClose: string;
    langAria: string;
    indexAria: string;
    nav: {
      projets: string;
      maker: string;
      parcours: string;
      competences: string;
      photographie: string;
      contact: string;
    };
    available: string;
    cvLink: string;
  };
  hero: {
    greeting: string;
    available: string;
    title: RichSegment[];
    subtitle: string;
    ctaProjects: string;
    ctaCv: string;
  };
  positionnement: {
    eyebrow: string;
    heading: RichSegment[];
    paragraph: {
      before: string;
      accent1: string;
      betweenAccent1AndAccent2: string;
      accent2: string;
      afterAccent2: string;
      betweenImg2AndImg3: string;
      end: string;
    };
    capEyebrow: string;
    capText: RichSegment[];
  };
  projets: {
    eyebrow: string;
    obrado: {
      eyebrow: string;
      heading: RichSegment[];
      paragraph: string;
      meta: string;
      tech: string[];
      link: string;
      figureAlt: string;
      nomination: {
        logoAlt: string;
        heading: string;
        paragraph: string;
        imageAlt: string;
      };
    };
    eos: {
      eyebrow: string;
      heading: RichSegment[];
      paragraph: string;
      role: string;
      tech: string[];
      link: string;
      figureAlt: string;
      facts: { fact: string; detail: string }[];
      grammarAlt: string;
    };
  };
  maker: {
    sectionLabel: string;
    heading: string;
    paragraph: string;
    stepLabel: string;
    steps: { title: string; text: string; alt: string }[];
  };
  parcours: {
    eyebrow: string;
    tournantEyebrow: string;
    heading: string;
    paragraph: string;
    link: string;
    timeline: {
      period: string;
      title: string;
      description: string;
      images?: string[];
    }[];
  };
  competences: {
    sectionLabel: string;
    cards: {
      title: string;
      items: { label: string; level?: string }[];
    }[];
  };
  aviation: {
    sectionLabel: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    parapenteAlt: string;
    batemAlt: string;
  };
  photographie: {
    sectionLabel: string;
    heading: string;
    paragraph: string;
    gallery: string[];
  };
  contact: {
    sectionLabel: string;
    headingLine1: string;
    headingLine2: string;
    paragraph: string;
    ctaContact: string;
    ctaCv: string;
  };
  footer: {
    copyright: string;
    phoneLabel: string;
  };
}
