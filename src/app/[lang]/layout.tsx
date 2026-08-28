import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "../globals.css";
import "../korvo-tokens.css";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SOCIAL_PROFILE_URLS } from "@/components/korvo/socials";
import { PERSON_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

// Cormorant Garamond — fonte de titres, remplace The Seasons (trial)
const seasons = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-seasons",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(props: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  /* Le français vit à la fois sur "/" (réécriture, voir next.config.ts) et
     "/fr" : l'URL canonique française est la racine propre "/". */
  const path = lang === "fr" ? "/" : "/en";

  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: path,
      languages: { fr: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: path,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
      title: dict.meta.title,
      description: dict.meta.description,
      /* image : fournie par la convention de fichier opengraph-image.tsx */
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  /* Données structurées schema.org — mêmes profils que le footer/sommaire. */
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_NAME,
    url: SITE_URL,
    jobTitle: dict.meta.jobTitle,
    description: dict.meta.description,
    sameAs: Object.values(SOCIAL_PROFILE_URLS),
  };

  return (
    <html lang={lang} className={`${sourceSans.variable} ${seasons.variable}`}>
      <body>
        {props.children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
