"use client";

import { useEffect, useRef, useState } from "react";

/* Champ de l'assistant : des questions d'exemple s'écrivent seules, avec
   un curseur qui clignote, pour qu'on comprenne qu'on peut lui parler.

   - Écrit une question (≈ 55 ms par lettre), la laisse 1,8 s, l'efface,
     passe à la suivante.
   - Seulement quand le champ est à l'écran et l'onglet visible ; s'arrête
     au repos sinon.
   - Le HTML serveur (et « réduire les animations ») affiche la première
     question en entier, sans curseur animé.
   Décoratif : le champ est masqué aux lecteurs d'écran (aria-hidden posé
   par le parent), l'intro de la section dit déjà « posez-lui une question ». */

const TYPE = 55;
const ERASE = 25;
const HOLD = 1800;
const GAP = 450;

export function TypingPlaceholder({ texts }: { texts: readonly string[] }) {
  const [text, setText] = useState(texts[0]);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = 0;
    let running = false;
    let index = 0;
    let length = texts[0].length;
    let erasing = true; // on part de la première question affichée en entier

    const step = () => {
      const full = texts[index];
      if (erasing) {
        length -= 1;
        if (length <= 0) {
          erasing = false;
          index = (index + 1) % texts.length;
          length = 0;
          setText("");
          timer = window.setTimeout(step, GAP);
          return;
        }
        setText(full.slice(0, length));
        timer = window.setTimeout(step, ERASE);
        return;
      }
      length += 1;
      setText(full.slice(0, length));
      if (length >= full.length) {
        erasing = true;
        timer = window.setTimeout(step, HOLD);
        return;
      }
      timer = window.setTimeout(step, TYPE);
    };

    const start = () => {
      if (running) return;
      running = true;
      setAnimated(true);
      timer = window.setTimeout(step, HOLD);
    };
    const stop = () => {
      running = false;
      window.clearTimeout(timer);
    };

    let visible = false;
    const sync = () => (visible && !document.hidden ? start() : stop());
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [texts]);

  return (
    <span ref={ref} className="flex min-w-0 items-center overflow-hidden whitespace-nowrap">
      <span className="truncate">{text}</span>
      <span
        className={
          animated
            ? "ml-px h-[1.1em] w-[1.5px] shrink-0 animate-[pro-caret_1s_steps(1)_infinite] bg-ink-2"
            : "ml-px h-[1.1em] w-[1.5px] shrink-0 bg-ink-2"
        }
      />
    </span>
  );
}
