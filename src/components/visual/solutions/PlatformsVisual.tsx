"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";

interface PlatformsVisualProps {
  locale: Locale;
}

export function PlatformsVisual({ locale }: PlatformsVisualProps) {
  const isAr = locale === "ar";
  const [activeTier, setActiveTier] = useState<number>(0);

  const tiers = isAr
    ? [
        {
          id: "edge",
          tag: "المستوى الأول",
          title: "طبقة الحافة والشبكة الموزعة (Edge & CDN)",
          specs: "شبكة توزيع محتوى في الرياض وجدة مع معالجة ذكية للاتجاهين (RTL/LTR) وتخزين مؤقت لسرعة استجابة فائقة.",
          metrics: "زمن وصول < 30ms • معالجة أطراف سحابية",
          badges: ["Edge Caching", "Geo Routing", "SSR & SSG"],
          pulseSpeed: "2s",
        },
        {
          id: "security",
          tag: "المستوى الثاني",
          title: "بوابة الأمان والتحقق الموحد (Auth & WAF)",
          specs: "حماية الخوادم بجدار ناري سحابي (WAF)، وتشفير كامل عبر TLS 1.3، وإدارة هويات الدخول عبر OAuth2 و SSO.",
          metrics: "حماية من هجمات DDoS • توثيق ثنائي",
          badges: ["OAuth2 / SSO", "Zero Trust", "Rate Limiter"],
          pulseSpeed: "2.5s",
        },
        {
          id: "core",
          tag: "المستوى الثالث",
          title: "محرك التطبيق وإدارة المحتوى (CMS & APIs)",
          specs: "بنية Headless مرنة تتيح إدارة المحتوى والترجمات لحظيًا وتغذية المنصة عبر واجهات GraphQL و REST سريعة.",
          metrics: "بنية Microservices • فصل الواجهات عن البيانات",
          badges: ["Headless CMS", "GraphQL API", "Webhook Engine"],
          pulseSpeed: "1.8s",
        },
        {
          id: "data",
          tag: "المستوى الرابع",
          title: "قواعد البيانات والتكاملات المؤسسية",
          specs: "قواعد بيانات موزعة ذات توافرية عالية، وتخزين مؤقت في الذاكرة عبر Redis، وربط مستمر مع أنظمة الـ ERP والـ CRM.",
          metrics: "تكرار فوري للبيانات • عزل تام للأمان",
          badges: ["PostgreSQL Cluster", "Redis Memory", "ERP Connector"],
          pulseSpeed: "3s",
        },
      ]
    : [
        {
          id: "edge",
          tag: "Tier 01",
          title: "Edge Delivery & Distributed CDN",
          specs: "Regional edge PoPs with intelligent RTL/LTR handling, static pre-rendering, and global low-latency asset caching.",
          metrics: "Latency < 30ms • Edge Worker SSR",
          badges: ["Edge Caching", "Geo Routing", "SSR & SSG"],
          pulseSpeed: "2s",
        },
        {
          id: "security",
          tag: "Tier 02",
          title: "Security Gateway & Identity Broker",
          specs: "Cloud WAF perimeter, strict TLS 1.3 transport encryption, and enterprise SSO integration with OAuth2 / SAML.",
          metrics: "DDoS Mitigation • Zero Trust Policy",
          badges: ["OAuth2 / SSO", "Zero Trust", "Rate Limiter"],
          pulseSpeed: "2.5s",
        },
        {
          id: "core",
          tag: "Tier 03",
          title: "Application Engine & Headless CMS",
          specs: "Decoupled headless architecture allowing real-time bilingual content workflows and high-concurrency API query execution.",
          metrics: "Microservices Mesh • Headless Decoupling",
          badges: ["Headless CMS", "GraphQL API", "Webhook Engine"],
          pulseSpeed: "1.8s",
        },
        {
          id: "data",
          tag: "Tier 04",
          title: "Data Persistence & Enterprise Connectors",
          specs: "High-availability database replication, in-memory Redis session caching, and secure ERP/CRM transactional bridges.",
          metrics: "Synchronous Replication • Isolated Backplanes",
          badges: ["PostgreSQL Cluster", "Redis Memory", "ERP Connector"],
          pulseSpeed: "3s",
        },
      ];

  const current = tiers[activeTier];

  return (
    <div className="tech-visual-card platforms-visual-root">
      {/* Top Console Bar */}
      <div className="tech-visual-toolbar">
        <div className="tech-toolbar-dots">
          <span className="dot dot-red" />
          <span className="dot dot-amber" />
          <span className="dot dot-green" />
        </div>
        <div className="tech-toolbar-url">
          <span className="tech-lock-icon" aria-hidden="true">🔒</span>
          <code>https://platform.frentex.cloud/architecture</code>
        </div>
        <div className="tech-toolbar-status">
          <span className="tech-ping-dot" />
          <span>{isAr ? "البنية نشطة • 99.9% توفر" : "Active Cluster • 99.9% Uptime"}</span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="platforms-stage">
        {/* Tier Selector Sidebar/Top bar */}
        <div className="platforms-tier-nav" role="tablist" aria-label={isAr ? "مستويات البنية البرمجية" : "Architecture Tiers"}>
          {tiers.map((tier, idx) => (
            <button
              key={tier.id}
              role="tab"
              aria-selected={activeTier === idx}
              aria-controls={`tier-panel-${tier.id}`}
              id={`tier-tab-${tier.id}`}
              className={`platforms-tier-tab ${activeTier === idx ? "active" : ""}`}
              onClick={() => setActiveTier(idx)}
            >
              <div className="tier-tab-header">
                <span className="tier-number">0{idx + 1}</span>
                <span className="tier-tag">{tier.tag}</span>
              </div>
              <strong className="tier-name">{tier.title.split("(")[0]}</strong>
            </button>
          ))}
        </div>

        {/* Dynamic Topology Blueprint */}
        <div className="platforms-diagram-area" role="tabpanel" id={`tier-panel-${current.id}`} aria-labelledby={`tier-tab-${current.id}`}>
          <div className="architecture-blueprint">
            {/* SVG Connecting Flow Lines */}
            <svg className="blueprint-circuit" viewBox="0 0 600 240" fill="none" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#347fcc" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#347fcc" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path d="M 50 120 L 190 120 M 230 120 L 370 120 M 410 120 L 550 120" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 50 120 L 550 120" stroke="url(#flowGrad)" strokeWidth="2.5" className="animated-flow-line" />
            </svg>

            {/* 4 Architectural Nodes */}
            <div className="blueprint-nodes-row">
              {tiers.map((t, idx) => {
                const isSelected = activeTier === idx;
                return (
                  <div
                    key={t.id}
                    className={`blueprint-node ${isSelected ? "selected" : ""}`}
                    onClick={() => setActiveTier(idx)}
                  >
                    <div className="node-icon-box">
                      {idx === 0 && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                        </svg>
                      )}
                      {idx === 1 && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      )}
                      {idx === 2 && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <path d="M8 21h8m-4-4v4" />
                        </svg>
                      )}
                      {idx === 3 && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                          <ellipse cx="12" cy="5" rx="9" ry="3" />
                          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                        </svg>
                      )}
                      {isSelected && <span className="node-ping" style={{ animationDuration: t.pulseSpeed }} />}
                    </div>
                    <span className="node-title">{t.tag}</span>
                    <span className="node-subtitle">{t.id.toUpperCase()}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Tier Technical Inspector Card */}
          <div className="tier-inspector-card">
            <div className="inspector-top">
              <div>
                <span className="inspector-pill">{current.tag}</span>
                <h4 className="inspector-heading">{current.title}</h4>
              </div>
              <div className="inspector-metric-badge">
                <span className="metric-pulse" />
                {current.metrics}
              </div>
            </div>
            <p className="inspector-desc">{current.specs}</p>
            <div className="inspector-badges">
              {current.badges.map((b) => (
                <span key={b} className="tech-badge">
                  <span className="badge-check">✓</span> {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Metrics Banner */}
      <div className="tech-visual-footer">
        <div className="foot-metric">
          <small>{isAr ? "متوسط سرعة التحميل" : "Avg Page Latency"}</small>
          <strong>24ms</strong>
        </div>
        <div className="foot-metric">
          <small>{isAr ? "معايير الأمان" : "Security Architecture"}</small>
          <strong>ISO & TLS 1.3</strong>
        </div>
        <div className="foot-metric">
          <small>{isAr ? "دعم اللغات" : "Language Routing"}</small>
          <strong>Native RTL / LTR</strong>
        </div>
        <div className="foot-metric">
          <small>{isAr ? "توافقية التصفح" : "Browser Compliance"}</small>
          <strong>100% Modern Web</strong>
        </div>
      </div>
    </div>
  );
}
