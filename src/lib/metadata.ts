import type { Metadata } from "next";
import type { PageMeta } from "@/content/localized";
import { availableLocales, languageAlternates } from "@/i18n/availability";
import { localeSettings, type Locale } from "@/i18n/config";
import { canonicalUrl, type RouteKey } from "@/i18n/routes";
import { siteName, siteUrl } from "./site";

type PageMetadataOptions = PageMeta & {
  locale: Locale;
  /** Registry key of the page; omitted for the not-found page. */
  route?: RouteKey;
  robots?: string;
};

/**
 * Head tags for a page: title, description, canonical URL, alternate-language
 * links (once the page exists in more than one language) and social tags.
 */
export function pageMetadata({ locale, route, title, description, robots }: PageMetadataOptions): Metadata {
  const canonical = route && canonicalUrl(locale, route);
  const languages = route && languageAlternates(route);
  const alternateLocales = route
    ? availableLocales(route)
        .filter((other) => other !== locale)
        .map((other) => localeSettings[other].ogLocale)
    : [];

  return {
    title,
    description,
    robots,
    alternates: canonical ? { canonical, languages } : undefined,
    openGraph: {
      type: "website",
      locale: localeSettings[locale].ogLocale,
      alternateLocale: alternateLocales.length ? alternateLocales : undefined,
      siteName,
      title,
      description,
      url: canonical,
      images: [{ url: `${siteUrl}/assets/social-cover.png`, alt: `${siteName} — ${title}` }],
    },
    twitter: { card: "summary_large_image" },
  };
}
