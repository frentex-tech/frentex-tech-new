# Reference replication plan

Written 29 October 2026 for the coding model that will carry it out. **Planning only: nothing in this document has been implemented yet.**

Goal: rebuild the Frentex Next.js site so every page has the reference site's layout, section order, geometry and responsive behaviour. Frentex keeps its own logo, palette, font (IBM Plex Sans Arabic), content, routes, localization, SEO and demo behaviour.

---

## 1. Executive summary

- **What the reference is.** `D:\ado-omar\abdalla-site\hostinger-website-backup` is the client's earlier Hostinger site (Vite, static HTML). Its inner pages use **the same markup and class names as the original Frentex site** (`page-intro`, `enterprise-card`, `detail-grid`, `card-grid`, `enterprise-cta`, demo classes). On top of that it adds a dark "studio" skin and a new homepage.
- **Key consequence.** For inner pages, most of the Frentex redesign done on 27–28 October has to be undone and replaced by the reference structure. Several Frentex-only components then go unused (see §10).
- **Recommended method:**
  1. Port the reference CSS cascade into `src/styles/site.css`, with colours remapped to Frentex tokens and the font swapped.
  2. Change the React markup to use the reference's class names and element order. Each page's HTML in `dist/*.html` is the markup source.
  3. Validate by comparing screenshots at 1440, 1024 and 390.

  Porting the CSS is what makes pixel geometry achievable cheaply; redrawing it by hand would not be.
- **Owner decisions already made (29 Oct):**
  - Reuse the old site's own images (marked "© Frentex Tech") in their original slots.
  - Do **not** build the light/dark theme toggle.
- **New copy is needed** for a few strings (navigation "Home", the FAQ, footer headings, motion toggle, WhatsApp label). Drafts are in §9.3. They are marked DRAFT and need the owner's sign-off before release, but implementation does not wait for it.

---

## 2. Verified repository and Git state (29 Oct 2026)

### Target: `D:\ado-omar\live-site\frentex-tech`

- **Branch and HEAD:** `feature/nextjs-migration` at `300ed55`, the same commit as `main` and `origin/main`.
- **Deleted, unstaged:** 30 tracked files, i.e. the old static site (`*.html`, `assets/*`, `robots.txt`, `sitemap.xml`, …).
- **Modified:** `README.md`.
- **Untracked** (this is **all** of the Next.js work; it is not committed anywhere):
  - `.claude/`, `.gitignore`, `.impeccable/`, `AGENTS.md`, `docs/`
  - `eslint.config.mjs`, `next.config.ts`, `package.json`, `package-lock.json`, `playwright.config.ts`, `tsconfig.json`
  - `public/`, `scripts/`, `src/`, `tests/`
- **Other Git state:** `stash@{0}` (on `experiment/frentex-redesign`) and branches `experiment/frentex-redesign`, `main` and `origin/production-hostinger-oct25` (`a0c36e2`). Leave all of them alone.
- **The working tree already contains uncommitted work from earlier on 29 Oct**, which this plan replaces:
  - a navy "hero stage", an inset About band and a centred `#start` panel in `src/styles/site.css` and `HomePage.tsx`;
  - `.claude/launch.json`, with preview configs `frentex` (port 8765, serves `out/`) and `reference` (port 8766, serves the reference `dist/`);
  - a decision-log entry in `docs/design-system.md`;
  - 15 rewritten home baselines.
- **Last verified checks** (29 Oct, before this plan): `npm run lint` gives 0 errors and 1 old warning (`RootDocument.tsx` `<head>`). `npm run typecheck` is clean. `npx playwright test` gives 490 passed and 143 skipped.
- **Never run** `git clean`, `git reset`, `git checkout .`, `git stash`, or any branch switch. A clean or checkout would destroy the untracked Next.js work. Do not stage or commit unless the owner asks.

### Reference: `D:\ado-omar\abdalla-site\hostinger-website-backup`

- A Git repository on `main` at `16d65ca`, with a clean tree. **Read-only.**
- `dist/` is the built site the reference is judged on. `index.html` and the other root HTML files are identical source copies. `public/assets` is a subset of `dist/assets`.

### Production information missing from the target (P1, from the earlier audit)

`origin/production-hostinger-oct25` (`a0c36e2`) holds the live production details, and the target has none of them:
- the domain `https://frntextech.com` for canonical URLs, Open Graph, the sitemap and robots;
- the email `INFO@frntextech.com` and the LinkedIn link `https://www.linkedin.com/company/frentex-tech/`;
- Organization JSON-LD;
- `og:url`, `og:description` and `og:image:alt`;
- an updated `downloads/frentex-company-profile.pdf`;
- the footer location "جدة، السعودية".

The brief says to keep production SEO, so task T0.3 ports these.

---

## 3. Reference website inventory

### 3.1 Files

| Kind | Path (under `dist/`) | Notes |
| --- | --- | --- |
| Pages | `index.html`, `services.html`, `solution-{platforms,apps,business,integration,automation,support,commerce,consulting,cloud}.html`, `about.html`, `process.html`, `work.html`, `contact.html`, `privacy.html`, `presentation.html`, `project.html` (`?project=crm\|ops\|erp`), `404.html` | 20 pages |
| CSS, in cascade order (the same on every page) | `assets/site.css` → `redesign.css` → `studio.css` → `theme.css` → `mode.css` → `polish.css` | 95.5 KB minified in total. Later files override earlier ones. `theme.css` holds the final dark palette (`:root{--red;--red-light;--black;--surface;--stroke;--cream;--text;--muted}`). `mode.css` holds 128 `html[data-theme=light]` rules, which are dropped. |
| Fonts | `assets/fonts.css` (Thmanyah 400/500/700), `assets/plex-arabic-*.ttf` | **Do not port.** Use Frentex's `src/styles/fonts/fonts.css` (Plex Arabic 400/500/600/700). |
| JS | `assets/site.js` | Menu, Work Lab filters, demos and brief dialog; Frentex already has all of these in React. |
| | `assets/studio.js` | Sector tabs on home: click, arrow keys in RTL and LTR, Home/End, and `soft-enter` re-animation of the panel. |
| | `assets/motion.js` | Marks `aria-current` on the nav link and drives the motion-toggle button, which toggles `body.motion-paused`. |
| | `assets/preferences.js` | Theme, language switching via `translations.js`, and `initMotion()`, the hero canvas: 9 sine lines plus 44 drifting dots, paused while hidden, under reduced motion or when `motion-paused` is set. |
| | `assets/translations.js` | The reference's English, done client-side. **Ignore it**; Frentex has its own English. |
| Images | `assets/hero-teal.jpg` (313 KB, hero background) | |
| | `assets/service-{platforms,apps,business,automation,integration,support,commerce,consulting,cloud}.jpg` (156–239 KB each) | Home feature cards, Services tiles, solution-page `.detail-visual` |
| | `assets/frentex-logo.jpeg` | The old logo. **Do not use.** |

### 3.2 Breakpoints in the reference CSS

`max-width` 1100, 1000, 950, 850, 800, 720, 700, 390 and 360; `min-width` 1450 and 1550; plus `prefers-reduced-motion: reduce`.
- The desktop navigation collapses into the menu button at **≤950px**.
- Most mobile layout changes happen at **≤720px**.

### 3.3 Shared shell (every page)

- `a.skip`, then `header.site-header`, then `main#main` (`#project-root` on `project.html`), then `footer.red-footer`, then `a.floating-contact` (a WhatsApp circle fixed bottom-left).
- `.wrap` is 1360px wide at 1440, with the content box at x 100–1340 (1240px). Its inline padding is 35px at ≤1100 and 24px at ≤720.

### 3.4 Pages and sections

Measurements were taken with Chromium at a 1440×900 viewport and reduced motion, as `x,y width×height` in CSS px; the page is RTL, so x counts from the left edge. Heights include content and change with copy length.

| Page | Sections in order (selector → height at 1440) |
| --- | --- |
| `index.html` (6563px total) | 1 `section.studio-hero` 820 · 2 `div.expertise-band` 84 · 3 `section.studio-services.section.wrap#services` 1505 · 4 `section.studio-about` 587 · 5 `section.studio-sectors.section.wrap#sectors` 1150 · 6 `section.studio-process.section` 729 · 7 `section.studio-faq.section.wrap` 684 · 8 `section.studio-cta` 524 |
| `services.html` | 1 `section.page-intro.wrap` 576 · 2 `section.wrap.services-grid` 1578 (9 `a.service-tile`, 3 columns of 401px, rows of 523/496/523) · 3 `section.section.wrap` 511 (`h2` + `div.card-grid` of 3 `article.enterprise-card` 399×201) · 4 `section.section.wrap` 509 (`div.enterprise-cta` 1240×289) |
| `solution-*.html` (all 9 the same) | 1 `page-intro` 490 · 2 `div.wrap.detail-visual` 1240×500 (`img` cover plus a `span.image-rights` chip) · 3 `section.wrap.detail-grid` 426 (4 `enterprise-card` 608×201 in a 2×2 grid) · 4 `section.section.wrap` 385 (`h2`, `p`, `a.text-link` to process) · 5 CTA section 509 |
| `about.html` | 1 `page-intro` 611 · 2 `detail-grid` 426 (4 cards) · 3 CTA section 509 · 4 `section.wrap.section` 274 (a single `a.button.primary` PDF download, **after** the CTA) |
| `process.html` | 1 `page-intro` 576 · 2 `section.wrap.process-detail` 1574 (5 `article.enterprise-card` 1240×299, each `span.eyebrow`, `h2`, `p`, `strong` "المخرج:", `p`) · 3 `section.section.wrap` 421 (`div.card-grid` of 3 cards, no heading) · 4 CTA 509 |
| `work.html` | 1 `page-intro` 490 · 2 `section.section.work-section#work` 1362 (`div.section-top`, `div.filter-row[role=group]`, `div.work-grid` 1240×842) · 3 CTA 509 |
| `contact.html` | 1 `page-intro` 576 · 2 `detail-grid` 389 (2 cards: start side "direct contact" with WhatsApp button and note; end side "brief" with `button.secondary` and note) · 3 `section.section.wrap` 511 (`h2` plus `card-grid` of 3) · `dialog.brief-dialog`. **No CTA.** |
| `privacy.html` | 1 `page-intro` 490 · 2 `section.wrap.prose.enterprise-card` 490 (4 `h2` + `p` pairs) · 3 CTA 509 |
| `presentation.html` | 1 `page-intro` 525 · 2 `detail-grid` 662 (6 cards: `h2`, `p`, `a.text-link` "↗") · 3 `section.section.wrap` 455 (`h2`, 2 `p`, `a.button.primary`). **No CTA.** |
| `project.html?project=*` | 1 `section.project-head.wrap` 696 (`a.back-link`, `div.project-heading` with 2 columns, `div.case-facts` with 3 facts) · 2 `section.demo-section` 790 (`div.demo-shell` 1240×636, `p.demo-notice`) · 3 `section.section.wrap` 672 (`div.case-story` with 2 columns, `div.next-project`). **No CTA.** |
| `404.html` | 1 `page-intro` 490 · 2 `section.wrap` with one `a.button.primary` |

`page-intro` geometry at 1440:
- `padding-top` is 175 (it clears the fixed header), so the eyebrow sits at y 175, height 28.
- `h1` starts at y 226, aligned to the inline-start, `max-width` 950, `font-size: clamp(40px,4.5vw,62px)`. The second line is `span.muted`.
- `p` is at y 437 (two-line title) or y 352 (one-line title), `max-width` 780.
- `div.ambient-field` sits behind it: a radial glow plus a perspective grid with a drift animation, from `mode.css`.

---

## 4. Reference-to-Frentex page mapping

Frentex routes exist in both locales: Arabic `/x`, English `/en/x`. Route components are in `src/app/(ar)/*/page.tsx` and `src/app/en/*/page.tsx`. Both call one shared page component.

| Reference page | Target route | Target component | Action |
| --- | --- | --- | --- |
| `index.html` | `/`, `/en` | `src/components/pages/HomePage.tsx` (+ `WorkLab.tsx`) | Recompose into 8 sections (§5.1) |
| `services.html` | `/services` | `ServicesPage.tsx` | Recompose. **6 tiles, not 9** (see the exception below) |
| `solution-platforms/apps/business/integration/automation/support.html` | `/solution-*` (6 routes) | `SolutionPage.tsx` | Recompose |
| `solution-commerce.html`, `solution-consulting.html`, `solution-cloud.html` | — | — | **Exception: no Frentex route and no Frentex content.** Do not create routes. Leave out their Services tiles and home chips, and say so in the change summary. |
| `about.html` | `/about` | `AboutPage.tsx` | Recompose |
| `process.html` | `/process` | `ProcessPage.tsx` | Recompose |
| `work.html` | `/work` | `WorkPage.tsx` + `WorkLab.tsx` | Recompose |
| `contact.html` | `/contact` | `ContactPage.tsx` + `BriefDialog.tsx` | Recompose |
| `privacy.html` | `/privacy` | `PrivacyPage.tsx` | Recompose |
| `presentation.html` | `/presentation` (noindex) | `PresentationPage.tsx` | Recompose |
| `project.html` | `/project?project=crm\|ops\|erp` | `ProjectPage.tsx` → `project/ProjectView.tsx` + `CrmDemo`/`OpsDemo`/`ErpDemo` | Mostly a restyle: the markup already follows the original |
| `404.html` | unknown URLs | `src/app/global-not-found.tsx` → `NotFoundPage.tsx` | Recompose |
| Shell | all | `layout/PageShell.tsx`, `SiteHeader.tsx`, `LanguageSwitch.tsx`, `SiteFooter.tsx`, `EnterpriseCta.tsx`, `PageIntro.tsx` | Recompose |

**Anchors the targets must keep.** Other pages, the demos' back links and the tests rely on these:
- the home services section stays `id="solutions"` (the reference uses `#services`);
- the home sectors/Work Lab section stays `id="work"` (the reference uses `#sectors`);
- home `#approach` and `#about` stay;
- `/work` keeps `#work`.

Change only the `id`s the reference introduces and nothing links to; there are none. Keep the Frentex `id`s and use the reference classes.

---

## 5. Section-by-section specifications

Rules that apply to every section:
- **Markup:** copy the element order and class names from the reference HTML file named, inside the `<main>` element.
- **Styling:** comes from the ported CSS (§10, T1.1). Do not write new CSS for any element the ported CSS already styles.
- **Content:** comes from `src/content/{ar,en}` through `localize()`. New strings go into the typed content files, both locales, as in §9.3.

### 5.1 Home (`dist/index.html` → `HomePage.tsx`)

#### H1 Hero: `section.studio-hero`

- **Source:** `index.html` (inside `<main>`, first section). CSS in `studio.css`, `theme.css` (`.hero-sculpture` background `url('hero-teal.jpg')`, `.hero-shade` gradient), `mode.css` (`.motion-backdrop`) and `polish.css`. JS: `preferences.js` `initMotion()` and `motion.js` (motion toggle).
- **Assets:** copy `dist/assets/hero-teal.jpg` to `public/assets/hero-teal.jpg`.
- **Detailed spec:** §7.
- **Current Frentex version:** `section.hero` contains `.hero-copy.wrap` (eyebrow, h1, intro, actions, caption) and `.map-band` with `SystemsMap`.
  - Remove `.map-band` and `SystemsMap` from home.
  - Remove `hero.caption` from the render; keep the string in the content file.
- **Acceptance:** at 1440, the hero is 820px tall and starts at y 0 under the fixed header. The kicker centre is at y≈174, the h1 block spans y 220–450, the paragraph is 600px wide at y≈475, and the action row is at y 572. At 390 the hero is 760px tall. Arabic and English are both centred. The canvas does not move under reduced motion.

#### H2 Expertise band: `div.expertise-band`

- **Source:** `index.html`; CSS in `studio.css` and `theme.css`.
- **Structure:**
  - `div.expertise-band > div.wrap`, holding 4 `span`s separated by 3 `b` "✳" (decorative; mark them `aria-hidden`).
  - Height 84 at 1440, as a flex row with `justify-content: space-between`.
  - At 390 the band is 109px tall: the items wrap onto 2 rows.
- **Content:** `home.capabilities` (4 strings).
- **Current Frentex version:** this band is missing. The capabilities only appear as labels on the map.

#### H3 Services: `section.studio-services.section.wrap`, keep `id="solutions"`

- **Source:** `index.html`; CSS in `studio.css`, `theme.css` (`.feature-service-image`, the `:after` gradient, `.feature-art{display:none}`) and `polish.css`.
- **Structure:**
  1. `div.center-heading` (780px wide, centred): `span.section-label`, `h2` (2 lines, the second in a `span`), `p`.
  2. `div.feature-services`: a grid with columns `1.18fr 1fr` and a 22px gap.
     - Each card is `a.feature-service.feature-{web|app|business|ai}`. The first row is 425px tall: web 659px wide on the start side, app 559px. The second row is 356px: business 659, ai 559.
     - Each card contains `img.feature-service-image`, then `div.feature-copy` (`span.service-number`, `h3`, `p`, `span.service-link` with an arrow), then `span.image-rights`.
     - Omit the `.feature-art` blocks: they are `display:none` in the final cascade.
  3. `div.more-services`: a label `span` plus chip links.
  4. `div.center-action` with `a.button.outline`.
- **Mapping:**
  - Cards come from `home.solutions.items`: platforms → `feature-web` with `service-platforms.jpg`; apps → `feature-app` with `service-apps.jpg`; business → `feature-business` with `service-business.jpg`; automation → `feature-ai` with `service-automation.jpg`.
  - `service-number` is `` `0${n} / ${solutionCards[slug].label}` `` (for example `01 / PLATFORMS`).
  - `h3` is the item title, `p` the item body, and `service-link` uses `services.solutionLink` ("استكشف النطاق والمخرجات ↖" / "Explore scope and deliverables ↗").
  - The card `href` comes from `pageLink(locale, "solution-<slug>")`.
- **Chips:** integration and support only, labelled with `solutionCards[slug].title`. Their label text is a new string (§9.3). Commerce, consulting and cloud have no Frentex route (exception).
- **Button:** `home.solutions.action` linking to `/services`.
- **Remove:** `ul.ruled-rows` and the tags. The tags string stays in content, unused.

#### H4 About: `section.studio-about` (light band)

- **Source:** `index.html`; CSS in `studio.css` and `theme.css` (`.studio-about{background:#f1eee5}`, which maps to `--fx-paper`).
- **Structure:** `div.wrap.about-composition`, a grid with:
  - `div.about-head` (635 wide, start side): `span.section-label`, `h2` with the second line in `em`;
  - `div.about-body` (530 wide): two `p`s and an `a.text-link`;
  - `div.about-values` underneath at full width: 3 columns, each a `div` with `b` + `span`.
  - The section is 587 tall at 1440 and 841 at 390.
- **Mapping:**
  - Label: `about.eyebrow`. Title: `about.title`. Paragraphs: `about.lead` and `about.body`.
  - The link goes to `/about` with new text (§9.3).
  - Each value's `b` is one of `about.values`. Its `span` is the matching About-page principle `title` from `about.ts` principles: "العربية في قلب التجربة" → principle 3, "حلول بحجم الاحتياج" → principle 2, "وضوح في التسليم" → principle 4. Read the English titles from `en/about.ts`.
- **Remove:** `about-grid` and the dark `about-section`. Update `tests/e2e/support/capture.ts` (§13).

#### H5 Sectors → Work Lab: `section.studio-sectors.section.wrap`, keep `id="work"`

- **Source:** `index.html`; CSS in `studio.css`, `mode.css` and `polish.css`. JS: `studio.js` tab logic.
- **Structure:**
  1. `div.split-heading`: a heading `div` (`span.section-label`, `h2` with a `span` second line), plus a `p` on the end side 275px wide.
  2. `div.sector-tabs[role=tablist]`: buttons 48px high.
  3. `div.sector-panel[role=tabpanel]` (1240×601 at 1440): `div.sector-copy` (528 wide; `span.sector-small`, `h3`, `p`, `ul` of 3 `li`, `a.button.primary`) on the start side, and `div.sector-visual` (580×509; `div.workspace-mock` with `div.mock-toolbar` (`b` title + dots), the mock body, and `span.mock-note`).
- **Mapping:** this is how Frentex's Work Lab content fits the reference structure.
  - **Tabs:** 3 instead of the reference's 4. They are `crm`, `ops` and `erp`, labelled from `lab.filters.crm/ops/erp`. Document the count.
  - `split-heading`: `lab.eyebrow`, `lab.title`, `lab.intro`.
  - `sector-small`: `lab[key].label` (Latin, `dir="ltr"`).
  - `h3`: `projects.items[key].subtitle` (two lines). `p`: `projects.items[key].description`. `ul`: the first 3 of `projects.items[key].includes`.
  - Button: `lab[key].linkLabel` (keep it as the visible text or the `aria-label`, whichever the reference button text maps to), linking to `demoLinks(locale)[key]`.
  - `mock-toolbar b`: `projects.items[key].name`.
  - **Mock body:** replace the reference's fake dashboard (`mock-content`, the SVG chart) with the **real demo preview**: `<CrmDemo content={demos.crm} preview />` (and the ops/erp equivalents) inside `div.mock-content` with `inert` and `aria-hidden="true"`, exactly as `WorkLab.tsx` renders `.lab-preview` today. Fit it to the mock's height and crop the overflow.
  - `mock-note`: `lab.disclosure`.
- **Behaviour:** port `studio.js` `selectSector` as a client component, `src/components/SectorTabs.tsx`:
  - `aria-selected` and roving `tabIndex`;
  - ArrowLeft/ArrowRight follow the reading direction (RTL swaps them); Home and End;
  - re-add the `soft-enter` class on change;
  - `aria-labelledby` points at the active tab.
- **Remove from home:** `<WorkLab>`, i.e. the filters, `#filter-status` and the lab cards. `/work` still uses `WorkLab` (§5.5).

#### H6 Process: `section.studio-process.section`

- **Source:** `index.html`; CSS in `studio.css` and `polish.css`.
- **Structure:**
  - `div.wrap > div.split-heading`: the heading `div` (`span.section-label`, `h2` with a `span` second line) and an `a.text-link` on the end side.
  - `div.journey`: a grid of `repeat(5,1fr)`, gap 22, `margin-top` 55. Each `article` has a top rule and a dot (`:before`), then `span` number, `h3`, `p`, `small`.
- **Mapping:**
  - `home.approach`: eyebrow, title, the 4 steps (`number`, `title`, `body`, `output` → `small`).
  - The link goes to `/process` with the text from `solutions.link` ("تعرّف على طريقة العمل ←" / "See how we work →").
  - **Exception:** 4 steps instead of 5, so override `.journey{grid-template-columns:repeat(4,1fr)}` (desktop only; mobile already stacks).
  - `approach.intro` is not rendered; keep it in content.
- **Remove:** the `.process` 4-column block.

#### H7 FAQ: `section.studio-faq.section.wrap` (**new to Frentex**)

- **Source:** `index.html`; CSS in `studio.css`, `polish.css` and `redesign.css` (`.faq-list`).
- **Structure:**
  - Start side, 523 wide: `div` with `span.section-label`, `h2` (2 lines), `p`, `a.text-link` to `/contact`.
  - End side, 627 wide: `div.faq-list` of 4 `details`, the first `open`. Each is a `summary` (question plus `b` "+") and a `p`.
- **Content:** a new `home.faq` object, `{ label, title[2], intro, link, items: {q, a}[4] }`, in both locales. Drafts in §9.3.
- **Behaviour:** native `details`. Keep keyboard use and the `summary:focus-visible` ring.

#### H8 CTA: `section.studio-cta`

- **Source:** `index.html`; CSS in `studio.css`, `theme.css` and `mode.css` (`.cta-rings`).
- **Structure:**
  - `div.cta-rings` (aria-hidden, 750px circle);
  - `div.wrap` (centred): `span`, `h2` (2 lines, the second in `em`), `p`, `a.button.white`.
  - 524 tall at 1440, 429 at 390.
- **Mapping:**
  - `span` is `start.eyebrow`; `h2` is `start.title`; `p` is `start.body.join(" ")`.
  - The button is `start.action` linking to `/contact`.
  - `start.note` is not rendered.
- **Keep** `id="start"` on the section.
- **Remove:** `.start-section`, `.open-node` and the tinted panel CSS.

### 5.2 Services (`dist/services.html` → `ServicesPage.tsx`)

1. **Page intro:** `PageIntro` as described in §5.9. Copy: `services.intro`.
2. **`section.wrap.services-grid`:** 6 `a.service-tile`, in the reference order with the commerce, consulting and cloud tiles dropped: platforms, apps, business, integration, automation, support.
   - The grid is 3 columns at 1440, with a 401px column width and 18px gap (inherited from the CSS).
   - Each tile contains:
     - `span.tile-image-wrap` (345×205) holding `img` (`service-<slug>.jpg`) and an image-rights chip;
     - `span.service-icon` (48×48, with an inline SVG copied from `services.html`, per tile);
     - `span.service-arrow` "↗" (aria-hidden);
     - `h3` (`solutionCards.title`), `p` (`summary`) and `span.service-tags`.
   - **Tags:** Frentex `solutionCards` has no tags field, but `home.solutions.items[].tags` exists for the first 5 services. For support, add `tags` to `solutionCards` in both locales (§9.3, draft).
   - The whole tile is the link, `href=pageLink(solution-slug)`.
   - **Remove:** `MapLocator`, `.link-card` and `.link-card-cue`.
3. **`section.section.wrap`:** `h2` (`services.engagement.title`) + `div.card-grid` of 3 `article.enterprise-card` (`h3` + `p`), from `services.engagement.items`. **Remove** `.ruled-columns`.
4. **CTA:** `EnterpriseCta` as described in §5.10.

At 390 the grid is 1 column; at ≤1000, 2 columns (inherited from the CSS). Compare against the reference.

### 5.3 Solution pages (`dist/solution-*.html` → `SolutionPage.tsx`, 6 slugs)

1. **Page intro:**
   - The eyebrow is `فرينتكس / <title>` in the reference. Frentex's intro eyebrow already exists; use it.
   - `h1` is a single line (the title). `p` is the summary.
   - **Remove** the `aside` with `MapLocator`.
2. **`div.wrap.detail-visual`:** `img` (1240×500, `object-fit: cover`) of `service-<slug>.jpg`, plus `span.image-rights`.
3. **`section.wrap.detail-grid`:** 4 `article.enterprise-card` in a 2×2 grid (`h3` + `p`), filled from the 4 solution facts the spec sheet renders today.
   - Order them the way the reference does: when it fits, what we build, what you receive, what we agree first.
   - Map the Frentex fields by meaning; read `src/content/solutions.ts` for the field names.
   - Deliverables render as one `p` sentence, as in the reference. **Remove** `listItems()` and `ul.deliverables`.
   - **Remove** `.spec-sheet`.
4. **`section.section.wrap`:** `h2` + `p` + `a.text-link` linking to `/process`, from the existing decision/next-step block in `solutions.ts`, with the "how we work" link `solutions.link`.
5. **CTA.**

### 5.4 About (`dist/about.html` → `AboutPage.tsx`)

1. **Page intro**, with the h1 on 2 lines.
   - **Remove** the `PageIntro` `actions` slot here: the download moves to section 4.
2. **`detail-grid`:** 4 principles as `enterprise-card` (`h3` + `p`). **Remove** `.ruled-grid` and `DirectionsFigure`.
   - Drop the `figure: "directions"` content field from `AboutContent` and from both `about.ts` files.
3. **CTA.**
4. **`section.wrap.section`:** `a.button.primary` with `about.download` linking to `asset("/downloads/frentex-company-profile.pdf")`.
   - Keep the `hreflang="ar"` "(in Arabic)" labelling on English pages; `localization.spec.ts` checks it.

### 5.5 Work (`dist/work.html` → `WorkPage.tsx`, `WorkLab.tsx`)

1. **Page intro.**
2. **`section.section.work-section#work`:** `div.wrap` with:
   - `div.section-top` (title, intro and disclosure);
   - `div.filter-row[role=group]` with the 4 filter buttons and `#filter-status`;
   - `div.work-grid`: 2 columns, with the third card `.work-wide` spanning both, 842 tall in total at 1440.
   - **Cards:** use the reference structure `article.work-card[data-category]`:
     - `a.work-visual.<cat>-visual` holding a `div.product-window`;
     - then `div.work-info` (`span.work-label`, `h3`, `p`, `a.circle-link`).
   - **Content of `.product-window`:** the reference's hand-made mini windows were retired from Frentex content on 28 Oct. Put the existing real-demo preview inside `.product-window` instead (`<XDemo preview />`, `inert`, `aria-hidden`), keeping the window's size.
   - **Keep:** filter behaviour, `aria-pressed`, status text, `data-filter` and `data-category`. `interactions.spec.ts` checks these on `/work`.
3. **CTA.**

`WorkLab.tsx` is then used only by `/work`. Remove its `withHeader` and home-only branches.

### 5.6 Contact (`dist/contact.html` → `ContactPage.tsx`)

1. **Page intro.**
2. **`detail-grid`** with 2 cards:
   - **Direct contact card**, on the start side in RTL (608 wide):
     - `span.eyebrow`, `h2`, `p`, a `p` with the phone link;
     - `a.button.primary` to WhatsApp (`contact.whatsappHref` in `src/lib/site.ts`);
     - `p.brief-note`.
   - **Brief card** (608 wide): `span.eyebrow`, `h2`, `p`, `button.button.secondary[data-open-brief]` and `p.brief-note`.
   - **Remove** `.contact-channels` and `.contact-brief` (the tint).
   - Add the production email under the phone (T0.3).
3. **`section.section.wrap`:** `h2` + `card-grid` of 3 topic cards. **Remove** `.ruled-columns`.
   - **No CTA section** (the reference has none). Check whether `ContactPage` renders `EnterpriseCta` today, and remove it if so.
4. **Keep** `BriefDialog` exactly as it is: validation, download and focus handling. Its styling comes from the ported CSS (`.brief-dialog`).

### 5.7 Privacy (`dist/privacy.html` → `PrivacyPage.tsx`)

1. **Page intro.**
2. **`section.wrap.prose.enterprise-card`:** one card holding the policy sections as `h2` + `p` pairs. **Remove** `.ruled-rows`.
   - Keep the hosting link and the phone link inside their paragraphs.
3. **CTA.**

### 5.8 Presentation (`dist/presentation.html` → `PresentationPage.tsx`)

1. **Page intro.**
2. **`detail-grid`** of 6 `article.enterprise-card`: `h2`, `p`, and an `a.text-link` "افتح المرجع ↗" (external, `target=_blank rel=noopener`).
   - This restores the original visible link text. The current Frentex version makes the name the link (`.link-card`); revert that. Check that the content files still hold the "open the reference" label; if not, use the reference's visible text and treat it as new copy (§9.3).
3. **`section.section.wrap`:** `h2`, two `p`s and `a.button.primary` linking home. **Remove** `.measure`. **No CTA.**

### 5.9 Shared page intro (`PageIntro.tsx`)

- **Markup:** `section.page-intro.wrap`, containing `div.ambient-field` (aria-hidden, empty), `div.eyebrow`, `h1` (second line `span.muted`) and `p`.
- **Remove** the `aside` and `actions` props and the `.page-intro-split` markup. Update the callers: SolutionPage, AboutPage, NotFoundPage.
- **Animation:** `.ambient-field` animates (`ambient-drift` 16s, `grid-glide` 22s, both infinite). This **breaks** the motion rule in `docs/design-system.md` ("no loops"). The reference wins here.
  - Wrap both animations in `html[data-motion="ok"]`, so that reduced motion and the test suite get the still frame.

### 5.10 Shared CTA (`EnterpriseCta.tsx`)

- **Markup:** `section.section.wrap > div.enterprise-cta`, containing `h2`, `p` and `a.button.primary`. The panel is 1240×289 at 1440.
- **Copy:** `site.cta`.
- **Pages:** Services, solutions, About, Process, Work and Privacy. **Not** on Contact, Presentation, Project or 404.
- **Remove** the `.section.wrap + .cta-section{padding-top:0}` rule. The reference keeps a full section of padding.

### 5.11 Project / demos (`dist/project.html` → `ProjectView.tsx`, `CrmDemo`/`OpsDemo`/`ErpDemo`)

- **Markup:** this already follows the original structure:
  - `project-head`: `back-link`, `project-heading`, `case-facts`;
  - `demo-section`: `demo-shell`, `demo-status`, `demo-notice`;
  - `case-story` and `next-project`.
- **Required changes:**
  - Remove `data-hue` from `.demo-shell` and `.next-project`, and drop the hue edge.
  - Keep the eyebrow's `<span dir="ltr">`.
  - Check every demo element against the reference at 1440 and 390, using `project.html?project=crm|ops|erp` on port 8766.
- **Keep:** demo ids, behaviour, `#demo-status` and the status messages. `interactions.spec.ts` covers them in depth.

### 5.12 404 (`dist/404.html` → `NotFoundPage.tsx`)

- **Markup:** a page intro, then `section.wrap` with a single `a.button.primary` linking home.
- **Remove:** the actions slot and the Services link added on 28 Oct.

---

## 6. Navbar specification (`SiteHeader.tsx`, `LanguageSwitch.tsx`, `PageShell.tsx`)

**Source:** `<header class="site-header">` in any reference page. CSS cascade: `site.css` → `redesign.css` → `studio.css` (`.site-header{position:fixed;top:22px;inset-inline:28px;border-radius:24px;backdrop-filter:blur(22px);border:1px solid …;z-index:50}`, `.nav-shell{padding:16px 27px;gap:30px}`, `.nav-shell nav{gap:29px}`, `.nav-shell nav a{font-size:14px;padding:8px 0}` with an active 22×2px underline bar via `:after`) → `theme.css` (`.site-header{background:#0a202ccc}`) → `mode.css` (`.brand .brand-logo` 64px white tile with radius 14; `.view-controls`, `.view-toggle`) → `polish.css` (`.nav-shell{min-height:76px}`; logo 56 at ≤950, 48 at ≤720, 42 at ≤390).

### Geometry, measured

| | 1440 | 390 |
| --- | --- | --- |
| Header box | fixed; x 28–1412, top 22, 1384×98, radius 24, overlays the hero | x 14–376, top 13, 362×70 |
| Brand (start side) | `a.brand` 191×64: logo tile 64×64, then `span` with name (and `small` 115 wide) | 134×42, logo 42 |
| Nav | centred group x 633–1048, 5 links, 29px gap, each 42 high | hidden; menu panel |
| CTA (`a.nav-cta`) | 169×44 pill, x 319–488 | hidden ≤720; check the reference |
| View controls (end side) | x 56–174: theme 69×39 and language 42×39 | 76×36: two 36px circles |
| Menu button | hidden | `button.menu-toggle` 34×38 at x 31 |

### Frentex implementation

1. **Header shell.**
   - `header.site-header > div.nav-shell`: **remove the `wrap` class** from `.nav-shell`.
   - Drop the `data-raised` scroll state and its border rule unless the ported CSS uses it. The reference changes the header's background on scroll; check `studio.css` for `.site-header.scrolled` or similar and port the matching JS state if it exists.
2. **Brand.**
   - Show the Frentex lockup, not the reference logo: `a.brand` containing an `img.brand-logo` of `/assets/mark.svg` inside the 64px white tile (the image is centred, about 40px), then `span` "Frentex" with `small` "TECH".
   - Keep the current Frentex Latin wordmark and `aria-label` (`header.homeLabel`).
   - **Exception:** the reference shows the Arabic name "فرينتكس" with "FRENTEX TECH". Frentex's lockup is Latin, and the brand rules keep it. Document the different text width.
3. **Navigation**, 5 links in reference order:
   1. Home (`/` or `/en`; new label, §9.3);
   2. `nav.services` (`/services`);
   3. `nav.work` (`/work`; the reference's "حلول الأعمال" goes to `#sectors`, but Frentex keeps its Work page);
   4. `nav.about` (`/about`);
   5. `nav.process` (`/process`).
   - Change `headerNavRoutes` in `src/i18n/routes.ts` to `["home","services","work","about","process"]`. Check every other use of `headerNavRoutes` first (PageShell and footer).
   - `aria-current="page"` marking stays as it is.
4. **Mobile-only menu item:** add `a.mobile-contact` linking to `/contact`, labelled `header.cta`. It is hidden on desktop by the ported CSS.
5. **CTA:** `a.nav-cta` with `header.cta` and the arrow icon, linking to `/contact`.
6. **View controls:** `div.view-controls` holding **only** the language switch, styled as `button.view-toggle.language-toggle`.
   - `LanguageSwitch` must render `<Link className="view-toggle language-toggle language-switch" …>`.
   - Keep the `language-switch` class: `localization.spec.ts` and `interactions.spec.ts` select it.
   - Its visible text is the target language's code: "EN" on Arabic pages and "ع" or "AR" on English pages. `localeSettings[x].nativeName` currently renders "English"/"العربية"; add a short label to `localeSettings` (`shortName: "EN" | "ع"`) and keep `nativeName` as the `aria-label`.
   - **No theme toggle** (owner decision). This leaves a 69px gap compared with the reference; document it.
7. **Menu button:**
   - Keep the existing React state, `aria-expanded`, the `aria-label` swap, Escape-to-close with focus return, and `nav.open`. Tests depend on all of these.
   - The ported CSS must style the open panel. Capture the reference with the menu open at 390 and match it.
8. **Fixed header:** the header now overlaps the content. Pages offset it themselves (hero, `page-intro{padding-top:175px}`, `project-head` padding).
   - Set `html{scroll-padding-top}` to the reference value from `site.css` (110px).
   - Check `#work`/`#solutions` anchor jumps.

**Acceptance:**
- At 1440 the header box measures 28,22 1384×98 ±2px in both locales.
- English mirrors it: brand on the left, view controls on the right.
- At 390 the box is 14,13 362×70, and the menu opens, closes and handles Escape.
- No horizontal overflow at 320–1440.
- Tab order: skip link, brand, nav links, CTA, language, menu button.

---

## 7. Hero specification (`HomePage.tsx` + new `src/components/HeroMotion.tsx`)

**Source:** `index.html` `section.studio-hero`. CSS:
- `studio.css`: `.studio-hero{height:820px;min-height:720px;max-height:1000px;display:flex;align-items:center;justify-content:center;overflow:hidden}`; `.hero-center{text-align:center;padding-top:62px;padding-bottom:100px}`; `.hero-kicker{border-radius:50px;padding:7px 18px;font-size:13px}`; `.studio-hero h1{font-size:clamp(68px,6.3vw,96px);line-height:1.27;font-weight:700}`; `.hero-center>p{font-size:19px;line-height:1.8;max-width:600px}`; `.hero-actions{justify-content:center;gap:30px;margin-top:29px}`; `.hero-actions .primary{min-height:55px}`; `.hero-foot{position:absolute;bottom:29px;display:flex;justify-content:space-between}`; `.hero-orbit`.
- `theme.css`: `.hero-sculpture{background-image:url('hero-teal.jpg')}`, `.hero-shade` gradient.
- `mode.css`: `.motion-backdrop`.
- `polish.css`: `text-shadow`, `text-wrap: balance`.

### Layers, in DOM order

1. `div.hero-sculpture` (aria-hidden): the background image. It overflows the box (−58,−33, 1555×886 at 1440).
2. `div.hero-shade`: the vertical gradient overlay.
3. `canvas.motion-backdrop`: the animated lines.
4. `div.hero-orbit`: an 850px ring, top-centred at y −570.
5. `div.hero-center.wrap`, containing:
   - `div.hero-kicker` (`i` dot + eyebrow text);
   - `h1`: line 1, `<br>`, then line 2 wrapped in `em`;
   - `p`;
   - `div.hero-actions`: `a.button.primary` with arrow, and `a.hero-secondary` with "↓".
6. `span.hero-image-rights` "© Frentex Tech" (aria-hidden).
7. `div.hero-foot.wrap`, containing:
   - `span.hero-index`: "01", an `i` line, then the label;
   - `button.motion-toggle` (`aria-pressed`);
   - `a.scroll-cue` linking to `#solutions` (aria-label from §9.3).

### Measured at 1440

| Element | Box |
| --- | --- |
| Hero | 0,0 1440×820 |
| `.hero-center` | 40,92 1360×635 |
| Kicker | 612,154 217×40 (centred) |
| h1 | 100,220 1240×230 (2 lines) |
| p | 420,475 600×68 |
| Actions | y 572, height 56 |
| Rights chip | 116,722 |
| Foot | y 763, height 28: index on the start side, motion toggle on the end side, scroll cue centred at x 720 |

At 390 the hero is 760 tall, `.hero-center` is at 0,53 390×653, and the foot is at y 705.

### Content mapping (Frentex)

| Reference element | Frentex content |
| --- | --- |
| Kicker | `hero.eyebrow` |
| h1 | `hero.title[0]`, `<br>`, `<em>{hero.title[1]}</em>` |
| p | `hero.intro`, all 3 lines; keep the `<br>`s. 3 lines instead of the reference's 2 is an accepted content difference. |
| Primary button | `hero.primaryAction` linking to `#work`, with the `forward-down` icon |
| Secondary link | `hero.secondaryAction` linking to `#solutions`, with the `down` icon |
| Hero index | `"01"` + line + `` `FRENTEX / ${solutions.aside.label}` `` (Latin, `dir="ltr"`) |
| Motion toggle | new labels (§9.3) |

### Brand mapping

- The `h1` is white and the `em` is white as well (the reference's `em{color:#fff}`).
- The kicker border and fill come from the colour map (§8).
- The primary button is a teal-family pill (§8 decides the colours).
- The font is `var(--fx-font)` at weight 700, which IBM Plex Sans Arabic has.

### Canvas

Port `initMotion()` from `preferences.js` into a `"use client"` component, `HeroMotion.tsx`, that renders the `canvas` and the motion-toggle button.

- Line colours: replace `rgba(88,226,214,.18)` with `rgba(115,173,189,.18)` (`--fx-teal`), and `rgba(192,150,91,.18)` with `rgba(99,153,185,.18)` (`--fx-sky`). Dots get the same mapping at .5 alpha.
- Do not draw when `prefers-reduced-motion: reduce` matches, when `document.hidden`, or when the paused state is on.
- The motion-toggle button toggles a paused state, the matching `aria-pressed`, and the label swap. Use component state instead of `body.motion-paused`, unless the ported CSS relies on that class (`.motion-paused` stops `.hero-orbit` and `.ambient-field`); in that case set the class on `document.body`.
- Clean up on unmount: cancel the animation frame and remove the listeners.
- `Playwright` runs with reduced motion, so the canvas must stay blank and screenshots stable.

### Remove from home

- `SystemsMap`.
- `MapFigure`: its only use is in `SystemsMap`.
- `.hero-copy`, `.map-band` and the `.hero` rules.
- The `styles.spec.ts` test "the hero map finishes visible…". Replace it with "hero canvas does not animate under reduced motion and the hero is fully visible".

### Acceptance

- Matching side-by-side screenshots at 1440, 1024 and 390, measured with the outline script (§12); every listed box within ±4px. Differences caused by the font are documented.
- The header floats over the hero image.
- Arabic and English are both centred. In English, the index sits on the left and the motion toggle on the right.

---

## 8. Brand preservation rules

1. **Logo:** only `/assets/mark.svg` (header tile, footer tile, favicon). Never `frentex-logo.jpeg`.
2. **Font:** replace every `Thmanyah` and `Inter` in the ported CSS with `var(--fx-font)`. Keep `Arial` where the reference uses it for small Latin labels; Frentex `.brand small` already does.
3. **Colours.** Map every colour in the ported CSS with the table below. Keep alpha values. Never add a new hue.
   - The reference's page background is near-black (#071722). Frentex's darkest brand colour is `--fx-deep` (#173b56), so the site will be lighter. This is an accepted brand difference.

| Reference value or role | Frentex value |
| --- | --- |
| `--black` #071722, `.studio-hero`/body background, `#0d0c0c`, `#100d0d`, `#191717`, `#061720`, `#07131d`, `#071a28`, the `.expertise-band`/`.studio-process` `#0b1e2a` | `var(--fx-deep)` (#173b56) |
| `--surface` #102733, cards (`.feature-service`, `.sector-panel`, `.enterprise-card`, `.service-tile` `#102633`, `#1b1716`) | `color-mix(in srgb, var(--fx-deep) 90%, #fff)`, defined once as `--fx-deep-raised` in `tokens.css` (a tint of an existing token, not a new hue) |
| `--stroke` `#ffffff20` and other white alphas | unchanged |
| `--red` #24b8ad (accent: labels, active nav bar, dots, borders on hover) | `var(--fx-teal)` (#73adbd), 4.7:1 on deep |
| `--red-light` #83d8ce | `#99b6ce` (already used on the About band) |
| Filled accent buttons (`.button.primary`, `.nav-cta`, `background:var(--red);color:white`) | background `var(--fx-teal)`, text `var(--fx-deep)` (4.68:1). White on teal would only reach 2.3:1. |
| `.button.white` | background `#fff`, text `var(--fx-ink)` |
| `--text` #f8f6f0, headings `#faf3eb`/`#fff` | `#edf7fe` for body-level text; `#fff` for headings |
| `--muted` #b7c8ca, paragraph greys `#d4e5e2`, `#d0dddc`, `#e2cecb` | `#b3cbdc` |
| `--cream` #f1eee5 (`.studio-about` background) and its text `#15313d` | `var(--fx-paper)` and `var(--fx-ink-text)`; the `em` accent becomes `var(--fx-steel)` |
| Teal or cyan gradients (`.studio-cta` `#0b3a49→#0d7379→#209c9a`, `.enterprise-cta` `#0e4d59→#0c797c`) | `linear-gradient(120deg, var(--fx-ink), var(--fx-ink-hover))` |
| Teal tints in glows and grids (`#3bada12c`, `#6bd9ce12`, `#277a794d`, `#0d9a8840`) | `--fx-teal` at the same alpha (#73adbd + alpha) |
| Bronze or warm tints (`#b8895722`, `rgba(192,150,91,…)`, `rgba(210,166,103,…)`) | `--fx-sky` at the same alpha (#6399b9 + alpha) |
| Image overlays (`.hero-shade`, `.feature-service:after` `#0b202d…`) | the same gradient stops built on #173b56 with the original alphas |
| Light-theme values | dropped together with their rules |
| Demo hue colours (Madar, Sayr, Raseed) and status colours inside the demos | keep the Frentex `--fx-madar/sayr/raseed` tokens; demos are in scope only for layout |

For any colour not listed: if its hue is between 150° and 200°, map it to the nearest of `--fx-teal`, `--fx-sky`, `--fx-steel`, `--fx-ink-hover`, `--fx-ink` or `--fx-deep` by lightness. Neutrals (saturation under 12%) keep their lightness and alpha but sit on the Frentex palette.

4. **Copy:** Frentex content files are the only source of visible text. The reference's Gulf-dialect copy is **never** used. New strings are only the ones in §9.3.
5. **Images:** use only the 7 images listed in §10 T1.4, each with the "© Frentex Tech" chip, as in the reference.

---

## 9. Localization requirements

### 9.1 Mechanics (unchanged)

- Arabic routes are in `src/app/(ar)` and English routes in `src/app/en`. Each locale has its own root layout with `<html lang dir>`.
- Copy lives in `src/content/{ar,en}/*.ts`, typed in `src/content/*.ts` (`pages.ts`, `site.ts`, `lab.ts`, `projects.ts`, `solutions.ts`) and read with `localize()`.
- Availability is computed in `src/i18n/availability.ts`. A page exists in a locale only when every section it uses has that locale, so **every new content field must be added in both locales or the English page disappears.**
- The language switch keeps the query string (`LanguageSwitch.tsx`, `keepQuery`).

### 9.2 RTL and LTR

- The reference CSS uses logical properties in most places. After porting, search for `left:`, `right:`, `margin-left`, `padding-right`, `text-align:left|right` and `translateX`, and add `[dir="ltr"]` mirrors where the English page is wrong.
- Known direction-sensitive pieces:
  - `.nav-shell nav a[aria-current]:after{right:0}`: this needs `inset-inline-start`;
  - `.hero-orbit` position;
  - `.cta-rings` (x −400);
  - `.journey article:before{right:0}`;
  - `.feature-service:after` gradient direction (270deg): use 90deg in LTR so the text side stays dark;
  - `.floating-contact` (left in RTL, so right in LTR? check the reference English via `translations.js`; otherwise mirror it);
  - `studio.js` arrow keys, which handle RTL already.
- Keep Arabic strings whole in JSX; compose with template literals. Splitting text nodes shifts sub-pixel rendering.

### 9.3 New or changed strings (Arabic and English). **DRAFT: owner sign-off needed before release.**

All are derived from existing Frentex statements, with no new claims. Put them in the files named.

| Key | Arabic | English |
| --- | --- | --- |
| `site.header.nav.home` (`ar/site.ts`, `en/site.ts`; extend `SiteContent`) | الرئيسية | Home |
| `site.header.languageShort` (or in `localeSettings`) | EN (on Arabic pages) | ع (on English pages) |
| `home.hero.motion` `{pause, play}` | إيقاف الحركة / تشغيل الحركة | Pause motion / Play motion |
| `home.hero.scrollLabel` | انتقل إلى الحلول | Skip to solutions |
| `home.solutions.moreLabel` | حلول أخرى | More solutions |
| `home.about.link` | المزيد عن فرينتكس | More about Frentex |
| `home.faq.label` | قبل أن نبدأ | Before we start |
| `home.faq.title` | ["لديك سؤال؟", "إليك ما نوضّحه عادةً."] | ["Have a question?", "Here is what we usually clarify."] |
| `home.faq.intro` | من اختيار الحل إلى ما بعد الإطلاق، نوضّح الصورة من البداية. | From choosing the solution to life after launch, we make the picture clear from the start. |
| `home.faq.link` | تواصل مع فريق الأعمال | Talk to our business team |
| FAQ 1 Q / A | أي حل يناسب احتياجي؟ / نبدأ من الإجراء الحالي والفرق المعنية والنتيجة المطلوبة، ثم نحدد الخطوة المناسبة. ويمكنك تجهيز ملخص احتياجك من صفحة التواصل. | Which solution fits my needs? / We start from your current process, the teams involved and the outcome you need, then decide the right step. You can prepare a summary of your needs on the contact page. |
| FAQ 2 Q / A | هل تطوّرون نظامًا قائمًا أم تبنون من البداية؟ / نقارن تخصيص منتج قائم أو ربطه ببناء نظام مخصص، حسب الوحدات المطلوبة. | Do you extend an existing system or build from scratch? / We compare customizing or integrating an existing product against building a custom system, based on the modules you need. |
| FAQ 3 Q / A | كيف تُحدَّد التكلفة والمدة؟ / بعد الاكتشاف نقدّم عرضًا فنيًا وماليًا يوضح النطاق والمراحل ومعايير القبول، وكل طلب خارج النطاق يُقيَّم أثره على الوقت والتكلفة قبل اعتماده. | How are cost and timeline set? / After discovery we provide a technical and financial proposal with the scope, stages and acceptance criteria. Any out-of-scope request is assessed for its effect on time and cost before it is approved. |
| FAQ 4 Q / A | هل يوجد دعم بعد التسليم؟ / نحدد تفاصيل الدعم والصيانة وخطة التحسينات عند التسليم، حسب الاتفاق. | Is there support after handover? / We define support, maintenance and the improvement plan at handover, as agreed. |
| `site.footer.columns.about` (heading) | تعرّف علينا | Get to know us |
| `site.footer.columns.solutions` (heading) | reuse `nav.services` (حلولنا) | reuse `nav.services` (Solutions) |
| `site.footer.columns.start` (heading) | reuse `site.cta.title` (نبدأ من تحدّي العمل.) | reuse `site.cta.title` |
| `site.footer.whatsapp` | تواصل عبر واتساب | Message us on WhatsApp |
| `site.floatingWhatsapp` (aria-label) | تواصل مع فرينتكس عبر واتساب | Chat with Frentex on WhatsApp |
| `solutionCards.support.tags` (and add `tags` to the type) | صيانة · تحسين الأداء · تطوير الخصائص | Maintenance · Performance · New features |

**Sources for the FAQ answers:**
- FAQ 1: `site.cta.body` and the contact brief;
- FAQ 2: home `solutions.items[2].body`;
- FAQ 3: process `phases[1].output` and practices "إدارة التغيير";
- FAQ 4: process `phases[4].output`.

Check the English against the existing English wording in `en/process.ts` and `en/home.ts`, and reuse their phrasing where it exists.

---

## 10. File-by-file implementation checklist

| File | Change |
| --- | --- |
| `src/styles/site.css` | **Replace** with the ported reference cascade (T1.1), then add Frentex-only blocks that the ported CSS lacks: icons (`.icon`, `[dir="rtl"] .icon-forward*` mirroring), `.language-switch` focus, demo `preview` cropping, `.sr-only` and other utilities. Keep the reduced-motion block. |
| `src/styles/tokens.css` | Keep. Add `--fx-deep-raised`. Remove tokens that become unused only at the very end (T5.4). |
| `src/styles/fonts/*` | Unchanged |
| `public/assets/` | Add `hero-teal.jpg` and `service-{platforms,apps,business,integration,automation,support}.jpg`, copied byte for byte from the reference `dist/assets/`. |
| `src/components/layout/SiteHeader.tsx`, `LanguageSwitch.tsx`, `PageShell.tsx`, `src/i18n/routes.ts` (`headerNavRoutes`), `src/i18n/config.ts` (`localeSettings` short label) | §6 |
| `src/components/layout/SiteFooter.tsx` | §10.1 below |
| `src/components/layout/RootDocument.tsx` | Keep the motion gate script. Optionally add the theme-color meta. |
| `src/components/pages/HomePage.tsx` | §5.1. New: `src/components/HeroMotion.tsx`, `src/components/SectorTabs.tsx`. |
| `src/components/WorkLab.tsx` | §5.5: `/work` only, with the reference `work-card` markup. |
| `src/components/PageIntro.tsx`, `EnterpriseCta.tsx` | §5.9, §5.10 |
| `src/components/pages/{Services,Solution,About,Process,Work,Contact,Privacy,Presentation,NotFound}Page.tsx` | §5.2–5.8, 5.12 |
| `src/components/project/ProjectView.tsx` (+ demos, only if needed) | §5.11 |
| `src/content/pages.ts`, `site.ts`, `solutions.ts`, `lab.ts` (types) and `src/content/{ar,en}/{home,site,solution-cards,solutions,about}.ts` | New fields from §9.3. Remove `figure` from `AboutContent`. |
| `src/lib/site.ts`, `src/lib/metadata.ts`, `src/app/sitemap.ts`, `public/robots.txt`, `public/downloads/frentex-company-profile.pdf` | T0.3 (production) |
| **Becomes unused; delete in T5.4 after grep confirms no imports** | `src/components/visual/SystemsMap.tsx`, `MapFigure.tsx`, `MapLocator.tsx`, `DirectionsFigure.tsx`, `src/components/MutedSecondLine.tsx` (if unused), `src/i18n/direction.ts` |
| `tests/e2e/support/capture.ts`, `styles.spec.ts`, `interactions.spec.ts`, `structure.spec.ts` | §13 |
| `docs/design-system.md`, `docs/page-architecture.md` | At the end, add one decision-log entry: "29 Oct: site rebuilt on the reference layout; supersedes sections 7, 12 and the page archetypes". No rewrite of the docs. |

### 10.1 Footer (`SiteFooter.tsx`)

**Source:** `footer.red-footer` (`studio.css` `.footer-grid{grid-template-columns:1.4fr .8fr 1fr 1fr;gap:45px}`; `theme.css`/`polish.css` background). At 1440 it is 479px tall.

**`div.wrap.footer-grid`**, 4 columns:
1. **`div.footer-brand`** (368 wide):
   - `a.official-logo`: a 180×180 white tile with radius 18. Frentex renders `mark.svg` (about 96px) plus "Frentex" and "TECH" centred inside the tile.
   - `p`: `footer.tagline`.
   - `a.footer-phone` (`dir="ltr"`).
   - Production email `INFO@frntextech.com`, added under the phone.
2. **Heading `tagline.about`** + links: About, Process, Work, Contact (the nav labels plus `header.cta`, or the contact label).
3. **Heading `nav.services`** + 4 solution links: platforms, apps, business, automation, labelled with `solutionCards` titles.
4. **Heading from `site.cta.title`**, then `p` `site.cta.body` (or shorter: if it wraps beyond 3 lines, note it), `a.footer-contact` to WhatsApp, and the LinkedIn link (production).

**`div.wrap.footer-bottom`:** copyright (`footer.copyright`), the tagline, and a privacy link (`footer.privacy`).

**Floating button:** `a.floating-contact`, fixed, a 50px circle with the inline WhatsApp SVG copied from the reference, `aria-label` from §9.3, `target=_blank rel=noopener`. Render it in `PageShell` after the footer.

**At 390:** 805px tall; brand block on top, then 2 link columns side by side, then the start column (inherited CSS).

---

## 11. Ordered execution plan

| Task | Files | Change | Depends on | Validation | Done when |
| --- | --- | --- | --- | --- | --- |
| **T0.1** Safety | none | `git status --short`, `git stash list`, note the counts (§2). Never clean, reset, checkout or stash. | — | The counts match §2 | Recorded |
| **T0.2** Baseline | none | `npm run lint`, `npm run typecheck`, `npm run build`, then `npx playwright test` | T0.1 | 490 passed / 143 skipped (or the failures are noted) | Recorded |
| **T0.3** Production parity | `src/lib/site.ts` (`siteUrl = "https://frntextech.com"`), `metadata.ts` (`og:url`, `og:description`, `og:image:alt`), RootDocument or home (Organization JSON-LD from `git show a0c36e2:index.html`), `public/robots.txt`, sitemap base, PDF (`git show a0c36e2:downloads/frentex-company-profile.pdf > public/downloads/…`; this writes one file and no Git state) | Port the production items in §2 | T0.2 | `structure.spec` head snapshots change only in URLs and the new tags; review them | Heads show frntextech.com |
| **T1.1** Port the CSS | `src/styles/site.css` | (a) Concatenate the reference CSS in cascade order. (b) Expand it to one declaration per line. (c) Delete every rule whose selector contains `[data-theme=light]`, and any empty `@media` left behind. (d) Replace the fonts (§8.2). (e) Apply the colour map (§8.3). Do it with a scratch Node script **outside the repo**, then write the result. (f) Fix `url('…')` to `/assets/…`, and remember `asset()` base-path handling: CSS URLs are not base-path aware, so put the image URLs in inline `style` from TSX (`asset()`) or accept that base-path preview builds lose them. (g) Append the Frentex-only blocks (§10). | T0.2 | `npm run build` passes | Builds; the page renders dark (layout still broken) |
| **T1.2** Header | §6 files | Rebuild the header | T1.1 | Outline script, 1440 and 390, both locales; menu, Escape and language switch work | §6 acceptance |
| **T1.3** Footer + floating button | `SiteFooter.tsx`, `PageShell.tsx`, content | §10.1 | T1.1 | Outline at 1440 and 390 | Matches the reference boxes within ±4px |
| **T1.4** Assets | `public/assets` | Copy the 7 JPGs | — | Files exist with identical byte sizes | Done |
| **T1.5** PageIntro + EnterpriseCta | §5.9, 5.10 | Shared intro and CTA | T1.1 | Compare on About | Boxes within ±4px |
| **T2.1** Hero | HomePage, HeroMotion | §7 | T1.2, T1.4 | Side by side, 1440, 1024 and 390, both locales | §7 acceptance |
| **T2.2** Home sections H2–H8 | HomePage, SectorTabs, content | §5.1, in order | T2.1 | Outline section list = 8 sections in order; heights within ±10% (differences from copy length noted) | All 8 match |
| **T3.1** Services | ServicesPage, content | §5.2 | T1.5 | Compare | 4 sections |
| **T3.2** Solutions | SolutionPage | §5.3, all 6 slugs | T1.5 | Compare platforms and integration | 5 sections |
| **T3.3** About, Process | pages | §5.4, and Process per §3.4: 5 `process-detail` cards with `span.eyebrow` "01 / الاكتشاف" from `phases[].label`, `h2`, `p`, `strong` `outputLabel`, `p` output; then a `card-grid` of 3 practices (`h3` + `p`); then the CTA | T1.5 | Compare | Section counts match |
| **T3.4** Work | WorkPage, WorkLab | §5.5 | T1.5 | Filter interactions pass | — |
| **T3.5** Contact, Privacy, Presentation, 404 | pages | §5.6–5.8, 5.12 | T1.5 | Brief dialog tests pass | — |
| **T3.6** Project/demos | ProjectView | §5.11 | T1.1 | All interaction tests for crm/ops/erp pass | — |
| **T4.1** Localization pass | all | Each English page at 1440 and 390: mirroring, wrapping, the language switch keeps `?project=` | T3.* | `localization.spec.ts` passes; screenshots reviewed | — |
| **T5.1** Tests | §13 | Update the selectors and tests | T4.1 | — | Suite green |
| **T5.2** Visual review | — | Rewrite baselines with `npx playwright test --update-snapshots=all` **only after** each page has been compared with the reference (§12). Inspect every changed PNG category. | T5.1 | — | Reviewed |
| **T5.3** Final checks | — | Lint, typecheck, build, full suite | T5.2 | Green | — |
| **T5.4** Cleanup | §10 "becomes unused" | Delete unused components and tokens; grep confirms no imports | T5.3 | Build and suite green | — |
| **T5.5** Report | docs | Decision-log entry; change summary listing every documented difference (§14) | T5.4 | — | Delivered |

---

## 12. Visual acceptance criteria and comparison method

- **Previews:** start both from `.claude/launch.json`. `frentex` is http://localhost:8765 and serves `out/`, so run `npm run build` first. `reference` is http://localhost:8766. Reference page URLs are `/<name>.html`; Frentex URLs are `/<route>` and `/en/<route>`.
- **Outline script.** Write it in the session scratchpad, never in either repo. It runs Chromium from `D:/ado-omar/live-site/frentex-tech/node_modules/playwright` at viewports 1440×900, 1024×900 and 390×844 with `reducedMotion: 'reduce'`. For `header, main > *, footer` and each of their children (depth 3), it prints `selector x,y w×h`. Run it on both sites and diff the outputs.
- **Screenshots:** full-page captures of both sites at the same viewport, viewed side by side for each page and locale.
- **Pass:** for every section in §3.4:
  - same order, same child structure, and box x/w within ±4px;
  - y/h within ±4px, unless the difference comes from copy length or font metrics, in which case write it down;
  - no horizontal overflow (`scrollWidth === innerWidth`) at 320, 390, 720, 900, 1024 and 1440.

  The reference's `/services.html` overflows at 1440 (its full-page capture is 1486px wide). **Do not replicate that bug.**
- **Accepted differences, to document rather than fix:**
  - colours (§8.3) and font metrics (Plex vs Thmanyah);
  - Arabic copy length (Frentex MSA vs the reference's Gulf dialect);
  - 6 service tiles instead of 9;
  - 3 sector tabs instead of 4;
  - 4 journey steps instead of 5;
  - no theme toggle;
  - the Latin brand lockup;
  - a real demo preview instead of the fake dashboard in the sector mock.

---

## 13. Existing tests and validation commands

```
npm run lint          # eslint, 0 errors expected (1 known warning)
npm run typecheck     # tsc --noEmit
npm run build         # next build + postbuild segment fix; required before tests and preview
npx playwright test   # 633 tests: 1440/1024/390 projects; global-setup refuses a stale build
npx playwright test --update-snapshots=all   # only in T5.2, after visual review
```

- Suite location: `tests/e2e/` (`visual`, `structure`, `styles`, `interactions`, `localization`, `integrity`); config in `playwright.config.ts` (`reducedMotion: "reduce"`, `maxDiffPixels: 0`).
- Low memory on this machine can cause transient `ERR_INSUFFICIENT_RESOURCES` failures. Rerun once before treating a failure as a regression.

**Tests that must change:**
- `tests/e2e/support/capture.ts`, lines 94–129, critical selectors: replace `.hero`, `.hero::before`, `.hero-art`, `.about-section` and `.about-section::after` with `.studio-hero`, `.hero-center h1`, `.studio-about`, `.studio-cta` and `.red-footer`. Keep `.site-header .brand`, `.brand small` and `.nav-cta`.
- `styles.spec.ts`:
  - The reduced-motion test reads `.lab-card` transition. Change it to `.feature-service` (home) and its real transition values.
  - Replace the "hero map finishes visible" test (it uses `.systems-map`, `.map-node` and `data-shown`) with a canvas/`ambient-field` reduced-motion test.
- `interactions.spec.ts`:
  - "Work Lab filters on `/`": home has no filters any more, so test only `/work`.
  - Add a sector-tabs test on `/`: clicking each tab and ArrowLeft/ArrowRight in RTL and LTR changes `aria-selected` and the panel heading.
  - The menu tests keep their selectors (`.menu-toggle`, `#navigation`, `nav.open`). The menu's expected link texts change, since 5 items plus mobile-contact now include "الرئيسية".
- `localization.spec.ts`: `.language-switch` must stay on the switch link. Its accessible name changes if the text becomes "EN"; update the assertion so it checks `hreflang` and the `aria-label`.
- `structure.spec.ts` and all `visual.spec.ts` baselines: rewrite in T5.2 after review.
- Add: a test that the FAQ `details` open and close, and an overflow test at 320.

---

## 14. Known risks, dependencies and unresolved questions

1. **Untracked work (critical).** Everything in the target is untracked. One `git clean` destroys it. Suggest a backup commit to the owner **before** starting; do not do it unasked.
2. **Copy approval.** The strings in §9.3 are drafts derived from existing copy and need owner sign-off. The FAQ is the largest piece of new text.
3. **Motion rules conflict.** The reference loops animations (`ambient-drift`, `grid-glide`, `.hero-orbit`, the canvas), which `docs/design-system.md` section 7 forbids. Per this task the reference wins. Gate all of it behind `html[data-motion="ok"]` and the pause control, and record that in the decision log.
4. **Accessibility.** The reference's teal-on-dark small labels and white-on-teal buttons fall below AA. The colour map in §8.3 fixes the buttons. Verify the contrast of `section-label`, `service-number` and `#b3cbdc` text on `--fx-deep-raised` with a contrast check before sign-off.
5. **CSS size.** The ported cascade is about 7,600 formatted lines, many of them overridden or dead. Fidelity comes first. Prune only rules whose selectors match no class in `out/**/*.html` or in the TSX (state classes such as `.open`, `.soft-enter`, `[aria-*]`, `:hover` stay), and only after the visual pass.
6. **Base path.** CSS `url()`s do not get `NEXT_PUBLIC_BASE_PATH`. Set image URLs from TSX with `asset()`, or document that the GitHub Pages preview build loses the background images.
7. **The images are AI-generated** ("© Frentex Tech", supplied by the client). Their teal and bronze tones will not match the navy palette. The owner accepted this on 29 Oct.
8. **Unknowns:**
   - The reference's mobile menu panel (open state) and header scroll behaviour were not captured during planning. Capture them in T1.2.
   - The exact English mirroring of the reference: its English comes from client-side `translations.js`, which may not set `dir="ltr"`. If the reference never mirrors, mirror by logical properties (Frentex rule).
9. **Superseded docs.** `docs/design-system.md`, `page-architecture.md`, `page-redesign-workflow.md` and `visual-redesign-plan.md` describe the "Systems Map" direction that this work replaces. Add the one decision-log line; do not rewrite them.

---

## 15. Completion criteria

1. Every reference page in §4 has its Frentex counterpart with the same sections in the same order. The 3 commerce, consulting and cloud pages are documented as exceptions.
2. At 1440, 1024 and 390, in both locales, the outline comparison passes §12, or each difference is documented with its cause.
3. Header and hero meet §6 and §7 acceptance.
4. Frentex logo, palette mapping, font, content, routes, `hreflang`, the language switch with query, the demos, the brief dialog and the production metadata (T0.3) all work.
5. `npm run lint` (0 errors), `npm run typecheck`, `npm run build` and `npx playwright test` all pass, with every changed baseline reviewed.
6. No horizontal overflow from 320 to 1440.
7. Nothing staged, committed, pushed, reset or cleaned. The reference directory is unchanged (`git -C D:\ado-omar\abdalla-site\hostinger-website-backup status` is clean).
8. A change summary lists the files changed, the new copy awaiting approval, and every documented difference.
