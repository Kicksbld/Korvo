import type { SVGProps } from "react";

/* Icônes de la maquette v2, tracés repris tels quels de Figma.
   Seule la couleur change : currentColor, pour suivre le texte du parent. */

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number };

function base(size: number, viewBox: number, props: Omit<IconProps, "size">) {
  return {
    width: size,
    height: size,
    viewBox: `0 0 ${viewBox} ${viewBox}`,
    fill: "none",
    "aria-hidden": true,
    focusable: false,
    ...props,
  } as const;
}

/** Flèche → des boutons (16 px). */
export function ArrowRightIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size, 16, props)}>
      <path d="M3 8H13M9 12L13 8L9 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Flèche ↗ des liens externes (16 px). */
export function ArrowUpRightIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size, 16, props)}>
      <path d="M5 11L11 5M11 10V5H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Flèche ← des carrousels (18 px). */
export function ChevronLeftIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, 18, props)}>
      <path d="M14.4 9H3.6M8.1 13.5L3.6 9L8.1 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Flèche → des carrousels (18 px). */
export function ChevronRightIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, 18, props)}>
      <path d="M3.6 9H14.4M9.9 13.5L14.4 9L9.9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Coche des listes de bénéfices (16 px). */
export function CheckIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size, 16, props)}>
      <path d="M3 8.5L6 11.5L13 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Onglet « J'ai besoin d'un site » (18 px). */
export function BrowserIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, 18, props)}>
      <path d="M4.125 3.375H13.875C14.9105 3.375 15.75 4.21447 15.75 5.25V12.75C15.75 13.7855 14.9105 14.625 13.875 14.625H4.125C3.08947 14.625 2.25 13.7855 2.25 12.75V5.25C2.25 4.21447 3.08947 3.375 4.125 3.375Z" stroke="currentColor" strokeWidth="1.275" />
      <path d="M2.25 7.125H15.75" stroke="currentColor" strokeWidth="1.275" />
      <circle cx="4.875" cy="5.25" r="0.675" fill="currentColor" />
      <circle cx="6.975" cy="5.25" r="0.675" fill="currentColor" />
    </svg>
  );
}

/** Onglet « Je veux gagner du temps » (18 px). */
export function ClockIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, 18, props)}>
      <path d="M15.375 9C15.375 12.5208 12.5208 15.375 9 15.375C5.47918 15.375 2.625 12.5208 2.625 9C2.625 5.47918 5.47918 2.625 9 2.625C12.5208 2.625 15.375 5.47918 15.375 9Z" stroke="currentColor" strokeWidth="1.275" />
      <path d="M9 5.625V9L11.25 10.65" stroke="currentColor" strokeWidth="1.275" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Cadeau du tag « Maquette offerte » (15 px). */
export function GiftIcon({ size = 15, ...props }: IconProps) {
  return (
    <svg {...base(size, 15, props)}>
      <path d="M3.125 5.625H11.875C12.3928 5.625 12.8125 6.04473 12.8125 6.5625V11.875C12.8125 12.3928 12.3928 12.8125 11.875 12.8125H3.125C2.60723 12.8125 2.1875 12.3928 2.1875 11.875V6.5625C2.1875 6.04473 2.60723 5.625 3.125 5.625Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5625 5.625H5.62227M5.62227 5.625H7.5M5.62227 5.625C4.77679 5.54847 4.0625 5.26786 4.0625 4.375C4.0625 2.8125 6.5625 3.125 7.5 5.625M5.62227 5.625C6.25638 5.6824 6.96429 5.625 7.5 5.625M7.5 5.625H9.37773M7.5 5.625V12.8125M7.5 5.625C8.4375 3.125 10.9375 2.8125 10.9375 4.375C10.9375 5.26786 10.2232 5.54847 9.37773 5.625M7.5 5.625C8.03571 5.625 8.74362 5.6824 9.37773 5.625M9.37773 5.625H13.4375" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}
