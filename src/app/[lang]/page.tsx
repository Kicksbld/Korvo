import Image from "next/image";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/korvo/SiteHeader";
import { ICON_PROPS, getSocials } from "@/components/korvo/socials";
import ScrollReveal from "@/components/korvo/ScrollReveal";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  ArrowLink,
  Eyebrow,
  Figure,
  Rich,
  SectionRule,
  SkillCard,
  TechList,
  TimelineRow,
  WordImage,
} from "@/components/korvo/ui";

/* ------------------------------------------------------------------ *
 * Korvo — site de Killian Boularand, une seule page, en fr/en.
 * Direction : papier chaud + encre, sage en accent unique, règles 1px.
 * Pills encre, radius généreux, photos dominantes — la chaleur vient
 * des images, la précision des hairlines. Aucune décoration gratuite.
 * ------------------------------------------------------------------ */

/* icônes trait 1.5px, encre — ICON_PROPS et les réseaux vivent dans
   socials.tsx, partagés avec le sommaire du header */

/* données non traduisibles (icônes, images, mise en page) — le texte vit
   dans les dictionnaires i18n et se recompose avec ces constantes par index */

const SKILL_ICONS = [
  {
    background: "var(--sage-200)",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="m8 7-5 5 5 5" />
        <path d="m16 7 5 5-5 5" />
      </svg>
    ),
  },
  {
    background: "var(--korvo-sand)",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M21 16V8a1.8 1.8 0 0 0-.9-1.56l-7.2-4.1a1.8 1.8 0 0 0-1.8 0l-7.2 4.1A1.8 1.8 0 0 0 3 8v8a1.8 1.8 0 0 0 .9 1.56l7.2 4.1a1.8 1.8 0 0 0 1.8 0l7.2-4.1A1.8 1.8 0 0 0 21 16Z" />
        <path d="m3.3 7.1 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
  {
    background: "var(--paper-inset)",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M14.5 5h-5L7.7 7.2H4.5A1.5 1.5 0 0 0 3 8.7v8.8A1.5 1.5 0 0 0 4.5 19h15a1.5 1.5 0 0 0 1.5-1.5V8.7a1.5 1.5 0 0 0-1.5-1.5h-3.2L14.5 5Z" />
        <circle cx="12" cy="12.8" r="3.4" />
      </svg>
    ),
  },
  {
    background: "var(--korvo-cloud)",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14.2 14.2 0 0 1 0 18 14.2 14.2 0 0 1 0-18Z" />
      </svg>
    ),
  },
];

const GALLERY_META = [
  { src: "/images/giza.webp", span: "md:col-span-7", height: "h-[300px] md:h-[500px]" },
  { src: "/images/pyramid.webp", span: "md:col-span-5", height: "h-[300px] md:h-[500px]" },
  { src: "/images/toutankamon.webp", span: "md:col-span-5", height: "h-[300px] md:h-[420px]" },
  { src: "/images/egypte-atterissage.webp", span: "md:col-span-3", height: "h-[300px] md:h-[420px]" },
  { src: "/images/colise.webp", span: "md:col-span-4", height: "h-[300px] md:h-[420px]" },
  { src: "/images/arc-rome.webp", span: "md:col-span-4", height: "h-[300px] md:h-[460px]" },
  { src: "/images/cannes.webp", span: "md:col-span-4", height: "h-[300px] md:h-[460px]" },
  { src: "/images/alyssia.webp", span: "md:col-span-4", height: "h-[300px] md:h-[460px]" },
];

/* le procédé raconté par une vraie pièce : le loquet de portail,
   du croquis à l'objet monté */
const MAKER_STEPS_META = [
  { src: "/images/sketch.png" },
  { src: "/images/bambu.webp" },
  { src: "/images/pied-a-coulisse-2.jpg" },
];

/* photos-mots du manifeste — voir positionnement.paragraph dans les
   dictionnaires pour le texte qui les entoure */
const WORD_IMAGES = [
  { src: "/images/obrado-logo.png", eager: true },
  { src: "/images/iot.webp", position: "center 65%" },
  { src: "/images/atelier.webp" },
];

/* sources des photos de la timeline, alignées par index sur
   dict.parcours.timeline (les alt textes, eux, sont traduits) */
const TIMELINE_IMAGES: (string[] | undefined)[] = [
  ["/images/cr-1.webp", "/images/cr-2.webp"],
  undefined,
  ["/images/adn-studio.webp", "/images/debatium.png", "/images/les-ignobles.webp"],
  undefined,
  undefined,
];

export default async function Home(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const SOCIALS = getSocials(dict.footer.phoneLabel);

  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100vh" }}>
      <ScrollReveal />
      <SiteHeader lang={lang} dict={dict} />

      <main id="top" className="mx-auto max-w-[1180px] px-6 md:px-16">
        {/* ---------------- HERO ---------------- */}
        {/* colonne centrée : portrait en cercle étiqueté, statut, une phrase
            en display, un seul CTA encre — le nom vit sur l'étiquette */}
        <section
          className="k-hero-grid flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center py-12 text-center"
          style={{ borderBottom: "1px solid var(--border-strong)" }}
        >
          <div className="k-hero-in relative" style={{ ["--reveal-i" as string]: 0 }}>
            <div
              className="h-24 w-24 overflow-hidden rounded-full md:h-28 md:w-28"
              style={{ background: "var(--sage-200)" }}
            >
              <Image
                src="/images/portrait.webp"
                alt="Portrait de Killian Boularand"
                width={400}
                height={547}
                preload
                sizes="112px"
                className="h-full scale-130 w-full object-cover object-top"
              />
            </div>
            <span className="k-hero-tag" aria-hidden>
              {dict.hero.greeting}
            </span>
          </div>

          <p
            className="k-hero-in k-label m-0 mt-8 flex items-center gap-2.5 rounded-full px-4 py-2"
            style={{
              background: "var(--live-bg)",
              color: "var(--live-text)",
              ["--reveal-i" as string]: 1,
            }}
          >
            <span className="k-live-dot h-1.5 w-1.5 rounded-full" style={{ background: "var(--live-dot)" }} />
            {dict.hero.available}
          </p>

          <h1
            className="k-hero-in k-display-1 mt-6 max-w-[16ch]"
            style={{ textWrap: "balance", ["--reveal-i" as string]: 2 }}
          >
            <Rich segments={dict.hero.title} />
          </h1>

          <p
            className="k-hero-in mt-6 max-w-[42ch]"
            style={{
              font: "400 19px/1.6 var(--font-body)",
              color: "var(--text-muted)",
              textWrap: "pretty",
              ["--reveal-i" as string]: 3,
            }}
          >
            {dict.hero.subtitle}
          </p>

          <div
            className="k-hero-in mt-10 flex flex-wrap items-center justify-center gap-6"
            style={{ ["--reveal-i" as string]: 4 }}
          >
            <a className="k-btn k-btn--lg" href="#projets">
              {dict.hero.ctaProjects}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M7 1v12M2 8l5 5 5-5" />
              </svg>
            </a>
            <a
              href="https://obrado.app/cto"
              target="_blank"
              rel="noreferrer"
              className="k-text-link"
              style={{ font: "600 14px/1 var(--font-body)", color: "var(--text-muted)" }}
            >
              {dict.hero.ctaCv}
            </a>
          </div>
        </section>

        {/* ---------------- POSITIONNEMENT ---------------- */}
        {/* le manifeste : deux phrases en display-2, la seconde décalée à
            droite — un seul message, la polyvalence */}
        <section id="positionnement" className="k-section">
          <SectionRule label={dict.positionnement.eyebrow} />

          <div className="k-reveal mt-12 md:mt-16" data-reveal>
            <h2 className="k-display-2 m-0 max-w-[22ch]" style={{ textWrap: "pretty" }}>
              <Rich segments={dict.positionnement.heading} />
            </h2>
          </div>

          <div className="k-reveal mt-12 md:mt-16 md:ml-[30%]" data-reveal>
            <p className="k-display-2 m-0 max-w-[26ch]" style={{ textWrap: "pretty" }}>
              {dict.positionnement.paragraph.before}
              <span style={{ color: "var(--sage-700)" }}>{dict.positionnement.paragraph.accent1}</span>
              <WordImage {...WORD_IMAGES[0]} revealIndex={0} />
              {dict.positionnement.paragraph.betweenAccent1AndAccent2}
              <span style={{ color: "var(--sage-700)" }}>{dict.positionnement.paragraph.accent2}</span>
              {dict.positionnement.paragraph.afterAccent2}
              <WordImage {...WORD_IMAGES[1]} revealIndex={1} />
              {dict.positionnement.paragraph.betweenImg2AndImg3}
              <WordImage {...WORD_IMAGES[2]} revealIndex={2} />
              {dict.positionnement.paragraph.end}
            </p>
          </div>

          {/* le cap — trajectoire de vol tracée au trait, avion en papier en
              bout de course, puis l'objectif en une phrase */}
          <div className="k-reveal mt-14 md:ml-[30%] md:mt-16" data-reveal>
            <svg
              width="140"
              height="52"
              viewBox="0 0 140 52"
              fill="none"
              aria-hidden
              className="block"
            >
              <path
                className="k-flight-path"
                pathLength={1}
                d="M2 50 C 48 48, 84 34, 110 16"
                stroke="var(--sage-400)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <g transform="translate(112, 1) scale(0.62)">
                <g
                  className="k-flight-plane"
                  stroke="var(--sage-700)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 2 11 13" />
                  <path d="M22 2 15 22 11 13 2 9z" />
                </g>
              </g>
            </svg>
            <Eyebrow tone="accent" className="mt-4">
              {dict.positionnement.capEyebrow}
            </Eyebrow>
            <p className="k-heading mt-2.5 max-w-[36ch]" style={{ color: "var(--text-strong)" }}>
              <Rich segments={dict.positionnement.capText} />
            </p>
          </div>
        </section>

        {/* ---------------- PROJETS ---------------- */}
        {/* deux cas d'étude sur la même structure éditoriale : texte à gauche,
            visuel à droite, puis la pièce à conviction en dessous — bande
            sage-900 pour la nomination d'Obrado, faits + grammaire visuelle
            pleine largeur pour Éos. */}
        <section id="projets" className="k-section">
          <SectionRule label={dict.projets.eyebrow} />

          {/* — Obrado : la preuve (nomination SWA) vit dans sa propre bande
              sombre, qui fait ressortir le logo blanc du Startup Weekend. */}
          <article className="k-reveal mt-12" data-reveal>
            <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
              <div>
                <Eyebrow>{dict.projets.obrado.eyebrow}</Eyebrow>
                <h3 className="k-display-2 mt-6 max-w-[16ch]" style={{ textWrap: "balance" }}>
                  <Rich segments={dict.projets.obrado.heading} />
                </h3>
                <p className="k-body-lg mt-6 max-w-[48ch]" style={{ color: "var(--text-body)" }}>
                  {dict.projets.obrado.paragraph}
                </p>
                <p className="k-body-sm mt-5" style={{ color: "var(--text-muted)" }}>
                  {dict.projets.obrado.meta}
                </p>
                <TechList className="mt-6" items={dict.projets.obrado.tech} />
                <ArrowLink href="https://obrado.app" className="mt-7">
                  {dict.projets.obrado.link}
                </ArrowLink>
              </div>
              <Figure src="/images/obrado.webp" alt={dict.projets.obrado.figureAlt} ratio="4 / 3" />
            </div>

            {/* bande nomination — le logo blanc du Techstars Startup Weekend
                pose sur le sage-900, à sa taille naturelle : la mise en avant
                vient du cadre, pas de l'agrandissement */}
            <div
              className="k-reveal mt-6 grid overflow-hidden md:grid-cols-[1.05fr_0.95fr]"
              data-reveal
              style={{ background: "var(--sage-900)", borderRadius: "var(--radius-surface)" }}
            >
              <div className="flex flex-col items-start justify-center p-8 md:p-12">
                <Image
                  src="/images/SWA.svg"
                  alt={dict.projets.obrado.nomination.logoAlt}
                  width={103}
                  height={52}
                  className="h-auto w-24 md:w-32"
                />
                <p
                  className="k-title-1 mt-8 mb-0 max-w-[20ch]"
                  style={{ color: "var(--paper)", textWrap: "balance" }}
                >
                  {dict.projets.obrado.nomination.heading}
                </p>
                <p className="k-body mt-4 mb-0 max-w-[42ch]" style={{ color: "var(--sage-200)" }}>
                  {dict.projets.obrado.nomination.paragraph}
                </p>
              </div>
              <div className="relative min-h-[280px] md:min-h-[400px]">
                <Image
                  src="/images/startup-weekend.webp"
                  alt={dict.projets.obrado.nomination.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                  style={{ objectPosition: "center 32%" }}
                />
              </div>
            </div>
          </article>

          <div className="my-16 h-px md:my-20" style={{ background: "var(--border-default)" }} />

          {/* — Éos : même structure, adaptée au contenu — l'explication grand
              public à gauche, la démo à droite, puis trois faits entre deux
              hairlines et la grammaire visuelle entière, sans recadrage. */}
          <article className="k-reveal" data-reveal>
            <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
              <div>
                <Eyebrow>{dict.projets.eos.eyebrow}</Eyebrow>
                <h3 className="k-display-2 mt-6 max-w-[18ch]" style={{ textWrap: "balance" }}>
                  <Rich segments={dict.projets.eos.heading} />
                </h3>
                <p className="k-body-lg mt-6 max-w-[48ch]" style={{ color: "var(--text-body)" }}>
                  {dict.projets.eos.paragraph}
                </p>
                <p className="k-body-sm mt-5" style={{ color: "var(--text-muted)" }}>
                  {dict.projets.eos.role}
                </p>
                <TechList className="mt-6" items={dict.projets.eos.tech} />
                <ArrowLink href="https://obrado.app/project/9943662420-eos-l-il-aveugle-percoit-encore" className="mt-7">
                  {dict.projets.eos.link}
                </ArrowLink>
              </div>
              <Figure src="/images/eos-2.webp" alt={dict.projets.eos.figureAlt} ratio="4 / 3" />
            </div>

            {/* trois faits entre deux hairlines — pas de cartes, juste l'info */}
            <div
              className="mt-12 grid gap-8 py-8 md:mt-14 md:grid-cols-3 md:gap-10"
              style={{
                borderTop: "1px solid var(--border-default)",
                borderBottom: "1px solid var(--border-default)",
              }}
            >
              {dict.projets.eos.facts.map((f, i) => (
                <div
                  key={f.fact}
                  className="k-gallery-figure"
                  data-reveal
                  style={{ ["--reveal-i" as string]: i }}
                >
                  <p className="k-title-3 m-0">{f.fact}</p>
                  <p className="k-caption mt-1.5 mb-0" style={{ color: "var(--text-muted)" }}>
                    {f.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* la planche de grammaire visuelle est un document : ratio natif
                16/9, jamais recadrée */}
            <Figure
              src="/images/eos-3.webp"
              alt={dict.projets.eos.grammarAlt}
              ratio="16 / 9"
              sizes="(max-width: 768px) 100vw, 1050px"
              className="mt-10"
              reveal
            />
          </article>
        </section>

        {/* ---------------- MAKER ---------------- */}
        {/* bande sage-900 pleine largeur : la section atelier porte la couleur */}
        <section id="maker" className="k-section">
          <div
            className="relative left-1/2 w-screen -translate-x-1/2"
            style={{ background: "var(--sage-900)" }}
          >
            <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-16 md:py-24">
              <SectionRule
                label={dict.maker.sectionLabel}
                labelColor="var(--sage-200)"
                lineColor="rgba(247,245,238,0.24)"
              />
              <div
                className="k-reveal mt-10 grid items-end gap-8 md:grid-cols-2 md:gap-16"
                data-reveal
              >
                <h2 className="k-display-3 m-0 max-w-[18ch]" style={{ color: "var(--paper)" }}>
                  {dict.maker.heading}
                </h2>
                <p className="k-body-lg m-0 max-w-[44ch]" style={{ color: "var(--sage-200)" }}>
                  {dict.maker.paragraph}
                </p>
              </div>

              {/* le procédé en trois cartes papier sur la bande sage — trois
                  feuilles épinglées sur l'établi, une même pièce du croquis à
                  l'objet monté ; révélation en cascade via --reveal-i */}
              <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
                {dict.maker.steps.map((step, i) => (
                  <article
                    key={step.title}
                    className="k-gallery-figure flex flex-col p-6 md:p-7"
                    data-reveal
                    style={{
                      background: "var(--paper)",
                      borderRadius: "var(--radius-surface)",
                      ["--reveal-i" as string]: i,
                    }}
                  >
                    <span className="k-label" style={{ color: "var(--sage-700)" }}>
                      {dict.maker.stepLabel} 0{i + 1}
                    </span>
                    <h3 className="k-title-1 mt-2 mb-0">{step.title}</h3>
                    <p
                      className="k-body mt-2.5 mb-0 max-w-[34ch]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {step.text}
                    </p>
                    <Figure
                      src={MAKER_STEPS_META[i].src}
                      alt={step.alt}
                      ratio="4 / 3"
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="mt-auto pt-6"
                    />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- PARCOURS ---------------- */}
        {/* le tournant à gauche (sticky), timeline à points à droite */}
        <section id="parcours" className="k-section">
          <SectionRule label={dict.parcours.eyebrow} />

          <div
            className="k-reveal mt-12 grid items-start gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20"
            data-reveal
          >
            <div className="md:sticky md:top-[104px]">
              <Eyebrow tone="accent">{dict.parcours.tournantEyebrow}</Eyebrow>
              <h2 className="k-display-3 mt-4 max-w-[14ch]">{dict.parcours.heading}</h2>
              <p className="k-body-lg mt-6 max-w-[48ch]" style={{ color: "var(--text-body)" }}>
                {dict.parcours.paragraph}
              </p>
              <ArrowLink href="https://obrado.app/cto" className="mt-7">
                {dict.parcours.link}
              </ArrowLink>
            </div>

            <div>
              {dict.parcours.timeline.map((entry, i) => (
                <TimelineRow
                  key={entry.title}
                  period={entry.period}
                  title={entry.title}
                  last={i === dict.parcours.timeline.length - 1}
                >
                  <p className="k-body mt-2.5 max-w-[58ch]" style={{ color: "var(--text-body)" }}>
                    {entry.description}
                  </p>
                  {entry.images ? (
                    <div
                      className={
                        entry.images.length === 2
                          ? "mt-5 grid grid-cols-2 gap-3"
                          : "mt-5 grid gap-3 sm:grid-cols-3"
                      }
                    >
                      {entry.images.map((alt, j) => (
                        <Figure
                          key={alt}
                          src={TIMELINE_IMAGES[i]![j]}
                          alt={alt}
                          ratio={entry.images!.length === 2 ? "4 / 3" : "16 / 10"}
                          sizes={entry.images!.length === 2 ? "300px" : "200px"}
                        />
                      ))}
                    </div>
                  ) : null}
                </TimelineRow>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- COMPÉTENCES ---------------- */}
        {/* quatre cartes 2x2 sur les surfaces du thème */}
        <section id="competences" className="k-section">
          <SectionRule label={dict.competences.sectionLabel} />
          <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
            {dict.competences.cards.map((card, i) => (
              <SkillCard
                key={card.title}
                icon={SKILL_ICONS[i].icon}
                title={card.title}
                items={card.items}
                background={SKILL_ICONS[i].background}
                revealIndex={i}
              />
            ))}
          </div>
        </section>

        {/* ---------------- AVIATION ---------------- */}
        {/* texte à gauche, duo de portraits en quinconce à droite */}
        <section id="aviation" className="k-section">
          <SectionRule label={dict.aviation.sectionLabel} />
          <div
            className="k-reveal mt-10 grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16"
            data-reveal
          >
            <div>
              <h2 className="k-display-3 m-0 max-w-[18ch]">{dict.aviation.heading}</h2>
              <p className="k-body-lg mt-6 max-w-[48ch]" style={{ color: "var(--text-body)" }}>
                {dict.aviation.paragraph1}
              </p>
              <p className="k-body-lg mt-4 max-w-[48ch]" style={{ color: "var(--text-body)" }}>
                {dict.aviation.paragraph2}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
              <Figure
                src="/images/parapente.webp"
                alt={dict.aviation.parapenteAlt}
                ratio="3 / 4"
                sizes="(max-width: 640px) 100vw, 320px"
              />
              <Figure
                src="/images/batem.webp"
                alt={dict.aviation.batemAlt}
                ratio="3 / 4"
                sizes="(max-width: 640px) 100vw, 320px"
                className="sm:mt-16"
              />
            </div>
          </div>
        </section>

        {/* ---------------- PHOTOGRAPHIE ---------------- */}
        <section id="photographie" className="k-section">
          <SectionRule label={dict.photographie.sectionLabel} />
          <div
            className="k-reveal mt-12 grid items-end gap-6 md:mt-16 md:grid-cols-[1.1fr_0.9fr] md:gap-16"
            data-reveal
          >
            <h2 className="k-display-3 m-0 max-w-[16ch]" style={{ textWrap: "pretty" }}>
              {dict.photographie.heading}
            </h2>
            <p className="k-body-lg m-0 max-w-[40ch]" style={{ color: "var(--text-body)" }}>
              {dict.photographie.paragraph}
            </p>
          </div>
          {/* full-bleed : la section chaleur déborde du container */}
          <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 px-3 md:mt-16 md:px-6">
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-12 md:gap-4">
              {GALLERY_META.map((p, i) => (
                <Figure
                  key={p.src}
                  src={p.src}
                  alt={dict.photographie.gallery[i]}
                  heightClass={p.height}
                  className={p.span}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  reveal
                  revealIndex={i}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- CONTACT — CTA ---------------- */}
      <section id="contact" className="k-section">
        <div className="mx-auto max-w-[1180px] px-6 md:px-16">
          <SectionRule label={dict.contact.sectionLabel} />
          <div className="k-reveal mt-10 md:mt-14" data-reveal>
            <h2
              className="m-0"
              style={{
                font: "400 clamp(40px, 5.8vw, 68px)/1.08 var(--font-display)",
                letterSpacing: "-0.02em",
                color: "var(--text-strong)",
                textWrap: "balance",
              }}
            >
              {dict.contact.headingLine1}
              <span className="block" style={{ color: "var(--ink-4)" }}>
                {dict.contact.headingLine2}
              </span>
            </h2>
            <p className="k-body-lg mt-7 max-w-[52ch]" style={{ color: "var(--text-muted)" }}>
              {dict.contact.paragraph}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-7">
              <a className="k-btn k-btn--lg" href="mailto:killian.boularand@icloud.com">
                {dict.contact.ctaContact}
              </a>
              <ArrowLink href="https://obrado.app/cto">{dict.contact.ctaCv}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer
        className="mt-[clamp(88px,11vw,150px)] overflow-hidden"
        style={{ background: "var(--sage-900)", color: "var(--text-on-inverse)" }}
      >
        <div className="mx-auto max-w-[1180px] px-6 pt-14 md:px-16 md:pt-16">
          <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-8">
            <div className="flex flex-col items-start gap-3">
              <a
                href="mailto:killian.boularand@icloud.com"
                className="k-text-link"
                style={{
                  font: "600 clamp(17px, 2vw, 20px)/1.3 var(--font-body)",
                  color: "var(--text-on-inverse)",
                  borderColor: "rgba(247,245,238,0.32)",
                }}
              >
                killian.boularand@icloud.com
              </a>
              <span className="k-caption" style={{ color: "rgba(247,245,238,0.56)" }}>
                {dict.footer.copyright}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  aria-label={s.label}
                  className="k-social"
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* signature — le wordmark s'étire sur toute la largeur et se fait
              couper net par le bord bas de la page ; le SVG suit la largeur
              du conteneur, la coupe vient de la viewBox */}
          <div className="k-footer-mark mt-12 md:mt-16" data-reveal aria-hidden>
            <svg viewBox="0 0 100 13.4" className="block w-full" focusable="false">
              <text
                x="0"
                y="19"
                textLength="100"
                style={{ font: "400 26px var(--font-display)", fill: "var(--paper)" }}
              >
                KORVO
              </text>
            </svg>
          </div>
        </div>
      </footer>
    </div>
  );
}
