# Page architecture

Status: approved with the design system, 28 October 2026. This file lists every page, the layouts they share, the page archetypes and each page's constraints. The rules the pages follow are in [`design-system.md`](design-system.md); the redesign procedure is in [`page-redesign-workflow.md`](page-redesign-workflow.md).

---

## 1. Route inventory

Routes come from the registry in `src/i18n/routes.ts`. Every page exists in Arabic at the root URL and in English under `/en`. Both locales render the same component; only the copy (`src/content/{ar,en}`) and the direction differ, so **a visual change to a page lands in both languages at once.**

| Route key | Arabic URL | English URL | Component | Archetype | Indexed | Redesign status |
| --- | --- | --- | --- | --- | --- | --- |
| `home` | `/` | `/en` | `HomePage` | A. Landing | yes | Redesigned: hero (step 4), the other sections 28 October |
| `services` | `/services` | `/en/services` | `ServicesPage` | B. Index | yes | Redesigned 28 October |
| `work` | `/work` | `/en/work` | `WorkPage` (+ `WorkLab`) | B. Index | yes | Redesigned 28 October |
| `solution-platforms`, `-apps`, `-business`, `-integration`, `-automation`, `-support` | `/solution-<slug>` | `/en/solution-<slug>` | `SolutionPage` (one component, six slugs) | C. Detail | yes | Redesigned 28 October |
| `process` | `/process` | `/en/process` | `ProcessPage` | D. Sequence | yes | Redesigned 28 October |
| `about` | `/about` | `/en/about` | `AboutPage` | D. Narrative | yes | Redesigned 28 October |
| `contact` | `/contact` | `/en/contact` | `ContactPage` (+ `BriefDialog`) | E. Conversion | yes | Redesigned 28 October |
| `project` | `/project?project=crm\|ops\|erp` | `/en/project?…` | `ProjectPage` → `ProjectView` + `CrmDemo`, `OpsDemo`, `ErpDemo` | F. Interactive demo | no (`noindex,nofollow`) | Redesigned 28 October (node treatment) |
| `privacy` | `/privacy` | `/en/privacy` | `PrivacyPage` | G. Long-form text | yes | Redesigned 28 October |
| `presentation` | `/presentation` | `/en/presentation` | `PresentationPage` | I. Unlisted | no (`noindex,follow`), not linked | Redesigned 28 October |
| — | any unknown URL (`404.html`) | Arabic 404 for every locale | `global-not-found.tsx` → `NotFoundPage` | H. Utility | no | Redesigned 28 October |

"Foundation" means the global step 3 pass: tokens, type scale, flat surfaces, controls, header, footer and icons. On 28 October the shared-changes pass also reached every page: one section space before the CTA band, a full-width footer rule, the 720px phone breakpoint and unnumbered labels (design system, section 13). Every page has had its page-level redesign (28 October); design system section 13 records each.

The test suite captures 37 screens per viewport: 15 route keys × 2 locales, with `project` expanded to `crm`, `ops`, `erp` and an unknown value, plus 404 (`tests/e2e/support/routes.ts`).

---

## 2. Shared layouts

| Layer | Source | Provides |
| --- | --- | --- |
| Root layout, Arabic | `src/app/(ar)/layout.tsx` | `RootDocument locale="ar"`: `lang="ar" dir="rtl"` |
| Root layout, English | `src/app/en/layout.tsx` | `RootDocument locale="en"`: `lang="en" dir="ltr"` |
| 404 document | `src/app/global-not-found.tsx` | Its own `RootDocument` (Arabic) |
| Document | `RootDocument` | Fonts, `tokens.css`, `site.css`, the motion gate, favicon, `theme-color` |
| Page frame | `PageShell` | Skip link, `SiteHeader`, `<main>`, `SiteFooter`, optional content after the footer |
| Closing band | `EnterpriseCta` | The tint CTA band at the end of inner pages |
| Page header | `PageIntro` | Eyebrow, h1, lead; an optional `aside` figure on the end side (solution pages) |
| Route files | `src/app/(ar)/**/page.tsx`, `src/app/en/**/page.tsx` | Metadata, and the page component with its locale. They contain no layout. |

There is no sidebar, no nested layout per section and no client-side page transition.

---

## 3. Pages

Regions are listed from top to bottom inside `<main>`. Every page also has the header and the footer.

### Home (`HomePage`)
- **Purpose:** state the positioning ("Systems, not just sites."), show the connected-systems idea, route to demos, services and contact.
- **Regions:**
  1. Hero plate: eyebrow with dot, two-line h1, intro, actions, caption.
  2. Map band: `SystemsMap` on the drafting grid.
  3. `#solutions`: section header, the five services open as ruled rows with their tags, and a secondary button to Services.
  4. `#work`: `WorkLab` on the tint band: section header, filter, and three system rows, each with a window onto its real demo.
  5. `#approach`: section header and a four-step process strip.
  6. `#about`: the dark band with lead, body and value chips.
  7. `#start`: closing CTA with a note, and the open node on the end side (hidden on phones).
  8. The brief dialog after the footer, with no trigger on this page.
- **Shared elements:** eyebrows, `MutedSecondLine`, buttons, `WorkLab`.
- **Constraints:**
  - The anchors `#solutions`, `#work`, `#approach`, `#about` and `#start` are link targets from English navigation (`pageOrSectionLink`) and from the demo back link (`#work`). Keep the ids.
  - The h1 is the LCP element and stays static.
  - The positioning line is mandated by the owner.
  - The section labels carry no numbers since 28 October (the Work Lab's included); the approach steps keep theirs. The services are an open list without numbers.

### Services (`ServicesPage`)
- **Purpose:** the catalogue of six solutions and how an engagement starts.
- **Regions:**
  1. `PageIntro`.
  2. A three-column grid of service cards: map locator, label, the title as the card's one link, summary, and the "Explore scope and deliverables" cue.
  3. A section with h2 and the three ways to start as ruled columns.
  4. `EnterpriseCta`.
- **Constraints:**
  - The three ways to start are alternatives, not a sequence, so they get no numbers.
  - The card data comes from `solutionCards` (`src/content/solutions.ts`). Each card's locator is chosen by its slug.

### Work (`WorkPage`)
- **Purpose:** the Work Lab as its own page.
- **Regions:** `PageIntro`; `WorkLab` without its section header (`withHeader={false}`): the sample-data disclosure, the filter group with its live count, and three system rows whose titles are `h2`; `EnterpriseCta`.
- **Constraints:**
  - `WorkLab` is shared with home `#work`, so a change shows on both.
  - The disclosure stays visible.
  - The filter offers four options for three cards.
  - Each card's window renders its demo's own component (design system 12.20), so the demo content in `src/content/*/projects.ts` is also the Work Lab's.

### Solution pages (`SolutionPage`, six slugs)
- **Purpose:** one service each: when it fits, what is built, deliverables, what is agreed first.
- **Regions:**
  1. `PageIntro` (eyebrow "FRENTEX / …", title, tagline) with the slug's map locator as its `aside`.
  2. The spec sheet: four rows, `whenItFits`, `summary`, `deliverables` as list items, and `agreeFirst`, each labelled with an `h2` from `cardTitles`.
  3. A purchase section (h2, paragraph, link to Process).
  4. `EnterpriseCta`.
- **Constraints:**
  - One component renders all six pages; a change must work for the longest and shortest copy of all six in both locales.
  - Deliverables are one string separated by «؛» or ";", split for display. A deliverable must not contain either separator, and the copy must keep using them.
  - With the locator beside it, the title column is narrower, so the longer titles (Integration, Automation) take two balanced lines at 1440.

### Process (`ProcessPage`)
- **Purpose:** the five delivery stages and their outputs, then three working practices.
- **Regions:**
  1. `PageIntro`.
  2. The process map: an ordered list of the five stages on one connector, each with its node, label ("01 / …"), h2, body, and output label and text.
  3. The three practices as ruled columns with h2 titles.
  4. `EnterpriseCta`.
- **Constraints:**
  - The stages are a real sequence, so numbering is legitimate here.
  - "See how we work" links from the solution pages land here.
  - Node states follow stage position. There are five states for five stages; a sixth stage would get the "defined" node until the drawing is extended.
  - The outputs are prose lists without separators, so they are not split into items.

### About (`AboutPage`)
- **Purpose:** who Frentex is and how it works.
- **Regions:**
  1. `PageIntro`, with the company profile download (secondary button) under the lead.
  2. The four principles as a ruled 2×2 grid with h2 titles. The "Arabic is part of the experience" principle carries the directions figure.
  3. `EnterpriseCta`.
- **Constraints:**
  - The PDF is Arabic only. English pages mark the link `hreflang="ar"`, and its copy says "(in Arabic)".
  - The figure's place is marked in the content (`figure: "directions"`), not by position.

### Contact (`ContactPage`)
- **Purpose:** convert: WhatsApp or phone first, or prepare a brief.
- **Regions:**
  1. `PageIntro`.
  2. The channels: a wider white business panel (phone number, WhatsApp button and note) and a narrower tinted brief panel (a secondary button that opens `BriefDialog`, and a note); they stack on phones.
  3. A section with h2 and the three topics as ruled columns.

  No `EnterpriseCta`: this page is the destination.
- **Constraints:**
  - The phone number is `dir="ltr"` from `src/lib/site.ts`.
  - The brief dialog works locally and sends nothing; its notes say so.
  - The contact name is omitted in English until its spelling is confirmed.

### Interactive demos (`ProjectPage` → `ProjectView`)
- **Purpose:** let a visitor try a concept product (Madar CRM, Sayr requests, Raseed inventory) with sample data, then read what it shows.
- **Regions:**
  1. Demo header: back link to `#work`, eyebrow (Latin code in a `dir="ltr"` span), three-line h1, description, sample-data badge, three case facts.
  2. Demo band (tint): demo shell with the demo's hue edge, a toolbar (title and sample-data note), the demo and a status live region; the limits note below it.
  3. Case story: two columns with unnumbered scope labels.
  4. Next-demo node in the next demo's hue.
- **Unknown or missing states:** an invalid `?project=` shows an h1 and a button back to the Work Lab; without JavaScript, `<noscript>` content.
- **Constraints:**
  - The demo is chosen in the browser from `?project=`. The default is `crm`.
  - Changing demos remounts the view and scrolls to the top.
  - The document title is set in the browser.
  - Demo data, ids, query parameters and behaviour stay unchanged. The status region is the only feedback channel.
  - Each demo's colour world is its hue (design system, section 2). The band stays the neutral tint, because `--fx-text-2` on the Madar and Sayr tints is 4.44:1 and 4.47:1, under AA.
  - Never show a Work Lab preview on a demo page (design system 12.20).

### Privacy (`PrivacyPage`)
- **Purpose:** the website privacy notice.
- **Regions:** `PageIntro`; the policy as ruled rows (each section's h2 beside its text; the hosting provider's policy link under the hosting text; the enquiries row with the phone number); `EnterpriseCta`.
- **Constraints:**
  - Legal text: readability (a text column of about 740px, plain hierarchy) matters more than visual interest.
  - The hosting link belongs to the last section, which is hosting in both languages.

### Presentation (`PresentationPage`)
- **Purpose:** an unlisted page for client meetings: reference links and a closing note.
- **Regions:** `PageIntro`; a two-column grid of link cards (the reference name is the link, opening in a new tab; note; the "Open the reference" cue); a closing section with paragraphs held to 780px and a button home. No `EnterpriseCta`.
- **Constraints:**
  - `noindex`, linked from nowhere. It must stay presentable when shown on a projector at 1440px.
  - Its copy describes the site's design. The "glass-style" sentence was removed on 28 October because the site no longer has one; check this page whenever the design changes.

### Not found (`NotFoundPage`)
- **Purpose:** recover from a wrong URL.
- **Regions:** `PageIntro` with its actions under the lead: the primary button home and a text link to Services, labelled «حلولنا» as in the navigation.
- **Constraints:** a single static `404.html` serves every locale, so it is always Arabic. It has no `route`, so no language link.

---

## 4. Page archetypes

Pages share a frame and a vocabulary, not a template. Each archetype keeps the shared parts fixed and lets its own region take the form its content needs.

| Archetype | Pages | Layout pattern | Must stay consistent | May vary |
| --- | --- | --- | --- | --- |
| **A. Landing** | Home | Headline plate → signature band → alternating sections (paper, tint, the one deep band) → closing CTA | Header, footer, section headers (`.section-top`), buttons, the one-signature rule | Section order and forms; the signature is the systems map |
| **B. Index** | Services, Work | `PageIntro` → a collection (card grid or Work Lab) → a secondary group → `EnterpriseCta` | `PageIntro`, card surface, link style, CTA band | Collection form: cards, covers, locators |
| **C. Detail** | Six solution pages | `PageIntro` (optionally with a locator) → the content's own structure → a short decision section → `EnterpriseCta` | One layout for all six; the order of content | Only data-driven differences between slugs; no per-slug layouts |
| **D. Sequence and narrative** | Process, About | `PageIntro` → the sequence or principles as a designed structure → supporting group → `EnterpriseCta` | Numbering only where order is real (Process yes, About no) | Process may use the map vocabulary (plan: process map); About stays editorial |
| **E. Conversion** | Contact | `PageIntro` → primary channel, secondary channel → supporting topics; no CTA band | Buttons, notes beside the actions, dialog | Weight given to each channel |
| **F. Interactive demo** | Demo pages | Demo header → tinted demo band with the shell → case story → next demo | Shell frame, status region, sample-data notices, demo hue | Each demo's internal layout (board, list and detail, table) |
| **G. Long-form text** | Privacy | `PageIntro` → a readable column → `EnterpriseCta` | Type scale, measure, link style | Nothing decorative |
| **H. Utility and error** | 404, unknown demo, noscript | Title, one sentence if any, one action | One action, no decoration, never apologise | — |
| **I. Unlisted** | Presentation | Like B, without CTA band | Same as B | Presentation-specific sizing if needed |

**Planned forms (plan sections C and E, not implemented; listed so archetypes are not redesigned twice):**
- ~~Services and solution pages: a map locator showing where each service sits.~~ Built on 28 October (design system 12.21).
- ~~Solution pages: situation → what we build → deliverables, with deliverables as chips.~~ Built on 28 October as the spec sheet.
- ~~Process: a vertical process map whose stages mature.~~ Built on 28 October (design system 12.11).
- ~~About: the principles as an editorial grid.~~ Built on 28 October, with the directions figure.
- Contact: WhatsApp and phone as the primary panel, built on 28 October. The open-node CTA (a change to the shared `EnterpriseCta` and home `#start`) is not built.
- ~~Work Lab and demos: covers that render the real demo components.~~ Built on 28 October as system rows (design system 12.20).

---

## 5. Constraints that apply to every page

- **Static export.** `output: "export"`: no server, no `next/image` optimisation, no middleware. Files from `public/` go through `asset()` so the `/frentex-tech` base path keeps working.
- **Two locales, one component.** Copy is typed per locale; never hard-code a string in a component. Direction comes from `<html dir>`.
- **Links come from the route registry** (`pageLink`, `pageOrSectionLink`, `demoLinks`); never hard-code a path.
- **Copy is fixed.** A redesign does not change, add or remove visible copy without owner approval. English copy is never machine-translated or invented.
- **Honesty.** Demos are labelled illustrative with sample data, and the notices stay visible.
- **Tests.** Every route has screenshot, ARIA, markup and (for representative pages) computed-style baselines. Class names are test selectors.

---

## 6. Exceptions register

A page that departs from the design system records the departure here, with the reason. Empty entries mean none have been approved.

| Page | Exception | Why the shared pattern is not enough | Approved |
| --- | --- | --- | --- |
| Home | The systems map band with its drafting grid | It is the site's signature (design system, section 1) | Implemented in step 4 |
| Home | Hero h1 size `clamp(48px, 6vw, 84px)` outside the scale | The hero is the only display line larger than a page title | Implemented in step 4 |
| Demo pages | Demo h1 sized with `min(var(--fx-size-intro), calc(6.4vw - 10px))` | Its three hand-set lines must not wrap between 720 and about 1150px | Implemented in step 3 |
| Map | Phone frame radius 18px | A drawing of a device, not a UI surface | Implemented in step 4 |

**Legacy components:** none left. The last ones, the glass solutions aside, the contact orb and the About band's circle, were retired on 28 October.

---

## 7. Inspection coverage (Phase 0)

- **Read in full:** every page component in `src/components/pages/`, the layout components, `PageIntro`, `EnterpriseCta`, `MutedSecondLine`, `BriefDialog`, `SystemsMap`, `MapFigure`, `icons.tsx`, `ProjectView`, `tokens.css`, `fonts.css`, the route registry, and `site.css` except the Work Lab mini-window rules. Those rules were inspected by script for colours, sizes and radii.
- **Partly read:** `WorkLab.tsx` (first 80 lines and class list), the three demo components (class names, roles and states), the content files (eyebrows, item counts, empty-state copy).
- **Seen as rendered:** the recorded baselines for Home and Solution (platforms) at 1440, a demo page (Madar) at 1440, English Process at 1440 and Arabic Contact at 390.
- **Not seen as rendered in this phase:** the other 32 screens per viewport. The baselines exist for all of them (`tests/e2e/__screenshots__/win32/`); each page's redesign starts by viewing its own set (workflow, step 1).

---

## 8. Copy changes from 28 October 2026

### Labels on Arabic pages that become Arabic

The owner supplies the wording; nothing changes until it arrives. Each string lives in `src/content/ar/`, and the English strings stay as they are.

| File | Key | Current text | Shown on |
| --- | --- | --- | --- |
| `services.ts` | `intro.eyebrow` | BUSINESS SOLUTIONS | Services |
| `work.ts` | `intro.eyebrow` | SOLUTION LAB | Work |
| `process.ts` | `intro.eyebrow` | HOW WE WORK | Process |
| `about.ts` | `intro.eyebrow` | ABOUT FRENTEX TECH | About |
| `contact.ts` | `intro.eyebrow` | START A CONVERSATION | Contact |
| `contact.ts` | `business.eyebrow` | BUSINESS CONTACT | Contact, first panel |
| `contact.ts` | `brief.eyebrow` | PROJECT BRIEF | Contact, second panel |
| `privacy.ts` | `intro.eyebrow` | WEBSITE PRIVACY | Privacy |
| `presentation.ts` | `intro.eyebrow` | CLIENT PRESENTATION / REFERENCES | Presentation |
| `solutions.ts` | `eyebrow(label)` | FRENTEX / {label} | The six solution pages |
| `solutions.ts` | `label` (six items) | PLATFORMS, APPS, BUSINESS, INTEGRATION, AUTOMATION, SUPPORT | Solution page labels and the Services cards |

**Product codes that stay Latin** (`dir="ltr"`):
- the Work Lab labels in `lab.ts`: CRM / SALES EXPERIENCE, WORKFLOW / INTERNAL TOOLS, BUSINESS SYSTEMS / ERP CONCEPT. They are also shown on the systems map nodes.
- the demo categories in `projects.ts`: CRM / SALES WORKSPACE, OPERATIONS / REQUEST WORKFLOW, ERP CONCEPT / INVENTORY.

The English labels of the retired hero art (`home.ts`, `hero.art` tiles) are no longer shown and need no wording.

### Number prefixes removed (both languages, 28 October)

| File | Keys | Removed |
| --- | --- | --- |
| `ar/home.ts`, `en/home.ts` | `solutions.eyebrow`, `approach.eyebrow`, `about.eyebrow` | 01, 03, 04 |
| `ar/lab.ts`, `en/lab.ts` | `eyebrow` | 02 (shown on home and `/work`) |
| `ar/projects.ts`, `en/projects.ts` | `story.challengeLabel`, `story.solutionLabel`, `story.includesLabel`, `story.productLabel` | 01–04 |

These stay numbered: the Process stage labels (`process.ts`, 01–05) and the home approach steps.
