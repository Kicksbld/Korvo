import { ImageResponse } from "next/og";
import { BRAND, loadSerifFont } from "@/lib/site";

/* Icône d'onglet générée au build : monogramme "K" serif sur papier chaud.
   Remplace visuellement le favicon.ico placeholder (triangle Vercel). */

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default async function Icon() {
  const serif = await loadSerifFont(600);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND.paper,
          color: BRAND.sage900,
          fontFamily: "Cormorant Garamond",
          fontSize: 400,
          lineHeight: 1,
        }}
      >
        K
      </div>
    ),
    {
      ...size,
      fonts: serif
        ? [{ name: "Cormorant Garamond", data: serif, style: "normal", weight: 600 }]
        : undefined,
    },
  );
}
