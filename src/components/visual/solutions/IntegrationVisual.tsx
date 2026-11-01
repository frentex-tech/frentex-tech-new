"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";

interface IntegrationVisualProps {
  locale: Locale;
}

type ProtocolType = "rest" | "graphql" | "webhook" | "event";

export function IntegrationVisual({ locale }: IntegrationVisualProps) {
  const isAr = locale === "ar";
  const [activeProtocol, setActiveProtocol] = useState<ProtocolType>("rest");
  const [pipelineState, setPipelineState] = useState<"idle" | "inbound" | "validating" | "transforming" | "dispatched">("idle");
  const [processedEvents, setProcessedEvents] = useState(14820);

  const protocols = [
    {
      id: "rest" as const,
      name: "REST APIs",
      badge: "OpenAPI 3.1",
      latency: "14ms",
      desc: isAr
        ? "واجهات برمجية قياسية سريعة مع مصادقة عبر مفاتيح API وتحديد معدل الاستخدام (Rate Limiting)."
        : "Standard REST endpoints with OpenAPI 3.1 schemas, token rate-limiting, and microsecond caching.",
      samplePayload: `{
  "action": "PAYMENT_CONFIRMED",
  "gateway": "MADA_STCPAY",
  "reference": "TXN_994821",
  "amount_sar": 1850.00,
  "idempotency_key": "idemp_4f8a9e"
}`,
    },
    {
      id: "graphql" as const,
      name: "GraphQL Federation",
      badge: "Subgraph Mesh",
      latency: "22ms",
      desc: isAr
        ? "استعلامات موحدة تجمع بيانات العملاء والطلبات والمخزون في طلب واحد محدد ودقيق."
        : "Unified schema stitcher allowing frontends to query customers, inventory, and ledger in a single pass.",
      samplePayload: `query OrderLifecycle($id: ID!) {
  order(id: $id) {
    status
    zatcaComplianceHash
    dispatchRoute { carrier eta }
  }
}`,
    },
    {
      id: "webhook" as const,
      name: isAr ? "خطافات الويب (Webhooks)" : "Event Webhooks",
      badge: "HMAC Signed",
      latency: "8ms",
      desc: isAr
        ? "إشعارات فورية موقّعة بتشفير HMAC مع آليات إعادة المحاولة التلقائية عند انقطاع الخدمة (Exponential Backoff)."
        : "Real-time HMAC-signed webhooks with exponential backoff queues and guaranteed delivery semantics.",
      samplePayload: `{
  "event": "inventory.threshold_reached",
  "sku": "SR-901-PRO",
  "remaining": 4,
  "signature": "sha256=d8e4129...",
  "attempt": 1
}`,
    },
    {
      id: "event" as const,
      name: isAr ? "بث الأحداث (Event Stream)" : "Kafka / Event Bus",
      badge: "Zero-Loss Queue",
      latency: "4ms",
      desc: isAr
        ? "بنية مبنية على الأحداث تعالج ملايين الرسائل لحظيًا دون فقدان أي معاملة تجارية."
        : "High-throughput event streaming architecture with replayable message logs and exactly-once processing.",
      samplePayload: `TOPIC: erp.transactions.v1
PARTITION: 03 | OFFSET: 49821
PAYLOAD: {
  "ledger_id": "LDG-2026-X",
  "audit_trail": "IMMUTABLE"
}`,
    },
  ];

  const currentProtocol = protocols.find((p) => p.id === activeProtocol) || protocols[0];

  const handleSimulateDispatch = () => {
    if (pipelineState !== "idle") return;
    setPipelineState("inbound");
    setTimeout(() => setPipelineState("validating"), 500);
    setTimeout(() => setPipelineState("transforming"), 1000);
    setTimeout(() => {
      setPipelineState("dispatched");
      setProcessedEvents((prev) => prev + 1);
      setTimeout(() => setPipelineState("idle"), 1800);
    }, 1500);
  };

  return (
    <div className="tech-visual-card integration-visual-root">
      {/* Top Header Bar */}
      <div className="tech-visual-toolbar">
        <div className="tech-toolbar-dots">
          <span className="dot dot-red" />
          <span className="dot dot-amber" />
          <span className="dot dot-green" />
        </div>
        <div className="tech-toolbar-url">
          <span className="tech-device-badge">Enterprise API Gateway &amp; Message Bus</span>
        </div>
        <div className="tech-toolbar-status">
          <span className="status-indicator-live">
            <span className="pulse-dot" />
            <span>{isAr ? "البوابة نشطة (99.99% Uptime)" : "Gateway Active (99.99% SLA)"}</span>
          </span>
        </div>
      </div>

      {/* Protocol Selector Tabs */}
      <div className="integration-tabs-bar" role="tablist">
        {protocols.map((proto) => (
          <button
            key={proto.id}
            type="button"
            role="tab"
            aria-selected={activeProtocol === proto.id}
            className={`integration-proto-tab ${activeProtocol === proto.id ? "active" : ""}`}
            onClick={() => setActiveProtocol(proto.id)}
          >
            <span className="proto-name">{proto.name}</span>
            <span className="proto-chip">{proto.badge}</span>
          </button>
        ))}
      </div>

      {/* Architecture Stage: 3 Pillars with Animated Bus */}
      <div className="integration-stage-grid">
        {/* Source Pillar */}
        <div className="integration-pillar source-pillar">
          <div className="pillar-header">
            <span className="pillar-index">01</span>
            <h4>{isAr ? "مصادر البيانات والطلبات" : "Inbound Client Gate"}</h4>
          </div>
          <div className="pillar-nodes">
            <div className={`p-node ${pipelineState === "inbound" ? "active-flow" : ""}`}>
              <div className="p-node-icon">📱</div>
              <div className="p-node-meta">
                <strong>{isAr ? "تطبيقات الهواتف والويب" : "Mobile & Web Apps"}</strong>
                <small>HTTPS / TLS 1.3</small>
              </div>
            </div>
            <div className={`p-node ${pipelineState === "inbound" ? "active-flow" : ""}`}>
              <div className="p-node-icon">💳</div>
              <div className="p-node-meta">
                <strong>{isAr ? "بوابات الدفع (Mada / Apple)" : "Payment Gateways"}</strong>
                <small>PCI-DSS Webhooks</small>
              </div>
            </div>
            <div className="p-node">
              <div className="p-node-icon">🏢</div>
              <div className="p-node-meta">
                <strong>{isAr ? "أنظمة الشركاء والموردين" : "Partner APIs"}</strong>
                <small>mTLS / OAuth2</small>
              </div>
            </div>
          </div>
        </div>

        {/* Center Mesh Core: Frentex Integration Engine */}
        <div className="integration-pillar center-mesh-pillar">
          <div className="mesh-core-card">
            <div className="mesh-badge">FRENTEX INTEGRATION CORE</div>
            <h3>{isAr ? "محرك المعالجة والتحويل الذكي" : "Smart Orchestration Engine"}</h3>
            <p className="mesh-desc">{currentProtocol.desc}</p>

            {/* Pipeline Stage Indicators */}
            <div className="pipeline-steps">
              <div className={`step-pill ${pipelineState === "inbound" ? "active" : pipelineState !== "idle" ? "done" : ""}`}>
                <span className="step-num">1</span>
                <span>{isAr ? "الاستقبال" : "Ingest"}</span>
              </div>
              <div className="step-divider" />
              <div className={`step-pill ${pipelineState === "validating" ? "active" : pipelineState === "transforming" || pipelineState === "dispatched" ? "done" : ""}`}>
                <span className="step-num">2</span>
                <span>{isAr ? "فحص المخطط" : "Validate"}</span>
              </div>
              <div className="step-divider" />
              <div className={`step-pill ${pipelineState === "transforming" ? "active" : pipelineState === "dispatched" ? "done" : ""}`}>
                <span className="step-num">3</span>
                <span>{isAr ? "التحويل" : "Transform"}</span>
              </div>
              <div className="step-divider" />
              <div className={`step-pill ${pipelineState === "dispatched" ? "active-success" : ""}`}>
                <span className="step-num">4</span>
                <span>{isAr ? "التوزيع (200)" : "Dispatched"}</span>
              </div>
            </div>

            {/* Simulated Live Code Payload */}
            <div className="payload-inspector">
              <div className="payload-toolbar">
                <span className="payload-lang">JSON • {currentProtocol.badge}</span>
                <span className="payload-latency">{isAr ? "الكمون:" : "Latency:"} {currentProtocol.latency}</span>
              </div>
              <pre className="payload-code">
                <code>{currentProtocol.samplePayload}</code>
              </pre>
            </div>

            {/* Dispatch Action */}
            <div className="pipeline-action-bar">
              <button
                type="button"
                className="dispatch-simulate-btn"
                onClick={handleSimulateDispatch}
                disabled={pipelineState !== "idle"}
              >
                <span className="dispatch-icon">⚡</span>
                <span>
                  {pipelineState === "idle"
                    ? (isAr ? "محاكاة معالجة معاملة فورية" : "Simulate Payload Dispatch")
                    : (isAr ? "جاري تدفق المعاملة..." : "Processing Transaction Flow...")}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Destination Pillar */}
        <div className="integration-pillar dest-pillar">
          <div className="pillar-header">
            <span className="pillar-index">02</span>
            <h4>{isAr ? "الأنظمة الخلفية وقواعد البيانات" : "Enterprise Core & Targets"}</h4>
          </div>
          <div className="pillar-nodes">
            <div className={`p-node ${pipelineState === "dispatched" ? "highlight-success" : ""}`}>
              <div className="p-node-icon">💼</div>
              <div className="p-node-meta">
                <strong>{isAr ? "نظام الـ ERP (SAP / Oracle)" : "Core ERP Systems"}</strong>
                <small>Bi-directional Sync</small>
              </div>
            </div>
            <div className={`p-node ${pipelineState === "dispatched" ? "highlight-success" : ""}`}>
              <div className="p-node-icon">🏛️</div>
              <div className="p-node-meta">
                <strong>{isAr ? "منصة الفاتورة (ZATCA Phase 2)" : "Tax & E-Invoicing"}</strong>
                <small>Cryptographic Stamp</small>
              </div>
            </div>
            <div className="p-node">
              <div className="p-node-icon">📦</div>
              <div className="p-node-meta">
                <strong>{isAr ? "سجل الأحداث والمراجعة" : "Audit Log & Data Warehouse"}</strong>
                <small>Immutable Storage</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Summary Strip */}
      <div className="integration-telemetry-bar">
        <div className="telemetry-item">
          <span className="t-label">{isAr ? "إجمالي الأحداث المعالجة" : "Events Processed Today"}</span>
          <span className="t-value">{processedEvents.toLocaleString()}</span>
        </div>
        <div className="telemetry-item">
          <span className="t-label">{isAr ? "معدل النجاح والتسليم" : "Delivery Success Rate"}</span>
          <span className="t-value text-teal">99.992%</span>
        </div>
        <div className="telemetry-item">
          <span className="t-label">{isAr ? "إعادة المحاولة التلقائية" : "Dead-Letter Queue"}</span>
          <span className="t-value">0 {isAr ? "أخطاء عالقة" : "Unresolved"}</span>
        </div>
        <div className="telemetry-item">
          <span className="t-label">{isAr ? "التشفير والأمان" : "Transport Security"}</span>
          <span className="t-value">TLS 1.3 + mTLS</span>
        </div>
      </div>
    </div>
  );
}
