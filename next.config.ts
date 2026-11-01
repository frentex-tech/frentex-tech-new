import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is fully static: every route is prerendered to `out/<route>.html`,
  // so the legacy `*.html` URLs keep resolving on any static host.
  output: "export",
  // Set NEXT_PUBLIC_BASE_PATH=/frentex-tech when building for the GitHub Pages preview.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  experimental: {
    // Arabic and English have separate root layouts (for their own <html lang dir>),
    // so the 404 page for unmatched URLs comes from src/app/global-not-found.tsx.
    globalNotFound: true,
  },
};

export default nextConfig;
