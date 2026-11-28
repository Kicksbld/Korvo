"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Spring } from "../motion/spring";

/* Scène desktop du hero : les cartes suivent très légèrement la souris
   (± 4 px, spec mouvement). Pas de flottement en boucle.

   Pose --mx et --my (de −1 à 1) sur la scène, lissés par ressort ; chaque
   carte les lit avec sa propre profondeur (propriété `translate`, qui se
   compose avec sa rotation). Inactif au doigt, avec « réduire les
   animations », et quand le hero n'est plus à l'écran. */

export function HeroParallax({ className, children }: { className?: string; children: ReactNode }) {
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scene.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const smooth = { damping: 1, response: 0.6 };
    const mx = new Spring(0, (v) => el.style.setProperty("--mx", v.toFixed(3)), 0.002);
    const my = new Spring(0, (v) => el.style.setProperty("--my", v.toFixed(3)), 0.002);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    const onMove = (e: PointerEvent) => {
      if (!visible || e.pointerType !== "mouse" || !fine.matches || reduce.matches) return;
      const r = el.getBoundingClientRect();
      const clamp = (n: number) => Math.max(-1, Math.min(1, n));
      mx.to(clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2)), smooth);
      my.to(clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2)), smooth);
    };
    const onLeave = () => {
      mx.to(0, smooth);
      my.to(0, smooth);
    };
    const onReduce = () => {
      if (reduce.matches) {
        mx.set(0);
        my.set(0);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    reduce.addEventListener("change", onReduce);
    return () => {
      io.disconnect();
      mx.stop();
      my.stop();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      reduce.removeEventListener("change", onReduce);
    };
  }, []);

  return (
    <div ref={scene} className={className}>
      {children}
    </div>
  );
}
