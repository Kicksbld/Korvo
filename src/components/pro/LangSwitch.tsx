import type { Locale } from "@/i18n/config";
import { cx } from "./cx";

/* Sélecteur FR / EN de la barre du haut : deux libellés nus, la langue
   active en encre soulignée d'un filet sauge, l'autre en gris. Zones
   tactiles de 36 × 44 px. Chaque lien mène à la même page dans l'autre
   langue (les href sont calculés par l'appelant). */

type LangSwitchProps = {
  current: Locale;
  hrefs: Record<Locale, string>;
  /** Nom accessible du groupe (« Langue »). */
  label: string;
  /** Nom complet de chaque langue (« Français », « English »). */
  names: Record<Locale, string>;
  tone?: "ink" | "paper";
  className?: string;
};

const ORDER: Locale[] = ["fr", "en"];

export function LangSwitch({ current, hrefs, label, names, tone = "ink", className }: LangSwitchProps) {
  return (
    <nav aria-label={label} className={cx("flex items-center gap-1", className)}>
      {ORDER.map((lang) => {
        const active = lang === current;
        return (
          <a
            key={lang}
            href={hrefs[lang]}
            hrefLang={lang}
            lang={lang}
            aria-current={active ? "true" : undefined}
            className={cx(
              "flex h-11 w-9 flex-col items-center justify-center gap-[3px]",
              "font-body text-[15px] font-semibold uppercase leading-normal",
              active
                ? tone === "ink"
                  ? "text-ink"
                  : "text-paper"
                : tone === "ink"
                  ? "text-ink-3 hover:text-ink-2"
                  : "text-sage-200 hover:text-paper",
            )}
          >
            <span aria-hidden="true">{lang}</span>
            <span className="sr-only">{names[lang]}</span>
            <span
              aria-hidden="true"
              className={cx("h-[1.5px] w-[18px]", active ? (tone === "ink" ? "bg-sage" : "bg-sage-200") : "bg-transparent")}
            />
          </a>
        );
      })}
    </nav>
  );
}
