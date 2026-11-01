import type { Locale } from "@/i18n/config";

/**
 * Copy for one section of the site in every locale that has it. Arabic is
 * required; another locale is added only once its approved copy is complete,
 * because TypeScript requires every field of the section.
 */
export type Localized<T> = { ar: T } & Partial<Record<Exclude<Locale, "ar">, T>>;

export function localize<T>(content: Localized<T>, locale: Locale): T {
  const value = (content as Partial<Record<Locale, T>>)[locale];
  if (!value) throw new Error(`No approved "${locale}" copy exists for this section.`);
  return value;
}

export function hasLocale(content: Localized<unknown>, locale: Locale): boolean {
  return Boolean((content as Partial<Record<Locale, unknown>>)[locale]);
}

/** A heading or paragraph set on two lines; the component decides the markup between them. */
export type TwoLines = [string, string];

export type PageMeta = { title: string; description: string };

export type Card = { title: string; body: string };

/** The eyebrow, heading and lead at the top of inner pages. A two-line title mutes its second line. */
export type IntroContent = { eyebrow: string; title: string | TwoLines; lead: string };
