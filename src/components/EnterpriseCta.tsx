import Link from "next/link";
import { localize } from "@/content/localized";
import { siteContent } from "@/content/site";
import { pageLink } from "@/i18n/availability";
import { ArrowText } from "@/components/visual/icons";
import type { Locale } from "@/i18n/config";

export function EnterpriseCta({ locale }: { locale: Locale }) {
  const { cta } = localize(siteContent, locale);
  const contact = pageLink(locale, "contact");

  return (
    <section className="section wrap">
      <div className="enterprise-cta">
        <h2>{cta.title}</h2>
        <p>{cta.body}</p>
        <Link className="button primary" href={contact.href} hrefLang={contact.hrefLang}>
          <ArrowText text={cta.action} />
        </Link>
      </div>
    </section>
  );
}
