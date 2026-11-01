import type { ProjectsContent } from "../projects";

// Non-breaking spaces keep the last words of short headings together on narrow screens.
const projects: ProjectsContent = {
  meta: {
    title: "Work Lab | Frentex Tech",
    description:
      "Explore an original interactive demo from Frentex Lab, our space for designing and developing business systems.",
  },
  labTitle: "Work Lab | Frentex Tech",
  documentTitle: (projectName) => `${projectName} — Interactive demo | Frentex Tech`,
  skipLabel: "Skip to the demo",
  noscript: {
    title: "Frentex Lab",
    body: "Turn on JavaScript to try these demos. They run locally and send no data.",
    link: "Back to the demo descriptions",
  },
  unknown: { title: "This demo doesn't exist.", action: "Back to the Work Lab" },
  backLink: "← Back to the Work Lab",
  badge: "Original demo for this website / sample data",
  facts: {
    scope: "What we designed",
    interaction: "What you can try",
    role: "Our role in the demo",
    roleValue: "Experience and interface design, and interaction development",
  },
  demoTitle: (projectName) => `${projectName} / Try the demo`,
  demoNote: ["Local sample data", "Resets when you reload the page"],
  story: {
    challengeLabel: "The challenge",
    challengeTitle: "Why this demo?",
    solutionLabel: "The solution idea",
    solutionTitle: "Details that make work easier.",
    includesLabel: "What we built here",
    includesTitle: "An experience you can explore.",
    productLabel: "From demo to product",
    productBody:
      "A real product requires defining business requirements, accounts and permissions, data storage, integrations and testing with real users. We define that scope before committing to implementation.",
  },
  nextLabel: "Next demo",
  nextLink: (projectName) => `${projectName} — Explore the demo ↗`,
  items: {
    crm: {
      name: "Madar",
      subtitle: ["The sales journey,", "in one view."],
      description:
        "A concept for a customer relationship management system that helps the team see opportunities, know the next step and move each opportunity along a clear pipeline.",
      category: "CRM / SALES WORKSPACE",
      scope: "Sales pipeline interface and experience",
      interaction: "Search and move opportunities between stages",
      challenge:
        "When customer follow-up moves between separate chats and spreadsheets, it is hard to know what is waiting for a reply and what has reached an agreement. We designed Madar to make each opportunity's status and next step visible to the team.",
      solution:
        "A board with three simple stages: New opportunity, Proposal sent and Agreed. Each card has a title and a next activity. Search reduces clutter, and moving a card shows the change of status immediately.",
      includes: [
        // The original Arabic point is about right-to-left reading; this version also reads left to right.
        "Designed for Arabic right-to-left reading, and available in English.",
        "Instant search across opportunities, and moving them forward or back.",
        "Live opportunity counts for each stage, and messages that confirm each action.",
      ],
      limits:
        "The demo runs on sample data within the page. There is no database, no accounts and no messages to customers. Reloading restores the original state.",
      next: "ops",
    },
    ops: {
      name: "Sayr",
      subtitle: ["From loose ends", "to clear decisions."],
      description:
        "A concept for an internal request portal that brings intake, review and decision into one experience, with a log that explains what happened.",
      category: "OPERATIONS / REQUEST WORKFLOW",
      scope: "Request interface with human review",
      interaction: "Select, approve or return for review",
      challenge:
        "A request arrives in a message, is forwarded to someone else, and it becomes unclear who is responsible and what its status is. Sayr explores a single space that holds the request details and the decision about it.",
      solution:
        "A clear list of requests, with the details in one place. The reviewer can approve a request or return it for completion, and the result appears in the status and the activity log without ambiguity.",
      includes: [
        "Three sample requests you can move between.",
        "An approval path and a return-for-completion path.",
        "Status updates and an activity log for each request.",
      ],
      limits:
        "All approval actions here are a local simulation. No real permissions are granted, no requests are sent and no external systems are changed. The demo does not include live AI.",
      next: "erp",
    },
    erp: {
      name: "Raseed",
      subtitle: ["Inventory meets", "purchasing."],
      description:
        "A concept for a small module of a business system that shows quantities and alerts, and lets you try a purchase order cycle through to receipt.",
      category: "ERP CONCEPT / INVENTORY",
      scope: "Compact inventory and purchasing module",
      interaction: "Sample purchase order and receipt",
      challenge:
        "Purchasing decisions depend on knowing what is available, what is running low and what has already been ordered. We designed Raseed to make those states easy to understand on one screen.",
      solution:
        "An inventory table with a clear reorder point. The user creates a purchase order for a set quantity, then simulates receiving it to update the stock. An open order prevents a duplicate order for the same item.",
      includes: [
        "Three items with different reorder points.",
        "Purchase quantity checks, and no duplicate open orders.",
        "A sample receipt that updates the stock and its status immediately.",
      ],
      limits:
        "This demo is one module within an ERP, not a complete ERP system. There is no accounting, no real suppliers and no payments. The data is temporary and stays within the page.",
      next: "crm",
    },
  },
  demos: {
    crm: {
      searchLabel: "Search opportunities",
      searchPlaceholder: "Search by opportunity name",
      reset: "Reset demo",
      stages: ["New opportunity", "Proposal sent", "Agreed"],
      leads: [
        { id: 1, name: "Services company website", detail: "Defining the audience and content", stage: 0 },
        { id: 2, name: "Partner portal", detail: "Meeting to understand how requests work", stage: 0 },
        { id: 3, name: "Ordering app", detail: "Reviewing the first release scope", stage: 1 },
        { id: 4, name: "Internal operations system", detail: "Preparing the kickoff workshop", stage: 2 },
      ],
      empty: "No opportunities in this stage match your search.",
      moveForward: (stage) => `Move to ${stage} →`,
      moveBack: "Move back",
      status: {
        matches: (count) => `Matching opportunities: ${count}`,
        moved: (lead, stage) => `Moved “${lead}” to “${stage}”. This is a local sample action.`,
        reset: "The demo is back to its original state.",
      },
    },
    ops: {
      reset: "Reset demo",
      listTitle: "Requests",
      requests: [
        {
          id: 14,
          title: "Project workspace access",
          team: "Operations",
          description: "Add a new member to the project workspace after review by the person in charge.",
          state: "pending",
          log: ["Request received.", "Details complete; passed to the reviewer."],
        },
        {
          id: 15,
          title: "Supplier details review",
          team: "Procurement",
          description: "Check that a new supplier's details are complete before working with them.",
          state: "pending",
          log: ["Supplier review request created."],
        },
        {
          id: 16,
          title: "Employee account setup",
          team: "Human Resources",
          description: "Review a request to set up a new employee's account and define its access scope.",
          state: "pending",
          log: ["Account setup request received."],
        },
      ],
      states: {
        pending: "Awaiting review",
        approved: "Approved (demo)",
        returned: "Returned for completion",
      },
      actions: {
        approve: { label: "Approve (demo) ✓", log: "Local demo approval; no permissions or external actions were carried out." },
        return: { label: "Return for completion", log: "The request was returned for completion in this simulation." },
        reopen: { label: "Reopen request", log: "The request was reopened for review." },
      },
      resetLog: "Request received for review.",
      teamLabel: "Team",
      policyLabel: "Action policy",
      policy: "Human review required",
      requestSummary: (id, state) => `#${id} · ${state}`,
      status: {
        selected: (id) => `Showing details for request ${id}`,
        changed: (state, id) => `${state} — request ${id}`,
        reset: "All requests are back to awaiting review.",
      },
    },
    erp: {
      prompt: "Create a purchase order, then try receiving it to update the stock.",
      reset: "Reset demo",
      columns: ["Item", "Available", "Reorder point", "Status", "Purchase quantity", "Action"],
      stock: [
        { id: 1, name: "Laptop", qty: 24, limit: 5 },
        { id: 2, name: "Work monitor", qty: 8, limit: 4 },
        { id: 3, name: "Docking station", qty: 3, limit: 5 },
      ],
      stockState: { low: "Reorder", available: "In stock" },
      quantityLabel: (item) => `Purchase quantity for ${item}`,
      buy: "Create order",
      pending: "Order open",
      ordersTitle: "Sample purchase orders",
      received: "Received",
      receive: "Receive (demo)",
      empty: "No purchase orders yet. Start with an item in the table.",
      orderSummary: (number, item, qty) => `#${number} · ${item} · ${qty} ${qty === 1 ? "unit" : "units"}`,
      status: {
        invalidQuantity: "Enter a whole number from 1 to 1,000. No order was created.",
        ordered: "Sample purchase order created. The stock doesn't change until the order is received.",
        received: (qty, item, total) =>
          `Simulated receipt of ${qty} ${qty === 1 ? "unit" : "units"} of ${item}. Current stock: ${total}.`,
        reset: "The stock and orders are back to their original state.",
      },
    },
  },
};

export default projects;
