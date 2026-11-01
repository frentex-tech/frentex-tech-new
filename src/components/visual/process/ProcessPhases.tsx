import { ScrollReveal } from "@/components/visual/solutions/ScrollReveal";
import type { Locale } from "@/i18n/config";

interface PhaseItem {
  label: string;
  title: string;
  body: string;
  output: string;
}

interface ProcessPhasesProps {
  locale: Locale;
  outputLabel: string;
  phases: PhaseItem[];
}

export function ProcessPhases({ locale, outputLabel, phases }: ProcessPhasesProps) {
  const isAr = locale === "ar";

  const phaseIcons = ["🔍", "📐", "⚡", "🚀", "🗝️"];

  const phaseChips: Record<number, string[]> = {
    0: isAr
      ? ["اجتماعات أصحاب المصلحة", "خريطة رحلة العمل", "تحديد القيود والأنظمة"]
      : ["Stakeholder Alignment", "Process Mapping", "System Constraints"],
    1: isAr
      ? ["نموذج واجهات تفاعلي", "حدود النطاق الأول", "معايير القبول والجدول"]
      : ["Interactive Prototype", "Scope Boundaries", "Acceptance Criteria"],
    2: isAr
      ? ["سبرنتات تطوير مرحلية", "اختبار السيناريوهات", "سجل التغييرات الشفاف"]
      : ["Iterative Sprints", "Scenario Testing", "Transparent Change Log"],
    3: isAr
      ? ["اختبار قبول المستخدم", "مراجعة الصلاحيات والترحيل", "دليل التشغيل والتدريب"]
      : ["UAT Verification", "Migration & Rollback", "Operations Guide"],
    4: isAr
      ? ["تسليم المستودعات 100%", "التوثيق المعماري", "اتفاقية الدعم والصيانة"]
      : ["100% Repository Transfer", "Architecture Docs", "SLA & Maintenance"],
  };

  return (
    <section id="delivery-phases" className="process-phases-white">
      <div className="wrap">
        <div className="capabilities-section-header">
          <span className="section-eyebrow">
            {isAr ? "دورة حياة المشروع ومحطات الاعتماد" : "Lifecycle Stages & Gateways"}
          </span>
          <h2>
            {isAr
              ? "خمس مراحل منضبطة تضمن وضوح النتيجة"
              : "Five Disciplined Stages Ensuring Absolute Clarity"}
          </h2>
          <p>
            {isAr
              ? "كل مرحلة تبدأ بمدخلات واضحة وتنتهي بمخرج ملموس قابل للمراجعة والاعتماد المكتوب قبل الانتقال للخطوة التالية."
              : "Each stage begins with explicit inputs and concludes with concrete, reviewable deliverables before moving forward."}
          </p>
        </div>

        {/* Timeline Stack of Phases */}
        <div className="process-timeline-wrapper">
          <div className="process-timeline-rail" aria-hidden="true" />

          <ScrollReveal className="process-phases-list" staggerDelay={100}>
            {phases.map((phase, idx) => {
              // Extract number and category label from phase.label (e.g. "01 / الاكتشاف")
              const parts = phase.label.split("/").map((s) => s.trim());
              const numStr = parts[0] || `0${idx + 1}`;
              const categoryStr = parts[1] || phase.label;

              // Deliverable items if separated by commas or periods
              const deliverableItems = phase.output
                .split(/،\s*|\.\s*|,\s*/)
                .map((s) => s.trim())
                .filter((s) => s.length > 2);

              return (
                <article key={idx} className="process-phase-card scroll-reveal-item">
                  {/* Phase Timeline Connector Node */}
                  <div className="phase-node-indicator">
                    <span className="phase-node-dot">
                      <span className="node-num">{numStr}</span>
                    </span>
                  </div>

                  <div className="phase-card-inner">
                    {/* Top Row: Meta info */}
                    <div className="phase-card-top">
                      <div className="phase-category-badge">
                        <span className="phase-icon">{phaseIcons[idx] || "⚙️"}</span>
                        <span className="phase-cat-text">{categoryStr}</span>
                      </div>
                      <span className="phase-gate-badge">
                        {isAr ? "بوابة مراجعة معتمدة" : "Verified Review Gate"}
                      </span>
                    </div>

                    {/* Headline and Lead Body */}
                    <h3 className="phase-title">{phase.title}</h3>
                    <p className="phase-body-text">{phase.body}</p>

                    {/* Tags / Focus Chips */}
                    <div className="phase-focus-chips">
                      {(phaseChips[idx] || []).map((chip, cIdx) => (
                        <span key={cIdx} className="phase-chip">
                          {chip}
                        </span>
                      ))}
                    </div>

                    {/* Verified Output Deliverable Gate */}
                    <div className="phase-deliverable-gate">
                      <div className="deliverable-gate-header">
                        <div className="gate-header-left">
                          <span className="gate-check-icon">✓</span>
                          <span className="gate-label">{outputLabel}</span>
                        </div>
                        <span className="gate-milestone-tag">
                          {isAr ? "مخرج مرحلي ملزم" : "Milestone Output"}
                        </span>
                      </div>

                      <ul className="deliverable-items-list">
                        {deliverableItems.map((item, dIdx) => (
                          <li key={dIdx} className="deliverable-item">
                            <span className="deliverable-bullet">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
