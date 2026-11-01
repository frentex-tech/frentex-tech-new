import type { PresentationContent } from "../pages";

const presentation: PresentationContent = {
  meta: {
    title: "References and Design Rationale | Frentex Tech",
    description: "Frentex Tech: software solutions for companies and organizations in Saudi Arabia.",
  },
  intro: {
    eyebrow: "CLIENT PRESENTATION / REFERENCES",
    // A non-breaking space keeps "our approach" together on narrow screens.
    title: "What inspired our approach?",
    lead: "References for presenting business services and delivery. We took their principles of clarity and content structure, and developed Frentex Tech's own design and original demos.",
  },
  references: [
    { name: "Ejada", note: "A regional reference for presenting business solutions and service categories.", href: "https://www.ejada.com/en/home" },
    {
      name: "ScienceSoft",
      note: "Clarity in how delivery, stages, scope and change are managed.",
      href: "https://www.scnsoft.com/software-development/about/how-we-work",
    },
    {
      name: "Netguru",
      note: "How development services are organized, from discovery to maintenance.",
      href: "https://www.netguru.com/services/web-development",
    },
    {
      name: "thoughtbot",
      note: "Starting a product by understanding the user, the problem and the need.",
      href: "https://thoughtbot.com/playbook/strategy/customer-discovery",
    },
    { name: "Work & Co", note: "A reference for presenting work and digital products.", href: "https://www.work.co/clients/" },
    { name: "Ramotion", note: "A reference for presenting brand identity and product experiences visually.", href: "https://www.ramotion.com/work/" },
  ],
  referenceLink: "Open the reference ↗",
  closing: {
    title: "How did we apply this to Frentex Tech?",
    paragraphs: [
      "Language that speaks to the organization and the decision-maker, services with clear deliverables and boundaries, delivery stages you can review, and interactive demos that explain the solutions honestly.",
      "These references do not represent partnerships with or clients of the company. The Madar, Sayr and Raseed demos are original illustrative concepts.",
    ],
    action: "View the Frentex Tech website ↗",
  },
};

export default presentation;
