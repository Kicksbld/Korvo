import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Caveat, Fraunces, Source_Sans_3 } from "next/font/google";
import "../pro.css";
import { hasLocale, locales } from "@/i18n/config";
import { getProContent } from "../content";
import { PRO_URL, proPath } from "../urls";

/* Mise en page racine de la page pro (pro.korvo-studio.fr).

   Deuxième mise en page racine du projet, à côté de src/app/[lang]/layout.tsx
   (portfolio) : son propre <html>, ses propres styles (pro.css) et ses propres
   polices. Rien n'est partagé avec le portfolio, et passer de l'un à l'autre
   recharge la page entièrement (voulu). */

// Fraunces (remplace The Seasons) : variable, avec les axes WONK (réglé à 1
// comme dans Figma) et opsz (taille optique automatique).
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "WONK"],
  variable: "--font-pro-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-pro-body",
  display: "swap",
});

// Caveat : seulement pour les petites annotations manuscrites (« à votre nom »).
const caveat = Caveat({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pro-hand",
  display: "swap",
  preload: false,
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#f7f5ee",
};

export async function generateMetadata(props: LayoutProps<"/pro/[lang]">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const content = await getProContent(lang);

  return {
    metadataBase: new URL(PRO_URL),
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: proPath(lang),
      languages: { fr: proPath("fr"), en: proPath("en"), "x-default": proPath("fr") },
    },
    // Pas d'indexation tant que la page n'est pas lancée (phase 6).
    robots: { index: false, follow: false },
  };
}

export default async function ProRootLayout(props: LayoutProps<"/pro/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${fraunces.variable} ${sourceSans.variable} ${caveat.variable}`}>
      <body className="min-h-dvh bg-paper text-ink">
        {/* Sans JavaScript : les cartes du hero (masquées en attendant leur
            animation, voir pro-motion.css) restent visibles. */}
        <noscript>
          <style>{".drop-card{opacity:1!important;animation:none!important}"}</style>
        </noscript>
        {props.children}
      </body>
    </html>
  );
}
