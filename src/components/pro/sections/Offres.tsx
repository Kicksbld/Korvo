import type { ProContent } from "@/app/pro/content/types";
import { Container } from "../Container";
import { Section } from "../Section";
import { OffersBoard } from "./OffersBoard";
import { Words } from "../Words";

/* Offres (Figma 207-619 desktop, 207-1226 mobile) — fond sauge, déchirure
   en haut (transition depuis le papier du hero). */

export function Offres({ t }: { t: ProContent["offers"] }) {
  return (
    <Section id="offres" tone="sage" tear={11} aria-labelledby="offres-title" className="scroll-mt-4">
      <Container className="flex flex-col items-center gap-6 md:gap-11">
        <header className="flex flex-col items-center gap-5 text-center">
          <h2 data-reveal="title" id="offres-title" className="display-mobile-l md:display-m max-w-[350px] md:max-w-[820px]">
            <Words lines={t.title} />
          </h2>
          <p className="body-lg hidden max-w-[640px] text-sage-050 md:block">{t.subtitle}</p>
        </header>
        <OffersBoard t={t} />
        <p className="body-sm w-full text-sage-050 md:text-center">{t.legal}</p>
      </Container>
    </Section>
  );
}
