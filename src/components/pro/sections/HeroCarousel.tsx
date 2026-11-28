"use client";

import { useRef, type ReactNode } from "react";
import { Container } from "../Container";
import { cx } from "../cx";
import { useCarousel } from "../motion/useCarousel";

/* Carrousel « Vous vous reconnaissez ? » du hero (< 1280 px).
   Même comportement que les Réalisations (useCarousel), avec la pagination
   ocre : la pastille active s'allonge sur la carte la plus proche.
   Les cartes se « posent » ensemble quand la piste arrive à l'écran
   (data-reveal="cards"), pas une à une pendant qu'on fait glisser.
   La piste est focalisable pour défiler au clavier (flèches). */

export function HeroCarousel({ count, label, children }: { count: number; label: string; children: ReactNode }) {
  const track = useRef<HTMLUListElement>(null);
  const { index } = useCarousel(track);

  return (
    <>
      <ul
        ref={track}
        tabIndex={0}
        aria-label={label}
        data-reveal="cards"
        className={cx(
          "relative mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-gutter pb-1",
          "scroll-px-gutter [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "md:mx-auto md:max-w-[calc(var(--pro-content-max)+2*var(--pro-gutter))]",
          "pointer-fine:cursor-grab data-dragging:cursor-grabbing data-dragging:select-none",
          "focus-visible:outline-offset-[-2px]",
        )}
      >
        {children}
      </ul>
      <Container>
        <div aria-hidden="true" className="mt-3.5 flex gap-1.5 pl-0.5">
          {Array.from({ length: count }, (_, i) => (
            <span
              key={i}
              className={cx(
                "h-1.5 rounded-[3px] transition-[width,background-color] duration-(--pro-spring-duration) ease-(--pro-ease-spring)",
                i === index ? "w-5 bg-ochre" : "w-1.5 bg-border-strong",
              )}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
