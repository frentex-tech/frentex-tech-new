import { ScrollReveal } from "@/components/visual/solutions/ScrollReveal";
import type { Locale } from "@/i18n/config";

interface AboutStandardsProps {
  locale: Locale;
}

export function AboutStandards({ locale }: AboutStandardsProps) {
  const isAr = locale === "ar";

  const standards = [
    {
      num: "01",
      icon: "🏗️",
      title: isAr ? "الانضباط المعماري والجودة الهندسية" : "Architectural Rigor & Engineering Quality",
      desc: isAr
        ? "نبني أنظمة برمجية منظمة بطبقات واضحة، تعتمد معايير TypeScript الصارمة واختبارات التكامل، لتقليل التعقيد وضمان سهولة التطوير المستمر."
        : "We architect modular, layer-separated software systems with strict typing and integration testing, eliminating technical debt before production.",
      chips: ["Strict TypeScript", "Modular Boundaries", "Automated CI/CD"],
    },
    {
      num: "02",
      icon: "🔒",
      title: isAr ? "أمان وسيادة البيانات" : "Data Security & Enterprise Sovereignty",
      desc: isAr
        ? "حماية وتشفير البيانات في حالتي التخزين والنقل، وتطبيق سياسات صلاحيات دقيقة (RBAC) تتوافق مع التشريعات والمعايير السحابية المحلية."
        : "End-to-end data encryption at rest and in transit, strict role-based access controls (RBAC), and alignment with Saudi cloud security standards.",
      chips: ["Zero Trust", "RBAC Governance", "KSA Cloud Compliance"],
    },
    {
      num: "03",
      icon: "🗝️",
      title: isAr ? "تسليم شامل واستقلالية تقنية تامة" : "Turnkey Handover & Zero Vendor Lock-in",
      desc: isAr
        ? "يحصل العميل على ملكية كاملة 100% للشفرات المصدرية والأصول الرقمية، مع توثيق تقني مفصل وجلسات تسليم تضمن استقلالية الفريق الداخلي."
        : "Clients receive 100% turnkey ownership of all source code, deployment scripts, and technical documentation—guaranteeing full team autonomy.",
      chips: ["100% Code Ownership", "Handover Walkthrough", "No Vendor Lock-in"],
    },
  ];

  return (
    <section className="about-standards-neutral">
      <div className="wrap">
        <div className="capabilities-section-header">
          <span className="section-eyebrow">
            {isAr ? "معايير الاستوديو التقني" : "Engineering Standards & Culture"}
          </span>
          <h2>
            {isAr
              ? "انضباط هندسي في كل مرحلة تطوير"
              : "Disciplined Engineering Across Every Stage"}
          </h2>
          <p>
            {isAr
              ? "نعتمد أفضل الممارسات البرمجية لضمان استقرار، أمان، وسرعة استجابة الأنظمة الرقمية في بيئات العمل الحية."
              : "We adhere to rigorous software engineering practices to ensure stability, enterprise security, and optimal latency in production environments."}
          </p>
        </div>

        <ScrollReveal className="about-standards-grid" staggerDelay={100}>
          {standards.map((std, idx) => (
            <article key={idx} className="about-standard-card scroll-reveal-item">
              <div className="standard-card-top">
                <div className="standard-icon-wrap">
                  <span>{std.icon}</span>
                </div>
                <span className="standard-num">{std.num}</span>
              </div>

              <h3>{std.title}</h3>
              <p className="standard-desc">{std.desc}</p>

              <div className="standard-chips">
                {std.chips.map((chip, cIdx) => (
                  <span key={cIdx} className="standard-chip">
                    {chip}
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
