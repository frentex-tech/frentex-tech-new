import type { AboutContent } from "../pages";

const about: AboutContent = {
  meta: {
    title: "About Us | Frentex Tech",
    description: "Frentex Tech: software solutions for companies and organizations in Saudi Arabia.",
  },
  intro: {
    eyebrow: "ABOUT FRENTEX TECH",
    // A non-breaking space keeps "that serves" together on narrow screens.
    title: ["Technology that serves", "what you build."],
    lead: "Frentex Tech is a software company in Saudi Arabia that develops websites, apps, business systems and integrations for companies and organizations.",
  },
  principles: [
    {
      title: "Who we serve",
      body: "We focus on organizations and large companies, and we also work with growing businesses and startups that need a technology partner to develop their products.",
    },
    {
      title: "How we think",
      body: "We start with the process that needs to improve and the outcome you need to reach. Then we choose a solution that fits the context, whether that means a custom build or configuring and connecting existing tools.",
    },
    {
      title: "Arabic is part of the experience",
      body: "We pay attention to Arabic interfaces, reading direction, content consistency and user journeys, and support English according to each project's requirements.",
    },
    {
      title: "Trust in the details",
      body: "We make clear what the work includes and what needs approval, and we document implementation and handover decisions. The published demos are original concepts that explain our capabilities, not claims about client projects.",
    },
  ],
  // The company profile exists only in Arabic.
  download: "Download the company profile PDF (in Arabic) ↓",
};

export default about;
