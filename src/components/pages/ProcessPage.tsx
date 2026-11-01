import type { Metadata } from "next";
import { EnterpriseCta } from "@/components/EnterpriseCta";
import { PageShell } from "@/components/layout/PageShell";
import { ProcessHero } from "@/components/visual/process/ProcessHero";
import { ProcessPhases } from "@/components/visual/process/ProcessPhases";
import { ProcessPractices } from "@/components/visual/process/ProcessPractices";
import { localize } from "@/content/localized";
import { processContent } from "@/content/pages";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";

export function processMetadata(locale: Locale): Metadata {
  return pageMetadata({ locale, route: "process", ...localize(processContent, locale).meta });
}

export function ProcessPage({ locale }: { locale: Locale }) {
  const process = localize(processContent, locale);

  return (
    <PageShell locale={locale} route="process">
      {/* SECTION 1: Premium, Compact, White Hero with Pipeline Graphic */}
      <ProcessHero locale={locale} intro={process.intro} />

      {/* SECTION 2 (60% Weight): Interactive Delivery Lifecycle Timeline & Gate Deliverables */}
      <ProcessPhases
        locale={locale}
        outputLabel={process.outputLabel}
        phases={process.phases}
      />

      {/* SECTION 3 (30% Weight): Governance & Quality Control Practices */}
      <ProcessPractices
        locale={locale}
        practices={process.practices}
      />

      {/* SECTION 4 (10% Strategic Dark Navy): Signature Enterprise Closing CTA */}
      <EnterpriseCta locale={locale} />
    </PageShell>
  );
}
