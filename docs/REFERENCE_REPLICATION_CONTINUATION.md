# Reference replication: continuation brief

Written 29 October 2026, after an audit of the half-finished replication. Hand this file, together with `docs/REFERENCE_REPLICATION_PLAN.md`, to the coding model that continues the work.

- **The main plan** (`REFERENCE_REPLICATION_PLAN.md`) defines the end state: section specs, the colour map, the copy and the acceptance criteria.
- **This file** says what is already done, what is broken, and the exact order in which to finish.
- Do not redo completed tasks. Do not edit the main plan.

---

## 0. Rules (unchanged)

- **Target:** `D:\ado-omar\live-site\frentex-tech`, branch `feature/nextjs-migration`, HEAD `300ed55`.
- **Reference, read-only:** `D:\ado-omar\abdalla-site\hostinger-website-backup`. Its `dist/*.html` and `dist/assets/*.css` are the markup and style source.
- **All Next.js work is untracked.** Never run `git clean`, `git reset`, `git checkout .`, `git stash` or a branch switch. Do not stage, commit or push unless the owner asks.
- Put temporary scripts in your own scratchpad, never in either repository.
- No new dependencies. No backend. Keep routes, both locales, `hreflang`, the demos, the brief dialog and the production metadata.
- This Next.js version has breaking changes. Read `node_modules/next/dist/docs/` before using a Next.js API you are unsure of (`AGENTS.md`).
- **Previews**, both defined in `.claude/launch.json`:
  - `frentex`: http://localhost:8765 serves `out/`, so run `npm run build` first;
  - `reference`: http://localhost:8766 serves the reference `dist/`. Reference URLs are `/<name>.html`.

---

## 1. Current state (verified 29 Oct by audit)

### Done; do not redo

| Plan task | What exists |
| --- | --- |
| T0.3 Production details | `src/lib/site.ts` `siteUrl = "https://frntextech.com"`; `public/robots.txt`; Open Graph `url`/`description`/image `alt` in `src/lib/metadata.ts`; Organization JSON-LD in `src/components/layout/RootDocument.tsx`; production PDF in `public/downloads/` (checksum matches `a0c36e2`). Not yet checked: the sitemap base URL in `src/app/sitemap.ts`. |
| T1.1 CSS port | `src/styles/site.css` is the ported reference cascade (7,669 lines): light-theme rules removed, reference fonts removed, colours mapped. Frentex-only additions start at the comment `/* ===== Frentex-only additions` near the end. `tokens.css` has `--fx-deep-raised`. |
| T1.2 Header (markup) | `SiteHeader.tsx`, `LanguageSwitch.tsx` ("EN"/"ع" with the language name as `aria-label`), `i18n/routes.ts` `headerNavRoutes = ["home","services","work","about","process"]`, `i18n/config.ts` `shortName` |
| T1.3 Footer (markup) | `SiteFooter.tsx` (4 columns, email, LinkedIn); `PageShell.tsx` floating WhatsApp button |
| T1.4 Images | `public/assets/hero-teal.jpg` and `service-*.jpg` (9 files; only 6 are needed) |
| T1.5 Shared intro/CTA (components) | `PageIntro.tsx` (only `intro` remains as a prop; it renders `div.ambient-field`); `EnterpriseCta.tsx` |
| T2.1/T2.2 Home (markup) | `HomePage.tsx` with the 8 reference sections in order; new `HeroMotion.tsx` and `SectorTabs.tsx`; new copy in `src/content/{ar,en}/{home,site}.ts` with the types in `src/content/pages.ts` and `src/content/site.ts` |

### Broken or missing

1. **Build blocked.** `npx tsc --noEmit --incremental false` fails with 3 errors, so `npm run build` fails:
   - `src/components/pages/AboutPage.tsx:24` passes `actions` to `PageIntro`;
   - `src/components/pages/NotFoundPage.tsx:27` passes `actions`;
   - `src/components/pages/SolutionPage.tsx:59` passes `aside` (`MapLocator`).
2. **Home card mismatch.** In `HomePage.tsx` the `feature-ai` card (automation image and link) shows **integration** text. The cause is `solutions.items[index]`, while the items are ordered platforms, apps, business, integration, automation.
3. **Two home anchors lost.** `section.studio-about` needs `id="about"` and `section.studio-process` needs `id="approach"` (plan §4).
4. **CSS missing for classes that are still in use**, because the old rules were removed by the port:
   - **Home:** `.lab-preview` inside `.mock-content` (`SectorTabs.tsx`).
   - **Footer:** `.official-logo-word`, `.footer-email`, `.footer-linkedin`.
   - **Inner pages** still use `.link-card`, `.spec-sheet`, `.ruled-rows`, `.ruled-columns`, `.ruled-grid`, the process map (`.process-map`, `.process-stage`) and `.contact-channels`, plus `WorkLab`'s `.lab-card` classes. These are **not** to be restyled; tasks C6–C12 replace them with reference markup.
5. **Footer arrow.** `SiteFooter.tsx` hard-codes "↖" after the WhatsApp label, which is wrong in English.
6. **Leftovers:**
   - an unused `projectLink` in `HomePage.tsx` (lint warning);
   - 3 unused images: `public/assets/service-{cloud,commerce,consulting}.jpg`.
7. **Never verified.** No build, no tests and no visual comparison have been run since the port.

---

## 2. Tasks, in order

Each task ends with its check. Stop and report if a check fails twice.

### C1. Unblock the build (plan §5.3, §5.4, §5.12)

- **`SolutionPage.tsx`:** remove the `aside={<MapLocator …/>}` prop and the `MapLocator` import.
- **`AboutPage.tsx`:**
  - Remove the `actions` prop.
  - After the `<EnterpriseCta>` (it is the last section), add the reference's final section: `<section className="wrap section"><a className="button primary" href={asset("/downloads/frentex-company-profile.pdf")} hrefLang="ar" …>`, with the existing download label and the existing "(in Arabic)" handling from the removed `actions` code. Keep `hreflang` and the label exactly as the removed code had them.
- **`NotFoundPage.tsx`:**
  - Remove the `actions` prop.
  - After `PageIntro`, add `<section className="wrap"><Link className="button primary" href={home}>…</Link></section>`, using the existing home label. Drop the Services link (plan §5.12).
- **Check:** `npx tsc --noEmit` passes and `npm run build` succeeds.

### C2. Home fixes

- **Feature cards.** In `HomePage.tsx`, replace `solutions.items[index]` with a fixed index per slug: `const itemIndex = { platforms: 0, apps: 1, business: 2, automation: 4 } as const;` then `solutions.items[itemIndex[slug]]`. Keep `service-number` as `0${position+1}` (01–04).
- **Anchors:** add `id="about"` to `section.studio-about` and `id="approach"` to `section.studio-process`.
- **Leftover:** delete the unused `projectLink`.
- **Footer arrow:** in `SiteFooter.tsx`, replace the hard-coded `<span aria-hidden="true">↖</span>` with `<Icon name="forward" size={14} />` from `@/components/visual/icons`, which mirrors automatically in RTL. Do the same for the LinkedIn "↗" only if the reference shows that arrow; otherwise keep "↗" (external links keep ↗ in both directions, matching the site's convention).
- **Check:** `npm run lint` reports 0 errors and only the known `<head>` warning.

### C3. Missing Frentex-only CSS

Append to the Frentex-only block at the end of `src/styles/site.css`. Use tokens; no new hex values.

- **`.mock-content .lab-preview`:**
  - fills the mock body: `height: 100%; overflow: hidden; pointer-events: none;`;
  - the demo inside renders at its natural size and is cropped at the bottom;
  - the mock body is the reference's `.mock-content` box (about 580×509 for the whole `.sector-visual` at 1440). Fill everything below the toolbar and above `.mock-note`, then compare with the reference.
- **Demo previews:** the `preview` mode of `CrmDemo`/`OpsDemo`/`ErpDemo` used to rely on rules such as hiding `.demo-tools`. Check `src/components/project/*Demo.tsx` for what `preview` changes. If the preview shows controls that should be hidden, add `.lab-preview .demo-tools{display:none}` (and similar). Do not change the demo components.
- **Footer logo:**
  - `.official-logo-art` (now a `span`): `display:grid; place-items:center; align-content:center; gap:10px; width:100%; height:100%; background:#fff;`;
  - `.official-logo-word`: `display:flex; flex-direction:column; align-items:center; color:var(--fx-ink); font-size:22px; font-weight:600; line-height:1;`;
  - `.official-logo-word small`: `font-family:Arial,sans-serif; font-size:9px; letter-spacing:3px; margin-top:6px;`.
- **`.footer-email`, `.footer-linkedin`:** copy the computed style of `.footer-phone` (email, under the phone) and `.footer-contact` (LinkedIn, under WhatsApp), with `display:block` and a small top margin so they stack.
- **Check:** build, then view the home page (sector panel) and the footer at 1440 and 390.

### C4. Visual comparison: shell and home (plan §6, §7, §12)

1. Build, then start both previews.
2. Write an outline script in your scratchpad, roughly:

   ```js
   const { chromium } = require('D:/ado-omar/live-site/frentex-tech/node_modules/playwright');
   // args: baseUrl width path...  prints "selector x,y wxh" for header, main>* (depth 3), footer
   ```

   Run it with viewports `{1440,900}`, `{1024,900}` and `{390,844}`, and `reducedMotion:'reduce'`.
3. Compare reference `/index.html` with Frentex `/` and `/en`.
4. Fix layout differences by changing markup or classes, not by rewriting ported rules. The only exceptions are direction mirroring under `[dir="ltr"]` and the accepted differences (plan §12).
5. **Header targets:** 1440 → `28,22 1384×98`; 390 → `14,13 362×70`. The menu opens, closes, and closes on Escape.
6. **Hero targets at 1440:** 820 tall, kicker y≈154, h1 y≈220, p 600 wide, actions y≈572. At 390 the hero is 760 tall.
7. **Screenshots:** full page side by side at 1440 and 390. Look at them yourself before going on.
8. Capture the reference's mobile menu open at 390 and its header after scrolling, and match both (the plan marks these as not yet captured).

**Check:** every home section box is within ±4px of the reference, or the difference is written down with its cause (copy length, font, 3 tabs, 4 steps).

### C5. English direction pass for home and shell

- Check `/en` at 1440 and 390 for mirroring: nav underline, `.hero-orbit`, `.cta-rings`, the `.journey article:before` dot, the direction of the `.feature-service:after` gradient (text side stays dark), and the floating button side.
- Add `[dir="ltr"]` rules at the end of the Frentex-only block only where English is wrong (plan §9.2).

### C6–C12. Inner pages (plan T3.1–T3.6)

Not started. Follow plan §5.2–§5.12 exactly, one page at a time. For each page, build and compare with its reference HTML (outline plus screenshots, 1440 and 390, both locales) before moving to the next.

| Task | Page | Plan section | Remove (unstyled now) |
| --- | --- | --- | --- |
| C6 | `ServicesPage.tsx` | §5.2 | `.link-card`, `MapLocator`, `.ruled-columns` |
| C7 | `SolutionPage.tsx` (6 slugs) | §5.3 | `.spec-sheet`, `listItems()`, `ul.deliverables` |
| C8 | `AboutPage.tsx` | §5.4 | `.ruled-grid`, `DirectionsFigure`, `figure` content field |
| C9 | `ProcessPage.tsx` | §11, task T3.3 (5 `process-detail` cards, 3-card practices grid, CTA) | `.process-map`, `.ruled-columns` |
| C10 | `WorkPage.tsx`, `WorkLab.tsx` | §5.5 | `.lab-card*`; `withHeader` branch |
| C11 | `ContactPage.tsx`, `PrivacyPage.tsx`, `PresentationPage.tsx`, `NotFoundPage.tsx` | §5.6–5.8, §5.12 | `.contact-channels`, `.ruled-rows`, `.link-card`, `.measure` |
| C12 | `ProjectView.tsx` | §5.11 | `data-hue` on `.demo-shell`/`.next-project` |

Keep the `WorkLab` filter behaviour (`data-filter`, `aria-pressed`, `#filter-status`, `data-category`), because `tests/e2e/interactions.spec.ts` checks it on `/work`.

### C13. English pass for inner pages (plan T4.1)

Every English page at 1440 and 390. The language switch must keep `?project=` on demo pages.

### C14. Tests (plan §13)

Update:
- `tests/e2e/support/capture.ts` critical selectors (lines 94–129);
- `styles.spec.ts`: change the reduced-motion test's `.lab-card` to `.feature-service`, and replace the `.systems-map` test with one that checks the hero canvas and `ambient-field` stay still under reduced motion;
- `interactions.spec.ts`: the filter test only on `/work`; a new sector-tabs test on `/`; the new menu link list;
- the `localization.spec.ts` language-switch assertion;
- new tests for the FAQ `details` and for overflow at 320px.

Then run `npx playwright test`. Rewrite baselines (`--update-snapshots=all`) **only after** C4–C13 visual reviews. Look at each changed PNG category; never bulk-accept unseen images.

### C15. Cleanup and report (plan T5.4, T5.5)

- **Delete only after a grep shows no imports:** `src/components/visual/SystemsMap.tsx`, `MapFigure.tsx`, `MapLocator.tsx`, `DirectionsFigure.tsx`, `src/i18n/direction.ts`, and `MutedSecondLine.tsx` if it is unused.
- **Delete the 3 unused images:** `public/assets/service-{cloud,commerce,consulting}.jpg`.
- **Design-hook note:** the hook flags `Arial` in `site.css` as an overused font. That use is intentional (small Latin labels, carried over from the reference, plan §8 rule 2). Record the ignore with:

  ```bash
  "C:/Users/kerol/.claude/skills/impeccable/scripts/impeccable" hooks ignore-value overused-font Arial --file src/styles/site.css --reason "small Latin labels, ported from the reference per plan §8"
  ```

- Run `npm run lint`, `npm run typecheck`, `npm run build` and `npx playwright test`; all must pass.
- Add one decision-log line to `docs/design-system.md` §13, as plan §10 says.
- **Final report:**
  - files changed;
  - checks with their real results;
  - every documented difference from the reference;
  - the copy still awaiting owner approval (plan §9.3);
  - `git status --short`, plus confirmation that nothing was staged or committed.

---

## 3. Stop conditions

Stop and report instead of guessing when:
- the same check fails twice;
- a fix would need new copy beyond plan §9.3;
- a fix would need a new colour or a font outside plan §8;
- a test needs to change for reasons not listed in C14;
- anything would touch the reference repository or Git state.
