import type { SolutionSlug } from "@/content/solutions";
import { siteUrl } from "@/lib/site";
import { localeSettings, type Locale } from "./config";

type RouteDefinition = {
  /** URL path without the locale prefix. */
  path: string;
  /** Listed in the sitemap with a canonical URL. */
  indexable: boolean;
  /** Query parameters that select what the page shows; links between languages keep them. */
  query?: readonly string[];
};

/**
 * Every page of the site. Links, canonical URLs, alternate-language links and
 * the sitemap are all derived from this list; components never hard-code paths.
 */
export const routes = {
  home: { path: "/", indexable: true },
  services: { path: "/services", indexable: true },
  work: { path: "/work", indexable: true },
  process: { path: "/process", indexable: true },
  about: { path: "/about", indexable: true },
  contact: { path: "/contact", indexable: true },
  privacy: { path: "/privacy", indexable: true },
  presentation: { path: "/presentation", indexable: false },
  project: { path: "/project", indexable: false, query: ["project"] },
  "solution-platforms": { path: "/solution-platforms", indexable: true },
  "solution-apps": { path: "/solution-apps", indexable: true },
  "solution-business": { path: "/solution-business", indexable: true },
  "solution-integration": { path: "/solution-integration", indexable: true },
  "solution-automation": { path: "/solution-automation", indexable: true },
  "solution-support": { path: "/solution-support", indexable: true },
} as const satisfies Record<string, RouteDefinition>;

export type RouteKey = keyof typeof routes;

export const routeKeys = Object.keys(routes) as RouteKey[];

export function solutionRoute(slug: SolutionSlug): RouteKey {
  return `solution-${slug}`;
}

/** Pages linked from the header navigation, in display order. */
export const headerNavRoutes = ["home", "services", "work", "about", "process"] as const satisfies readonly RouteKey[];

export type PathOptions = { query?: Record<string, string>; hash?: string };

/** Link to a page in a locale: `/about`, `/en/about`, `/` or `/en`. */
export function localizedPath(locale: Locale, key: RouteKey, { query, hash }: PathOptions = {}): string {
  const prefix = localeSettings[locale].pathPrefix;
  const path = routes[key].path;
  let url = path === "/" ? prefix || "/" : `${prefix}${path}`;
  if (query) url += `?${new URLSearchParams(query)}`;
  if (hash) url += `#${hash}`;
  return url;
}

/**
 * Path of the exported HTML file. The static export writes `<route>.html`, and
 * this form resolves on every static host, so canonical URLs use it.
 */
export function exportedPath(locale: Locale, key: RouteKey): string {
  const path = localizedPath(locale, key);
  return path === "/" ? "/" : `${path}.html`;
}

/** Absolute canonical URL, or undefined for pages that are not indexed. */
export function canonicalUrl(locale: Locale, key: RouteKey): string | undefined {
  return routes[key].indexable ? `${siteUrl}${exportedPath(locale, key)}` : undefined;
}
