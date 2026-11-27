import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { ProContent } from "@/app/pro/content/types";
import { BOOKING_HREF, proPath } from "@/app/pro/urls";
import { Button } from "../Button";
import { Container } from "../Container";
import { TornEdge } from "../TornEdge";

/* Pied de page (Figma 207-1192 desktop, 207-1668 mobile).

   Fond #272F1D : la couleur exacte du ciel de la gravure des montagnes
   (illustration 4/4), qui s'y fond sans bord. Zones couvertes, bouton,
   gravure, KORVO géant, mentions.
   « Mentions légales » pointe vers la page créée en phase 6. */

export function Footer({ lang, t }: { lang: Locale; t: ProContent["footer"] }) {
  return (
    // pb mobile : place pour la barre fixe du bas.
    <footer className="relative bg-footer pt-10 pb-[121px] text-paper md:pt-16 md:pb-8">
      <TornEdge color="var(--pro-footer)" seed={79} />
      <Container className="flex flex-col gap-5 md:gap-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="flex flex-col gap-1.5 md:gap-2">
            <p className="ui-small text-sage-200">{t.zonesLabel}</p>
            <p className="body-sm md:body-md text-paper">{t.zones}</p>
          </div>
          <div className="flex flex-col gap-2.5 md:items-end md:gap-2">
            <p className="body-sm text-sage-200">{t.tagline}</p>
            <Button href={BOOKING_HREF} variant="inverse" className="w-full md:w-auto">
              {t.cta}
            </Button>
          </div>
        </div>

        <div className="relative h-[117px] w-full md:h-auto md:aspect-[1312/437]">
          <Image
            src="/pro/gravures/montagnes.webp"
            alt=""
            fill
            sizes="(min-width: 1440px) 1312px, 100vw"
            className="object-cover"
          />
        </div>

        <p
          aria-hidden="true"
          className="display text-[74px] leading-[70px] tracking-[0.08em] md:text-center md:text-[length:min(300px,calc((100vw-2*var(--pro-gutter))*0.2286))] md:leading-[0.8] md:tracking-[0.14em]"
        >
          KORVO
        </p>

        <ul className="flex flex-col gap-1.5 font-body text-xs leading-4 font-semibold text-sage-200 md:flex-row md:justify-between md:gap-6">
          <li>{t.siret}</li>
          <li>{t.vat}</li>
          <li>
            <a href={proPath(lang, "mentions-legales")} className="underline decoration-from-font hover:text-paper">
              {t.legal}
            </a>
          </li>
          <li>{t.copyright}</li>
        </ul>
      </Container>
    </footer>
  );
}
