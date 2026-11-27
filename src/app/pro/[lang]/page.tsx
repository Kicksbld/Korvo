import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { Button, Container, LangSwitch, Logo, TextLink } from "@/components/pro";
import { getProContent } from "../content";
import { PORTFOLIO_URL, proPath } from "../urls";

/* Page pro — phase 1 : socle seulement (papier texturé, polices, barre du
   haut et texte du hero composés avec les primitives). Les sections de la
   maquette arrivent en phase 2. */

export default async function ProPage(props: PageProps<"/pro/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const t = await getProContent(lang);

  return (
    <div className="paper-texture min-h-dvh bg-paper">
      <header>
        <Container className="flex h-16 items-center justify-between md:h-20">
          <a href={proPath(lang)} aria-label={t.header.homeLabel}>
            <Logo />
          </a>
          <div className="flex items-center gap-2 md:gap-6">
            <LangSwitch
              current={lang}
              hrefs={{ fr: proPath("fr"), en: proPath("en") }}
              label={t.header.langLabel}
              names={t.header.langNames}
            />
            <TextLink href={PORTFOLIO_URL} external srHint={t.header.portfolio.external}>
              <span className="hidden md:inline">{t.header.portfolio.label}</span>
              <span className="md:hidden">{t.header.portfolio.labelShort}</span>
            </TextLink>
            <Button size="sm" href="#contact" className="hidden md:inline-flex">
              {t.header.bookCall}
            </Button>
          </div>
        </Container>
      </header>

      <main>
        <Container className="flex flex-col items-center gap-7 pt-12 pb-24 text-center md:pt-[72px]">
          <p className="body-md text-ink-2">{t.hero.kicker}</p>
          <h1 className="display-mobile-xl md:display-xl max-w-[1100px]">
            {t.hero.title[0]}
            <br />
            {t.hero.title[1]}
            <span className="text-bronze">.</span>
          </h1>
          <p className="body-md md:body-lg max-w-[640px] text-ink-2">{t.hero.subtitle}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="#contact">{t.hero.ctaPrimary}</Button>
            <Button href="#offres" variant="outline">
              {t.hero.ctaSecondary}
            </Button>
          </div>
        </Container>
      </main>
    </div>
  );
}
