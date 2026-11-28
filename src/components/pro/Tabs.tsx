"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cx } from "./cx";
import { useSlidingPill } from "./motion/useSlidingPill";

/* Onglets en pilule sur fond vert forêt (« J'ai besoin d'un site » /
   « Je veux gagner du temps »), avec icône.

   Ce composant ne rend que la liste d'onglets (role="tablist") : la section
   qui l'utilise affiche le panneau correspondant et lui donne l'id
   `${idPrefix}-panel-${value}`. Flèches gauche/droite, Début/Fin.
   Contrôlé (`value` + `onChange`) ou non (`defaultValue`). La pastille
   glisse en ressort, interruptible (useSlidingPill). En mobile, la liste prend toute la largeur. */

export type TabItem<V extends string> = { value: V; label: string; icon?: ReactNode };

type TabsProps<V extends string> = {
  items: ReadonlyArray<TabItem<V>>;
  value?: V;
  defaultValue?: V;
  onChange?: (value: V) => void;
  /** Nom accessible de la liste (ex. « Votre besoin »). */
  label: string;
  /** Préfixe des id des onglets et panneaux. */
  idPrefix: string;
  className?: string;
};

export const tabId = (idPrefix: string, value: string) => `${idPrefix}-tab-${value}`;
export const tabPanelId = (idPrefix: string, value: string) => `${idPrefix}-panel-${value}`;

export function Tabs<V extends string>({ items, value, defaultValue, onChange, label, idPrefix, className }: TabsProps<V>) {
  const [inner, setInner] = useState<V>(defaultValue ?? items[0].value);
  const current = value ?? inner;
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const root = useRef<HTMLDivElement>(null);
  const pill = useSlidingPill(root, refs, Math.max(0, items.findIndex((i) => i.value === current)));

  const select = (next: V) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = -1;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % items.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = items.length - 1;
    if (nextIndex < 0) return;
    event.preventDefault();
    select(items[nextIndex].value);
    refs.current[nextIndex]?.focus();
  };

  return (
    <div
      ref={root}
      role="tablist"
      aria-label={label}
      className={cx("group relative flex max-w-full gap-1.5 rounded-pill bg-forest p-1.5 md:inline-flex contrast-more:border contrast-more:border-paper", className)}
    >
      {/* Pastille : visible une fois mesurée (data-pill="ready"). */}
      <span
        ref={pill}
        aria-hidden="true"
        className="pointer-events-none absolute top-1.5 bottom-1.5 left-0 rounded-pill bg-forest-2 opacity-0 will-change-transform group-data-[pill=ready]:opacity-100 contrast-more:border contrast-more:border-paper"
      />
      {items.map((item, index) => {
        const selected = item.value === current;
        return (
          <button
            key={item.value}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={tabId(idPrefix, item.value)}
            aria-selected={selected}
            aria-controls={tabPanelId(idPrefix, item.value)}
            tabIndex={selected ? 0 : -1}
            onClick={() => select(item.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cx(
              // Mobile (maquette 390) : 14 px, padding resserré, les libellés
              // peuvent passer sur deux lignes sur les très petits écrans.
              "press relative flex min-h-11 flex-auto items-center justify-center gap-2 rounded-pill px-4 py-[13px] text-left ui-small",
              "md:flex-none md:whitespace-nowrap md:px-[26px] md:py-3.5 md:ui-button",
              // Avant hydratation, l'onglet actif porte son fond ; ensuite, la pastille.
              selected ? "bg-forest-2 text-paper group-data-[pill=ready]:bg-transparent" : "text-sage-200 hover:text-paper",
            )}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
