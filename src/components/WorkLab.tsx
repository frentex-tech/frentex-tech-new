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
import { MutedSecondLine } from "./MutedSecondLine";
import { Icon } from "./visual/icons";

const filterOrder: LabFilter[] = ["all", "crm", "ops", "erp"];
const cardCategories: LabCategory[] = ["crm", "ops", "erp"];

type WorkLabProps = {
  locale: Locale;
  demoLinks: Record<LabCategory, PageLink>;
};

export function WorkLab({ locale, demoLinks }: WorkLabProps) {
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

  return (
    <section id="work" className="section work-section">
      <div className="wrap">
        <div className="section-top">
          <div>
            <div className="eyebrow">{lab.eyebrow}</div>
            <h2>
              <MutedSecondLine lines={lab.title} />
            </h2>
          </div>
          <div>
            <p>{lab.intro}</p>
            <span className="disclosure">{lab.disclosure}</span>
          </div>
        </div>
        <div className="filter-row" role="group" aria-label={lab.filterLabel}>
          {filterOrder.map((value) => (
            <button
              key={value}
              className={value === filter ? "filter active" : "filter"}
              data-filter={value}
              aria-pressed={value === filter}
              onClick={() => setFilter(value)}
            >
              {lab.filters[value]}
            </button>
          ))}
          <span id="filter-status" role="status">
            {lab.status(visibleCount, cardCategories.length)}
          </span>
        </div>
        <div className="work-grid">
          {cardCategories.map((category) => {
            const card = lab[category];
            const link = demoLinks[category];
            const isWide = category === "erp";
            return (
              <article
                key={category}
                className={isWide ? "work-card work-wide" : "work-card"}
                data-category={category}
                hidden={isHidden(category)}
              >
                <Link
                  className={`work-visual ${category}-visual`}
                  href={link.href}
                  hrefLang={link.hrefLang}
                  aria-label={card.title}
                >
                  <div className="product-window">
                    <div className="lab-preview" inert aria-hidden="true">
                      {previews[category]}
                    </div>
                  </div>
                </Link>
                <div className="work-info">
                  <div>
                    <span className="work-label" dir="ltr">
                      {card.label}
                    </span>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </div>
                  <Link
                    className="circle-link"
                    href={link.href}
                    hrefLang={link.hrefLang}
                    aria-label={card.title}
                  >
                    <Icon name="forward" size={16} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
