import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { IntroContent } from "@/content/localized";
import { pageLink } from "@/i18n/availability";
import { ArrowText, Icon } from "@/components/visual/icons";

interface WorkHeroProps {
  locale: Locale;
  intro: IntroContent;
}

export function WorkHero({ locale, intro }: WorkHeroProps) {
  const isAr = locale === "ar";
  const contactLink = pageLink(locale, "contact");

  return (
    <section className="compact-solution-hero work-hero-section">
      <div className="wrap compact-hero-container">
        {/* Left Column: Focused Executive Copy */}
        <div className="compact-hero-copy">
          <div className="compact-eyebrow-pill choreo-eyebrow">
            <span className="eyebrow-accent-dot" />
            <span className="eyebrow-label">{intro.eyebrow}</span>
            <span className="eyebrow-sep">•</span>
            <span className="eyebrow-category">
              {isAr ? "مختبر النماذج التفاعلية" : "Interactive Demos & Prototypes"}
            </span>
          </div>

          <h1 className="compact-hero-h1 choreo-title">
            {typeof intro.title === "string" ? intro.title : intro.title[0]}
          </h1>

          <p className="compact-hero-tagline choreo-desc">{intro.lead}</p>

          <div className="compact-hero-actions choreo-actions">
            <a className="button primary compact-cta-btn" href="#lab-showcase">
              <ArrowText text={isAr ? "استكشف النماذج التفاعلية ↓" : "Explore Live Demos ↓"} />
            </a>
            <Link className="button outline compact-anchor-btn" href={contactLink.href} hrefLang={contactLink.hrefLang}>
              <span>{isAr ? "ناقش نطاق مشروعك" : "Discuss Your Enterprise Scope"}</span>
              <Icon name="forward" size={14} />
            </Link>
          </div>

          {/* Technical Trust Indicators Bar */}
          <div className="compact-hero-trust-bar choreo-trust">
            <span>✓ {isAr ? "بيئة تفاعلية حية" : "Live Interactive Sandbox"}</span>
            <span className="trust-dot">•</span>
            <span>✓ {isAr ? "محاكاة مسار العمل بالكامل" : "Full Workflow Simulation"}</span>
            <span className="trust-dot">•</span>
            <span>✓ {isAr ? "بيانات تجريبية آمنة" : "Isolated Sample State"}</span>
          </div>
        </div>

        {/* Right Column: Tailored Solution Lab Technology Graphic */}
        <div className="compact-hero-visual-wrapper">
          <WorkHeroGraphic isAr={isAr} />
        </div>
      </div>
    </section>
  );
}

function WorkHeroGraphic({ isAr }: { isAr: boolean }) {
  return (
    <div className="compact-hero-graphic work-hero-art">
      <div className="work-art-console-bar">
        <div className="tech-toolbar-dots">
          <span className="dot dot-red" />
          <span className="dot dot-amber" />
          <span className="dot dot-green" />
        </div>
        <div className="work-art-url">
          <span className="tech-lock-icon" aria-hidden="true">🔒</span>
          <code>https://lab.frentex.cloud/sandbox</code>
        </div>
        <div className="work-art-live-badge">
          <span className="pulse-indicator-green" />
          <span>{isAr ? "نشط" : "LIVE"}</span>
        </div>
      </div>

      <div className="work-art-body">
        {/* Top Sandbox Tag */}
        <div className="graphic-top-pill" style={{ marginBottom: "12px" }}>
          <span className="pulse-indicator-green" />
          <span className="graphic-tag">
            {isAr ? "٣ نماذج تفاعلية جاهزة للتجربة" : "3 Ready-To-Test Sandboxes"}
          </span>
        </div>

        {/* 3 Flow Nodes representing the 3 demos */}
        <div className="work-engines-stack">
          {/* Node 1: CRM */}
          <div className="flow-node work-engine-node">
            <div className="node-icon-circle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="5" height="18" rx="1" />
                <rect x="10" y="3" width="5" height="12" rx="1" />
                <rect x="17" y="3" width="5" height="15" rx="1" />
              </svg>
            </div>
            <div className="node-texts">
              <strong>{isAr ? "مدار — خط المبيعات (CRM)" : "Madar — CRM Pipeline"}</strong>
              <small>{isAr ? "تأهيل الصفقات • لوحة كانبان تفاعلية" : "Lead Lifecycle • Kanban Flow"}</small>
            </div>
            <span className="node-chip active-chip">
              {isAr ? "نموذج 01" : "Demo 01"}
            </span>
          </div>

          <div className="flow-connector-line">
            <span className="data-packet-dot packet-1" />
          </div>

          {/* Node 2: Workflow Ops */}
          <div className="flow-node work-engine-node">
            <div className="node-icon-circle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="m9 15 2 2 4-4" />
              </svg>
            </div>
            <div className="node-texts">
              <strong>{isAr ? "سير — مسارات الطلبات (Workflow)" : "Sayr — Operations Dispatch"}</strong>
              <small>{isAr ? "مصفوفة الموافقات • سجل تدقيق غير قابل للتعديل" : "Approval Matrix • Audit Logs"}</small>
            </div>
            <span className="node-chip active-chip">
              {isAr ? "نموذج 02" : "Demo 02"}
            </span>
          </div>

          <div className="flow-connector-line">
            <span className="data-packet-dot packet-2" />
          </div>

          {/* Node 3: ERP Stock */}
          <div className="flow-node work-engine-node">
            <div className="node-icon-circle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>
            </div>
            <div className="node-texts">
              <strong>{isAr ? "رصيد — المخزون والمالية (ERP)" : "Raseed — Inventory & ERP"}</strong>
              <small>{isAr ? "تتبع الأرصدة اللحظية • دورة أوامر الشراء" : "Real-time Stock • PO Automations"}</small>
            </div>
            <span className="node-chip active-chip">
              {isAr ? "نموذج 03" : "Demo 03"}
            </span>
          </div>
        </div>

        {/* Bottom Sandbox Telemetry Strip */}
        <div className="work-art-telemetry-strip">
          <div className="mini-telemetry-item">
            <small>{isAr ? "زمن استجابة التفاعل" : "Runtime Latency"}</small>
            <strong>&lt; 15ms</strong>
          </div>
          <div className="mini-telemetry-item">
            <small>{isAr ? "عزل البيانات" : "State Isolation"}</small>
            <strong>In-Memory Sandbox</strong>
          </div>
          <div className="mini-telemetry-item">
            <small>{isAr ? "المعايير البرمجية" : "Architecture"}</small>
            <strong>Strict TypeScript</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
