import { ScrollReveal } from "@/components/visual/solutions/ScrollReveal";
import type { Card } from "@/content/localized";
import type { Locale } from "@/i18n/config";

interface AboutPrinciplesProps {
  locale: Locale;
  principles: Card[];
}

export function AboutPrinciples({ locale, principles }: AboutPrinciplesProps) {
  const isAr = locale === "ar";

  const icons = ["🏢", "🎯", "🌐", "🛡️"];

  const badgesMap: Record<number, string[]> = {
    0: isAr
      ? ["المؤسسات الكبرى", "الشركات المتنامية", "الشركات الناشئة"]
      : ["Enterprise Entities", "Scaling Businesses", "High-Growth Startups"],
    1: isAr
      ? ["فهم الإجراء أولاً", "بناء مخصص ومدروس", "كفاءة التشغيل"]
      : ["Process-First", "Tailored Architecture", "Operational Efficiency"],
    2: isAr
      ? ["واجهات RTL أصيلة", "تناغم اتجاه القراءة", "دعم ثنائي متكافئ"]
      : ["Native RTL Ergonomics", "Reading Flow Harmony", "Full Bilingual Parity"],
    3: isAr
      ? ["توثيق معتمد", "تسليم وحوكمة واضحة", "نماذج أصلية مجربة"]
      : ["Rigorous Docs", "Transparent Handover", "Verified Concepts"],
  };

  return (
    <section className="about-principles-white">
      <div className="wrap">
        <div className="capabilities-section-header">
          <span className="section-eyebrow">
            {isAr ? "ركائز العمل الهندسي" : "Core Engineering Principles"}
          </span>
          <h2>
            {isAr
              ? "مبادئ تحكم طريقة بنائنا للبرمجيات"
              : "Principles That Govern How We Build Software"}
          </h2>
          <p>
            {isAr
              ? "لا نكتفي بكتابة الشفرة، بل نصمم حلولاً برمجية تدوم وتخدم أهداف العمل الحقيقية بأعلى درجات الانضباط."
              : "We do not merely write code; we engineer resilient software systems built around real business outcomes."}
          </p>
        </div>

        <ScrollReveal className="about-principles-grid" staggerDelay={90}>
          {principles.map((item, idx) => (
            <article key={item.title} className="about-principle-card scroll-reveal-item">
              <div className="principle-card-top">
                <div className="principle-icon-wrap">
                  <span>{icons[idx] || "⚙️"}</span>
                </div>
                <span className="principle-num">{String(idx + 1).padStart(2, "0")}</span>
              </div>

              <h3>{item.title}</h3>
              <p className="principle-body-text">{item.body}</p>

              <div className="principle-chips">
                {(badgesMap[idx] || []).map((badge, bIdx) => (
                  <span key={bIdx} className="principle-chip">
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
