"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { CrmDemo } from "@/components/project/CrmDemo";
import { ErpDemo } from "@/components/project/ErpDemo";
import { OpsDemo } from "@/components/project/OpsDemo";
import { Icon } from "@/components/visual/icons";
import { localize } from "@/content/localized";
import { projectsContent } from "@/content/projects";
import type { LabCategory } from "@/content/lab";
import type { PageLink } from "@/i18n/availability";
import type { Locale } from "@/i18n/config";

export type SectorTabItem = {
  key: LabCategory;
  tabLabel: string;
  small: string;
  title: [string, string];
  description: string;
  includes: string[];
  linkLabel: string;
  link: PageLink;
  projectName: string;
};

type SectorTabsProps = {
  locale: Locale;
  ariaLabel: string;
  disclosure: string;
  items: SectorTabItem[];
};

/** The reference sector tabs: roving focus, arrows that follow the reading direction, Home/End. */
export function SectorTabs({ locale, ariaLabel, disclosure, items }: SectorTabsProps) {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mounted = useRef(false);
  const item = items[active];
  const { demos } = localize(projectsContent, locale);
  const previews: Record<LabCategory, ReactNode> = {
    crm: <CrmDemo content={demos.crm} preview />,
    ops: <OpsDemo content={demos.ops} preview />,
    erp: <ErpDemo content={demos.erp} preview />,
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const panel = panelRef.current;
    if (!panel) return;
    panel.classList.remove("soft-enter");
    const frame = requestAnimationFrame(() => panel.classList.add("soft-enter"));
    return () => cancelAnimationFrame(frame);
  }, [active]);

  function select(index: number, focus = false) {
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const rtl = document.documentElement.dir === "rtl";
    const count = items.length;
    let next: number | undefined;
    if (event.key === "ArrowLeft") next = rtl ? (active + 1) % count : (active - 1 + count) % count;
    if (event.key === "ArrowRight") next = rtl ? (active - 1 + count) % count : (active + 1) % count;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = count - 1;
    if (next === undefined) return;
    event.preventDefault();
    select(next, true);
  }

  return (
    <>
      <div className="sector-tabs" role="tablist" aria-label={ariaLabel} onKeyDown={onKeyDown}>
        {items.map((entry, index) => (
          <button
            key={entry.key}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            id={`tab-${entry.key}`}
            role="tab"
            aria-selected={index === active}
            aria-controls="sector-panel"
            tabIndex={index === active ? 0 : -1}
            onClick={() => select(index)}
          >
            {entry.tabLabel}
          </button>
        ))}
      </div>
      <div
        ref={panelRef}
        id="sector-panel"
        className="sector-panel"
        role="tabpanel"
        aria-labelledby={`tab-${item.key}`}
      >
        <div className="sector-copy">
          <span className="sector-small" dir="ltr">
            {item.small}
          </span>
          <h3>
            {item.title[0]}
            <br />
            {item.title[1]}
          </h3>
          <p>{item.description}</p>
          <ul>
            {item.includes.slice(0, 3).map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          <Link className="button primary" href={item.link.href} hrefLang={item.link.hrefLang}>
            {item.linkLabel} <Icon name="forward" size={16} />
          </Link>
        </div>
        <div className="sector-visual">
          <div className="workspace-mock">
            <div className="mock-toolbar">
              <b>{item.projectName}</b>
              <span>● ● ●</span>
            </div>
            <div className="mock-content" inert aria-hidden="true">
              <div className="lab-preview">{previews[item.key]}</div>
            </div>
            <span className="mock-note">{disclosure}</span>
          </div>
        </div>
      </div>
    </>
  );
}
