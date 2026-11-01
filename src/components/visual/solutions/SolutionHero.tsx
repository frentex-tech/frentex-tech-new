import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Solution, SolutionSlug } from "@/content/solutions";
import type { SolutionDetailEnrichment } from "@/content/solution-details";
import { pageLink } from "@/i18n/availability";
import { ArrowText } from "@/components/visual/icons";
import { CompactHeroVisual } from "./CompactHeroVisuals";

interface SolutionHeroProps {
  locale: Locale;
  slug: SolutionSlug;
  solution: Solution;
  eyebrow: string;
  enrichment: SolutionDetailEnrichment;
}

export function SolutionHero({
  locale,
  slug,
  solution,
  eyebrow,
  enrichment,
}: SolutionHeroProps) {
  const isAr = locale === "ar";
  const contactLink = pageLink(locale, "contact");

  return (
    <section className="compact-solution-hero">
      <div className="wrap compact-hero-container">
        {/* Left Column: Focused Executive Copy */}
        <div className="compact-hero-copy">
          <div className="compact-eyebrow-pill">
            <span className="eyebrow-accent-dot" />
            <span className="eyebrow-label">{eyebrow}</span>
            <span className="eyebrow-sep">•</span>
            <span className="eyebrow-category">{enrichment.categoryLabel}</span>
          </div>

          <h1 className="compact-hero-title">{solution.title}</h1>

          <p className="compact-hero-tagline">{solution.tagline}</p>
          <p className="compact-hero-summary">{solution.summary}</p>

          <div className="compact-hero-actions">
            <Link className="button primary compact-cta-btn" href={contactLink.href} hrefLang={contactLink.hrefLang}>
              <ArrowText text={isAr ? "ناقش متطلبات مشروعك" : "Discuss Your Architecture"} />
            </Link>
            <a className="button outline compact-anchor-btn" href="#storytelling">
              <span>{isAr ? "المعمارية والمخرجات ↓" : "Explore Architecture ↓"}</span>
            </a>
          </div>

          {/* Subtle Technical Trust Indicators */}
          <div className="compact-hero-trust-bar">
            <span>✓ {isAr ? "نطاق عمل محدد" : "Defined Project Scope"}</span>
            <span className="trust-dot">•</span>
            <span>✓ {isAr ? "تسليم مرحلي معتمد" : "Milestone Acceptance"}</span>
            <span className="trust-dot">•</span>
            <span>✓ {isAr ? "حوكمة هندسية" : "Engineering Governance"}</span>
          </div>
        </div>

        {/* Right Column: Tailored Compact Technology Graphic */}
        <div className="compact-hero-visual-wrapper">
          <CompactHeroVisual slug={slug} locale={locale} />
        </div>
      </div>
    </section>
  );
}
