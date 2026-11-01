"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";

interface BusinessVisualProps {
  locale: Locale;
}

export function BusinessVisual({ locale }: BusinessVisualProps) {
  const isAr = locale === "ar";
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [stockLevel, setStockLevel] = useState<number>(42);

  const steps = isAr
    ? [
        {
          num: "01",
          phase: "المبيعات وإدارة العملاء",
          tag: "CRM Engine",
          title: "تسجيل الفرصة وعرض السعر",
          detail: "تأهيل العميل، وربط الاحتياج بالأصناف المتوفرة، وتوليد عرض سعر رسمي مرتبط بالرقم المرجعي #OPP-309.",
          status: "مكتمل ✓",
          color: "#347fcc",
        },
        {
          num: "02",
          phase: "المخزون والمستودعات",
          tag: "ERP Inventory",
          title: "حجز الأصناف والتحقق اللحظي",
          detail: `تأكيد توفر الكميات وحجز فوري في مستودع الرياض. الرصيد الحالي: ${stockLevel} وحدة.`,
          status: "تم الحجز ✓",
          color: "#0284c7",
        },
        {
          num: "03",
          phase: "سير الموافقات والحوكمة",
          tag: "Approval Gate",
          title: "موافقة الخصم والصلاحيات",
          detail: "مطابقة الخصم التجاري مع مصفوفة الصلاحيات واعتماد إلكتروني فوري مع سجل تدقيق غير قابل للتعديل.",
          status: "معتمد ✓",
          color: "#059669",
        },
        {
          num: "04",
          phase: "المالية والفوترة الإلكترونية",
          tag: "Finance & ZATCA",
          title: "إصدار الفاتورة وترحيل القيود",
          detail: "توليد الفاتورة الضريبية وفق متطلبات هيئة الزكاة والضريبة والجمارك (زاتكا) وترحيل قيود الإيراد آليًا.",
          status: "جاهز للتسليم ✓",
          color: "#7c3aed",
        },
      ]
    : [
        {
          num: "01",
          phase: "Sales & CRM Pipeline",
          tag: "CRM Engine",
          title: "Opportunity & Formal Quote",
          detail: "Client qualification, inventory matching, and automated generation of formal commercial proposal #OPP-309.",
          status: "Completed ✓",
          color: "#347fcc",
        },
        {
          num: "02",
          phase: "Inventory & Allocation",
          tag: "ERP Inventory",
          title: "Real-time Stock Reservation",
          detail: `Automated ledger reservation in Riyadh central depot. Current free balance: ${stockLevel} units.`,
          status: "Reserved ✓",
          color: "#0284c7",
        },
        {
          num: "03",
          phase: "Governance & Approvals",
          tag: "Approval Gate",
          title: "Permission & Discount Audit",
          detail: "Rule-based threshold validation with tamper-proof timestamped audit trail and multi-level signature.",
          status: "Authorized ✓",
          color: "#059669",
        },
        {
          num: "04",
          phase: "Finance & ZATCA Invoicing",
          tag: "Finance & ZATCA",
          title: "E-Invoice & Ledger Postings",
          detail: "Automatic ZATCA Phase 2 cryptographic payload generation and journal entry synchronization.",
          status: "Ready for Delivery ✓",
          color: "#7c3aed",
        },
      ];

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);

    const timer1 = setTimeout(() => setActiveStep(1), 700);
    const timer2 = setTimeout(() => {
      setActiveStep(2);
      setStockLevel((prev) => Math.max(prev - 5, 12));
    }, 1400);
    const timer3 = setTimeout(() => setActiveStep(3), 2100);
    const timer4 = setTimeout(() => setIsSimulating(false), 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  return (
    <div className="tech-visual-card business-visual-root">
      {/* Top Console Bar */}
      <div className="tech-visual-toolbar">
        <div className="tech-toolbar-dots">
          <span className="dot dot-red" />
          <span className="dot dot-amber" />
          <span className="dot dot-green" />
        </div>
        <div className="tech-toolbar-url">
          <span>{isAr ? "دورة العمليات الموحدة: CRM + ERP + المالية" : "Unified Enterprise Flow: CRM • ERP • Ledger"}</span>
        </div>
        <div className="tech-toolbar-status">
          <button
            type="button"
            className="simulate-flow-btn"
            onClick={handleSimulate}
            disabled={isSimulating}
          >
            <span className="simulate-icon">▶</span>
            <span>{isSimulating ? (isAr ? "جاري تشغيل الدورة..." : "Simulating Flow...") : (isAr ? "محاكاة دورة الطلب الكاملة" : "Simulate Order-to-Cash")}</span>
          </button>
        </div>
      </div>

      {/* Main Connected Workflow Pipeline */}
      <div className="business-pipeline-wrapper">
        <div className="pipeline-steps-grid">
          {steps.map((step, idx) => {
            const isCurrent = activeStep === idx;
            const isPast = activeStep >= idx;

            return (
              <div
                key={step.num}
                className={`pipeline-step-card ${isCurrent ? "active-step" : ""} ${isPast ? "passed-step" : ""}`}
                onClick={() => setActiveStep(idx)}
              >
                <div className="step-card-header">
                  <span className="step-badge-tag">{step.tag}</span>
                  <span className="step-number">{step.num}</span>
                </div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-detail">{step.detail}</p>
                <div className="step-footer-status">
                  <span className="status-indicator-dot" />
                  <span>{step.status}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Active Inspection Details Panel */}
        <div className="business-active-inspector">
          <div className="inspector-left">
            <span className="inspector-stage-tag">{steps[activeStep].phase}</span>
            <h3 className="inspector-stage-title">{steps[activeStep].title}</h3>
            <p className="inspector-stage-text">{steps[activeStep].detail}</p>
          </div>
          <div className="inspector-right-stats">
            <div className="stat-box">
              <small>{isAr ? "معرف العملية" : "Transaction ID"}</small>
              <strong>TXN-2026-908</strong>
            </div>
            <div className="stat-box">
              <small>{isAr ? "المخزون المتوفر" : "Warehouse Balance"}</small>
              <strong className="stat-stock">{stockLevel} {isAr ? "وحدة" : "Units"}</strong>
            </div>
            <div className="stat-box">
              <small>{isAr ? "الامتثال الضريبي" : "Tax Compliance"}</small>
              <strong className="stat-zatca">ZATCA Verified ✓</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Footer System Principles */}
      <div className="tech-visual-footer">
        <div className="foot-metric">
          <small>{isAr ? "تكرار إدخال البيانات" : "Data Duplication"}</small>
          <strong>0% (Single Source)</strong>
        </div>
        <div className="foot-metric">
          <small>{isAr ? "زمن اعتماد الطلبات" : "Approval Turnaround"}</small>
          <strong>-60% Faster</strong>
        </div>
        <div className="foot-metric">
          <small>{isAr ? "الشفافية الرقابية" : "Audit Trail"}</small>
          <strong>100% Immutable Logs</strong>
        </div>
        <div className="foot-metric">
          <small>{isAr ? "الربط المحاسبي" : "Ledger Synchronization"}</small>
          <strong>Real-Time Sync</strong>
        </div>
      </div>
    </div>
  );
}
