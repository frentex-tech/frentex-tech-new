"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ArrowText } from "@/components/visual/icons";
import type { CrmDemoContent, Lead } from "@/content/projects";

type CrmDemoProps = {
  content: CrmDemoContent;
  onStatus?: (message: string) => void;
  /** The board alone, without the tools or ids, for the Work Lab's inert window onto the demo. */
  preview?: boolean;
};

// Case-insensitive for Latin script; Arabic letters have no case, so Arabic matching is unchanged.
const matchesSearch = (name: string, query: string) => name.toLowerCase().includes(query.toLowerCase());

/** "Madar" CRM demo: search leads and move them between pipeline stages. */
export function CrmDemo({ content, onStatus = () => {}, preview = false }: CrmDemoProps) {
  const { stages } = content;
  const lastStage = stages.length - 1;
  const [leads, setLeads] = useState(content.leads);
  const [search, setSearch] = useState("");
  const kanbanRef = useRef<HTMLDivElement>(null);
  const query = search.trim();

  function changeSearch(value: string) {
    setSearch(value);
    const matches = leads.filter((lead) => matchesSearch(lead.name, value.trim())).length;
    onStatus(content.status.matches(matches));
  }

  function reset() {
    setLeads(content.leads);
    setSearch("");
    onStatus(content.status.reset);
  }

  function move(lead: Lead, direction: number) {
    const stage = Math.max(0, Math.min(lastStage, lead.stage + direction));
    flushSync(() => setLeads(leads.map((item) => (item.id === lead.id ? { ...item, stage } : item))));
    onStatus(content.status.moved(lead.name, stages[stage]));
    // Keep focus on the moved lead, as its card is re-rendered in another column.
    kanbanRef.current?.querySelector<HTMLButtonElement>(`[data-lead="${lead.id}"]`)?.focus();
  }

  return (
    <>
      {!preview && (
        <div className="demo-tools">
          <label>
            {content.searchLabel}
            <input
              id="lead-search"
              placeholder={content.searchPlaceholder}
              value={search}
              onChange={(event) => changeSearch(event.target.value)}
            />
          </label>
          <button className="small-button" id="reset-crm" onClick={reset}>
            {content.reset}
          </button>
        </div>
      )}
      <div className="kanban" id={preview ? undefined : "kanban"} ref={kanbanRef}>
        {stages.map((stageName, stage) => {
          const items = leads.filter((lead) => lead.stage === stage && matchesSearch(lead.name, query));
          return (
            <section key={stageName} className="kanban-column">
              <h3>
                {stageName}
                <span>{items.length}</span>
              </h3>
              {items.length ? (
                items.map((lead) => (
                  <article key={lead.id} className="lead-card">
                    <h4>{lead.name}</h4>
                    <p>{lead.detail}</p>
                    {stage < lastStage && (
                      <button
                        className="small-button filled"
                        data-lead={lead.id}
                        data-direction="1"
                        onClick={() => move(lead, 1)}
                      >
                        <ArrowText text={content.moveForward(stages[stage + 1])} />
                      </button>
                    )}
                    {stage > 0 && (
                      <>
                        {" "}
                        <button
                          className="small-button"
                          data-lead={lead.id}
                          data-direction="-1"
                          onClick={() => move(lead, -1)}
                        >
                          {content.moveBack}
                        </button>
                      </>
                    )}
                  </article>
                ))
              ) : (
                <p className="empty-state">{content.empty}</p>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
