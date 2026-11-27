import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { BarreFixeMobile } from "@/components/pro/sections/BarreFixeMobile";
import { Contact } from "@/components/pro/sections/Contact";
import { DemoAssistant } from "@/components/pro/sections/DemoAssistant";
import { Faq } from "@/components/pro/sections/Faq";
import { Footer } from "@/components/pro/sections/Footer";
import { Header } from "@/components/pro/sections/Header";
import { Hero } from "@/components/pro/sections/Hero";
import { Offres } from "@/components/pro/sections/Offres";
import { Processus } from "@/components/pro/sections/Processus";
import { QuiJeSuis } from "@/components/pro/sections/QuiJeSuis";
import { Realisations } from "@/components/pro/sections/Realisations";
import { ToutResteAVous } from "@/components/pro/sections/ToutResteAVous";
import { getProContent } from "../content";
import { BOOKING_HREF } from "../urls";

/* Page pro — phase 2 : intégration statique, section par section, dans
   l'ordre de la maquette (docs/dev-page-pro.md §3). Aucune animation ici
   (phase 3). Chaque section pose sa déchirure en haut quand la couleur
   change avec la précédente. */

export default async function ProPage(props: PageProps<"/pro/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const t = await getProContent(lang);

  return (
    <div className="relative">
      <Header lang={lang} t={t.header} />
      <main>
        <Hero t={t.hero} />
        <Offres t={t.offers} />
        <Realisations t={t.work} />
        <DemoAssistant t={t.demo} />
        <ToutResteAVous t={t.keys} />
        <Processus t={t.process} ctaHref={BOOKING_HREF} />
        <QuiJeSuis t={t.about} ctaHref={BOOKING_HREF} />
        <Faq t={t.faq} ctaHref={BOOKING_HREF} />
        <Contact t={t.contact} />
      </main>
      <Footer lang={lang} t={t.footer} />
      <BarreFixeMobile t={t.mobileBar} />
    </div>
  );
}
