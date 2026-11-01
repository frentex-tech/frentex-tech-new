# Design audit (Phase 0)

Date: 28 October 2026; decisions recorded the same day. Scope: the frontend on `feature/nextjs-migration`, working tree as found, including uncommitted steps 1, 3, 4 and part of 5 of the visual redesign plan. This audit changed no code. The rules that follow from it are in [`design-system.md`](design-system.md).

## Method

- **Source:** every page and layout component read in full; `site.css` read in full except the Work Lab mini-window rules. A read-only script mapped every colour, radius, shadow, font size, width, spacing value, z-index, transition and media query in `site.css` to its selectors.
- **Rendered:** recorded test baselines viewed for Home and Solution (platforms) at 1440, a demo page (Madar) at 1440, English Process at 1440 and Arabic Contact at 390. The other screens were not viewed in this phase (see `page-architecture.md` section 7).
- **Prior work consolidated:** the plan (`docs/visual-redesign-plan.md`), the Impeccable critique of 26 October (`.impeccable/critique/`) and the direction study (`.impeccable/decision/direction.json`). Findings already fixed by steps 3 and 4 are not repeated.
- **Not done during the audit:** the e2e suite was not run, and no live browser session was used.
- **Correction (later the same day):** this audit first read the `project-crm` images in `test-results/` as failures. They are the copies an update run leaves behind. The step 5 baselines had already been rewritten at 02:30–02:34, the last run had passed, and a full run confirmed it (490 passed, 143 skipped).

Severity: **High** affects comprehension, accessibility or consistency across many pages; **Medium** is a visible inconsistency on some pages; **Low** is code hygiene with no visible effect. "Pixels" says whether the fix would change screenshots.

---

## Summary

The system is more consistent than its stylesheet suggests. Tokens, the type scale, flat surfaces, one button system, the focus ring, the icon grammar and the motion gate are in place and used on every page. What remains:
1. **Legacy components** still carry the old visual language: glass, gradients, shadows and sub-13px text. They account for 54 of the 79 hard-coded colours.
2. **Untokenised live values:** the white surface, the dark-band text set, field and label colours, status colours, spacing, widths and layers.
3. **Cascade conflicts and layout slips** that a page-by-page redesign would otherwise copy: split selector blocks, centred narrow columns, stacked section padding and a 700/720 breakpoint split.
4. **Inner pages share one card for every kind of content.** This is the main visual problem the page-by-page phase has to solve.

## Decisions taken on 28 October 2026

The owner approved the design system and settled these findings. The full log is in design system section 13. The findings below are kept as they were found.

| Finding | Decision |
| --- | --- |
| H2: CSS Modules vs `site.css` | `site.css`, one section per component |
| E1: 700 and 720px breakpoints | Merge 700 into 720 |
| D2: double gap before the CTA band | One section space |
| D3: footer rule | Full page width, like the header hairline. This audit had suggested the content edge; the owner chose the full-width option. |
| A5: status colours | Demo-only; no site-wide set until needed |
| B5: numbered labels | Remove the numbers where order means nothing; keep them on Process stages and the home approach steps |
| B5: English labels on Arabic pages | Arabic wording from the owner; product codes stay Latin |
| Plan section J: IBM Plex Mono | Not added |

D2, D3, E1 and the numbered labels were implemented the same day in the shared-changes pass (recommendation 4).

**Resolved by the Work Lab and demo pages redesign (28 October).** Design system section 13 has the decisions.
- The Work Lab mini windows are retired. With them go their sub-13px text (B1) and the "•••" glyphs (F3).
- Hard-coded colours in `site.css` went from 79 to 35 distinct values.
- The demo label sits in the page direction (D4).
- The demo table moved from 14px to 15px (B1b).
- The selected-request colour `#5d8da8` became Sayr's hue.
- The `.25s` window transition is gone (G1); `styles.spec.ts` now checks the Work Lab card instead.

**Resolved by the Services and solution pages redesign (28 October).**
- D6: Services and the six solution pages no longer use one identical card for every kind of content.
- B3: solution pages no longer jump from h1 to h3.
- Six identical "Explore scope and deliverables" links became six links named by their titles.
- The deliverables are a real list instead of a semicolon-separated sentence.

**Resolved by the Process page redesign (28 October).**
- D1 on Process: the stages align to the content edge. Privacy's centred card remains.
- B4 on Process: the output uses the label-and-value treatment. The home strip still writes its value in `#466c86` (A3).
- The practices no longer sit under the last stage in the heading outline.

**Resolved by the About and Contact redesign (28 October).**
- D5: the company profile download is in About's intro.
- D6: About's principles and Contact's topics are no longer identical cards.
- B3 on About: the principles are h2 under the h1.
- Contact's primary channel is now the visually primary panel.

**Resolved by the home sections redesign (28 October).**
- D7: the glass aside, the contact orb and the About circle are gone; no legacy component remains.
- F3: the accordion "+" glyph is gone with the accordion.
- G1: the `.2s` accordion transition is gone; `styles.spec.ts` no longer asserts it.
- A3 and A4: `#466c86` and `#638aa6` are gone.
- Hard-coded colours in `site.css` are down to 22 distinct values (79 at the audit).

**Resolved by the Privacy, Presentation and 404 redesign (28 October).**
- D1: Privacy's text no longer sits in a centred card; no page centres a narrow column now.
- 404: the home button no longer sits on the footer rule.
- Presentation's six "Open the reference" links are named by their references.
- Presentation no longer describes a glass design the site doesn't have.

**Every page has now had its page-level redesign.** Still open from this audit:
- H5 (test README);
- H6 (README `docs/` line);
- H7 (screenshot threshold);
- the 11.2 token proposals and the C1–C7 cascade merges (zero-diff hygiene);
- the remaining one-off colours in the dialog and Sayr (A3);
- the motion pass (plan section F, step 8);
- the open-node CTA in the shared `EnterpriseCta` (P08).

---

## A. Colour

**Existing palette: preserved.** Twenty-one colour tokens are defined in `tokens.css` and referenced about 140 times in `site.css`. The brand colours, surfaces and demo hues are documented in design system section 2. No component sets a colour inline; the only hex in TypeScript is `theme-color` `#edf4fa` (`--fx-tint`) in `RootDocument`.

**Hard-coded colours.** `site.css` contains 79 distinct hex values, plus the keyword `white`:

| Group | Count | Where | Recommendation |
| --- | --- | --- | --- |
| Legacy-only | 54 | Work Lab mini windows, solutions aside, contact orb, About circle, demo card gradients | Remove with their components (plan steps 5–7). Do not tokenise. |
| Live | 25 | See A1–A6 | Tokenise or consolidate |

| ID | Finding | Severity | Pixels | Recommendation |
| --- | --- | --- | --- | --- |
| A1 | White, as a surface and as text on ink, is written as `#fff` or `white` in 13 live declarations (and as `#ffffff` in one legacy rule), with no token. | Low | No | `--fx-surface` and `--fx-on-ink` (design system 11.2) |
| A2 | The dark band uses six untokenised light colours: `#edf7fe`, `#e0edf7`, `#b3cbdc`, `#b5cddd`, `#94b4cc` and `#99b6ce`. Two pairs are near-duplicates. All pass contrast (≥5.38:1 on `--fx-deep`). | Low | No (tokens); yes (merging pairs) | Tokenise as the "on deep" set. Merge the pairs only with approval. |
| A3 | Four label and value blues outside the token set: `#47667f` (dialog labels), `#466c86` (home process output), `#4a6a7c` (Sayr request rows), `#4c6e82` (Sayr detail values). Each sits between `--fx-text-2` and `--fx-ink-text`. | Medium | Yes | Consolidate to `--fx-text-2` or `--fx-ink-text` when the page is redesigned. |
| A4 | Near-duplicates of tokens: `#638aa6` (accordion "+") vs steel `#638daf`; `#487f9e` (hero eyebrow dot) is a one-off hue; `#e2ebf1` (disclosure fill) sits between tint and line. | Low | Yes, slightly | Map to steel; keep the dot and the disclosure fill as documented one-offs or retire them with their sections. |
| A5 | Status colours are ad hoc: `#467964` (demo status), `--fx-sayr` (in stock, request status), `--fx-raseed` on its tint (low stock), `#995d56` and `#d9bbb7` (reject). There is no information, warning or error colour for non-demo use. | Medium | No | Status aliases (design system 11.2). Decide on non-demo status colours when first needed. |
| A6 | `#80b3d9` is a 2px mouse-focus outline on fields (2.24:1 on white). The later `:focus-visible` rule replaces it for keyboard focus, so it shows only on mouse focus, for example on the select. | Low | Possibly | Remove when the forms are next touched; the keyboard ring stays. |
| A7 | Three navies differ by a few units: `--fx-ink` `#173f61`, `--fx-ink-text` `#193953` and `--fx-deep` `#173b56`. Headings use `--fx-ink-text` by inheritance, although the token comment says ink is for headlines. | Low | Yes, if merged | Keep all three (distinct roles, every screenshot depends on them). The design system documents the actual roles. |
| A8 | `--fx-sky` is defined but never referenced; it documents the logo gradient start. | Low | No | Keep, as documented. |

## B. Typography

| ID | Finding | Severity | Pixels | Recommendation |
| --- | --- | --- | --- | --- |
| B1 | Text under 13px remains only in legacy components (6–10px in the Work Lab mini windows, 12px in the solutions aside on phones), in the documented 12px Latin labels, and in the logo lockup (7–9px Arial "TECH" lines, exempt). | Medium | — | Retire with the components (plan steps 5–7). |
| B1b | A few live sizes sit off the scale, all at or above 13px: 14px (demo table), 16px (form fields), 22px (accordion "+"), 27px and 23px (Contact phone link), 38px and 30px (home process numbers), 25/23/20px (brand lockup). | Low | Yes, if moved | Snap to the scale when each page is redesigned; the field size stays 16px. |
| B2 | Weight 500 is used in 14 declarations for labels and buttons but has no token. Weight 700 is never set; it appears through the browser default on `<b>` and `<strong>`, for example the Process "Output:" label and the map system names. | Low | No | `--fx-weight-label`; set weights explicitly in new rules. |
| B3 | Heading levels and sizes mix across cards. Services and Process cards use h2 at h3 size, solution and About cards h3 at h4 size, Contact panels h2 and topic cards h3. The sizes are consistent, the levels follow each page's outline. | Low | No | Keep the outline-driven levels; size by class, as design system section 3, rule 9 says. |
| B4 | The "Output" label has two treatments: home process strip (13px text-2 label, then a 15px `#466c86` value) and Process page (default bold `<strong>` in ink-text, then a paragraph). | Medium | Yes | Unify when Process is redesigned. |
| B5 | English uppercase eyebrows on Arabic pages ("BUSINESS SOLUTIONS", "FRENTEX / PLATFORMS", "PROJECT BRIEF"), and numbered eyebrows ("01 / حلولنا") on home and the demo case story where the order carries no meaning. | Medium | — | Copy decisions for the owner. The design system only requires `dir` and the 12/13px rules. |

## C. Cascade conflicts in `site.css`

Seven selectors are defined in two separate blocks. Where values conflict, the later block wins, and some earlier values are dead:

| ID | Selector | Earlier block | Later block | Effect |
| --- | --- | --- | --- | --- |
| C1 | `.brand` | 25px (line 152); 21px at ≤720 (line 2036) | 23px (line 2377); 20px at ≤1000 (line 2409) | The ≤720 value never applies: the brand is 20px on phones (confirmed in the style snapshot). The 25px value is dead. |
| C2 | `.brand small` | `letter-spacing: 3px` | `2px` | 3px is dead |
| C3 | `.hero-caption` | `margin-top: 28px` (step 4 block, line 279) | `42px` (line 731) | The step 4 value never applies |
| C4 | `.hero-intro` | grid area, `margin: 0` (line 267) | size and leading (line 664) | No conflict; split for no reason |
| C5 | `.enterprise-card` | surface (line 2337) | `overflow-wrap` (line 2394) | No conflict |
| C6 | `.small-button` | box (line 1671) | inline-flex for icons (line 2546) | No conflict |
| C7 | `.next-project a` | 20px (line 1800) | inline-flex for icons (line 2534) | No conflict |

Also:
- `site.css` lines 2540–2543 are minified, while the rest of the file has one declaration per line since step 3.
- The `.process-detail` and `.prose` widths override `.wrap`'s `max-width` by source order alone (see D1).

| ID | Severity | Pixels | Recommendation |
| --- | --- | --- | --- |
| C1–C3 | Medium | No, if the effective value is kept | Merge each pair into one block that keeps the effective value. If the dead value was the intent (the 28px caption, the 21px brand), that is a visual change to approve. |
| C4–C7, formatting | Low | No | Merge when the component is next touched; reformat the minified rules. |

## D. Layout and alignment

| ID | Finding | Severity | Pixels | Recommendation |
| --- | --- | --- | --- | --- |
| D1 | Narrow columns are centred instead of aligned to the content edge. On Process, `.wrap.process-detail` (980px) centres the five stage cards, while the intro above and the practices below align to the 1152px content edge (seen in the English Process baseline). `.wrap.prose` on Privacy does the same at 1000px; this follows from the CSS and was not checked visually. | High | Yes | Align narrow columns to the start edge, with the measure on the content rather than the container. Fix as part of the Process and Privacy redesigns. |
| D2 | Every inner page stacks two full section paddings before `EnterpriseCta`: the last `.section` ends with 110px and the CTA's own `.section` starts with 110px, about 220px of empty paper (seen on the Solution page). | Medium | Yes | One rule: the CTA band takes a single section space above it. Decide globally, because it touches every inner page at once. |
| D3 | The footer's top rule is drawn on `.wrap` including its padding, so it runs 40px past the content edge on both sides (seen at 1440). | Low | Yes | Put the rule on an inner element or inset it. A global footer change: approve once. |
| D4 | On demo pages the eyebrow has `dir="ltr"` and `display: flex`, so in Arabic it sits at the far (left) end of the heading column instead of above the title's start (seen in the Madar baseline). | Medium | Yes | Isolate the Latin text in an inline element with `dir="ltr"` and keep the eyebrow in the page direction. |
| D5 | The About page's company-profile button sits alone in its own section after the CTA band (plan section A). | Medium | Yes | Fix when About is redesigned (plan: next to the intro). |
| D6 | Inner pages use one card (`.enterprise-card`) for situations, solutions, deliverables, stages, principles, contact channels, topics and the Privacy text. | High | Yes | The main job of the page-by-page phase; the planned forms are in `page-architecture.md` section 4. |
| D7 | Legacy decoration still on home: the glass solutions aside, the contact orb (cropped behind the text on phones) and the About circle. | Medium | Yes | Retire in the home sections' redesign (plan steps 6–7). |

## E. Responsive

| ID | Finding | Severity | Pixels | Recommendation |
| --- | --- | --- | --- | --- |
| E1 | Two phone breakpoints: 700px (inner-page rules: page intro, grids, card and CTA padding, logo size, phone link) and 720px (everything else, including the type tokens). Between 701 and 720px, inner pages get phone type in tablet grids. | Medium | Yes, between 701 and 720px only | Merge 700 into 720 in one deliberate change. The suite's 390 and 1024 baselines do not cover that range; check it by hand. |
| E2 | Target sizes: most controls are 44px, but the header CTA is 40px at ≤720 and dense demo buttons are 40px. | Low | — | Accept 40px as the documented floor for dense rows; keep 44px elsewhere. |
| E3 | No horizontal overflow at any tested viewport; a test enforces it. | — | — | Keep. |

## F. Components and states

| ID | Finding | Severity | Pixels | Recommendation |
| --- | --- | --- | --- | --- |
| F1 | No designed form error state; the brief dialog relies on native validation bubbles. | Medium | — | Design an inline pattern before any page needs custom validation (design system 11.3). |
| F2 | No tabs, dropdowns, tooltips, toasts, drawers, breadcrumbs or pagination exist, and none are needed by the current pages. | — | — | Do not add them speculatively (design system 12.22). |
| F3 | Unicode glyphs still act as icons in a few places: the accordion "+", "•••" in the mini-window bars and the "✓" in the Sayr approve label (copy). | Low | Yes | Replace the first two with their components; the ✓ is copy (plan section J). |
| F4 | Feedback patterns are consistent: status live regions, in-place results, focus moved to the next action. | — | — | Keep as the standard (design system 8). |

## G. Motion

| ID | Finding | Severity | Pixels | Recommendation |
| --- | --- | --- | --- | --- |
| G1 | Two legacy transitions are not tokenised: `summary b` (`.2s`) and `.product-window` (`.25s`). `styles.spec.ts` asserts both. | Low | No | Remove with their components and update the assertion in the same change. |
| G2 | The motion gate, the 2.5s fallback and the one-observer reveal are sound and tested. | — | — | Reuse `MapFigure`'s pattern for later reveals. |

## H. Code organisation and documentation

| ID | Finding | Severity | Recommendation |
| --- | --- | --- | --- |
| H1 | `site.css` is one 2,551-line global stylesheet. Component sections exist but are not marked consistently ("Frentex enterprise pages", "Case-study pages", "Home hero"). | Low | A comment header per component section when it is next touched. No reorganisation pass. |
| H2 | Plan section C says new component styles go into CSS Modules. Steps 3–5 put them in `site.css` instead, and the tests select by global class names. | Medium | Owner decision. Recommended: stay with `site.css`, because hashed class names would break the markup and style snapshots and the test selectors. |
| H3 | `tokens.css` points to "docs/visual-redesign-plan.md, section B" as its reference. That table predates later tokens (line-strong, ink-hover, sky, radii, type, motion). | Low | Point the comment at `design-system.md` when `tokens.css` is next edited. |
| H4 | The plan's status line says steps 1 and 3 are implemented, while its section H records step 4 and part of step 5. | Low | A pointer to these documents has been added at the top of the plan; the status line itself is left as written. |
| H5 | `tests/e2e/README.md` still says English pages do not exist, in "Not covered" and in the localization row. | Low | Update when the tests are next touched. |
| H6 | The README "Structure" section does not mention `docs/`. | Low | Add one line if wanted. |
| H7 | Screenshot comparison uses Playwright's default per-pixel colour `threshold` (0.2); `playwright.config.ts` sets only `maxDiffPixels: 0`. A change between light colours (paper `#f7fafc` to line `#dce7ee`) passes as a match. Found in the shared-changes pass: pages whose only change was the footer rule kept stale 1440 baselines until they were rewritten with `--update-snapshots=all`. Consolidating near-duplicate colours (A2–A4) would pass the same way. | Medium | Owner decision: either lower the threshold (risk: anti-aliasing noise of 1–6 levels was measured on box corners and icons), or keep it and verify subtle colour changes with a pixel-exact comparison, as the workflow now says. |

## I. Risks for the page-by-page phase

- **Shared components land everywhere.** `PageIntro`, `EnterpriseCta`, `.enterprise-card`, `SolutionPage` (six pages), `WorkLab` (home and `/work`) and every page in both locales. A one-page redesign that edits these changes many baselines. Decide shared changes once, before the page work that needs them (D2, D3, E1).
- **Arabic line breaks** shift with any change to size, weight or measure. Every Arabic heading must be checked at the three viewports.
- **Copy is not open.** Several improvements depend on owner copy decisions: B5, the solutions aside label and the demo window strings.
- **The suite's colour threshold** hides light colour changes (H7). Review subtle changes pixel-exactly.

## Recommendations, in order

1. ~~**Approve or amend the design system** and settle the open decisions.~~ Done on 28 October 2026 (see "Decisions" above).
2. ~~**Finish step 5's open review** so the suite is green.~~ The suite was already green (see the correction under "Method").
3. **One zero-diff hygiene pass** (optional): add the 11.2 tokens for existing values, merge the split blocks keeping their effective values (C1–C7), and reformat the minified rules. Verify it is pixel-identical against the suite.
4. ~~**The shared-changes pass.**~~ Done on 28 October 2026. It covered:
   - the CTA spacing (D2);
   - the full-width footer rule (D3);
   - the 700 → 720 merge (E1);
   - removing the number prefixes listed in `page-architecture.md` section 8.

   Every changed screenshot was explained pixel-exactly: removed paper rows (110px at 1440 and 1024, 65px at 390), footer-edge rows at 1440, and the changed label text. The remaining 1–6 level anti-aliasing on box corners and icons was checked visually.
5. **The Arabic labels**, when the owner's wording arrives (`page-architecture.md` section 8). This can land on its own or with the page that shows them.
6. **Then page by page**, following `page-redesign-workflow.md`. A suggested order, following the plan's sequence: Work Lab and demos → Services and the solution pages → Process → About → Contact → the rest of home → Privacy, Presentation and 404.
