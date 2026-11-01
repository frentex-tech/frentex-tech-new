import type { Locale } from "@/i18n/config";
import { ScrollReveal } from "@/components/visual/solutions/ScrollReveal";

interface WorkMethodologyProps {
  locale: Locale;
}

export function WorkMethodology({ locale }: WorkMethodologyProps) {
  const isAr = locale === "ar";

  const principles = [
    {
      num: "01",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polygon points="12 8 8 12 12 16 16 12 12 8" />
        </svg>
      ),
      title: isAr
        ? "منطق العمل أولاً (Business Logic First)"
        : "Business Logic First",
      body: isAr
        ? "فهم عميق لدورة حياة المعاملة ومسارات الموافقات الفعلية ونقاط الاحتكاك التشغيلي قبل اختيار حزمة التقنيات."
        : "In-depth validation of transaction lifecycles, approval hierarchies, and operational bottlenecks prior to tech stack selection.",
      highlights: isAr
        ? ["مسار تدفق واضح للمهام", "تحديد أصحاب المصلحة بدقة", "بدون افتراضات غير مختبرة"]
        : ["Clear task flow mapping", "Explicit stakeholder roles", "Zero untested assumptions"],
    },
    {
      num: "02",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: isAr
        ? "بساطة التجربة وكفاءة الواجهات (Operational Ergonomics)"
        : "Operational Ergonomics",
      body: isAr
        ? "واجهات مباشرة مصممة لفرق العمل الميدانية والإدارية، تقلل من أخطاء الإدخال وتضمن عدم ضياع أي طلب."
        : "Frictionless interfaces for field operatives and managers that eliminate data entry mistakes and misplaced requests.",
      highlights: isAr
        ? ["تقليل نقرات الإدخال", "لوحات متابعة لحظية", "تنبيهات استباقية بالمهام"]
        : ["Reduced input friction", "Real-time task boards", "Proactive state alerts"],
    },
    {
      num: "03",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: isAr
        ? "بنية تحتية قابلة للتكامل (Enterprise Integration-Ready)"
        : "Integration-Ready Architecture",
      body: isAr
        ? "قواعد بيانات معيارية وواجهات API موثقة بدقة لربط سهل وآمن مع أنظمة ERP والفوترة وبوابات الدفع."
        : "Standardized databases and strictly typed APIs built for seamless, secure bridges into ERPs, ledger systems, and payment gateways.",
      highlights: isAr
        ? ["واجهات REST & GraphQL", "جاهزية للربط مع ZATCA", "سجلات تدقيق غير قابلة للتعديل"]
        : ["REST & GraphQL ready", "ZATCA compliant schemas", "Immutable audit trails"],
    },
  ];

  return (
    <section className="work-methodology-section">
      <div className="wrap">
        <div className="capabilities-section-header" style={{ marginBottom: "40px" }}>
          <span className="section-eyebrow">
            {isAr ? "فلسفة المختبر البرمجي" : "ENGINEERING PRINCIPLES"}
          </span>
          <h2>
            {isAr
              ? "ثلاثة مبادئ تحكم تصميم وبناء كل نظام"
              : "Three Core Principles Behind Every Prototype"}
          </h2>
          <p>
            {isAr
              ? "لا نبدأ بكتابة الكود مباشرة، بل نختبر منطق العمل وحركة البيانات لضمان نظام يخدم المنشأة لسنوات."
              : "We do not write speculative code. We validate transaction flows, approval lifecycles, and data state transitions before building."}
          </p>
        </div>

        <ScrollReveal className="work-principles-grid" staggerDelay={100}>
          {principles.map((p) => (
            <article key={p.num} className="work-principle-card scroll-reveal-item">
              <div className="principle-card-top">
                <div className="principle-icon-wrap">
                  {p.icon}
                </div>
                <span className="principle-num">{p.num}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <div className="principle-chips-row" style={{ marginTop: "16px" }}>
                {p.highlights.map((h) => (
                  <span key={h} className="principle-chip">
                    <span className="badge-check">✓</span> {h}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
