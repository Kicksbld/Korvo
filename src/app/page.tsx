/* ------------------------------------------------------------------ */
/* Korvo — Site de Killian Boularand                                  */
/* BASE stylée : thème tweakcn (Korvo) en Tailwind pur, sans shadcn.  */
/* Images = placeholders tant qu'on ne les a pas branchées.           */
/* ------------------------------------------------------------------ */

function Ph({ src, note }: { src: string; note: string }) {
  return (
    <span className="flex flex-col items-center justify-center rounded-md border border-dashed border-border bg-muted/40 px-4 py-8 text-center text-xs italic text-muted-foreground">
      <span aria-hidden className="mb-1 text-base not-italic">🖼️</span>
      <code className="not-italic">{src}</code>
      <span className="mt-1">{note}</span>
    </span>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-border bg-secondary/40 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
      {children}
    </span>
  );
}

const btnBase =
  "inline-flex items-center gap-1.5 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50";

function BtnSolid({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className={`${btnBase} bg-primary px-4 py-2 text-primary-foreground shadow-sm hover:bg-primary/90`}>
      {children}
    </a>
  );
}

function BtnOutline({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className={`${btnBase} border border-border px-4 py-2 text-foreground hover:bg-muted/50`}>
      {children}
    </a>
  );
}

function BtnLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className={`${btnBase} text-primary underline-offset-4 hover:underline`}>
      {children}
    </a>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border py-14">
      <h2 className="mb-6 font-serif text-2xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">{children}</div>
  );
}

const navLinks = [
  ["#manifeste", "Manifeste"],
  ["#parcours", "Parcours"],
  ["#projets", "Projets"],
  ["#maker", "Maker / 3D"],
  ["#competences", "Compétences"],
  ["#aviation", "Aviation"],
  ["#galerie", "Photo"],
  ["#contact", "Contact"],
];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* ---------------- NAV ---------------- */}
      <nav className="sticky top-0 z-10 -mx-6 mb-2 border-b border-border bg-background/85 px-6 py-3 backdrop-blur">
        <ul className="flex items-center gap-x-4 gap-y-1 overflow-x-auto whitespace-nowrap text-sm text-muted-foreground">
          <li className="font-serif font-semibold text-foreground">
            <a href="#hero">Killian × Korvo</a>
          </li>
          {navLinks.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="hover:text-foreground">{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ---------------- 1. HERO ---------------- */}
      <header id="hero" className="scroll-mt-20 py-16">
        <p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">Korvo — logotype (à venir)</p>
        <h1 className="font-serif text-5xl font-semibold leading-tight tracking-tight">Killian Boularand</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/90">
          Maker : je transforme des idées en objets et systèmes réels — du code à
          l'impression 3D — avec un cap : <span className="text-primary font-medium">l'ingénierie logicielle embarquée</span>.
        </p>
        <div className="mt-8">
          <BtnSolid href="#contact">Je cherche une alternance →</BtnSolid>
        </div>
      </header>

      <main>
        {/* ---------------- 2. MANIFESTE ---------------- */}
        <Section id="manifeste" title="Le maker qui vise l'aérospatial">
          <div className="space-y-4 text-foreground/90">
            <p>
              Je ne suis pas « juste un développeur ». J'aime découvrir plusieurs
              disciplines et maîtriser ce qu'il y a autour pour répondre à n'importe quel
              besoin : je code, je conçois et j'imprime des pièces, je photographie, et je
              suis passionné d'aviation et de spatial.
            </p>
            <p>
              Ces compétences convergent vers un même but : l'ingénierie logicielle
              embarquée, idéalement au service de l'aéronautique et du spatial — un domaine
              qui exige exactement ce croisement entre logiciel, hardware, rigueur et
              créativité de résolution de problèmes.
            </p>
          </div>
        </Section>

        {/* ---------------- 3. PARCOURS ---------------- */}
        <Section id="parcours" title="Parcours">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">ControlResell — Alternance frontend <span className="font-normal text-muted-foreground">· Nov. 2025 → Juin 2026</span></h3>
              <p className="mt-1 text-foreground/90">
                Responsable de l'évolution du frontend React Web &amp; React Native : cohérence
                produit, expérience utilisateur, architecture du code. C'est là que j'ai eu le
                déclic : en produisant du code presque entièrement assisté par IA, j'ai réalisé
                que ma valeur de développeur pur s'érodait — point de départ de ma réorientation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Obrado — CTO &amp; cofondateur <span className="font-normal text-muted-foreground">· depuis Juin 2025</span></h3>
              <p className="mt-1 text-foreground/90">SaaS dédié à l'alternance. MVP en ligne, ~30 utilisateurs. Nominé Startup Weekend Annecy 2025.</p>
            </div>
            <div>
              <h3 className="font-semibold">Freelance — dev creative / fullstack <span className="font-normal text-muted-foreground">· Avr. 2025 → Juil. 2026</span></h3>
              <p className="mt-1 text-foreground/90">Landing pages, apps et animations web pour startups et artisans.</p>
            </div>
            <div>
              <h3 className="font-semibold">DNMADE Numérique <span className="font-normal text-muted-foreground">· Sept. 2024 → Juil. 2027 · By CCI (bac+3, en cours)</span></h3>
            </div>
            <div>
              <h3 className="font-semibold">Baccalauréat STI2D — spé SIN <span className="font-normal text-muted-foreground">· 2021 → 2024 · Mention Très Bien</span></h3>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h3 className="font-semibold">Le tournant</h3>
              <p className="mt-1 text-foreground/90">
                Le dev m'a permis de créer des projets entrepreneuriaux et de découvrir le monde
                concret de l'entreprise. Avec l'arrivée de l'IA, je veux désormais consolider tout
                ça par un diplôme d'ingénieur, dans un domaine qui me passionne depuis toujours :
                l'aéronautique et le spatial.
              </p>
            </div>
            <BtnOutline href="https://obrado.app/cto">Voir mon parcours complet &amp; mon CV sur Obrado →</BtnOutline>
          </div>
        </Section>

        {/* ---------------- 4. PROJETS PHARES ---------------- */}
        <Section id="projets" title="Projets phares">
          <div className="space-y-6">
            <Card>
              <h3 className="font-serif text-xl font-semibold">Obrado — SaaS dédié à l'alternance</h3>
              <p className="mt-1 text-sm text-muted-foreground">CTO &amp; cofondateur · depuis Juin 2025</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Ph src="obrado.webp" note="visuel principal" />
                <Ph src="startup-weekend.jpeg" note="nomination SWA 2025" />
              </div>
              <p className="mt-4 text-foreground/90">
                Un CV ne montre jamais ce qu'on sait vraiment faire. Obrado remplace le CV par
                un profil-portfolio public, vérifié par l'école.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Tag>Next.js 15</Tag>
                <Tag>React 19</Tag>
                <Tag>NestJS (DDD)</Tag>
                <Tag>PostgreSQL / Prisma</Tag>
                <Tag>AWS S3</Tag>
              </div>
              <div className="mt-4">
                <BtnLink href="https://obrado.app">Voir Obrado →</BtnLink>
              </div>
            </Card>

            <Card>
              <h3 className="font-serif text-xl font-semibold">Éos — Assistance visuelle temps réel pour la DMLA</h3>
              <p className="mt-1 text-sm text-muted-foreground">Développement technique intégral · équipe de 5 · DNMADE</p>
              <div className="mt-4">
                <Ph src="eos.webp" note="visuel principal Éos (plein cadre)" />
              </div>
              <p className="mt-4 text-foreground/90">
                POC d'assistance visuelle : un casque équipé d'un iPhone 17 Pro traduit la scène
                en une carte sémantique ultra-contrastée, lisible par la vision périphérique des
                personnes atteintes de DMLA. Traitement 100 % on-device (privacy by design).
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Tag>Swift / iOS</Tag>
                <Tag>ARKit</Tag>
                <Tag>LiDAR</Tag>
                <Tag>CoreML</Tag>
                <Tag>Metal</Tag>
              </div>
              <div className="mt-4">
                <BtnLink href="https://obrado.app/cto">Détail du projet sur Obrado →</BtnLink>
              </div>
            </Card>
          </div>
        </Section>

        {/* ---------------- 5. MAKER / IMPRESSION 3D ---------------- */}
        <Section id="maker" title="Maker — Impression 3D & hardware">
          <p className="mb-6 text-foreground/90">Je crée du réel, pas seulement de l'écran. Bambu Lab A1 + AMS · conception Fusion 360 / Blender.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <figure>
              <Ph src="atelier.JPG" note="l'atelier / le setup" />
              <figcaption className="mt-2 text-sm text-muted-foreground">L'atelier où ça se fabrique.</figcaption>
            </figure>
            <figure>
              <Ph src="pied-a-coullise-*.JPG" note="pièce fonctionnelle réparée" />
              <figcaption className="mt-2 text-sm text-muted-foreground">Pièce cassée remodélisée puis réimprimée.</figcaption>
            </figure>
            <figure>
              <Ph src="proto-eos.jpeg" note="prototype support Éos" />
              <figcaption className="mt-2 text-sm text-muted-foreground">3D × projet tech × esprit ingénierie.</figcaption>
            </figure>
          </div>
        </Section>

        {/* ---------------- 6. COMPÉTENCES ---------------- */}
        <Section id="competences" title="Compétences">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Code</h3>
              <ul className="space-y-1 text-sm text-foreground/90">
                <li>Web : Next.js, Vue/Nuxt, Supabase, Prisma — maîtrisé</li>
                <li>Motion : GSAP, Three.js — confortable</li>
                <li>Mobile / spatial : Swift, ARKit, LiDAR, CoreML, Metal — confortable</li>
                <li>IA embarquée / on-device, LLM — confortable</li>
                <li>Python — maîtrisé · C/C++ — notions</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Hardware / 3D</h3>
              <ul className="space-y-1 text-sm text-foreground/90">
                <li>Impression 3D (Bambu Lab A1), CAO Fusion 360 / Blender</li>
                <li>Électronique / IoT : Arduino, ESP32, Raspberry Pi</li>
              </ul>
              <h3 className="mb-2 mt-4 font-semibold">Créatif</h3>
              <ul className="space-y-1 text-sm text-foreground/90">
                <li>Photo (iPhone 16 + Lightroom)</li>
                <li>Design d'interfaces &amp; d'identités sur Figma</li>
              </ul>
              <h3 className="mb-2 mt-4 font-semibold">Langues</h3>
              <ul className="space-y-1 text-sm text-foreground/90">
                <li>Français — natif · Anglais — C1 · Espagnol — B1</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* ---------------- 7. AVIATION & MOI ---------------- */}
        <Section id="aviation" title="Aviation & moi">
          <figure className="mb-4">
            <Ph src="batem.JPG" note="baptême de l'air — Pipistrel Velis Electro, Annecy" />
            <figcaption className="mt-2 text-sm text-muted-foreground">Baptême de l'air sur Pipistrel Velis Electro, piste d'Annecy.</figcaption>
          </figure>
          <p className="text-foreground/90">
            Une passion ancienne et sincère, née de mon premier vol vers Londres il y a deux ans
            et demi : Flight Simulator, géographie, et l'idée que l'aviation relie les peuples.
            C'est le fil rouge qui donne sa direction à toute ma réorientation.
          </p>
        </Section>

        {/* ---------------- 8. GALERIE PHOTO ---------------- */}
        <Section id="galerie" title="Photographie & voyages">
          <p className="mb-6 text-foreground/90">Un regard, une sensibilité à la lumière — Égypte, Rome, France. iPhone 16 + Lightroom.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Ph src="Giza.JPG" note="Égypte" />
            <Ph src="pyramid.PNG" note="Égypte" />
            <Ph src="toutankamon.PNG" note="Égypte" />
            <Ph src="egypte-atterissage.jpeg" note="Égypte — avion" />
            <Ph src="Colise.jpg" note="Rome" />
            <Ph src="arc-rome.jpg" note="Rome" />
            <Ph src="Marché.jpg" note="Rome" />
            <Ph src="cannes.jpeg" note="France" />
            <Ph src="Alyssia.jpg" note="Portrait" />
          </div>
        </Section>
      </main>

      {/* ---------------- 9. CONTACT + FOOTER ---------------- */}
      <footer id="contact" className="scroll-mt-20 border-t border-border py-14">
        <h2 className="mb-4 font-serif text-2xl font-semibold tracking-tight">Contact</h2>
        <p className="max-w-2xl text-foreground/90">
          Je cherche une alternance en ingénierie logicielle embarquée. Si mon profil de maker
          vous parle, écrivons la suite ensemble.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Disponible dès maintenant → juillet 2027 · 2 sem. entreprise / 1 sem. école · Haute-Savoie / Lyon / Genève.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <BtnSolid href="mailto:killian.boularand@icloud.com">Me contacter</BtnSolid>
          <BtnOutline href="https://obrado.app/cto">Mon CV complet</BtnOutline>
        </div>
        <ul className="mt-6 space-y-1 text-sm text-foreground/90">
          <li>Email : <a className="text-primary hover:underline" href="mailto:killian.boularand@icloud.com">killian.boularand@icloud.com</a></li>
          <li>Téléphone : <a className="text-primary hover:underline" href="tel:+33603850349">+33 6 03 85 03 49</a></li>
          <li>LinkedIn : <a className="text-primary hover:underline" href="https://linkedin.com/in/killian-boularand">killian-boularand</a></li>
          <li>GitHub : <a className="text-primary hover:underline" href="https://github.com/Kicksbld">Kicksbld</a></li>
          <li>Instagram : <a className="text-primary hover:underline" href="https://www.instagram.com/killian_bd_/">@killian_bd_</a></li>
        </ul>
        <p className="mt-8 text-xs text-muted-foreground">© Korvo — Killian Boularand · 2026</p>
      </footer>
    </div>
  );
}
