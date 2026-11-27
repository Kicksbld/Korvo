"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { cx } from "./cx";

/* Bascule à deux (ou plus) options, ex. « Annecy · € / Genève · CHF ».

   Groupe de boutons radio accessible : flèches gauche/droite pour changer,
   un seul arrêt de tabulation. Fond papier incrusté, option active en
   papier surélevé avec ombre douce.

   Contrôlé (`value` + `onChange`) ou non (`defaultValue`). Le glissement
   en ressort de la pastille arrive en phase 3. */

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
      role="radiogroup"
      aria-label={label}
      className={cx("flex w-full gap-1 rounded-pill border border-border-faint bg-paper-inset p-1 md:inline-flex md:w-auto", className)}
    >
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
              "flex h-11 flex-1 items-center justify-center whitespace-nowrap rounded-pill px-[18px] ui-small md:h-10 md:flex-none",
              "transition-[background-color,box-shadow,color] duration-150 ease-out",
              checked ? "bg-paper-raised text-ink shadow-toggle" : "text-ink-2 hover:text-ink",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
