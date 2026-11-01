"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";

interface AutomationVisualProps {
  locale: Locale;
}

type DocType = "invoice" | "contract" | "customs";

export function AutomationVisual({ locale }: AutomationVisualProps) {
  const isAr = locale === "ar";
  const [activeDoc, setActiveDoc] = useState<DocType>("invoice");
  const [threshold, setThreshold] = useState<number>(85);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [batchCount, setBatchCount] = useState<number>(3420);

  const documents = {
    invoice: {
      name: isAr ? "فاتورة ضريبية معقدة" : "Tax Invoice (ZATCA Format)",
      type: "PDF / TIFF • 2.4 MB",
      overallConfidence: 96,
      fields: isAr
        ? [
            { label: "اسم المورد والمطابق للرقم الضريبي", value: "شركة التقنية المتقدمة المحدودة", conf: 99, status: "ok" },
            { label: "الرقم الضريبي (15 رقم)", value: "310482910400003", conf: 100, status: "ok" },
            { label: "المجموع قبل الضريبة", value: "48,500.00 ر.س", conf: 98, status: "ok" },
            { label: "ضريبة القيمة المضافة (15%)", value: "7,275.00 ر.س", conf: 99, status: "ok" },
            { label: "المطابقة مع أمر الشراء (PO #8491)", value: "مطابقة بنسبة 100%", conf: 97, status: "ok" },
          ]
        : [
            { label: "Vendor Legal Name", value: "Advanced Technology Systems Ltd", conf: 99, status: "ok" },
            { label: "Tax Identification Number", value: "310482910400003", conf: 100, status: "ok" },
            { label: "Subtotal Pre-Tax", value: "48,500.00 SAR", conf: 98, status: "ok" },
            { label: "VAT (15%)", value: "7,275.00 SAR", conf: 99, status: "ok" },
            { label: "Purchase Order 3-Way Match", value: "PO #8491 Matched 100%", conf: 97, status: "ok" },
          ],
    },
    contract: {
      name: isAr ? "عقد توريد وخدمات سحابية" : "Cloud Services Procurement Contract",
      type: "DOCX / PDF • 18 Pages",
      overallConfidence: 89,
      fields: isAr
        ? [
            { label: "الأطراف المتعاقدة", value: "مجموعة فرينتكس والطرف الثاني", conf: 98, status: "ok" },
            { label: "مدة العقد وتاريخ التجديد التلقائي", value: "36 شهرًا (تجديد سنوي)", conf: 92, status: "ok" },
            { label: "شروط الدفع وجدول الدفعات", value: "دفعات ربع سنوية خلال 30 يومًا", conf: 88, status: "ok" },
            { label: "بند مستوى الخدمة والتعويض (SLA)", value: "99.9% مع غرامة تأخير 5%", conf: 86, status: "ok" },
            { label: "الاختصاص القضائي والقانون الحاكم", value: "المملكة العربية السعودية - الرياض", conf: 95, status: "ok" },
          ]
        : [
            { label: "Contracting Entities", value: "Frentex Tech & Enterprise Client", conf: 98, status: "ok" },
            { label: "Term & Auto-Renewal Clause", value: "36 Months (Annual Renewal)", conf: 92, status: "ok" },
            { label: "Payment Milestone Schedule", value: "Quarterly in arrears, Net 30", conf: 88, status: "ok" },
            { label: "SLA Guarantee & Penalty", value: "99.9% uptime with 5% credit", conf: 86, status: "ok" },
            { label: "Governing Law & Jurisdiction", value: "Kingdom of Saudi Arabia (Riyadh)", conf: 95, status: "ok" },
          ],
    },
    customs: {
      name: isAr ? "بيان تخليص جمركي ومناولة" : "Customs Import Declaration",
      type: "Scanned Form • Hand-stamped",
      overallConfidence: 79,
      fields: isAr
        ? [
            { label: "رقم البيان الجمركي (FASAH)", value: "JED-2026-991823", conf: 96, status: "ok" },
            { label: "رمز البند الجمركي (HS Code)", value: "8471.50.00 (حواسيب وخوادم)", conf: 84, status: "warn" },
            { label: "البلد المنشأ المعتمد", value: "تايوان / مراجعة رمز المصنع", conf: 76, status: "warn" },
            { label: "الرسوم الجمركية المقدرة", value: "12,400.00 ر.س", conf: 88, status: "ok" },
            { label: "ختم المعاينة الجمركية الورقي", value: "ختم غير واضح - يحتاج تدقيق", conf: 68, status: "flag" },
          ]
        : [
            { label: "Customs Reference (FASAH)", value: "JED-2026-991823", conf: 96, status: "ok" },
            { label: "Harmonized System Code (HS)", value: "8471.50.00 (Server Hardware)", conf: 84, status: "warn" },
            { label: "Certified Country of Origin", value: "Taiwan (Factory serial review)", conf: 76, status: "warn" },
            { label: "Assessed Customs Tariff", value: "12,400.00 SAR", conf: 88, status: "ok" },
            { label: "Physical Stamp Verification", value: "Faint stamp ink - needs review", conf: 68, status: "flag" },
          ],
    },
  };

  const currentDocData = documents[activeDoc];
  const isAutoApproved = currentDocData.overallConfidence >= threshold;

  const triggerProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBatchCount((prev) => prev + 1);
    }, 900);
  };

  return (
    <div className="tech-visual-card automation-visual-root">
      {/* Top Header Bar */}
      <div className="tech-visual-toolbar">
        <div className="tech-toolbar-dots">
          <span className="dot dot-red" />
          <span className="dot dot-amber" />
          <span className="dot dot-green" />
        </div>
        <div className="tech-toolbar-url">
          <span className="tech-device-badge">Intelligent Process &amp; Document AI Pipeline</span>
        </div>
        <div className="tech-toolbar-status">
          <span className="status-indicator-live">
            <span className="pulse-dot" />
            <span>{isAr ? "محرك الأتمتة يعمل" : "Engine Active"}</span>
          </span>
        </div>
      </div>

      {/* Main Document AI Workspace */}
      <div className="automation-stage-layout">
        {/* Left / Top Document Selector & OCR Stage */}
        <div className="auto-doc-column">
          <div className="doc-select-bar">
            <span className="doc-select-label">{isAr ? "المستند المعالج:" : "Sample Document:"}</span>
            <div className="doc-pills">
              {(Object.keys(documents) as DocType[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`doc-pill-btn ${activeDoc === key ? "active" : ""}`}
                  onClick={() => setActiveDoc(key)}
                >
                  {documents[key].name}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Document Scanner Card */}
          <div className="doc-scanner-preview">
            <div className={`scan-laser-line ${isProcessing ? "scanning" : ""}`} />
            <div className="preview-header">
              <span className="file-badge">📄 {currentDocData.name}</span>
              <span className="file-type-badge">{currentDocData.type}</span>
            </div>
            <div className="preview-ocr-content">
              <div className="ocr-skeleton-line line-wide" />
              <div className="ocr-skeleton-line line-medium" />
              <div className="ocr-highlight-block">
                <span className="ocr-tag-badge">OCR: AR+EN Dual Engine</span>
                <p className="ocr-text-sample">
                  {isAr
                    ? "تم استخراج النصوص بدقة عالية مع معالجة التدوير وتصحيح انحناء الورق والتعرف على الجداول المالية."
                    : "High-accuracy dual-language extraction with auto-deskewing, table bounding, and multilingual OCR."}
                </p>
              </div>
              <div className="ocr-skeleton-line line-short" />
            </div>

            {/* Threshold Controller Slider */}
            <div className="threshold-control-box">
              <div className="threshold-header">
                <label htmlFor="conf-threshold">
                  {isAr ? "حد الثقة للأتمتة الكاملة (STP):" : "Straight-Through Threshold:"}
                </label>
                <span className="threshold-val">{threshold}%</span>
              </div>
              <input
                id="conf-threshold"
                type="range"
                min="60"
                max="98"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="threshold-slider"
              />
              <div className="threshold-hints">
                <small>60% {isAr ? "أكثر تساهلًا" : "Permissive"}</small>
                <small>98% {isAr ? "تدقيق فائق الصرامة" : "Strict Enterprise"}</small>
              </div>
            </div>
          </div>
        </div>

        {/* Right / Bottom Extracted Entities & Decision Engine */}
        <div className="auto-decision-column">
          <div className="decision-decision-card">
            <div className="decision-top-meta">
              <div className="score-ring-wrap">
                <div className={`score-badge ${isAutoApproved ? "score-pass" : "score-review"}`}>
                  <span className="score-num">{currentDocData.overallConfidence}%</span>
                  <span className="score-text">{isAr ? "معدل الثقة" : "Confidence"}</span>
                </div>
              </div>
              <div className="decision-outcome">
                <span className="outcome-eyebrow">{isAr ? "قرار مسار الأتمتة" : "Routing Decision"}</span>
                <h4 className={isAutoApproved ? "text-success" : "text-amber"}>
                  {isAutoApproved
                    ? (isAr ? "معالجة فورية ومباشرة (STP 100%)" : "Straight-Through Auto Approval")
                    : (isAr ? "تحويل لمراجعة المختص البشري (HITL)" : "Routing to Specialist Review")}
                </h4>
                <p className="outcome-reason">
                  {isAutoApproved
                    ? (isAr
                        ? `معدل الثقة (${currentDocData.overallConfidence}%) أعلى من حد المعالجة الآلية (${threshold}%). سيتم الترحيل فورًا لنظام الـ ERP.`
                        : `Confidence (${currentDocData.overallConfidence}%) meets threshold (${threshold}%). Direct auto-posting to ERP ledger.`)
                    : (isAr
                        ? `وجود حقول تحتاج تدقيق بشري لمطابقة المعايير الجمركية أو الصياغات الدقيقة قبل الترحيل المالي.`
                        : `Specific fields scored below ${threshold}%. Safely gated to human specialist queue with flagged items.`)}
                </p>
              </div>
            </div>

            {/* Extracted Fields Table */}
            <div className="entities-list">
              <div className="entities-head">
                <span>{isAr ? "الحقل المستخرج" : "Extracted Field"}</span>
                <span>{isAr ? "القيمة المحللة" : "Extracted Value"}</span>
                <span>{isAr ? "نسبة الثقة" : "Confidence"}</span>
              </div>
              {currentDocData.fields.map((field, idx) => (
                <div key={idx} className={`entity-row entity-${field.status}`}>
                  <span className="field-name">{field.label}</span>
                  <span className="field-val">{field.value}</span>
                  <span className="field-conf">
                    <span className="conf-bar-bg">
                      <span className="conf-bar-fill" style={{ width: `${field.conf}%` }} />
                    </span>
                    <strong className="conf-pct">{field.conf}%</strong>
                  </span>
                </div>
              ))}
            </div>

            {/* Interactive Process Trigger */}
            <div className="auto-action-footer">
              <button
                type="button"
                className="auto-trigger-btn"
                onClick={triggerProcess}
                disabled={isProcessing}
              >
                <span>{isProcessing ? (isAr ? "جاري التحليل والمطابقة..." : "Analyzing Batch...") : (isAr ? "تشغيل دورة المعالجة الآن" : "Trigger Pipeline Cycle")}</span>
              </button>
              <span className="batch-counter">
                {isAr ? "المستندات المؤتمتة اليوم:" : "Processed Today:"} <strong>{batchCount.toLocaleString()}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="automation-stats-row">
        <div className="stat-box">
          <span className="s-val">87%</span>
          <span className="s-lbl">{isAr ? "نسبة المعالجة المباشرة دون تدخل بشري" : "Straight-Through Processing (STP)"}</span>
        </div>
        <div className="stat-box">
          <span className="s-val">4.2s</span>
          <span className="s-lbl">{isAr ? "متوسط سرعة استخراج ومعالجة المستند" : "Average Doc Processing Time"}</span>
        </div>
        <div className="stat-box">
          <span className="s-val">0%</span>
          <span className="s-lbl">{isAr ? "أخطاء الترحيل المالي والضريبي" : "ERP Posting Error Rate"}</span>
        </div>
        <div className="stat-box">
          <span className="s-val">100%</span>
          <span className="s-lbl">{isAr ? "حفظ سجلات التدقيق والمطابقة" : "Full Audit Trail Traceability"}</span>
        </div>
      </div>
    </div>
  );
}
