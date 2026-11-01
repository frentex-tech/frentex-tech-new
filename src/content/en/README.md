# English copy

Arabic is complete and is served from the root URLs (`/`, `/about`, …). English pages are served under `/en/…` and are added one page at a time, only once that page's approved copy exists. Do not add machine-translated or placeholder text: a section that exists in English is treated as finished and published.

Every page is published in English: home, Services, the six solution pages, Work Lab, the three demos, How we work, About, Contact, Privacy and the (unindexed) presentation page. Every section in `src/content/` has English copy except `notFound`, because a static host serves a single Arabic `404.html`.

## Links to Arabic-only resources

English visitors are never sent to Arabic content without being told. The one Arabic-only resource linked from English pages is the company profile PDF on the About page: its label says "(in Arabic)" and the link carries `hreflang="ar"`.

The same rule covers pages: if a page loses its English copy, `pageLink()` in `src/i18n/availability.ts` links to the Arabic page and marks it `hreflang="ar"`, and `pageOrSectionLink()` sends header navigation to the matching section of the English home page (`#solutions`, `#work`, `#approach`, `#about`) instead. A link that opens Arabic content must say "(in Arabic)" in its text or accessible name; `tests/e2e/localization.spec.ts` fails while a marker and the link it labels disagree.

## How the pieces fit

| Location | Holds |
| --- | --- |
| `src/content/<section>.ts` | The TypeScript type of a section and its `Localized` record (`{ ar, en? }`) |
| `src/content/ar/<section>.ts` | Arabic copy, complete |
| `src/content/en/<section>.ts` | English copy, added per section when approved |
| `src/i18n/routes.ts` | Every page's path; links, canonical URLs and the sitemap derive from it |
| `src/i18n/availability.ts` | Which sections each page renders; a page exists in a language only when all of them do. `pageLink()` links to the English page when it exists, otherwise to the Arabic one; `pageOrSectionLink()` falls back to a home page section instead |
| `src/app/(ar)/…` and `src/app/en/…` | Route files: two lines each, rendering a page component from `src/components/pages` with a locale |

## Sections each page needs

Every page needs `site` (header, footer, closing call to action), which already exists in English.

| Page | Sections |
| --- | --- |
| Home (`/en`) | site, home, lab, brief |
| Services (`/en/services`) | site, services, solutionCards |
| Work Lab (`/en/work`) | site, work, lab |
| Process (`/en/process`) | site, process |
| About (`/en/about`) | site, about |
| Contact (`/en/contact`) | site, contact, brief |
| Privacy (`/en/privacy`) | site, privacy |
| Presentation (`/en/presentation`, not indexed) | site, presentation |
| Demos (`/en/project?project=…`, not indexed) | site, projects |
| Each solution page (`/en/solution-…`) | site, solutions (all six share it, so they are published together) |

`solutionCards` is the title, label and summary of each solution as the Services page shows them. It is separate from `solutions` so Services could be published first. The Arabic cards are taken from the Arabic `solutions`. The English `solutions` builds its items from `src/content/en/solution-cards.ts`, so each title and summary is written once, and its per-solution details are a record keyed by every slug, so TypeScript rejects a partial set.

## Adding a page in both languages

1. Get approved copy for every section the page needs, in Arabic and in English.
2. For each section, create `src/content/en/<section>.ts` with the same shape as the Arabic file (TypeScript reports any missing field), then register it in `src/content/<section>.ts`, for example `export const aboutContent: Localized<AboutContent> = { ar: about, en: enAbout };`. Arrows written inside sentences should point the English way (`↗`, `→`); arrows drawn by components flip automatically.
3. Create the route file by copying the Arabic one and changing the locale. For example, `src/app/en/about/page.tsx`:

   ```tsx
   import { AboutPage, aboutMetadata } from "@/components/pages/AboutPage";

   export const metadata = aboutMetadata("en");

   export default function Page() {
     return <AboutPage locale="en" />;
   }
   ```

   The English home page is `src/app/en/page.tsx`.
4. Run `npm run build`. The page is exported to `out/en/<path>.html` (the home page to `out/en.html`). Its language link appears on both versions of the page, and the alternate-language links and sitemap entries are added automatically.
5. Add the English URL and title to `tests/e2e/support/routes.ts` (the integrity spec fails until you do), run `npx playwright test --update-snapshots=missing` to record the new page's baselines, and review them. `tests/e2e/localization.spec.ts` checks `lang`, `dir`, the language links in both directions and the alternate-language tags.

   Publishing an English page also changes its Arabic counterpart: the header gains an "English" link (with a divider in the mobile menu), and the head gains alternate-language tags. The Arabic page's screenshot, accessibility, markup, focus and external-link baselines then fail. Check that each diff is limited to those additions before updating those baselines.

Check the English layout at 1440, 1024 and 390 px. The current layout was sized for the Arabic copy; longer English text may need adjustments to fixed heights such as the hero and the Work Lab cards.

## Static export limits

- A page can only be exported if its route file exists, and Next.js refuses a catch-all route that generates no pages, so English route files are added by hand as copy is approved.
- The English home page is exported as `en.html` and its canonical URL is `…/en.html`. Like `/about`, the extensionless `/en` only works on hosts that try `<path>.html`.
- Unknown URLs under `/en` show the Arabic 404 page, because a static host serves one `404.html`.
- There is no automatic language detection or redirect, which would need server middleware.
- On the demo page, the language link carries `?project=` over once the page's JavaScript has loaded; without JavaScript it opens the default demo.
