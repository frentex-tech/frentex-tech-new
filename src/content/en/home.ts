import type { HomeContent } from "../pages";

const home: HomeContent = {
  meta: {
    title: "Frentex Tech | Systems, Not Just Sites",
    description:
      "Frentex Tech designs and builds websites, apps and business systems for companies and organizations in Saudi Arabia. Explore our interactive demos and how we turn business needs into clear, connected software.",
  },
  hero: {
    eyebrow: "B2B solutions for Saudi companies and organizations.",
    title: ["Systems,", "not just sites."],
    intro: [
      // Non-breaking spaces keep "platforms, apps and systems" and "you can build on" together on narrow screens.
      "We design and build platforms, apps and systems",
      "that connect your teams, operations and data.",
      "From the first question to a handover you can build on.",
    ],
    primaryAction: "See what we build",
    secondaryAction: "Solutions for your business",
    caption: "Considered design. Connected development. Clear outcomes.",
    motion: { pause: "Pause motion", play: "Play motion" },
    scrollLabel: "Skip to solutions",
    art: {
      label: "Illustration connecting websites, apps and business systems",
      topTile: { title: "Your idea, the starting point", label: "YOUR NEXT CHAPTER" },
      mainTile: {
        label: "FRENTEX TECH / SYSTEMS",
        title: ["Every idea, a space.", "Every system, a link."],
        chips: ["Website", "App", "Business"],
        footer: "Need → working software",
      },
      bottomTile: { title: "Clarity at every stage", label: "BUILT AROUND YOUR BUSINESS" },
      note: "Illustration of a connected system",
    },
  },
  capabilities: ["Web platforms", "Mobile apps", "ERP & CRM", "Integrations & automation"],
  solutions: {
    eyebrow: "Solutions",
    title: ["The right technology", "for the stage you're in."],
    intro:
      "You may need a website that introduces your company, an app that serves your customers or a system that connects your team. We start with your needs and define what is worth building.",
    aside: {
      title: ["From the interface", "to your core operations."],
      body: ["A consistent experience for users,", "with clear logic behind it."],
      label: "DESIGN → BUILD → CONNECT",
    },
    items: [
      {
        number: "01",
        title: "Websites & digital platforms",
        body: "Company websites, online stores, customer portals and content platforms. We pair your brand with a clear path that helps visitors find what they need.",
        tags: "User experience · Interface design · Web development",
      },
      {
        number: "02",
        title: "Mobile apps",
        body: "Service and business apps for phones, from mapping the first user journey to a release people can use. We choose the development approach based on the features and target devices.",
        tags: "iOS and Android · Service apps · Business apps",
      },
      {
        number: "03",
        title: "Business systems — ERP & CRM",
        body: "Organize customers, sales, orders and inventory. We define the modules you need, then weigh customizing or integrating an existing product against building a custom system.",
        tags: "Customer management · Operations · Resources · Reporting",
      },
      {
        number: "04",
        title: "Integrations & custom systems",
        body: "Connect your tools and data sources through APIs, with clear rules for data ownership, synchronization and error handling.",
        tags: "APIs · Internal portals · Dashboards",
      },
      {
        number: "05",
        title: "Automation & AI",
        body: "We automate repetitive steps and test AI on specific tasks such as search, classification and summarization, with clear points for human review.",
        tags: "Process automation · Document processing · Focused assistants",
      },
    ],
    moreLabel: "More solutions",
    action: "All solutions and deliverables ↗",
  },
  approach: {
    eyebrow: "How we work",
    title: ["No guesswork", "about the next step."],
    intro:
      "We work in stages you can review, from the first business question to a release with a defined scope and clear ownership of its delivery.",
    outputLabel: "Stage output",
    steps: [
      {
        number: "01",
        title: "Understand",
        body: "We map the problem, the users and your current systems.",
        output: "Agreed requirements and scope",
      },
      {
        number: "02",
        title: "Design",
        body: "We turn the need into a user journey, interfaces and a delivery plan.",
        output: "A prototype ready for review",
      },
      {
        number: "03",
        title: "Build",
        body: "We develop in stages and test the scenarios that matter.",
        output: "Releases you can try",
      },
      {
        number: "04",
        title: "Launch",
        body: "We review acceptance and agree on handover, support and further development.",
        output: "A clear launch and handover plan",
      },
    ],
  },
  about: {
    eyebrow: "About Frentex",
    title: ["Close to your context.", "Precise in the details."],
    lead: "Frentex Tech is a software company in Saudi Arabia that combines experience design and software engineering around one idea: every part of your technology should work together, in service of your business.",
    body: "We care about what users see and about what happens behind the interface. We choose the solution based on your needs, and we keep implementation decisions and stage deliverables clear and open to discussion.",
    values: ["Arabic at the heart of the experience", "Right-sized solutions", "Clarity in delivery"],
    link: "More about Frentex",
  },
  faq: {
    label: "Before we start",
    title: ["Have a question?", "Here is what we usually clarify."],
    intro:
      "From choosing the solution to life after launch, we make the picture clear from the start.",
    link: "Talk to our business team",
    items: [
      {
        q: "Which solution fits my needs?",
        a: "We start from your current process, the teams involved and the outcome you need, then decide the right step. You can prepare a summary of your needs on the contact page.",
      },
      {
        q: "Do you extend an existing system or build from scratch?",
        a: "We compare customizing or integrating an existing product against building a custom system, based on the modules you need.",
      },
      {
        q: "How are cost and timeline set?",
        a: "After discovery we provide a technical and financial proposal with the scope, stages and acceptance criteria. Any out-of-scope request is assessed for its effect on time and cost before it is approved.",
      },
      {
        q: "Is there support after handover?",
        a: "We define support, maintenance and the improvement plan at handover, as agreed.",
      },
    ],
  },
  start: {
    eyebrow: "Next step",
    title: ["Your idea deserves", "a clear start."],
    body: ["Start with the challenge and the outcome you need.", "We'll define the right discovery path and scope with you."],
    action: "Discuss your needs",
    note: "Talk directly with our business lead, or prepare a summary of your needs first.",
  },
};

export default home;
