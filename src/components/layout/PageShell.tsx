import type { ReactNode } from "react";
import { localize } from "@/content/localized";
import { siteContent } from "@/content/site";
import { languageLink, pageLink, pageOrSectionLink } from "@/i18n/availability";
import type { Locale } from "@/i18n/config";
import { headerNavRoutes, type RouteKey } from "@/i18n/routes";
import { contact } from "@/lib/site";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type PageShellProps = {
  children: ReactNode;
  locale: Locale;
  /** Registry key of the page, used to link to it in the other language. Omitted for the not-found page. */
  route?: RouteKey;
  /** Target of the skip link. */
  mainId?: string;
  skipLabel?: string;
  /** Content rendered after the footer. */
  after?: ReactNode;
};

/** Skip link, header, main landmark and footer shared by every page. */
export function PageShell({ children, locale, route, mainId = "main", skipLabel, after }: PageShellProps) {
  const site = localize(siteContent, locale);
  const headerLinks = {
    home: pageLink(locale, "home"),
    nav: headerNavRoutes.map((key) => ({ key, ...pageOrSectionLink(locale, key) })),
    contact: pageLink(locale, "contact"),
  };

  return (
    <>
      <a className="skip" href={`#${mainId}`}>
        {skipLabel ?? site.skipToContent}
      </a>
      <SiteHeader
        content={site.header}
        links={headerLinks}
        current={route}
        language={route && languageLink(locale, route)}
      />
      <main id={mainId}>{children}</main>
      <SiteFooter locale={locale} site={site} />
      <a
        className="floating-contact"
        href={contact.whatsappHref}
        target="_blank"
        rel="noopener"
        aria-label={site.footer.floatingWhatsapp}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M21 11.5a9 9 0 01-13.3 7.9L3 21l1.4-4.8A9 9 0 1121 11.5z" />
          <path d="M8 7c0 5 4 9 9 9l1-3-3-1-1 2c-2-1-3-2-4-4l2-1-1-3z" />
        </svg>
      </a>
      {after}
    </>
  );
}
