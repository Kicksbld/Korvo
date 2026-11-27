import type { ElementType, ReactNode } from "react";
import { cx } from "./cx";

/* Largeur de contenu de la maquette : 1312 px utiles, marges latérales de
   64 px en desktop et 20 px en mobile. */

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag className={cx("mx-auto w-full max-w-[calc(var(--pro-content-max)+2*var(--pro-gutter))] px-gutter", className)}>
      {children}
    </Tag>
  );
}
