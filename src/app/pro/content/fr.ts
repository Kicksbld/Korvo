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
    title: ["Votre entreprise,", "à l'heure de l'IA"],
    subtitle:
      "Sites internet, automatisations et assistants IA pour les artisans, indépendants et PME d'Annecy à Genève. Moins d'administratif, plus de clients.",
    ctaPrimary: "Réserver un appel de 20 min",
    ctaSecondary: "Voir les offres",
  },
};

export default fr;
