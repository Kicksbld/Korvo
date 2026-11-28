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
    return () => {
      observer.disconnect();
      reduce.removeEventListener("change", apply);
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
