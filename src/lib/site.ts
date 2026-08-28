/* Constantes du site et utilitaires partagés par les métadonnées SEO
   (layout, sitemap, robots) et les images générées (OG, icônes). */

export const SITE_URL = "https://korvo-studio.fr";
export const SITE_NAME = "Korvo";
export const PERSON_NAME = "Killian Boularand";

/* Teintes de marque reprises de korvo-tokens.css — dupliquées ici car les
   images OG/icônes sont rendues hors DOM (satori) et ne lisent pas le CSS. */
export const BRAND = {
  paper: "#f7f5ee",
  paperRaised: "#fffdf7",
  ink: "#000000",
  ink2: "#33322e",
  ink3: "#6f6d66",
  sage: "#666d57",
  sage700: "#545a47",
  sage900: "#3f4335",
} as const;

/**
 * Charge la Cormorant Garamond (fonte de titres du site) au moment du build
 * pour les images générées par `next/og`. Google Fonts renvoie un TTF quand le
 * user-agent n'est pas un navigateur moderne. En cas d'échec réseau on renvoie
 * `null` : l'image retombe sur la fonte par défaut au lieu de casser le build.
 */
export async function loadSerifFont(weight = 500): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@${weight}&display=swap`,
    ).then((res) => (res.ok ? res.text() : ""));
    const match = css.match(
      /src:\s*url\((.+?)\)\s*format\(['"]?(?:truetype|opentype)['"]?\)/,
    );
    if (!match) return null;
    const font = await fetch(match[1]);
    if (!font.ok) return null;
    return font.arrayBuffer();
  } catch {
    return null;
  }
}
