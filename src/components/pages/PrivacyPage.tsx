import { Fragment } from "react";
import type { Metadata } from "next";
import { EnterpriseCta } from "@/components/EnterpriseCta";
import { PageShell } from "@/components/layout/PageShell";
import { PageIntro } from "@/components/PageIntro";
import { localize } from "@/content/localized";
import { privacyContent } from "@/content/pages";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import { ArrowText } from "@/components/visual/icons";
import { contact } from "@/lib/site";

export function privacyMetadata(locale: Locale): Metadata {
  return pageMetadata({ locale, route: "privacy", ...localize(privacyContent, locale).meta });
}

export function PrivacyPage({ locale }: { locale: Locale }) {
  const { intro, sections, hostingPolicy, inquiries } = localize(privacyContent, locale);
  // The hosting provider's own policy belongs to the section about hosting, the last one.
  const lastSection = sections.length - 1;

  return (
    <PageShell locale={locale} route="privacy">
      <PageIntro intro={intro} />
      <section className="wrap prose enterprise-card">
        {sections.map((section, index) => (
          <Fragment key={section.title}>
            <h2>{section.title}</h2>
            <p>
              {section.body}
              {index === lastSection && (
                <>
                  {" "}
                  <a className="text-link" href={hostingPolicy.href}>
                    <ArrowText text={hostingPolicy.label} />
                  </a>
                </>
              )}
            </p>
          </Fragment>
        ))}
        <h2>{inquiries.title}</h2>
        <p>
          {inquiries.before}
          <a dir="ltr" href={contact.phoneHref}>
            {contact.phoneDisplay}
          </a>
          {inquiries.after}
        </p>
      </section>
      <EnterpriseCta locale={locale} />
    </PageShell>
  );
}
