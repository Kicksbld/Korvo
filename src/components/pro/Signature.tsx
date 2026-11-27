import Image from "next/image";
import { cx } from "./cx";

/* Signature manuscrite « Killian » (ocre), exportée de Figma en SVG
   vectorisé : aucune police manuscrite n'est chargée pour un seul mot.
   Purement décorative : le nom est déjà écrit en texte à côté. */

export function Signature({ className, width = 286 }: { className?: string; width?: number }) {
  return (
    <Image
      src="/pro/signature/killian.svg"
      alt=""
      width={width}
      height={Math.round((width * 111) / 286)}
      unoptimized
      className={cx("select-none", className)}
    />
  );
}
