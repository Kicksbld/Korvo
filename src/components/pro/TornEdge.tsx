import { cx } from "./cx";

/* Bord de papier déchiré entre deux sections.

   Posé en haut de la section suivante, il déborde sur la section précédente
   (comme dans Figma, où la déchirure est dessinée au pied de la section du
   dessus avec la couleur de celle du dessous). Deux couches :
   1. une frange claire (papier surélevé, 90 %), légèrement au-dessus ;
   2. le bord lui-même, dans la couleur de la section, avec une ombre chaude
      projetée vers le haut (dy −2, flou 3, 18 %), relevée dans Figma.

   Le tracé est généré à partir d'une graine : une graine différente par
   section donne un tracé différent à chaque fois, mais stable d'un rendu à
   l'autre (pas de différence serveur / navigateur). Une version desktop
   (1440 de large, 38 de haut) et une version mobile (390 × 22, dents plus
   serrées) s'échangent à 768 px. */

type TornEdgeProps = {
  /** Couleur CSS de la section dont c'est le bord (ex. "var(--pro-sage)"). */
  color: string;
  /** Graine du tracé : changer la valeur pour obtenir une autre déchirure. */
  seed: number;
  /** Positionnement : par défaut en haut du parent, débordant au-dessus. */
  className?: string;
};

type Geometry = { width: number; height: number; stepMin: number; stepMax: number; amp: number; gap: number };

const DESKTOP: Geometry = { width: 1440, height: 38, stepMin: 7, stepMax: 24, amp: 23, gap: 4 };
const MOBILE: Geometry = { width: 390, height: 22, stepMin: 4, stepMax: 12, amp: 12, gap: 3 };

/** Générateur pseudo-aléatoire déterministe (mulberry32). */
function random(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

function tear(seed: number, g: Geometry) {
  const rand = random(seed);
  const top = 3;
  const fringe: Array<[number, number]> = [];
  const body: Array<[number, number]> = [];
  let x = 0;
  let y = top + rand() * g.amp;

  while (x <= g.width) {
    fringe.push([x, y]);
    // Le bord est sous la frange : la frange claire reste visible au-dessus.
    body.push([x, Math.min(g.height - 2, y + g.gap + rand() * g.gap * 1.5)]);
    x += g.stepMin + rand() * (g.stepMax - g.stepMin);
    // Marche aléatoire amortie : des dents irrégulières, sans pics isolés.
    y = top + (0.5 * (y - top) + 0.5 * rand() * g.amp);
  }
  // Dernier point aligné sur le bord droit.
  fringe.push([g.width, fringe[fringe.length - 1][1]]);
  body.push([g.width, body[body.length - 1][1]]);

  const toPath = (pts: Array<[number, number]>) =>
    `M0 ${g.height}` + pts.map(([px, py]) => `L${r1(px)} ${r1(py)}`).join("") + `L${g.width} ${g.height}Z`;

  return { fringe: toPath(fringe), body: toPath(body) };
}

function Layer({ seed, g, color, className }: { seed: number; g: Geometry; color: string; className: string }) {
  const { fringe, body } = tear(seed, g);
  const viewBox = `0 0 ${g.width} ${g.height}`;
  return (
    <div className={cx("absolute inset-0", className)}>
      <svg className="absolute inset-0 size-full" viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d={fringe} fill="var(--pro-paper-raised)" opacity="0.9" />
      </svg>
      <svg
        className="absolute inset-0 size-full [filter:drop-shadow(0_-2px_3px_rgb(38_31_15/0.18))]"
        viewBox={viewBox}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d={body} fill={color} />
      </svg>
    </div>
  );
}

export function TornEdge({ color, seed, className }: TornEdgeProps) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "pointer-events-none absolute inset-x-0 bottom-[calc(100%-1px)] z-10 h-[22px] md:h-[38px]",
        className,
      )}
    >
      <Layer seed={seed} g={MOBILE} color={color} className="md:hidden" />
      <Layer seed={seed} g={DESKTOP} color={color} className="hidden md:block" />
    </div>
  );
}
