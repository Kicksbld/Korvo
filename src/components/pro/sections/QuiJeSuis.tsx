import Image from "next/image";
import type { ProContent } from "@/app/pro/content/types";
import { Button } from "../Button";
import { Container } from "../Container";
import { cx } from "../cx";
import { Section } from "../Section";
import { Signature } from "../Signature";

/* Qui je suis (Figma 211-165 desktop, 211-202 mobile) — papier.

   Portrait en cercle, cercle ocre tracé et décalé, signature « Killian »
   (SVG de la phase 1) et son trait de plume, 4 repères en texte, bio, bouton.
   - ≥ 1280 : composition 1312 × 548, les repères de part et d'autre du
     portrait (coordonnées Figma) ;
   - < 1280 : portrait 240 px, puis bio, puis repères (maquette 390).
   Le conteneur de la composition passe en `display: contents` en mobile
   pour que bio et repères s'ordonnent comme dans la maquette. */

type About = ProContent["about"];

/** Positions des repères en desktop (composition 1312 × 548). */
const MILESTONE_POS = ["xl:top-[212px] xl:left-0", "xl:top-[362px] xl:left-0", "xl:top-[212px] xl:right-0 xl:text-right", "xl:top-[362px] xl:right-0 xl:text-right"];

/** Portrait + cercle + signature. Origine : coin haut gauche du portrait.
 *  Mobile 240 px, desktop 340 px ; positions relevées dans Figma. */
function Portrait({ alt }: { alt: string }) {
  return (
    <div
      className={cx(
        "relative order-2 mx-auto mt-1 mb-10 size-60 shrink-0",
        "xl:absolute xl:top-[172px] xl:left-[calc(50%-170px)] xl:m-0 xl:size-[340px]",
      )}
    >
      <Image src="/pro/portrait/cercle-mobile.svg" alt="" width={260} height={260} unoptimized className="absolute -top-1.5 -left-1 max-w-none xl:hidden" />
      <Image src="/pro/portrait/cercle-desktop.svg" alt="" width={360} height={360} unoptimized className="absolute -top-0.5 left-0.5 hidden max-w-none xl:block" />
      <div className="relative size-full overflow-hidden rounded-full shadow-photo">
        <Image
          src="/pro/photos/killian-riviere.webp"
          alt={alt}
          fill
          sizes="(min-width: 1280px) 340px, 240px"
          className="object-cover object-[50%_30%]"
        />
      </div>
      {/* Signature et trait de plume : centrés sur les points relevés dans Figma. */}
      <span className="absolute top-[210.7px] left-[23.6px] -translate-1/2 -rotate-8 xl:top-[288.9px] xl:left-[-36.4px]">
        <Signature className="h-auto w-[157px] max-w-none xl:w-[251px]" width={251} />
      </span>
      <Image
        src="/pro/signature/trait-de-plume.svg"
        alt=""
        width={200}
        height={46}
        unoptimized
        className="absolute top-[244.4px] left-[25.9px] h-auto w-[130px] max-w-none -translate-1/2 -rotate-4 xl:top-[343.9px] xl:left-[-48.6px] xl:w-[200px]"
      />
    </div>
  );
}

export function QuiJeSuis({ t, ctaHref }: { t: About; ctaHref: string }) {
  return (
    <Section id="qui-je-suis" tone="paper" tear={61} padded={false} aria-labelledby="about-title" className="pt-[72px] pb-[90px] md:pt-[110px] md:pb-[130px]">
      <Container className="flex flex-col items-center gap-6 xl:gap-10">
        <div className="contents xl:relative xl:order-1 xl:block xl:h-[548px] xl:w-full">
          <h2 id="about-title" className="display-mobile-l md:display-m order-1 max-w-[350px] text-center md:max-w-none">
            {t.title[0]}
            <br />
            {t.title[1]}
          </h2>
          <Portrait alt={t.portraitAlt} />
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
