import { briefContent } from "@/content/brief";
import { labContent, type LabCategory } from "@/content/lab";
import { hasLocale } from "@/content/localized";
import {
  aboutContent,
  contactContent,
  homeContent,
  presentationContent,
  privacyContent,
  processContent,
  servicesContent,
  workContent,
} from "@/content/pages";
import { projectsContent } from "@/content/projects";
import { siteContent } from "@/content/site";
import { solutionCardsContent, solutionsContent } from "@/content/solutions";
import { defaultLocale, localeSettings, locales, type Locale } from "./config";
import { canonicalUrl, localizedPath, routes, type PathOptions, type RouteKey } from "./routes";

const sections = {
  site: siteContent,
  home: homeContent,
  lab: labContent,
  brief: briefContent,
  about: aboutContent,
  contact: contactContent,
  services: servicesContent,
  process: processContent,
  work: workContent,
  privacy: privacyContent,
  presentation: presentationContent,
  solutions: solutionsContent,
  solutionCards: solutionCardsContent,
  projects: projectsContent,
};

type Section = keyof typeof sections;

/** The content each page renders. A page exists in a locale only when all of it has approved copy. */
const pageSections: Record<RouteKey, Section[]> = {
  home: ["site", "home", "lab", "brief"],
  services: ["site", "services", "solutionCards"],
  work: ["site", "work", "lab"],
  process: ["site", "process"],
  about: ["site", "about"],
  contact: ["site", "contact", "brief"],
  privacy: ["site", "privacy"],
  presentation: ["site", "presentation"],
  project: ["site", "projects"],
  "solution-platforms": ["site", "solutions"],
  "solution-apps": ["site", "solutions"],
  "solution-business": ["site", "solutions"],
  "solution-integration": ["site", "solutions"],
  "solution-automation": ["site", "solutions"],
  "solution-support": ["site", "solutions"],
};

export function isAvailable(locale: Locale, key: RouteKey): boolean {
  return pageSections[key].every((section) => hasLocale(sections[section], locale));
}

export function availableLocales(key: RouteKey): Locale[] {
  return locales.filter((locale) => isAvailable(locale, key));
}

/**
 * `hreflang` alternates for a page, keyed by language code and including
 * `x-default`. Undefined while the page exists in only one language.
 */
export function languageAlternates(key: RouteKey): Record<string, string> | undefined {
  const available = availableLocales(key);
  if (available.length < 2 || !routes[key].indexable) return undefined;
  return Object.fromEntries([
    ...available.map((locale) => [localeSettings[locale].lang, canonicalUrl(locale, key)!]),
    ["x-default", canonicalUrl(defaultLocale, key)!],
  ]);
}

export type PageLink = {
  href: string;
  /** Set when the page only exists in another language, so the link leads there. */
  hrefLang?: string;
};

/**
 * Link to a page from a page in `locale`. Pages without approved copy in that
 * locale are linked in the default language instead, so no link leads to a
 * page that was never exported.
 */
export function pageLink(locale: Locale, key: RouteKey, options?: PathOptions): PageLink {
  if (isAvailable(locale, key)) return { href: localizedPath(locale, key, options) };
  return { href: localizedPath(defaultLocale, key, options), hrefLang: localeSettings[defaultLocale].lang };
}

/** Home page sections that summarize a page, by the `id` of the section. */
const homeSections: Partial<Record<RouteKey, string>> = {
  services: "solutions",
  work: "work",
  process: "approach",
  about: "about",
};

/**
 * Like `pageLink`, but a page without approved copy in `locale` is replaced by
 * its summary section on that locale's home page, so navigation stays in the
 * visitor's language. Pages without a summary section fall back to `pageLink`.
 */
export function pageOrSectionLink(locale: Locale, key: RouteKey): PageLink {
  const section = homeSections[key];
  if (isAvailable(locale, key) || !section || !isAvailable(locale, "home")) return pageLink(locale, key);
  return { href: localizedPath(locale, "home", { hash: section }) };
}

/** Links to the three interactive demos shown in the Work Lab. */
export function demoLinks(locale: Locale): Record<LabCategory, PageLink> {
  const demo = (project: LabCategory) => pageLink(locale, "project", { query: { project } });
  return { crm: demo("crm"), ops: demo("ops"), erp: demo("erp") };
}

export type LanguageLink = {
  locale: Locale;
  href: string;
  /** The page is selected by its query string, which the link must carry over. */
  keepQuery: boolean;
};

/** The same page in the other language, if it has approved copy there. */
export function languageLink(current: Locale, key: RouteKey): LanguageLink | undefined {
  const target = locales.find((locale) => locale !== current && isAvailable(locale, key));
  if (!target || !isAvailable(current, key)) return undefined;
  return { locale: target, href: localizedPath(target, key), keepQuery: "query" in routes[key] };
}
