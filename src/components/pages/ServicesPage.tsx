import type { Metadata } from "next";
import Link from "next/link";
import { type ReactNode } from "react";
import { EnterpriseCta } from "@/components/EnterpriseCta";
import { PageShell } from "@/components/layout/PageShell";
import { localize } from "@/content/localized";
import { servicesContent } from "@/content/pages";
import { solutionCardsContent, type SolutionSlug } from "@/content/solutions";
import type { Locale } from "@/i18n/config";
import { pageLink } from "@/i18n/availability";
import { solutionRoute } from "@/i18n/routes";
import { pageMetadata } from "@/lib/metadata";
import { ArrowText } from "@/components/visual/icons";

// Scroll Motion & Hero Stage Components
import { ScrollReveal } from "@/components/visual/solutions/ScrollReveal";
import { ServicesHeroStage } from "@/components/visual/solutions/ServicesHeroStage";

export function servicesMetadata(locale: Locale): Metadata {
  return pageMetadata({ locale, route: "services", ...localize(servicesContent, locale).meta });
}

const serviceIcons: Record<SolutionSlug, ReactNode> = {
  platforms: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="26" height="24" rx="4" />
      <path d="M3 11h26M9 7h.1M13 7h.1M12 16l-4 4 4 4m8-8 4 4-4 4" />
    </svg>
  ),
  apps: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="2" width="16" height="28" rx="4" />
      <path d="M13 6h6m-5 20h4" />
    </svg>
  ),
  business: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="16" width="6" height="13" rx="2" />
      <rect x="13" y="10" width="6" height="19" rx="2" />
      <rect x="23" y="3" width="6" height="26" rx="2" />
    </svg>
  ),
  integration: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 10l5-5a7 7 0 0110 10l-5 5M19 22l-5 5A7 7 0 014 17l5-5m2 9 10-10" />
    </svg>
  ),
  automation: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="7" y="7" width="18" height="18" rx="5" />
      <path d="M12 2v5m8-5v5m-8 18v5m8-5v5M2 12h5m-5 8h5m18-8h5m-5 8h5m-18-4h8" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 18v-3a11 11 0 0122 0v3M5 17H3v8h6v-8H5m22 0h2v8h-6v-8h4m0 8c0 4-6 5-10 5" />
    </svg>
  ),
};

export function ServicesPage({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const services = localize(servicesContent, locale);
  const solutions = localize(solutionCardsContent, locale);
  const contactLink = pageLink(locale, "contact");

  const titleLines = Array.isArray(services.intro.title)
    ? services.intro.title
    : [services.intro.title];

  return (
    <PageShell locale={locale} route="services">
      {/* =========================================================================
          SECTION 1: Premium, Modern, White/Light Services Hero
          Connected Architecture Ecosystem with interactive focal stage
          ========================================================================= */}
      <section className="services-hero-light">
        <div className="hero-dark-glow-ambient" aria-hidden="true" />
        <div className="hero-circuit-grid" aria-hidden="true" />

        <div className="wrap">
          {/* Main Hero Header */}
          <div className="services-hero-header">
            <div className="hero-badge-pill">
              <span className="badge-dot" />
              <span>{services.intro.eyebrow}</span>
              <span className="sep">•</span>
              <span>{isAr ? "منظومة الحلول والمعمارية الرقمية" : "Connected Architecture Ecosystem"}</span>
            </div>

            <h1 className="services-light-title">
              <span className="title-line-dark">{titleLines[0]}</span>
              {titleLines[1] && (
                <span className="title-line-cyan">{titleLines[1]}</span>
              )}
            </h1>

            <p className="services-light-lead">{services.intro.lead}</p>

            <div className="hero-light-actions">
              <Link className="button primary" href={contactLink.href} hrefLang={contactLink.hrefLang}>
                <ArrowText text={isAr ? "ناقش احتياج شركتك" : "Discuss Your Enterprise Scope"} />
              </Link>
              <a className="button outline" href="#solutions-directory">
                <span>{isAr ? "دليل الحلول والخدمات الستة ↓" : "Explore All 6 Solutions ↓"}</span>
              </a>
            </div>

            {/* Engineering Highlights Strip */}
            <div className="hero-kpi-strip services-kpis">
              <div className="kpi-pill-box">
                <span className="kpi-value">06</span>
                <div className="kpi-meta">
                  <strong>{isAr ? "حلول تخصصية متصلة" : "Specialized Disciplines"}</strong>
                  <small>{isAr ? "تكامل تام عبر منصة موحدة" : "Unified ecosystem integration"}</small>
                </div>
              </div>

              <div className="kpi-pill-box">
                <span className="kpi-value">99.99%</span>
                <div className="kpi-meta">
                  <strong>{isAr ? "التزام بمستوى الخدمة" : "Target System Availability"}</strong>
                  <small>{isAr ? "مراقبة إقليمية مستمرة 24/7" : "24/7 proactive telemetry"}</small>
                </div>
              </div>

              <div className="kpi-pill-box">
                <span className="kpi-value">100%</span>
                <div className="kpi-meta">
                  <strong>{isAr ? "وضوح النطاق والمعايير" : "Scope & Acceptance Clarity"}</strong>
                  <small>{isAr ? "حوكمة هندسية قبل التنفيذ" : "Strict engineering governance"}</small>
                </div>
              </div>
            </div>
          </div>

          {/* Focal Interactive Architecture Stage */}
          <div className="services-stage-wrapper">
            <ServicesHeroStage locale={locale} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 (30% Surface Weight): Pure White Solutions Directory
          Staggered rise-and-settle cards with hover elevation
          ========================================================================= */}
      <section id="solutions-directory" className="services-catalog-white">
        <div className="wrap">
          <div className="capabilities-section-header" style={{ marginBottom: "40px" }}>
            <span className="section-eyebrow">
              {isAr ? "دليل الحلول والخدمات" : "Solutions Directory"}
            </span>
            <h2>
              {isAr ? "استكشف مخرجات كل حل ومواصفاته التقنية" : "Explore Technical Capabilities & Deliverables"}
            </h2>
            <p>
              {isAr
                ? "اختر الحل المناسب لاستعراض معاييره الهندسية، مخرجاته المتفق عليها ونماذج الربط مع أنظمتكم الحالية."
                : "Select any discipline to inspect technical blueprints, agreed deliverables, and architectural integration."}
            </p>
          </div>

          <ScrollReveal className="services-catalog-grid" staggerDelay={90}>
            {solutions.map((solution, index) => {
              const link = pageLink(locale, solutionRoute(solution.slug));
              return (
                <Link
                  key={solution.slug}
                  className="catalog-tile-card scroll-reveal-item"
                  href={link.href}
                  hrefLang={link.hrefLang}
                >
                  <div>
                    <div className="tile-card-header">
                      <span className="tile-icon-box">{serviceIcons[solution.slug]}</span>
                      <span className="tile-num-badge">0{index + 1}</span>
                    </div>
                    <h3>{solution.title}</h3>
                    <p>{solution.summary}</p>
                  </div>
                  <div>
                    <span className="capability-chip" style={{ display: "inline-block", marginBottom: "16px" }}>
                      {solution.tags}
                    </span>
                    <div className="tile-action-link">
                      <span>{isAr ? "استعراض المعمارية والمخرجات" : "Inspect Architecture & Specs"}</span>
                      <span>{isAr ? "←" : "→"}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: Engineering Engagement Roadmap (Clean Light Neutral)
          ========================================================================= */}
      <section className="services-engagement-light">
        <div className="wrap">
          <div className="capabilities-section-header" style={{ marginBottom: "40px" }}>
            <span className="section-eyebrow">
              {isAr ? "نماذج العمل والتعاقد" : "Engagement Models"}
            </span>
            <h2>{services.engagement.title}</h2>
            <p>
              {isAr
                ? "وضوح تعاقدي، تسليم على مراحل مجدولة، وحوكمة دقيقة تضمن تحقيق أهداف العمل المحددة."
                : "Clear contractual clarity, phased delivery milestones, and engineering governance."}
            </p>
          </div>

          <ScrollReveal className="capabilities-grid-cards" staggerDelay={100}>
            {services.engagement.items.map((model, idx) => (
              <article key={model.title} className="capability-card scroll-reveal-item">
                <div className="capability-card-top">
                  <div className="capability-icon-wrap">
                    <span>{idx === 0 ? "🎯" : idx === 1 ? "📦" : "🔄"}</span>
                  </div>
                  <span className="capability-num">0{idx + 1}</span>
                </div>
                <h3>{model.title}</h3>
                <p>{model.body}</p>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 (60% Weight): Signature Dark-Blue Closing CTA
          ========================================================================= */}
      <EnterpriseCta locale={locale} />
    </PageShell>
  );
}
