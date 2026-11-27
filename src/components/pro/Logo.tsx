import { cx } from "./cx";

/* Logotype KORVO (Fraunces, approche 0,14 em). Sans filet en v2. */

type LogoProps = {
  tone?: "ink" | "paper";
  className?: string;
};

export function Logo({ tone = "ink", className }: LogoProps) {
  return (
    <span
      className={cx(
        "display inline-block text-[22px] leading-6 tracking-[0.14em]",
        tone === "ink" ? "text-ink" : "text-paper",
        className,
      )}
    >
      KORVO
    </span>
  );
}
