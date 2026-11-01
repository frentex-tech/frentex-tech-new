# Frentex Tech design system

Status: approved by the owner on 28 October 2026, together with the decisions in section 13. It describes the system as implemented in the working tree of `feature/nextjs-migration` on that date. Anything marked **Proposal** is not in the code. Anything marked **Decided** is approved but not yet implemented.

This document holds the rules every page follows: principles, tokens and shared components. It does not hold per-page plans.

| Document | Holds |
| --- | --- |
| `src/styles/tokens.css` | Token values. When a value here and a value in a document disagree, `tokens.css` wins. |
| `docs/design-system.md` (this file) | Principles, token architecture, component standards |
| [`docs/page-architecture.md`](page-architecture.md) | Route inventory, page archetypes, page constraints, redesign status, exceptions register |
| [`docs/page-redesign-workflow.md`](page-redesign-workflow.md) | The procedure and checks for redesigning one page |
| [`docs/design-audit.md`](design-audit.md) | Phase 0 findings: inconsistencies, risks, recommendations |
| [`docs/visual-redesign-plan.md`](visual-redesign-plan.md) | The "Systems Map" direction, asset briefs, motion specification and step history. Where its tables differ from this file, this file wins. |

---

## 1. Brand character

Frentex Tech builds connected business software for Saudi companies: platforms, apps, ERP and CRM, integrations and automation. The site is Arabic first, with English under `/en`. Its job is to show that work honestly and lead to a conversation.

- **Direction: "The Systems Map" (خريطة الأنظمة).** The site is drawn like the systems map Frentex delivers to a client. Real interfaces are the nodes; the lines Frentex builds connect them. The direction is implemented in the home hero (plan, step 4), and the owner approved it with this design system on 28 October 2026.
- **Material: flat ink on paper.** Navy ink on a pale sky ground, white surfaces and 1px rules. No glass, blur, glow, orbs, gradient fills or soft shadows.
- **Geometry from the logo.** `public/assets/mark.svg` is an orthogonal F plus one teal right triangle with a 45° hypotenuse. Connectors are orthogonal, and a small teal triangle marks a live port. The triangle is not used as decoration.
- **Tone: calm, exact, honest.** Demos say they are demos. No invented clients, screens, figures or claims.
- **One signature.** The systems map is the memorable element. Its parts (node, connector, port, drafting-grid band) may appear on other pages only where the content really is a system or a sequence. Everything else stays typographic and quiet.

Rules:
1. A structural device (number, eyebrow, divider, connector, label) must encode something true about the content. Numbers mark real sequences only.
2. A page has at most one signature moment: a map band, a process map or a row of demo covers. The dark band (`--fx-deep`) appears at most once per page.
3. A redesign never changes or adds visible copy. If a layout needs new words, list them for the owner first.
4. Stay away from today's generic defaults: cream with a serif and a terracotta accent, near-black with one acid accent, or a broadsheet of hairlines with zero radius. Frentex's hairlines stay paired with its 8–12px radii, white nodes and tinted bands.

---

## 2. Colour

The palette is fixed. Do not add hues. Every colour below already exists in `tokens.css` or in the logo. Contrast ratios are WCAG 2.x, computed against the ground named.

### Brand and text

| Token | Value | Role | Contrast |
| --- | --- | --- | --- |
| `--fx-ink-text` | `#193953` | Body text and headings (headings inherit it from `body`) | 11.44:1 on paper |
| `--fx-ink` | `#173f61` | Primary actions, text links, current navigation, drawn connectors, emphasis | 10.43:1 on paper |
| `--fx-ink-hover` | `#285779` | Primary action on hover | white on it 7.69:1 |
| `--fx-deep` | `#173b56` | The one dark band on a page (home About) | — |
| `--fx-text-2` | `#536b7e` | Paragraphs and every small label | 5.31:1 on paper, 5.02:1 on tint, 5.57:1 on white |
| `--fx-steel` | `#638daf` | Second lines of titles, large figures, graphic strokes, input borders | 3.36:1 on paper: large text and graphics only |
| `--fx-teal` | `#73adbd` | Connection ports only | 2.37:1 on paper, 4.40:1 on ink: never text |
| `--fx-sky` | `#6399b9` | Logo gradient start; documented, not used in CSS | — |
| `--fx-signal` | `#347fcc` | Focus ring only | 3.96:1 on paper |

### Surfaces and lines

| Token | Value | Role |
| --- | --- | --- |
| `--fx-paper` | `#f7fafc` | Page ground, header bar, dialog |
| (no token) `#fff` | `#fff` | Objects on the ground: cards, nodes, demo shell, controls. **Proposal:** `--fx-surface` (section 11.2). |
| `--fx-tint` | `#edf4fa` | Bands and recessed areas: map band, Work Lab band, demo band, CTA band, kanban columns, table headers, secondary-button hover. Also the logo tile and `theme-color`. |
| `--fx-line` | `#dce7ee` | Rules, card borders, header hairline, drafting grid (at 60%) |
| `--fx-line-strong` | `#b8cbd9` | Outlines of quiet controls whose text identifies them (filters, small buttons), the Work Lab card's arrow circle, frame details in the map |

### Demo hues

Each demo has its own colour world. Use these only inside that demo's own surfaces: its Work Lab card, its node on the systems map and its demo page. An element takes a demo's hue with `data-hue="crm|ops|erp"`, which sets `--hue`. The map nodes set it by position.

| Demo | Text | Graphic | Tint | Text on tint |
| --- | --- | --- | --- | --- |
| Madar مدار (CRM) | `--fx-madar` `#5775a2` | — | `--fx-madar-tint` `#dae7f7` | 3.75:1 (large text only) |
| Sayr سير (requests) | `--fx-sayr` `#4c7569` | `--fx-sayr-graphic` `#5a8475` | `--fx-sayr-tint` `#daeae3` | 4.16:1 (large text only) |
| Raseed رصيد (inventory) | `--fx-raseed` `#70614d` | `--fx-raseed-graphic` `#b28a4f` | `--fx-raseed-tint` `#f5ead9` | 5.04:1 |

### Rules

1. Ground: paper. Objects on it: white with a 1px `--fx-line` border. Recessed areas and bands: tint.
2. Text: `--fx-ink-text` for running text and headings, `--fx-text-2` for paragraphs and all labels. Steel is never used for text under 24px (or 19px bold).
3. Actions: `--fx-ink`. A page has one solid ink primary action per region.
4. Teal marks a live connection port and nothing else. It sits on ink or inside an ink outline, and state is never shown by teal alone.
5. `--fx-signal` is reserved for focus.
6. On the dark band, use only the existing light set (section 11.2, "on deep"). All of it is at least 5.3:1 on `--fx-deep`.
7. Status colours exist only inside the demos (decided, section 13), using the status names in section 11.2. A site-wide set is decided when a non-demo page first needs one. Do not introduce status colours on a page.
8. Minimum contrast: 4.5:1 for text, 3:1 for large text, icons, focus rings and control boundaries that carry meaning. Quiet control outlines (`--fx-line-strong`, 1.59:1) are allowed only when the control's own text identifies it.

---

## 3. Typography

**Family:** IBM Plex Sans Arabic, self-hosted WOFF2 in `src/styles/fonts/` (weights 400, 500, 600 and 700), with Arial as fallback. It carries both scripts. No second family: IBM Plex Mono was declined (section 13), so codes and figures use Plex Sans with tracking and tabular figures.

### Scale (`tokens.css`)

| Role | Token | Above 1000px | ≤1000px | ≤720px | Used for |
| --- | --- | --- | --- | --- | --- |
| Hero | not a token: `clamp(48px, 6vw, 84px)` | fluid | fluid | 48px | Home h1 only |
| Page title | `--fx-size-intro` | 64 | 64 | 38 | `PageIntro` h1, demo h1 |
| Section | `--fx-size-section` | 44 | 36 | 32 | Section h2 |
| Heading 3 | `--fx-size-h3` | 28 | 28 | 24 | Card titles, dialog title, process steps |
| Heading 4 | `--fx-size-h4` | 22 | 22 | 20 | Small card titles, map node names, demo toolbar |
| Lead | `--fx-size-lead` | 20 | 20 | 18 | Intro paragraphs, the next-demo link |
| Body | `--fx-size-body` | 17 | 17 | 17 | Default |
| Small | `--fx-size-small` | 15 | 15 | 15 | Navigation, buttons, card body, footer |
| Floor | `--fx-size-floor` | 13 | 13 | 13 | Smallest text: eyebrows, captions, labels, table heads |

The demo h1 uses `min(var(--fx-size-intro), calc(6.4vw - 10px))` above 720px so its hand-set lines never wrap.

### Locale metrics

| Token | Arabic (`:root`) | English (`:root[lang="en"]`) |
| --- | --- | --- |
| `--fx-leading-display` (h1, h2) | 1.3 | 1.1 |
| `--fx-leading-heading` (h3, h4) | 1.4 | 1.25 |
| `--fx-leading-body` | 1.85 | 1.6 |
| `--fx-tracking-display` | 0 | -0.02em |

### Weights

| Weight | Use |
| --- | --- |
| 400 | Body text |
| 500 | Labels, eyebrows, navigation CTA, buttons, node labels. Not a token yet (section 11.2). |
| 600 | Headings (`--fx-weight-heading`), text links, emphasised figures, case facts |
| 700 | Not set anywhere on purpose; it appears only through the browser's default bold on `<b>` and `<strong>` that no rule overrides. |

### Rules

1. Nothing below 13px. Uppercase or letter-spaced Latin labels (codes such as `CRM / SALES EXPERIENCE`) may use 12px with tracking. The logo lockup is exempt.
2. No negative tracking in Arabic; it pulls connected letters apart. English display text uses -0.02em through the token.
3. A two-line title uses `MutedSecondLine`: the second line is `.muted`, which is steel.
4. Headings balance their lines (`text-wrap: balance` is global). Line breaks written in the copy (`<br>`) are part of the design. Check them in both languages at 1440, 1024 and 390.
5. Keep Arabic strings whole in JSX; compose with template literals. Splitting them across text nodes shifts rendering.
6. Latin strings inside Arabic, such as codes and phone numbers, get `dir="ltr"` on an inline element around the string. Never put it on the block or flex container itself: the label would then align to the far side of its column.
7. Counts, stage numbers and quantities use `font-variant-numeric: tabular-nums`.
8. New rules set `font-weight` explicitly on `<b>` and `<strong>`.
9. The heading level follows the document outline and the size follows the role. Never choose a heading level for its size.

---

## 4. Layout

### Container and gutters

`.wrap` is the only page container: `max-width: 1232px` including its inline padding, centred.

| Viewport | Gutter (`padding-inline`) | Content width at that size |
| --- | --- | --- |
| above 1000px | 40px | up to 1152px |
| ≤1000px | 28px | viewport − 56 |
| ≤720px | 22px | viewport − 44 |
| ≤360px | 16px | viewport − 32 |

Every section aligns to the content edge of `.wrap`. A full-bleed band (header, map band, Work Lab, About band, demo band, footer) is a full-width element with a `.wrap` inside it. Rules on a band's edge span the page; rules inside a section stop at the content edge.

### Measures

| Content | Max width | Where |
| --- | --- | --- |
| Lead paragraph | 780px | `.page-intro > p` |
| Paragraphs in a section | 780px | `.measure` (Presentation's closing) |
| Dialog | `min(590px, 100% − 32px)` | `.brief-dialog` |

Narrow columns align to the start edge of the content, not to the centre. Long text gets its line length from a ruled-row layout (title beside text, as on Privacy) or from `.measure`, never from a centred container.

### Grid patterns

| Pattern | Columns | Gap | Collapses |
| --- | --- | --- | --- |
| Section header `.section-top` | 1fr 1fr (title, intro), aligned to the end | 70px, then 35px at ≤1000 | 1 column at ≤720 |
| Card grid `.card-grid` | 3 | 24px | 2 at ≤1000, 1 at ≤720 |
| Detail grid `.detail-grid` | 2 | 24px | 1 at ≤720 |
| Hero plate `.hero-copy` | 1.35fr 1fr | 64px, then 40px | stacks at ≤900 |
| Demo heading `.project-heading` | 1.25fr 1fr | 70px, then 35px | stacks at ≤720 |
| Process strip `.process` | 4 | ruled columns | 2 at ≤720 |
| Two-column text `.case-story`, `.about-grid` | 1fr 1fr | 80px | 1 at ≤720 |

New layouts use these patterns or extend them. Do not add another grid that differs only by a few pixels.

### Vertical rhythm

| Element | Block padding above 1000 / ≤1000 / ≤720 |
| --- | --- |
| `.section` | 110 / 80 / 65 |
| `.page-intro` | 95 top, 64 bottom; 64 / 32 at ≤720 |
| `.hero` | 88 top; 56 at ≤900 |
| `.about-section` (dark band) | 90; 65 at ≤720 |
| `.demo-section` (demo band) | 50; 25 at ≤720 |
| `.map-band` | 40 top, 32 bottom |
| `h2` | 20px below |

Two neighbouring sections never stack two full paddings; the gap between them is one section space. The CTA band applies this: after a paper section it drops its own top padding (`.section.wrap + .cta-section`); after a band, such as the Work Lab, it keeps it. A new pair of paper sections follows the same rule.

### Bands

- **Paper** is the default.
- **Tint** separates a self-contained region: the Work Lab, the demo band, the CTA band. The map band adds the 24px drafting grid.
- **Deep** is the one dark band, at most once per page.
- Do not put two tint bands next to each other.

### Breakpoints

Media queries are desktop-first `max-width`. CSS custom properties cannot be used in `@media`, so the values live here.

| Width | What changes |
| --- | --- |
| 1000px | Tablet: 28px gutters, section title 36px, three-column grids become two, tighter gaps |
| 900px | The header switches to the menu button; the hero plate stacks; the systems map turns vertical |
| 720px | Phone: 22px gutters, the type scale steps down, layouts become one column, compact header. The inner-page rules that used 700px moved here on 28 October 2026. |
| 380px, 360px | Narrowest phones: header spacing, then 16px gutters |

### Responsive rules

1. No horizontal page overflow at any width. A test checks every page.
2. Use logical properties (`inline-start`, `inset-inline`, `padding-block`). Add a `[dir="ltr"]` rule only where a logical property cannot express the layout, or where an element sets its own `direction`.
3. Check every change at 1440, 1024 and 390, in Arabic and in English.
4. Interactive targets are at least 44px. Dense demo controls may go to 40px.

---

## 5. Shape, borders and depth

| Token | Value | Use |
| --- | --- | --- |
| `--fx-radius-control` | 8px | Buttons, inputs, chips, badges, filters, skip link |
| `--fx-radius-node` | 10px | Map nodes; cards nested inside a panel |
| `--fx-radius-panel` | 12px | Cards, CTA band, dialog, demo shell, kanban columns, panels inside the demos |

Allowed exceptions: `50%` for circular elements (the Work Lab arrow circle, dots), 18px and 2px for the phone frame and its notch drawn in the map, and 4px for the process map's small stage nodes. `.request-list` writes the panel's 12px as a literal, which a token should replace.

Borders:

| Border | Use |
| --- | --- |
| 1px `--fx-line` | Card edges, rules, table rows, the header hairline |
| 1px `--fx-line-strong` | Quiet controls |
| 1px `--fx-steel` | Text inputs, select, textarea |
| 1px `--fx-ink` | Secondary button |
| 2px `--fx-ink` | Map connectors, the bus and the bracket |
| 3px demo hue, `inline-start` | The accent of a system node |

Depth: none. No `box-shadow` for elevation, no `backdrop-filter`, no gradient fills. A white surface with a 1px line on paper or tint is the only elevation. The drafting grid on map bands is the only background image. The dialog backdrop is `#102a4166`.

Layering: `z-index: 1` lifts map nodes above the bus, `20` is the sticky header and `99` the skip link. The dialog uses the browser's top layer. New layers use these values (proposed tokens in section 11.2).

---

## 6. Iconography and imagery

**Icons** come only from `src/components/visual/icons.tsx`:
- 24px grid, 1.75px stroke, square caps, `currentColor`, `aria-hidden`. The link or button around an icon carries the name.
- Sizes in use: 14px (map sequence), 16px (arrows inside link text; the `check` in the process map), 18px (buttons and the header CTA), 24px (menu and close).
- `forward`, `forward-down` and `forward-line` mirror in right-to-left text. `external`, `left` and `right` never mirror.
- Arrows written in copy (↖ ↗ ← → ↓) are drawn by `ArrowText`. The words stay as written, and the arrow is not read aloud.
- Add an icon by adding a path in the same grammar. No icon library, and no Unicode glyphs as icons in new components.

**Logo:** `mark.svg` is never mirrored, recoloured or redrawn. The lockup "Frentex / TECH" is `dir="ltr"`.

**Imagery:**
- No stock photography, AI imagery or people.
- A photograph is used only if it is real (plan FX-B02).
- Product visuals are rendered from the real demo components, not from screenshots or hand-copied markup.
- Supplied assets (share images, demo wordmarks) follow the specifications in plan sections E and J.

---

## 7. Motion

| Token | Value | Use |
| --- | --- | --- |
| `--fx-dur-1` | 160ms | Hover and colour changes, header hairline |
| `--fx-dur-2` | 280ms | Elements appearing |
| `--fx-dur-3` | 520ms | Drawn connectors |
| `--fx-ease-out` | `cubic-bezier(.2, .7, .2, 1)` | Default |
| `--fx-ease-in-out` | `cubic-bezier(.65, 0, .35, 1)` | Drawing |

Rules:
1. Hidden starting states exist only under `html[data-motion="ok"]`, which `RootDocument` sets when there is no reduced-motion preference. Without JavaScript, with reduced motion, and in the test suite, content is in its final state from the first paint.
2. `prefers-reduced-motion: reduce` removes every transition and animation (the `prefers-reduced-motion` block in `site.css`).
3. Animate only `transform`, `opacity` and colour.
4. Every animation is finite and plays at most once per page view. Content that waits for an observer appears after 2.5s even if the script never runs.
5. Never animate the h1; it is the Largest Contentful Paint.
6. Hover is a colour change at `--fx-dur-1`. Map system nodes also lift 2px, under the motion gate only.
7. Reveal on view with one `IntersectionObserver` that disconnects after the first reveal, as `MapFigure` does. No animation library.
8. Not used: parallax, scroll-jacking, loops, page transitions, animated counters, typing effects, cursor effects.

The full motion plan is in plan section F. Every transition in `site.css` now uses the motion tokens.

---

## 8. Interaction states

| Element | Rest | Hover | Keyboard focus | Selected or current | Disabled |
| --- | --- | --- | --- | --- | --- |
| Primary button `.button.primary`, `.nav-cta` | Ink fill, white text | `--fx-ink-hover` fill | 3px `--fx-signal` outline, 5px offset | — | 50% opacity, `not-allowed` (global `button:disabled`) |
| Secondary button `.button.secondary` | 1px ink outline, ink text | Tint fill | Same ring | — | Same |
| Text link `.text-link` | Ink, 600 | Underline, 0.4em offset | Same ring | — | — |
| Navigation link | `--fx-text-2` | Ink | Same ring | `aria-current="page"`: ink with a 2px underline at 0.65em | — |
| Filter `.filter` | `--fx-line-strong` outline, text-2 | — | Same ring | `aria-pressed="true"` (`.active`): ink fill, white text | — |
| Small button `.small-button` | White, `--fx-line-strong` outline, ink text | — | Same ring | `.filled`: ink fill | Global |
| Negative action `.small-button.danger` | `#995d56` text, `#d9bbb7` outline | — | Same ring | — | Global |
| Text field, select, textarea | White, 1px steel, `#254962` text | — | 3px signal outline, 3px offset | — | — |
| Map system node | White, hue accent | Ink border, lift 2px | Ring, lift 2px | — | — |
| Work Lab card `.lab-card` (one link) | White, hue edge, arrow circle in `--fx-line-strong` | Ink border and arrow circle, lift 2px | Ring around the card, lift 2px | — | — |

There is no designed loading state (the site is static) and no designed error state beyond the browser's native form validation. Both are gaps (section 11.3).

### Feedback and confirmation

1. The result of an action is announced in a `role="status"` region next to it: the Work Lab filter count, the demo status line and the brief download status. There are no toasts.
2. A form that produces something shows the result in place, moves focus to the next action and offers a way back. The brief dialog moves focus to Download, and Edit returns focus to the first field.
3. Status text uses the action's own verb and states what happened.
4. Empty states say what is missing and what to do next.
5. A negative action in the demos uses `.small-button.danger`. The site has no destructive actions.

---

## 9. Accessibility requirements

These hold on every page and are not traded for visual effect.

- A skip link is the first focusable element. There is one `main` landmark and one h1.
- `<html>` has `lang` and `dir`. The language link carries `lang` and `hreflang`, and mixed-direction strings carry `dir`.
- Every interactive element shows the focus ring. Never remove an outline without replacing it.
- Targets are at least 44px; 40px is the minimum in dense demo rows.
- Contrast follows section 2.
- Icons are `aria-hidden`; icon-only buttons have an `aria-label`.
- The mobile menu sets `aria-expanded` and `aria-controls`, closes on Escape and closes when a link is followed.
- Dialogs use native `<dialog>` with `showModal()` and `aria-labelledby`. The close button is labelled. Escape and a backdrop click close the dialog, and focus is managed as in section 8.
- Decorative drawings are `aria-hidden`. A figure has a caption and a label.
- Future demo previews inside cards are `inert` and `aria-hidden`, so they create no duplicate controls, ids or live regions.
- Reduced motion is honoured (section 7). Live regions are polite.

---

## 10. Consistency: shared and page-specific

**Always shared; never restyled on one page:**
- `PageShell`: skip link, header, main and footer
- `.wrap`, its gutters and the breakpoints
- the type scale, locale metrics and weights
- colour roles
- buttons and text links
- form controls and the focus ring
- icons and `ArrowText`
- the card surface (`.enterprise-card`) and the CTA band (`EnterpriseCta`)
- the eyebrow and `MutedSecondLine`
- motion tokens and the motion gate
- the brief dialog

**May vary by page:**
- which sections a page has, and their order;
- the number of columns, within the patterns in section 4;
- the band behind a section;
- the page's one signature moment;
- page-specific components (`SystemsMap`, `WorkLab`, the demos).

**One-off policy:**
1. Before writing a page rule, check section 12 for a component that already does the job.
2. Use tokens. A value that is not a token is either the nearest token, or it is justified in the change and recorded in the exceptions register in `page-architecture.md`.
3. No new hex values, radii, shadows, font sizes or breakpoints without an entry in this document.
4. Extend a component's existing rule block. Do not add a second block for the same selector later in the file; the audit found seven such split blocks, some with conflicting values.
5. Styles live in `src/styles/site.css`, in a commented section per component. That is the practice since step 3, and the test suite selects by these class names. No CSS Modules: the owner decided against plan section C's proposal (section 13).
6. Page-specific classes are named after their component (`map-*` for the systems map). New page-specific blocks follow that pattern.

---

## 11. Token architecture

Three groups: existing tokens to keep (11.1), proposed names for values that already exist (11.2), and real gaps that need a decision (11.3). Nothing in 11.2 or 11.3 is implemented. Adopt a proposal only after approval, and then only with zero visual change unless the change says otherwise.

### 11.1 Existing tokens (`src/styles/tokens.css`): keep

Use counts are `var()` references in `site.css` on 28 October 2026.

| Group | Token | Value | Purpose | Uses |
| --- | --- | --- | --- | --- |
| Brand | `--fx-ink` | `#173f61` | Actions, links, connectors | 23 |
| | `--fx-ink-text` | `#193953` | Running text | 3 |
| | `--fx-deep` | `#173b56` | Dark band | 1 |
| | `--fx-steel` | `#638daf` | Second lines, figures, input borders | 5 |
| | `--fx-sky` | `#6399b9` | Logo gradient start | 0 |
| | `--fx-teal` | `#73adbd` | Ports | 2 |
| | `--fx-ink-hover` | `#285779` | Primary hover | 2 |
| | `--fx-signal` | `#347fcc` | Focus | 2 |
| | `--fx-text-2` | `#536b7e` | Paragraphs, labels | 35 |
| Surfaces | `--fx-paper` | `#f7fafc` | Ground | 5 |
| | `--fx-tint` | `#edf4fa` | Bands, recessed areas | 13 |
| | `--fx-line` | `#dce7ee` | Rules, borders | 27 |
| | `--fx-line-strong` | `#b8cbd9` | Quiet control outlines | 5 |
| Shape | `--fx-radius-control` | 8px | Controls | 11 |
| | `--fx-radius-node` | 10px | Nodes | 2 |
| | `--fx-radius-panel` | 12px | Panels | 9 |
| Demo hues | `--fx-madar`, `--fx-madar-tint` | `#5775a2`, `#dae7f7` | Madar | 2, 1 |
| | `--fx-sayr`, `--fx-sayr-graphic`, `--fx-sayr-tint` | `#4c7569`, `#5a8475`, `#daeae3` | Sayr | 4, 2, 2 |
| | `--fx-raseed`, `--fx-raseed-graphic`, `--fx-raseed-tint` | `#70614d`, `#b28a4f`, `#f5ead9` | Raseed | 3, 1, 2 |
| Type | `--fx-font` | Plex Sans Arabic, Arial, sans-serif | Family | 2 |
| | `--fx-size-intro` … `--fx-size-floor` | section 3 | Scale | 1–35 each |
| | `--fx-weight-heading` | 600 | Headings | 1 |
| | `--fx-leading-display`, `-heading`, `-body` | section 3 | Line height per locale | 1, 5, 7 |
| | `--fx-tracking-display` | 0, English -0.02em | Display tracking | 1 |
| Motion | `--fx-dur-1`, `-2`, `-3` | 160, 280, 520ms | Durations | 7, 2, 1 |
| | `--fx-ease-out`, `--fx-ease-in-out` | section 7 | Easing | 9, 1 |

### 11.2 Proposal: names for values that already exist

Each proposed token takes a value that is already in `site.css`, so adopting it changes no pixels.

| Proposed token | Existing value | Where the value is today |
| --- | --- | --- |
| `--fx-surface` | `#fff` | Cards, nodes, demo shell, lead cards, controls. Written as `#fff` or `white`. |
| `--fx-on-ink` | `#fff` | Text on ink: header CTA, skip link, primary button, active filter, filled small button |
| `--fx-backdrop` | `#102a4166` | Dialog backdrop |
| `--fx-field-text` | `#254962` | Input, select and textarea text |
| `--fx-on-deep` | `#edf7fe` | Dark band text and headings |
| `--fx-on-deep-lead` | `#e0edf7` | Dark band lead paragraph |
| `--fx-on-deep-2` | `#b3cbdc` | Dark band paragraphs (`#b5cddd` on its chips is a near-duplicate) |
| `--fx-on-deep-muted` | `#94b4cc` | Dark band eyebrow (`#99b6ce` on the second title line is a near-duplicate) |
| `--fx-weight-label` | 500 | Labels, eyebrows, buttons, navigation CTA (14 declarations) |
| `--fx-size-hero` | `clamp(48px, 6vw, 84px)` | Home h1 |
| `--fx-container` | 1232px | `.wrap`, `.page-intro` |
| `--fx-gutter` | 40px, 28px at ≤1000, 22px at ≤720, 16px at ≤360 | `.wrap` and the mobile navigation panel |
| `--fx-section-space` | 110px, 80px at ≤1000, 65px at ≤720 | `.section` and `.start-section` |
| `--fx-measure-lead` | 780px | `.page-intro > p` |
| `--fx-z-raised`, `--fx-z-header`, `--fx-z-skip` | 1, 20, 99 | Map nodes, header, skip link |
| `--fx-focus-width` | 3px (offset 5px for links and buttons, 3px for fields) | Global focus rules |

**Status roles, mapped to the demos' de facto values.** These are names for colours that already exist. Decided: they are used inside the demos only (section 13).

| Proposed token | Existing value | Where |
| --- | --- | --- |
| `--fx-status-ok` | `var(--fx-sayr)` | In-stock tag, request status pill |
| `--fx-status-attention` | `var(--fx-raseed)` on `var(--fx-raseed-tint)` | Low-stock tag |
| `--fx-status-negative` | `#995d56`, border `#d9bbb7` | Reject button in Sayr |
| `--fx-status-message` | `#467964` | Demo status line. It is close to `--fx-sayr`; merging them changes pixels and needs approval. |

**Consolidation candidates.** These change pixels slightly, so each needs approval and a baseline review:
- `#47667f`, `#4a6a7c` and `#4c6e82` (labels and values in the dialog and in Sayr) into `--fx-text-2` or `--fx-ink-text`. `#638aa6` and `#466c86` are already gone with the home redesign.
- the near-duplicate dark-band pairs above;
- `#80b3d9`, the mouse-focus outline on fields, which the keyboard rule supersedes.

The three navies (`--fx-ink`, `--fx-ink-text`, `--fx-deep`) differ by a few units. They are kept as they are: every screenshot depends on them, and they have distinct roles.

### 11.3 Gaps that need a decision

| Gap | Today | Recommendation |
| --- | --- | --- |
| Spacing scale | About 50 distinct spacing values from 2px to 115px; no tokens | **Proposal:** a scale built from the most-used values: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64, 80, plus the section space. A page snaps to it when it is redesigned; untouched pages stay as they are. No repository-wide refactor. |
| Form error state | Native validation bubbles only | Define an inline error pattern (text under the field, `aria-describedby`, an icon plus text, never colour alone) before the first page needs one. It needs a colour decision. |
| Information and warning colours outside the demos | None | **Decided:** none until a non-demo page needs them; then each value goes to the owner. Until then use text-2 on tint (the `.disclosure` pattern). |
| Loading indicator | None; the site is static | None needed now. |
| Elevation | Deliberately none | Keep "no shadows" as a rule rather than defining shadow tokens. |
| Utility typeface | Plex Sans with tracking | **Decided:** no IBM Plex Mono. |
| Dark colour scheme | Not supported; tests run light | Out of scope. |

---

## 12. Component standards

Each entry records what exists. "Target" lines repeat what the plan has already proposed; they are not implemented.

### 12.1 Application shell
- **Source:** `RootDocument` (`<html lang dir>`, fonts, `tokens.css`, `site.css`, the inline motion gate, `theme-color` `#edf4fa`); `PageShell` (skip link, `SiteHeader`, `<main id>`, `SiteFooter`, optional `after` slot).
- **Rules:** every page renders inside `PageShell`. Demo pages pass `mainId="project-root"` and their own skip label. The root layouts per locale are `src/app/(ar)/layout.tsx` and `src/app/en/layout.tsx`; 404 is `src/app/global-not-found.tsx`.

### 12.2 Header and navigation
- **Source:** `SiteHeader`, `LanguageSwitch`.
- **Structure:** brand lockup (40px mark, "Frentex / TECH"), then four navigation links (`headerNavRoutes`), then the language link when the page exists in the other language, then the CTA (`.nav-cta`, solid ink, forward icon).
- **Size:** bar at least 76px high (64px at ≤720), sticky, paper background. A `--fx-line` hairline appears after 8px of scroll or while the menu is open (`data-raised`).
- **Current page:** `aria-current="page"` with an ink underline.
- **Mobile, ≤900px:** a 44px menu button (menu and close icons). The navigation becomes a panel under the bar with 48px rows separated by rules. The CTA shrinks to 40px at ≤720 and loses its icon. The language link sits last.
- **Accessibility:** `nav` is labelled; the menu button has `aria-expanded` and `aria-controls` and a label that changes; Escape and following a link close the menu.

### 12.3 Footer
- **Source:** `SiteFooter`.
- **Structure:** like the header, a full-width band (`footer.site-footer`) carries a 1px top rule across the page, and a `.footer-shell.wrap` inside it aligns the content. Brand and tagline sit on the start side; contact link, Privacy, country and phone (`dir="ltr"`) and copyright on the end side. 48px block padding.
- **Text:** 15px; copyright 13px.
- **Responsive:** stacks at ≤720.

### 12.4 Page container and sections
- **Source:** `.wrap`, `.section`, `.section-top`, the band classes.
- **Rules:** a section is `.section.wrap`, or a band element with a `.wrap` inside. A section header is `.section-top`: eyebrow and h2 on the start side, intro paragraph on the end side.

### 12.5 Page headers
| Variant | Source | Contents | Used on |
| --- | --- | --- | --- |
| Page intro | `PageIntro` (`.page-intro`) | Eyebrow, h1 (one line or `MutedSecondLine`), lead up to 780px | Every inner page and 404 |
| Hero plate | `HomePage` (`.hero-copy`) | Eyebrow with dot, two-line h1 (second line steel), intro, actions, caption; title on the start side, the rest on the end side; stacks at ≤900 | Home |
| Demo header | `ProjectView` (`.project-head`) | Back link, eyebrow, three-line h1, description, sample-data badge, three case facts | Demo pages |

**Intro with a figure:** `PageIntro` takes an optional `aside`. With it, the intro is two columns (`.page-intro-split`): the text, and the figure on the end side (at most 360px), stacking below the lead at ≤900. Solution pages put their map locator there. Without an `aside`, the markup is a single column as before. An optional `actions` slot puts actions under the lead (in `.actions`); About puts its company-profile download there.

**Eyebrow** (`.eyebrow`): 13px, weight 500, text-2, 23px below (15px at ≤720). Its text is copy.
- A label carries a number only where the order is real, as in the Process stages.
- **Decided, waiting for wording:** on Arabic pages, page and card labels are Arabic, and product codes stay Latin (section 13).

### 12.6 Breadcrumbs and back links
- No breadcrumbs. The site is two levels deep, and the eyebrow path ("FRENTEX / PLATFORMS") is a label, not a link.
- **Back link** (`.back-link`, demo pages only): 15px text-2, with the arrow drawn by `ArrowText`.
- **Rule:** do not add breadcrumbs. A deeper page uses a back link to its parent.

### 12.7 Buttons and links
| Variant | Class | Size | Use |
| --- | --- | --- | --- |
| Primary | `.button.primary` | At least 48px high, padding 11×22, 15px weight 500, 8px radius, icon gap 10px | The main action of a region; one per region |
| Secondary | `.button.secondary` | Same | The alternative action beside a primary |
| Header CTA | `.nav-cta` | 44px (40px at ≤720), padding 10×18 | Header only |
| Text link | `.text-link` | 15px weight 600 ink, icon gap 8px | Inline navigation such as "See how we work" |
| Small button | `.small-button` (`.filled`, `.danger`) | 44px, padding 9×15, 13px | Controls inside the demos; 40px in dense rows |
| Filter | `.filter` | 44px, padding 8×16, 13px | Toggle buttons in a group |
| Icon button | `.menu-toggle`, `.dialog-close` | 44×44 | Menu, close |

Rules:
- Use a link (`<a>`/`Link`) for navigation and a `<button>` for actions. Use the same visual variant for both.
- Arrows in labels come from `ArrowText` or `Icon` at 16–18px.
- The global `button:disabled` style applies.
- Actions sit in `.actions` (wraps, 25px gap; 18px in the hero on phones).
- **Card links:** a clickable card has one link: its title, named by the visible text. The link is stretched over the card by a shared rule (`:is(.lab-card-link, .link-card-link, .next-project a)::after`), and the focus ring is drawn around the card. A visible cue, such as an arrow or "Explore scope and deliverables ↗", is text or decoration, never a second link. Add a new card's link class to that rule, not a new copy of it.

### 12.8 Form controls
- **Source:** global `input, select, textarea`; the brief dialog; the demo search.
- **Style:** full width, padding 11×14, 1px steel, 8px radius, white, `#254962` text. Font size 16px, the size at which iOS Safari does not zoom on focus; the demo search uses 15px. Labels wrap their control (15px; `#47667f` in the dialog, 13px text-2 in the demo tools), with the control 6px below.
- **Focus:** 3px signal outline with a 3px offset.
- **Validation:** native only (`required`, `minLength`, `maxLength`). Inline error styling is a gap (11.3).
- **Rules:** every control has a visible label; placeholders are examples, never labels. Group related controls in `.demo-tools` (flex, 15px gap, labels 200–340px).

### 12.9 Cards and panels
| Component | Class | Surface | Use |
| --- | --- | --- | --- |
| Card | `.enterprise-card` | White, 1px line, 12px radius, padding 32 (24 at ≤720) | Link cards (below) and the Contact channels |
| Recessed card | `.enterprise-card.contact-brief` | The card in tint | The secondary of two channels (Contact's brief, beside the white business panel, at 1fr / 1.35fr) |
| CTA band | `.enterprise-cta` in a `.cta-section`, via `EnterpriseCta` | Tint, 1px line, 12px radius, padding 48 (28 at ≤720) | The closing call to action on inner pages |
| Map node | `.map-node` (`.map-frame`, `.map-system`) | White, 1px line, 10px radius, padding 16 | The systems map |
| Link card | `.enterprise-card.link-card` | The card surface; the title is the one link (`.link-card-link`), with the cue (`.link-card-cue`) at the foot so cues align across a row; ink border and 2px lift on hover | Services (with a map locator) and Presentation references (external links, new tab) |
| Spec sheet | `.spec-sheet` with `.spec-row` | One white panel, rows ruled by `--fx-line`: an `h2` label (h4 size) and the content, 1fr / 2.2fr, stacking at ≤720 | Solution pages |
| Work Lab card | `.lab-card` | The map's system node, enlarged: white, 1px line, 3px `--hue` on the inline-start edge, 12px radius, padding 24 (20 at ≤720) | The Work Lab (section 12.20) |
| Next-demo node | `.next-project` | The same node grammar in the next demo's hue | Foot of each demo page |
| Demo shell and panels | `.demo-shell`, `.kanban-column`, `.lead-card`, `.request-list`, `.request-detail`, `.purchase-list` | White shell with the demo's 3px hue edge, on the tint band; tint or paper panels inside, 12px; lead cards white at 10px | The three demos |

Rules:
- A card is a white surface with a line. It has no shadow and no gradient.
- A card nested in a panel uses the node radius.
- A card's heading size follows its role: h3 size for a primary card title, h4 for a small one.
- **Target (plan):** different content gets different form. A problem, a solution and deliverables should not all be the same card (plan section C).

### 12.10 Dialogs and drawers
- **Dialog:** `BriefDialog`, a native modal `<dialog>`. Paper background, 1px line, 12px radius, padding 32 (28×22 at ≤720), at most 90vh, scrolls inside. A 44px close button sits at the inline end. The form is a grid with a 17px gap; the result appears in place.
- **Opening it:** `OpenBriefButton` within a `BriefDialogProvider`.
- **Drawers:** none. Do not add one; the mobile navigation panel is the only overlay.

### 12.11 Lists, tables and data display
| Component | Class | Notes |
| --- | --- | --- |
| Data table | `.demo-table` inside `.table-wrap` (scrolls sideways) | 15px body, 13px tint header, rows ruled with `--fx-line`, cells do not wrap, padding 18×15 (13×9 at ≤720) |
| Selectable list | `.request-list` with `.request-select` | Rows are buttons; the selected row has a tint fill and a 3px inset bar in Sayr's hue |
| Fact row | `.case-facts` | Three columns of label (13px text-2) and value (15px weight 600) above a rule; stacks at ≤720 |
| Activity and purchase lists | `.activity-list`, `.purchase-item` | 13px and 15px, ruled rows |
| Ruled rows | `.ruled-rows` with `.ruled-row` | A title (`h2` or `h3`, h4 size) on the start side, its text on the end side, rows ruled top and bottom; one column at ≤720. Home solutions (a list, with tags; no accordion, no numbers) and the Privacy policy sections. |
| Tags | `.tags` | Labels split from a " · " string in the copy: 13px text-2, `--fx-line-strong` outline, 8px radius |
| Process strip | `.process` | Four ruled columns: steel number, h3, text, output label and value |
| Ruled grid | `.ruled-grid` | Four peers two by two, separated by rules, without card surfaces; `h2` titles at h3 size (About principles). One column with top rules at ≤720 |
| Ruled columns | `.ruled-columns` | Peers side by side, separated by rules, without numbers or card surfaces: the ways to start (Services), the working practices (Process) and the topics (Contact). Titles at h4 size, whether `h2` or `h3`. Stacked with top rules at ≤720 |
| Process map | `.process-map` with `.process-stage` | An ordered list on one vertical ink connector. Each stage row holds a node, the label, `h2` title and text, and the output (13px label, 15px weight 500 value). The node matures with the work (`data-state`): dashed steel outline (sketch), ink outline (defined), ink fill (built), ink fill with the `check` icon (accepted), and the teal port pointing on down the page (live). The output drops under the text at ≤720. Nodes are `aria-hidden`; the labels carry the numbers. |
| Item list | `.deliverables` | Discrete items from a list written as one sentence in the copy (split on «؛» and ";", the final full stop dropped): 15px, `--fx-line-strong` outline, 8px radius. English items start with a capital through `::first-letter`; never Arabic, where a separate first-letter box can break letter joining. |

Rules: tables keep their text unwrapped and scroll inside `.table-wrap`, never the page. Figures use tabular numbers.

### 12.12 Tabs and filters
- No tabs. The Work Lab filter (`.filter-row`) is a group of toggle buttons (`role="group"`, `aria-pressed`) with a live count (`role="status"`).
- **Rule:** use toggle buttons to filter one list in place. Introduce tabs only for switching between panels of different content, and specify them here first.

### 12.13 Chips, badges and notices
| Component | Class | Style |
| --- | --- | --- |
| Disclosure | `.disclosure` | 13px text-2 on `#e2ebf1`, 8px radius, padding 6×12 (4.61:1) |
| Badge | `.project-badge` | 13px text-2 on tint, 8px radius |
| Value chip | `.about-values span` | 13px, light outline on the dark band |
| Status tag | `.stock-tag`, `.request-detail .status-pill` | 13px, 1px `currentColor` outline, 8px radius; the low-stock tag has a Raseed tint fill |
| Note | `.demo-notice`, `.brief-note` | 13px text-2 under the element it qualifies |

Rule: a sample-data or honesty notice stays visible and next to what it qualifies. It is never hidden in a tooltip.

### 12.14 Status messages (instead of toasts and alerts)
- `#demo-status` (`role="status"`, polite, 13px), `#filter-status`, `#brief-status`.
- **Rule:** no toasts or alert banners. Write the message into a status region next to the control that caused it.

### 12.15 Empty states
- `.empty-state` (13px text-2, 20px block padding) in the Madar search and the Raseed purchase list.
- **Rule:** say what is missing and what to do next, in the interface's voice, as the existing copy does.

### 12.16 Error states
| State | Where | Pattern |
| --- | --- | --- |
| Unknown URL | `global-not-found.tsx` → `NotFoundPage` | Page intro with its actions under the lead: a primary button home and a text link to Services (the navigation's label), the two ways forward the lead names. Arabic for every locale (a static-export limit). |
| Unknown demo | `ProjectView` (`?project=` invalid) | Section with h1 plus one primary button back to the Work Lab |
| No JavaScript on the demo page | `ProjectPage` `<noscript>` | Title, explanation and link |

Rule: an error page states what happened and offers the way forward its text names; one primary action. It never apologises.

### 12.17 Loading
None. Static pages render complete. `Suspense` fallbacks exist only for query-string reads (the demo page and the language link), and they render final content.

### 12.18 Pagination
None. Sequential navigation between demos is the "next demo" node (`.next-project`, `data-hue` of the next demo): an eyebrow and a 20px link with an arrow, with the link stretched over the node. On phones the label sits above the link.

### 12.19 Systems map (signature)
- **Source:** `SystemsMap`, `MapFigure`; styles under the "Home hero" section of `site.css`.
- **Parts:** two channel frames, a bracket, the integration connector with its teal port and label, and three system nodes on a bus. The nodes are links to the demos and carry their 3px hue accent. Above it sits the sequence line; below it, the caption.
- **Responsive:** vertical at ≤900px and single-column at ≤720px. No horizontal scroll.
- **Motion:** drawn once on view, under the gate (section 7).
- **Honesty:** nothing travels between demos, and every string is existing copy.
- **Data:** each system node shows a state taken from its demo's own sample data (`projects` content), the same data its demo and its Work Lab preview use.
- **Reuse:** other pages may reuse these parts (node, connector, port, drafting-grid band) for real systems or sequences only. The Work Lab cards, the demo shells and the next-demo node reuse the system node. The map locator (12.21) reuses the whole map in outline, and the process map (12.11) its connector, nodes and port for a real sequence. Home's closing open node (`.open-node`) is the process map's sketch state at a larger size, with a dashed stub reaching toward the text; it is hidden at ≤720. About's directions figure (`DirectionsFigure`, `.dir-node`) draws the Madar node twice, in Arabic right to left and in English left to right, from each language's demo content; it is `aria-hidden` because the principle beside it says the same.

### 12.20 Work Lab cards and demo previews
- **Source:** `WorkLab` (home `#work` and `/work`), and the `preview` prop of `CrmDemo`, `OpsDemo` and `ErpDemo`; styles under "Work Lab cards" in `site.css`.
- **Idea:** each demo is its node on the systems map, enlarged. The card holds the existing label, title and text beside a window onto the demo itself, so a card can never show something its demo does not do.
- **Card:** see 12.9. Above 1000px the text takes about a third of the width and the window the rest; at ≤1000 the window sits under the text, and the arrow moves to the top end corner. Hover turns the border ink and lifts the card 2px (motion gate).
- **One link per card:** the title is the link, named by its visible text, and stretched over the whole card. The focus ring is drawn around the card, and the arrow circle is decoration (`aria-hidden`).
- **Preview rules:**
  - Render the real component with `preview`. It shows the first view only: no tools row, no ids, and for Raseed no order controls or purchase list.
  - Wrap it in `.lab-preview` with `inert` and `aria-hidden`, so it adds no focus stops, names or live regions.
  - Full size, never scaled, so no text drops below 13px. The demo fits the window's width with its own responsive layout and is cropped only at the bottom (300px, 280px at ≤1000, 260px at ≤720).
  - On phones Raseed's table keeps only the item and its status.
  - Never put a preview on a demo page: two copies of a demo's classes would confuse the demo's tests and its users.
- **Headings:** `h3` under the section heading on home; `h2` on `/work`, where the section heading is not shown (`withHeader={false}`).
- **Filter:** All, then the demos in map order (Madar, Sayr, Raseed).

### 12.21 Map locator
- **Source:** `MapLocator` (`src/components/visual/MapLocator.tsx`); styles under "Map locator" in `site.css`.
- **Idea:** the systems map in outline. The part a service covers is drawn in ink; the rest is in `--fx-line-strong`. One drawing explains all six services and how they relate.
- **Parts by service:**

  | Service | Part in ink |
  | --- | --- |
  | Platforms | the website frame |
  | Apps | the phone frame |
  | Business | the three systems |
  | Integration | the connections, with the teal port |
  | Automation | the token on the connection |
  | Support | everything, with the teal port |

- **Where:** at the top of each service card (up to 240px) and in each solution page's intro (`PageIntro` `aside`, up to 360px).
- **Drawing:** drawn left to right in a 240×80 viewBox and mirrored with `scaleX(-1)` on right-to-left pages, like the hero map. It has no text, so nothing needs to stay unmirrored. Strokes do not scale (`vector-effect: non-scaling-stroke`).
- **Accessibility:** `aria-hidden`; the card or page text names the service.
- **Motion:** static. Drawing the inked part on hover belongs to the motion pass.

### 12.22 Not present
There is no sidebar, dropdown menu, tooltip, toast, drawer, tab set, pagination or breadcrumb trail. Do not add one for a single page. If a page needs one, specify it in this section first, with variants, states and accessibility, then build it once as a shared component.

---

## 13. Decision log

Owner decisions, newest first. The "shared-changes pass" was one deliberate change before the first page redesign. It applied the decided global fixes on every page in both locales, and every changed baseline was explained pixel by pixel (audit, recommendation 4).

### 29 October 2026: Home composition adapted from the original Hostinger site

Layout ideas only, taken from the client's earlier site (`D:\ado-omar\abdalla-site\hostinger-website-backup`). Its logo, colours, Thmanyah fonts, AI imagery and copy were not used.

| Decision | Effect | Status |
| --- | --- | --- |
| The hero is a navy stage (`--fx-deep`), set 16px in from the page edges (10px on phones) | Centred headline up to 108px, an outlined eyebrow chip, centred actions (white primary button), and the systems map in the lower part of the stage. Map lines and labels are `#b3cbdc`. | Implemented, awaiting owner review |
| The About band is set in like the stage | Replaces the "one dark band" rule on home: the page opens and turns on navy | Implemented, awaiting owner review |
| `#start` is a centred closing panel on `--fx-tint` | The dashed open node is removed (it read as a missing image) | Implemented, awaiting owner review |

### 28 October 2026: Privacy, Presentation and 404 (last page redesigns)

| Decision | Effect | Status |
| --- | --- | --- |
| Privacy is laid out as ruled rows | Title beside text, aligned to the content edge (before: a centred 1000px card); the GitHub link is spaced | Implemented |
| Presentation references are link cards | Six links named by the references instead of six "Open the reference"; closing paragraphs held to 780px (`.measure`) | Implemented |
| The outdated "glass-style design" sentence is removed | Both languages; no new words | Implemented (copy change, approved) |
| 404 puts its actions in the intro | Home button plus a Services link with the navigation's label; fixes the button sitting on the footer rule | Implemented |
| Shared names | `.service-card` became `.link-card` and `.service-rows` became `.ruled-rows`, now that two pages use each; `.prose` removed | Implemented |

### 28 October 2026: Home sections below the hero

| Decision | Effect | Status |
| --- | --- | --- |
| The home solutions are an open list | Five service rows with tags (section 12.11); the accordion and its 01–05 numbers go | Implemented |
| The glass aside and its two lines are retired | `solutions.aside.title` and `.body` stay in the content, unused; `aside.label` still feeds the systems map | Implemented |
| The closing section's orb becomes an open node | Section 12.19, "Reuse" | Implemented |
| Approach and the About band are tidied | The approach output uses `--fx-ink-text` (before: `#466c86`); the About band's decorative circle goes | Implemented |

### 28 October 2026: About and Contact

| Decision | Effect | Status |
| --- | --- | --- |
| About's download moves into the intro | A secondary button under the lead, with the copy's ↓ drawn as an icon; the orphaned section after the CTA band is gone | Implemented |
| About's principles are a ruled 2×2 grid | `h2` titles (before: h3 under the h1) | Implemented |
| About shows the directions figure beside "Arabic is part of the experience" | Section 12.19, "Reuse"; the principle carries `figure: "directions"` in the content | Implemented |
| Contact weights its channels | The business panel is wider and white; the brief is the recessed tint panel. Topics become ruled columns. | Implemented |

### 28 October 2026: Process page

| Decision | Effect | Status |
| --- | --- | --- |
| The five stages form a process map | Section 12.11. The stages align to the content edge (before: a centred 980px column). The output uses the label-and-value treatment (before: default bold "Output:"). | Implemented |
| The working practices are ruled columns with `h2` titles | They no longer fall under the last stage in the outline; no heading text added | Implemented |

### 28 October 2026: Services and the six solution pages

| Decision | Effect | Status |
| --- | --- | --- |
| A map locator on each service card and in each solution page's intro | Section 12.21 | Implemented |
| Solution pages are a spec sheet | Four labelled rows in one panel, with `h2` labels (before: h1, then h3), and the deliverables as list items. Display only: the copy is unchanged, the separators and final full stop are dropped, and English items start with a capital. | Implemented |
| "Ways to start" are ruled columns | No card surfaces, no numbers | Implemented |
| The service card's title is its link | Six distinct link names instead of six "Explore scope and deliverables"; that text stays as the visible cue | Implemented |

### 28 October 2026: Work Lab and demo pages (first page redesign)

| Decision | Effect | Status |
| --- | --- | --- |
| Work Lab cards are full-width "system rows" with a window onto the real demo | Section 12.20; the hand-drawn mini windows are gone | Implemented |
| The hand-drawn windows' copy is retired | `lab.ts` keeps only the card text. Retired: the window strings, "Sample data" (the window footers) and the screen-reader-only "Open …" link names. The hero map reads the real demo data and is pixel-identical. | Implemented |
| `/work` drops the Work Lab's own heading block | The page intro introduces the lab. The disclosure and filter stay, and card titles become `h2`. | Implemented |
| Demo pages take the node treatment | The label sits on the title's start side; the demo frame has the demo's hue edge; Sayr's selected request uses its hue; the table is at 15px; "Next demo" is a node in the next demo's hue | Implemented |

### 28 October 2026: design system approved

| Decision | Effect | Status |
| --- | --- | --- |
| The "Systems Map" direction and this design system are approved | Rules in sections 1–12 apply to every page redesign | In force |
| Styles stay in `site.css`, one commented section per component; no CSS Modules | Section 10, rule 5. Plan section C's CSS Modules proposal is withdrawn. | In force |
| The 700px breakpoint merges into 720px | Inner-page grids, page intro, card and CTA padding, logo size and phone link switch at 720 | Implemented 28 October (shared-changes pass) |
| The CTA band follows the previous section after one section space, not two | Removes 110px (65px on phones) of empty space before `EnterpriseCta` on Services, Process and the six solution pages | Implemented 28 October |
| The footer's top rule runs the full page width | It mirrors the header hairline. It previously ended 40px past the content edge at widths above 1232px. | Implemented 28 October |
| Numbers stay only where the order is real | Prefixes removed from the home section labels (01, 03, 04), the Work Lab label (02) and the demo case-story labels (01–04), in both languages. Process stages (01–05) and the home approach steps keep theirs. | Implemented 28 October (copy change, approved) |
| Arabic pages get Arabic page and card labels; product codes stay Latin | The strings are listed in `page-architecture.md` section 8 | Waiting for the owner's Arabic wording |
| Status colours are used inside the demos only | Section 11.2 status names; no site-wide status palette until a non-demo page needs one | In force |
| No IBM Plex Mono | One type family | In force |

**Still open:**
- ~~The services accordion numbers~~ and ~~accordion vs open list~~: settled with the home redesign (open list, no numbers).
- A discovery-session photograph is used only if a real one exists (plan FX-B02).
- Form error pattern: define before the first page that needs custom validation (section 11.3).

### 29 October 2026: reference replication

- 29 Oct: site rebuilt on the reference layout; supersedes sections 7, 12 and the page archetypes.

