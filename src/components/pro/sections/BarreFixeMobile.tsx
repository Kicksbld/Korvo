"use client";

import { useEffect, useState } from "react";
import type { ProContent } from "@/app/pro/content/types";
import { BOOKING_HREF, WHATSAPP_HREF } from "@/app/pro/urls";
import { Button } from "../Button";
import { cx } from "../cx";

/* Barre fixe du bas, mobile seulement (Figma 207-1677) : verre papier
   (papier 82 % + flou), « Réserver 20 min » et « WhatsApp ».

   - Apparaît une fois le hero quitté (il porte déjà les deux boutons).
   - Masquée tant que la section Contact est à l'écran (le calendrier y est)
     et quand le clavier est ouvert (champ en cours de saisie).
   - Entre par le bas et sort par le bas, même chemin, courbe des feuilles
     iOS ; interruptible (une transition CSS repart de sa position actuelle).
     Avec « réduire les animations » : simple fondu.
   - Cachée, elle sort aussi de l'ordre de tabulation (visibility).
   - « Réduire la transparence » : papier opaque, sans flou.
   - « Contraste élevé » : filet encre en haut. */

function useKeyboardOpen() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const isField = (el: Element | null) =>
      el instanceof HTMLElement &&
      (el.isContentEditable || el.matches("textarea, select, input:not([type=button],[type=submit],[type=checkbox],[type=radio],[type=range])"));
    const vv = window.visualViewport;
    const update = () => {
      // Le clavier réduit la zone visible ; un champ actif suffit à le supposer.
      const shrunk = vv ? window.innerHeight - vv.height > 150 : false;
      setOpen(isField(document.activeElement) || shrunk);
    };
    const onFocusOut = () => requestAnimationFrame(update);
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", onFocusOut);
    vv?.addEventListener("resize", update);
    return () => {
      document.removeEventListener("focusin", update);
      document.removeEventListener("focusout", onFocusOut);
      vv?.removeEventListener("resize", update);
    };
  }, []);
  return open;
}

function useInView(selector: string, test: (entry: IntersectionObserverEntry) => boolean) {
  const [value, setValue] = useState(false);
  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setValue(test(entry)));
    observer.observe(el);
    return () => observer.disconnect();
    // `test` est une fonction stable déclarée au niveau du module.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector]);
  return value;
}

/** Le hero est entièrement passé (au-dessus de l'écran). */
const heroPassed = (e: IntersectionObserverEntry) => !e.isIntersecting && e.boundingClientRect.top < 0;
const isVisible = (e: IntersectionObserverEntry) => e.isIntersecting;

export function BarreFixeMobile({ t }: { t: ProContent["mobileBar"] }) {
  const pastHero = useInView("[data-pro-hero]", heroPassed);
  const inContact = useInView("#contact", isVisible);
  const keyboard = useKeyboardOpen();
  const shown = pastHero && !inContact && !keyboard;

  return (
    <nav
      aria-label={t.label}
      className={cx(
        "fixed inset-x-0 bottom-0 z-30 flex items-center gap-2.5 px-4 pt-3 pb-[max(28px,env(safe-area-inset-bottom))] md:hidden",
        "border-t border-[rgb(255_255_255/0.7)] bg-[rgb(247_245_238/0.82)] shadow-[0_-8px_24px_rgb(26_26_13/0.08)] backdrop-blur-[12px]",
        "reduce-transparency:bg-paper reduce-transparency:backdrop-blur-none contrast-more:border-ink contrast-more:bg-paper",
        // Entrée / sortie par le bas. La visibilité ne bascule qu'à la fin de la sortie.
        "transition-[translate,opacity,visibility] duration-[420ms] ease-(--pro-ease-sheet)",
        shown ? "visible translate-y-0" : "invisible translate-y-[calc(100%+24px)] [transition-delay:0s,0s,420ms]",
        "motion-reduce:translate-y-0 motion-reduce:duration-200 motion-reduce:ease-out",
        !shown && "motion-reduce:opacity-0",
      )}
    >
      <Button href={BOOKING_HREF} className="min-w-0 flex-1">
        {t.book}
      </Button>
      <Button href={WHATSAPP_HREF} variant="outline" icon="none">
        {t.whatsapp}
      </Button>
    </nav>
  );
}
