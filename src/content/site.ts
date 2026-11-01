import ar from "./ar/site";
import en from "./en/site";
import type { Localized } from "./localized";

/** Interface shared by every page: skip link, header, footer and the closing call to action. */
export type SiteContent = {
  skipToContent: string;
  header: {
    homeLabel: string;
    navLabel: string;
    nav: { home: string; services: string; work: string; process: string; about: string };
    cta: string;
    openMenu: string;
    closeMenu: string;
  };
  footer: {
    tagline: string;
    contact: string;
    privacy: string;
    country: string;
    copyright: string;
    columns: { about: string };
    whatsapp: string;
    floatingWhatsapp: string;
  };
  cta: { title: string; body: string; action: string };
};

export const siteContent: Localized<SiteContent> = { ar, en };
