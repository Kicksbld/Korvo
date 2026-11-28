import Image from "next/image";
import type { ProContent } from "@/app/pro/content/types";
import { Button } from "../Button";
import { Container } from "../Container";
import { cx } from "../cx";
import { GiftIcon } from "../icons";
import { ProcessTrack } from "./ProcessTrack";
import { Section } from "../Section";
import { Tag } from "../Tag";
import { Words } from "../Words";

/* Processus (Figma 207-913 desktop, 207-1461 mobile) — papier creusé.

   Gravure du sentier (illustration 2/4), titre, frise de 6 étapes.
   Les étapes 1 à 3 sont « parcourues » (pastilles vert forêt), l'étape 3
   est mise en avant avec le tag « Maquette offerte ».
   - ≥ 1280 : frise horizontale (pastilles reliées) + 6 cartes en colonnes ;
   - < 1280 : frise verticale (maquette 390).
   Une seule liste ordonnée ; la frise horizontale est un décor masqué.

   Mouvement (ProcessTrack) : le trait se trace au défilement et chaque
   pastille s'allume quand il l'atteint. Le rendu serveur (et sans
   JavaScript) reste celui de la maquette : étapes 1 à 3 parcourues. */

type Process = ProContent["process"];

const HIGHLIGHT = 2; // étape 3
const DONE = 3; // étapes 1 à 3

/** Pastille numérotée : fond papier, et une couche vert forêt qui
    s'allume (data-on, posé par ProcessTrack ; étapes 1 à 3 au départ). */
function Marker({ index, size }: { index: number; size: "sm" | "lg" }) {
  return (
    <span
      aria-hidden="true"
      data-mark={size === "lg" ? "wide" : "narrow"}
      data-on={index < DONE ? "" : undefined}
      className={cx(
        "group/mark relative flex shrink-0 items-center justify-center rounded-full border border-border-strong bg-paper-raised font-body leading-6 font-semibold text-ink-3",
        size === "lg" ? "size-11 text-[17px]" : "size-8 text-sm",
      )}
    >
      {index + 1}
      <span
        className={cx(
          "absolute -inset-px flex items-center justify-center rounded-full bg-forest text-paper",
          "scale-50 opacity-0 transition-[opacity,scale] duration-700 ease-(--pro-ease-out-expo)",
          "group-data-on/mark:scale-100 group-data-on/mark:opacity-100 group-data-on/mark:delay-200 motion-reduce:scale-100",
        )}
      >
        {index + 1}
      </span>
    </span>
  );
}

/** Frise horizontale (desktop) : un trait gris de la 1re à la dernière
    pastille, et par-dessus le trait vert forêt qui s'étire (--p). */
function Timeline({ count }: { count: number }) {
  const inset = `calc(100% / ${count * 2})`;
  return (
    <div aria-hidden="true" className="relative hidden items-center xl:grid" style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}>
      <span className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-border-strong" style={{ left: inset, right: inset }} />
      <span
        data-line
        className="absolute top-1/2 h-0.5 origin-left -translate-y-1/2 bg-forest transition-[scale] duration-700 ease-out motion-reduce:transition-none"
        style={{ left: inset, right: inset, scale: `var(--p, ${(DONE - 1) / (count - 1)}) 1` }}
      />
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="relative flex justify-center">
          <Marker index={i} size="lg" />
        </div>
      ))}
    </div>
  );
}

export function Processus({ t, ctaHref }: { t: Process; ctaHref: string }) {
  return (
    <Section id="processus" tone="sunken" tear={53} aria-labelledby="processus-title">
      <Container className="flex flex-col gap-6 md:gap-16">
        <div className="flex flex-col gap-6 md:items-center md:gap-5">
          <Image
            src="/pro/gravures/sentier-encre.webp"
            alt=""
            width={512}
            height={512}
            sizes="(min-width: 768px) 150px, 120px"
            className="engraving size-[120px] md:size-[150px]"
          />
          <h2 data-reveal="title" id="processus-title" className="display-mobile-l md:display-m max-w-[900px] md:text-center">
            <Words lines={t.title} />
          </h2>
        </div>

        <ProcessTrack className="flex flex-col xl:gap-7">
          <Timeline count={t.steps.length} />
          <ol className="flex flex-col xl:grid xl:grid-cols-6 xl:gap-4">
            {t.steps.map((step, i) => {
              const highlight = i === HIGHLIGHT;
              const last = i === t.steps.length - 1;
              return (
                <li key={step.title} className="flex gap-3.5 xl:block">
                  {/* Frise verticale (< 1280). */}
                  <div className="flex flex-col items-center xl:hidden">
                    <Marker index={i} size="sm" />
                    {!last ? (
                      <span aria-hidden="true" data-seg className="relative w-0.5 flex-1 bg-border-strong">
                        <span
                          className="absolute inset-0 origin-top bg-forest transition-[scale] duration-500 ease-out motion-reduce:transition-none"
                          style={{ scale: `1 var(--f, ${i + 1 < DONE ? 1 : 0})` }}
                        />
                      </span>
                    ) : null}
                  </div>
                  <div
                    className={cx(
                      "flex flex-1 flex-col gap-1.5 pt-1 pb-[22px]",
                      "xl:h-full xl:gap-2.5 xl:rounded-card-lg xl:px-5 xl:py-[22px]",
                      highlight ? "xl:bg-forest" : "xl:border xl:border-border-faint xl:contrast-more:border-ink xl:bg-paper-raised",
                    )}
                  >
                    <h3 className={cx("body-strong", highlight ? "text-ink xl:text-paper" : "text-ink")}>{step.title}</h3>
                    {highlight ? (
                      <Tag icon={<GiftIcon />} className="self-start">
                        <span className="xl:hidden">{t.highlightTag.long}</span>
                        <span className="hidden xl:inline">{t.highlightTag.short}</span>
                      </Tag>
                    ) : null}
                    <p className={cx("body-sm", highlight ? "text-ink-2 xl:text-sage-200" : "text-ink-2 xl:text-ink-3")}>{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </ProcessTrack>

        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <p className="body-lg hidden text-ink-2 md:block">{t.ctaNote}</p>
          <Button href={ctaHref} className="w-full md:w-auto">
            {t.cta}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
