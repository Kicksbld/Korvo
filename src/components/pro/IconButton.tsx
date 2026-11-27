import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./cx";

/* Bouton rond à icône (flèches des carrousels, fermeture…).
   48 px par défaut, 44 px en "sm" : toujours ≥ 44 px pour le tactile.
   `label` est obligatoire : c'est le seul nom accessible du bouton.

   Variantes (Réalisations, sur vert forêt) :
   - "outline-inverse" : contour sauge 400, icône sauge claire (précédent)
   - "inverse"         : plein papier, icône encre (suivant)
   Sur fond clair :
   - "outline"         : contour encre
   - "solid"           : plein encre, icône papier */

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  label: string;
  icon: ReactNode;
  variant?: "outline-inverse" | "inverse" | "outline" | "solid";
  size?: "md" | "sm";
};

const variants = {
  "outline-inverse": "border-[1.5px] border-sage-400 text-sage-200 hover:bg-paper/10",
  inverse: "bg-paper text-ink hover:bg-paper-raised",
  outline: "border-[1.5px] border-ink text-ink hover:bg-ink/5",
  solid: "bg-ink text-paper hover:bg-ink-2",
} as const;

export function IconButton({ label, icon, variant = "inverse", size = "md", className, type = "button", ...rest }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      {...rest}
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-pill",
        "transition-[background-color,transform,opacity] duration-150 ease-out",
        "active:scale-[0.97] motion-reduce:active:scale-100",
        "disabled:cursor-default disabled:opacity-40",
        size === "md" ? "size-12" : "size-11",
        variants[variant],
        className,
      )}
    >
      {icon}
    </button>
  );
}
