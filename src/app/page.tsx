import Image from "next/image";
import SiteHeader from "@/components/korvo/SiteHeader";
import ScrollReveal from "@/components/korvo/ScrollReveal";
import {
  ArrowLink,
  Eyebrow,
  Figure,
  SectionRule,
  SkillCard,
  TechList,
  TimelineRow,
  WordImage,
} from "@/components/korvo/ui";

/* ------------------------------------------------------------------ *
 * Korvo — site de Killian Boularand, une seule page.
 * Direction : papier chaud + encre, sage en accent unique, règles 1px.
 * Pills encre, radius généreux, photos dominantes — la chaleur vient
 * des images, la précision des hairlines. Aucune décoration gratuite.
 * ------------------------------------------------------------------ */

/* icônes des cartes compétences — trait 1.5px, encre, dans le cercle */
const ICON_PROPS = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const SKILL_CARDS = [
  {
    title: "Code",
    background: "var(--sage-200)",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="m8 7-5 5 5 5" />
        <path d="m16 7 5 5-5 5" />
      </svg>
    ),
    items: [
      { label: "Web · Next.js, Vue, Supabase" },
      { label: "Mobile & spatial · Swift, ARKit, CoreML" },
      { label: "Motion · GSAP, Three.js" },
      { label: "IA embarquée · LLM on-device" },
      { label: "Python, C / C++" },
    ],
  },
  {
    title: "Hardware / 3D",
    background: "var(--korvo-sand)",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M21 16V8a1.8 1.8 0 0 0-.9-1.56l-7.2-4.1a1.8 1.8 0 0 0-1.8 0l-7.2 4.1A1.8 1.8 0 0 0 3 8v8a1.8 1.8 0 0 0 .9 1.56l7.2 4.1a1.8 1.8 0 0 0 1.8 0l7.2-4.1A1.8 1.8 0 0 0 21 16Z" />
        <path d="m3.3 7.1 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
    items: [
      { label: "Impression 3D · Bambu Lab A1 + AMS" },
      { label: "CAO · Fusion 360, Blender" },
      { label: "IoT · Arduino, ESP32, Raspberry Pi" },
    ],
  },
  {
    title: "Créatif",
    background: "var(--paper-inset)",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M14.5 5h-5L7.7 7.2H4.5A1.5 1.5 0 0 0 3 8.7v8.8A1.5 1.5 0 0 0 4.5 19h15a1.5 1.5 0 0 0 1.5-1.5V8.7a1.5 1.5 0 0 0-1.5-1.5h-3.2L14.5 5Z" />
        <circle cx="12" cy="12.8" r="3.4" />
      </svg>
    ),
    items: [
      { label: "Photo · Lightroom" },
      { label: "UI & identités · Figma" },
    ],
  },
  {
    title: "Langues",
    background: "var(--korvo-cloud)",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14.2 14.2 0 0 1 0 18 14.2 14.2 0 0 1 0-18Z" />
      </svg>
    ),
    items: [
      { label: "Français", level: "Natif" },
      { label: "Anglais", level: "C1" },
      { label: "Espagnol", level: "B1" },
    ],
  },
];

/* réseaux du footer — trait 1.5px pour les pictos géométriques, aplat pour
   les marques (LinkedIn, GitHub) dont le glyphe ne se dessine pas au trait */
const SOCIALS = [
  {
    href: "https://linkedin.com/in/killian-boularand",
    label: "LinkedIn",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/Kicksbld",
    label: "GitHub",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 1.75A10.25 10.25 0 0 0 8.76 21.73c.51.1.7-.22.7-.49v-1.9c-2.85.62-3.45-1.2-3.45-1.2-.47-1.18-1.14-1.5-1.14-1.5-.93-.63.07-.62.07-.62 1.03.07 1.57 1.05 1.57 1.05.91 1.57 2.4 1.12 2.98.85.09-.66.36-1.11.65-1.37-2.28-.26-4.67-1.14-4.67-5.06 0-1.12.4-2.03 1.05-2.75-.1-.26-.46-1.3.1-2.7 0 0 .86-.28 2.82 1.05a9.83 9.83 0 0 1 5.13 0c1.96-1.33 2.82-1.05 2.82-1.05.56 1.4.2 2.44.1 2.7.65.72 1.05 1.63 1.05 2.75 0 3.93-2.4 4.8-4.68 5.05.37.32.7.94.7 1.9v2.81c0 .27.18.6.7.49A10.25 10.25 0 0 0 12 1.75Z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/killian_bd_/",
    label: "Instagram",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" />
        <circle cx="12" cy="12" r="4.2" />
        <path d="M17.4 6.6h.01" />
      </svg>
    ),
  },
  {
    href: "tel:+33603850349",
    label: "Téléphone · +33 6 03 85 03 49",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
];

const GALLERY = [
  {
    src: "/images/giza.jpg",
    alt: "Plateau de Gizeh, Sphinx et pyramide de Khéphren",
    span: "md:col-span-7",
    height: "h-[300px] md:h-[500px]",
  },
  {
    src: "/images/pyramid.png",
    alt: "Ruelle de Nazlet el-Semman ouvrant sur la pyramide",
    span: "md:col-span-5",
    height: "h-[300px] md:h-[500px]",
  },
  {
    src: "/images/toutankamon.png",
    alt: "Sarcophage de Toutânkhamon",
    span: "md:col-span-5",
    height: "h-[300px] md:h-[420px]",
  },
  {
    src: "/images/egypte-atterissage.png",
    alt: "Approche de nuit au-dessus du Caire",
    span: "md:col-span-3",
    height: "h-[300px] md:h-[420px]",
  },
  {
    src: "/images/colise.jpg",
    alt: "Le Colisée, Rome",
    span: "md:col-span-4",
    height: "h-[300px] md:h-[420px]",
  },
  {
    src: "/images/arc-rome.jpg",
    alt: "Arc de Constantin, Rome",
    span: "md:col-span-4",
    height: "h-[300px] md:h-[460px]",
  },
  {
    src: "/images/cannes.jpeg",
    alt: "Cannes, France",
    span: "md:col-span-4",
    height: "h-[300px] md:h-[460px]",
  },
  {
    src: "/images/alyssia.jpg",
    alt: "Portrait en lumière naturelle",
    span: "md:col-span-4",
    height: "h-[300px] md:h-[460px]",
  },
];

/* le procédé raconté par une vraie pièce : le loquet de portail,
   du croquis à l'objet monté */
const MAKER_STEPS = [
  {
    title: "Imaginer",
    text: "Partir d'un besoin réel — une pièce cassée, un accessoire introuvable — et poser l'idée sur le papier.",
    src: "/images/sketch.png",
    alt: "Croquis du loquet de portail à fabriquer",
  },
  {
    title: "Modéliser",
    text: "Passer du croquis au modèle 3D, au millimètre près, prêt à imprimer.",
    src: "/images/bambu.png",
    alt: "La pièce modélisée en 3D, prête à imprimer",
  },
  {
    title: "Imprimer",
    text: "Imprimer, tester, ajuster — jusqu'à ce que la pièce tienne parfaitement en place.",
    src: "/images/pied-a-coulisse-2.jpg",
    alt: "La pièce imprimée, montée et fonctionnelle sur le portail",
  },
];

export default function Home() {
  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100vh" }}>
      <ScrollReveal />
      <SiteHeader />

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
                src="/images/portrait.png"
                alt="Portrait de Killian Boularand"
                width={760}
                height={1182}
                preload
                sizes="112px"
                className="h-full w-full scale-110 object-cover object-top"
              />
            </div>
            <span className="k-hero-tag" aria-hidden>
              Killian Boularand 👋
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
            Disponible pour une alternance · ingénierie logicielle embarquée
          </p>

          <h1
            className="k-hero-in k-display-1 mt-6 max-w-[16ch]"
            style={{ textWrap: "balance", ["--reveal-i" as string]: 2 }}
          >
            Je transforme des idées en{" "}
            <span style={{ color: "var(--sage-700)" }}>objets réels</span>.
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
            Maker passionné par la tech, 20 ans en Haute-Savoie. Du code à la
            pièce imprimée.
          </p>

          <div
            className="k-hero-in mt-10 flex flex-wrap items-center justify-center gap-6"
            style={{ ["--reveal-i" as string]: 4 }}
          >
            <a className="k-btn k-btn--lg" href="#projets">
              Voir mes projets
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
              Mon portfolio ↗
            </a>
          </div>
        </section>

        {/* ---------------- POSITIONNEMENT ---------------- */}
        {/* le manifeste : deux phrases en display-2, la seconde décalée à
            droite — un seul message, la polyvalence */}
        <section id="positionnement" className="k-section">
          <SectionRule label="Positionnement" />

          <div className="k-reveal mt-12 md:mt-16" data-reveal>
            <h2 className="k-display-2 m-0 max-w-[22ch]" style={{ textWrap: "pretty" }}>
              Être <span style={{ color: "var(--sage-700)" }}>polyvalent</span>, pour
              répondre à n&apos;importe quel{" "}
              <span style={{ color: "var(--sage-700)" }}>besoin</span>.
            </h2>
          </div>

          <div className="k-reveal mt-12 md:mt-16 md:ml-[30%]" data-reveal>
            <p className="k-display-2 m-0 max-w-[26ch]" style={{ textWrap: "pretty" }}>
              Des interfaces{" "}
              <span style={{ color: "var(--sage-700)" }}>digitales</span>
              <WordImage src="/images/obrado.webp" position="top" eager revealIndex={0} /> au{" "}
              <span style={{ color: "var(--sage-700)" }}>monde physique</span>&nbsp;:
              objets connectés
              <WordImage src="/images/iot.jpeg" position="center 65%" revealIndex={1} />, impression 3D
              <WordImage src="/images/atelier.jpg" revealIndex={2} />.
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
              Le cap
            </Eyebrow>
            <p className="k-heading mt-2.5 max-w-[36ch]" style={{ color: "var(--text-strong)" }}>
              Un diplôme d&apos;ingénieur en{" "}
              <span style={{ color: "var(--sage-700)" }}>logiciel embarqué</span>, pour
              concevoir les systèmes qui font voler les avions.
            </p>
          </div>
        </section>

        {/* ---------------- PROJETS ---------------- */}
        <section id="projets" className="k-section">
          <SectionRule label="Projets phares" />

          <article
            className="k-reveal mt-12 grid items-start gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-14"
            data-reveal
          >
            <div>
              <Eyebrow>CTO &amp; cofondateur · depuis juin 2025</Eyebrow>
              <h3 className="k-title-1 mt-3.5">Obrado</h3>
              <p className="k-heading mt-1.5">SaaS dédié à l&apos;alternance</p>
              <p className="k-body mt-5 max-w-[44ch]" style={{ color: "var(--text-body)" }}>
                Un CV ne montre jamais ce qu&apos;on sait vraiment faire. Obrado le
                remplace par un profil-portfolio public, vérifié par l&apos;école
                partenaire.
              </p>
              <p className="k-body-sm mt-5" style={{ color: "var(--text-muted)" }}>
                MVP en ligne · ~30 utilisateurs · nominé Startup Weekend Annecy 2025
              </p>
              <TechList
                className="mt-6"
                items={["Next.js 15", "React 19", "NestJS (DDD)", "PostgreSQL / Prisma", "AWS S3"]}
              />
              <ArrowLink href="https://obrado.app" className="mt-7">
                Voir Obrado →
              </ArrowLink>
            </div>

            <div className="flex flex-col gap-4">
              <Figure src="/images/obrado.webp" alt="Obrado, visuel produit" ratio="4 / 3" />
              <Figure
                src="/images/startup-weekend.jpg"
                alt="Nomination Startup Weekend Annecy 2025"
                ratio="16 / 9"
              />
            </div>
          </article>

          <div className="my-16 h-px" style={{ background: "var(--border-default)" }} />

          <article
            className="k-reveal grid items-start gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-14"
            data-reveal
          >
            <div>
              <Eyebrow>Développement technique intégral · équipe de 5 · DNMADE</Eyebrow>
              <h3 className="k-title-1 mt-3.5">Éos</h3>
              <p className="k-heading mt-1.5">Assistance visuelle temps réel pour la DMLA</p>
              <p className="k-body mt-5 max-w-[44ch]" style={{ color: "var(--text-body)" }}>
                Un casque équipé d&apos;un iPhone 17 Pro traduit la scène en une carte
                sémantique ultra-contrastée, lisible par la vision périphérique, la seule
                partie de la rétine encore fonctionnelle en cas de DMLA. Traduire ce qui
                reste visible, pas restaurer ce qui est perdu.
              </p>
              <p className="k-body-sm mt-5" style={{ color: "var(--text-muted)" }}>
                Traitement 100 % on-device, privacy by design.
              </p>
              <TechList
                className="mt-6"
                items={["Swift / iOS", "ARKit", "LiDAR", "CoreML", "Metal"]}
              />
              <ArrowLink href="https://obrado.app/cto" className="mt-7">
                Détail du projet sur Obrado →
              </ArrowLink>
            </div>

            <div className="flex flex-col gap-4">
              <Figure src="/images/eos-2.webp" alt="Démonstration d'Éos en salle" ratio="16 / 10" />
              <Figure src="/images/eos-3.webp" alt="Grammaire visuelle d'Éos" ratio="16 / 9" />
            </div>
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
                label="Maker · Impression 3D & hardware"
                labelColor="var(--sage-200)"
                lineColor="rgba(247,245,238,0.24)"
              />
              <div
                className="k-reveal mt-10 grid items-end gap-8 md:grid-cols-2 md:gap-16"
                data-reveal
              >
                <h2 className="k-display-3 m-0 max-w-[18ch]" style={{ color: "var(--paper)" }}>
                  Une pièce cassée, un besoin précis : je la fabrique.
                </h2>
                <p className="k-body-lg m-0 max-w-[44ch]" style={{ color: "var(--sage-200)" }}>
                  Un objet abîmé, un accessoire introuvable, une idée qui n&apos;existe
                  encore nulle part : je fabrique la pièce exacte qui répond au besoin,
                  du croquis à l&apos;objet fini.
                </p>
              </div>

              {/* le procédé en trois cartes papier sur la bande sage — trois
                  feuilles épinglées sur l'établi, une même pièce du croquis à
                  l'objet monté ; révélation en cascade via --reveal-i */}
              <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
                {MAKER_STEPS.map((step, i) => (
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
                      Étape 0{i + 1}
                    </span>
                    <h3 className="k-title-1 mt-2 mb-0">{step.title}</h3>
                    <p
                      className="k-body mt-2.5 mb-0 max-w-[34ch]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {step.text}
                    </p>
                    <Figure
                      src={step.src}
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
          <SectionRule label="Parcours" />

          <div
            className="k-reveal mt-12 grid items-start gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20"
            data-reveal
          >
            <div className="md:sticky md:top-[104px]">
              <Eyebrow tone="accent">Le tournant</Eyebrow>
              <h2 className="k-display-3 mt-4 max-w-[14ch]">Pourquoi je change de cap</h2>
              <p className="k-body-lg mt-6 max-w-[48ch]" style={{ color: "var(--text-body)" }}>
                Le dev m&apos;a ouvert l&apos;entrepreneuriat et le concret de
                l&apos;entreprise. Je veux maintenant un socle plus solide : un diplôme
                d&apos;ingénieur, dans le domaine qui me passionne depuis toujours:
                l&apos;aéronautique.
              </p>
              <ArrowLink href="https://obrado.app/cto" className="mt-7">
                Mon parcours complet &amp; mon CV sur Obrado →
              </ArrowLink>
            </div>

            <div>
              <TimelineRow
                period="Nov. 2025 → juin 2026"
                title="ControlResell · Alternance frontend"
              >
                <p className="k-body mt-2.5 max-w-[58ch]" style={{ color: "var(--text-body)" }}>
                  Responsable de l&apos;évolution du frontend React Web &amp; React Native :
                  cohérence produit, expérience utilisateur, architecture du code.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Figure
                    src="/images/cr-1.webp"
                    alt="ControlResell, interface web"
                    ratio="4 / 3"
                    sizes="300px"
                  />
                  <Figure
                    src="/images/cr-2.webp"
                    alt="ControlResell, application mobile"
                    ratio="4 / 3"
                    sizes="300px"
                  />
                </div>
              </TimelineRow>

              <TimelineRow period="Depuis juin 2025" title="Obrado · CTO & cofondateur">
                <p className="k-body mt-2.5 max-w-[58ch]" style={{ color: "var(--text-body)" }}>
                  SaaS dédié à l&apos;alternance. MVP en ligne, ~30 utilisateurs. Nominé
                  Startup Weekend Annecy 2025.
                </p>
              </TimelineRow>

              <TimelineRow
                period="Avr. 2025 → juil. 2026"
                title="Freelance · Dev créatif / fullstack"
              >
                <p className="k-body mt-2.5 max-w-[58ch]" style={{ color: "var(--text-body)" }}>
                  Landing pages, back-office et animations web pour des startups, comme Les
                  Ignobles, et des artisans.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <Figure
                    src="/images/adn-studio.png"
                    alt="ADN Studio by Nelly"
                    ratio="16 / 10"
                    sizes="200px"
                  />
                  <Figure src="/images/debatium.png" alt="Debatium" ratio="16 / 10" sizes="200px" />
                  <Figure
                    src="/images/les-ignobles.webp"
                    alt="Les Ignobles"
                    ratio="16 / 10"
                    sizes="200px"
                  />
                </div>
              </TimelineRow>

              <TimelineRow
                period="Sept. 2024 → juil. 2027"
                title="DNMADE Numérique · L'École by CCI"
              >
                <p className="k-body mt-2.5 max-w-[58ch]" style={{ color: "var(--text-body)" }}>
                  Bac+3 en dev et design web &amp; mobile, en cours. Une formation signée
                  Gobelins Paris, sur son campus d&apos;Annecy : le code et le design
                  enseignés ensemble.
                </p>
              </TimelineRow>

              <TimelineRow period="2021 → 2024" title="Baccalauréat STI2D · Spé SIN" last>
                <p className="k-body mt-2.5 max-w-[58ch]" style={{ color: "var(--text-body)" }}>
                  Mention très bien. Le socle de ma culture d&apos;ingénierie et de
                  développement durable : concevoir des solutions éthiques pour la planète,
                  en alliant théorie et pratique sur mes premiers projets réels.
                </p>
              </TimelineRow>
            </div>
          </div>
        </section>

        {/* ---------------- COMPÉTENCES ---------------- */}
        {/* quatre cartes 2x2 sur les surfaces du thème */}
        <section id="competences" className="k-section">
          <SectionRule label="Compétences" />
          <div className="k-reveal mt-10 grid gap-4 md:grid-cols-2 md:gap-5" data-reveal>
            {SKILL_CARDS.map((card) => (
              <SkillCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                items={card.items}
                background={card.background}
              />
            ))}
          </div>
        </section>

        {/* ---------------- AVIATION ---------------- */}
        {/* texte à gauche, duo de portraits en quinconce à droite */}
        <section id="aviation" className="k-section">
          <SectionRule label="Aviation & moi" />
          <div
            className="k-reveal mt-10 grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16"
            data-reveal
          >
            <div>
              <h2 className="k-display-3 m-0 max-w-[18ch]">
                Le fil rouge de toute ma réorientation
              </h2>
              <p className="k-body-lg mt-6 max-w-[48ch]" style={{ color: "var(--text-body)" }}>
                Le baptême de l&apos;air, puis un vol en parapente au-dessus du lac
                d&apos;Annecy : à chaque fois, la même évidence. C&apos;est en l&apos;air
                que je me sens à ma place.
              </p>
              <p className="k-body-lg mt-4 max-w-[48ch]" style={{ color: "var(--text-body)" }}>
                Le reste du temps, je simule des vols sur Flight Simulator et je me plonge
                dans la géographie. Ce qui me porte, c&apos;est une idée simple :
                l&apos;aviation relie les peuples.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
              <Figure
                src="/images/parapente.jpeg"
                alt="Vol en parapente biplace au-dessus du lac d'Annecy"
                ratio="3 / 4"
                sizes="(max-width: 640px) 100vw, 320px"
              />
              <Figure
                src="/images/batem.jpg"
                alt="Baptême de l'air sur Pipistrel Velis Electro, piste d'Annecy"
                ratio="3 / 4"
                sizes="(max-width: 640px) 100vw, 320px"
                className="sm:mt-16"
              />
            </div>
          </div>
        </section>

        {/* ---------------- PHOTOGRAPHIE ---------------- */}
        <section id="photographie" className="k-section">
          <SectionRule label="Photographie & voyages" />
          <div
            className="k-reveal mt-12 grid items-end gap-6 md:mt-16 md:grid-cols-[1.1fr_0.9fr] md:gap-16"
            data-reveal
          >
            <h2 className="k-display-3 m-0 max-w-[16ch]" style={{ textWrap: "pretty" }}>
              Capturer l&apos;instant, en faire un souvenir
            </h2>
            <p className="k-body-lg m-0 max-w-[40ch]" style={{ color: "var(--text-body)" }}>
              En voyage, j&apos;ai toujours l&apos;œil qui traîne. J&apos;aime saisir
              ces instants et en garder de jolis souvenirs, de Gizeh à Rome,
              jusqu&apos;à la Côte d&apos;Azur.
            </p>
          </div>
          {/* full-bleed : la section chaleur déborde du container */}
          <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 px-3 md:mt-16 md:px-6">
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-12 md:gap-4">
              {GALLERY.map((p, i) => (
                <Figure
                  key={p.src}
                  src={p.src}
                  alt={p.alt}
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
          <SectionRule label="Contact" />
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
              Mon profil vous intéresse ?
              <span className="block" style={{ color: "var(--ink-4)" }}>
                Écrivons la suite.
              </span>
            </h2>
            <p className="k-body-lg mt-7 max-w-[52ch]" style={{ color: "var(--text-muted)" }}>
              Alternance en ingénierie logicielle embarquée, disponible dès maintenant.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-7">
              <a className="k-btn k-btn--lg" href="mailto:killian.boularand@icloud.com">
                Me contacter →
              </a>
              <ArrowLink href="https://obrado.app/cto">Mon CV complet →</ArrowLink>
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
                © Killian Boularand · 2026 — Annecy, Haute-Savoie
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
