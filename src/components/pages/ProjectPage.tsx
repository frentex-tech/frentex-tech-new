import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectView } from "@/components/project/ProjectView";
import { localize } from "@/content/localized";
import { projectsContent } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { pageLink } from "@/i18n/availability";
import { pageMetadata } from "@/lib/metadata";

export function projectMetadata(locale: Locale): Metadata {
  return {
    ...pageMetadata({ locale, route: "project", ...localize(projectsContent, locale).meta, robots: "noindex,nofollow" }),
    // Rendered below instead: a metadata <title> is re-applied after hydration and
    // would overwrite the project title that ProjectView sets in the browser.
    title: undefined,
  };
}

// The original demo page did not declare a theme colour.
export const projectViewport: Viewport = { themeColor: null };

export function ProjectPage({ locale }: { locale: Locale }) {
  const content = localize(projectsContent, locale);
  const labLink = pageLink(locale, "home", { hash: "work" });

  return (
    <PageShell locale={locale} route="project" mainId="project-root" skipLabel={content.skipLabel}>
      {/* The demo is chosen by ?project=, which is only known in the browser. */}
      <Suspense
        fallback={
          <noscript>
            <section className="section wrap">
              <h1>{content.noscript.title}</h1>
              <p>{content.noscript.body}</p>
              <Link href={labLink.href} hrefLang={labLink.hrefLang}>
                {content.noscript.link}
              </Link>
            </section>
          </noscript>
        }
      >
        <ProjectView locale={locale} labLink={labLink} />
      </Suspense>
      {/* Hoisted into <head>. Kept last so it is not the first node Next.js checks
          when deciding to scroll a newly selected project into view. */}
      <title>{content.labTitle}</title>
    </PageShell>
  );
}
