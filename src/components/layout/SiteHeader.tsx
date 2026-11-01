"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/visual/icons";
import type { SiteContent } from "@/content/site";
import type { LanguageLink, PageLink } from "@/i18n/availability";
import type { headerNavRoutes, RouteKey } from "@/i18n/routes";
import { asset } from "@/lib/site";
import { LanguageSwitch } from "./LanguageSwitch";

type SiteHeaderProps = {
  content: SiteContent["header"];
  /** Resolved on the server, so pages without copy in this locale link to the default language. */
  links: {
    home: PageLink;
    nav: (PageLink & { key: (typeof headerNavRoutes)[number] })[];
    contact: PageLink;
  };
  /** The page being shown; its navigation link is marked as the current page. */
  current?: RouteKey;
  /** The current page in the other language, when it has approved copy there. */
  language?: LanguageLink;
};

export function SiteHeader({ content, links, current, language }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" href={links.home.href} hrefLang={links.home.hrefLang} aria-label={content.homeLabel}>
          <img className="brand-logo" src={asset("/assets/mark.svg")} width="64" height="64" alt="" />
          <span dir="ltr">
            Frentex<small>TECH</small>
          </span>
        </Link>
        <nav id="navigation" aria-label={content.navLabel} className={menuOpen ? "open" : undefined}>
          {links.nav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              hrefLang={item.hrefLang}
              aria-current={item.key === current ? "page" : undefined}
              onClick={closeMenu}
            >
              {content.nav[item.key]}
            </Link>
          ))}
          <Link className="mobile-contact" href={links.contact.href} hrefLang={links.contact.hrefLang} onClick={closeMenu}>
            {content.cta}
          </Link>
        </nav>
        <Link className="nav-cta" href={links.contact.href} hrefLang={links.contact.hrefLang}>
          {content.cta}
          <Icon name="forward" size={18} />
        </Link>
        <div className="view-controls">
          {language && <LanguageSwitch link={language} onNavigate={closeMenu} />}
        </div>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-label={menuOpen ? content.closeMenu : content.openMenu}
          aria-controls="navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={24} />
        </button>
      </div>
    </header>
  );
}
