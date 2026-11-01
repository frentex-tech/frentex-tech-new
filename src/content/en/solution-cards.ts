import type { SolutionCard } from "../solutions";

// The services page cards. When the solution pages get English copy, build
// their items from these cards so each title and summary is written once.
const cards: SolutionCard[] = [
  {
    slug: "platforms",
    label: "PLATFORMS",
    title: "Websites & digital platforms",
    summary: "Multilingual corporate websites, customer and partner portals, service platforms and content management.",
    tags: "User experience · Interface design · Web development",
  },
  {
    slug: "apps",
    label: "APPS",
    title: "Mobile apps",
    summary: "Apps for customers, employees and field teams on iOS and Android, depending on the scope.",
    tags: "iOS and Android · Service apps · Business apps",
  },
  {
    slug: "business",
    label: "BUSINESS",
    title: "ERP & CRM systems",
    summary:
      "Management of customers, sales, inventory, purchasing and approval workflows. Before deciding, we weigh configuring an existing product against building custom modules.",
    tags: "Customer management · Operations · Resources · Reporting",
  },
  {
    slug: "integration",
    label: "INTEGRATION",
    title: "Integrations & custom systems",
    summary: "API integrations, internal portals, dashboards, data synchronization and process automation.",
    tags: "APIs · Internal portals · Dashboards",
  },
  {
    slug: "automation",
    label: "AUTOMATION",
    title: "Automation & AI",
    summary: "Automation of specific tasks, knowledge search, document processing and internal assistants with human review.",
    tags: "Process automation · Document processing · Focused assistants",
  },
  {
    slug: "support",
    label: "SUPPORT",
    title: "Support & ongoing development",
    summary: "Maintenance, improvements and monitoring, according to the service agreement and the scope of the system.",
    tags: "Maintenance · Performance · New features",
  },
];

export default cards;
