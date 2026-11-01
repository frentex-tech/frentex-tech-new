import { ScrollReveal } from "@/components/visual/solutions/ScrollReveal";
import type { Card } from "@/content/localized";
import type { Locale } from "@/i18n/config";

interface ContactTopicsProps {
  locale: Locale;
  title: string;
  items: Card[];
}

export function ContactTopics({ locale, title, items }: ContactTopicsProps) {
  const isAr = locale === "ar";

  const icons = ["🏢", "⚙️", "🎯"];

  const badgesMap: Record<number, string[]> = {
    0: isAr
      ? ["طبيعة النشاط", "الإدارات المستهدفة", "حجم المستخدمين"]
      : ["Core Business Activity", "Target Departments", "User Volume"],
    1: isAr
      ? ["الأنظمة القائمة", "الإجراءات اليدوية", "مصادر البيانات والـ API"]
      : ["Legacy Systems", "Manual Workflows", "Data & API Sources"],
    2: isAr
      ? ["الحد الأدنى للإطلاق (MVP)", "الموعد المستهدف", "حوكمة اعتماد القرار"]
      : ["Release Boundaries", "Target Timeline", "Decision Governance"],
  };

  return (
    <section className="contact-topics-neutral">
      <div className="wrap">
        <div className="capabilities-section-header">
          <span className="section-eyebrow">
            {isAr ? "محاور الاستكشاف الأولي" : "Discovery Focus Areas"}
          </span>
          <h2>{title}</h2>
          <p>
            {isAr
              ? "محاور نركز عليها أثناء اللقاء الاستكشافي لتحديد النطاق الأمثل وتوفير الوقت والجهد على فريقك."
              : "Key dimensions we address during initial alignment to define optimal scope and protect your team's time."}
          </p>
        </div>

        <ScrollReveal className="contact-topics-grid" staggerDelay={100}>
          {items.map((topic, idx) => (
            <article key={topic.title} className="contact-topic-card scroll-reveal-item">
              <div className="topic-card-top">
                <div className="topic-icon-wrap">
                  <span>{icons[idx] || "💡"}</span>
                </div>
                <span className="topic-num">{String(idx + 1).padStart(2, "0")}</span>
              </div>

              <h3>{topic.title}</h3>
              <p className="topic-desc">{topic.body}</p>

              <div className="topic-chips">
                {(badgesMap[idx] || []).map((badge, bIdx) => (
                  <span key={bIdx} className="topic-chip">
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
