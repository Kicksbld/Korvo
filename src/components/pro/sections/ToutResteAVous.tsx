import Image from "next/image";
import type { ProContent } from "@/app/pro/content/types";
import { Container } from "../Container";
import { cx } from "../cx";
import { CheckSmallIcon } from "../icons";
import { Section } from "../Section";

/* Tout reste à vous (Figma 211-44 desktop, 211-107 mobile) — ocre clair.

   Le trousseau gravé (illustration 3/4) et 4 étiquettes « à votre nom »
   reliées à l'anneau par des cordelettes. Deux scènes aux coordonnées
   Figma : 716 × 600 à partir de 1280, 350 × 540 en dessous. Puis le bloc
   « Mes engagements » (5 garanties). */

type Keys = ProContent["keys"];

/** Boîtes englobantes Figma (après rotation) et rotation de chaque étiquette. */
const TAGS_DESKTOP = [
  { left: -5.3, top: 40, width: 214.79, height: 90.46, rotate: 4 },
  { left: 506, top: 55.35, width: 214.79, height: 90.46, rotate: -4 },
  { left: 0, top: 409.01, width: 213.69, height: 86.89, rotate: -3 },
  { left: 500.92, top: 450, width: 214.79, height: 107.86, rotate: 3 },
] as const;

const TAGS_MOBILE = [
  { left: -6.77, top: 0, width: 166.38, height: 107.93, rotate: 4 },
  { left: 190, top: 36.84, width: 164.91, height: 86.98, rotate: -4 },
  { left: 0, top: 391.63, width: 164.86, height: 105.24, rotate: -3 },
  { left: 184.92, top: 440, width: 164.86, height: 105.24, rotate: 3 },
] as const;

type Box = { left: number; top: number; width: number; height: number; rotate: number };

function KeyTag({ label, note, box, width }: { label: string; note: string; box: Box; width: number }) {
  return (
    <li className="absolute flex items-center justify-center" style={{ left: box.left, top: box.top, width: box.width, height: box.height }}>
      <div
        className="relative flex shrink-0 flex-col gap-0.5 rounded-tag border border-border-strong bg-paper-raised pt-3.5 pr-4 pb-3 pl-[18px] shadow-tag"
        style={{ width, transform: `rotate(${box.rotate}deg)` }}
      >
        {/* Œillet de l'étiquette. */}
        <span aria-hidden="true" className="absolute top-[11px] right-[13px] size-2.5 rounded-full border border-border-strong bg-ochre-soft" />
        <span className="pr-5 font-body text-base leading-[21px] font-semibold text-ink">{label}</span>
        <span className="hand whitespace-nowrap text-ochre">{note}</span>
      </div>
    </li>
  );
}

function KeyRing({ t, variant }: { t: Keys; variant: "desktop" | "mobile" }) {
  const desktop = variant === "desktop";
  const boxes = desktop ? TAGS_DESKTOP : TAGS_MOBILE;
  return (
    <div
      className={cx(
        "relative shrink-0",
        desktop ? "hidden h-[600px] w-[716px] xl:block" : "mx-auto h-[540px] w-[350px] xl:hidden",
      )}
    >
      <Image
        src="/pro/gravures/cles.webp"
        alt=""
        width={512}
        height={512}
        sizes={desktop ? "380px" : "240px"}
        className={cx("engraving absolute", desktop ? "top-[110px] left-[168px] size-[380px]" : "top-[150px] left-[55px] size-60")}
      />
      <Image
        src={desktop ? "/pro/cles/cordelettes-desktop.svg" : "/pro/cles/cordelettes-mobile.svg"}
        alt=""
        width={desktop ? 716 : 350}
        height={desktop ? 600 : 540}
        unoptimized
        className="absolute top-0 left-0"
      />
      <ul>
        {t.tags.map((label, i) => (
          <KeyTag key={label} label={label} note={t.tagNote} box={boxes[i]} width={desktop ? 210 : 160} />
        ))}
      </ul>
    </div>
  );
}

export function ToutResteAVous({ t }: { t: Keys }) {
  const c = t.commitments;
  return (
    <Section id="vos-cles" tone="ochre" tear={41} aria-labelledby="cles-title">
      <Container className="flex flex-col gap-8 md:gap-16">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-14">
          <div className="flex flex-col gap-[22px] xl:max-w-[540px] xl:min-w-0 xl:flex-1">
            <h2 id="cles-title" className="display-mobile-l md:display-m max-w-[640px]">
              {t.title}
            </h2>
            <p className="body-md md:body-lg max-w-[640px] text-ink-2">{t.text}</p>
            <p className="body-sm md:body-md max-w-[640px] text-sepia">{t.aside}</p>
          </div>
          {/* Deux scènes, une seule visible : les étiquettes sont lues une fois. */}
          <KeyRing t={t} variant="mobile" />
          <KeyRing t={t} variant="desktop" />
        </div>

        <div className="flex flex-col gap-4 rounded-[22px] border border-border-faint bg-paper-raised px-5 py-6 md:gap-8 md:px-12 md:py-10 xl:flex-row xl:gap-14 xl:rounded-surface">
          <div className="flex flex-col gap-3 xl:w-[300px] xl:shrink-0">
            <h3 className="display-mobile-m md:display-s">{c.title}</h3>
            <p className="body-sm hidden text-ink-2 md:block">{c.text}</p>
          </div>
          <ul className="grid gap-3 md:grid-cols-2 md:gap-x-10 md:gap-y-6 xl:flex-1">
            {c.items.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span aria-hidden="true" className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-sage-050 text-sage-900">
                  <CheckSmallIcon />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-body text-base leading-[21px] font-semibold text-ink">{item.title}</span>
                  <span className="hidden font-body text-sm leading-[19px] text-ink-2 md:block">{item.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
