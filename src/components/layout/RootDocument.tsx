import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { localeSettings, type Locale } from "@/i18n/config";
import { asset } from "@/lib/site";
import "@/styles/fonts/fonts.css";
import "@/styles/tokens.css";
import "@/styles/site.css";
import "@/styles/solutions.css";

// Suppress React 19 false-positive dev warning for static root script tags
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
}

/**
 * Runs while the HTML is parsed, before the first paint: marks the document when
 * the visitor has no reduced-motion preference. Animations may hide content in
 * their starting state only under html[data-motion="ok"], so content stays
 * visible without JavaScript and for reduced motion (which the test suite uses).
 */
const motionGate = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.setAttribute("data-motion","ok")}}catch(e){}`;

/** Organization data published by the production site (T0.3). */
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Frentex Tech",
  url: "https://frntextech.com/",
  logo: "https://frntextech.com/assets/mark.svg",
  email: "INFO@frntextech.com",
  telephone: "+966592005751",
  address: { "@type": "PostalAddress", addressLocality: "Jeddah", addressCountry: "SA" },
  sameAs: ["https://www.linkedin.com/company/frentex-tech/", "https://github.com/frentex-tech"],
};

/** Head tags shared by every page, whatever its locale. */
export const rootMetadata: Metadata = {
  icons: { icon: { url: asset("/assets/mark.svg"), type: "image/svg+xml" } },
};

export const rootViewport: Viewport = {
  themeColor: "#edf4fa",
};

/**
 * The <html> document of each locale's root layout, with that locale's
 * language and direction.
 */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { lang, dir } = localeSettings[locale];

  return (
    // data-scroll-behavior lets route changes jump to the top like the original
    // full page loads, while in-page anchors keep the CSS smooth scrolling.
    // The motion gate adds an attribute before hydration, hence suppressHydrationWarning.
    <html lang={lang} dir={dir} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
