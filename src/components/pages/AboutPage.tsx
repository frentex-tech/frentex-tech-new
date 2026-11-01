import type { Metadata } from "next";
import { EnterpriseCta } from "@/components/EnterpriseCta";
import { PageShell } from "@/components/layout/PageShell";
import { AboutHero } from "@/components/visual/about/AboutHero";
import { AboutPrinciples } from "@/components/visual/about/AboutPrinciples";
import { AboutStandards } from "@/components/visual/about/AboutStandards";
import { AboutProfileDownload } from "@/components/visual/about/AboutProfileDownload";
import { localize } from "@/content/localized";
import { aboutContent } from "@/content/pages";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";

export function aboutMetadata(locale: Locale): Metadata {
  return pageMetadata({ locale, route: "about", ...localize(aboutContent, locale).meta });
}

export function AboutPage({ locale }: { locale: Locale }) {
  const about = localize(aboutContent, locale);

  return (
    <PageShell locale={locale} route="about">
      {/* SECTION 1: Premium, Compact, White Hero with Studio Architecture Graphic */}
      <AboutHero
        locale={locale}
        intro={about.intro}
        downloadLabel={about.download}
      />

      {/* SECTION 2 (60% Weight): Core Engineering Principles Grid */}
      <AboutPrinciples
        locale={locale}
        principles={about.principles}
      />

      {/* SECTION 3 (30% Weight): Engineering Culture & Standards */}
      <AboutStandards
        locale={locale}
      />

      {/* SECTION 4 (60% Surface Weight): Dedicated Corporate Profile Dossier Download */}
      <AboutProfileDownload
        locale={locale}
        downloadLabel={about.download}
      />

      {/* SECTION 5 (10% Strategic Dark Navy): Signature Enterprise Closing CTA */}
      <EnterpriseCta locale={locale} />
    </PageShell>
  );
}
