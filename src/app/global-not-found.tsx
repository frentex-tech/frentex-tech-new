import type { Metadata } from "next";
import { RootDocument, rootMetadata, rootViewport } from "@/components/layout/RootDocument";
import { NotFoundPage, notFoundMetadata } from "@/components/pages/NotFoundPage";
import { defaultLocale } from "@/i18n/config";

// Each locale has its own root layout, so unmatched URLs need a page that brings
// its own document. Static hosts serve this as 404.html for every locale.
export const metadata: Metadata = { ...rootMetadata, ...notFoundMetadata(defaultLocale) };
export const viewport = rootViewport;

export default function GlobalNotFound() {
  return (
    <RootDocument locale={defaultLocale}>
      <NotFoundPage locale={defaultLocale} />
    </RootDocument>
  );
}
