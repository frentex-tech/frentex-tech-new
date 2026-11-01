import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { IntroContent } from "@/content/localized";
import { pageLink } from "@/i18n/availability";
import { Icon } from "@/components/visual/icons";

interface ProcessHeroProps {
  locale: Locale;
  intro: IntroContent;
}

export function ProcessHero({ locale, intro }: ProcessHeroProps) {
  const isAr = locale === "ar";
  const contactLink = pageLink(locale, "contact");

  return (
    <section className="compact-solution-hero process-hero-section">
      <div className="wrap compact-hero-container">
        {/* Left Column: Focused Executive Copy */}
        <div className="compact-hero-copy">
          <div className="compact-eyebrow-pill choreo-eyebrow">
            <span className="eyebrow-accent-dot" />
            <span className="eyebrow-label">{intro.eyebrow}</span>
            <span className="eyebrow-sep">•</span>
            <span className="eyebrow-category">
              {isAr ? "منهجية التنفيذ والحوكمة" : "Delivery & Governance Framework"}
            </span>
          </div>

          <h1 className="compact-hero-h1 choreo-title">
            {intro.title[0]}
            <br />
            <span className="compact-hero-gradient">{intro.title[1]}</span>
          </h1>

          <p className="compact-hero-tagline choreo-desc">{intro.lead}</p>

          <div className="compact-hero-actions choreo-actions">
            <Link className="button primary compact-cta-btn" href={contactLink.href} hrefLang={contactLink.hrefLang}>
              {isAr ? (
                <>
                  ناقش متطلبات مشروعك <Icon name="forward" size={16} />
                </>
              ) : (
                <>
                  Discuss your project <Icon name="forward" size={16} />
                </>
              )}
            </Link>

            <a className="button outline compact-secondary-btn process-anchor-btn" href="#delivery-phases">
              {isAr ? (
                <>
                  استكشف مراحل التنفيذ <Icon name="down" size={14} />
                </>
              ) : (
                <>
                  Explore delivery phases <Icon name="down" size={14} />
                </>
              )}
            </a>
          </div>

          {/* Credibility Strip */}
          <div className="compact-hero-trust choreo-trust">
            <span className="trust-indicator-item">
              <span className="trust-check">✓</span>
              {isAr ? "وضوح تعاقدي كامل" : "Contractual Clarity"}
            </span>
            <span className="trust-sep">/</span>
            <span className="trust-indicator-item">
              <span className="trust-check">✓</span>
              {isAr ? "مخرجات معتمدة لكل مرحلة" : "Verified Phase Deliverables"}
            </span>
            <span className="trust-sep">/</span>
            <span className="trust-indicator-item">
              <span className="trust-check">✓</span>
              {isAr ? "تسليم شامل بلا ارتهان" : "Zero Vendor Lock-in"}
            </span>
          </div>
        </div>

        {/* Right Column: Custom Delivery Pipeline Graphic */}
        <div className="compact-hero-visual-col">
          <ProcessHeroGraphic locale={locale} />
        </div>
      </div>
    </section>
  );
}

function ProcessHeroGraphic({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";

  const pipelineSteps = [
    {
      num: "01",
      name: isAr ? "الاكتشاف" : "Discovery",
      tag: isAr ? "فهم القرار" : "Requirements",
      status: "COMPLETED",
      active: false,
    },
    {
      num: "02",
      name: isAr ? "النطاق والتصميم" : "Architecture",
      tag: isAr ? "نموذج معتمد" : "Prototype & Specs",
      status: "COMPLETED",
      active: false,
    },
    {
      num: "03",
      name: isAr ? "التطوير والمراجعة" : "Development",
      tag: isAr ? "سبرنتات برمجية" : "CI/CD Sprints",
      status: "IN PROGRESS",
      active: true,
    },
    {
      num: "04",
      name: isAr ? "قبول المستخدم" : "Validation",
      tag: isAr ? "اختبار سيناريوهات" : "UAT Sign-off",
      status: "QUEUED",
      active: false,
    },
    {
      num: "05",
      name: isAr ? "التسليم والدعم" : "Handover",
      tag: isAr ? "ملكية 100%" : "Full IP Handover",
      status: "QUEUED",
      active: false,
    },
  ];

  return (
    <div className="process-hero-art" aria-hidden="true" dir="ltr">
      <div className="process-console-window">
        {/* Console Header */}
        <div className="process-console-header">
          <div className="process-console-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="process-console-url">
            <span>frentex.methodology / pipeline.v2</span>
          </div>
          <div className="process-console-status">
            <span className="process-status-pulse" />
            <span>STAGE-GATE ACTIVE</span>
          </div>
        </div>

        {/* Console Body: 5-Step Pipeline Flow */}
        <div className="process-pipeline-stage">
          {/* Ambient Grid Pattern */}
          <div className="process-pipeline-grid">
            {pipelineSteps.map((step, idx) => (
              <div
                key={step.num}
                className={`pipeline-step-card ${step.active ? "active-step" : ""}`}
                dir={isAr ? "rtl" : "ltr"}
              >
                <div className="step-card-header">
                  <span className="step-num-badge">{step.num}</span>
                  <span className={`step-status-chip status-${step.status.toLowerCase().replace(" ", "-")}`}>
                    {step.status}
                  </span>
                </div>
                <div className="step-name">{step.name}</div>
                <div className="step-tag">{step.tag}</div>

                {idx < pipelineSteps.length - 1 && (
                  <div className="step-connector-line" />
                )}
              </div>
            ))}
          </div>

          {/* Real-time Stage-Gate Telemetry Banner */}
          <div className="process-stage-telemetry" dir={isAr ? "rtl" : "ltr"}>
            <div className="telemetry-badge">
              <span className="pulse-beacon" />
              <span>{isAr ? "بوابة مراجعة إلزامية بين كل مرحلتين" : "Mandatory Review Gate Between Stages"}</span>
            </div>
            <div className="telemetry-stat">
              <span>{isAr ? "نسبة الالتزام بالمخرجات: 100%" : "Deliverable Verification: 100%"}</span>
            </div>
          </div>
        </div>

        {/* Console Footer */}
        <div className="process-console-footer" dir={isAr ? "rtl" : "ltr"}>
          <div className="process-footer-stat">
            <span className="stat-label">{isAr ? "إدارة التغيير" : "Change Control"}</span>
            <span className="stat-val">{isAr ? "توثيق واعتماد مسبق" : "Pre-Approved Scope"}</span>
          </div>
          <div className="process-footer-sep" />
          <div className="process-footer-stat">
            <span className="stat-label">{isAr ? "التواصل" : "Governance"}</span>
            <span className="stat-val">{isAr ? "مسؤول اتصال مباشر" : "Single POC & Logs"}</span>
          </div>
          <div className="process-footer-sep" />
          <div className="process-footer-stat">
            <span className="stat-label">{isAr ? "السيادة" : "Sovereignty"}</span>
            <span className="stat-val">{isAr ? "ملكية كاملة للشفرة" : "100% Code Ownership"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
