import type { ProcessContent } from "../pages";

const process: ProcessContent = {
  meta: {
    title: "How We Work | Frentex Tech",
    description:
      "How Frentex Tech works with companies: discovery, scope and design, development, user acceptance, handover and support.",
  },
  intro: {
    eyebrow: "HOW WE WORK",
    title: ["From the business question", "to a clear handover."],
    lead: "A way of working that brings management, operations and technology together around one scope and deliverables you can review.",
  },
  outputLabel: "Output:",
  phases: [
    {
      label: "01 / Discovery",
      title: "We understand the decision before the system.",
      body: "We meet with stakeholders to understand the workflow, the users, the constraints and the integrations.",
      output: "A needs summary, a process map, and a list of requirements and priorities.",
    },
    {
      label: "02 / Scope and design",
      title: "What goes into the first release.",
      body: "We set the boundaries, design the user journeys and the prototype, and review dependencies, budget and schedule.",
      output: "A technical and financial proposal, an interface prototype, acceptance criteria and approval to start.",
    },
    {
      label: "03 / Development and review",
      title: "Visible progress at every stage.",
      body: "We build in stages and review the product with the designated owner. We record decisions and changes, and test the scenarios.",
      output: "Interim releases, a change log, tests and progress reports.",
    },
    {
      label: "04 / User acceptance and launch",
      title: "Go live with a transition plan.",
      body: "Your team tests the agreed business scenarios. We address the feedback and review migration, rollback and permissions.",
      output: "An acceptance record, a launch plan, and an operations guide and training as scoped.",
    },
    {
      label: "05 / Handover and support",
      title: "Clear ownership and responsibilities.",
      body: "We hand over the repositories, documentation and accounts covered by the agreement, and define the follow-up after launch.",
      output: "A handover record, support and maintenance details, and a plan for later improvements.",
    },
  ],
  practices: [
    {
      title: "Change management",
      body: "Every out-of-scope request is documented and assessed for its impact on time and cost, then approved before it is added.",
    },
    {
      title: "Data handling",
      body: "With your team, we define data classification, working environments, access permissions and hosting requirements. Sector requirements are part of discovery.",
    },
    {
      title: "Communication and governance",
      body: "A point of contact on each side, agreed review meetings, and a log of decisions, risks and dependencies.",
    },
  ],
};

export default process;
