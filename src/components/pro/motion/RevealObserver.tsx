"use client";

import { useEffect } from "react";

/* Déclencheur des animations d'apparition.

   Tout élément `data-reveal="…"` reçoit `data-revealed` quand il entre à
   l'écran : "in" (l'animation se joue) ou "now" s'il y était déjà au moment
   où ce composant prend la main (ou au-dessus, après un saut d'ancre) — dans
   ce cas rien ne bouge. Les styles sont dans pro-motion.css et ne masquent
   rien tant que `html[data-reveal]` n'est pas posé.

   Deux cas particuliers, pour les cartes-problèmes du hero (.drop-card,
   masquées d'emblée) :
   - `data-reveal="card"` : une carte seule. Elle se pose quand elle arrive
     à l'écran, même au chargement (après le titre : +700 ms).
   - `data-reveal="cards"` : un groupe (carrousel mobile). Toutes ses
     cartes se posent ensemble quand le groupe arrive à l'écran.
   Les cartes révélées dans le même instant sont décalées de 140 ms (--d). */

const LOAD_DELAY = 700;
const STAGGER = 140;

export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    let atLoad = true;

    const cardsOf = (el: Element) =>
      el.getAttribute("data-reveal") === "cards"
        ? Array.from(el.querySelectorAll<HTMLElement>(".drop-card"))
        : el.getAttribute("data-reveal") === "card"
          ? [el as HTMLElement]
          : [];

    /** Révèle un lot d'éléments arrivés ensemble (cartes échelonnées). */
    const revealBatch = (els: Element[], state: "in" | "now") => {
      let rank = 0;
      for (const el of els) {
        const cards = cardsOf(el);
        if (!cards.length) {
          el.setAttribute("data-revealed", state);
          continue;
        }
        if (el.getAttribute("data-reveal") === "cards") el.setAttribute("data-revealed", "in");
        for (const card of cards) {
          card.style.setProperty("--d", `${(atLoad ? LOAD_DELAY : 0) + rank++ * STAGGER}ms`);
          card.setAttribute("data-revealed", "in");
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const arrived = entries.filter((e) => e.isIntersecting).map((e) => e.target);
        arrived.forEach((el) => observer.unobserve(el));
        // Ordre de lecture : de haut en bas, puis de gauche à droite.
        arrived.sort((a, b) => {
          const ra = a.getBoundingClientRect();
          const rb = b.getBoundingClientRect();
          return Math.abs(ra.top - rb.top) > 40 ? ra.top - rb.top : ra.left - rb.left;
        });
        revealBatch(arrived, "in");
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    const now: Element[] = [];
    for (const el of document.querySelectorAll("[data-reveal]:not([data-revealed])")) {
      const isCard = cardsOf(el).length > 0;
      const r = el.getBoundingClientRect();
      const hidden = r.width === 0 && r.height === 0;
      // Variante cachée (desktop/mobile) : rien à animer, on l'affiche.
      if (hidden) {
        el.setAttribute("data-revealed", "now");
        cardsOf(el).forEach((c) => c.setAttribute("data-revealed", "now"));
      } else if (isCard) observer.observe(el); // les cartes se posent toujours
      else if (r.top < window.innerHeight) now.push(el);
      else observer.observe(el);
    }
    revealBatch(now, "now");
    root.setAttribute("data-reveal", "");
    // Après le premier lot, les cartes n'attendent plus le titre du hero.
    const timer = setTimeout(() => (atLoad = false), 400);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      root.removeAttribute("data-reveal");
    };
  }, []);

  return null;
}
