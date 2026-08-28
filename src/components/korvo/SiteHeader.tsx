"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSocials } from "@/components/korvo/socials";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

/* Switch de langue — deux libellés nus, la langue active soulignée d'un
   filet sage 1px (vocabulaire des liens actifs). FR vit à la racine, EN
   sous /en : de vraies routes, pas un état client. */
function LangSwitch({
  lang,
  ariaLabel,
  className = "",
}: {
  lang: Locale;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <div className={`k-lang ${className}`} role="group" aria-label={ariaLabel}>
      <Link href="/" data-on={lang === "fr"} aria-pressed={lang === "fr"}>
        FR
      </Link>
      <Link href="/en" data-on={lang === "en"} aria-pressed={lang === "en"}>
        EN
      </Link>
    </div>
  );
}

/** En-tête 64px, papier : marque centrée (à gauche sur mobile), switch de
 *  langue, et un seul bouton « Menu » qui ouvre le sommaire plein écran.
 *  Pas d'ombre, pas de flou — une règle 1px qui s'affirme au défilement. */
export default function SiteHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const LINKS = [
    { id: "projets", label: dict.header.nav.projets },
    { id: "maker", label: dict.header.nav.maker },
    { id: "parcours", label: dict.header.nav.parcours },
    { id: "competences", label: dict.header.nav.competences },
    { id: "photographie", label: dict.header.nav.photographie },
    { id: "contact", label: dict.header.nav.contact },
  ];
  const SOCIALS = getSocials(dict.footer.phoneLabel);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Échap referme le sommaire.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <header
      className="k-header k-header-grid sticky top-0 z-100 h-16 px-6 md:px-16"
      data-scrolled={scrolled}
    >
      <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center">
        <LangSwitch
          lang={lang}
          ariaLabel={dict.header.langAria}
          className="hidden lg:col-start-1 lg:row-start-1 lg:inline-flex lg:justify-self-start"
        />

        <a
          href="#top"
          className="col-start-1 row-start-1 justify-self-start uppercase lg:col-start-2 lg:justify-self-center"
          onClick={close}
          style={{
            font: "400 18px/1 var(--font-display)",
            letterSpacing: "0.2em",
            color: "var(--text-strong)",
          }}
        >
          {dict.header.brand}
        </a>

        <button
          type="button"
          className="k-menu-btn col-start-3 row-start-1 justify-self-end"
          data-open={menuOpen}
          aria-expanded={menuOpen}
          aria-controls="site-index"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="k-label" style={{ letterSpacing: "0.1em" }}>
            {menuOpen ? dict.header.menuClose : dict.header.menuOpen}
          </span>
          <span className="k-menu-icon" aria-hidden>
            <span />
            <span />
          </span>
        </button>
      </div>

      {/* Sommaire — un index de revue : numéros en petit, titres en display,
          un filet par entrée. Le pied donne la dispo, le contact et les
          réseaux ; le switch de langue y vit sur mobile. */}
      <nav
        id="site-index"
        aria-label={dict.header.indexAria}
        className="k-index-panel"
        data-open={menuOpen}
        aria-hidden={!menuOpen}
      >
        <div
          className="mx-auto flex h-full max-w-[1180px] flex-col overflow-y-auto overscroll-contain px-6 pt-2 md:px-16 lg:pt-6"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 28px)" }}
        >
          <ol className="m-0 list-none p-0">
            {LINKS.map(({ id, label }, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="k-index-link"
                  style={{ ["--reveal-i" as string]: i }}
                  data-active={active === id}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={close}
                >
                  <span className="k-index-num">{String(i + 1).padStart(2, "0")}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>

          <div
            className="k-index-foot mt-auto flex flex-col items-start gap-6 pt-9 lg:flex-row lg:items-end lg:justify-between"
            style={{ ["--reveal-i" as string]: LINKS.length }}
          >
            <div className="flex flex-col items-start gap-4">
              <p
                className="k-label m-0 flex items-center gap-2.5"
                style={{ color: "var(--live-text)" }}
              >
                <span
                  className="k-live-dot h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--live-dot)" }}
                />
                {dict.header.available}
              </p>
              <a
                href="mailto:killian.boularand@icloud.com"
                className="k-text-link"
                style={{ font: "600 15px/1.3 var(--font-body)", color: "var(--text-strong)" }}
                tabIndex={menuOpen ? 0 : -1}
              >
                killian.boularand@icloud.com
              </a>
              <a
                href="https://obrado.app/cto"
                target="_blank"
                rel="noreferrer"
                className="k-text-link"
                style={{ font: "600 14px/1.3 var(--font-body)", color: "var(--text-muted)" }}
                tabIndex={menuOpen ? 0 : -1}
              >
                {dict.header.cvLink}
              </a>
            </div>

            <div className="flex w-full items-center justify-between gap-4 lg:w-auto">
              <div className="flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    aria-label={s.label}
                    className="k-social k-social--ink"
                    tabIndex={menuOpen ? 0 : -1}
                    {...(s.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <LangSwitch lang={lang} ariaLabel={dict.header.langAria} className="lg:hidden" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
