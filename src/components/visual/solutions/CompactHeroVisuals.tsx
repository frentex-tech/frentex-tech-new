import type { Locale } from "@/i18n/config";
import type { SolutionSlug } from "@/content/solutions";

interface CompactHeroVisualProps {
  slug: SolutionSlug;
  locale: Locale;
}

export function CompactHeroVisual({ slug, locale }: CompactHeroVisualProps) {
  const isAr = locale === "ar";

  switch (slug) {
    case "platforms":
      return <PlatformsHeroGraphic isAr={isAr} />;
    case "apps":
      return <AppsHeroGraphic isAr={isAr} />;
    case "business":
      return <BusinessHeroGraphic isAr={isAr} />;
    case "integration":
      return <IntegrationHeroGraphic isAr={isAr} />;
    case "automation":
      return <AutomationHeroGraphic isAr={isAr} />;
    case "support":
      return <SupportHeroGraphic isAr={isAr} />;
    default:
      return null;
  }
}

/* ==========================================================================
   1. Platforms Hero Graphic — Connected Architecture Blueprint
   ========================================================================== */
function PlatformsHeroGraphic({ isAr }: { isAr: boolean }) {
  return (
    <div className="compact-hero-graphic platforms-hero-art">
      <div className="graphic-top-pill">
        <span className="pulse-indicator-green" />
        <span className="graphic-tag">
          {isAr ? "معمارية موزعة • Edge PoP" : "Distributed Edge Architecture"}
        </span>
      </div>

      <div className="platforms-nodes-flow">
        {/* Tier 1: Edge CDN */}
        <div className="flow-node node-edge">
          <div className="node-icon-circle">🌐</div>
          <div className="node-texts">
            <strong>{isAr ? "بوابة الحافة (Edge CDN)" : "Edge CDN & PoP"}</strong>
            <small>Latency &lt; 30ms • SSR/SSG</small>
          </div>
          <span className="node-chip">Riyadh &amp; Jeddah</span>
        </div>

        {/* Animated Connector 1 */}
        <div className="flow-connector-line">
          <span className="data-packet-dot packet-1" />
        </div>

        {/* Tier 2: Security & WAF */}
        <div className="flow-node node-sec">
          <div className="node-icon-circle">🔒</div>
          <div className="node-texts">
            <strong>{isAr ? "بوابة الأمان والتحقق" : "Security & Auth Gateway"}</strong>
            <small>TLS 1.3 • OAuth2 / SSO</small>
          </div>
          <span className="node-chip">Zero-Trust WAF</span>
        </div>

        {/* Animated Connector 2 */}
        <div className="flow-connector-line">
          <span className="data-packet-dot packet-2" />
        </div>

        {/* Tier 3: Headless Core */}
        <div className="flow-node node-core">
          <div className="node-icon-circle">⚡</div>
          <div className="node-texts">
            <strong>{isAr ? "محرك المنصة والبيانات" : "Headless Engine & APIs"}</strong>
            <small>Next.js • GraphQL • Microservices</small>
          </div>
          <span className="node-chip">Sub-second TTFB</span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. Applications Hero Graphic — Native Device & Offline SQLite
   ========================================================================== */
function AppsHeroGraphic({ isAr }: { isAr: boolean }) {
  return (
    <div className="compact-hero-graphic apps-hero-art">
      <div className="apps-device-composition">
        {/* Compact Phone Frame */}
        <div className="compact-phone-frame">
          <div className="compact-phone-notch">
            <span className="notch-camera" />
          </div>
          <div className="compact-phone-screen">
            <div className="phone-mini-header">
              <span className="mini-time">9:41</span>
              <span className="mini-network">5G • 100%</span>
            </div>

            <div className="mini-app-card active-card">
              <div className="mini-card-head">
                <span className="mini-badge-blue">iOS &amp; Android Native</span>
              </div>
              <strong className="mini-title">
                {isAr ? "تطبيق العمليات الميدانية" : "Field Operations App"}
              </strong>
              <div className="mini-sync-status">
                <span className="sync-pulse-dot" />
                <span>{isAr ? "مزامنة SQLite محلية نشطة" : "SQLite Offline Engine"}</span>
              </div>
            </div>

            <div className="mini-app-card secondary-card">
              <span className="mini-subtext">
                {isAr ? "استجابة 60-120fps سلسة" : "Fluid 60-120 FPS Motion"}
              </span>
            </div>
          </div>
        </div>

        {/* Floating Side Spec Badges */}
        <div className="apps-floating-widgets">
          <div className="floating-spec-pill">
            <span className="spec-icon">🛡️</span>
            <div>
              <small>{isAr ? "الأمان البيومتري" : "Biometric Security"}</small>
              <strong>FaceID &amp; TouchID</strong>
            </div>
          </div>

          <div className="floating-spec-pill">
            <span className="spec-icon">⚡</span>
            <div>
              <small>{isAr ? "نظام العمل" : "Operation Mode"}</small>
              <strong>{isAr ? "يعمل دون اتصال 100%" : "100% Offline-First"}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. Business Solutions Hero Graphic — Operations & ZATCA Ledger
   ========================================================================== */
function BusinessHeroGraphic({ isAr }: { isAr: boolean }) {
  return (
    <div className="compact-hero-graphic business-hero-art">
      <div className="graphic-top-pill">
        <span className="pulse-indicator-green" />
        <span className="graphic-tag">
          {isAr ? "منظومة العمليات والفاتورة الإلكترونية" : "Enterprise ERP & ZATCA Phase 2"}
        </span>
      </div>

      <div className="business-pipeline-card">
        <div className="pipeline-cells-grid">
          <div className="pipeline-cell">
            <span className="cell-icon">👤</span>
            <div className="cell-info">
              <strong>{isAr ? "إدارة العملاء" : "CRM & Master Data"}</strong>
              <small>{isAr ? "سجل العملاء الموحد" : "Unified Account Hub"}</small>
            </div>
          </div>

          <div className="cell-connector-arrow">{isAr ? "←" : "→"}</div>

          <div className="pipeline-cell highlight-cell">
            <span className="cell-icon">📦</span>
            <div className="cell-info">
              <strong>{isAr ? "المخزون وسلاسل الإمداد" : "Inventory & Supply"}</strong>
              <small>{isAr ? "مزامنة فورية متعددة الفروع" : "Multi-branch Sync"}</small>
            </div>
          </div>
        </div>

        <div className="pipeline-bottom-stamp">
          <div className="zatca-badge-row">
            <span className="zatca-shield">🏛️</span>
            <div className="zatca-texts">
              <strong>{isAr ? "معتمد لهيئة الزكاة والضريبة (ZATCA Phase 2)" : "ZATCA Phase 2 E-Invoicing Certified"}</strong>
              <small>{isAr ? "ختم مشفر وتوقيع رقمي فوري • مطابقة محاسبية" : "Cryptographic Hash & Cryptographic QR Verification"}</small>
            </div>
            <span className="zatca-check">✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. Integration Hero Graphic — API Gateway & Message Bus
   ========================================================================== */
function IntegrationHeroGraphic({ isAr }: { isAr: boolean }) {
  return (
    <div className="compact-hero-graphic integration-hero-art">
      <div className="graphic-top-pill">
        <span className="pulse-indicator-green" />
        <span className="graphic-tag">
          {isAr ? "بوابة الربط وموزع الرسائل" : "Enterprise API Gateway & Message Bus"}
        </span>
      </div>

      <div className="integration-schematic-box">
        {/* Inbound Protocols */}
        <div className="proto-stack">
          <span className="proto-badge">REST / JSON</span>
          <span className="proto-badge">GraphQL Mesh</span>
          <span className="proto-badge">Kafka Streams</span>
        </div>

        {/* Central Router Core */}
        <div className="router-core-box">
          <div className="router-icon">⚡</div>
          <div className="router-meta">
            <strong>{isAr ? "محرك التوجيه الذكي" : "Intelligent Message Bus"}</strong>
            <small>OpenAPI 3.1 • Zero Data Loss</small>
          </div>
          <span className="router-status">99.992% SLA</span>
        </div>

        {/* Outbound Enterprise Targets */}
        <div className="target-stack">
          <span className="target-pill">SAP / Oracle ERP</span>
          <span className="target-pill">{isAr ? "منصة الفاتورة" : "ZATCA Gateway"}</span>
          <span className="target-pill">{isAr ? "سجل التدقيق" : "Audit Warehouse"}</span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   5. Automation Hero Graphic — Intelligent Document AI & OCR
   ========================================================================== */
function AutomationHeroGraphic({ isAr }: { isAr: boolean }) {
  return (
    <div className="compact-hero-graphic automation-hero-art">
      <div className="graphic-top-pill">
        <span className="pulse-indicator-green" />
        <span className="graphic-tag">
          {isAr ? "أتمتة الوثائق • Straight-Through" : "Document AI & Automated Workflow"}
        </span>
      </div>

      <div className="ocr-pipeline-card">
        <div className="ocr-preview-row">
          <div className="ocr-doc-thumb">
            <span className="doc-icon">📄</span>
            <div className="doc-laser-bar" />
          </div>

          <div className="ocr-extracted-preview">
            <div className="extracted-metric">
              <span className="metric-score">96.8%</span>
              <span className="metric-lbl">{isAr ? "معدل ثقة الذكاء الاصطناعي" : "AI Confidence"}</span>
            </div>
            <div className="ocr-field-lines">
              <div className="field-tag-line">
                <span>{isAr ? "استخراج عربي / إنجليزي" : "Bilingual Dual OCR"}</span>
                <span className="field-check">✓</span>
              </div>
              <div className="field-tag-line">
                <span>{isAr ? "مطابقة فواتير وأوامر الشراء" : "3-Way PO Matching"}</span>
                <span className="field-check">✓</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ocr-bottom-decision">
          <span className="decision-chip">
            ⚡ {isAr ? "معالجة مباشرة دون تدخل بشري (STP > 85%)" : "Straight-Through Auto-Post (STP > 85%)"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   6. Support Hero Graphic — 24/7 Multi-Region Telemetry
   ========================================================================== */
function SupportHeroGraphic({ isAr }: { isAr: boolean }) {
  return (
    <div className="compact-hero-graphic support-hero-art">
      <div className="graphic-top-pill">
        <span className="pulse-indicator-green" />
        <span className="graphic-tag">
          {isAr ? "مراقبة استباقية 24/7/365" : "Proactive Multi-Region Telemetry"}
        </span>
      </div>

      <div className="telemetry-dashboard-card">
        {/* Top Uptime Metric */}
        <div className="telemetry-top-strip">
          <div>
            <span className="uptime-label">{isAr ? "جاهزية مثبتة (90 يومًا)" : "90-Day System Uptime"}</span>
            <div className="uptime-num">99.99%</div>
          </div>
          <div className="sla-badge-box">
            <span className="sla-tag-red">{isAr ? "استجابة الحالات الحرجة" : "P1 Critical Response"}</span>
            <strong>&lt; 15 Minutes</strong>
          </div>
        </div>

        {/* Regional Ping Grid */}
        <div className="mini-regions-grid">
          <div className="region-chip">
            <span className="dot-green-ping" />
            <span>{isAr ? "الرياض 8ms" : "Riyadh 8ms"}</span>
          </div>
          <div className="region-chip">
            <span className="dot-green-ping" />
            <span>{isAr ? "جدة 12ms" : "Jeddah 12ms"}</span>
          </div>
          <div className="region-chip">
            <span className="dot-green-ping" />
            <span>{isAr ? "دبي 18ms" : "Dubai 18ms"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
