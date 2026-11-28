"use client";

import { useEffect, useRef, type RefObject } from "react";
import { prefersReducedMotion, Spring } from "./spring";

/* Pastille qui glisse sous l'option active (onglets des Offres, bascule € / CHF).

   Deux ressorts indépendants (position et largeur), interruptibles : si on
   change d'avis en plein mouvement, la pastille repart de là où elle est,
   avec sa vitesse. Au redimensionnement, elle se recale sans animation.

   Avant l'hydratation (et sans JavaScript), c'est le bouton actif qui porte
   son propre fond. Une fois la pastille mesurée, le conteneur reçoit
   `data-pill="ready"` : les boutons deviennent transparents et la pastille
   apparaît, à la même place, sans saut. */

export function useSlidingPill(
  container: RefObject<HTMLElement | null>,
  items: RefObject<Array<HTMLElement | null>>,
  index: number,
) {
  const pill = useRef<HTMLSpanElement>(null);
  const springs = useRef<{ x: Spring; w: Spring } | null>(null);
  const indexRef = useRef(index);
  const lastInput = useRef(-Infinity);

  useEffect(() => {
    const root = container.current;
    if (!root) return;
    const mark = () => (lastInput.current = performance.now());
    root.addEventListener("pointerdown", mark);
    root.addEventListener("keydown", mark);
    return () => {
      root.removeEventListener("pointerdown", mark);
      root.removeEventListener("keydown", mark);
    };
  }, [container]);

  useEffect(() => {
    indexRef.current = index;
    const el = pill.current;
    const item = items.current[index];
    if (!el || !item) return;

    if (!springs.current) {
      springs.current = {
        x: new Spring(item.offsetLeft, (x) => (el.style.transform = `translate3d(${x}px,0,0)`)),
        w: new Spring(item.offsetWidth, (w) => (el.style.width = `${w}px`)),
      };
      springs.current.x.set(item.offsetLeft);
      springs.current.w.set(item.offsetWidth);
      container.current?.setAttribute("data-pill", "ready");
      return;
    }

    const { x, w } = springs.current;
    // On ne glisse qu'en réponse au visiteur : un choix restauré depuis
    // l'adresse ou la mémoire du navigateur se pose sans animation.
    const fromUser = performance.now() - lastInput.current < 800;
    if (!fromUser || prefersReducedMotion()) {
      x.set(item.offsetLeft);
      w.set(item.offsetWidth);
    } else {
      x.to(item.offsetLeft);
      w.to(item.offsetWidth);
    }
  }, [index, container, items]);

  // Recalage sans animation quand la mise en page change (rotation, police…).
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    const observer = new ResizeObserver(() => {
      const item = items.current[indexRef.current];
      if (!item || !springs.current) return;
      springs.current.x.set(item.offsetLeft);
      springs.current.w.set(item.offsetWidth);
    });
    observer.observe(root);
    return () => {
      observer.disconnect();
      springs.current?.x.stop();
      springs.current?.w.stop();
    };
  }, [container, items]);

  return pill;
}
