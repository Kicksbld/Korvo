import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cx } from "./cx";
import { ArrowUpRightIcon } from "./icons";

/* Lien texte souligné (barre du haut : « Mon parcours & mes projets ↗»).
   Zone cliquable de 44 px de haut, comme dans Figma. Avec `external`, le
   lien porte la flèche ↗ et s'ouvre dans un nouvel onglet ; `srHint` précise
   la destination aux lecteurs d'écran. */

type TextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
  href: string;
  external?: boolean;
  /** Texte lu par les lecteurs d'écran seulement (ex. « ouvre korvo-studio.fr »). */
  srHint?: string;
  tone?: "ink" | "paper";
  children: ReactNode;
};

export function TextLink({ href, external, srHint, tone = "ink", className, children, ...rest }: TextLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      {...rest}
      className={cx(
        "inline-flex h-11 items-center gap-1.5 px-1",
        "font-body text-[15px] leading-6 font-semibold",
        "underline decoration-from-font underline-offset-[3px] hover:decoration-2",
        tone === "ink" ? "text-ink-2 hover:text-ink" : "text-paper",
        className,
      )}
    >
      <span>{children}</span>
      {srHint ? <span className="sr-only"> {srHint}</span> : null}
      {external ? <ArrowUpRightIcon /> : null}
    </a>
  );
}
