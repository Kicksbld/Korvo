"use client";

import { useState } from "react";
import type { Currency, Need, Offer, ProContent } from "@/app/pro/content/types";
import { cx } from "../cx";
import { BrowserIcon, CheckIcon, ClockIcon } from "../icons";
import { SegmentedToggle } from "../SegmentedToggle";
import { Tabs, tabId, tabPanelId } from "../Tabs";

/* Partie interactive de la section Offres : onglets « besoin », bascule
   € / CHF, les deux offres de l'onglet actif et le bandeau Sérénité.

   États par défaut (maquette) : « Je veux gagner du temps » et €.
   Phase 2 : les changements sont instantanés. Le glissement en ressort,
   la mémorisation du choix et les paramètres ?besoin= / ?ville= arrivent
   en phase 3.

   Mise en page :
   - < 768 : cartes empilées (maquette 390) ;
   - 768–1279 : les deux mêmes cartes côte à côte ;
   - ≥ 1280 : un seul panneau à deux colonnes, prix à droite (maquette 1440). */

const ID = "offres";

function OfferCard({ offer, currency, from, second }: { offer: Offer; currency: Currency; from: string; second: boolean }) {
  return (
    <article
      className={cx(
        "flex flex-col gap-[18px] rounded-[24px] border border-border-faint bg-paper-raised p-7 text-ink",
        "xl:flex-1 xl:flex-row xl:gap-10 xl:rounded-none xl:border-0 xl:bg-transparent xl:p-12",
        second && "xl:border-l xl:border-border-faint",
      )}
    >
      <div className="flex flex-col gap-[18px] xl:min-w-0 xl:flex-1 xl:gap-4">
        <h3 className="display-xs xl:display-s">{offer.name}</h3>
        <p className="body-sm xl:body-md text-ink-3 xl:text-ink-2">{offer.description}</p>
        <div aria-hidden="true" className="h-px bg-border-faint xl:hidden" />
        <ul className="flex flex-col gap-2.5 xl:pt-2">
          {offer.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2.5 body-sm text-ink-2">
              <CheckIcon className="mt-0.5 shrink-0 text-sage" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      <p className="flex flex-col gap-0.5 pt-2.5 xl:shrink-0 xl:items-end xl:pt-0 xl:text-right">
        <span className="ui-small text-ink-3">{from}</span>
        <span className="display-s xl:display-m whitespace-nowrap">{offer.price[currency]}</span>
        {offer.priceNote ? (
          <span className="body-sm text-ink-3 xl:w-40">{offer.priceNote[currency]}</span>
        ) : null}
      </p>
    </article>
  );
}

export function OffersBoard({ t }: { t: ProContent["offers"] }) {
  const [need, setNeed] = useState<Need>("temps");
  const [currency, setCurrency] = useState<Currency>("eur");

  const needs: Need[] = ["site", "temps"];

  return (
    <>
      <div className="flex w-full flex-col items-center gap-6 md:flex-row md:flex-wrap md:justify-center">
        <Tabs
          idPrefix={ID}
          label={t.tabsLabel}
          value={need}
          onChange={setNeed}
          items={[
            { value: "site", label: t.tabs.site, icon: <BrowserIcon className="shrink-0" /> },
            { value: "temps", label: t.tabs.temps, icon: <ClockIcon className="shrink-0" /> },
          ]}
          className="-mx-1.5 w-[calc(100%+12px)] md:mx-0 md:w-auto"
        />
        <SegmentedToggle
          label={t.currencyLabel}
          value={currency}
          onChange={setCurrency}
          options={[
            { value: "eur", label: t.currencies.eur },
            { value: "chf", label: t.currencies.chf },
          ]}
        />
      </div>

      {needs.map((value) => (
        <div
          key={value}
          role="tabpanel"
          id={tabPanelId(ID, value)}
          aria-labelledby={tabId(ID, value)}
          hidden={value !== need}
          className={cx(
            "grid w-full gap-6 md:grid-cols-2",
            "xl:flex xl:gap-0 xl:overflow-hidden xl:rounded-surface xl:border xl:border-border-faint xl:bg-paper-raised xl:shadow-panel",
          )}
        >
          {t.groups[value].map((offer, i) => (
            <OfferCard key={offer.name} offer={offer} currency={currency} from={t.from} second={i === 1} />
          ))}
        </div>
      ))}

      {/* Bandeau Sérénité (jamais présenté comme de l'hébergement). */}
      <div className="flex w-full flex-col gap-3 rounded-card bg-forest px-7 py-[22px] lg:flex-row lg:items-center lg:gap-8">
        <h3 className="display-xs text-paper">{t.serenity.name}</h3>
        <p className="body-sm flex-1 text-sage-200">{t.serenity.text}</p>
        <p className="flex flex-col lg:items-end lg:text-right">
          <span className="body-strong whitespace-nowrap text-paper">{t.serenity.price[currency]}</span>
          <span className="body-sm text-sage-200">{t.serenity.note}</span>
        </p>
      </div>
    </>
  );
}
