"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { cx } from "./cx";
import { useSlidingPill } from "./motion/useSlidingPill";

/* Bascule à deux (ou plus) options, ex. « Annecy · € / Genève · CHF ».

   Groupe de boutons radio accessible : flèches gauche/droite pour changer,
   un seul arrêt de tabulation. Fond papier incrusté, option active en
   papier surélevé avec ombre douce.

   Contrôlé (`value` + `onChange`) ou non (`defaultValue`). La pastille
   glisse en ressort, interruptible (useSlidingPill). */

export type SegmentedOption<V extends string> = { value: V; label: string };

type SegmentedToggleProps<V extends string> = {
  options: ReadonlyArray<SegmentedOption<V>>;
  value?: V;
  defaultValue?: V;
  onChange?: (value: V) => void;
  /** Nom accessible du groupe (ex. « Devise des prix »). */
  label: string;
  className?: string;
};

export function SegmentedToggle<V extends string>({
  options,
  value,
  defaultValue,
  onChange,
  label,
  className,
}: SegmentedToggleProps<V>) {
  const [inner, setInner] = useState<V>(defaultValue ?? options[0].value);
  const current = value ?? inner;
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const root = useRef<HTMLDivElement>(null);
  const pill = useSlidingPill(root, refs, Math.max(0, options.findIndex((o) => o.value === current)));

  const select = (next: V) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const delta = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const nextIndex = (index + delta + options.length) % options.length;
    select(options[nextIndex].value);
    refs.current[nextIndex]?.focus();
  };

  return (
    <div
      ref={root}
      role="radiogroup"
      aria-label={label}
      className={cx(
        "group relative flex w-full gap-1 rounded-pill border border-border-faint bg-paper-inset p-1 md:inline-flex md:w-auto",
        "contrast-more:border-ink",
        className,
      )}
    >
      {/* Pastille : visible une fois mesurée (data-pill="ready"). */}
      <span
        ref={pill}
        aria-hidden="true"
        className="pointer-events-none absolute top-1 bottom-1 left-0 rounded-pill bg-paper-raised opacity-0 shadow-toggle will-change-transform group-data-[pill=ready]:opacity-100 contrast-more:border contrast-more:border-ink"
      />
      {options.map((option, index) => {
        const checked = option.value === current;
        return (
          <button
            key={option.value}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => select(option.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cx(
              // Mobile : segments égaux de 44 px de haut (cible tactile) ;
              // desktop : 40 px, largeur du libellé.
              "press relative flex h-11 flex-1 items-center justify-center whitespace-nowrap rounded-pill px-[18px] ui-small md:h-10 md:flex-none",
              // Avant hydratation, le bouton actif porte son fond ; ensuite, la pastille.
              checked
                ? "bg-paper-raised text-ink shadow-toggle group-data-[pill=ready]:bg-transparent group-data-[pill=ready]:shadow-none"
                : "text-ink-2 hover:text-ink",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
