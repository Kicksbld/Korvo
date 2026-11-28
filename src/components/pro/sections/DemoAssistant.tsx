import Image from "next/image";
import type { ProContent } from "@/app/pro/content/types";
import { Container } from "../Container";
import { cx } from "../cx";
import { CheckIcon, CloseIcon, SendIcon } from "../icons";
import { Section } from "../Section";
import { Words } from "../Words";
import { TypingPlaceholder } from "./TypingPlaceholder";

/* Démo assistant (Figma 207-750 desktop, 207-1354 mobile) — papier.

   Phase 2 : interface figée, avec la conversation de la maquette et
   l'étiquette « Démo » toujours visible. Phase 3 : le champ affiche des
   questions d'exemple qui s'écrivent seules (TypingPlaceholder), pour
   inviter à essayer. Rien n'est cliquable : les faux
   boutons et le faux champ sont masqués aux lecteurs d'écran, la
   conversation reste lisible. L'assistant réel arrive en phase 5.

   - ≥ 1280 : texte | téléphone (21:47, volet ouvert sur la page) | « Ce qu'il fait »
   - < 1280 : texte, puis le volet seul (maquette 390), puis la liste (≥ 768). */

type Demo = ProContent["demo"];

function AssistantPanel({ t, variant }: { t: Demo["assistant"]; variant: "phone" | "card" }) {
  const inPhone = variant === "phone";
  return (
    <div
      className={cx(
        "flex w-full flex-col overflow-hidden bg-paper-raised text-ink",
        inPhone
          ? "rounded-t-[28px] shadow-[0_-6px_30px_rgb(0_0_0/0.18)]"
          : "rounded-surface border border-border-default contrast-more:border-ink shadow-[0_16px_36px_rgb(26_20_10/0.12)]",
      )}
    >
      <div aria-hidden="true" className="flex justify-center pt-2 pb-1">
        <span className="h-[5px] w-9 rounded-[3px] bg-border-strong" />
      </div>

      <div className="flex items-center gap-2.5 border-b border-border-faint contrast-more:border-ink pt-2 pr-3.5 pb-3 pl-[18px]">
        <Image src="/pro/photos/killian-avatar.webp" alt="" width={34} height={34} className="size-[34px] shrink-0 rounded-full object-cover" />
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="font-body text-[15px] leading-[19px] font-semibold">{t.name}</p>
          <p className="font-body text-xs leading-4 text-ink-3">{t.badge}</p>
        </div>
        <span aria-hidden="true" className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-paper-sunken text-ink-2">
          <CloseIcon />
        </span>
      </div>

      <div className="flex flex-col gap-3.5 px-[18px] pt-4 pb-3 font-body text-sm text-ink-2">
        <div className="flex justify-end">
          <p className="max-w-[245px] rounded-[18px] rounded-br-[6px] bg-sage-900 px-3.5 py-2.5 leading-5 text-paper">{t.question}</p>
        </div>
        <p className="leading-[21px]">{t.answer}</p>
        <div className="flex items-center gap-3 rounded-[14px] border border-border-default contrast-more:border-ink bg-paper px-3.5 py-3">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="display text-lg leading-[22px] tracking-[-0.01em] text-ink">{t.offer.name}</p>
            <p className="text-xs leading-4 text-ink-3">{t.offer.delay}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end">
            <p className="text-[15px] leading-[19px] font-semibold text-ink">{t.offer.price}</p>
            <p className="text-xs leading-4 text-ink-3">{t.offer.priceAlt}</p>
          </div>
        </div>
        <p className="leading-[21px]">{t.followUp}</p>
        <div aria-hidden="true" className="flex flex-wrap gap-2">
          <span className="flex h-10 items-center rounded-pill bg-ink px-3.5 font-semibold text-paper">{t.actions[0]}</span>
          <span className="flex h-10 items-center rounded-pill border border-ink px-3.5 font-semibold text-ink">{t.actions[1]}</span>
        </div>
      </div>

      <div aria-hidden="true" className={cx("flex items-center gap-2 pt-2.5 pr-2.5 pl-3.5", inPhone ? "pb-2" : "pb-3.5")}>
        {/* Le champ montre des questions d'exemple qui s'écrivent seules :
            on comprend tout de suite qu'on peut parler à l'assistant. */}
        <span className="flex h-[42px] min-w-0 flex-1 items-center rounded-pill bg-paper px-4 font-body text-sm text-ink-2 ring-[1.5px] ring-sage">
          <TypingPlaceholder texts={t.examples} />
        </span>
        <span className="flex size-[42px] shrink-0 items-center justify-center rounded-full bg-sage-900 text-paper">
          <SendIcon />
        </span>
      </div>

      {inPhone ? (
        <div aria-hidden="true" className="flex justify-center pt-1.5 pb-2">
          <span className="h-[5px] w-[124px] rounded-[3px] bg-ink" />
        </div>
      ) : null}
    </div>
  );
}

/** Téléphone réaliste : le volet de l'assistant ouvert sur la page Korvo. */
function Phone({ t }: { t: Demo }) {
  return (
    <div className="relative h-[740px] w-[360px] shrink-0 overflow-hidden rounded-[58px] border-[2.5px] border-[#6b6963] bg-[#1c1c1f] shadow-[0_40px_70px_rgb(26_20_10/0.25)]">
      <div className="paper-texture absolute top-[7.5px] left-[7.5px] h-[720px] w-[340px] overflow-hidden rounded-[48px] bg-paper">
        {/* Page Korvo, derrière le volet (décor). */}
        <div aria-hidden="true" className="flex flex-col gap-3.5 px-[22px] pt-16">
          <p className="display text-[15px] leading-[18px] tracking-[-0.01em]">{t.phone.brand}</p>
          <p className="display text-[34px] leading-[38px] tracking-[-0.02em]">{t.phone.title}</p>
          <p className="font-body text-sm leading-5 text-ink-2">{t.phone.text}</p>
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-[rgb(26_26_20/0.32)]" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-[50px] items-center justify-between pr-6 pl-[30px]">
          <span className="font-body text-[15px] leading-6 font-semibold text-ink">{t.phone.time}</span>
          <Image src="/pro/demo/barre-etat.svg" alt="" width={68} height={12} unoptimized />
        </div>
        <div aria-hidden="true" className="absolute top-[11px] left-[114px] h-8 w-28 rounded-2xl bg-ink" />
        <div className="absolute inset-x-0 bottom-0">
          <AssistantPanel t={t.assistant} variant="phone" />
        </div>
      </div>
    </div>
  );
}

function Features({ t, className }: { t: Demo; className?: string }) {
  return (
    <div className={cx("flex flex-col gap-3.5", className)}>
      <h3 className="ui-small text-sage-700">{t.featuresTitle}</h3>
      <ul className="flex flex-col gap-3.5">
        {t.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 body-md text-ink-2">
            <CheckIcon className="mt-1.5 shrink-0 text-sage" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DemoAssistant({ t }: { t: Demo }) {
  return (
    <Section id="demo" tone="paper" tear={37} aria-labelledby="demo-title">
      <Container className="flex flex-col gap-7 md:gap-12 xl:flex-row xl:items-center xl:justify-center xl:gap-[72px]">
        <div className="flex flex-col gap-5 pt-6 md:pt-0 xl:w-[380px] xl:shrink-0">
          <h2 data-reveal="title" id="demo-title" className="display-mobile-l md:display-m">
            <Words lines={t.title} />
          </h2>
          <p className="body-md hidden max-w-[480px] text-ink-2 md:block">{t.intro}</p>
        </div>

        <figure aria-label={t.figureLabel} className="m-0 w-full md:mx-auto md:max-w-[440px] xl:mx-0 xl:w-auto xl:max-w-none">
          <div className="xl:hidden">
            <AssistantPanel t={t.assistant} variant="card" />
          </div>
          <div className="hidden xl:block">
            <Phone t={t} />
          </div>
        </figure>

        <Features t={t} className="hidden md:mx-auto md:flex md:w-full md:max-w-[440px] xl:mx-0 xl:w-[300px] xl:shrink-0" />
      </Container>
    </Section>
  );
}
