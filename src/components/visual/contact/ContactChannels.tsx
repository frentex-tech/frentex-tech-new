import { ScrollReveal } from "@/components/visual/solutions/ScrollReveal";
import { ArrowText, Icon } from "@/components/visual/icons";
import { OpenBriefButton } from "@/components/BriefDialog";
import { contact } from "@/lib/site";
import type { Locale } from "@/i18n/config";

interface BusinessChannelProps {
  eyebrow: string;
  title: string;
  body: string;
  whatsapp: string;
  whatsappNote: string;
}

interface BriefChannelProps {
  eyebrow: string;
  title: string;
  body: string;
  action: string;
  note: string;
}

interface ContactChannelsProps {
  locale: Locale;
  business: BusinessChannelProps;
  brief: BriefChannelProps;
}

export function ContactChannels({ locale, business, brief }: ContactChannelsProps) {
  const isAr = locale === "ar";

  return (
    <section className="contact-channels-white">
      <div className="wrap">
        <div className="capabilities-section-header">
          <span className="section-eyebrow">
            {isAr ? "قنوات التواصل المباشر" : "Direct Engagement Channels"}
          </span>
          <h2>
            {isAr
              ? "اختر الطريقة الأنسب لبدء النقاش"
              : "Choose the Optimal Way to Begin"}
          </h2>
          <p>
            {isAr
              ? "سواء كنت تفضل المحادثة المباشرة لمناقشة أبعاد مشروعك، أو تجهيز ملخص فني مسبق لمتطلباتك."
              : "Whether you prefer direct executive dialogue to explore requirements, or preparing a structured technical brief first."}
          </p>
        </div>

        <ScrollReveal className="contact-channels-grid" staggerDelay={100}>
          {/* Card 1: Direct Executive WhatsApp & Contact */}
          <article className="contact-channel-card business-card scroll-reveal-item">
            <div className="channel-card-top">
              <div className="channel-badge-group">
                <div className="channel-icon-wrap business-icon">
                  <span>💬</span>
                </div>
                <div className="channel-meta-text">
                  <span className="channel-eyebrow">{business.eyebrow}</span>
                  <span className="channel-subtag">{isAr ? "محادثة فورية" : "Direct Executive Contact"}</span>
                </div>
              </div>
              <span className="channel-status-badge live">
                {isAr ? "متاح للرد" : "Available"}
              </span>
            </div>

            <h3 className="channel-title">{business.title}</h3>
            <p className="channel-body">{business.body}</p>

            {/* Direct Contact Items */}
            <div className="channel-direct-items">
              <a dir="ltr" className="direct-item-row" href={contact.phoneHref}>
                <span className="direct-icon">📞</span>
                <span className="direct-text">{contact.phoneDisplay}</span>
              </a>
              <a dir="ltr" className="direct-item-row" href={`mailto:${contact.email}`}>
                <span className="direct-icon">✉️</span>
                <span className="direct-text">{contact.email}</span>
              </a>
            </div>

            {/* Action */}
            <div className="channel-action-box">
              <a
                className="button primary channel-cta-btn whatsapp-cta"
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowText text={business.whatsapp} />
              </a>
              <p className="channel-note">{business.whatsappNote}</p>
            </div>
          </article>

          {/* Card 2: Interactive Project Brief Builder */}
          <article className="contact-channel-card brief-card scroll-reveal-item">
            <div className="channel-card-top">
              <div className="channel-badge-group">
                <div className="channel-icon-wrap brief-icon">
                  <span>📋</span>
                </div>
                <div className="channel-meta-text">
                  <span className="channel-eyebrow">{brief.eyebrow}</span>
                  <span className="channel-subtag">{isAr ? "أداة تفاعلية محلية" : "Interactive Scope Tool"}</span>
                </div>
              </div>
              <span className="channel-status-badge client-side">
                {isAr ? "خصوصية تامة" : "100% Private"}
              </span>
            </div>

            <h3 className="channel-title">{brief.title}</h3>
            <p className="channel-body">{brief.body}</p>

            {/* Brief Feature Chips */}
            <div className="brief-feature-chips">
              <div className="feature-chip-item">
                <span className="chip-check">✓</span>
                <span>{isAr ? "تعمل محلياً 100% على جهازك" : "Runs locally in your browser"}</span>
              </div>
              <div className="feature-chip-item">
                <span className="chip-check">✓</span>
                <span>{isAr ? "تحديد التحدي والنطاق والمستخدمين" : "Map users, systems and scope"}</span>
              </div>
              <div className="feature-chip-item">
                <span className="chip-check">✓</span>
                <span>{isAr ? "تنزيل ملخص فوري للمشاركة" : "Download summary text immediately"}</span>
              </div>
            </div>

            {/* Action */}
            <div className="channel-action-box">
              <OpenBriefButton className="button outline channel-cta-btn brief-cta">
                <span>{brief.action}</span>
                <Icon name="forward" size={16} />
              </OpenBriefButton>
              <p className="channel-note">{brief.note}</p>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
