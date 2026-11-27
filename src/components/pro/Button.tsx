import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./cx";
import { ArrowRightIcon, ArrowUpRightIcon } from "./icons";

/* Bouton de la page pro (composants Figma Button/*).

   Variantes :
   - primary        : plein encre, texte papier (action principale)
   - outline        : contour encre 1,5 px (action secondaire sur fond clair)
   - forest         : plein vert forêt
   - bronze         : plein bronze
   - inverse        : plein papier, texte encre (sur fond sombre)
   - outline-inverse: contour sauge claire, texte papier (lien « voir le site »
                      sur fond vert forêt)

   Tailles : md (52 px), sm (40 px, barre du haut), pill (44 px, liens site).
   Rendu en <a> si `href` est fourni, sinon en <button>. */

export type ButtonVariant = "primary" | "outline" | "forest" | "bronze" | "inverse" | "outline-inverse";
export type ButtonSize = "md" | "sm" | "pill";
type Icon = "arrow" | "external" | "none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-2",
  outline: "border-[1.5px] border-ink text-ink hover:bg-ink/5",
  forest: "bg-forest text-paper hover:bg-forest-2",
  bronze: "bg-bronze text-paper hover:brightness-95",
  inverse: "bg-paper text-ink hover:bg-paper-raised",
  "outline-inverse": "border-[1.5px] border-sage-200 text-paper hover:bg-paper/10",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-[52px] px-7 gap-2.5 ui-button",
  sm: "h-10 px-5 gap-2 ui-small",
  pill: "h-11 pl-[18px] pr-4 gap-2 font-body text-[15px] leading-6 font-semibold",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icône après le libellé. Par défaut : flèche → en md, rien sinon. */
  icon?: Icon;
  className?: string;
  children: ReactNode;
};

type AsLink = CommonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & { href: string };
type AsButton = CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };

export type ButtonProps = AsLink | AsButton;

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Pick<CommonProps, "variant" | "size" | "className">) {
  return cx(
    "inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap rounded-pill",
    "transition-[background-color,filter,transform] duration-150 ease-out",
    // Retour immédiat à l'appui (spec mouvement) — le ressort viendra en phase 3.
    "active:scale-[0.97] motion-reduce:active:scale-100",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, className, children, ...rest } = props;
  const resolvedIcon: Icon = icon ?? (size === "md" ? "arrow" : "none");
  const iconNode =
    resolvedIcon === "arrow" ? <ArrowRightIcon /> : resolvedIcon === "external" ? <ArrowUpRightIcon /> : null;
  const classes = buttonClasses({ variant, size, className });

  if (typeof rest.href === "string") {
    const anchorProps = rest as Omit<AsLink, keyof CommonProps>;
    return (
      <a {...anchorProps} className={classes}>
        {children}
        {iconNode}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<AsButton, keyof CommonProps>;
  return (
    <button type={type} {...buttonProps} className={classes}>
      {children}
      {iconNode}
    </button>
  );
}
