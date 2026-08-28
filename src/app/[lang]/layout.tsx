import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import "../korvo-tokens.css";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

// The Seasons (SeasonSerif) — fonte de titres, servie depuis public/fonts/seasons
const seasons = localFont({
  variable: "--font-seasons",
  display: "swap",
  src: [
    { path: "../../../public/fonts/seasons/SeasonSerif-TRIAL-Light.woff2", weight: "300", style: "normal" },
    { path: "../../../public/fonts/seasons/SeasonSerif-TRIAL-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/seasons/SeasonSerif-TRIAL-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../../public/fonts/seasons/SeasonSerif-TRIAL-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../../public/fonts/seasons/SeasonSerif-TRIAL-Bold.woff2", weight: "700", style: "normal" },
  ],
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(props: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return { title: dict.meta.title, description: dict.meta.description };
}

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${sourceSans.variable} ${seasons.variable}`}>
      <body>{props.children}</body>
    </html>
  );
}
