import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cx } from "./cx";

/* Surface « papier surélevé » des cartes de la maquette.

   - tone "raised" : papier surélevé + bordure fine (cas général)
   - tone "forest" : carte mise en avant (étape 3 du processus)
   - radius : "card" 18 px (cartes-problèmes, bandeau), "card-lg" 20 px
     (étapes), "surface" 28 px (panneau des offres, engagements)
   - shadow : ombre chaude ; "card" pour les cartes posées sur une image,
     "panel" pour les grands panneaux, "tag" pour les étiquettes. */

type CardProps<T extends ElementType> = {
  as?: T;
  tone?: "raised" | "forest";
  radius?: "tag" | "card" | "card-lg" | "surface";
  shadow?: "none" | "tag" | "card" | "panel";
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

const radii = {
  tag: "rounded-tag",
  card: "rounded-card",
  "card-lg": "rounded-card-lg",
  surface: "rounded-surface",
} as const;

const shadows = {
  none: "",
  tag: "shadow-tag",
  card: "shadow-card",
  panel: "shadow-panel",
} as const;

export function Card<T extends ElementType = "div">({
  as,
  tone = "raised",
  radius = "card-lg",
  shadow = "none",
  className,
  children,
  ...rest
}: CardProps<T>) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      {...rest}
      className={cx(
        // Contraste élevé : bordure 1 px encre (papier sur la carte vert forêt).
        tone === "raised"
          ? "border border-border-faint bg-paper-raised text-ink contrast-more:border-ink"
          : "bg-forest text-paper contrast-more:border contrast-more:border-paper",
        radii[radius],
        shadows[shadow],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
