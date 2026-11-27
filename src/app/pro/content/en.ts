import type { ProContent } from "./types";

/* Traduction anglaise — BROUILLON de phase 1, limité à la barre et au hero.
   La traduction complète est écrite en phase 2 et validée par Killian
   avant le merge. Mêmes règles de discours qu'en français. */

const en: ProContent = {
  meta: {
    title: "Korvo — Your business, in the age of AI",
    description:
      "Websites, automations and AI assistants for tradespeople, freelancers and small businesses from Annecy to Geneva. Less paperwork, more clients.",
  },
  header: {
    homeLabel: "Korvo, back to top",
    langLabel: "Language",
    langNames: { fr: "Français", en: "English" },
    portfolio: {
      label: "My background & projects",
      labelShort: "My background",
      external: "(opens korvo-studio.fr)",
    },
    bookCall: "Book a call",
  },
  hero: {
    kicker: "Independent developer & designer · Annecy - Geneva",
    title: ["Your business,", "in the age of AI"],
    subtitle:
      "Websites, automations and AI assistants for tradespeople, freelancers and small businesses from Annecy to Geneva. Less paperwork, more clients.",
    ctaPrimary: "Book a 20-min call",
    ctaSecondary: "See the offers",
  },
};

export default en;
