import Image from "next/image";
import type { ReactNode } from "react";

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

/** Titre de section : label tracké + règle sable pleine largeur. */
export function SectionRule({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="k-label shrink-0" style={{ color: "var(--text-strong)" }}>
        {label}
      </span>
      <span className="h-px flex-1" style={{ background: "var(--border-strong)" }} />
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span
      className="k-body-sm inline-flex items-center rounded-full px-3 py-1"
      style={{
        border: "1px solid var(--border-default)",
        color: "var(--text-body)",
        fontSize: 13,
        lineHeight: 1.2,
      }}
    >
      {children}
    </span>
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
 * Image encadrée + légende. `ratio` pour un cadre proportionnel,
 * `heightClass` pour une hauteur fixe (grille éditoriale de la galerie).
 */
export function Figure({
  src,
  alt,
  caption,
  ratio,
  heightClass,
  sizes = "(max-width: 768px) 100vw, 45vw",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio?: string;
  heightClass?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`m-0 ${className}`}>
      <div
        className={`k-frame ${heightClass ?? ""}`}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      {caption ? <figcaption className="k-caption mt-2.5">{caption}</figcaption> : null}
    </figure>
  );
}

export function TimelineRow({
  period,
  title,
  children,
}: {
  period: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div
      className="grid gap-3 py-9 md:grid-cols-[190px_1fr] md:gap-8"
      style={{ borderBottom: "1px solid var(--border-faint)" }}
    >
      <span className="k-label" style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>
        {period}
      </span>
      <div>
        <h3 className="k-title-3 m-0">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export function SkillRow({
  label,
  level,
  first = false,
  last = false,
}: {
  label: string;
  level?: string;
  first?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className="flex justify-between gap-6 py-3"
      style={{
        borderTop: `1px solid ${first ? "var(--border-default)" : "var(--border-faint)"}`,
        borderBottom: last ? "1px solid var(--border-faint)" : undefined,
      }}
    >
      <span className="k-body-sm" style={{ color: "var(--text-body)" }}>
        {label}
      </span>
      {level ? (
        <span
          className="k-label whitespace-nowrap"
          style={{ color: "var(--text-muted)", lineHeight: 1.6 }}
        >
          {level}
        </span>
      ) : null}
    </div>
  );
}
