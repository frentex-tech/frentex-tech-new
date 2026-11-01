"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { LanguageLink } from "@/i18n/availability";
import { localeSettings } from "@/i18n/config";

type LanguageSwitchProps = { link: LanguageLink; onNavigate: () => void };

/** Link to the current page in the other language, named in that language. */
export function LanguageSwitch({ link, onNavigate }: LanguageSwitchProps) {
  if (!link.keepQuery) return <SwitchLink link={link} href={link.href} onNavigate={onNavigate} />;
  // The query string is only known in the browser; the static HTML links to the page without it.
  return (
    <Suspense fallback={<SwitchLink link={link} href={link.href} onNavigate={onNavigate} />}>
      <SwitchLinkWithQuery link={link} onNavigate={onNavigate} />
    </Suspense>
  );
}

function SwitchLinkWithQuery({ link, onNavigate }: LanguageSwitchProps) {
  const query = useSearchParams().toString();
  return <SwitchLink link={link} href={query ? `${link.href}?${query}` : link.href} onNavigate={onNavigate} />;
}

function SwitchLink({ link, href, onNavigate }: LanguageSwitchProps & { href: string }) {
  const { lang, nativeName, shortName } = localeSettings[link.locale];
  return (
    <Link
      className="view-toggle language-toggle language-switch"
      href={href}
      hrefLang={lang}
      lang={lang}
      aria-label={nativeName}
      title={nativeName}
      onClick={onNavigate}
    >
      {shortName}
    </Link>
  );
}
