import type { ReactNode } from "react";
import { RootDocument, rootMetadata, rootViewport } from "@/components/layout/RootDocument";

export const metadata = rootMetadata;
export const viewport = rootViewport;

/** Root layout of the Arabic site, served from the existing root URLs. */
export default function ArabicLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <RootDocument locale="ar">{children}</RootDocument>;
}
