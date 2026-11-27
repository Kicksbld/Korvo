import type { Locale } from "@/i18n/config";

/* URLs publiques de la page pro.

   La page n'est servie que sur son sous-domaine (pro.korvo-studio.fr en
   production, pro.localhost:3000 en local) : src/proxy.ts réécrit "/" vers
   /pro/fr et "/en" vers /pro/en. Les liens internes s'écrivent donc
   toujours sans le préfixe /pro. */

export const PRO_HOST = "pro.korvo-studio.fr";
export const PRO_URL = `https://${PRO_HOST}`;
export const PORTFOLIO_URL = "https://korvo-studio.fr";

/** Chemin public d'une page pro dans une langue donnée ("" = accueil). */
export function proPath(lang: Locale, path = ""): string {
  const clean = path.replace(/^\/+/, "");
  if (lang === "fr") return `/${clean}`;
  return clean ? `/en/${clean}` : "/en";
}
