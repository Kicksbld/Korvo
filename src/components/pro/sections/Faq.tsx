import type { ProContent } from "@/app/pro/content/types";
import { Button } from "../Button";
import { Container } from "../Container";
import { MinusIcon, PlusIcon } from "../icons";
import { Section } from "../Section";

/* FAQ (Figma 207-1037 desktop, 207-1564 mobile) — vert forêt.

   Accordéon natif <details name="faq"> : la première question est ouverte,
   une seule à la fois, toute la ligne est cliquable et l'état est annoncé
   aux lecteurs d'écran sans JavaScript. L'ouverture animée arrive en
   phase 3. */

type Faq = ProContent["faq"];

export function Faq({ t, ctaHref }: { t: Faq; ctaHref: string }) {
  return (
    <Section id="faq" tone="forest" tear={67} aria-labelledby="faq-title">
      <Container className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-24">
        <div className="flex flex-col gap-6 lg:w-[400px] lg:shrink-0">
          <h2 id="faq-title" className="display-mobile-l md:display-m">
            {t.title[0]}
            <br />
            {t.title[1]}
          </h2>
          <p className="body-md hidden text-sage-200 md:block">{t.intro}</p>
          <Button href={ctaHref} variant="inverse" className="hidden self-start md:inline-flex">
            {t.cta}
          </Button>
        </div>

        <div className="flex flex-1 flex-col border-b border-forest-2">
          {t.items.map((item, i) => (
            <details key={item.question} name="faq" open={i === 0} className="group border-t border-forest-2">
              <summary className="flex cursor-pointer list-none items-center gap-4 pt-[19px] pb-[18px] md:py-[26px] [&::-webkit-details-marker]:hidden">
                <h3 className="display flex-1 text-[19px] leading-[23px] tracking-[-0.01em] text-paper md:text-2xl md:leading-[30px]">
                  {item.question}
                </h3>
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-sage-400 text-paper group-open:border-ochre group-open:bg-ochre"
                >
                  <PlusIcon className="group-open:hidden" />
                  <MinusIcon className="hidden group-open:block" />
                </span>
              </summary>
              <p className="body-sm md:body-md -mt-1.5 pb-[18px] text-sage-200 md:-mt-3.5 md:pb-[26px]">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
