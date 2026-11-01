import ar from "./ar/lab";
import en from "./en/lab";
import type { Localized, TwoLines } from "./localized";

export type LabCategory = "crm" | "ops" | "erp";
export type LabFilter = "all" | LabCategory;

/**
 * Text of each demo card. The card's window shows the demo itself (its preview mode),
 * so what it shows always matches the product. `linkLabel` names the demo's node on the systems map.
 */
type CardText = { linkLabel: string; label: string; title: string; body: string };

/** The "Frentex lab" section on the home and work pages. */
export type LabContent = {
  eyebrow: string;
  title: TwoLines;
  intro: string;
  disclosure: string;
  filterLabel: string;
  filters: Record<LabFilter, string>;
  /** Status announced after filtering. */
  status: (visible: number, total: number) => string;
  crm: CardText;
  ops: CardText;
  erp: CardText;
};

export const labContent: Localized<LabContent> = { ar, en };
