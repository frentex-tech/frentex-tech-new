import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageIntro } from "@/components/PageIntro";
import { localize } from "@/content/localized";
import { presentationContent } from "@/content/pages";
import type { Locale } from "@/i18n/config";
import { pageLink } from "@/i18n/availability";
import { ArrowText } from "@/components/visual/icons";
import { pageMetadata } from "@/lib/metadata";

export function presentationMetadata(locale: Locale): Metadata {
  return pageMetadata({
    locale,
    route: "presentation",
    ...localize(presentationContent, locale).meta,
    robots: "noindex,follow",
  });
}

export function PresentationPage({ locale }: { locale: Locale }) {
  const { intro, references, referenceLink, closing } = localize(presentationContent, locale);
  const home = pageLink(locale, "home");

  return (
    <PageShell locale={locale} route="presentation">
      <PageIntro intro={intro} />
      <section className="wrap detail-grid">
        {references.map((reference) => (
          <article key={reference.name} className="enterprise-card">
            <h2>{reference.name}</h2>
            <p>{reference.note}</p>
            <a className="text-link" href={reference.href} target="_blank" rel="noopener">
              <ArrowText text={referenceLink} />
            </a>
          </article>
        ))}
      </section>
      <section className="section wrap">
        <h2>{closing.title}</h2>
        {closing.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <Link className="button primary" href={home.href} hrefLang={home.hrefLang}>
          <ArrowText text={closing.action} />
        </Link>
      </section>
    </PageShell>
  );
}
