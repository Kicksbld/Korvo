/* Locales supportées — le français vit à la racine ("/" et "/fr"), l'anglais
   sous "/en". Voir next.config.ts pour la réécriture "/" -> "/fr". */

export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const hasLocale = (locale: string): locale is Locale =>
  (locales as readonly string[]).includes(locale);
