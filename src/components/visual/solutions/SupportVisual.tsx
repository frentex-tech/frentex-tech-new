"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";

interface SupportVisualProps {
  locale: Locale;
}

type SeverityLevel = "p1" | "p2" | "p3";

export function SupportVisual({ locale }: SupportVisualProps) {
  const isAr = locale === "ar";
  const [activeSeverity, setActiveSeverity] = useState<SeverityLevel>("p1");
  const [isProbing, setIsProbing] = useState<boolean>(false);
  const [probeSuccess, setProbeSuccess] = useState<boolean>(true);

  const regionalNodes = [
    { name: isAr ? "الرياض (المنطقة الوسطى)" : "Riyadh (KSA Central)", code: "me-central-1", ping: "8ms", status: "Healthy" },
    { name: isAr ? "جدة (المنطقة الغربية)" : "Jeddah (KSA West)", code: "me-west-1", ping: "12ms", status: "Healthy" },
    { name: isAr ? "الدمام (المنطقة الشرقية)" : "Dammam (KSA East)", code: "me-east-1", ping: "14ms", status: "Healthy" },
    { name: isAr ? "دبي (الخليج العربي)" : "Dubai (UAE Central)", code: "me-south-1", ping: "18ms", status: "Healthy" },
    { name: isAr ? "فرانكفورت (الاتصال الأوروبي)" : "Frankfurt (EU Backup)", code: "eu-central-1", ping: "64ms", status: "Healthy" },
  ];

  const slaTiers = {
    p1: {
      name: isAr ? "حرج جداً (P1 - توقف كامل للخدمة)" : "P1 - Critical Outage",
      sla: isAr ? "استجابة فورية خلال 15 دقيقة" : "< 15 Min SLA Response",
      color: "#ef4444",
      desc: isAr
        ? "استنفار فوري لفريق المهندسين المناوب، فتح غرفة طوارئ افتراضية وتحديث دوري كل 15 دقيقة للعميل حتى اكتمال المعالجة."
        : "Direct on-call paging, dedicated war-room bridge, executive incident updates every 15 mins until resolution.",
      channels: ["PagerDuty P1", "SMS Alert", "War-Room Bridge", "Root Cause Analysis (RCA)"],
    },
    p2: {
      name: isAr ? "عالي (P2 - تأثر وظيفة جوهرية)" : "P2 - Major Impairment",
      sla: isAr ? "استجابة خلال ساعة واحدة" : "< 60 Min SLA Response",
      color: "#f59e0b",
      desc: isAr
        ? "معالجة فورية لمشاكل انخفاض الأداء أو تعطل بوابات الدفع أو التكاملات مع تقديم حل بديل سريع لضمان استمرار الأعمال."
        : "Urgent engineering assignment for degraded throughput or partial integration faults with interim failover.",
      channels: ["Ops Slack Alert", "Jira Service Desk", "Direct Senior Engineer Assignment"],
    },
    p3: {
      name: isAr ? "اعتيادي (P3 - تحسينات وتعديلات)" : "P3 - Standard Request",
      sla: isAr ? "استجابة خلال 4 ساعات عمل" : "< 4 Business Hours SLA",
      color: "#347fcc",
      desc: isAr
        ? "استفسارات، تعديلات برمجية طفيفة، تحديثات أمنية دورية، وتحسينات في التقارير وواجهات الاستخدام."
        : "Standard operational requests, periodic security patch reviews, minor enhancements and report adjustments.",
      channels: ["Support Portal", "Sprint Backlog", "Weekly Status Review"],
    },
  };

  const handleSyntheticProbe = () => {
    setIsProbing(true);
    setTimeout(() => {
      setIsProbing(false);
      setProbeSuccess(true);
    }, 1200);
  };

  return (
    <div className="tech-visual-card support-visual-root">
      {/* Top Header Bar */}
      <div className="tech-visual-toolbar">
        <div className="tech-toolbar-dots">
          <span className="dot dot-red" />
          <span className="dot dot-amber" />
          <span className="dot dot-green" />
        </div>
        <div className="tech-toolbar-url">
          <span className="tech-device-badge">Enterprise Telemetry &amp; 24/7 Observability Engine</span>
        </div>
        <div className="tech-toolbar-status">
          <span className="status-indicator-live">
            <span className="pulse-dot" />
            <span>99.99% {isAr ? "جاهزية خلال 90 يومًا" : "90-Day Uptime"}</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Regional Node Probes & Incident Escalation Framework */}
      <div className="support-stage-grid">
        {/* Left Column: Regional Telemetry Grid */}
        <div className="support-telemetry-col">
          <div className="telemetry-panel-head">
            <div className="head-text">
              <h4>{isAr ? "شبكة المراقبة الإقليمية الفورية" : "Global & Regional Health Matrix"}</h4>
              <p>{isAr ? "فحص دوري كل 30 ثانية لكافة الخوادم ونقاط النهاية" : "Synthetic probes every 30s across edge & core clusters"}</p>
            </div>
            <button
              type="button"
              className="synthetic-probe-btn"
              onClick={handleSyntheticProbe}
              disabled={isProbing}
            >
              <span>{isProbing ? (isAr ? "جاري الفحص..." : "Probing Nodes...") : (isAr ? "تشغيل فحص لحظي" : "Run Live Probe")}</span>
            </button>
          </div>

          {/* Regional Nodes List */}
          <div className="regional-nodes-stack">
            {regionalNodes.map((node) => (
              <div key={node.code} className="node-status-row">
                <div className="node-geo">
                  <span className={`node-dot ${isProbing ? "probing-pulse" : "node-online"}`} />
                  <div>
                    <strong>{node.name}</strong>
                    <small className="node-code">{node.code}</small>
                  </div>
                </div>
                <div className="node-metrics">
                  <span className="node-ping">{node.ping}</span>
                  <span className="node-badge-ok">{probeSuccess ? (isAr ? "يعمل بكفاءة" : "Operational") : "Checking"}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Infrastructure Health Badges */}
          <div className="infra-badges-row">
            <div className="infra-pill">
              <span className="infra-icon">🔒</span>
              <div>
                <small>{isAr ? "شهادة SSL / TLS" : "SSL/TLS Strict"}</small>
                <strong>{isAr ? "سارية (تجديد آلي)" : "Valid (Auto-Renew)"}</strong>
              </div>
            </div>
            <div className="infra-pill">
              <span className="infra-icon">🛡️</span>
              <div>
                <small>{isAr ? "حماية الحظر والدفاع" : "Cloud WAF"}</small>
                <strong>0 {isAr ? "اختراقات مسجلة" : "Breaches"}</strong>
              </div>
            </div>
            <div className="infra-pill">
              <span className="infra-icon">💾</span>
              <div>
                <small>{isAr ? "النسخ الاحتياطي" : "Disaster Recovery"}</small>
                <strong>RPO &lt; 5m • RTO &lt; 15m</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: SLA Response Matrix */}
        <div className="support-sla-col">
          <div className="sla-card">
            <div className="sla-card-header">
              <span className="sla-tag">{isAr ? "مصفوفة الاستجابة ومستويات الخدمة" : "SLA Severity & Escalation Matrix"}</span>
              <h3>{isAr ? "التزام حقيقي بزمن الاستجابة" : "Guaranteed SLA Response Tiers"}</h3>
            </div>

            {/* Severity Tabs */}
            <div className="severity-tabs" role="tablist">
              {(["p1", "p2", "p3"] as SeverityLevel[]).map((sev) => (
                <button
                  key={sev}
                  type="button"
                  role="tab"
                  aria-selected={activeSeverity === sev}
                  className={`sev-tab ${activeSeverity === sev ? "active" : ""}`}
                  onClick={() => setActiveSeverity(sev)}
                >
                  <span className={`sev-circle sev-${sev}`} />
                  <span>{sev.toUpperCase()}</span>
                </button>
              ))}
            </div>

            {/* Active Severity Details */}
            <div className="severity-detail-box">
              <div className="sev-hero-row">
                <h4>{slaTiers[activeSeverity].name}</h4>
                <span className="sla-pill-target">{slaTiers[activeSeverity].sla}</span>
              </div>
              <p className="sev-desc">{slaTiers[activeSeverity].desc}</p>

              <div className="sev-channels">
                <span className="channels-title">{isAr ? "قنوات التصعيد والإخطار المباشر:" : "Direct Escalation Channels:"}</span>
                <div className="channel-chips">
                  {slaTiers[activeSeverity].channels.map((ch, idx) => (
                    <span key={idx} className="channel-chip">
                      ✓ {ch}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Patching & Evolution Guarantee */}
            <div className="evolution-guarantee">
              <div className="evo-icon">🔄</div>
              <div className="evo-copy">
                <strong>{isAr ? "تطوير مستمر وتحديثات أسبوعية" : "Continuous Evolutionary Upgrades"}</strong>
                <p>
                  {isAr
                    ? "لا ينتهي عملنا عند الإطلاق؛ نراقب تجربة المستخدمين الفعلية، ونحدث المكتبات دوريًا ونضمن توافق الأنظمة مع التحديثات التقنية والقانونية."
                    : "Post-launch proactive enhancement cycles: zero-downtime updates, runtime security patches, and regulatory compliance maintenance."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="support-metrics-footer">
        <div className="m-metric">
          <span className="m-val">&lt; 15m</span>
          <span className="m-lbl">{isAr ? "زمن استجابة الحالات الحرجة P1" : "Critical P1 Response Window"}</span>
        </div>
        <div className="m-metric">
          <span className="m-val">24/7/365</span>
          <span className="m-lbl">{isAr ? "مراقبة مستمرة على مدار الساعة" : "Continuous Observability"}</span>
        </div>
        <div className="m-metric">
          <span className="m-val">0s</span>
          <span className="m-lbl">{isAr ? "توقف للخدمة أثناء التحديثات (Blue/Green)" : "Zero-Downtime Deployments"}</span>
        </div>
        <div className="m-metric">
          <span className="m-val">100%</span>
          <span className="m-lbl">{isAr ? "شفافية السجلات وتقارير الأداء" : "Transparent Post-Mortems"}</span>
        </div>
      </div>
    </div>
  );
}
