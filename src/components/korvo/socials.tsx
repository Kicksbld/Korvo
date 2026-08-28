/* réseaux — partagés entre le footer et le sommaire du header.
   Trait 1.5px pour les pictos géométriques, aplat pour les marques
   (LinkedIn, GitHub) dont le glyphe ne se dessine pas au trait */

/** Profils publics — source unique pour les liens du site et le `sameAs`
 * du JSON-LD Person (layout). */
export const SOCIAL_PROFILE_URLS = {
  linkedin: "https://linkedin.com/in/killian-boularand",
  github: "https://github.com/Kicksbld",
  instagram: "https://www.instagram.com/killian_bd_/",
} as const;

export const ICON_PROPS = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Réseaux et téléphone — le libellé du téléphone se traduit ("Téléphone" /
 * "Phone"), les autres libellés sont des noms de marque, invariants. */
export function getSocials(phoneLabel: string) {
  return [
    {
      href: SOCIAL_PROFILE_URLS.linkedin,
      label: "LinkedIn",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
        </svg>
      ),
    },
    {
      href: SOCIAL_PROFILE_URLS.github,
      label: "GitHub",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 1.75A10.25 10.25 0 0 0 8.76 21.73c.51.1.7-.22.7-.49v-1.9c-2.85.62-3.45-1.2-3.45-1.2-.47-1.18-1.14-1.5-1.14-1.5-.93-.63.07-.62.07-.62 1.03.07 1.57 1.05 1.57 1.05.91 1.57 2.4 1.12 2.98.85.09-.66.36-1.11.65-1.37-2.28-.26-4.67-1.14-4.67-5.06 0-1.12.4-2.03 1.05-2.75-.1-.26-.46-1.3.1-2.7 0 0 .86-.28 2.82 1.05a9.83 9.83 0 0 1 5.13 0c1.96-1.33 2.82-1.05 2.82-1.05.56 1.4.2 2.44.1 2.7.65.72 1.05 1.63 1.05 2.75 0 3.93-2.4 4.8-4.68 5.05.37.32.7.94.7 1.9v2.81c0 .27.18.6.7.49A10.25 10.25 0 0 0 12 1.75Z" />
        </svg>
      ),
    },
    {
      href: SOCIAL_PROFILE_URLS.instagram,
      label: "Instagram",
      icon: (
        <svg {...ICON_PROPS} aria-hidden>
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" />
          <circle cx="12" cy="12" r="4.2" />
          <path d="M17.4 6.6h.01" />
        </svg>
      ),
    },
    {
      href: "tel:+33603850349",
      label: `${phoneLabel} · +33 6 03 85 03 49`,
      icon: (
        <svg {...ICON_PROPS} aria-hidden>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
      ),
    },
  ];
}
