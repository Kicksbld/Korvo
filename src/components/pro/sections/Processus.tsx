import Image from "next/image";
import type { ProContent } from "@/app/pro/content/types";
import { Button } from "../Button";
import { Container } from "../Container";
import { cx } from "../cx";
import { GiftIcon } from "../icons";
import { Section } from "../Section";
import { Tag } from "../Tag";

/* Processus (Figma 207-913 desktop, 207-1461 mobile) — papier creusé.

   Gravure du sentier (illustration 2/4), titre, frise de 6 étapes.
   Les étapes 1 à 3 sont « parcourues » (pastilles vert forêt), l'étape 3
   est mise en avant avec le tag « Maquette offerte ».
   - ≥ 1280 : frise horizontale (pastilles reliées) + 6 cartes en colonnes ;
   - < 1280 : frise verticale (maquette 390).
   Une seule liste ordonnée ; la frise horizontale est un décor masqué. */

type Process = ProContent["process"];

const HIGHLIGHT = 2; // étape 3
const DONE = 3; // étapes 1 à 3

function Marker({ index, size }: { index: number; size: "sm" | "lg" }) {
  const done = index < DONE;
  return (
    <span
      aria-hidden="true"
      className={cx(
        "flex shrink-0 items-center justify-center rounded-full font-body leading-6 font-semibold",
        size === "lg" ? "size-11 text-[17px]" : "size-8 text-sm",
        done ? "bg-forest text-paper" : "border border-border-strong bg-paper-raised text-ink-3",
      )}
    >
      {index + 1}
    </span>
  );
}

/** Frise horizontale (desktop) : pastilles reliées par un trait. */
function Timeline({ count }: { count: number }) {
  const line = (forest: boolean) => <span className={cx("h-0.5 flex-1", forest ? "bg-forest" : "bg-border-strong")} />;
  return (
    <div aria-hidden="true" className="hidden items-center xl:flex">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex flex-1 items-center">
          {i > 0 ? line(i < DONE) : null}
          <Marker index={i} size="lg" />
          {i < count - 1 ? line(i + 1 < DONE) : null}
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
            src="/pro/gravures/sentier.webp"
            alt=""
            width={512}
            height={512}
            sizes="(min-width: 768px) 150px, 120px"
            className="engraving size-[120px] md:size-[150px]"
          />
          <h2 id="processus-title" className="display-mobile-l md:display-m max-w-[900px] md:text-center">
            {t.title}
          </h2>
        </div>

        <div className="flex flex-col xl:gap-7">
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
                    {!last ? <span aria-hidden="true" className={cx("w-0.5 flex-1", i + 1 < DONE ? "bg-forest" : "bg-border-strong")} /> : null}
                  </div>
                  <div
                    className={cx(
                      "flex flex-1 flex-col gap-1.5 pt-1 pb-[22px]",
                      "xl:h-full xl:gap-2.5 xl:rounded-card-lg xl:px-5 xl:py-[22px]",
                      highlight ? "xl:bg-forest" : "xl:border xl:border-border-faint xl:bg-paper-raised",
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
        </div>

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
