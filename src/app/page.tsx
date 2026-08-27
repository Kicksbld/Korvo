import Image from "next/image";
import SiteHeader from "@/components/korvo/SiteHeader";
import {
  ArrowLink,
  Eyebrow,
  Figure,
  SectionRule,
  SkillRow,
  Tag,
  TimelineRow,
} from "@/components/korvo/ui";

/* ------------------------------------------------------------------ *
 * Korvo — site de Killian Boularand, une seule page.
 * Direction : sobre, technique, lisible. Papier + encre, sage en accent
 * unique, règles 1px, aucune décoration. Les photos portent l'émotion.
 * ------------------------------------------------------------------ */

const CODE_SKILLS = [
  { label: "Web — Next.js, Vue / Nuxt, Supabase, Prisma", level: "Maîtrisé" },
  { label: "Motion — GSAP, Three.js", level: "Confortable" },
  { label: "Mobile / spatial — Swift, ARKit, LiDAR, CoreML, Metal", level: "Confortable" },
  { label: "IA embarquée / on-device, LLM", level: "Confortable" },
  { label: "Python", level: "Maîtrisé" },
  { label: "C / C++", level: "Notions" },
];

const HARDWARE_SKILLS = [
  "Impression 3D — Bambu Lab A1 + AMS",
  "CAO — Fusion 360, Blender",
  "Électronique / IoT — Arduino, ESP32, Raspberry Pi",
];

const CREATIVE_SKILLS = [
  "Photo — iPhone 16, Lightroom",
  "Design d'interfaces & d'identités — Figma",
];

const LANGUAGES = [
  { label: "Français", level: "Natif" },
  { label: "Anglais", level: "C1" },
  { label: "Espagnol", level: "B1" },
];

const CONTACTS = [
  { href: "mailto:killian.boularand@icloud.com", label: "killian.boularand@icloud.com" },
  { href: "tel:+33603850349", label: "+33 6 03 85 03 49" },
  { href: "https://linkedin.com/in/killian-boularand", label: "LinkedIn — killian-boularand" },
  { href: "https://github.com/Kicksbld", label: "GitHub — Kicksbld" },
  { href: "https://www.instagram.com/killian_bd_/", label: "Instagram — @killian_bd_" },
];

const GALLERY = [
  {
    src: "/images/giza.jpg",
    alt: "Plateau de Gizeh — Sphinx et pyramide de Khéphren",
    caption: "Plateau de Gizeh, Égypte.",
    span: "md:col-span-7",
    height: "h-[300px] md:h-[430px]",
  },
  {
    src: "/images/pyramid.png",
    alt: "Ruelle de Nazlet el-Semman ouvrant sur la pyramide",
    caption: "La pyramide au bout de la ruelle, Gizeh.",
    span: "md:col-span-5",
    height: "h-[300px] md:h-[430px]",
  },
  {
    src: "/images/toutankamon.png",
    alt: "Sarcophage de Toutânkhamon",
    caption: "Sarcophage de Toutânkhamon, Le Caire.",
    span: "md:col-span-5",
    height: "h-[300px] md:h-[360px]",
  },
  {
    src: "/images/egypte-atterissage.jpeg",
    alt: "Approche de nuit au-dessus du Caire",
    caption: "Approche du Caire, aile droite.",
    span: "md:col-span-3",
    height: "h-[300px] md:h-[360px]",
  },
  {
    src: "/images/colise.jpg",
    alt: "Le Colisée, Rome",
    caption: "Colisée, Rome.",
    span: "md:col-span-4",
    height: "h-[300px] md:h-[360px]",
  },
  {
    src: "/images/arc-rome.jpg",
    alt: "Arc de Constantin, Rome",
    caption: "Arc de Constantin, Rome.",
    span: "md:col-span-4",
    height: "h-[300px] md:h-[400px]",
  },
  {
    src: "/images/cannes.jpeg",
    alt: "Cannes, France",
    caption: "Cannes, France.",
    span: "md:col-span-4",
    height: "h-[300px] md:h-[400px]",
  },
  {
    src: "/images/alyssia.jpg",
    alt: "Portrait en lumière naturelle",
    caption: "Portrait, lumière naturelle.",
    span: "md:col-span-4",
    height: "h-[300px] md:h-[400px]",
  },
];

export default function Home() {
  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100vh" }}>
      <SiteHeader />

      <main id="top" className="mx-auto max-w-[1180px] px-6 md:px-16">
        {/* ---------------- HERO ---------------- */}
        <section
          className="grid items-end gap-10 pt-14 md:grid-cols-[1.08fr_0.92fr] md:gap-14 md:pt-[72px]"
          style={{ borderBottom: "1px solid var(--border-strong)" }}
        >
          <div className="pb-10 md:pb-24">
            <span
              className="k-label inline-flex items-center gap-2 px-3 py-1.5"
              style={{
                border: "1px solid var(--border-strong)",
                borderRadius: 3,
                color: "var(--text-body)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              À la recherche d&apos;une alternance
            </span>

            <h1 className="k-display-1 mt-8">
              Killian
              <br />
              Boularand
            </h1>

            <p className="k-label mt-5" style={{ color: "var(--text-muted)" }}>
              Maker &amp; tech enthusiast
            </p>

            <p
              className="mt-7 max-w-[46ch]"
              style={{
                font: "400 19px/1.6 var(--font-body)",
                color: "var(--text-body)",
                textWrap: "pretty",
              }}
            >
              Passionné de création depuis toujours, je vise aujourd&apos;hui le métier
              d&apos;ingénieur — après un parcours entrepreneurial entre code et fabrication.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <a className="k-btn" href="#projets">
                Découvrir ce que je construis →
              </a>
              <a
                href="#parcours"
                style={{
                  font: "600 14px/1 var(--font-body)",
                  color: "var(--text-muted)",
                  borderBottom: "1px solid var(--border-default)",
                  paddingBottom: 3,
                }}
              >
                Mon parcours
              </a>
            </div>
          </div>

          <div className="flex items-end justify-center md:justify-end">
            <Image
              src="/images/portrait.png"
              alt="Portrait de Killian Boularand"
              width={760}
              height={1182}
              priority
              sizes="(max-width: 768px) 70vw, 460px"
              className="h-[360px] w-auto object-contain object-bottom md:h-[560px]"
            />
          </div>
        </section>

        {/* ---------------- POSITIONNEMENT ---------------- */}
        <section id="positionnement" className="pt-16 md:pt-24">
          <SectionRule label="Positionnement" />
          <div className="mt-10 grid items-start gap-10 md:grid-cols-2 md:gap-16">
            <h2 className="k-display-3 m-0 max-w-[16ch]">Le maker qui vise l&apos;aérospatial</h2>
            <div className="flex max-w-[60ch] flex-col gap-5">
              <p className="k-body-lg m-0" style={{ color: "var(--text-body)" }}>
                Je ne suis pas « juste un développeur ». J&apos;aime découvrir plusieurs
                disciplines et maîtriser ce qu&apos;il y a autour pour répondre à n&apos;importe
                quel besoin : je code, je conçois et j&apos;imprime des pièces, je photographie,
                et je suis passionné d&apos;aviation et de spatial.
              </p>
              <p className="k-body-lg m-0" style={{ color: "var(--text-body)" }}>
                Ces compétences convergent vers un même but : l&apos;ingénierie logicielle
                embarquée, idéalement au service de l&apos;aéronautique et du spatial — un
                domaine qui exige exactement ce croisement entre logiciel, hardware, rigueur et
                créativité de résolution de problèmes.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- PROJETS ---------------- */}
        <section id="projets" className="pt-16 md:pt-24">
          <SectionRule label="Projets phares" />

          <article className="mt-12 grid items-start gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
            <div>
              <Eyebrow>CTO &amp; cofondateur · depuis juin 2025</Eyebrow>
              <h3 className="k-title-1 mt-3.5">Obrado</h3>
              <p className="k-heading mt-1.5">SaaS dédié à l&apos;alternance</p>
              <p className="k-body mt-5 max-w-[44ch]" style={{ color: "var(--text-body)" }}>
                Un CV ne montre jamais ce qu&apos;on sait vraiment faire. Obrado remplace le CV
                par un profil-portfolio public, vérifié par l&apos;école.
              </p>
              <p className="k-body-sm mt-5" style={{ color: "var(--text-muted)" }}>
                MVP en ligne · ~30 utilisateurs · nominé Startup Weekend Annecy 2025
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Tag>Next.js 15</Tag>
                <Tag>React 19</Tag>
                <Tag>NestJS (DDD)</Tag>
                <Tag>PostgreSQL / Prisma</Tag>
                <Tag>AWS S3</Tag>
              </div>
              <ArrowLink href="https://obrado.app" className="mt-7">
                Voir Obrado →
              </ArrowLink>
            </div>

            <div className="flex flex-col gap-6">
              <Figure
                src="/images/obrado.webp"
                alt="Obrado — visuel produit"
                caption="Fig. 01 — Obrado, profil-portfolio vérifié."
                ratio="4 / 3"
              />
              <Figure
                src="/images/startup-weekend.jpg"
                alt="Nomination Startup Weekend Annecy 2025"
                caption="Fig. 02 — Startup Weekend Annecy 2025."
                ratio="16 / 9"
              />
            </div>
          </article>

          <div className="my-16 h-px" style={{ background: "var(--border-default)" }} />

          <article className="grid items-start gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
            <div>
              <Eyebrow>Développement technique intégral · équipe de 5 · DNMADE</Eyebrow>
              <h3 className="k-title-1 mt-3.5">Éos</h3>
              <p className="k-heading mt-1.5">Assistance visuelle temps réel pour la DMLA</p>
              <p className="k-body mt-5 max-w-[44ch]" style={{ color: "var(--text-body)" }}>
                POC d&apos;assistance visuelle : un casque équipé d&apos;un iPhone 17 Pro traduit
                la scène en une carte sémantique ultra-contrastée, lisible par la vision
                périphérique des personnes atteintes de DMLA.
              </p>
              <p className="k-body-sm mt-5" style={{ color: "var(--text-muted)" }}>
                Traitement 100 % on-device — privacy by design.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Tag>Swift / iOS</Tag>
                <Tag>ARKit</Tag>
                <Tag>LiDAR</Tag>
                <Tag>CoreML</Tag>
                <Tag>Metal</Tag>
              </div>
              <ArrowLink href="https://obrado.app/cto" className="mt-7">
                Détail du projet sur Obrado →
              </ArrowLink>
            </div>

            <div className="flex flex-col gap-6">
              <Figure
                src="/images/eos-2.webp"
                alt="Démonstration d'Éos en salle"
                caption="Fig. 03 — Démonstration du casque, carte sémantique projetée."
                ratio="16 / 10"
              />
              <Figure
                src="/images/eos-3.webp"
                alt="Grammaire visuelle d'Éos"
                caption="Fig. 04 — Grammaire visuelle : obstacles, limites, sujets mouvants."
                ratio="16 / 9"
              />
            </div>
          </article>
        </section>

        {/* ---------------- MAKER ---------------- */}
        <section id="maker" className="pt-16 md:pt-24">
          <SectionRule label="Maker — impression 3D & hardware" />
          <div className="mt-10 grid items-end gap-8 md:grid-cols-2 md:gap-16">
            <h2 className="k-display-3 m-0 max-w-[18ch]">
              Je crée du réel, pas seulement de l&apos;écran.
            </h2>
            <p className="k-body-lg m-0 max-w-[44ch]" style={{ color: "var(--text-muted)" }}>
              Bambu Lab A1 + AMS · conception Fusion 360 / Blender. Modélisation, impression,
              ajustement, réimpression — jusqu&apos;à ce que la pièce tienne.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <Figure
              src="/images/atelier.jpg"
              alt="L'atelier"
              caption="L'atelier où ça se fabrique."
              ratio="4 / 5"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
            <Figure
              src="/images/pied-a-coulisse-2.jpg"
              alt="Pièce de pied à coulisse réimprimée"
              caption="Pièce cassée remodélisée puis réimprimée."
              ratio="4 / 5"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
            <Figure
              src="/images/proto-eos.jpeg"
              alt="Prototype de support Éos imprimé en 3D"
              caption="3D × projet tech × esprit ingénierie."
              ratio="4 / 5"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </div>
        </section>

        {/* ---------------- PARCOURS ---------------- */}
        <section id="parcours" className="pt-16 md:pt-24">
          <SectionRule label="Parcours" />

          <TimelineRow period="Nov. 2025 → juin 2026" title="ControlResell — alternance frontend">
            <p className="k-body mt-2.5 max-w-[66ch]" style={{ color: "var(--text-body)" }}>
              Responsable de l&apos;évolution du frontend React Web &amp; React Native : cohérence
              produit, expérience utilisateur, architecture du code. C&apos;est là que j&apos;ai eu
              le déclic : en produisant du code presque entièrement assisté par IA, j&apos;ai
              réalisé que ma valeur de développeur pur s&apos;érodait — point de départ de ma
              réorientation.
            </p>
          </TimelineRow>

          <TimelineRow period="Depuis juin 2025" title="Obrado — CTO & cofondateur">
            <p className="k-body mt-2.5 max-w-[66ch]" style={{ color: "var(--text-body)" }}>
              SaaS dédié à l&apos;alternance. MVP en ligne, ~30 utilisateurs. Nominé Startup
              Weekend Annecy 2025.
            </p>
          </TimelineRow>

          <TimelineRow period="Avr. 2025 → juil. 2026" title="Freelance — dev creative / fullstack">
            <p className="k-body mt-2.5 max-w-[66ch]" style={{ color: "var(--text-body)" }}>
              Landing pages, apps et animations web pour startups et artisans.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3 sm:max-w-[640px]">
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

          <TimelineRow period="Sept. 2024 → juil. 2027" title="DNMADE Numérique — By CCI">
            <p className="k-body mt-2.5" style={{ color: "var(--text-muted)" }}>
              Bac+3, en cours.
            </p>
          </TimelineRow>

          <TimelineRow period="2021 → 2024" title="Baccalauréat STI2D — spé SIN">
            <p className="k-body mt-2.5" style={{ color: "var(--text-muted)" }}>
              Mention très bien.
            </p>
          </TimelineRow>

          <div className="mt-12 grid items-start gap-4 md:grid-cols-[190px_1fr] md:gap-8">
            <Eyebrow tone="accent">Le tournant</Eyebrow>
            <div
              className="p-6"
              style={{
                background: "var(--surface-card-quiet)",
                border: "1px solid var(--border-faint)",
                borderRadius: 4,
              }}
            >
              <p className="k-body-lg m-0 max-w-[62ch]" style={{ color: "var(--text-body)" }}>
                Le dev m&apos;a permis de créer des projets entrepreneuriaux et de découvrir le
                monde concret de l&apos;entreprise. Avec l&apos;arrivée de l&apos;IA, je veux
                désormais consolider tout ça par un diplôme d&apos;ingénieur, dans un domaine qui
                me passionne depuis toujours : l&apos;aéronautique et le spatial.
              </p>
              <ArrowLink href="https://obrado.app/cto" className="mt-6">
                Voir mon parcours complet &amp; mon CV sur Obrado →
              </ArrowLink>
            </div>
          </div>
        </section>

        {/* ---------------- COMPÉTENCES ---------------- */}
        <section id="competences" className="pt-16 md:pt-24">
          <SectionRule label="Compétences" />
          <div className="mt-10 grid items-start gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <Eyebrow tone="strong" className="pb-3">
                Code
              </Eyebrow>
              {CODE_SKILLS.map((s, i) => (
                <SkillRow
                  key={s.label}
                  label={s.label}
                  level={s.level}
                  first={i === 0}
                  last={i === CODE_SKILLS.length - 1}
                />
              ))}
            </div>

            <div className="flex flex-col gap-10">
              <div>
                <Eyebrow tone="strong" className="pb-3">
                  Hardware / 3D
                </Eyebrow>
                {HARDWARE_SKILLS.map((label, i) => (
                  <SkillRow
                    key={label}
                    label={label}
                    first={i === 0}
                    last={i === HARDWARE_SKILLS.length - 1}
                  />
                ))}
              </div>
              <div>
                <Eyebrow tone="strong" className="pb-3">
                  Créatif
                </Eyebrow>
                {CREATIVE_SKILLS.map((label, i) => (
                  <SkillRow
                    key={label}
                    label={label}
                    first={i === 0}
                    last={i === CREATIVE_SKILLS.length - 1}
                  />
                ))}
              </div>
              <div>
                <Eyebrow tone="strong" className="pb-3">
                  Langues
                </Eyebrow>
                {LANGUAGES.map((l, i) => (
                  <SkillRow
                    key={l.label}
                    label={l.label}
                    level={l.level}
                    first={i === 0}
                    last={i === LANGUAGES.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- AVIATION ---------------- */}
        <section id="aviation" className="pt-16 md:pt-24">
          <SectionRule label="Aviation & moi" />
          <div className="mt-10 grid items-start gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
            <Figure
              src="/images/batem.jpg"
              alt="Baptême de l'air sur Pipistrel Velis Electro"
              caption="Baptême de l'air sur Pipistrel Velis Electro, piste d'Annecy."
              ratio="3 / 4"
              sizes="(max-width: 768px) 100vw, 380px"
            />
            <div>
              <h2 className="k-display-3 m-0 max-w-[20ch]">
                Le fil rouge de toute ma réorientation
              </h2>
              <p className="k-body-lg mt-6 max-w-[56ch]" style={{ color: "var(--text-body)" }}>
                Une passion ancienne et sincère, née de mon premier vol vers Londres il y a deux
                ans et demi : Flight Simulator, géographie, et l&apos;idée que l&apos;aviation
                relie les peuples. C&apos;est le fil rouge qui donne sa direction à toute ma
                réorientation.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- PHOTOGRAPHIE ---------------- */}
        <section id="photographie" className="pt-16 md:pt-24">
          <SectionRule label="Photographie & voyages" />
          <p className="k-body-lg mt-10 max-w-[56ch]" style={{ color: "var(--text-body)" }}>
            Un regard, une sensibilité à la lumière — Égypte, Rome, France. iPhone 16 + Lightroom.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-12">
            {GALLERY.map((p) => (
              <Figure
                key={p.src}
                src={p.src}
                alt={p.alt}
                caption={p.caption}
                heightClass={p.height}
                className={p.span}
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            ))}
          </div>
        </section>
      </main>

      {/* ---------------- CONTACT ---------------- */}
      <section
        id="contact"
        className="mt-16 md:mt-24"
        style={{ background: "var(--surface-inverse)", color: "var(--text-on-inverse)" }}
      >
        <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-16 md:py-20">
          <span className="k-label block" style={{ color: "var(--sage-400)" }}>
            Contact
          </span>
          <div className="mt-8 grid items-start gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
            <div>
              <h2
                className="m-0 max-w-[22ch]"
                style={{
                  font: "400 clamp(32px, 4.5vw, 44px)/1.1 var(--font-display)",
                  letterSpacing: "-0.02em",
                  color: "var(--text-on-inverse)",
                  textWrap: "pretty",
                }}
              >
                Je cherche une alternance en ingénierie logicielle embarquée.
              </h2>
              <p
                className="k-body-lg mt-6 max-w-[52ch]"
                style={{ color: "rgba(247,245,238,0.72)" }}
              >
                Si mon profil de maker vous parle, écrivons la suite ensemble.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-7">
                <a className="k-btn" href="mailto:killian.boularand@icloud.com">
                  Me contacter
                </a>
                <a
                  href="https://obrado.app/cto"
                  target="_blank"
                  rel="noreferrer"
                  className="k-ui"
                  style={{
                    color: "var(--text-on-inverse)",
                    borderBottom: "1px solid rgba(247,245,238,0.32)",
                    paddingBottom: 3,
                  }}
                >
                  Mon CV complet →
                </a>
              </div>
            </div>

            <div>
              <div
                className="flex flex-col gap-1 pb-6"
                style={{ borderBottom: "1px solid rgba(247,245,238,0.16)" }}
              >
                <span className="k-label" style={{ color: "var(--sage-400)", lineHeight: 1.6 }}>
                  Disponibilité
                </span>
                <span className="k-body" style={{ color: "rgba(247,245,238,0.86)" }}>
                  Dès maintenant → juillet 2027
                </span>
                <span className="k-body" style={{ color: "rgba(247,245,238,0.86)" }}>
                  2 sem. entreprise / 1 sem. école
                </span>
                <span className="k-body" style={{ color: "rgba(247,245,238,0.86)" }}>
                  Haute-Savoie · Lyon · Genève
                </span>
              </div>
              <div className="flex flex-col items-start gap-3.5 pt-6">
                {CONTACTS.map((c) => (
                  <a
                    key={c.href}
                    href={c.href}
                    className="k-body"
                    {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    style={{
                      color: "var(--text-on-inverse)",
                      borderBottom: "1px solid rgba(247,245,238,0.2)",
                      paddingBottom: 4,
                    }}
                  >
                    {c.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="mx-auto flex max-w-[1180px] flex-wrap items-end justify-between gap-6 px-6 pt-10 pb-14 md:px-16">
        <div className="flex flex-col gap-1">
          <span
            className="uppercase"
            style={{
              font: "400 15px/1 var(--font-display)",
              letterSpacing: "0.28em",
              color: "var(--text-muted)",
            }}
          >
            Korvo
          </span>
          <span className="k-caption">© Killian Boularand · 2026</span>
        </div>
        <span className="k-caption" style={{ color: "var(--text-faint)" }}>
          Annecy, Haute-Savoie
        </span>
      </footer>
    </div>
  );
}
