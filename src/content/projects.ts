import ar from "./ar/projects";
import en from "./en/projects";
import type { Localized, PageMeta, TwoLines } from "./localized";

export type ProjectKey = "crm" | "ops" | "erp";

export type Project = {
  name: string;
  /** Two-line subtitle shown after the name in the page heading. */
  subtitle: TwoLines;
  description: string;
  category: string;
  scope: string;
  interaction: string;
  challenge: string;
  solution: string;
  includes: string[];
  limits: string;
  next: ProjectKey;
};

export type Lead = { id: number; name: string; detail: string; stage: number };

export type CrmDemoContent = {
  searchLabel: string;
  searchPlaceholder: string;
  reset: string;
  stages: string[];
  leads: Lead[];
  empty: string;
  moveForward: (stage: string) => string;
  moveBack: string;
  status: {
    matches: (count: number) => string;
    moved: (lead: string, stage: string) => string;
    reset: string;
  };
};

export type RequestState = "pending" | "approved" | "returned";
export type RequestAction = "approve" | "return" | "reopen";
export type InternalRequest = {
  id: number;
  title: string;
  team: string;
  description: string;
  state: RequestState;
  log: string[];
};

export type OpsDemoContent = {
  reset: string;
  listTitle: string;
  requests: InternalRequest[];
  states: Record<RequestState, string>;
  actions: Record<RequestAction, { label: string; log: string }>;
  /** The single history entry every request has after a reset. */
  resetLog: string;
  teamLabel: string;
  policyLabel: string;
  policy: string;
  requestSummary: (id: number, state: string) => string;
  status: {
    selected: (id: number) => string;
    changed: (state: string, id: number) => string;
    reset: string;
  };
};

export type StockItem = { id: number; name: string; qty: number; limit: number };

export type ErpDemoContent = {
  prompt: string;
  reset: string;
  columns: [string, string, string, string, string, string];
  stock: StockItem[];
  stockState: { low: string; available: string };
  quantityLabel: (item: string) => string;
  buy: string;
  pending: string;
  ordersTitle: string;
  received: string;
  receive: string;
  empty: string;
  orderSummary: (number: string, item: string, qty: number) => string;
  status: {
    invalidQuantity: string;
    ordered: string;
    received: (qty: number, item: string, total: number) => string;
    reset: string;
  };
};

/** The interactive demo page: case studies, page labels and the three demos. */
export type ProjectsContent = {
  meta: PageMeta;
  /** Document title before a demo is shown, or when the requested demo is unknown. */
  labTitle: string;
  documentTitle: (projectName: string) => string;
  skipLabel: string;
  noscript: { title: string; body: string; link: string };
  unknown: { title: string; action: string };
  backLink: string;
  badge: string;
  facts: { scope: string; interaction: string; role: string; roleValue: string };
  demoTitle: (projectName: string) => string;
  demoNote: TwoLines;
  story: {
    challengeLabel: string;
    challengeTitle: string;
    solutionLabel: string;
    solutionTitle: string;
    includesLabel: string;
    includesTitle: string;
    productLabel: string;
    productBody: string;
  };
  nextLabel: string;
  nextLink: (projectName: string) => string;
  items: Record<ProjectKey, Project>;
  demos: { crm: CrmDemoContent; ops: OpsDemoContent; erp: ErpDemoContent };
};

export const projectsContent: Localized<ProjectsContent> = { ar, en };

export function isProjectKey(value: string): value is ProjectKey {
  return value === "crm" || value === "ops" || value === "erp";
}
