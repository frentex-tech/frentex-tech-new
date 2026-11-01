import type { Metadata } from "next";
import { EnterpriseCta } from "@/components/EnterpriseCta";
import { PageShell } from "@/components/layout/PageShell";
import { WorkHero } from "@/components/visual/work/WorkHero";
import { WorkLabShowcase } from "@/components/visual/work/WorkLabShowcase";
import { WorkMethodology } from "@/components/visual/work/WorkMethodology";
import { localize } from "@/content/localized";
import { workContent } from "@/content/pages";
import { demoLinks } from "@/i18n/availability";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";

export function workMetadata(locale: Locale): Metadata {
  return pageMetadata({ locale, route: "work", ...localize(workContent, locale).meta });
}

export function WorkPage({ locale }: { locale: Locale }) {
  const content = localize(workContent, locale);
  const links = demoLinks(locale);

  return (
    <PageShell locale={locale} route="work">
      {/* SECTION 1: Premium, Compact, White Hero with Solution Lab Graphic */}
      <WorkHero locale={locale} intro={content.intro} />

      {/* SECTION 2 (30% Weight): Interactive Work Lab Showcase with Filter Tabs */}
      <WorkLabShowcase
        locale={locale}
        demoLinks={links}
      />

      {/* SECTION 3 (60% Surface Weight): Engineering Principles & Methodology */}
      <WorkMethodology locale={locale} />

      {/* SECTION 4 (10% Strategic Dark Navy): Signature Enterprise CTA */}
      <EnterpriseCta locale={locale} />
    </PageShell>
  );
}
