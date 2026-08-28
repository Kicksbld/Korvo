import { ImageResponse } from "next/og";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { BRAND, PERSON_NAME, loadSerifFont } from "@/lib/site";

/* Carte OG générée au build (une par locale) — papier chaud, wordmark KORVO
   en serif, nom + tagline, filet sage. Voir docs/plans/03-seo.md. */

export const alt = "Korvo — Killian Boularand";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(hasLocale(lang) ? lang : "fr");
  const serif = await loadSerifFont(500);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND.paper,
          fontFamily: "Cormorant Garamond",
        }}
      >
        <div
          style={{
            /* letterSpacing scinde le texte en plusieurs nœuds : satori exige
               alors un display explicite sur le parent */
            display: "flex",
            fontSize: 176,
            lineHeight: 1,
            letterSpacing: "0.14em",
            /* compense visuellement le letter-spacing après le O final */
            paddingLeft: "0.14em",
            color: BRAND.ink,
          }}
        >
          KORVO
        </div>
        <div
          style={{
            width: 72,
            height: 3,
            background: BRAND.sage,
            marginTop: 44,
            marginBottom: 44,
          }}
        />
        <div style={{ fontSize: 44, color: BRAND.ink2 }}>{PERSON_NAME}</div>
        <div style={{ fontSize: 30, color: BRAND.sage700, marginTop: 14 }}>
          {dict.meta.tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: serif
        ? [{ name: "Cormorant Garamond", data: serif, style: "normal", weight: 500 }]
        : undefined,
    },
  );
}
