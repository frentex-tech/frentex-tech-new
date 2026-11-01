import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageIntro } from "@/components/PageIntro";
import { localize } from "@/content/localized";
import { notFoundContent } from "@/content/pages";
import type { Locale } from "@/i18n/config";
import { pageLink } from "@/i18n/availability";
import { pageMetadata } from "@/lib/metadata";

export function notFoundMetadata(locale: Locale): Metadata {
  return pageMetadata({ locale, ...localize(notFoundContent, locale).meta });
}

export function NotFoundPage({ locale }: { locale: Locale }) {
  const { intro, home } = localize(notFoundContent, locale);
  const homeLink = pageLink(locale, "home");

  return (
    <PageShell locale={locale}>
      <PageIntro intro={intro} />
      <section className="wrap">
        <Link className="button primary" href={homeLink.href} hrefLang={homeLink.hrefLang}>
          {home}
        </Link>
      </section>
    </PageShell>
  );
}
