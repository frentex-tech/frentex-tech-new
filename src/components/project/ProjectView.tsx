"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { localize } from "@/content/localized";
import { isProjectKey, projectsContent, type ProjectKey, type ProjectsContent } from "@/content/projects";
import type { PageLink } from "@/i18n/availability";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/routes";
import { CrmDemo } from "./CrmDemo";
import { ErpDemo } from "./ErpDemo";
import { ArrowText } from "@/components/visual/icons";
import { OpsDemo } from "./OpsDemo";

type ProjectViewProps = {
  locale: Locale;
  /** The Work Lab section of the home page, resolved on the server. */
  labLink: PageLink;
};

/** Case study and interactive demo selected by the `?project=` query parameter. */
export function ProjectView({ locale, labLink }: ProjectViewProps) {
  const content = localize(projectsContent, locale);
  const key = useSearchParams().get("project") || "crm";

  if (!isProjectKey(key)) {
    return (
      <section className="section wrap">
        <h1>{content.unknown.title}</h1>
        <Link className="button primary" href={labLink.href} hrefLang={labLink.hrefLang}>
          {content.unknown.action}
        </Link>
      </section>
    );
  }

  // Keyed so switching projects starts from a fresh demo, like the original page load.
  return <ProjectCaseStudy key={key} locale={locale} labLink={labLink} content={content} projectKey={key} />;
}

type CaseStudyProps = { locale: Locale; labLink: PageLink; content: ProjectsContent; projectKey: ProjectKey };

function ProjectCaseStudy({ locale, labLink, content, projectKey }: CaseStudyProps) {
  const project = content.items[projectKey];
  const [status, setStatus] = useState("");

  useEffect(() => {
    document.title = content.documentTitle(project.name);
  }, [content, project.name]);

  return (
    <>
      <section className="project-head wrap">
        <Link className="back-link" href={labLink.href} hrefLang={labLink.hrefLang}>
          <ArrowText text={content.backLink} />
        </Link>
        <div className="project-heading">
          <div>
            {/* The code is Latin, but the label keeps the page direction, so it sits above the title's start. */}
            <div className="eyebrow">
              <span dir="ltr">{project.category}</span>
            </div>
            <h1>
              {`${project.name} —`}
              <br />
              {project.subtitle[0]}
              <br />
              {project.subtitle[1]}
            </h1>
          </div>
          <div>
            <p>{project.description}</p>
            <span className="project-badge">{content.badge}</span>
          </div>
        </div>
        <div className="case-facts">
          <div>
            <small>{content.facts.scope}</small>
            <b>{project.scope}</b>
          </div>
          <div>
            <small>{content.facts.interaction}</small>
            <b>{project.interaction}</b>
          </div>
          <div>
            <small>{content.facts.role}</small>
            <b>{content.facts.roleValue}</b>
          </div>
        </div>
      </section>
      <section className="demo-section">
        <div className="wrap">
          <div className="demo-shell">
            <div className="demo-toolbar">
              <h2>{content.demoTitle(project.name)}</h2>
              <span>
                {content.demoNote[0]}
                <br />
                {content.demoNote[1]}
              </span>
            </div>
            <div id="demo">
              {projectKey === "crm" && <CrmDemo content={content.demos.crm} onStatus={setStatus} />}
              {projectKey === "ops" && <OpsDemo content={content.demos.ops} onStatus={setStatus} />}
              {projectKey === "erp" && <ErpDemo content={content.demos.erp} onStatus={setStatus} />}
            </div>
            <div id="demo-status" className="demo-status" role="status" aria-live="polite">
              {status}
            </div>
          </div>
          <p className="demo-notice">{project.limits}</p>
        </div>
      </section>
      <section className="section wrap">
        <div className="case-story">
          <div>
            <span className="scope-label">{content.story.challengeLabel}</span>
            <h2>{content.story.challengeTitle}</h2>
            <p>{project.challenge}</p>
            <span className="scope-label">{content.story.solutionLabel}</span>
            <h2>{content.story.solutionTitle}</h2>
            <p>{project.solution}</p>
          </div>
          <div>
            <span className="scope-label">{content.story.includesLabel}</span>
            <h2>{content.story.includesTitle}</h2>
            <ul>
              {project.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <span className="scope-label">{content.story.productLabel}</span>
            <p>{content.story.productBody}</p>
          </div>
        </div>
        <div className="next-project">
          <span className="eyebrow">{content.nextLabel}</span>
          <Link
            href={localizedPath(locale, "project", { query: { project: project.next } })}
            // Only the query string changes, so Next.js keeps the scroll position.
            // Start the next project at the top, as the original full page load did.
            onNavigate={() => window.scrollTo({ top: 0, behavior: "instant" })}
          >
            <ArrowText text={content.nextLink(content.items[project.next].name)} />
          </Link>
        </div>
      </section>
    </>
  );
}
