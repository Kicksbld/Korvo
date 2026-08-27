"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { id: "projets", label: "Projets" },
  { id: "maker", label: "Maker" },
  { id: "parcours", label: "Parcours" },
  { id: "competences", label: "Compétences" },
  { id: "contact", label: "Contact" },
];

/** En-tête 72px, papier, séparé par une règle 1px. Pas d'ombre, pas de flou. */
export default function SiteHeader() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -55% 0px" },
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="sticky top-0 z-100 flex h-[72px] items-center gap-6 px-6 md:gap-10 md:px-16"
      style={{
        background: "var(--surface-page)",
        borderBottom: "1px solid var(--border-faint)",
      }}
    >
      <a
        href="#top"
        className="uppercase"
        style={{
          font: "400 19px/1 var(--font-display)",
          letterSpacing: "0.2em",
          color: "var(--text-strong)",
        }}
      >
        Korvo
      </a>

      <nav className="ml-auto hidden items-center gap-7 lg:flex">
        {LINKS.map(({ id, label }) => {
          const on = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              style={{
                font: "600 13px/1 var(--font-body)",
                color: on ? "var(--text-strong)" : "var(--text-muted)",
                borderBottom: on ? "1px solid var(--border-ink)" : "0",
                paddingBottom: on ? 3 : 0,
                transition: "color var(--dur-fast) var(--ease-standard)",
              }}
            >
              {label}
            </a>
          );
        })}
      </nav>

      <div
        className="ml-auto flex items-center gap-4 lg:ml-0 lg:pl-6"
        style={{ borderLeft: "1px solid var(--border-faint)" }}
      >
        <a
          href="https://obrado.app/cto"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-block"
          style={{
            font: "600 13px/1 var(--font-body)",
            color: "var(--text-strong)",
            borderBottom: "1px solid var(--sage-200)",
            paddingBottom: 2,
          }}
        >
          Mon portfolio
        </a>
        <a className="k-btn k-btn--sm" href="mailto:killian.boularand@icloud.com">
          Prendre contact
        </a>
        <div className="hidden items-center gap-1.5 sm:flex">
          <span
            className="k-label"
            style={{ color: "var(--text-strong)", letterSpacing: "0.14em" }}
          >
            FR
          </span>
          <span className="h-3 w-px" style={{ background: "var(--border-default)" }} />
          <span
            title="Version anglaise à venir"
            className="k-label cursor-not-allowed"
            style={{ color: "var(--text-faint)", opacity: 0.4 }}
          >
            EN
          </span>
        </div>
      </div>
    </header>
  );
}
