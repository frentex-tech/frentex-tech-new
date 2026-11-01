# Regression suite

Playwright tests that protect the current appearance and behaviour of the static export in `out/`. The baselines were recorded from the migrated site after it was verified pixel-identical to the original static site on `main` (commit `300ed55`).

## What is checked

| Spec | Checks | Runs at |
| --- | --- | --- |
| `visual.spec.ts` | Full-page screenshot of every route, zero pixel tolerance | 1440, 1024, 390 |
| `structure.spec.ts` | HTTP status, title, ARIA snapshot (visible text, headings, landmarks, link targets) | 1440, 1024, 390 |
| | Markup outline (elements, classes, attributes, text) and head metadata | 1440 |
| `styles.spec.ts` | Computed styles of critical elements on representative pages; reduced-motion behaviour | 1440, 1024, 390 |
| `interactions.spec.ts` | Navigation menu, keyboard focus and Escape, brief dialog (validation, summary, download, edit, close), Work Lab filters, the three demos, demo navigation; screenshots of key states | per test |
| `integrity.spec.ts` | Every exported page (including `out/en/`) is listed in `support/routes.ts`; internal links and assets resolve; external links; legacy `.html` URLs; static files; web fonts; sitemap, canonical URLs and `robots.txt` agree | 1440 |
| `localization.spec.ts` | Arabic pages are `lang="ar" dir="rtl"`; English pages are `lang="en" dir="ltr"`; the language link appears only when the other language's page is exported and points to it (keeping `?project=`); alternate-language links match. English pages are read from the build output, so the English checks are skipped until the first English page exists | 1440 |

Every test also fails on a console error, an uncaught page error or a failed request (`support/fixtures.ts`).

## Running locally

```sh
npm install
npx playwright install chromium   # once per Playwright version
npm run build                     # the suite tests out/
npm run test:e2e
```

The suite starts `scripts/preview.mjs` on port 4329 (set `E2E_PORT` to change it). It refuses to run when `out/` is missing, older than `src/`, `public/`, `next.config.ts` or `package.json`, or built with `NEXT_PUBLIC_BASE_PATH`.

Useful variations:

```sh
npx playwright test --project=mobile-390           # one viewport
npx playwright test tests/e2e/interactions.spec.ts  # one spec
npx playwright test -g "brief dialog"               # tests whose title matches
npm run test:e2e:report                             # open the last HTML report
```

## Reviewing a failure

Run `npm run test:e2e:report`. For each screenshot failure it shows the expected image, the actual image and a diff; for text snapshots it shows a line diff. `test-results/` also keeps a trace for every failed test (`npx playwright show-trace <path>`).

A failure means one of three things:

1. **A regression.** Fix the code; do not update the baseline.
2. **An intended change** (copy, design, metadata). Update the baselines as described below and include the updated files in the same change, so reviewers see the new screenshots next to the code.
3. **Environment drift** (another operating system or Playwright version). See "Platforms".

## Updating baselines

Only after confirming every difference is intended:

```sh
npm run build
npm run test:e2e:update     # rewrites only the snapshots that changed
```

Then review the changed files under `tests/e2e/__screenshots__/` and `tests/e2e/__snapshots__/` before committing. New routes: add them to `support/routes.ts` (the integrity spec fails until you do), then run the update command to record their baselines.

## Where baselines live

- `__screenshots__/<platform>/<viewport>/<spec>/` — PNG screenshots. Font rendering differs between operating systems, so each platform has its own set.
- `__snapshots__/<spec>/<viewport>/` — ARIA snapshots, markup outlines, head metadata, computed styles and other text. These are platform-independent.

## Determinism

Screenshots are stable because the suite:

- uses Playwright's bundled Chromium, pinned by the exact `@playwright/test` version in `package.json`;
- fixes the viewport, device scale factor (1), locale (`en-US`), time zone (UTC) and colour scheme;
- emulates `prefers-reduced-motion: reduce` and disables animations during capture (the styles spec checks normal-motion values separately);
- waits for network idle and `document.fonts.ready`, and moves the pointer away so no hover state is captured;
- never retries: a nondeterministic screenshot should be investigated, not hidden.

The site has no timestamps or random content; demo data is fixed in the components.

## Platforms

The current screenshot baselines were recorded on Windows (`win32`) with Playwright 1.64.1 (Chromium 156.0.8078.4). On another operating system, screenshot tests fail with "snapshot doesn't exist" until that platform's baselines are recorded with `npx playwright test --update-snapshots=missing` from a verified build.

For CI, record and compare Linux baselines inside the matching official image, so local runs and CI use the same browser and fonts:

```sh
docker run --rm --ipc=host -v "$(pwd)":/work -w /work mcr.microsoft.com/playwright:v1.64.1-noble \
  npx playwright test --update-snapshots=missing
```

Linux baselines have not been recorded yet.

Upgrading `@playwright/test` changes the browser. Do it in a separate change: run the suite, confirm the differences are rendering-only, then update the baselines.

## Not covered

- Builds with `NEXT_PUBLIC_BASE_PATH` (the GitHub Pages preview path).
- How production hosts resolve extensionless URLs such as `/about`; the preview server always serves `about.html`.
- English or other locales, which do not exist yet.
