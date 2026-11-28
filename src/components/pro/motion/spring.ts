/* Ressort interruptible de la page pro (spec mouvement, Figma 214-83).

   Pourquoi pas une bibliothèque : l'API `animate` de Motion avec ressorts JS
   pèse ~18 ko gzip ; ce fichier fait ~1 ko et fait exactement ce que le spec
   demande, avec les deux réglages d'Apple au lieu de masse/raideur :
   - `damping` : 1 = sans rebond (défaut), 0,8 = léger rebond (après un geste lancé)
   - `response` : rapidité en secondes (0,35 par défaut). Ce n'est pas une durée.

   Solution analytique (pas d'intégration image par image) : on connaît à tout
   instant la position ET la vitesse exactes. Quand on change de cible en plein
   mouvement, le nouveau ressort repart de la position et de la vitesse
   actuelles : pas de saut, pas de « mur » de vitesse. */

export type SpringConfig = { damping?: number; response?: number };

export const SPRING_DEFAULT = { damping: 1, response: 0.35 } as const;
/** Après un geste lancé (carrousel lâché avec élan). */
export const SPRING_FLICK = { damping: 0.8, response: 0.4 } as const;

type Segment = { from: number; to: number; v0: number; start: number; damping: number; omega: number };

/** Position et vitesse (unités/s) d'un ressort `t` secondes après son départ. */
function solve(s: Segment, t: number): [number, number] {
  const a = s.from - s.to;
  const w = s.omega;
  if (s.damping >= 1) {
    // Amortissement critique : x(t) = (a + (v0 + w·a)·t)·e^(−w·t)
    const b = s.v0 + w * a;
    const e = Math.exp(-w * t);
    return [s.to + (a + b * t) * e, (b - w * (a + b * t)) * e];
  }
  const z = s.damping;
  const wd = w * Math.sqrt(1 - z * z);
  const b = (s.v0 + z * w * a) / wd;
  const e = Math.exp(-z * w * t);
  const cos = Math.cos(wd * t);
  const sin = Math.sin(wd * t);
  const x = (a * cos + b * sin) * e;
  return [s.to + x, -z * w * x + (b * wd * cos - a * wd * sin) * e];
}

/** Valeur animée par ressort : `to()` la lance (ou la redirige), `set()` la pose. */
export class Spring {
  private value: number;
  private segment: Segment | null = null;
  private frame = 0;
  private readonly onUpdate: (value: number) => void;
  private onRest?: () => void;
  /** En dessous de cet écart et de cette vitesse, le ressort est au repos. */
  private readonly precision: number;

  constructor(initial: number, onUpdate: (value: number) => void, precision = 0.1) {
    this.value = initial;
    this.onUpdate = onUpdate;
    this.precision = precision;
  }

  get current() {
    return this.value;
  }

  get target() {
    return this.segment ? this.segment.to : this.value;
  }

  get isAnimating() {
    return this.segment !== null;
  }

  /** Vitesse actuelle (unités/s), 0 au repos. */
  get velocity() {
    if (!this.segment) return 0;
    return solve(this.segment, (performance.now() - this.segment.start) / 1000)[1];
  }

  /** Anime vers `to`, depuis la position et la vitesse actuelles. */
  to(to: number, config: SpringConfig & { velocity?: number; onRest?: () => void } = {}) {
    const damping = config.damping ?? SPRING_DEFAULT.damping;
    const response = config.response ?? SPRING_DEFAULT.response;
    const now = performance.now();
    const v0 = config.velocity ?? this.velocity;
    this.segment = { from: this.value, to, v0, start: now, damping, omega: (2 * Math.PI) / response };
    this.onRest = config.onRest;
    if (!this.frame) this.frame = requestAnimationFrame(this.tick);
  }

  /** Pose la valeur sans animation (et arrête le ressort en cours). */
  set(value: number) {
    this.stop();
    this.value = value;
    this.onUpdate(value);
  }

  stop() {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.segment = null;
  }

  private tick = (now: number) => {
    this.frame = 0;
    const s = this.segment;
    if (!s) return;
    const [x, v] = solve(s, Math.max(0, (now - s.start) / 1000));
    const rest = Math.abs(x - s.to) < this.precision && Math.abs(v) < this.precision * 20;
    this.value = rest ? s.to : x;
    this.onUpdate(this.value);
    if (rest) {
      this.segment = null;
      const done = this.onRest;
      this.onRest = undefined;
      done?.();
      return;
    }
    this.frame = requestAnimationFrame(this.tick);
  };
}

/** Point d'arrivée projeté d'un geste lancé (fonction d'Apple, décélération 0,998). */
export function project(velocity: number, deceleration = 0.998) {
  return ((velocity / 1000) * deceleration) / (1 - deceleration);
}

/** Résistance élastique au-delà d'un bord : plus on tire, moins ça suit. */
export function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
