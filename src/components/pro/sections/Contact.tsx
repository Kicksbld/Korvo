import Image from "next/image";
import type { ReactNode } from "react";
import type { ProContent } from "@/app/pro/content/types";
import { EMAIL_HREF, WHATSAPP_HREF } from "@/app/pro/urls";
import { Container } from "../Container";
import { cx } from "../cx";
import { MailIcon, WhatsAppIcon } from "../icons";
import { Section } from "../Section";

/* Contact (Figma 207-1085 desktop, 207-1609 mobile) — papier.

   Titre, texte, emplacement du calendrier Cal.com (phase 4) à la taille de
   la maquette, puis WhatsApp et e-mail.
   - ≥ 1280 : texte et contacts à gauche, calendrier (640 px) à droite ;
   - < 1280 : titre, texte, calendrier, contacts (maquette 390). */

type Contact = ProContent["contact"];

function ContactLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <a
      href={href}
      className={cx(
        "flex min-h-11 items-center gap-2.5 rounded-pill border border-border-default py-[11px] pr-[18px] pl-4",
        "font-body text-[15px] leading-4 font-semibold text-ink transition-colors duration-150 hover:bg-ink/5",
        "w-full md:w-auto",
      )}
    >
      {icon}
      {children}
    </a>
  );
}

export function Contact({ t }: { t: Contact }) {
  return (
    <Section id="contact" tone="paper" tear={73} padded={false} aria-labelledby="contact-title" className="pt-[72px] pb-14 md:py-[120px]">
      <Container className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_640px] xl:gap-x-24 xl:gap-y-7">
        <div className="flex flex-col gap-6 xl:col-start-1 xl:row-start-1 xl:gap-7 xl:self-end">
          <h2 id="contact-title" className="display-mobile-xl md:display-l">
            {t.title}
          </h2>
          <p className="body-md md:body-lg text-ink-2">
            <span className="md:hidden">{t.textShort}</span>
            <span className="hidden md:inline">{t.text}</span>
          </p>
        </div>

        {/* Emplacement du calendrier Cal.com (phase 4), à la taille de la maquette. */}
        <div className="flex flex-col overflow-hidden rounded-3xl border border-border-faint bg-paper-raised shadow-[0_18px_40px_rgb(26_26_13/0.08)] xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:self-center">
          <div className="flex items-center gap-3 border-b border-border-faint px-6 py-[18px]">
            <Image src="/pro/photos/killian-avatar.webp" alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
            <div className="flex flex-col gap-px">
              <p className="body-strong">{t.calendar.title}</p>
              <p className="body-sm text-ink-3">{t.calendar.meta}</p>
            </div>
          </div>
          <div className="flex min-h-[530px] items-center justify-center p-6 md:min-h-[296px]">
            <p className="body-sm text-center text-ink-3">{t.calendar.placeholder}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 md:flex-row md:flex-wrap md:items-center md:gap-6 xl:col-start-1 xl:row-start-2 xl:self-start">
          <p className="body-sm text-ink-2">{t.otherLabel}</p>
          <ContactLink href={WHATSAPP_HREF} icon={<WhatsAppIcon className="shrink-0" />}>
            {t.whatsapp}
          </ContactLink>
          <ContactLink href={EMAIL_HREF} icon={<MailIcon className="shrink-0" />}>
            {t.email}
          </ContactLink>
        </div>
      </Container>
    </Section>
  );
}
