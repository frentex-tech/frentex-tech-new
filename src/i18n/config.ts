/**
 * Locales the site supports.
 *
 * Arabic is the default locale and is served from the root (`/`, `/about`, ...)
 * so every existing URL is preserved. English is served under `/en/...`, one
 * page at a time, as approved English copy is added (see src/content/en/README.md).
 */
export const locales = ["ar", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

type LocaleSettings = {
  /** Value for the document `lang` attribute. */
  lang: string;
  /** Text direction for the document `dir` attribute. */
  dir: "rtl" | "ltr";
  /** Open Graph locale, e.g. `og:locale`. */
  ogLocale: string;
  /** URL prefix for the locale's routes; empty for the default locale. */
  pathPrefix: string;
  /** The language's own name, used by the language switcher. */
  nativeName: string;
  /** Short code shown on the language control. */
  shortName: string;
};

export const localeSettings: Record<Locale, LocaleSettings> = {
  ar: { lang: "ar", dir: "rtl", ogLocale: "ar_SA", pathPrefix: "", nativeName: "العربية", shortName: "ع" },
  en: { lang: "en", dir: "ltr", ogLocale: "en_US", pathPrefix: "/en", nativeName: "English", shortName: "EN" },
};
