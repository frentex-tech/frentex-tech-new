"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { CrmDemo } from "@/components/project/CrmDemo";
import { ErpDemo } from "@/components/project/ErpDemo";
import { OpsDemo } from "@/components/project/OpsDemo";
import { labContent, type LabCategory, type LabFilter } from "@/content/lab";
import { localize } from "@/content/localized";
import { projectsContent } from "@/content/projects";
import type { PageLink } from "@/i18n/availability";
import type { Locale } from "@/i18n/config";
import { ScrollReveal } from "@/components/visual/solutions/ScrollReveal";
import { ArrowText } from "@/components/visual/icons";

const filterOrder: LabFilter[] = ["all", "crm", "ops", "erp"];
const cardCategories: LabCategory[] = ["crm", "ops", "erp"];

interface WorkLabShowcaseProps {
  locale: Locale;
  demoLinks: Record<LabCategory, PageLink>;
}

export function WorkLabShowcase({
  locale,
  demoLinks,
}: WorkLabShowcaseProps) {
  const isAr = locale === "ar";
  const lab = localize(labContent, locale);
  const { demos } = localize(projectsContent, locale);
  const [filter, setFilter] = useState<LabFilter>("all");
  const isHidden = (category: LabCategory) => filter !== "all" && filter !== category;
  const visibleCount = cardCategories.filter((category) => !isHidden(category)).length;

  const previews: Record<LabCategory, ReactNode> = {
    crm: <CrmDemo content={demos.crm} preview />,
    ops: <OpsDemo content={demos.ops} preview />,
    erp: <ErpDemo content={demos.erp} preview />,
  };

  const domainBadges: Record<LabCategory, { code: string; tags: string[] }> = {
    crm: {
      code: "CRM / SALES PIPELINE",
      tags: isAr
        ? ["لوحة مبيعات تفاعلية", "تتبع دورة الصفقات", "سجل النشاطات"]
        : ["Kanban Board", "Deal Velocity", "Activity Trail"],
    },
    ops: {
      code: "WORKFLOW / APPROVALS",
      tags: isAr
        ? ["سير موافقات متعدد المراحل", "مصفوفة الصلاحيات", "سجل تدقيق غير قابل للتعديل"]
        : ["Multi-Stage Routing", "Approval Matrix", "Immutable Audit"],
    },
    erp: {
      code: "BUSINESS SYSTEMS / ERP",
      tags: isAr
        ? ["تتبع أرصدة المخزون", "حدود إعادة الطلب الآلية", "دورة أوامر الشراء"]
        : ["Real-Time Ledger", "Reorder Thresholds", "Purchase Orders"],
    },
  };

  return (
    <section id="work" className="work-showcase-section">
      <div className="wrap">
        {/* Section Header */}
        <div className="capabilities-section-header" style={{ marginBottom: "36px" }}>
          <span className="section-eyebrow">
            {isAr ? "مختبر النماذج والتطبيقات" : "Interactive Prototypes Lab"}
          </span>
          <h2>
            {lab.title[0]} {lab.title[1]}
          </h2>
          <p>{lab.intro}</p>

          <div className="work-disclosure-badge">
            <span className="disclosure-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </span>
            <span>{lab.disclosure}</span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="work-filter-bar" role="group" aria-label={lab.filterLabel}>
          <div className="filter-pill-buttons">
            {filterOrder.map((value) => (
              <button
                key={value}
                type="button"
                className={value === filter ? "filter active" : "filter"}
                data-filter={value}
                aria-pressed={value === filter}
                onClick={() => setFilter(value)}
              >
                {lab.filters[value]}
              </button>
            ))}
          </div>

          <div id="filter-status" className="work-filter-status" role="status">
            <span className="status-live-dot" />
            <span>{lab.status(visibleCount, cardCategories.length)}</span>
          </div>
        </div>

        {/* Prototype Cards Grid with Rise-and-Settle Animation */}
        <ScrollReveal className="work-prototypes-grid" staggerDelay={90}>
          {cardCategories.map((category, index) => {
            const card = lab[category];
            const link = demoLinks[category];
            const meta = domainBadges[category];
            const isWide = category === "erp";

            return (
              <article
                key={category}
                className={`work-prototype-card scroll-reveal-item ${isWide ? "card-wide" : ""}`}
                data-category={category}
                hidden={isHidden(category)}
              >
                {/* Console Bar with Browser Controls */}
                <div className="prototype-console-bar">
                  <div className="console-traffic-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-amber" />
                    <span className="dot dot-green" />
                  </div>
                  <div className="console-category-tag">
                    <span>{meta.code}</span>
                  </div>
                  <div className="console-live-tag">
                    <span className="live-pulse" />
                    <span>{isAr ? "محاكاة حية" : "Live Sandbox"}</span>
                  </div>
                </div>

                {/* Inert Live Interactive Preview Window */}
                <Link
                  className="prototype-window-link"
                  href={link.href}
                  hrefLang={link.hrefLang}
                  aria-label={card.title}
                >
                  <div className="product-window work-product-window">
                    <div className="lab-preview" inert aria-hidden="true">
                      {previews[category]}
                    </div>
                  </div>
                </Link>

                {/* Card Information & Action Link */}
                <div className="prototype-card-body">
                  <div className="prototype-meta-row">
                    <span className="prototype-num-badge">0{index + 1}</span>
                    <span className="prototype-system-label" dir="ltr">
                      {card.label}
                    </span>
                  </div>

                  <h3 className="prototype-title">{card.title}</h3>
                  <p className="prototype-summary">{card.body}</p>

                  {/* Architecture Capability Tags */}
                  <div className="prototype-chips-row">
                    {meta.tags.map((tag) => (
                      <span key={tag} className="prototype-chip">
                        <span className="chip-check">✓</span> {tag}
                      </span>
                    ))}
                  </div>

                  {/* Prominent Action Button */}
                  <div className="prototype-action-wrapper">
                    <Link
                      className="button outline prototype-launch-btn"
                      href={link.href}
                      hrefLang={link.hrefLang}
                    >
                      <ArrowText text={card.linkLabel} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
