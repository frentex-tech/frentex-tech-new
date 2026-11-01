import about from "./ar/about";
import contact from "./ar/contact";
import home from "./ar/home";
import notFound from "./ar/not-found";
import presentation from "./ar/presentation";
import privacy from "./ar/privacy";
import process from "./ar/process";
import services from "./ar/services";
import work from "./ar/work";
import enAbout from "./en/about";
import enContact from "./en/contact";
import enHome from "./en/home";
import enPresentation from "./en/presentation";
import enPrivacy from "./en/privacy";
import enProcess from "./en/process";
import enServices from "./en/services";
import enWork from "./en/work";
import type { Card, IntroContent, Localized, PageMeta, TwoLines } from "./localized";

/** A tile of the decorative artwork in the home page hero. */
type ArtTile = { title: string; label: string };

export type HomeContent = {
  meta: PageMeta;
  hero: {
    eyebrow: string;
    title: TwoLines;
    /** Three lines; the break before the last one is hidden on small screens. */
    intro: [string, string, string];
    primaryAction: string;
    secondaryAction: string;
    caption: string;
    motion: { pause: string; play: string };
    scrollLabel: string;
    art: {
      label: string;
      topTile: ArtTile;
      mainTile: { label: string; title: TwoLines; chips: string[]; footer: string };
      bottomTile: ArtTile;
      note: string;
    };
  };
  capabilities: string[];
  solutions: {
    eyebrow: string;
    title: TwoLines;
    intro: string;
    aside: { title: TwoLines; body: TwoLines; label: string };
    items: { number: string; title: string; body: string; tags: string }[];
    moreLabel: string;
    action: string;
  };
  approach: {
    eyebrow: string;
    title: TwoLines;
    intro: string;
    outputLabel: string;
    steps: { number: string; title: string; body: string; output: string }[];
  };
  about: { eyebrow: string; title: TwoLines; lead: string; body: string; values: string[]; link: string };
  faq: {
    label: string;
    title: TwoLines;
    intro: string;
    link: string;
    items: { q: string; a: string }[];
  };
  start: {
    eyebrow: string;
    title: TwoLines;
    /** Two lines; the break is hidden on small screens. */
    body: TwoLines;
    action: string;
    note: string;
  };
};

export type AboutContent = {
  meta: PageMeta;
  intro: IntroContent;
  principles: Card[];
  download: string;
};

export type ContactContent = {
  meta: PageMeta;
  intro: IntroContent;
  business: { eyebrow: string; title: string; body: string; whatsapp: string; whatsappNote: string };
  brief: { eyebrow: string; title: string; body: string; action: string; note: string };
  topics: { title: string; items: Card[] };
};

export type ServicesContent = {
  meta: PageMeta;
  intro: IntroContent;
  solutionLink: string;
  engagement: { title: string; items: Card[] };
};

export type ProcessContent = {
  meta: PageMeta;
  intro: IntroContent;
  outputLabel: string;
  phases: { label: string; title: string; body: string; output: string }[];
  practices: Card[];
};

export type WorkContent = { meta: PageMeta; intro: IntroContent };

export type PrivacyContent = {
  meta: PageMeta;
  intro: IntroContent;
  sections: { title: string; body: string }[];
  hostingPolicy: { label: string; href: string };
  inquiries: { title: string; before: string; after: string };
};

export type PresentationContent = {
  meta: PageMeta;
  intro: IntroContent;
  references: { name: string; note: string; href: string }[];
  referenceLink: string;
  closing: { title: string; paragraphs: string[]; action: string };
};

export type NotFoundContent = { meta: PageMeta; intro: IntroContent; home: string };

export const homeContent: Localized<HomeContent> = { ar: home, en: enHome };
export const aboutContent: Localized<AboutContent> = { ar: about, en: enAbout };
export const contactContent: Localized<ContactContent> = { ar: contact, en: enContact };
export const servicesContent: Localized<ServicesContent> = { ar: services, en: enServices };
export const processContent: Localized<ProcessContent> = { ar: process, en: enProcess };
export const workContent: Localized<WorkContent> = { ar: work, en: enWork };
export const privacyContent: Localized<PrivacyContent> = { ar: privacy, en: enPrivacy };
export const presentationContent: Localized<PresentationContent> = { ar: presentation, en: enPresentation };
export const notFoundContent: Localized<NotFoundContent> = { ar: notFound };
