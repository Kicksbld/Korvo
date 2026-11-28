"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* Frise du processus qui se trace au défilement.

   Le trait vert forêt avance avec le défilement et chaque pastille
   numérotée s'allume quand il l'atteint (data-on). Rien n'est animé par
   une durée : c'est la position de la page qui décide, donc on peut
   remonter, le trait recule.

   - ≥ 1280 (frise horizontale) : le trait part quand la frise passe à 90 %
     de la hauteur d'écran et arrive au bout à 20 % (70 % d'écran de
     défilement pour 6 étapes). `--p` (0 → 1) sur [data-line].
   - < 1280 (frise verticale) : une ligne de lecture à 55 % de l'écran ;
     chaque segment [data-seg] se remplit (`--f`) à mesure qu'elle le
     traverse, chaque pastille s'allume quand elle passe son centre.

   Le trait suit la page avec un léger retard (transition CSS, voir
   Processus) : il glisse au lieu de sauter d'une image à l'autre.

   Le HTML serveur montre l'état de la maquette (étapes 1 à 3 parcourues) :
   c'est ce qu'on voit sans JavaScript. Écoute du défilement passive, et
   seulement tant que la section est à l'écran. */

const clamp = (n: number) => Math.min(1, Math.max(0, n));

export function ProcessTrack({ className, children }: { className?: string; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const wide = window.matchMedia("(min-width: 1280px)");

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      if (wide.matches) {
        const line = el.querySelector<HTMLElement>("[data-line]");
        const marks = el.querySelectorAll<HTMLElement>("[data-mark=wide]");
        if (!line) return;
        const top = line.getBoundingClientRect().top;
        const p = clamp((vh * 0.9 - top) / (vh * 0.7));
        line.style.setProperty("--p", p.toFixed(4));
        const n = marks.length - 1;
        marks.forEach((m, i) => m.toggleAttribute("data-on", p >= i / n - 0.001));
        return;
      }
      const read = vh * 0.55;
      el.querySelectorAll<HTMLElement>("[data-seg]").forEach((seg) => {
        const r = seg.getBoundingClientRect();
        seg.style.setProperty("--f", clamp((read - r.top) / r.height).toFixed(4));
      });
      el.querySelectorAll<HTMLElement>("[data-mark=narrow]").forEach((m) => {
        const r = m.getBoundingClientRect();
        m.toggleAttribute("data-on", read >= r.top + r.height / 2);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    let listening = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listening) {
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
          listening = true;
          onScroll();
        } else if (!entry.isIntersecting && listening) {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
          listening = false;
          onScroll(); // dernier état (tout parcouru au-dessus, rien en dessous)
        }
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(el);
    update();
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
