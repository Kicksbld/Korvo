import Image from "next/image";
import type { Project, ProContent } from "@/app/pro/content/types";
import { Button } from "../Button";
import { Container } from "../Container";
import { cx } from "../cx";
import { Section } from "../Section";
import { WorkTrack } from "./WorkTrack";

/* Réalisations (Figma 210-44 desktop, 210-102 mobile) — fond vert forêt.

   Chaque projet : un visuel (fond de couleur + captures mises en scène),
   le nom, le contexte, trois phrases, puis le lien vers le site (ou la
   mention « outil interne »). Cartes de 316 px en mobile, 880 px en desktop
   (réduites entre les deux pour qu'on devine le projet suivant).
   Les positions des captures sont en % des boîtes Figma (316 × 210 en
   mobile, 880 × 500 à partir de 768). */

const CARD_W = "w-[316px] md:w-[min(880px,calc(100vw-160px))]";

/** Faux navigateur : barre à pastilles + capture. */
function Browser({ domain, src, alt, className }: { domain?: string; src: string; alt: string; className: string }) {
  return (
    <div className={cx("absolute flex flex-col overflow-hidden bg-[#edebe3] shadow-[0_18px_40px_rgb(0_0_0/0.28)]", className)}>
      <div className="flex h-4 shrink-0 items-center gap-[3px] px-1.5 md:h-[30px] md:gap-1.5 md:px-3">
        <span className="size-1 rounded-full bg-[#ed6b5e] md:size-[9px]" />
        <span className="size-1 rounded-full bg-[#f5bf4f] md:size-[9px]" />
        <span className="size-1 rounded-full bg-[#61c766] md:size-[9px]" />
        <span className="ml-0.5 flex h-2.5 flex-1 items-center justify-center rounded-full bg-[#fff] px-2 md:h-[18px]">
          {domain ? <span className="hidden font-body text-xs leading-[14px] text-ink-3 md:inline">{domain}</span> : null}
        </span>
      </div>
      <div className="relative aspect-[1.6] w-full">
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 740px, 280px" className="object-cover object-top" />
      </div>
    </div>
  );
}

function Visual({ project }: { project: Project }) {
  const box = "relative h-[210px] overflow-hidden rounded-card-lg md:h-auto md:aspect-[880/500]";

  if (project.visual === "debatium") {
    return (
      <div className={cx(box, "flex items-center justify-center bg-sage")}>
        <div className="relative aspect-[600/449] h-[84%] overflow-hidden rounded-md shadow-[0_18px_40px_rgb(0_0_0/0.35)] md:h-[90%] md:rounded-[10px]">
          <Image src="/pro/projets/debatium.webp" alt={project.alt} fill sizes="(min-width: 768px) 600px, 236px" className="object-cover" />
        </div>
      </div>
    );
  }

  if (project.visual === "ignobles") {
    return (
      <div className={cx(box, "bg-sage-050")}>
        <Browser
          domain={project.domain}
          src="/pro/projets/ignobles-desktop.webp"
          alt={project.alt}
          className="top-[9.5%] left-[4.4%] w-[73.4%] rounded-[7px] md:top-[7.2%] md:left-[6.4%] md:w-[72.7%] md:rounded-xl"
        />
        {/* Téléphone : la même page en version mobile (décorative, décrite par l'alt ci-dessus). */}
        <div className="absolute top-[21%] left-[70.9%] w-[22.2%] rounded-[14px] bg-ink p-[3px] shadow-[0_18px_40px_rgb(0_0_0/0.35)] md:top-[19.2%] md:left-[71.6%] md:w-[19.1%] md:rounded-[34px] md:p-[7.5px]">
          <div className="relative aspect-[780/1688] overflow-hidden rounded-[11px] md:rounded-[27px]">
            <Image src="/pro/projets/ignobles-mobile.webp" alt="" fill sizes="(min-width: 768px) 153px, 64px" className="object-cover" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cx(box, "bg-ochre-soft")}>
      <Browser
        domain={project.domain}
        src="/pro/projets/adn-desktop.webp"
        alt={project.alt}
        className="top-[10.5%] left-[5.7%] w-[88.6%] rounded-[7px] md:top-[8%] md:left-[8%] md:w-[84%] md:rounded-xl"
      />
    </div>
  );
}

function ProjectCard({ project, external }: { project: Project; external: string }) {
  return (
    <li className={cx("flex shrink-0 snap-start flex-col gap-3.5 md:gap-[22px]", CARD_W)}>
      <Visual project={project} />
      <div className="flex flex-col gap-2.5 md:flex-row md:items-start md:gap-10">
        <div className="flex flex-1 flex-col gap-1.5 md:gap-2">
          <h3 className="display text-[24px] leading-[29px] tracking-[-0.015em] text-paper md:text-[34px] md:leading-10">
            {project.name}
          </h3>
          <p className="font-body text-sm leading-[18px] font-semibold text-sage-200">{project.meta}</p>
          <p className="body-sm md:body-md text-sage-050">{project.text}</p>
        </div>
        {project.link ? (
          <Button
            href={project.link.href}
            target="_blank"
            rel="noopener"
            variant="outline-inverse"
            size="pill"
            icon="external"
            className="self-start"
          >
            {project.link.label}
            <span className="sr-only"> {external}</span>
          </Button>
        ) : (
          <p className="body-sm max-w-[280px] text-sage-200 md:w-[220px]">{project.note}</p>
        )}
      </div>
    </li>
  );
}

export function Realisations({ t }: { t: ProContent["work"] }) {
  return (
    <Section
      id="realisations"
      tone="forest"
      tear={23}
      padded={false}
      aria-labelledby="realisations-title"
      className="pt-20 pb-[88px] md:pt-[130px] md:pb-[140px]"
    >
      <div className="flex flex-col gap-6 md:gap-12">
        <Container className="flex flex-col gap-2.5 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2 id="realisations-title" className="display-mobile-l md:display-m">
            {t.title}
          </h2>
          <p className="body-md md:body-lg max-w-[440px] text-sage-200 md:text-right">
            {t.intro[0]}
            <br />
            {t.intro[1]}
          </p>
        </Container>
        <WorkTrack label={t.trackLabel} prev={t.prev} next={t.next} count={t.projects.length}>
          {t.projects.map((project) => (
            <ProjectCard key={project.id} project={project} external={t.external} />
          ))}
        </WorkTrack>
      </div>
    </Section>
  );
}
