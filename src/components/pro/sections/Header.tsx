import type { Locale } from "@/i18n/config";
import type { ProContent } from "@/app/pro/content/types";
import { PORTFOLIO_URL, proPath } from "@/app/pro/urls";
import { Button } from "../Button";
import { Container } from "../Container";
import { LangSwitch } from "../LangSwitch";
import { Logo } from "../Logo";
import { TextLink } from "../TextLink";
import { HeaderShell } from "./HeaderShell";

/* Barre du haut (Figma 207-571 desktop, 207-1208 mobile).
   Fixe (HeaderShell) : transparente sur le papier du hero en haut de page,
   en verre papier dès qu'on défile (le hero réserve sa hauteur en haut).
   Logotype sans filet, sélecteur FR / EN, lien vers le portfolio, et le
   bouton « Réserver un appel » en desktop seulement.
   Pas de filet sous la barre : supprimé en v2 (docs/dev-page-pro.md §0, règle 9). */

export function Header({ lang, t }: { lang: Locale; t: ProContent["header"] }) {
  return (
    <HeaderShell>
      <Container className="flex h-16 items-center justify-between md:h-20">
        <a href={proPath(lang)} aria-label={t.homeLabel} className="flex h-11 items-center">
          <Logo />
        </a>
        <div className="flex items-center gap-1 md:gap-6">
          <LangSwitch
            current={lang}
            hrefs={{ fr: proPath("fr"), en: proPath("en") }}
            label={t.langLabel}
            names={t.langNames}
          />
          <TextLink href={PORTFOLIO_URL} external srHint={t.portfolio.external} className="pl-3 md:pl-1">
            <span className="hidden md:inline">{t.portfolio.label}</span>
            <span className="md:hidden">{t.portfolio.labelShort}</span>
          </TextLink>
          <Button size="sm" href="#contact" className="max-md:hidden">
            {t.bookCall}
          </Button>
        </div>
      </Container>
    </HeaderShell>
  );
}
