"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { OpsDemoContent, RequestAction, RequestState } from "@/content/projects";

const resultingState: Record<RequestAction, RequestState> = {
  approve: "approved",
  return: "returned",
  reopen: "pending",
};

type OpsDemoProps = {
  content: OpsDemoContent;
  onStatus?: (message: string) => void;
  /** The list and the first request alone, without the tools or ids, for the Work Lab's inert window onto the demo. */
  preview?: boolean;
};

/** "Sayr" operations demo: review internal requests and record each decision. */
export function OpsDemo({ content, onStatus = () => {}, preview = false }: OpsDemoProps) {
  const [requests, setRequests] = useState(content.requests);
  const [selectedId, setSelectedId] = useState(content.requests[0].id);
  const listRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const selected = requests.find((request) => request.id === selectedId) ?? requests[0];
  const decided = selected.state !== "pending";

  function select(id: number) {
    flushSync(() => setSelectedId(id));
    listRef.current?.querySelector<HTMLButtonElement>(`[data-request="${id}"]`)?.focus();
    onStatus(content.status.selected(id));
  }

  function act(action: RequestAction) {
    const state = resultingState[action];
    const entry = content.actions[action].log;
    flushSync(() =>
      setRequests(
        requests.map((request) =>
          request.id === selected.id ? { ...request, state, log: [...request.log, entry] } : request,
        ),
      ),
    );
    onStatus(content.status.changed(content.states[state], selected.id));
    detailRef.current?.querySelector<HTMLButtonElement>("button:not(:disabled)")?.focus();
  }

  function reset() {
    // The original reset replaces every history with a single entry.
    setRequests(content.requests.map((request) => ({ ...request, log: [content.resetLog] })));
    setSelectedId(content.requests[0].id);
    onStatus(content.status.reset);
  }

  return (
    <>
      {!preview && (
        <div className="demo-tools">
          <button className="small-button" id="reset-ops" onClick={reset}>
            {content.reset}
          </button>
        </div>
      )}
      <div className="ops-demo">
        <div className="request-list" id={preview ? undefined : "request-list"} ref={listRef}>
          <h3>{content.listTitle}</h3>
          {requests.map((request) => (
            <button
              key={request.id}
              className={request.id === selected.id ? "request-select selected" : "request-select"}
              data-request={request.id}
              aria-pressed={request.id === selected.id}
              onClick={() => select(request.id)}
            >
              <strong>{request.title}</strong>
              <small>{content.requestSummary(request.id, content.states[request.state])}</small>
            </button>
          ))}
        </div>
        <div className="request-detail" id={preview ? undefined : "request-detail"} ref={detailRef}>
          <span className="status-pill">{content.states[selected.state]}</span>
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
          <dl>
            <dt>{content.teamLabel}</dt>
            <dd>{selected.team}</dd>
            <dt>{content.policyLabel}</dt>
            <dd>{content.policy}</dd>
          </dl>
          <div className="request-actions">
            <button className="small-button filled" data-action="approve" disabled={decided} onClick={() => act("approve")}>
              {content.actions.approve.label}
            </button>
            <button className="small-button danger" data-action="return" disabled={decided} onClick={() => act("return")}>
              {content.actions.return.label}
            </button>
            {decided && (
              <button className="small-button" data-action="reopen" onClick={() => act("reopen")}>
                {content.actions.reopen.label}
              </button>
            )}
          </div>
          <ol className="activity-list">
            {selected.log.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
