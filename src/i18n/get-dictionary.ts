import "server-only";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("@/i18n/dictionaries/fr").then((m) => m.default),
  en: () => import("@/i18n/dictionaries/en").then((m) => m.default),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> => dictionaries[locale]();
