"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pageLink } from "@/i18n/availability";

import type { SolutionSlug } from "@/content/solutions";
import { solutionRoute } from "@/i18n/routes";

interface ServicesEcosystemProps {
  locale: Locale;
}

interface EcosystemNode {
  id: string;
  slug: SolutionSlug;
  title: string;
  tag: string;
  icon: string;
  specs: string;
  connectedTo: string[];
}

export function ServicesEcosystem({ locale }: ServicesEcosystemProps) {
  const isAr = locale === "ar";
  const [activeNode, setActiveNode] = useState<string>("platforms");
  const [isTracing, setIsTracing] = useState<boolean>(false);
  const [traceStep, setTraceStep] = useState<number>(0);

  const nodes: EcosystemNode[] = [
    {
      id: "platforms",
      slug: "platforms",
      title: isAr ? "المنصات الرقمية والبوابات" : "Digital Platforms & Portals",
      tag: isAr ? "بنية متقدمة للويب" : "High-Scale Web",
      icon: "🌐",
      specs: isAr
        ? "بوابات مؤسسية ومتاجر سريعة تعتمد بنية Headless وتوزيع سحابي عبر خوادم Edge في المملكة لضمان سرعة فائقة وتجربة مستخدم لا مثيل لها."
        : "Headless web platforms and portals powered by edge PoPs across Saudi Arabia for sub-second speeds and flawless responsive delivery.",
      connectedTo: ["apps", "integration"],
    },
    {
      id: "apps",
      slug: "apps",
      title: isAr ? "تطبيقات الهواتف الذكية" : "Native Mobile Applications",
      tag: isAr ? "أندرويد وآبل" : "iOS & Android",
      icon: "📱",
      specs: isAr
        ? "تطبيقات أصلية (Native & Cross-Platform) تعمل بكفاءة حتى عند انقطاع الإنترنت مع مزامنة محلية وتكامل تام مع البصمة والكاميرا والدفع الرقمي."
        : "Production iOS and Android native applications with offline-first SQLite sync, biometric security, and native device hardware utilization.",
      connectedTo: ["platforms", "integration"],
    },
    {
      id: "integration",
      slug: "integration",
      title: isAr ? "التكاملات وبوابات الربط" : "Integration & API Mesh",
      tag: isAr ? "ربط الأنظمة" : "Enterprise Bus",
      icon: "⚡",
      specs: isAr
        ? "بوابة API وموزع رسائل مركزي يربط بين مختلف الأنظمة القديمة والحديثة، ويضمن تدفق البيانات بأمان تام ودون فقدان أي معاملة."
        : "Enterprise message bus and API gateway synchronizing legacy systems, microservices, payment rails, and third-party partner portals.",
      connectedTo: ["business", "automation"],
    },
    {
      id: "business",
      slug: "business",
      title: isAr ? "الأنظمة المؤسسية وسير العمل" : "Business Systems & ERP",
      tag: isAr ? "إدارة العمليات" : "Operations Core",
      icon: "💼",
      specs: isAr
        ? "تطوير أنظمة مخصصة لإدارة العمليات والمخزون وسلسلة الإمداد مع تكامل كامل مع متطلبات هيئة الزكاة والضريبة (الفاتورة الإلكترونية)."
        : "Custom business logic engines, inventory tracking, approval hierarchies, and certified ZATCA Phase 2 electronic invoicing compliance.",
      connectedTo: ["automation", "support"],
    },
    {
      id: "automation",
      slug: "automation",
      title: isAr ? "الأتمتة ومعالجة المستندات" : "Intelligent Automation & AI",
      tag: isAr ? "أتمتة ذكية" : "Process AI",
      icon: "🤖",
      specs: isAr
        ? "أتمتة دورات العمل الروتينية، استخراج البيانات من المستندات والعقود بالذكاء الاصطناعي مع نقاط تحقق واعتماد بشري للقرارات الحساسة."
        : "AI-assisted document understanding (OCR), straight-through workflow orchestration, and human-in-the-loop governance checkpoints.",
      connectedTo: ["business", "support"],
    },
    {
      id: "support",
      slug: "support",
      title: isAr ? "الدعم والمراقبة المستمرة" : "24/7 Telemetry & Evolution",
      tag: isAr ? "جاهزية واستقرار" : "Observability",
      icon: "🛡️",
      specs: isAr
        ? "مراقبة استباقية على مدار الساعة، اتفاقيات مستوى خدمة صارمة (SLA)، واستجابة سريعة للحوادث وتحديثات دورية تضمن استمرار تفوق منصتكم."
        : "Proactive 24/7 infrastructure observability, strict SLA incident response protocols, and continuous evolutionary development cycles.",
      connectedTo: ["platforms", "apps", "business"],
    },
  ];

  const currentNode = nodes.find((n) => n.id === activeNode) || nodes[0];
  const currentNodeLink = pageLink(locale, solutionRoute(currentNode.slug));

  const handleStartTrace = () => {
    if (isTracing) return;
    setIsTracing(true);
    setTraceStep(1);
    setActiveNode("apps");

    setTimeout(() => {
      setTraceStep(2);
      setActiveNode("integration");
    }, 1200);

    setTimeout(() => {
      setTraceStep(3);
      setActiveNode("business");
    }, 2400);

    setTimeout(() => {
      setTraceStep(4);
      setActiveNode("automation");
    }, 3600);

    setTimeout(() => {
      setTraceStep(5);
      setActiveNode("support");
    }, 4800);

    setTimeout(() => {
      setIsTracing(false);
      setTraceStep(0);
    }, 6000);
  };

  return (
    <div className="tech-visual-card ecosystem-visual-root">
      {/* Visual Header */}
      <div className="tech-visual-toolbar">
        <div className="tech-toolbar-dots">
          <span className="dot dot-red" />
          <span className="dot dot-amber" />
          <span className="dot dot-green" />
        </div>
        <div className="tech-toolbar-url">
          <span className="tech-device-badge">Frentex Connected Engineering Architecture</span>
        </div>
        <div className="tech-toolbar-status">
          <button
            type="button"
            className="trace-flow-btn"
            onClick={handleStartTrace}
            disabled={isTracing}
          >
            <span className="trace-dot" />
            <span>
              {isTracing
                ? (isAr ? `تتبع التدفق: المرحلة ${traceStep}/5` : `Tracing Flow: Stage ${traceStep}/5`)
                : (isAr ? "محاكاة تدفق المعاملة الشاملة" : "Simulate Enterprise Flow")}
            </span>
          </button>
        </div>
      </div>

      {/* Main Connected Architecture Map */}
      <div className="ecosystem-layout-grid">
        {/* Node Hexagon/Card Cluster */}
        <div className="ecosystem-cards-cluster">
          <div className="cluster-eyebrow">
            <span>{isAr ? "انقر على أي حل لاستعراض معاييره التقنية وروابطه:" : "Select any architecture layer to inspect technical blueprints:"}</span>
          </div>

          <div className="ecosystem-nodes-grid">
            {nodes.map((node) => {
              const isSelected = activeNode === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  className={`ecosystem-node-card ${isSelected ? "selected" : ""} ${isTracing && activeNode === node.id ? "tracing-pulse" : ""}`}
                  onClick={() => setActiveNode(node.id)}
                >
                  <div className="node-card-top">
                    <span className="node-icon">{node.icon}</span>
                    <span className="node-tag">{node.tag}</span>
                  </div>
                  <h4 className="node-title">{node.title}</h4>
                  <div className="node-card-footer">
                    <span className="node-view-link">
                      {isAr ? "عرض التفاصيل" : "Inspect Specs"} →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Node Detail & Deep-dive Inspector */}
        <div className="ecosystem-inspector-panel">
          <div className="inspector-card">
            <div className="inspector-badge">
              <span>LAYER SPECIFICATION</span>
            </div>
            <div className="inspector-header">
              <span className="inspector-icon">{currentNode.icon}</span>
              <div>
                <h3>{currentNode.title}</h3>
                <span className="inspector-tag-line">{currentNode.tag}</span>
              </div>
            </div>

            <p className="inspector-desc">{currentNode.specs}</p>

            <div className="inspector-connected">
              <span className="connected-title">{isAr ? "الارتباطات المباشرة بالبنية:" : "Integrated Architecture Links:"}</span>
              <div className="connected-tags">
                {currentNode.connectedTo.map((targetId) => {
                  const targetNode = nodes.find((n) => n.id === targetId);
                  if (!targetNode) return null;
                  return (
                    <button
                      key={targetId}
                      type="button"
                      className="connected-tag-btn"
                      onClick={() => setActiveNode(targetId)}
                    >
                      🔗 {targetNode.title}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="inspector-action-row">
              <Link
                href={currentNodeLink.href}
                hrefLang={currentNodeLink.hrefLang}
                className="inspector-deep-dive-btn"
              >
                <span>{isAr ? "الانتقال إلى المعمارية التقنية الكاملة لهذا الحل" : "Explore Complete Solution Architecture & Specs"}</span>
                <span className="arrow-sym">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
