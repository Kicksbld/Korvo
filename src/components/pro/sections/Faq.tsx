import type { ProContent } from "@/app/pro/content/types";
import { Button } from "../Button";
import { Container } from "../Container";
import { Section } from "../Section";
import { Words } from "../Words";

/* FAQ (Figma 207-1037 desktop, 207-1564 mobile) — vert forêt.

   Accordéon natif <details name="faq"> : la première question est ouverte,
   une seule à la fois, toute la ligne est cliquable et l'état est annoncé
   aux lecteurs d'écran sans JavaScript (le <summary> porte nativement
   l'état « développé / réduit », l'équivalent d'aria-expanded).

   Mouvement (pro-motion.css, .pro-faq) : la réponse s'ouvre et se ferme
   en ressort là où le navigateur sait animer ::details-content, et
   instantanément ailleurs. Le « + » devient « − » (le trait vertical se
   replie), la pastille passe à l'ocre. */

type Faq = ProContent["faq"];

export function Faq({ t, ctaHref }: { t: Faq; ctaHref: string }) {
  return (
    <Section id="faq" tone="forest" tear={67} aria-labelledby="faq-title">
      <Container className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-24">
        <div className="flex flex-col gap-6 lg:w-[400px] lg:shrink-0">
          <h2 data-reveal="title" id="faq-title" className="display-mobile-l md:display-m">
            <Words lines={t.title} />
          </h2>
          <p className="body-md hidden text-sage-200 md:block">{t.intro}</p>
          <Button href={ctaHref} variant="inverse" className="self-start max-md:hidden">
            {t.cta}
          </Button>
        </div>

        <div className="flex flex-1 flex-col border-b border-forest-2">
          {t.items.map((item, i) => (
            <details key={item.question} name="faq" open={i === 0} className="pro-faq group border-t border-forest-2 pb-1.5 md:pb-3.5">
              <summary className="flex cursor-pointer list-none items-center gap-4 pt-[19px] pb-3 md:pt-[26px] md:pb-3 [&::-webkit-details-marker]:hidden [&:active>span]:scale-[0.94]">
                <h3 className="display flex-1 text-[19px] leading-[23px] tracking-[-0.01em] text-paper md:text-2xl md:leading-[30px]">
                  {item.question}
                </h3>
                <span
                  aria-hidden="true"
                  className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-sage-400 text-paper transition-[background-color,border-color,scale] duration-150 ease-out group-open:border-ochre group-open:bg-ochre"
                >
                  {/* « + » : le trait vertical se replie à l'ouverture → « − ». */}
                  <span className="absolute h-[1.5px] w-[11px] rounded-full bg-current" />
                  <span className="absolute h-[11px] w-[1.5px] rounded-full bg-current transition-[rotate,scale] duration-(--pro-spring-duration) ease-(--pro-ease-spring) group-open:scale-y-0 group-open:rotate-90 motion-reduce:transition-none" />
                </span>
              </summary>
              {/* Pas de marge négative ici : elle sautait à la fin de la
                  fermeture animée et faisait bouger les questions. Le reste
                  de l'espace sous la question est porté par <details>. */}
              <p className="body-sm md:body-md pb-3 text-sage-200">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
