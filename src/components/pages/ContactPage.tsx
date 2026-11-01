import type { Metadata } from "next";
import { BriefDialogProvider } from "@/components/BriefDialog";
import { EnterpriseCta } from "@/components/EnterpriseCta";
import { PageShell } from "@/components/layout/PageShell";
import { ContactHero } from "@/components/visual/contact/ContactHero";
import { ContactChannels } from "@/components/visual/contact/ContactChannels";
import { ContactTopics } from "@/components/visual/contact/ContactTopics";
import { localize } from "@/content/localized";
import { contactContent } from "@/content/pages";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";

export function contactMetadata(locale: Locale): Metadata {
  return pageMetadata({ locale, route: "contact", ...localize(contactContent, locale).meta });
}

export function ContactPage({ locale }: { locale: Locale }) {
  const { intro, business, brief, topics } = localize(contactContent, locale);

  return (
    <PageShell locale={locale} route="contact">
      <BriefDialogProvider locale={locale}>
        {/* SECTION 1: Premium, Compact, White Hero with Communications Terminal Graphic */}
        <ContactHero
          locale={locale}
          intro={intro}
          whatsappAction={business.whatsapp}
          briefAction={brief.action}
        />

        {/* SECTION 2 (60% Weight): Direct Engagement Channels Grid */}
        <ContactChannels
          locale={locale}
          business={business}
          brief={brief}
        />

        {/* SECTION 3 (30% Weight): Initial Discovery Focus Areas */}
        <ContactTopics
          locale={locale}
          title={topics.title}
          items={topics.items}
        />

        {/* SECTION 4 (10% Strategic Dark Navy): Signature Enterprise Closing CTA */}
        <EnterpriseCta locale={locale} />
      </BriefDialogProvider>
    </PageShell>
  );
}
