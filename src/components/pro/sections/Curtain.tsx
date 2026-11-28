"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* Pied de page en rideau : il reste immobile derrière, et la section
   Contact (au-dessus, z-10) glisse vers le haut pour le dévoiler.

   `position: sticky` + `bottom` : le pied de page reste collé au bas de
   l'écran tant que la page n'est pas arrivée à lui. S'il est plus haut que
   la place disponible sous la barre du haut fixe, `bottom` devient négatif
   (100dvh − barre − hauteur) : il est dévoilé par son haut, calé juste
   sous la barre (jamais dessous), puis défile normalement jusqu'aux
   mentions. Tout son contenu passe donc à l'écran à un moment ou un autre.

   Clavier : un lien du pied de page qui reçoit le focus est « à l'écran »
   pour le navigateur (le pied de page y est collé), mais encore caché
   derrière Contact. On fait donc défiler juste assez pour lever le rideau
   et montrer l'élément focalisé.

   Sans JavaScript ou avec « réduire les animations » : pied de page normal. */

export function Curtain({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (reduce.matches) {
        el.removeAttribute("data-curtain");
        return;
      }
      el.style.setProperty("--curtain-h", `${el.offsetHeight}px`);
      el.setAttribute("data-curtain", "");
    };
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    reduce.addEventListener("change", apply);
    apply();

    const reveal = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      const main = document.querySelector("main");
      if (!el.hasAttribute("data-curtain") || !main) return;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        const bar = document.querySelector("header")?.offsetHeight ?? 0;
        const height = el.offsetHeight;
        // Où le pied de page s'immobilise : collé en bas s'il tient sous la
        // barre, sinon calé sous la barre (même règle que `bottom` ci-dessous).
        const pinnedTop = height <= vh - bar ? vh - height : bar;
        // Défilement à partir duquel Contact ne le recouvre plus.
        const revealed = main.getBoundingClientRect().bottom + window.scrollY - pinnedTop;
        let top = Math.max(window.scrollY, revealed);
        // Pied de page plus haut que l'écran : continuer jusqu'à l'élément.
        const offset = target.getBoundingClientRect().bottom - el.getBoundingClientRect().top;
        const overflow = pinnedTop + offset - (vh - 16);
        if (overflow > 0) top += overflow;
        if (Math.abs(top - window.scrollY) > 1) window.scrollTo({ top, behavior: "instant" });
      });
    };
    el.addEventListener("focusin", reveal);

    return () => {
      observer.disconnect();
      reduce.removeEventListener("change", apply);
      el.removeEventListener("focusin", reveal);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative z-0 data-curtain:sticky data-curtain:[bottom:min(0px,calc(100dvh_-_var(--pro-bar-h)_-_var(--curtain-h)))]"
    >
      {children}
    </div>
  );
}
