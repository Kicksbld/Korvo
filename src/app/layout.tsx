import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./korvo-tokens.css";

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
    { path: "../../public/fonts/seasons/SeasonSerif-TRIAL-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/seasons/SeasonSerif-TRIAL-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/seasons/SeasonSerif-TRIAL-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/seasons/SeasonSerif-TRIAL-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/seasons/SeasonSerif-TRIAL-Bold.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Killian Boularand — Maker & tech enthusiast",
  description:
    "Maker en réorientation vers l'ingénierie logicielle embarquée, aéronautique et spatial. Code, impression 3D, hardware. En recherche d'alternance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${sourceSans.variable} ${seasons.variable}`}>
      <body>{children}</body>
    </html>
  );
}
