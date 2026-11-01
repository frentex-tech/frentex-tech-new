# Frentex Tech · Company website

Arabic B2B software solutions website for Frentex Tech, Jeddah, Saudi Arabia.

**Official website:** https://frntextech.com
**Business enquiries:** INFO@frntextech.com
**Phone / WhatsApp:** +966 59 200 5751
**LinkedIn:** https://www.linkedin.com/company/frentex-tech/

## Project

Next.js (App Router) with TypeScript, exported as a fully static site. Includes solution pages, delivery process, company information and interactive demonstration concepts.

Demonstrations use fictional local data; they are not client case studies. This repository does not provide a production backend or a database.

Requires Node.js 20.9 or later.

## Local development

```sh
npm install
npm run dev        # development server at http://localhost:3000
```

## Build and preview

```sh
npm run build      # static export to out/
npm run preview    # serves out/ at http://localhost:8765
```

`npm run build` writes one HTML file per route (`out/about.html`, `out/solution-apps.html`, ...), so the original `*.html` URLs keep working. Internal links use extensionless URLs (`/about`); the host must try `<path>.html` for them, as GitHub Pages does. For nginx: `try_files $uri $uri.html $uri/ =404;`. `npm run preview` serves the export the same way.

On Windows, `postbuild` runs `scripts/fix-export-segments.mjs` to work around a Next.js export bug that misplaces the client prefetch files. It does nothing on Linux or macOS.

To build for the GitHub Pages preview, which is served from `/frentex-tech/`:

```sh
NEXT_PUBLIC_BASE_PATH=/frentex-tech npm run build
```

In Git Bash, prefix the command with `MSYS_NO_PATHCONV=1` so the path is not rewritten. In PowerShell, set `$env:NEXT_PUBLIC_BASE_PATH = "/frentex-tech"` first.

Check desktop and mobile layouts and relevant links before submitting a change. Run `npm run lint` and `npm run typecheck` as well.

## Regression tests

```sh
npx playwright install chromium   # once
npm run build
npm run test:e2e
```

Playwright compares every page at 1440, 1024 and 390 px against recorded screenshots, and checks text, structure, key computed styles, interactions, links and browser errors. See [tests/e2e/README.md](tests/e2e/README.md) for reviewing failures and updating baselines.

## Structure

```
src/app/(ar)/            Arabic routes at the root URLs, with the Arabic root layout
src/app/en/              English root layout; English routes are added as approved copy arrives
src/app/                 Also the global 404 page and the generated sitemap
src/components/pages/    One component per page, rendered for a given locale
src/components/layout/   Root document, page shell, header, footer and language link
src/components/          Shared sections, the brief dialog, the demo components and the line icons
src/content/             Typed copy per section; Arabic in ar/, English in en/
src/i18n/                Locales, the route registry, page availability and directional arrows
src/lib/                 Site constants and the metadata helper
src/styles/              Design tokens, the site stylesheet and the IBM Plex Sans Arabic font files
public/                  Files served as-is: images, PDF, robots.txt
scripts/                 Local preview server and the export workaround
```

| Route | Legacy URL |
| --- | --- |
| `/` | `index.html` |
| `/services`, `/work`, `/process`, `/about`, `/contact`, `/privacy` | `<name>.html` |
| `/solution-platforms`, `/solution-apps`, `/solution-business`, `/solution-integration`, `/solution-automation`, `/solution-support` | `<name>.html` |
| `/project?project=crm\|ops\|erp` | `project.html?project=...` |
| `/presentation` (not indexed, not linked) | `presentation.html` |

## Localization

Arabic is the default locale and is served from the root, so existing URLs are unchanged. English is served under `/en/...`, one page at a time, once that page's approved English copy exists. Every page is published in English as well; unknown URLs under `/en` still show the Arabic 404 page, because a static host serves a single `404.html`.

Each locale has its own root layout, which sets the document `lang` and `dir` from `src/i18n/config.ts`. All copy lives in typed modules under `src/content/` (Arabic in `ar/`), and page components receive the locale explicitly. Links, canonical URLs, alternate-language links and the sitemap are derived from the route registry in `src/i18n/routes.ts`. A language link appears in the navigation only when the current page exists in the other language. If a page has no English version, English header links go to the matching section of the English home page and other links open the Arabic page labelled "(in Arabic)"; today only the Arabic company profile PDF is labelled that way. Interface styles use logical properties, so layouts mirror for left-to-right text, and the few rules that cannot be logical have `[dir="ltr"]` counterparts in `src/styles/site.css`.

See [src/content/en/README.md](src/content/en/README.md) for adding an English page and for the limits of the static export.

## Hosting

The official company domain is hosted separately. Publishing a commit to this repository does not by itself confirm a deployment to the external hosting account.

The existing GitHub Pages deployment is a separate preview: https://frentex-tech.github.io/frentex-tech/

Deploy the contents of `out/` after `npm run build`; the repository root is no longer the website.

## Development workflow

Create a branch, make a focused change, and open a pull request. The Engineering team reviews changes. Include what changed, how it was checked, and any deployment requirements.

- [Contribution guide](https://github.com/frentex-tech/.github/blob/main/CONTRIBUTING.md)
- [Private security reporting](https://github.com/frentex-tech/.github/blob/main/SECURITY.md)

Keep credentials, hosting keys and customer information out of this public repository.

## Fonts

IBM Plex Sans Arabic, bundled from `src/styles/fonts/`. Pages load the WOFF2 files; the TTF files beside them are their sources. OFL license: `public/assets/OFL.txt`.
