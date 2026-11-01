import type { LabContent } from "../lab";

const lab: LabContent = {
  eyebrow: "Frentex Lab",
  title: ["See the idea.", "Then try it yourself."],
  intro:
    "Original demos we designed and built for this website. Each one explains a problem and a solution, and lets you try part of the user journey.",
  disclosure: "Illustrative demos with sample data, not client projects.",
  filterLabel: "Filter the demos",
  filters: {
    all: "All demos",
    crm: "Customer management",
    erp: "Business systems",
    ops: "Operations & automation",
  },
  status: (visible) => (visible === 1 ? "1 interactive demo" : `${visible} interactive demos`),
  crm: {
    linkLabel: "Explore Madar, the sales pipeline demo",
    label: "CRM / SALES EXPERIENCE",
    title: "Madar — a clearer sales journey",
    body: "From the first opportunity to an agreement, on one board your team can follow.",
  },
  ops: {
    linkLabel: "Explore Sayr, the internal requests demo",
    label: "WORKFLOW / INTERNAL TOOLS",
    title: "Sayr — requests that don't get lost",
    body: "Intake, review and decision, with a clear record of every step.",
  },
  erp: {
    linkLabel: "Explore Raseed, the inventory and purchasing demo",
    label: "BUSINESS SYSTEMS / ERP CONCEPT",
    title: "Raseed — shared inventory view",
    body: "Track quantities, see what needs reordering and create a sample purchase order.",
  },
};

export default lab;
