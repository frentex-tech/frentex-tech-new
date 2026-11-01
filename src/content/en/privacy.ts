import type { PrivacyContent } from "../pages";

// Translated from the Arabic policy, which is the original. Its statements match the site:
// the brief and the demos run in the browser, and there are no analytics, cookies or external fonts.
const privacy: PrivacyContent = {
  meta: {
    title: "Website Privacy | Frentex Tech",
    description: "How the website's forms, demos and contact options work.",
  },
  intro: {
    eyebrow: "WEBSITE PRIVACY",
    // A non-breaking space keeps "this website" together on narrow screens.
    title: "Clear information about using this website.",
    lead: "Last updated: 16 October 2026",
  },
  sections: [
    {
      title: "The project summary and demos",
      body: "The interactive demos and the project summary run in your browser. This website does not send what you enter to a company server, and does not keep it after you reload the page. The file you download stays on your device.",
    },
    {
      title: "Contact and external links",
      body: "When you open WhatsApp or make a phone call, you move to the service you chose, and its policies apply to your use of it. Share only the information needed to start the conversation, and avoid sending confidential or sensitive data in the initial summary.",
    },
    {
      title: "Hosting",
      body: "The website is hosted on GitHub Pages. The hosting provider may process technical connection information under its own policy. We do not add advertising or analytics tools to this version, and the fonts are hosted with the website.",
    },
  ],
  hostingPolicy: {
    label: "GitHub Privacy Statement ↗",
    href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
  },
  inquiries: { title: "Website inquiries", before: "For questions about the information published here: ", after: "." },
};

export default privacy;
