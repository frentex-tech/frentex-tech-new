import type { Solution, SolutionSlug, SolutionsContent } from "../solutions";
import cards from "./solution-cards";

type SolutionDetails = Pick<Solution, "tagline" | "whenItFits" | "deliverables" | "agreeFirst">;

// The rest of each solution page; the title, label and summary come from the services page cards.
// Every slug is required, so the six pages can only be published together.
// Non-breaking spaces keep a heading's last word and the Integration tagline's second sentence together.
const details: Record<SolutionSlug, SolutionDetails> = {
  platforms: {
    tagline: "An interface built for lasting relationships.",
    whenItFits:
      "When your customers or partners need to complete and track their requests instead of going back and forth by message.",
    deliverables:
      "A user journey map; interface design; content management; integration with the agreed systems; documentation and handover.",
    agreeFirst:
      "Brand identity and content, user types, access permissions, integrations, and page speed and accessibility criteria.",
  },
  apps: {
    tagline: "Your services, closer to the people who use them.",
    whenItFits: "When the service calls for frequent use, field work or an experience that depends on the device.",
    deliverables:
      "A prototype you can try; the app itself; integration APIs; device testing; release preparation; an operations guide.",
    agreeFirst: "Target devices, offline use, notifications, user accounts and app store publishing policies.",
  },
  business: {
    tagline: "A shared view of your operations.",
    whenItFits:
      "When sales, orders and inventory are spread across separate tools and it is hard to see who is responsible for what.",
    deliverables:
      "Process analysis; a permissions matrix; the agreed modules; a migration plan; reports; training and handover.",
    agreeFirst:
      "Your data sources and their quality, the modules you need, your current system, the owner of each process and the transition plan.",
  },
  integration: {
    tagline: "Connected data. Teams that work together.",
    whenItFits: "When the same data is entered more than once, or decisions are delayed because your systems don't agree.",
    deliverables:
      "A systems map; data-exchange specifications; error handling and retries; integration tests; documentation.",
    agreeFirst:
      "API availability, usage limits, which source is authoritative, synchronization rules and the environments we may access.",
  },
  automation: {
    tagline: "Fewer steps. Clearer control.",
    whenItFits:
      "When classifying, searching or preparing summaries takes time your team could spend on higher-value work.",
    deliverables: "A defined use case; a feasibility trial; evaluation criteria; review points; a cost and operating plan.",
    agreeFirst:
      "How sensitive the data is, whether an external provider may be used, the quality of the sources and when a decision must go to a person.",
  },
  support: {
    tagline: "After launch, with a plan.",
    whenItFits: "When your system needs a clear owner for maintenance, improvements and issue resolution.",
    deliverables:
      "A list of supported systems; priority levels; a channel for reporting issues; maintenance windows; a follow-up report.",
    agreeFirst: "Coverage hours, response times, and backup and restore are agreed in writing. 24/7 service is not assumed.",
  },
};

const solutions: SolutionsContent = {
  documentTitle: (solutionTitle) => `${solutionTitle} | Frentex Tech`,
  eyebrow: (label) => `FRENTEX / ${label}`,
  cardTitles: {
    whenItFits: "When does it fit?",
    summary: "What can we build?",
    deliverables: "Deliverables we agree on",
    agreeFirst: "What we define with your team first",
  },
  purchase: {
    title: "Clarity before you commit.",
    body: "The technical proposal sets out the release scope, exclusions, cost, schedule and acceptance criteria. Any additional requirement is assessed for its impact and approved before it is implemented.",
    link: "See how we work →",
  },
  items: cards.map((card) => ({ ...card, ...details[card.slug] })),
};

export default solutions;
