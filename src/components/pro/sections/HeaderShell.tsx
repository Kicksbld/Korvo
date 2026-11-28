"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* Barre du haut fixe (spec : « barre du haut en verre, le contenu défile
   dessous »).

   - En haut de page : transparente, elle se fond dans le papier du hero
     (comme la maquette).
   - Dès qu'on défile : verre papier (papier 85 % + flou 20 px) et ombre
     chaude très douce. Pas de filet (supprimé en v2).
   - « Réduire la transparence » : papier opaque, sans flou.
   - « Contraste élevé » : filet encre en bas une fois défilé.
   Un seul écouteur passif ; l'attribut ne change qu'au franchissement du
   seuil. */

export function HeaderShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => el.toggleAttribute("data-scrolled", window.scrollY > 8);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  return (
    <header
      ref={ref}
      className={[
        "group/bar fixed inset-x-0 top-0 z-40",
        "transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out",
        "data-scrolled:bg-[rgb(247_245_238/0.85)] data-scrolled:shadow-[0_6px_24px_rgb(51_41_20/0.08)] data-scrolled:backdrop-blur-[20px] data-scrolled:backdrop-saturate-150",
        "reduce-transparency:data-scrolled:bg-paper reduce-transparency:data-scrolled:backdrop-blur-none",
        "contrast-more:data-scrolled:border-b contrast-more:data-scrolled:border-ink contrast-more:data-scrolled:bg-paper",
      ].join(" ")}
    >
      {children}
    </header>
  );
}
