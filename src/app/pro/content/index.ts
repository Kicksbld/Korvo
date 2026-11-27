import "server-only";
import type { Locale } from "@/i18n/config";
import type { ProContent } from "./types";

/* Chargement des textes de la page pro. Réutilise la liste des langues du
   portfolio (src/i18n/config.ts) mais avec des dictionnaires propres. */

const contents: Record<Locale, () => Promise<ProContent>> = {
  fr: () => import("./fr").then((m) => m.default),
  en: () => import("./en").then((m) => m.default),
};

export const getProContent = (locale: Locale): Promise<ProContent> => contents[locale]();

export type { ProContent };
