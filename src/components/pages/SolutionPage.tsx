import type { Metadata } from "next";
import Link from "next/link";
import { EnterpriseCta } from "@/components/EnterpriseCta";
import { PageShell } from "@/components/layout/PageShell";
import { localize } from "@/content/localized";
import { getSolution, solutionsContent, type SolutionSlug } from "@/content/solutions";
import { solutionDetailsData, getStorySteps } from "@/content/solution-details";
import type { Locale } from "@/i18n/config";
import { pageOrSectionLink, pageLink } from "@/i18n/availability";
import { solutionRoute } from "@/i18n/routes";
import { ArrowText } from "@/components/visual/icons";
import { pageMetadata } from "@/lib/metadata";
import { SolutionHero } from "@/components/visual/solutions/SolutionHero";

// Scroll Motion & Storytelling Components
import { ScrollReveal } from "@/components/visual/solutions/ScrollReveal";
import { StickyStorytelling } from "@/components/visual/solutions/StickyStorytelling";

// Technical Interactive Visuals
import { PlatformsVisual } from "@/components/visual/solutions/PlatformsVisual";
import { AppsVisual } from "@/components/visual/solutions/AppsVisual";
import { BusinessVisual } from "@/components/visual/solutions/BusinessVisual";
import { IntegrationVisual } from "@/components/visual/solutions/IntegrationVisual";
import { AutomationVisual } from "@/components/visual/solutions/AutomationVisual";
import { SupportVisual } from "@/components/visual/solutions/SupportVisual";

export function solutionMetadata(locale: Locale, slug: SolutionSlug): Metadata {
  const content = localize(solutionsContent, locale);
  const solution = getSolution(content, slug);
  return pageMetadata({
    locale,
    route: solutionRoute(slug),
    title: content.documentTitle(solution.title),
    description: solution.summary,
  });
}

const iconMap: Record<string, string> = {
  platforms: "🌐",
  apps: "📱",
  business: "💼",
  integration: "⚡",
  automation: "🤖",
  support: "🛡️",
  code: "💻",
  shield: "🔒",
  speed: "⚡",
  sync: "🔄",
  cpu: "⚙️",
  chart: "📈",
};

export function SolutionPage({ locale, slug }: { locale: Locale; slug: SolutionSlug }) {
  const isAr = locale === "ar";
  const content = localize(solutionsContent, locale);
  const solution = getSolution(content, slug);
  const enrichment = solutionDetailsData[locale][slug];
  const storySteps = getStorySteps(enrichment, locale, slug);
  const processLink = pageOrSectionLink(locale, "process");

  // Format deliverables into distinct items if separated by periods or commas
  const deliverablesList = solution.deliverables
    .split(/\.\s+|،\s+|\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 3);

  const renderVisual = () => {
    switch (slug) {
      case "platforms":
        return <PlatformsVisual locale={locale} />;
      case "apps":
        return <AppsVisual locale={locale} />;
      case "business":
        return <BusinessVisual locale={locale} />;
      case "integration":
        return <IntegrationVisual locale={locale} />;
      case "automation":
        return <AutomationVisual locale={locale} />;
      case "support":
        return <SupportVisual locale={locale} />;
      default:
        return null;
    }
  };

  return (
    <PageShell locale={locale} route={solutionRoute(slug)}>
      {/* =========================================================================
          SECTION 1: Premium, Compact, White Hero with Solution Technology Graphic
          Compact vertical height (~480-560px), two-column desktop composition
          ========================================================================= */}
      <SolutionHero
        locale={locale}
        slug={slug}
        solution={solution}
        eyebrow={content.eyebrow(solution.label)}
        enrichment={enrichment}
      />

      {/* =========================================================================
          SECTION 2 (30% Weight): Pure White Section — Core Capabilities
          Clean white surface with staggered rise-and-settle scroll animation
          ========================================================================= */}
      <section className="solution-capabilities-white">
        <div className="wrap">
          <div className="capabilities-section-header">
            <span className="section-eyebrow">
              {isAr ? "القدرات الهندسية" : "Engineering Capabilities"}
            </span>
            <h2>{enrichment.capabilitiesHeading}</h2>
            <p>
              {isAr
                ? "نقدم حلولاً متكاملة مبنية على أحدث المعايير البرمجية لتلائم بيئات العمل المؤسسية ذات المتطلبات العالية."
                : "Engineered with modern architecture patterns, resilient failure handling, and high-throughput scalability."}
            </p>
          </div>

          <ScrollReveal className="capabilities-grid-cards" staggerDelay={90}>
            {enrichment.capabilities.map((cap, idx) => (
              <article key={idx} className="capability-card scroll-reveal-item">
                <div className="capability-card-top">
                  <div className="capability-icon-wrap">
                    <span>{iconMap[cap.icon] || "⚙️"}</span>
                  </div>
                  <span className="capability-num">{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <h3>{cap.title}</h3>
                <p>{cap.description}</p>
                <div className="capability-chips">
                  <span className="capability-chip">{cap.badge}</span>
                </div>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: Interactive Sticky Architecture Storytelling (Clean Light)
          Pinned technical visual with progressive story cards on subtle light canvas
          ========================================================================= */}
      <div id="storytelling">
        <StickyStorytelling
          locale={locale}
          heading={enrichment.architectureHeading}
          lead={enrichment.architectureLead}
          steps={storySteps}
          visualComponent={renderVisual()}
          theme="light"
        />
      </div>

      {/* =========================================================================
          SECTION 4 (30% Weight): Light Neutral Delivery & Governance Matrix
          Off-white neutral surface with checkmark deliverables and clarity gates
          ========================================================================= */}
      <section className="solution-delivery-light">
        <div className="wrap">
          <div className="capabilities-section-header" style={{ marginBottom: "36px" }}>
            <span className="section-eyebrow">
              {isAr ? "منهجية التنفيذ والحوكمة" : "Delivery Framework & Governance"}
            </span>
            <h2>{isAr ? "وضوح تام قبل بدء التنفيذ" : "Absolute Clarity Before You Commit"}</h2>
          </div>

          <ScrollReveal className="delivery-matrix-grid" staggerDelay={100}>
            {/* When It Fits / Business Problem Solved */}
            <div className="delivery-box scroll-reveal-item">
              <span className="delivery-box-badge">
                {isAr ? "ملاءمة الاحتياج" : "Suitability & Problem Solved"}
              </span>
              <h3>{content.cardTitles.whenItFits}</h3>
              <p className="delivery-lead-copy">{solution.whenItFits}</p>
            </div>

            {/* Clear Deliverables Checklist */}
            <div className="delivery-box scroll-reveal-item">
              <span className="delivery-box-badge">
                {isAr ? "المخرجات المعتمدة" : "Verified Deliverables"}
              </span>
              <h3>{content.cardTitles.deliverables}</h3>
              <ul className="deliverables-checklist">
                {deliverablesList.map((item, idx) => (
                  <li key={idx}>
                    <span className="check-icon">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Governance & Pre-alignment */}
          <div className="delivery-box governance-box" style={{ marginTop: "24px" }}>
            <span className="delivery-box-badge">
              {isAr ? "الحوكمة والوضوح التعاقدي" : "Governance & Alignment"}
            </span>
            <h3>{content.cardTitles.agreeFirst}</h3>
            <p className="delivery-lead-copy">{solution.agreeFirst}</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 (30% Weight): Pure White Section — Process & Approach
          ========================================================================= */}
      <section className="solution-process-white section wrap">
        <div className="capabilities-section-header" style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "800", color: "var(--fx-ink)", marginBottom: "16px" }}>
            {content.purchase.title}
          </h2>
          <p style={{ fontSize: "16px", color: "var(--fx-steel)", lineHeight: "1.7", marginBottom: "24px" }}>
            {content.purchase.body}
          </p>
          <Link className="button outline" href={processLink.href} hrefLang={processLink.hrefLang}>
            <ArrowText text={content.purchase.link} />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 (30% Weight): Related Complementary Solutions Cards
          ========================================================================= */}
      <section className="solution-related-light">
        <div className="wrap">
          <div className="related-section-header">
            <h3>{enrichment.relatedHeading}</h3>
            <p>
              {isAr
                ? "تتكامل حلولنا لتشكل منظومة برمجية متماسكة تدعم نمو وتوسع أعمالكم."
                : "Explore complementary technology pillars that integrate seamlessly into your digital ecosystem."}
            </p>
          </div>

          <ScrollReveal className="related-cards-grid" staggerDelay={80}>
            {enrichment.related.map((rel) => {
              const relLink = pageLink(locale, `solution-${rel.slug}`);
              return (
                <Link
                  key={rel.slug}
                  href={relLink.href}
                  hrefLang={relLink.hrefLang}
                  className="related-solution-card scroll-reveal-item"
                >
                  <div>
                    <div className="related-card-top">
                      <span className="rel-icon">{iconMap[rel.slug] || "💡"}</span>
                      <span className="rel-arrow">{isAr ? "←" : "→"}</span>
                    </div>
                    <h4>{rel.title}</h4>
                    <p>{rel.reason}</p>
                  </div>
                </Link>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 (60% Weight): Signature Dark-Blue Enterprise Closing CTA
          ========================================================================= */}
      <EnterpriseCta locale={locale} />
    </PageShell>
  );
}
