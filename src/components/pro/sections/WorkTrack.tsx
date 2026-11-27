"use client";

import { useRef, type ReactNode } from "react";
import { IconButton } from "../IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";

/* Piste horizontale des Réalisations + barre de progression et flèches.

   Phase 2 : défilement natif (doigt, trackpad, molette + Maj) avec
   aimantation CSS ; les flèches font défiler d'un projet. La barre de
   progression reste figée sur le premier projet. Le suivi 1:1 avec élan,
   la progression vivante et l'état des flèches arrivent en phase 3. */

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

  const step = (direction: 1 | -1) => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * (first.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <ul
        ref={track}
        aria-label={label}
        className="flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-1 [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
        style={{ paddingLeft: INSET, paddingRight: "var(--pro-gutter)", scrollPaddingLeft: INSET }}
      >
        {children}
      </ul>

      <div className="flex items-center gap-6" style={{ paddingLeft: INSET, paddingRight: INSET }}>
        <div aria-hidden="true" className="flex flex-1 gap-1.5">
          {Array.from({ length: count }, (_, i) => (
            <span key={i} className={i === 0 ? "h-[3px] flex-1 rounded-[2px] bg-ochre" : "h-[3px] flex-1 rounded-[2px] bg-forest-2"} />
          ))}
        </div>
        <div className="hidden gap-3 md:flex">
          <IconButton label={prev} icon={<ChevronLeftIcon />} variant="outline-inverse" onClick={() => step(-1)} />
          <IconButton label={next} icon={<ChevronRightIcon />} variant="inverse" onClick={() => step(1)} />
        </div>
      </div>
    </>
  );
}
