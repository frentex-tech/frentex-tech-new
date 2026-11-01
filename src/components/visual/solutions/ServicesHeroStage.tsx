"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { SolutionSlug } from "@/content/solutions";
import { pageLink } from "@/i18n/availability";
import { solutionRoute } from "@/i18n/routes";

interface ServicesHeroStageProps {
  locale: Locale;
}

interface SolutionPillar {
  slug: SolutionSlug;
  num: string;
  title: string;
  tagline: string;
  specs: string;
  icon: string;
  accent: string;
  metrics: string;
  connectedNodes: string[];
}

export function ServicesHeroStage({ locale }: ServicesHeroStageProps) {
  const isAr = locale === "ar";
  const [activeSlug, setActiveSlug] = useState<SolutionSlug>("platforms");
  const [isTracing, setIsTracing] = useState<boolean>(false);
  const [traceStep, setTraceStep] = useState<number>(0);

  const pillars: SolutionPillar[] = isAr
    ? [
        {
          slug: "platforms",
          num: "01",
          title: "المنصات الرقمية وبوابات الأعمال",
          tagline: "بنية Headless وسرعة استجابة فائقة",
          specs: "بوابات مؤسسية متعددة اللغات مدعومة بخوادم حافة (Edge CDN) في المملكة لتوفير سرعة تحميل < 400ms وتوافق كامل لمحركات البحث.",
          icon: "🌐",
          accent: "#38bdf8",
          metrics: "زمن استجابة < 30ms • دعم RTL/LTR",
          connectedNodes: ["apps", "integration"],
        },
        {
          slug: "apps",
          num: "02",
          title: "تطبيقات الهواتف الذكية",
          tagline: "كفاءة أصلية ونظام عمل دون اتصال",
          specs: "تطبيقات أصلية لنظامي iOS و Android مع قاعدة بيانات SQLite محلية تتيح للفرق الميدانية والعملاء إنجاز المعاملات دون الحاجة لإنترنت.",
          icon: "📱",
          accent: "#60a5fa",
          metrics: "60 FPS • مزامنة SQLite تلقائية",
          connectedNodes: ["platforms", "integration"],
        },
        {
          slug: "integration",
          num: "03",
          title: "بوابات التكامل والربط المخصص",
          tagline: "موزع رسائل كافكا وبوابة API موحدة",
          specs: "بنية تحتية موحدة للربط بين مختلف الأنظمة القديمة والحديثة عبر OpenAPI 3.1 مع معالجة ملايين الأحداث دون فقدان أي معاملة.",
          icon: "⚡",
          accent: "#f59e0b",
          metrics: "OpenAPI 3.1 • Zero-Loss Queue",
          connectedNodes: ["business", "automation"],
        },
        {
          slug: "business",
          num: "04",
          title: "الأنظمة المؤسسية وسير العمل",
          tagline: "إدارة العمليات والفاتورة الإلكترونية",
          specs: "محركات أعمال مخصصة لإدارة المخزون والمبيعات وسلاسل الإمداد مع ربط رسمي معتمد مع منصة فاتورة (ZATCA Phase 2).",
          icon: "💼",
          accent: "#10b981",
          metrics: "معتمد ZATCA • سجل تدقيق مشفر",
          connectedNodes: ["automation", "support"],
        },
        {
          slug: "automation",
          num: "05",
          title: "الأتمتة ومعالجة المستندات",
          tagline: "ذكاء اصطناعي ثنائي اللغة ومسارات STP",
          specs: "استخراج ذكي للنصوص والجداول من الفواتير والعقود المعقدة باللغتين العربية والإنجليزية مع إحالة آلية للحالات الاستثنائية.",
          icon: "🤖",
          accent: "#a78bfa",
          metrics: "STP > 85% • استخراج جداول بدقة 99%",
          connectedNodes: ["business", "support"],
        },
        {
          slug: "support",
          num: "06",
          title: "الدعم والمراقبة المستمرة 24/7",
          tagline: "اتفاقيات مستوى خدمة صارمة وجاهزية 99.99%",
          specs: "مراقبة دورية كل 30 ثانية لكافة الخوادم الإقليمية، واستجابة للحالات الحرجة P1 خلال أقل من 15 دقيقة، وترقيات مستمرة دون توقف.",
          icon: "🛡️",
          accent: "#ec4899",
          metrics: "SLA < 15m • جاهزية مثبتة 99.99%",
          connectedNodes: ["platforms", "apps", "business"],
        },
      ]
    : [
        {
          slug: "platforms",
          num: "01",
          title: "Digital Platforms & Enterprise Portals",
          tagline: "Headless Decoupled Architecture & Edge CDN",
          specs: "High-scale bilingual corporate portals powered by regional edge PoPs across Saudi Arabia for sub-second speeds and flawless responsive delivery.",
          icon: "🌐",
          accent: "#38bdf8",
          metrics: "Latency < 30ms • Native RTL & LTR",
          connectedNodes: ["apps", "integration"],
        },
        {
          slug: "apps",
          num: "02",
          title: "Native Mobile Applications",
          tagline: "60 FPS Native Runtime & Offline-First Engine",
          specs: "Production iOS and Android native applications with offline-first SQLite sync, biometric security, and native device hardware utilization.",
          icon: "📱",
          accent: "#60a5fa",
          metrics: "Fluid 60 FPS • SQLite Sync Engine",
          connectedNodes: ["platforms", "integration"],
        },
        {
          slug: "integration",
          num: "03",
          title: "Integration & Enterprise API Mesh",
          tagline: "OpenAPI 3.1 & Kafka Event Streaming",
          specs: "Enterprise message bus and API gateway synchronizing legacy systems, microservices, payment rails, and third-party partner portals.",
          icon: "⚡",
          accent: "#f59e0b",
          metrics: "OpenAPI 3.1 • Zero-Loss Queue",
          connectedNodes: ["business", "automation"],
        },
        {
          slug: "business",
          num: "04",
          title: "Business Systems & Operations Core",
          tagline: "Custom ERP Engines & ZATCA Phase 2 E-Invoicing",
          specs: "Custom business logic engines, inventory tracking, approval hierarchies, and certified ZATCA Phase 2 electronic invoicing compliance.",
          icon: "💼",
          accent: "#10b981",
          metrics: "ZATCA Certified • Cryptographic Ledger",
          connectedNodes: ["automation", "support"],
        },
        {
          slug: "automation",
          num: "05",
          title: "Intelligent Process Automation & AI",
          tagline: "Bilingual OCR & Straight-Through Processing",
          specs: "AI-assisted document understanding (OCR), straight-through workflow orchestration, and human-in-the-loop governance checkpoints.",
          icon: "🤖",
          accent: "#a78bfa",
          metrics: "STP Rate > 85% • 99% Table Extraction",
          connectedNodes: ["business", "support"],
        },
        {
          slug: "support",
          num: "06",
          title: "24/7 Observability & Support",
          tagline: "Strict SLAs & Zero-Downtime Evolution",
          specs: "Proactive 24/7 infrastructure observability, strict SLA incident response protocols, and continuous evolutionary development cycles.",
          icon: "🛡️",
          accent: "#ec4899",
          metrics: "Critical SLA < 15m • 99.99% Uptime",
          connectedNodes: ["platforms", "apps", "business"],
        },
      ];

  const currentPillar = pillars.find((p) => p.slug === activeSlug) || pillars[0];
  const currentLink = pageLink(locale, solutionRoute(currentPillar.slug));

  const handleSimulateTrace = () => {
    if (isTracing) return;
    setIsTracing(true);
    setTraceStep(1);
    setActiveSlug("platforms");

    setTimeout(() => {
      setTraceStep(2);
      setActiveSlug("apps");
    }, 1100);

    setTimeout(() => {
      setTraceStep(3);
      setActiveSlug("integration");
    }, 2200);

    setTimeout(() => {
      setTraceStep(4);
      setActiveSlug("business");
    }, 3300);

    setTimeout(() => {
      setTraceStep(5);
      setActiveSlug("automation");
    }, 4400);

    setTimeout(() => {
      setTraceStep(6);
      setActiveSlug("support");
    }, 5500);

    setTimeout(() => {
      setIsTracing(false);
      setTraceStep(0);
    }, 6600);
  };

  return (
    <div className="services-hero-stage">
      {/* Top Console Bar */}
      <div className="stage-top-console">
        <div className="console-left">
          <div className="mac-dots">
            <span className="dot dot-red" />
            <span className="dot dot-amber" />
            <span className="dot dot-green" />
          </div>
          <span className="console-title">FRENTEX CONNECTED DIGITAL ECOSYSTEM</span>
        </div>
        <div className="console-right">
          <button
            type="button"
            className={`trace-simulation-btn ${isTracing ? "running" : ""}`}
            onClick={handleSimulateTrace}
            disabled={isTracing}
          >
            <span className="trace-pulse-dot" />
            <span>
              {isTracing
                ? (isAr ? `تتبع تدفق المعاملة: مرحلة ${traceStep}/6...` : `Tracing Enterprise Flow: Step ${traceStep}/6...`)
                : (isAr ? "محاكاة تدفق المعاملة الشاملة ⚡" : "Simulate Live Enterprise Flow ⚡")}
            </span>
          </button>
        </div>
      </div>

      {/* Main Dual Stage */}
      <div className="stage-workspace-grid">
        {/* Left / Pillar Navigation Orbit Grid */}
        <div className="stage-pillars-grid">
          {pillars.map((pillar) => {
            const isSelected = activeSlug === pillar.slug;
            return (
              <button
                key={pillar.slug}
                type="button"
                className={`stage-pillar-card ${isSelected ? "selected" : ""} ${isTracing && activeSlug === pillar.slug ? "tracing-active" : ""}`}
                onClick={() => setActiveSlug(pillar.slug)}
                style={{ "--pillar-accent": pillar.accent } as React.CSSProperties}
              >
                <div className="pillar-card-top">
                  <div className="pillar-icon-box">
                    <span>{pillar.icon}</span>
                  </div>
                  <span className="pillar-number">{pillar.num}</span>
                </div>
                <div className="pillar-card-info">
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <span className="pillar-tagline">{pillar.tagline}</span>
                </div>
                <div className="pillar-card-footer">
                  <span className="pillar-metric-chip">{pillar.metrics}</span>
                  <span className="pillar-arrow-indicator">{isAr ? "←" : "→"}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right / Live Architectural Inspector Panel */}
        <div className="stage-inspector-panel">
          <div className="inspector-inner-card">
            <div className="inspector-head-meta">
              <span className="inspector-layer-badge">
                LAYER {currentPillar.num} SPECIFICATION
              </span>
              <span className="inspector-status-badge">
                <span className="status-dot" />
                <span>{isAr ? "نظام نشط" : "Online & Scaled"}</span>
              </span>
            </div>

            <div className="inspector-core-title-row">
              <div className="inspector-icon-large">
                <span>{currentPillar.icon}</span>
              </div>
              <div>
                <h2>{currentPillar.title}</h2>
                <p className="inspector-sub-tagline">{currentPillar.tagline}</p>
              </div>
            </div>

            <p className="inspector-long-specs">{currentPillar.specs}</p>

            {/* Performance Benchmark Bar */}
            <div className="inspector-benchmark-box">
              <div className="benchmark-head">
                <span>{isAr ? "المؤشر الهندسي المعتمد:" : "Engineered SLA Metric:"}</span>
                <strong style={{ color: currentPillar.accent }}>{currentPillar.metrics}</strong>
              </div>
              <div className="benchmark-bar-track">
                <div
                  className="benchmark-bar-fill"
                  style={{ width: "95%", backgroundColor: currentPillar.accent }}
                />
              </div>
            </div>

            {/* Direct Architecture Interlinks */}
            <div className="inspector-interlinks-box">
              <span className="interlinks-title">
                {isAr ? "التكاملات والروابط المباشرة:" : "Direct Architecture Interlinks:"}
              </span>
              <div className="interlinks-pills">
                {currentPillar.connectedNodes.map((targetSlug) => {
                  const targetPillar = pillars.find((p) => p.slug === targetSlug);
                  if (!targetPillar) return null;
                  return (
                    <button
                      key={targetSlug}
                      type="button"
                      className="interlink-pill-btn"
                      onClick={() => setActiveSlug(targetPillar.slug)}
                    >
                      <span>🔗 {targetPillar.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Deep-Dive Action Button */}
            <div className="inspector-action-bottom">
              <Link
                href={currentLink.href}
                hrefLang={currentLink.hrefLang}
                className="inspector-explore-btn"
              >
                <span>
                  {isAr
                    ? `استعراض المعمارية والمخرجات التفصيلية لـ (${currentPillar.title})`
                    : `Inspect Full Architecture & Deliverables for ${currentPillar.title}`}
                </span>
                <span className="explore-arrow-sym">{isAr ? "←" : "→"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
