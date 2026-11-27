import type { ReactNode } from "react";
import { cx } from "./cx";

/* Petite pastille d'information (ex. « Maquette offerte » sur l'étape 3).

   - tone "ochre" : ocre clair, texte sépia (8,1:1), icône optionnelle
   - tone "sage"  : sauge très claire, texte sauge foncée */

type TagProps = {
  tone?: "ochre" | "sage";
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function Tag({ tone = "ochre", icon, className, children }: TagProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill py-1.5 pr-3",
        icon ? "pl-2.5" : "pl-3",
        "font-body text-[13px] font-bold leading-4",
        tone === "ochre" ? "bg-ochre-soft text-sepia" : "bg-sage-050 text-sage-900",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
