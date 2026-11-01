import type { Locale } from "@/i18n/config";
import type { IntroContent } from "@/content/localized";
import { ArrowText, Icon } from "@/components/visual/icons";
import { OpenBriefButton } from "@/components/BriefDialog";
import { contact } from "@/lib/site";

interface ContactHeroProps {
  locale: Locale;
  intro: IntroContent;
  whatsappAction: string;
  briefAction: string;
}

export function ContactHero({ locale, intro, whatsappAction, briefAction }: ContactHeroProps) {
  const isAr = locale === "ar";

  return (
    <section className="compact-solution-hero contact-hero-section">
      <div className="wrap compact-hero-container">
        {/* Left Column: Focused Executive Copy */}
        <div className="compact-hero-copy">
          <div className="compact-eyebrow-pill choreo-eyebrow">
            <span className="eyebrow-accent-dot" />
            <span className="eyebrow-label">{intro.eyebrow}</span>
            <span className="eyebrow-sep">•</span>
            <span className="eyebrow-category">
              {isAr ? "قناة التواصل المؤسسي المباشر" : "Direct Enterprise Channel"}
            </span>
          </div>

          <h1 className="compact-hero-h1 choreo-title">
            {intro.title[0]}
            <br />
            <span className="compact-hero-gradient">{intro.title[1]}</span>
          </h1>

          <p className="compact-hero-tagline choreo-desc">{intro.lead}</p>

          <div className="compact-hero-actions choreo-actions">
            <a
              className="button primary compact-cta-btn"
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowText text={whatsappAction} />
            </a>

            <OpenBriefButton className="button outline compact-secondary-btn contact-brief-hero-btn" data-open-brief-hero="">
              <span>{briefAction}</span>
              <Icon name="forward" size={14} />
            </OpenBriefButton>
          </div>

          {/* Credibility Strip */}
          <div className="compact-hero-trust choreo-trust">
            <span className="trust-indicator-item">
              <span className="trust-check">✓</span>
              {isAr ? "استجابة هندسية مباشرة" : "Direct Engineering Response"}
            </span>
            <span className="trust-sep">/</span>
            <span className="trust-indicator-item">
              <span className="trust-check">✓</span>
              {isAr ? "سرية تامة للمعلومات" : "Strict NDA & Privacy"}
            </span>
            <span className="trust-sep">/</span>
            <span className="trust-indicator-item">
              <span className="trust-check">✓</span>
              {isAr ? "نقاش استكشافي بدون التزام" : "Zero-Obligation Review"}
            </span>
          </div>
        </div>

        {/* Right Column: Custom Communications Hub Graphic */}
        <div className="compact-hero-visual-col">
          <ContactHeroGraphic locale={locale} />
        </div>
      </div>
    </section>
  );
}

function ContactHeroGraphic({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";

  const channels = [
    {
      id: "whatsapp",
      title: isAr ? "محادثة WhatsApp المباشرة" : "Direct WhatsApp Dispatch",
      val: contact.phoneDisplay,
      status: "ONLINE",
      icon: "💬",
      badge: isAr ? "استجابة سريعة" : "Fast Response",
    },
    {
      id: "email",
      title: isAr ? "البريد الإلكتروني المعتمد" : "Corporate Dispatch Email",
      val: contact.email,
      status: "MONITORED",
      icon: "✉️",
      badge: isAr ? "مراسلات رسمية" : "Official Inquiries",
    },
    {
      id: "brief",
      title: isAr ? "ملخص المتطلبات التفاعلي" : "Local Project Brief Tool",
      val: isAr ? "أداة تجهيز نطاق المشروع" : "Client-Side Scope Generator",
      status: "READY",
      icon: "📋",
      badge: isAr ? "محلي 100%" : "Client-Side Only",
    },
  ];

  return (
    <div className="contact-hero-art" aria-hidden="true" dir="ltr">
      <div className="contact-console-window">
        {/* Console Header */}
        <div className="contact-console-header">
          <div className="contact-console-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="contact-console-url">
            <span>frentex.dispatch / comms.active.v2</span>
          </div>
          <div className="contact-console-status">
            <span className="contact-status-pulse" />
            <span>DISPATCH ONLINE</span>
          </div>
        </div>

        {/* Console Body: Active Communications Nodes */}
        <div className="contact-stage-body">
          <div className="contact-nodes-list" dir={isAr ? "rtl" : "ltr"}>
            {channels.map((ch) => (
              <div key={ch.id} className={`contact-node-row ch-${ch.id}`}>
                <div className="node-icon-bubble">{ch.icon}</div>
                <div className="node-info-col">
                  <div className="node-title-row">
                    <span className="node-title">{ch.title}</span>
                    <span className="node-badge">{ch.badge}</span>
                  </div>
                  <div className="node-val" dir="ltr">{ch.val}</div>
                </div>
                <div className="node-status-pill">
                  <span className="status-dot" />
                  <span>{ch.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Response Telemetry Banner */}
          <div className="contact-response-banner" dir={isAr ? "rtl" : "ltr"}>
            <div className="response-time-indicator">
              <span className="clock-icon">⚡</span>
              <span>{isAr ? "زمن الاستجابة المعتاد: خلال ساعتي عمل" : "Typical Response: Within 2 Business Hours"}</span>
            </div>
            <div className="response-coverage">
              <span>{isAr ? "أوقات العمل: الأحد - الخميس (توقيت الرياض)" : "Sun - Thu • Riyadh Time (AST)"}</span>
            </div>
          </div>
        </div>

        {/* Console Footer */}
        <div className="contact-console-footer" dir={isAr ? "rtl" : "ltr"}>
          <div className="contact-footer-item">
            <span className="footer-label">{isAr ? "المقر الرئيسي" : "Headquarters"}</span>
            <span className="footer-val">{isAr ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"}</span>
          </div>
          <div className="contact-footer-sep" />
          <div className="contact-footer-item">
            <span className="footer-label">{isAr ? "طبيعة التواصل" : "Engagement"}</span>
            <span className="footer-val">{isAr ? "نقاش تقني واستشاري مباشر" : "Direct Senior Advisory"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
