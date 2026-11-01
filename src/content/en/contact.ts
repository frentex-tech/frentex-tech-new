import type { ContactContent } from "../pages";

const contact: ContactContent = {
  meta: {
    title: "Contact | Frentex Tech",
    description: "Contact Frentex Tech to discuss your company's software needs.",
  },
  intro: {
    eyebrow: "START A CONVERSATION",
    title: ["What do you want", "to work better?"],
    lead: "Start by describing your current challenge. We'll discuss the teams affected, your existing systems and your implementation priorities with you.",
  },
  business: {
    eyebrow: "BUSINESS CONTACT",
    // The Arabic names the business lead; the name is left out until its English spelling is confirmed.
    title: "Talk to our business lead",
    body: "For inquiries, and to discuss what your company or organization needs.",
    whatsapp: "Start a WhatsApp chat ↗",
    whatsappNote: "Opens WhatsApp. You choose the message and send it yourself.",
  },
  brief: {
    eyebrow: "PROJECT BRIEF",
    title: "Prepare a summary first",
    body: "Describe the challenge, the users and the type of solution, then download the summary and share it when you get in touch.",
    action: "Summarize your needs",
    note: "The tool runs on your device. No data is sent and no meeting is booked.",
  },
  topics: {
    title: "Details that help us understand your needs.",
    items: [
      { title: "Context", body: "What your company does, the departments involved, the users and expected usage." },
      { title: "Current setup", body: "Existing systems, manual steps, integrations and data sources." },
      { title: "Release priorities", body: "What is needed first, the target date, the budget range and who approves the decision." },
    ],
  },
};

export default contact;
