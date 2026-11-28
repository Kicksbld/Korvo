import Image from "next/image";
import type { ProContent } from "@/app/pro/content/types";
import { Button } from "../Button";
import { Container } from "../Container";
import { cx } from "../cx";
import { Section } from "../Section";
import { Words } from "../Words";

/* Qui je suis (Figma 211-165 desktop, 211-202 mobile) — papier.

   Portrait en « tirage photo posé » (piste A, validée le 28/11 à la place
   du cercle ocre et de la signature) : tirage papier à marge blanche,
   penché de −2°, ombre chaude des cartes, petite légende manuscrite
   (Caveat, taille « à votre nom »). Puis 4 repères en texte, bio, bouton.
   - ≥ 1280 : composition 1312 × 548, les repères de part et d'autre du
     tirage (coordonnées Figma) ;
   - < 1280 : tirage centré, puis bio, puis repères (maquette 390).
   Le conteneur de la composition passe en `display: contents` en mobile
   pour que bio et repères s'ordonnent comme dans la maquette. */

type About = ProContent["about"];

/** Positions des repères en desktop (composition 1312 × 548). */
const MILESTONE_POS = ["xl:top-[212px] xl:left-0", "xl:top-[362px] xl:left-0", "xl:top-[212px] xl:right-0 xl:text-right", "xl:top-[362px] xl:right-0 xl:text-right"];

/** Tirage photo : marge blanche, légende manuscrite dans la marge du bas.
 *  Mobile 252 px de large, desktop 288 px, centré sur l'axe de la section.
 *  Légende à 18 / 20 px : elle tient sur une ligne, en français comme en
 *  anglais (plus long). */
function Portrait({ alt, caption }: { alt: string; caption: string }) {
  return (
    <figure
      className={cx(
        "relative order-2 mx-auto mt-1 mb-8 w-[252px] shrink-0 -rotate-2",
        "rounded-md border border-border-faint bg-paper-raised px-2.5 pt-2.5 shadow-card contrast-more:border-ink",
        "xl:absolute xl:top-[140px] xl:left-[calc(50%-144px)] xl:m-0 xl:w-[288px] xl:px-3 xl:pt-3",
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
        <Image
          src="/pro/photos/killian-riviere.webp"
          alt={alt}
          fill
          sizes="(min-width: 1280px) 264px, 232px"
          className="object-cover object-[50%_30%]"
        />
      </div>
      <figcaption className="hand px-1 pt-3 pb-3.5 text-center text-[18px] leading-[22px] text-balance text-ochre xl:pt-3.5 xl:pb-4 xl:text-[20px] xl:leading-6">
        {caption}
      </figcaption>
    </figure>
  );
}

export function QuiJeSuis({ t, ctaHref }: { t: About; ctaHref: string }) {
  return (
    <Section id="qui-je-suis" tone="paper" tear={61} padded={false} aria-labelledby="about-title" className="pt-[72px] pb-[90px] md:pt-[110px] md:pb-[130px]">
      <Container className="flex flex-col items-center gap-6 xl:gap-10">
        <div className="contents xl:relative xl:order-1 xl:block xl:h-[548px] xl:w-full">
          <h2 data-reveal="title" id="about-title" className="display-mobile-l md:display-m order-1 max-w-[350px] text-center md:max-w-none">
            <Words lines={t.title} />
          </h2>
          <Portrait alt={t.portraitAlt} caption={t.photoCaption} />
          <ul className="order-4 flex w-full flex-col gap-1.5 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-6 xl:contents">
            {t.milestones.map((m, i) => (
              <li key={m.title} className={cx("flex flex-col gap-1.5 xl:absolute xl:w-[360px]", MILESTONE_POS[i])}>
                <h3 className="display text-[22px] leading-7 tracking-[-0.01em] md:text-2xl md:leading-[30px]">{m.title}</h3>
                <p className="body-sm text-ink-2">{m.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="body-md md:body-lg order-3 max-w-[720px] text-center text-ink-2 xl:order-2">{t.bio}</p>
        <Button href={ctaHref} variant="outline" className="order-5 w-full md:w-auto xl:order-3">
          {t.cta}
        </Button>
      </Container>
    </Section>
  );
}
