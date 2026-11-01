import { ScrollReveal } from "@/components/visual/solutions/ScrollReveal";
import type { Card } from "@/content/localized";
import type { Locale } from "@/i18n/config";

interface ProcessPracticesProps {
  locale: Locale;
  practices: Card[];
}

export function ProcessPractices({ locale, practices }: ProcessPracticesProps) {
  const isAr = locale === "ar";

  const icons = ["⚖️", "🔒", "🤝"];

  const badgesMap: Record<number, string[]> = {
    0: isAr
      ? ["توثيق مسبق", "تقييم أثر الوقت والتكلفة", "اعتماد مكتوب"]
      : ["Pre-Approval", "Impact Assessment", "Written Sign-Off"],
    1: isAr
      ? ["تصنيف البيانات", "سيادة سحابية", "صلاحيات دقيقة (RBAC)"]
      : ["Data Classification", "Cloud Sovereignty", "Granular RBAC"],
    2: isAr
      ? ["نقطة اتصال مخصصة", "مراجعات أسبوعية منتظمة", "سجل المخاطر والقرارات"]
      : ["Single Dedicated POC", "Weekly Syncs", "Audit & Risk Log"],
  };

  return (
    <section className="process-practices-neutral">
      <div className="wrap">
        <div className="capabilities-section-header">
          <span className="section-eyebrow">
            {isAr ? "الحوكمة وضمان الجودة" : "Delivery Governance & Risk Control"}
          </span>
          <h2>
            {isAr
              ? "قواعد تحمي جودة ووقت وميزانية المشروع"
              : "Practices That Protect Quality, Budget & Timeline"}
          </h2>
          <p>
            {isAr
              ? "نعتمد آليات حوكمة واضحة للتعامل مع التغييرات الطارئة، حماية البيانات الحساسة، والتواصل الإداري المستمر."
              : "Structured governance mechanisms for change control, data protection, and continuous executive alignment."}
          </p>
        </div>

        <ScrollReveal className="process-practices-grid" staggerDelay={100}>
          {practices.map((item, idx) => (
            <article key={item.title} className="process-practice-card scroll-reveal-item">
              <div className="practice-card-top">
                <div className="practice-icon-wrap">
                  <span>{icons[idx] || "🛡️"}</span>
                </div>
                <span className="practice-num">{String(idx + 1).padStart(2, "0")}</span>
              </div>

              <h3>{item.title}</h3>
              <p className="practice-desc">{item.body}</p>

              <div className="practice-chips">
                {(badgesMap[idx] || []).map((badge, bIdx) => (
                  <span key={bIdx} className="practice-chip">
                    {badge}
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
