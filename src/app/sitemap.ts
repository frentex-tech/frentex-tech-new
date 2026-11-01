import type { MetadataRoute } from "next";
import { availableLocales, languageAlternates } from "@/i18n/availability";
import { canonicalUrl, routeKeys, routes } from "@/i18n/routes";

export const dynamic = "force-static";

/** Every indexable page in every language it exists in, with its alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return routeKeys
    .filter((key) => routes[key].indexable)
    .flatMap((key) => {
      const languages = languageAlternates(key);
      return availableLocales(key).map((locale) => ({
        url: canonicalUrl(locale, key)!,
        alternates: languages && { languages },
      }));
    });
}
