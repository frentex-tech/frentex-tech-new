import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { IntroContent } from "@/content/localized";
import { defaultLocale, localeSettings } from "@/i18n/config";
import { pageLink } from "@/i18n/availability";
import { ArrowText, Icon } from "@/components/visual/icons";
import { asset } from "@/lib/site";

interface AboutHeroProps {
  locale: Locale;
  intro: IntroContent;
  downloadLabel: string;
}

export function AboutHero({ locale, intro, downloadLabel }: AboutHeroProps) {
  const isAr = locale === "ar";
  const contactLink = pageLink(locale, "contact");

  return (
    <section className="compact-solution-hero about-hero-section">
      <div className="wrap compact-hero-container">
        {/* Left Column: Focused Executive Copy */}
        <div className="compact-hero-copy">
          <div className="compact-eyebrow-pill choreo-eyebrow">
            <span className="eyebrow-accent-dot" />
            <span className="eyebrow-label">{intro.eyebrow}</span>
            <span className="eyebrow-sep">•</span>
            <span className="eyebrow-category">
              {isAr ? "استوديو هندسة برمجيات" : "Software Engineering Studio"}
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
                  ناقش احتياج شركتك <Icon name="forward" size={16} />
                </>
              ) : (
                <>
                  Discuss your needs <Icon name="forward" size={16} />
                </>
              )}
            </Link>

            <a
              className="button outline compact-secondary-btn about-download-hero-btn"
              href={asset("/downloads/frentex-company-profile.pdf")}
              hrefLang={locale === defaultLocale ? undefined : localeSettings[defaultLocale].lang}
              download
            >
              <ArrowText text={downloadLabel} />
            </a>
          </div>

          {/* Studio Credibility Strip */}
          <div className="compact-hero-trust choreo-trust">
            <span className="trust-indicator-item">
              <span className="trust-check">✓</span>
              {isAr ? "هندسة سعودية 100%" : "100% In-House Engineering"}
            </span>
            <span className="trust-sep">/</span>
            <span className="trust-indicator-item">
              <span className="trust-check">✓</span>
              {isAr ? "معايير سحابية مؤسسية" : "Enterprise Cloud Standards"}
            </span>
            <span className="trust-sep">/</span>
            <span className="trust-indicator-item">
              <span className="trust-check">✓</span>
              {isAr ? "ملكية برمجية كاملة" : "Full Code Ownership"}
            </span>
          </div>
        </div>

        {/* Right Column: Technical Studio Architecture Graphic */}
        <div className="compact-hero-visual-col">
          <AboutHeroGraphic locale={locale} />
        </div>
      </div>
    </section>
  );
}

function AboutHeroGraphic({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";

  const pillars = [
    {
      title: isAr ? "الهندسة المؤسسية" : "Enterprise Systems",
      detail: isAr ? "أنظمة موزعة وقابلة للتوسع" : "High-throughput architectures",
      badge: "TypeScript / Cloud Native",
      icon: "⚙️",
      pos: "top-left",
    },
    {
      title: isAr ? "تجربة عربية أصيلة" : "Native RTL Ergonomics",
      detail: isAr ? "واجهات صُممت لسياق المنطقة" : "Culturally calibrated UX",
      badge: "RTL-First Design",
      icon: "🌐",
      pos: "top-right",
    },
    {
      title: isAr ? "انضباط معماري تام" : "Architectural Rigor",
      detail: isAr ? "شفرة نظيفة وتوثيق كامل" : "Zero technical debt mindset",
      badge: "Automated CI/CD",
      icon: "🛡️",
      pos: "bottom-left",
    },
    {
      title: isAr ? "سيادة تقنية للعميل" : "Direct IP Sovereignty",
      detail: isAr ? "تسليم شامل بلا ارتهان" : "100% turnkey handover",
      badge: "No Vendor Lock-In",
      icon: "🔑",
      pos: "bottom-right",
    },
  ];

  return (
    <div className="about-hero-art" aria-hidden="true" dir="ltr">
      {/* Studio Blueprint Console Window */}
      <div className="about-console-window">
        {/* Top Bar */}
        <div className="about-console-header">
          <div className="about-console-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="about-console-url">
            <span>frentex.studio.identity / sys.manifest.v2</span>
          </div>
          <div className="about-console-status">
            <span className="about-status-pulse" />
            <span>ACTIVE</span>
          </div>
        </div>

        {/* Central Stage: Central Studio Core with 4 Connected Pillars */}
        <div className="about-stage-body">
          {/* Central Frentex Core Hub */}
          <div className="about-core-hub">
            <div className="about-core-pulse-ring" />
            <div className="about-core-inner">
              <span className="about-core-logo">F</span>
              <span className="about-core-label">FRENTEX TECH</span>
              <span className="about-core-sub">ENGINEERING STUDIO</span>
            </div>
          </div>

          {/* Connecting SVG Circuit Lines */}
          <svg className="about-circuit-svg" viewBox="0 0 520 280">
            <defs>
              <linearGradient id="aboutGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#347fcc" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#173f61" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="aboutGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#347fcc" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#173f61" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Connecting lines from center (260, 140) to quadrants */}
            {/* Top-Left */}
            <path d="M 260 140 L 160 70" stroke="url(#aboutGrad1)" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Top-Right */}
            <path d="M 260 140 L 360 70" stroke="url(#aboutGrad2)" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Bottom-Left */}
            <path d="M 260 140 L 160 210" stroke="url(#aboutGrad1)" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Bottom-Right */}
            <path d="M 260 140 L 360 210" stroke="url(#aboutGrad2)" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>

          {/* 4 Quadrant Cards */}
          <div className="about-quadrants-grid">
            {pillars.map((item, idx) => (
              <div key={idx} className={`about-quad-card ${item.pos}`} dir={isAr ? "rtl" : "ltr"}>
                <div className="about-quad-top">
                  <span className="about-quad-icon">{item.icon}</span>
                  <span className="about-quad-badge">{item.badge}</span>
                </div>
                <div className="about-quad-title">{item.title}</div>
                <div className="about-quad-detail">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Telemetry Strip */}
        <div className="about-console-footer" dir={isAr ? "rtl" : "ltr"}>
          <div className="about-telemetry-item">
            <span className="telemetry-label">{isAr ? "الموقع" : "Location"}</span>
            <span className="telemetry-val">{isAr ? "الرياض، السعودية" : "Riyadh, KSA"}</span>
          </div>
          <div className="about-telemetry-sep" />
          <div className="about-telemetry-item">
            <span className="telemetry-label">{isAr ? "نموذج العمل" : "Operating Model"}</span>
            <span className="telemetry-val">{isAr ? "استوديو هندسي مباشر" : "Direct Studio Engineering"}</span>
          </div>
          <div className="about-telemetry-sep" />
          <div className="about-telemetry-item">
            <span className="telemetry-label">{isAr ? "السيادة" : "Sovereignty"}</span>
            <span className="telemetry-val">{isAr ? "ملكية كود 100%" : "100% IP Handover"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
