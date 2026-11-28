"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { IconButton } from "../IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { useCarousel } from "../motion/useCarousel";

/* Piste horizontale des Réalisations + barre de progression et flèches.

   Au doigt : défilement natif (1:1, élan, aimantation). À la souris :
   glisser avec élan projeté et aimantation (useCarousel). Flèches : carte
   voisine par ressort, grisées (mais focalisables) aux extrémités.
   La barre ocre suit la position de défilement image par image.
   `relative` sur la piste : sans lui, les textes « sr-only » (positionnés en
   absolu) des liens échappaient au rognage et élargissaient toute la page. */

type WorkTrackProps = {
  label: string;
  prev: string;
  next: string;
  count: number;
  children: ReactNode;
};

/** Marge gauche alignée sur le contenu (1312 px centrés), même au-delà de 1440. */
const INSET = "max(var(--pro-gutter), calc((100% - var(--pro-content-max)) / 2))";

export function WorkTrack({ label, prev, next, count, children }: WorkTrackProps) {
  const track = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const onProgress = useCallback((p: number) => bar.current?.style.setProperty("--p", String(p)), []);
  const { atStart, atEnd, go } = useCarousel(track, { onProgress });

  return (
    <>
      <ul
        ref={track}
        aria-label={label}
        className="relative flex snap-x snap-mandatory gap-3.5 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden pointer-fine:cursor-grab data-dragging:cursor-grabbing data-dragging:select-none"
        style={{ paddingLeft: INSET, paddingRight: "var(--pro-gutter)", scrollPaddingLeft: INSET }}
      >
        {children}
      </ul>

      <div className="flex items-center gap-6" style={{ paddingLeft: INSET, paddingRight: INSET }}>
        {/* Barre de progression : segments de fond + segment ocre qui glisse
            avec le défilement (--p de 0 à 1, posé sans re-rendu). */}
        <div aria-hidden="true" className="relative flex flex-1 gap-1.5">
          {Array.from({ length: count }, (_, i) => (
            <span key={i} className="h-[3px] flex-1 rounded-[2px] bg-forest-2" />
          ))}
          <span
            ref={bar}
            className="absolute inset-y-0 left-0 rounded-[2px] bg-ochre will-change-transform"
            style={{
              width: `calc((100% - ${(count - 1) * 6}px) / ${count})`,
              transform: `translateX(calc(var(--p, 0) * ${count - 1} * (100% + 6px)))`,
            }}
          />
        </div>
        <div className="hidden gap-3 md:flex">
          <IconButton
            label={prev}
            icon={<ChevronLeftIcon />}
            variant="outline-inverse"
            aria-disabled={atStart || undefined}
            onClick={() => !atStart && go(-1)}
          />
          <IconButton
            label={next}
            icon={<ChevronRightIcon />}
            variant="inverse"
            aria-disabled={atEnd || undefined}
            onClick={() => !atEnd && go(1)}
          />
        </div>
      </div>
    </>
  );
}
