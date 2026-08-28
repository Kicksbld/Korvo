import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Deux URLs canoniques : le français à la racine "/" (la réécriture "/" -> "/fr"
   rend "/fr" dupliqué, on ne le liste pas), l'anglais sous "/en". */

const languages = {
  fr: `${SITE_URL}/`,
  en: `${SITE_URL}/en`,
  "x-default": `${SITE_URL}/`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages },
    },
  ];
}
