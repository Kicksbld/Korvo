"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { id: "projets", label: "Projets" },
  { id: "parcours", label: "Parcours" },
  { id: "contact", label: "Contact" },
];

/** En-tête 64px, papier : langue à gauche, marque centrée, nav réduite à
 *  droite. Pas d'ombre, pas de flou — une règle 1px. */
export default function SiteHeader() {
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -55% 0px" },
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Referme le panneau mobile dès que la route ancre change (clic sur un lien).
  useEffect(() => {
    setMenuOpen(false);
  }, [active]);

  return (
    <header
      className="k-header-grid sticky top-0 z-100 h-16 px-6 md:px-16"
      style={{
        background: "var(--surface-page)",
        borderBottom: "1px solid var(--border-faint)",
      }}
    >
      <div className="relative flex h-full items-center">
        <div className="flex items-center gap-1.5">
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

        <a
          href="#top"
          className="absolute left-1/2 -translate-x-1/2 uppercase"
          style={{
            font: "400 18px/1 var(--font-display)",
            letterSpacing: "0.2em",
            color: "var(--text-strong)",
          }}
        >
          Korvo
        </a>

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {LINKS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className="k-nav-link" data-active={active === id}>
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="k-menu-btn ml-auto lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
            {menuOpen ? (
              <path
                d="M1 1L19 13M19 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M0 1H20M0 7H20M0 13H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      <nav
        id="mobile-nav"
        className="k-mobile-panel flex flex-col gap-1 px-6 py-6 lg:hidden"
        data-open={menuOpen}
        aria-hidden={!menuOpen}
      >
        {LINKS.map(({ id, label }, i) => (
          <a
            key={id}
            href={`#${id}`}
            className="k-nav-link border-b py-4"
            style={{
              borderColor: "var(--border-faint)",
              font: "600 16px/1 var(--font-body)",
              ["--reveal-i" as string]: i,
            }}
            data-active={active === id}
            tabIndex={menuOpen ? 0 : -1}
          >
            {label}
          </a>
        ))}
        <a
          href="https://obrado.app/cto"
          target="_blank"
          rel="noreferrer"
          className="k-nav-link py-4"
          style={{ font: "600 16px/1 var(--font-body)", ["--reveal-i" as string]: LINKS.length }}
          tabIndex={menuOpen ? 0 : -1}
        >
          Mon portfolio ↗
        </a>
      </nav>
    </header>
  );
}
