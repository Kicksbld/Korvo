import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "./cx";
import { TornEdge } from "./TornEdge";

/* Section pleine largeur de la page pro.

   - `tone` : couleur de fond (et couleur de texte par défaut associée).
   - `textured` : papier texturé (papier en multiply + grain). Par défaut
     activé sur les fonds papier et ocre clair, comme dans la maquette ;
     la sauge et le vert forêt restent unis.
   - `tear` : graine de la déchirure en haut de section. À poser à chaque
     changement de couleur avec la section précédente. */

export type SectionTone = "paper" | "sunken" | "sage" | "forest" | "ochre" | "footer";

const tones: Record<SectionTone, { bg: string; text: string; color: string; textured: boolean }> = {
  paper: { bg: "bg-paper", text: "text-ink", color: "var(--pro-paper)", textured: true },
  sunken: { bg: "bg-paper-sunken", text: "text-ink", color: "var(--pro-paper-sunken)", textured: true },
  sage: { bg: "bg-sage", text: "text-paper", color: "var(--pro-sage)", textured: false },
  forest: { bg: "bg-forest", text: "text-paper", color: "var(--pro-forest)", textured: false },
  ochre: { bg: "bg-ochre-soft", text: "text-ink", color: "var(--pro-ochre-soft)", textured: true },
  footer: { bg: "bg-footer", text: "text-paper", color: "var(--pro-footer)", textured: false },
};

type SectionProps = Omit<ComponentPropsWithoutRef<"section">, "children"> & {
  tone?: SectionTone;
  textured?: boolean;
  /** Graine de la déchirure en haut de section (absente = pas de déchirure). */
  tear?: number;
  /** Marges verticales de la maquette (120 px desktop, 80 px mobile). */
  padded?: boolean;
  children: ReactNode;
};

export function Section({ tone = "paper", textured, tear, padded = true, className, children, ...rest }: SectionProps) {
  const t = tones[tone];
  const withTexture = textured ?? t.textured;
  return (
    <section
      {...rest}
      className={cx(
        "relative",
        t.bg,
        t.text,
        withTexture ? "paper-texture" : undefined,
        padded ? "py-section" : undefined,
        className,
      )}
    >
      {tear !== undefined ? <TornEdge color={t.color} seed={tear} /> : null}
      {children}
    </section>
  );
}
