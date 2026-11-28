import { Fragment, type CSSProperties, type ReactNode } from "react";

/* Titre découpé en mots pour l'apparition « mot à mot sous un masque »
   (pro-motion.css, .word / .word-in).

   - `lines` : une chaîne, ou plusieurs lignes séparées par un <br>.
   - `suffix` : collé au dernier mot (ex. le point bronze du hero).
   Les lecteurs d'écran lisent le texte entier d'un bloc (sr-only) ; le
   découpage est masqué pour eux.
   Le titre parent porte le déclencheur : `data-reveal="title"` (au
   défilement) ou la classe `words-load` (au chargement). */

export function Words({ lines, suffix }: { lines: string | readonly string[]; suffix?: ReactNode }) {
  const all = typeof lines === "string" ? [lines] : lines;
  const split = all.map((line) => line.split(" ").filter(Boolean));
  const total = split.reduce((n, words) => n + words.length, 0);
  let rank = 0;

  return (
    <>
      <span className="sr-only">{all.join(" ")}</span>
      <span aria-hidden="true">
        {split.map((words, li) => (
          <Fragment key={li}>
            {li > 0 ? <br /> : null}
            {words.map((word, wi) => {
              const w = rank++;
              return (
                <Fragment key={wi}>
                  {wi > 0 ? " " : null}
                  <span className="word">
                    <span className="word-in" style={{ "--w": w } as CSSProperties}>
                      {word}
                      {w === total - 1 ? suffix : null}
                    </span>
                  </span>
                </Fragment>
              );
            })}
          </Fragment>
        ))}
      </span>
    </>
  );
}
