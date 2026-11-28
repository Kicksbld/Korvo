import type { CSSProperties } from "react";
import Image from "next/image";
import type { Problem, ProContent } from "@/app/pro/content/types";
import { Button } from "../Button";
import { Container } from "../Container";
import { cx } from "../cx";
import { HeroCarousel } from "./HeroCarousel";
import { HeroParallax } from "./HeroParallax";
import { Words } from "../Words";

/* Hero (Figma 207-570 desktop, 207-1207 mobile).

   Texte centré, puis une « scène » : paysage du lac gravé, photo en arche.
   - ≥ 1280 px (xl) : la scène de la maquette desktop, 1440 × 640, centrée.
     Les 4 cartes-problèmes et les pointillés qui les relient à la photo sont
     posés en absolu, aux coordonnées exactes de Figma. Entre 1280 et 1440 la
     scène est rognée sur les bords (cartes à ≥ 10 px du bord).
   - < 1280 px : la composition mobile — photo seule sur le paysage, puis le
     carrousel « Vous vous reconnaissez ? » (HeroCarousel).

   Mouvement (une seule fois, au chargement) : le titre monte mot à mot,
   puis chaque carte-problème est « posée sur la table » quand elle arrive
   à l'écran : celles du haut au chargement, celles du bas au défilement
   (pro-motion.css, .drop-card ; RevealObserver). En desktop, elles suivent
   ensuite légèrement la souris (HeroParallax, ± 4 px). En mobile, les
   cartes du carrousel se posent ensemble quand il arrive à l'écran.
   Aucun flottement en boucle.

   Le paysage occupe toute la largeur (au-delà de 1440 aussi) et garde sa
   proportion ; il est ancré en bas de la scène, comme dans Figma où ~16 % de
   l'image (13 % en mobile) passe sous la déchirure. */

/** Cartes desktop : boîte englobante Figma (après rotation) et rotation. */
const DESKTOP_CARDS = [
  { left: 127.28, top: 40, width: 332.609, height: 112.603, rotate: 1.5, depth: 4 },
  { left: 100, top: 293.09, width: 332.148, height: 112.888, rotate: -1.2, depth: 2.5 },
  { left: 990, top: 21.36, width: 332.609, height: 112.603, rotate: -1.5, depth: 3 },
  { left: 1017.36, top: 290, width: 332.566, height: 132.883, rotate: 1.2, depth: 4 },
] as const;


type ProblemCardProps = { problem: Problem; className?: string; style?: CSSProperties };

function ProblemCard({ problem, className, style }: ProblemCardProps) {
  return (
    <div
      style={style}
      className={cx(
        "flex flex-col gap-1.5 rounded-card border border-border-default contrast-more:border-ink bg-paper-raised pt-4 pb-[18px] shadow-card",
        className,
      )}
    >
      <p className="font-body text-[17px] leading-[22px] font-semibold text-ink">{problem.title}</p>
      <p className="font-body text-[15px] leading-5 text-sage-900">{problem.text}</p>
    </div>
  );
}

export function Hero({ t }: { t: ProContent["hero"] }) {
  return (
    <div data-pro-hero className="paper-texture overflow-hidden bg-paper pt-16 md:pt-20">
      {/* — Texte — (pt : hauteur de la barre du haut, posée par-dessus) */}
      <Container className="flex flex-col items-center gap-5 pt-9 text-center md:gap-7 md:pt-[72px]">
        <p className="body-sm md:body-md text-ink-2">
          <span className="md:hidden">{t.kickerShort}</span>
          <span className="hidden md:inline">{t.kicker}</span>
        </p>
        <h1 className="words-load display-mobile-xl md:display-xl max-w-[350px] md:max-w-[1100px]">
          <Words lines={t.title} suffix={<span className="text-bronze">.</span>} />
        </h1>
        <p className="body-md md:body-lg max-w-[340px] text-ink-2 md:max-w-[640px]">
          {t.subtitle}
        </p>
        <div className="flex w-full flex-col gap-5 sm:w-auto sm:flex-row sm:gap-3">
          <Button href="#contact">{t.ctaPrimary}</Button>
          <Button href="#offres" variant="outline">
            {t.ctaSecondary}
          </Button>
        </div>
      </Container>

      {/* — Scène — */}
      <div className="relative mt-0 h-[440px] max-xl:overflow-hidden md:mt-2 md:h-[600px] xl:mt-0 xl:h-[640px]">
        {/* Paysage du lac gravé (illustration 1/4).
            Positionné directement sur l'image, sans conteneur : un parent
            avec opacité ou transformation isolerait l'image et le multiply
            ne se ferait plus avec le papier (on verrait son fond).
            Fondu en haut partout ; en dessous de 1280, fondu aussi en bas,
            là où la scène le coupe, pour laisser le titre sur le papier. */}
        <Image
          src="/pro/gravures/lac-encre.webp"
          alt=""
          width={1792}
          height={768}
          sizes="(min-width: 780px) 100vw, 780px"
          className={cx(
            "engraving pointer-events-none absolute bottom-0 left-1/2 h-auto w-[max(780px,100%)] max-w-none -translate-x-1/2 translate-y-[13%] opacity-95",
            "[mask-image:linear-gradient(to_bottom,transparent,black_22%,black_76%,transparent_87%)]",
            "xl:translate-y-[15.7%] xl:[mask-image:linear-gradient(to_bottom,transparent,black_22%)]",
          )}
        />

        {/* Scène desktop, aux coordonnées Figma (1440 × 640). */}
        <HeroParallax className="absolute inset-y-0 left-1/2 w-[1440px] -translate-x-1/2">
          {/* Pointillés cartes → photo (desktop seulement). */}
          <div aria-hidden="true" className="hidden xl:block">
            <Image
              src="/pro/hero/liens-a.svg"
              alt=""
              width={589.4}
              height={311.4}
              unoptimized
              className="absolute top-[81.3px] left-[431.3px]"
            />
            <Image
              src="/pro/hero/liens-b.svg"
              alt=""
              width={594}
              height={317}
              unoptimized
              className="absolute top-[79px] left-[429px]"
            />
          </div>

          {/* Photo en arche : 270 × 380 en mobile, 360 × 500 à partir de 768. */}
          <div className="absolute top-10 left-1/2 h-[380px] w-[270px] -translate-x-1/2 overflow-hidden rounded-t-[135px] md:top-[70px] md:h-[500px] md:w-[360px] md:rounded-t-[180px] md:shadow-photo">
            <Image
              src="/pro/photos/killian-hero.webp"
              alt={t.photoAlt}
              fill
              sizes="(min-width: 768px) 360px, 270px"
              fetchPriority="high"
              loading="eager"
              className="object-cover"
            />
          </div>

          {/* Cartes-problèmes autour de la photo (desktop). */}
          <section aria-label={t.problemsTitle} className="hidden xl:block">
            <ul>
              {t.problems.map((problem, i) => {
                const box = DESKTOP_CARDS[i];
                return (
                  <li
                    key={problem.title}
                    data-reveal="card"
                    className="drop-card absolute flex items-center justify-center"
                    style={
                      {
                        left: box.left,
                        top: box.top,
                        width: box.width,
                        height: box.height,
                        // Arrive plus tournée, dans le sens de sa rotation finale.
                        "--drop-r": `${Math.sign(box.rotate) * 7}deg`,
                      } as CSSProperties
                    }
                  >
                    <ProblemCard
                      problem={problem}
                      className="w-[330px] shrink-0 px-5"
                      // Rotation relevée dans Figma ; décalage vers la souris (± depth px).
                      style={{
                        transform: `rotate(${box.rotate}deg)`,
                        translate: `calc(var(--mx, 0) * ${box.depth}px) calc(var(--my, 0) * ${box.depth}px)`,
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        </HeroParallax>
      </div>

      {/* — Carrousel « Vous vous reconnaissez ? » (< 1280 px) — */}
      <section aria-labelledby="hero-problems-title" className="pt-6 pb-14 md:pt-8 xl:hidden">
        <Container>
          <h2 data-reveal="title" id="hero-problems-title" className="display text-[26px] leading-[31px] tracking-[-0.015em]">
            <Words lines={t.problemsTitle} />
          </h2>
        </Container>
        <HeroCarousel count={t.problems.length} label={t.problemsTitle}>
          {t.problems.map((problem, i) => (
            <li
              key={problem.title}
              className="drop-card flex w-[262px] shrink-0 snap-start"
              style={{ "--drop-r": `${i % 2 ? -6 : 6}deg` } as CSSProperties}
            >
              <ProblemCard problem={problem} className="w-full px-[18px]" />
            </li>
          ))}
        </HeroCarousel>
      </section>
    </div>
  );
}
