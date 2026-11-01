import ar from "./ar/brief";
import en from "./en/brief";
import type { Localized } from "./localized";

export type BriefAnswers = { service: string; challenge: string; users: string };

/** The project brief dialog: its form, the generated summary and the download. */
export type BriefContent = {
  closeLabel: string;
  step: string;
  title: string;
  note: string;
  serviceLabel: string;
  services: string[];
  challengeLabel: string;
  challengePlaceholder: string;
  usersLabel: string;
  usersPlaceholder: string;
  submit: string;
  resultTitle: string;
  download: string;
  edit: string;
  downloadStatus: string;
  fileName: string;
  /** The plain-text summary shown in the dialog and saved by the download. */
  summary: (answers: BriefAnswers) => string;
};

export const briefContent: Localized<BriefContent> = { ar, en };
