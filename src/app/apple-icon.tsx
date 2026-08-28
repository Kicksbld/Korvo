import { ImageResponse } from "next/og";
import { BRAND, loadSerifFont } from "@/lib/site";

/* Icône écran d'accueil iOS — même monogramme que icon.tsx, fond opaque
   (iOS n'accepte pas la transparence), coins arrondis gérés par l'OS. */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
          fontSize: 140,
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
