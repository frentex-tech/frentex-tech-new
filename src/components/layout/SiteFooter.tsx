import Link from "next/link";
import type { SiteContent } from "@/content/site";
import { solutionCardsContent } from "@/content/solutions";
import { localize } from "@/content/localized";
import { pageLink } from "@/i18n/availability";
import type { Locale } from "@/i18n/config";
import { solutionRoute } from "@/i18n/routes";
import { asset, contact } from "@/lib/site";
import { Icon } from "@/components/visual/icons";

/** Production contact details, published on the old site. */
const email = "INFO@frntextech.com";
const linkedin = "https://www.linkedin.com/company/frentex-tech/";

export function SiteFooter({ locale, site }: { locale: Locale; site: SiteContent }) {
  const content = site.footer;
  const home = pageLink(locale, "home");
  const about = pageLink(locale, "about");
  const process = pageLink(locale, "process");
  const work = pageLink(locale, "work");
  const contactPage = pageLink(locale, "contact");
  const privacy = pageLink(locale, "privacy");
  const cards = localize(solutionCardsContent, locale);
  const solutions = ["platforms", "apps", "business", "automation"] as const;

  return (
    <footer className="red-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link className="official-logo" href={home.href} hrefLang={home.hrefLang} aria-label={site.header.homeLabel}>
            <span className="official-logo-art">
              <img src={asset("/assets/mark.svg")} width="96" height="96" alt="" />
              <span className="official-logo-word" dir="ltr">
                Frentex<small>TECH</small>
              </span>
            </span>
          </Link>
          <p>{content.tagline}</p>
          <a className="footer-phone" href={contact.phoneHref} dir="ltr">
            {contact.phoneDisplay}
          </a>
          <a className="footer-email" href={`mailto:${email}`} dir="ltr">
            {email}
          </a>
        </div>
        <div>
          <h3>{content.columns.about}</h3>
          <Link href={about.href} hrefLang={about.hrefLang}>
            {site.header.nav.about}
          </Link>
          <Link href={process.href} hrefLang={process.hrefLang}>
            {site.header.nav.process}
          </Link>
          <Link href={work.href} hrefLang={work.hrefLang}>
            {site.header.nav.work}
          </Link>
          <Link href={contactPage.href} hrefLang={contactPage.hrefLang}>
            {site.header.cta}
          </Link>
        </div>
        <div>
          <h3>{site.header.nav.services}</h3>
          {solutions.map((slug) => {
            const card = cards.find((item) => item.slug === slug);
            const link = pageLink(locale, solutionRoute(slug));
            return (
              <Link key={slug} href={link.href} hrefLang={link.hrefLang}>
                {card?.title}
              </Link>
            );
          })}
        </div>
        <div>
          <h3>{site.cta.title}</h3>
          <p>{site.cta.body}</p>
          <a className="footer-contact" href={contact.whatsappHref} target="_blank" rel="noopener">
            {content.whatsapp} <Icon name="forward" size={14} />
          </a>
          <a className="footer-linkedin" href={linkedin} target="_blank" rel="noopener">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>{content.copyright}</span>
        <span>{content.tagline}</span>
        <Link href={privacy.href} hrefLang={privacy.hrefLang}>
          {content.privacy}
        </Link>
      </div>
    </footer>
  );
}
