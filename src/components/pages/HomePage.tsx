import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { BriefDialogProvider } from "@/components/BriefDialog";
import { HeroMotion } from "@/components/HeroMotion";
import { PageShell } from "@/components/layout/PageShell";
import { SectorTabs, type SectorTabItem } from "@/components/SectorTabs";
import { ArrowText, Icon } from "@/components/visual/icons";
import { labContent, type LabCategory } from "@/content/lab";
import { localize } from "@/content/localized";
import { aboutContent, homeContent, servicesContent } from "@/content/pages";
import { projectsContent } from "@/content/projects";
import { solutionCardsContent, solutionsContent, type SolutionSlug } from "@/content/solutions";
import { demoLinks, pageLink } from "@/i18n/availability";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import { asset } from "@/lib/site";

export function homeMetadata(locale: Locale): Metadata {
  return pageMetadata({ locale, route: "home", ...localize(homeContent, locale).meta });
}

const featureCards: { slug: SolutionSlug; variant: string }[] = [
  { slug: "platforms", variant: "web" },
  { slug: "apps", variant: "app" },
  { slug: "business", variant: "business" },
  { slug: "automation", variant: "ai" },
];

const moreCards: SolutionSlug[] = ["integration", "support"];

export function HomePage({ locale }: { locale: Locale }) {
  const { hero, capabilities, solutions, about, approach, faq, start } = localize(homeContent, locale);
  const lab = localize(labContent, locale);
  const services = localize(servicesContent, locale);
  const cards = localize(solutionCardsContent, locale);
  const solutionsPage = localize(solutionsContent, locale);
  const projects = localize(projectsContent, locale);
  const labLinks = demoLinks(locale);
  const aboutPage = localize(aboutContent, locale);
  const contactLink = pageLink(locale, "contact");
  const servicesLink = pageLink(locale, "services");
  const aboutLink = pageLink(locale, "about");
  const processLink = pageLink(locale, "process");

  const itemIndex = { platforms: 0, apps: 1, business: 2, automation: 4 } as const;
  const cardBySlug = new Map(cards.map((card) => [card.slug, card]));
  const featureItems = featureCards.flatMap(({ slug, variant }) => {
    const card = cardBySlug.get(slug);
    const item = solutions.items[itemIndex[slug as keyof typeof itemIndex]];
    if (!card || !item) return [];
    return [{ slug, variant, card, item }];
  });

  const sectors: SectorTabItem[] = (["crm", "ops", "erp"] as LabCategory[]).map((key) => ({
    key,
    tabLabel: lab.filters[key],
    small: lab[key].label,
    title: projects.items[key].subtitle,
    description: projects.items[key].description,
    includes: projects.items[key].includes,
    linkLabel: lab[key].linkLabel,
    link: labLinks[key],
    projectName: projects.items[key].name,
  }));

  return (
    <PageShell locale={locale} route="home" after={<BriefDialogProvider locale={locale} />}>
      <HeroMotion
        index={`FRENTEX / ${solutions.aside.label}`}
        scrollLabel={hero.scrollLabel}
        pauseLabel={hero.motion.pause}
        playLabel={hero.motion.play}
      >
        <div className="hero-center wrap">
          <div className="hero-kicker">
            <i></i>
            {hero.eyebrow}
          </div>
          <h1>
            {hero.title[0]}
            <br />
            <em>{hero.title[1]}</em>
          </h1>
          <p>
            {hero.intro[0]}
            <br />
            {hero.intro[1]}
            <br />
            {hero.intro[2]}
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#work">
              {hero.primaryAction} <Icon name="forward-down" size={18} />
            </a>
            <a className="hero-secondary" href="#solutions">
              {hero.secondaryAction} <Icon name="down" size={16} />
            </a>
          </div>
        </div>
      </HeroMotion>

      <div className="expertise-band">
        <div className="wrap">
          {capabilities.map((capability, index) => (
            <Fragment key={capability}>
              {index > 0 ? <b aria-hidden="true">✳</b> : null}
              <span>{capability}</span>
            </Fragment>
          ))}
        </div>
      </div>

      <section id="solutions" className="studio-services section wrap">
        <div className="center-heading">
          <span className="section-label">{solutions.eyebrow}</span>
          <h2>
            {solutions.title[0]}
            <br />
            <span>{solutions.title[1]}</span>
          </h2>
          <p>{solutions.intro}</p>
        </div>
        <div className="feature-services">
          {featureItems.map(({ slug, variant, card, item }, index) => {
            const link = pageLink(locale, `solution-${slug}`);
            return (
            <Link
              key={slug}
              className={`feature-service feature-${variant}`}
              href={link.href}
              hrefLang={link.hrefLang}
            >
              <img
                className="feature-service-image"
                src={asset(`/assets/service-${slug}.jpg`)}
                alt=""
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
              />
              <div className="feature-copy">
                <span className="service-number" dir="ltr">{`0${index + 1} / ${card.label}`}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="service-link">
                  <ArrowText text={services.solutionLink} />
                </span>
              </div>
              <span className="image-rights" aria-hidden="true">
                © Frentex Tech
              </span>
            </Link>
            );
          })}
        </div>
        <div className="more-services">
          <span>{solutions.moreLabel}</span>
          {moreCards.map((slug) => {
            const card = cardBySlug.get(slug);
            const link = pageLink(locale, `solution-${slug}`);
            if (!card) return null;
            return (
              <Link key={slug} href={link.href} hrefLang={link.hrefLang}>
                {card.title} <Icon name="forward" size={14} />
              </Link>
            );
          })}
        </div>
        <div className="center-action">
          <Link className="button outline" href={servicesLink.href} hrefLang={servicesLink.hrefLang}>
            <ArrowText text={solutions.action} />
          </Link>
        </div>
      </section>

      <section id="about" className="studio-about">
        <div className="wrap about-composition">
          <div className="about-head">
            <span className="section-label">{about.eyebrow}</span>
            <h2>
              {about.title[0]}
              <br />
              <em>{about.title[1]}</em>
            </h2>
          </div>
          <div className="about-body">
            <p>{about.lead}</p>
            <p>{about.body}</p>
            <Link className="text-link" href={aboutLink.href} hrefLang={aboutLink.hrefLang}>
              {about.link} <Icon name="forward" size={16} />
            </Link>
          </div>
          <div className="about-values">
            {about.values.map((value, index) => (
              <div key={value}>
                <b>{value}</b>
                <span>{aboutPage.principles[[2, 1, 3][index]]?.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="studio-sectors section wrap">
        <div className="split-heading">
          <div>
            <span className="section-label">{lab.eyebrow}</span>
            <h2>
              {lab.title[0]}
              <br />
              <span>{lab.title[1]}</span>
            </h2>
          </div>
          <p>{lab.intro}</p>
        </div>
        <SectorTabs locale={locale} ariaLabel={lab.eyebrow} disclosure={lab.disclosure} items={sectors} />
      </section>

      <section id="approach" className="studio-process section">
        <div className="wrap">
          <div className="split-heading">
            <div>
              <span className="section-label">{approach.eyebrow}</span>
              <h2>
                {approach.title[0]}
                <br />
                <span>{approach.title[1]}</span>
              </h2>
            </div>
            <Link className="text-link" href={processLink.href} hrefLang={processLink.hrefLang}>
              {solutionsPage.purchase.link}
            </Link>
          </div>
          <div className="journey">
            {approach.steps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <small>{step.output}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-faq section wrap">
        <div>
          <span className="section-label">{faq.label}</span>
          <h2>
            {faq.title[0]}
            <br />
            <span>{faq.title[1]}</span>
          </h2>
          <p>{faq.intro}</p>
          <Link className="text-link" href={contactLink.href} hrefLang={contactLink.hrefLang}>
            {faq.link} <Icon name="forward" size={16} />
          </Link>
        </div>
        <div className="faq-list">
          {faq.items.map((item, index) => (
            <details key={item.q} open={index === 0}>
              <summary>
                {item.q} <b>+</b>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="start" className="studio-cta">
        <div className="cta-rings" aria-hidden="true"></div>
        <div className="wrap">
          <span>{start.eyebrow}</span>
          <h2>
            {start.title[0]}
            <br />
            <em>{start.title[1]}</em>
          </h2>
          <p>{start.body.join(" ")}</p>
          <Link className="button white" href={contactLink.href} hrefLang={contactLink.hrefLang}>
            {start.action} <Icon name="forward" size={16} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
