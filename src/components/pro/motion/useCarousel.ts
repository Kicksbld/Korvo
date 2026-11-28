"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { prefersReducedMotion, project, rubberband, Spring, SPRING_DEFAULT, SPRING_FLICK } from "./spring";

/* Carrousel horizontal (Réalisations, « Vous vous reconnaissez ? »).

   La piste est un vrai conteneur défilant avec aimantation CSS
   (snap-x snap-mandatory). Ce hook y ajoute :

   - Au doigt : rien. Le défilement natif suit déjà le doigt 1:1, garde
     l'élan, aimante, résiste aux bords (iOS) et ne bloque jamais le
     défilement vertical de la page. Le refaire en JavaScript serait moins
     bien.
   - À la souris : glisser-déposer. Suivi 1:1 à partir du point saisi (après
     6 px, pour laisser passer les clics), projection de l'élan au lâcher
     (décélération 0,998), aimantation à la carte la plus proche du point
     projeté, résistance élastique aux bords. Le ressort reprend la vitesse
     de la main (léger rebond 0,8, puisque le geste a été lancé).
   - Flèches : `go(±1)` anime vers la carte voisine par ressort sans rebond.
     Deux appuis rapides enchaînent deux cartes ; un coup de molette ou de
     doigt reprend la main immédiatement.
   - Suivi : `index` (carte la plus proche), `atStart` / `atEnd`, et
     `onProgress(0…1)` appelé à chaque image pendant le défilement (à
     écrire directement dans le DOM, sans re-rendu).

   Pendant une animation pilotée, l'aimantation CSS est suspendue (sinon
   le navigateur se battrait avec le ressort), puis rétablie au repos. */

type Options = { onProgress?: (progress: number) => void };

const DRAG_THRESHOLD = 6;

/** Positions d'arrêt : début de chaque carte, borné au défilement maximal. */
function snapPoints(el: HTMLElement) {
  const max = el.scrollWidth - el.clientWidth;
  const items = Array.from(el.children) as HTMLElement[];
  const origin = items[0]?.offsetLeft ?? 0;
  return { max, points: items.map((item) => Math.min(max, Math.max(0, item.offsetLeft - origin))) };
}

function nearest(points: number[], value: number, max: number) {
  if (value >= max - 1) return points.length - 1;
  let best = 0;
  for (let i = 1; i < points.length; i++) {
    if (Math.abs(points[i] - value) < Math.abs(points[best] - value)) best = i;
  }
  return best;
}

export function useCarousel(track: RefObject<HTMLElement | null>, { onProgress }: Options = {}) {
  const [index, setIndex] = useState(0);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });
  const goRef = useRef<(direction: 1 | -1) => void>(() => {});
  const progressRef = useRef(onProgress);

  useEffect(() => {
    progressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    const restoreSnap = () => (el.style.scrollSnapType = "");
    const spring = new Spring(el.scrollLeft, (x) => (el.scrollLeft = x), 0.5);
    const rubber = new Spring(0, (x) => (el.style.translate = Math.abs(x) < 0.5 ? "" : `${x}px 0`), 0.5);

    // — Suivi de la position —
    let frame = 0;
    const sync = () => {
      frame = 0;
      const { max, points } = snapPoints(el);
      const x = el.scrollLeft;
      progressRef.current?.(max > 0 ? Math.min(1, Math.max(0, x / max)) : 0);
      setIndex(nearest(points, x, max));
      const atStart = x <= 1;
      const atEnd = x >= max - 1;
      setEdges((prev) => (prev.atStart === atStart && prev.atEnd === atEnd ? prev : { atStart, atEnd }));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    sync();

    // — Le visiteur reprend la main (molette, doigt) : on lâche le ressort —
    const interrupt = () => {
      if (!spring.isAnimating) return;
      spring.stop();
      restoreSnap();
    };

    // — Glisser à la souris —
    let drag: {
      id: number;
      startX: number;
      startScroll: number;
      moved: boolean;
      history: Array<{ x: number; t: number }>;
    } | null = null;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      spring.stop();
      rubber.stop();
      el.style.translate = "";
      drag = { id: e.pointerId, startX: e.clientX, startScroll: el.scrollLeft, moved: false, history: [{ x: e.clientX, t: e.timeStamp }] };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.startX;
      if (!drag.moved) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        drag.moved = true;
        // Capture seulement maintenant : un simple clic sur un lien reste un clic.
        el.setPointerCapture(e.pointerId);
        el.style.scrollSnapType = "none";
        el.dataset.dragging = "";
        // Une sélection de texte a pu commencer pendant les premiers pixels.
        window.getSelection()?.removeAllRanges();
      }
      const { max } = snapPoints(el);
      const raw = drag.startScroll - dx;
      // Respecte le point saisi : la carte reste sous le curseur.
      el.scrollLeft = Math.min(max, Math.max(0, raw));
      const over = raw < 0 ? raw : raw > max ? raw - max : 0;
      el.style.translate = over ? `${-rubberband(over, el.clientWidth)}px 0` : "";
      drag.history.push({ x: e.clientX, t: e.timeStamp });
      if (drag.history.length > 6) drag.history.shift();
    };

    const release = (e: PointerEvent, cancelled: boolean) => {
      if (!drag || e.pointerId !== drag.id) return;
      const { moved, history } = drag;
      drag = null;
      if (!moved) return;
      delete el.dataset.dragging;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);

      // Le clic qui suit un glissement ne doit pas ouvrir de lien.
      const swallow = (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
      };
      el.addEventListener("click", swallow, { capture: true, once: true });
      setTimeout(() => el.removeEventListener("click", swallow, { capture: true }), 0);

      // Vitesse de la main sur les ~100 dernières ms (px/s, sens du défilement).
      const last = history[history.length - 1];
      const first = history.find((h) => last.t - h.t <= 100) ?? last;
      const dt = (last.t - first.t) / 1000;
      const velocity = cancelled || dt <= 0 ? 0 : -(last.x - first.x) / dt;

      // Bord élastique : retour sans rebond.
      const offset = parseFloat(el.style.translate) || 0;
      if (offset) {
        rubber.set(offset);
        rubber.to(0, SPRING_DEFAULT);
      }

      const { max, points } = snapPoints(el);
      const target = points[nearest(points, el.scrollLeft + project(velocity), max)];
      if (prefersReducedMotion()) {
        el.scrollLeft = target;
        restoreSnap();
        return;
      }
      const atEdge = target <= 0 || target >= max;
      spring.set(el.scrollLeft);
      spring.to(target, { ...(atEdge ? SPRING_DEFAULT : SPRING_FLICK), velocity, onRest: restoreSnap });
    };
    const onPointerUp = (e: PointerEvent) => release(e, false);
    const onPointerCancel = (e: PointerEvent) => release(e, true);
    // Pas de « fantôme » d'image ou de lien glissé par le navigateur.
    const onDragStart = (e: DragEvent) => e.preventDefault();

    // — Flèches —
    goRef.current = (direction) => {
      const { max, points } = snapPoints(el);
      // Pendant une animation, on part de sa cible : deux appuis = deux cartes.
      const from = spring.isAnimating ? spring.target : el.scrollLeft;
      const target = points[Math.min(points.length - 1, Math.max(0, nearest(points, from, max) + direction))];
      if (prefersReducedMotion()) {
        el.scrollLeft = target;
        return;
      }
      if (!spring.isAnimating) spring.set(el.scrollLeft);
      el.style.scrollSnapType = "none";
      spring.to(target, { ...SPRING_DEFAULT, onRest: restoreSnap });
    };

    const observer = new ResizeObserver(onScroll);
    observer.observe(el);
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", interrupt, { passive: true });
    el.addEventListener("touchstart", interrupt, { passive: true });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerCancel);
    el.addEventListener("dragstart", onDragStart);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      spring.stop();
      rubber.stop();
      goRef.current = () => {};
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", interrupt);
      el.removeEventListener("touchstart", interrupt);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerCancel);
      el.removeEventListener("dragstart", onDragStart);
    };
  }, [track]);

  /** Carte précédente (-1) ou suivante (+1). */
  const go = useCallback((direction: 1 | -1) => goRef.current(direction), []);

  return { index, ...edges, go };
}
