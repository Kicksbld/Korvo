import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { RichSegment } from "@/i18n/types";

/* ------------------------------------------------------------------ *
 * Korvo — primitives de page. Une règle 1px fait le travail d'une
 * ombre ; sage est le seul accent ; les légendes sont sous l'image.
 * ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  tone = "muted",
  className = "",
}: {
  children: ReactNode;
  tone?: "muted" | "strong" | "accent";
  className?: string;
}) {
  const color =
    tone === "strong"
      ? "var(--text-strong)"
      : tone === "accent"
        ? "var(--text-accent)"
        : "var(--text-muted)";
  return (
    <span className={`k-label block ${className}`} style={{ color }}>
      {children}
    </span>
  );
}

/** Titre de section : une équerre, le label, un tiret court — un repère
 * d'établi plutôt qu'un badge. Le tiret se trace au scroll comme un trait
 * de coupe. */
export function SectionRule({
  label,
  labelColor = "var(--text-accent)",
  lineColor = "var(--border-strong)",
}: {
  label: string;
  labelColor?: string;
  lineColor?: string;
}) {
  return (
    <div className="k-section-rule flex items-center gap-3" data-reveal>
      <span aria-hidden className="k-rule-mark" style={{ color: labelColor }} />
      <span className="k-label shrink-0" style={{ color: labelColor }}>
        {label}
      </span>
      <span className="k-rule-draw h-px w-12 shrink-0" style={{ background: lineColor }} />
    </div>
  );
}

/** Stack technique en une ligne interpointée — zéro chrome, juste l'info. */
export function TechList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <p className={`k-caption m-0 ${className}`} style={{ color: "var(--text-muted)" }}>
      {items.join(" · ")}
    </p>
  );
}

/** Photo-mot du manifeste : image à hauteur du corps insérée dans une phrase
 * en display. Purement illustrative (le texte porte le sens) — masquée aux
 * lecteurs d'écran. `revealIndex` échelonne l'apparition. */
export function WordImage({
  src,
  position,
  eager = false,
  revealIndex = 0,
}: {
  src: string;
  /** Cadrage dans la pill, ex. "top" pour ne montrer que le haut de l'image. */
  position?: string;
  /** À activer si la vignette peut être visible dès le chargement (LCP). */
  eager?: boolean;
  revealIndex?: number;
}) {
  return (
    <span
      aria-hidden
      className="k-word-img"
      style={{ "--reveal-i": revealIndex } as CSSProperties}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="200px"
        loading={eager ? "eager" : undefined}
        className="object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
    </span>
  );
}

/** Rend une phrase mixant texte simple et mots accentués (sage-700), sans
 * imposer d'ordre de mots : chaque langue fournit ses propres segments. */
export function Rich({
  segments,
  accentColor = "var(--sage-700)",
}: {
  segments: RichSegment[];
  accentColor?: string;
}) {
  return (
    <>
      {segments.map((s, i) =>
        s.accent ? (
          <span key={i} style={{ color: accentColor }}>
            {s.text}
          </span>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </>
  );
}

export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={`k-ui inline-block k-link ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/**
 * Image encadrée, sans légende — la photo parle seule. `ratio` pour un cadre
 * proportionnel, `heightClass` pour une hauteur fixe (grille de la galerie).
 */
export function Figure({
  src,
  alt,
  ratio,
  heightClass,
  sizes = "(max-width: 768px) 100vw, 45vw",
  priority = false,
  className = "",
  reveal = false,
  revealIndex = 0,
}: {
  src: string;
  alt: string;
  ratio?: string;
  heightClass?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Opt into a staggered scroll reveal (used by the photography gallery). */
  reveal?: boolean;
  revealIndex?: number;
}) {
  return (
    <figure
      className={`k-figure m-0 ${reveal ? "k-gallery-figure" : ""} ${className}`}
      {...(reveal ? { "data-reveal": true } : {})}
      style={reveal ? ({ "--reveal-i": revealIndex } as CSSProperties) : undefined}
    >
      <div
        className={`k-frame ${heightClass ?? ""}`}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    </figure>
  );
}

/** Entrée de timeline verticale : point sage sur une ligne continue,
 * période au-dessus du titre. `last` termine la ligne au dernier point. */
export function TimelineRow({
  period,
  title,
  children,
  last = false,
}: {
  period: string;
  title: string;
  children?: ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`k-reveal relative pl-8 md:pl-10 ${last ? "pb-0" : "pb-12"}`}
      data-reveal
      style={{ borderLeft: `1px solid ${last ? "transparent" : "var(--sage-200)"}` }}
    >
      <span
        aria-hidden
        className="absolute top-[4px] h-[9px] w-[9px] rounded-full"
        style={{
          left: -5,
          background: "var(--sage)",
          boxShadow: "0 0 0 3px var(--surface-page)",
        }}
      />
      <span className="k-label block" style={{ color: "var(--sage-700)" }}>
        {period}
      </span>
      <h3 className="k-title-3 mt-2 mb-0">{title}</h3>
      {children}
    </div>
  );
}

/** Carte de compétences : grande surface colorée du thème, icône cerclée
 * trait fin, titre serif, lignes interpointées courtes (niveau optionnel). */
export function SkillCard({
  icon,
  title,
  items,
  background,
  revealIndex = 0,
}: {
  icon: ReactNode;
  title: string;
  items: { label: string; level?: string }[];
  background: string;
  revealIndex?: number;
}) {
  return (
    <div
      className="k-gallery-figure flex flex-col p-8 md:p-10"
      data-reveal
      style={
        { background, borderRadius: "var(--radius-surface)", "--reveal-i": revealIndex } as CSSProperties
      }
    >
      <span
        aria-hidden
        className="inline-flex h-10 w-10 items-center justify-center rounded-full"
        style={{ border: "1px solid var(--ink)", color: "var(--ink)" }}
      >
        {icon}
      </span>
      <h3 className="k-title-1 mt-8 mb-0 md:mt-10">{title}</h3>
      <ul className="m-0 mt-6 flex list-none flex-col gap-3 p-0">
        {items.map((it) => (
          <li key={it.label} className="flex items-baseline justify-between gap-6">
            <span className="k-body-sm" style={{ color: "var(--ink-2)" }}>
              · {it.label}
            </span>
            {it.level ? (
              <span
                className="k-label whitespace-nowrap"
                style={{ color: "var(--sage-900)", lineHeight: 1.6 }}
              >
                {it.level}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
