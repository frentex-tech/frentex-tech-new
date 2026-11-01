"use client";

import {
  createContext,
  use,
  useCallback,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { flushSync } from "react-dom";
import { briefContent, type BriefContent } from "@/content/brief";
import { Icon } from "@/components/visual/icons";
import { localize } from "@/content/localized";
import type { Locale } from "@/i18n/config";

const OpenBriefContext = createContext<() => void>(() => {});

/** Renders `children` followed by the brief dialog, which `OpenBriefButton` opens. */
export function BriefDialogProvider({ locale, children }: { locale: Locale; children?: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = useCallback(() => dialogRef.current?.showModal(), []);

  return (
    <OpenBriefContext value={open}>
      {children}
      <BriefDialog dialogRef={dialogRef} content={localize(briefContent, locale)} />
    </OpenBriefContext>
  );
}

type OpenBriefButtonProps = {
  className?: string;
  children: ReactNode;
  "data-open-brief"?: string;
  "data-open-brief-hero"?: string;
};

export function OpenBriefButton({
  className,
  children,
  "data-open-brief-hero": dataHero,
  "data-open-brief": dataBrief,
}: OpenBriefButtonProps) {
  const open = use(OpenBriefContext);

  const dataProps =
    dataHero !== undefined
      ? { "data-open-brief-hero": dataHero }
      : { "data-open-brief": dataBrief ?? "" };

  return (
    <button className={className} {...dataProps} onClick={open}>
      {children}
    </button>
  );
}

type BriefDialogProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  content: BriefContent;
};

function BriefDialog({ dialogRef, content }: BriefDialogProps) {
  const [briefText, setBriefText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState("");
  const serviceRef = useRef<HTMLSelectElement>(null);
  const downloadRef = useRef<HTMLButtonElement>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = content.summary({
      service: String(data.get("service")),
      challenge: String(data.get("challenge")).trim(),
      users: String(data.get("users")).trim(),
    });
    // Render synchronously so the revealed button can receive focus.
    flushSync(() => {
      setBriefText(text);
      setShowResult(true);
    });
    downloadRef.current?.focus();
  }

  function edit() {
    flushSync(() => setShowResult(false));
    serviceRef.current?.focus();
  }

  function download() {
    const url = URL.createObjectURL(new Blob(["﻿" + briefText], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = content.fileName;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloadStatus(content.downloadStatus);
  }

  function closeOnBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    const dialog = event.currentTarget;
    const rect = dialog.getBoundingClientRect();
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (event.target === dialog && outside) dialog.close();
  }

  return (
    <dialog
      ref={dialogRef}
      id="brief-dialog"
      className="brief-dialog"
      aria-labelledby="brief-title"
      onClick={closeOnBackdropClick}
    >
      <button
        className="dialog-close"
        data-close-dialog=""
        aria-label={content.closeLabel}
        onClick={() => dialogRef.current?.close()}
      >
        <Icon name="close" size={24} />
      </button>
      <div className="eyebrow">{content.step}</div>
      <h2 id="brief-title">{content.title}</h2>
      <p>{content.note}</p>
      <form id="brief-form" hidden={showResult} onSubmit={submit}>
        <label>
          {content.serviceLabel}
          <select ref={serviceRef} name="service">
            {content.services.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </label>
        <label>
          {content.challengeLabel}
          <textarea
            name="challenge"
            rows={3}
            minLength={10}
            maxLength={1500}
            required
            placeholder={content.challengePlaceholder}
          />
        </label>
        <label>
          {content.usersLabel}
          <input name="users" maxLength={200} required placeholder={content.usersPlaceholder} />
        </label>
        <button className="button primary" type="submit">
          {content.submit}
          <Icon name="forward" size={18} />
        </button>
      </form>
      <div id="brief-result" hidden={!showResult}>
        <h3>{content.resultTitle}</h3>
        <pre id="brief-text">{briefText}</pre>
        <button ref={downloadRef} className="button primary" id="download-brief" onClick={download}>
          {content.download}
        </button>
        <button className="button secondary" id="edit-brief" onClick={edit}>
          {content.edit}
        </button>
        <p role="status" id="brief-status">
          {downloadStatus}
        </p>
      </div>
    </dialog>
  );
}
