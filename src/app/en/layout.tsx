import type { ReactNode } from "react";
import { RootDocument, rootMetadata, rootViewport } from "@/components/layout/RootDocument";

export const metadata = rootMetadata;
export const viewport = rootViewport;

/**
 * Root layout of the English site under /en. Pages are added here only once
 * their approved English copy exists; see src/content/en/README.md.
 */
export default function EnglishLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
