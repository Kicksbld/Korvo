import type { ProContent } from "@/app/pro/content/types";
import { BOOKING_HREF, WHATSAPP_HREF } from "@/app/pro/urls";
import { Button } from "../Button";

/* Barre fixe du bas, mobile seulement (Figma 207-1677) : verre papier
   (papier 82 % + flou), « Réserver 20 min » et « WhatsApp ».

   Phase 2 : toujours visible en mobile. L'apparition après le hero, la
   sortie par le bas, le masquage dans Contact et quand le clavier est
   ouvert, et `prefers-reduced-transparency` arrivent en phase 3. */

export function BarreFixeMobile({ t }: { t: ProContent["mobileBar"] }) {
  return (
    <nav
      aria-label={t.label}
      className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-2.5 border-t border-[rgb(255_255_255/0.7)] bg-[rgb(247_245_238/0.82)] px-4 pt-3 pb-[max(28px,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgb(26_26_13/0.08)] backdrop-blur-[12px] md:hidden"
    >
      <Button href={BOOKING_HREF} className="min-w-0 flex-1">
        {t.book}
      </Button>
      <Button href={WHATSAPP_HREF} variant="outline" icon="none">
        {t.whatsapp}
      </Button>
    </nav>
  );
}
