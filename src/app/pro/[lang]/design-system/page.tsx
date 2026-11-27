import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { hasLocale } from "@/i18n/config";
import {
  BrowserIcon,
  Button,
  Card,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  Container,
  GiftIcon,
  IconButton,
  LangSwitch,
  Logo,
  Section,
  SegmentedToggle,
  Signature,
  Tabs,
  Tag,
  TextLink,
} from "@/components/pro";
import type { SectionTone } from "@/components/pro";
import { proPath } from "../../urls";

/* Panneau de démonstration du design system de la page pro.
   Outil interne : jamais indexé, à supprimer (ou garder en noindex) en
   phase 6. Accessible sur pro.localhost:3000/design-system. */

export const metadata: Metadata = {
  title: "Design system — page pro Korvo",
  robots: { index: false, follow: false },
};

const COLORS: Array<{ group: string; items: Array<[string, string]> }> = [
  {
    group: "Papiers",
    items: [
      ["paper", "#F7F5EE"],
      ["paper-raised", "#FFFDF7"],
      ["paper-sunken", "#F1EEE5"],
      ["paper-inset", "#EAE6DA"],
      ["paper-aged", "#F0E8D6"],
    ],
  },
  {
    group: "Encres",
    items: [
      ["ink", "#000000"],
      ["ink-2", "#33322E"],
      ["ink-3", "#6F6D66"],
    ],
  },
  {
    group: "Sauge",
    items: [
      ["sage-900", "#3F4335"],
      ["sage-700", "#545A47"],
      ["sage", "#666D57"],
      ["sage-400", "#8B9078"],
      ["sage-200", "#C7C9BC"],
      ["sage-050", "#EEEDE5"],
    ],
  },
  {
    group: "Forêt, ocre",
    items: [
      ["forest", "#2B2F24"],
      ["forest-2", "#363B2D"],
      ["footer", "#272F1D"],
      ["ochre", "#996624"],
      ["bronze", "#8C6A2A"],
      ["ochre-soft", "#EDDEBF"],
      ["sepia", "#4A3B26"],
    ],
  },
  {
    group: "Bordures",
    items: [
      ["border-faint", "#E3E2DE"],
      ["border-default", "#D0D0CE"],
      ["border-strong", "#BBB5A7"],
    ],
  },
];

const TYPE: Array<{ name: string; cls: string; spec: string; sample: string }> = [
  { name: "Display XL", cls: "display-xl", spec: "Fraunces 100/100 · −3 %", sample: "Votre entreprise," },
  { name: "Display L", cls: "display-l", spec: "Fraunces 76/80 · −2,5 %", sample: "Par quoi on commence ?" },
  { name: "Display M", cls: "display-m", spec: "Fraunces 56/62 · −2 % · titres de section", sample: "Du premier appel à la mise en ligne." },
  { name: "Display S", cls: "display-s", spec: "Fraunces 40/46 · −1,5 %", sample: "Automatisation" },
  { name: "Display XS", cls: "display-xs", spec: "Fraunces 28/34 · −1 %", sample: "Sérénité" },
  { name: "Display Mobile XL", cls: "display-mobile-xl", spec: "Fraunces 48/50 · −2,5 %", sample: "Votre entreprise," },
  { name: "Display Mobile L", cls: "display-mobile-l", spec: "Fraunces 36/40 · −2 % · titres de section", sample: "Mes réalisations." },
  { name: "Display Mobile M", cls: "display-mobile-m", spec: "Fraunces 28/32 · −1,5 %", sample: "Assistant 24/7" },
  { name: "Body LG", cls: "body-lg", spec: "Source Sans 3 20/31", sample: "Moins d'administratif, plus de clients." },
  { name: "Body MD", cls: "body-md", spec: "Source Sans 3 17/27", sample: "Il répond à vos clients, comprend leur besoin et vous envoie un résumé." },
  { name: "Body SM", cls: "body-sm", spec: "Source Sans 3 15/22", sample: "Un site neuf, net sur tous les écrans." },
  { name: "Body Strong", cls: "body-strong", spec: "Source Sans 3 SemiBold 17/24", sample: "Appel découverte" },
  { name: "UI Button", cls: "ui-button", spec: "Source Sans 3 SemiBold 16/16", sample: "Réserver un appel de 20 min" },
  { name: "UI Small", cls: "ui-small", spec: "Source Sans 3 SemiBold 14/16", sample: "Annecy · €" },
  { name: "Annotation", cls: "hand text-ochre", spec: "Caveat 24/25 · ocre", sample: "à votre nom" },
];

const TONES: Array<{ tone: SectionTone; label: string }> = [
  { tone: "sage", label: "Sauge (offres)" },
  { tone: "forest", label: "Vert forêt (réalisations, FAQ)" },
  { tone: "paper", label: "Papier texturé (démo, qui je suis)" },
  { tone: "ochre", label: "Ocre clair texturé (tout reste à vous)" },
  { tone: "sunken", label: "Papier creusé texturé (processus)" },
  { tone: "footer", label: "Pied de page (#272F1D)" },
];

function Block({ title, children, note }: { title: string; note?: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-6 border-t border-border-default pt-10">
      <div className="flex flex-col gap-1">
        <h2 className="display-s">{title}</h2>
        {note ? <p className="body-sm max-w-[720px] text-ink-3">{note}</p> : null}
      </div>
      {children}
    </div>
  );
}

export default async function DesignSystemPage(props: PageProps<"/pro/[lang]/design-system">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      <Section tone="paper">
        <Container className="flex flex-col gap-16">
          <header className="flex flex-col gap-4">
            <Logo />
            <h1 className="display-mobile-xl md:display-l">Design system — page pro</h1>
            <p className="body-lg max-w-[760px] text-ink-2">
              Toutes les primitives de src/components/pro, relevées dans la maquette v2. Page interne, non indexée.
            </p>
          </header>

          <Block title="Couleurs" note="Variables CSS --pro-*, classes Tailwind bg-paper, text-ink… ink-4 est volontairement absent (2,58:1, illisible).">
            <div className="flex flex-col gap-8">
              {COLORS.map(({ group, items }) => (
                <div key={group} className="flex flex-col gap-3">
                  <h3 className="body-strong">{group}</h3>
                  <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
                    {items.map(([name, hex]) => (
                      <li key={name} className="flex flex-col gap-2">
                        <span
                          className="h-16 rounded-image border border-border-faint"
                          style={{ backgroundColor: `var(--pro-${name})` }}
                        />
                        <span className="ui-small">{name}</span>
                        <span className="body-sm text-ink-3">{hex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Typographie" note="Fraunces (titres, SOFT 0 / WONK 1, taille optique auto), Source Sans 3 (texte et interface), Caveat (annotations seulement).">
            <ul className="flex flex-col gap-8">
              {TYPE.map(({ name, cls, spec, sample }) => (
                <li key={name} className="grid gap-2 md:grid-cols-[220px_1fr] md:gap-8">
                  <div className="flex flex-col">
                    <span className="ui-small">{name}</span>
                    <span className="body-sm text-ink-3">{spec}</span>
                  </div>
                  <p className={cls}>{sample}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Boutons" note="md 52 px (flèche par défaut), sm 40 px (barre du haut), pill 44 px (liens « voir le site »). Échelle 0,97 à l'appui.">
            <div className="flex flex-wrap items-center gap-4">
              <Button>Réserver un appel de 20 min</Button>
              <Button variant="outline">Voir les offres</Button>
              <Button variant="forest">Réserver un appel de 20 min</Button>
              <Button variant="bronze">Réserver un appel de 20 min</Button>
              <Button size="sm">Réserver un appel</Button>
              <Button disabled>Désactivé</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 rounded-surface bg-forest p-8">
              <Button variant="inverse">Réserver un appel de 20 min</Button>
              <Button variant="outline-inverse" size="pill" icon="external" href="#">
                lesignobles.com
              </Button>
            </div>
          </Block>

          <Block title="Liens et langue">
            <div className="flex flex-wrap items-center gap-8">
              <TextLink href="#" external srHint="(ouvre korvo-studio.fr)">
                Mon parcours & mes projets
              </TextLink>
              <TextLink href="#">Lien interne</TextLink>
              <LangSwitch
                current={lang}
                hrefs={{ fr: proPath("fr", "design-system"), en: proPath("en", "design-system") }}
                label="Langue"
                names={{ fr: "Français", en: "English" }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-8 rounded-surface bg-forest p-8">
              <TextLink href="#" tone="paper" external>
                Lien sur fond sombre
              </TextLink>
              <LangSwitch
                current={lang}
                tone="paper"
                hrefs={{ fr: proPath("fr", "design-system"), en: proPath("en", "design-system") }}
                label="Langue (fond sombre)"
                names={{ fr: "Français", en: "English" }}
              />
              <Logo tone="paper" />
            </div>
          </Block>

          <Block title="Tags">
            <div className="flex flex-wrap items-center gap-4">
              <Tag icon={<GiftIcon />}>Maquette offerte</Tag>
              <Tag tone="sage">Démo</Tag>
            </div>
          </Block>

          <Block title="Onglets et bascule" note="Interactifs au clavier (flèches). Le glissement en ressort arrive en phase 3.">
            <div className="flex flex-wrap items-center gap-6 rounded-surface bg-sage p-8">
              <Tabs
                label="Votre besoin"
                idPrefix="ds-besoin"
                defaultValue="temps"
                items={[
                  { value: "site", label: "J'ai besoin d'un site", icon: <BrowserIcon /> },
                  { value: "temps", label: "Je veux gagner du temps", icon: <ClockIcon /> },
                ]}
              />
              <SegmentedToggle
                label="Devise des prix"
                defaultValue="eur"
                options={[
                  { value: "eur", label: "Annecy · €" },
                  { value: "chf", label: "Genève · CHF" },
                ]}
              />
            </div>
          </Block>

          <Block title="Boutons ronds" note="48 px (44 px en sm). Nom accessible obligatoire.">
            <div className="flex flex-wrap items-center gap-3 rounded-surface bg-forest p-8">
              <IconButton variant="outline-inverse" label="Projet précédent" icon={<ChevronLeftIcon />} />
              <IconButton variant="inverse" label="Projet suivant" icon={<ChevronRightIcon />} />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <IconButton variant="outline" label="Précédent" icon={<ChevronLeftIcon />} />
              <IconButton variant="solid" label="Suivant" icon={<ChevronRightIcon />} />
              <IconButton variant="solid" size="sm" label="Suivant (44 px)" icon={<ChevronRightIcon />} />
            </div>
          </Block>

          <Block title="Cartes">
            <div className="grid gap-6 md:grid-cols-3">
              <Card radius="card" shadow="card" className="flex rotate-[1.5deg] flex-col gap-1.5 px-5 pt-4 pb-[18px]">
                <p className="body-strong leading-[22px]">On ne vous trouve pas sur Google.</p>
                <p className="body-sm leading-5 text-sage-900">Un site clair, pensé pour être trouvé près de chez vous.</p>
              </Card>
              <Card className="flex flex-col gap-2.5 px-5 py-[22px]">
                <p className="body-strong">Appel découverte</p>
                <p className="body-sm text-ink-3">
                  20 minutes, réservées en ligne. Vous me parlez de votre activité et de ce qui vous fait perdre du temps.
                </p>
              </Card>
              <Card tone="forest" className="flex flex-col items-start gap-2.5 px-5 py-[22px]">
                <p className="body-strong">Devis + première maquette</p>
                <Tag icon={<GiftIcon />}>Maquette offerte</Tag>
                <p className="body-sm text-sage-200">Un prix fixe, et un prototype offert pour voir votre site avant de signer.</p>
              </Card>
            </div>
            <Card radius="surface" shadow="panel" className="flex flex-col gap-4 p-8 md:p-12">
              <div className="flex items-start justify-between gap-6">
                <p className="display-s">Automatisation</p>
                <div className="flex flex-col items-end">
                  <span className="ui-small text-ink-3">dès</span>
                  <span className="display-m">1 500 €</span>
                </div>
              </div>
              <ul className="flex flex-col gap-2.5">
                {["Vos demandes triées et résumées pour vous", "Devis et relances envoyés à temps"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 body-sm text-ink-2">
                    <CheckIcon className="mt-[3px] shrink-0 text-sage" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card radius="tag" shadow="tag" className="flex w-[210px] -rotate-3 flex-col gap-0.5 border-border-strong pt-3.5 pr-4 pb-3 pl-[18px]">
              <p className="font-body text-base leading-[21px] font-semibold">Nom de domaine</p>
              <p className="hand text-ochre">à votre nom</p>
            </Card>
          </Block>

          <Block title="Illustrations, photos et signature" note="Quatre gravures seulement, en multiply sur le papier. WebP dans public/pro/ (next/image produit les tailles 1× et 2×).">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                ["lac", "Paysage du lac (hero)", 1792, 768],
                ["sentier", "Sentier (processus)", 512, 512],
                ["cles", "Trousseau de clés (tout reste à vous)", 512, 512],
                ["montagnes", "Montagnes (pied de page)", 1920, 640],
              ].map(([file, label, w, h]) => (
                <figure key={file as string} className="flex flex-col gap-2">
                  <Image
                    src={`/pro/gravures/${file}.webp`}
                    alt=""
                    width={w as number}
                    height={h as number}
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="engraving h-40 w-full object-contain"
                  />
                  <figcaption className="body-sm text-ink-3">{label as string}</figcaption>
                </figure>
              ))}
            </div>
            <div className="flex flex-wrap items-end gap-8">
              <Image
                src="/pro/photos/killian-hero.webp"
                alt="Killian Boularand, souriant, en polo blanc"
                width={180}
                height={250}
                className="h-[250px] w-[180px] rounded-t-[90px] object-cover shadow-photo"
              />
              <Image
                src="/pro/photos/killian-riviere.webp"
                alt="Killian Boularand au bord d'une rivière"
                width={170}
                height={170}
                className="size-[170px] rounded-full object-cover"
              />
              <Image
                src="/pro/photos/killian-avatar.webp"
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-full object-cover"
              />
              <Signature className="-rotate-8" width={220} />
            </div>
          </Block>

          <Block title="Captures des projets">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                ["debatium", "Debatium (565 × 423 : capture HD à fournir)", 565, 423],
                ["ignobles-desktop", "Les Ignobles, desktop", 1600, 1000],
                ["ignobles-mobile", "Les Ignobles, mobile", 780, 1688],
                ["adn-desktop", "ADN Studio, desktop", 1432, 792],
              ].map(([file, label, w, h]) => (
                <figure key={file as string} className="flex flex-col gap-2">
                  <Image
                    src={`/pro/projets/${file}.webp`}
                    alt=""
                    width={w as number}
                    height={h as number}
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="h-40 w-full rounded-image object-cover object-top"
                  />
                  <figcaption className="body-sm text-ink-3">{label as string}</figcaption>
                </figure>
              ))}
            </div>
          </Block>

          <Block title="Sections et déchirures" note="Chaque changement de couleur : le haut de la section suivante se déchire (frange claire + ombre chaude). Graine différente à chaque fois. Version mobile sous 768 px." />
        </Container>
      </Section>

      {TONES.map(({ tone, label }, index) => (
        <Section key={`${tone}-${index}`} tone={tone} tear={index * 7 + 3} padded={false} className="py-20">
          <Container>
            <p className="display-xs">{label}</p>
            <p className="body-sm opacity-80">tone=&quot;{tone}&quot; · tear={index * 7 + 3}</p>
          </Container>
        </Section>
      ))}
    </>
  );
}
