# Frentex Tech visual redesign: Phase 1 plan

Status: proposal for owner review, 27 October 2026. Steps 1 and 3 of the implementation sequence (section H) are implemented; the rest is not.

> **Since 28 October 2026** the standing rules live in [`design-system.md`](design-system.md) (principles, tokens, components), [`page-architecture.md`](page-architecture.md) (pages and archetypes), [`page-redesign-workflow.md`](page-redesign-workflow.md) (procedure) and [`design-audit.md`](design-audit.md) (findings). This plan remains the record of the direction, the asset briefs, the motion specification and the implementation steps. Where its token or component tables differ from those documents or from `src/styles/tokens.css`, they win. The owner approved the design system on 28 October 2026 and settled most of the decisions in section I; the log, and what is still open, is in `design-system.md` section 13.

Inputs:
- The current build on `feature/nextjs-migration`: every route in Arabic and English, through the screenshot baselines at 1440, 1024 and 390 px.
- `src/styles/site.css`, `src/styles/fonts/`, `public/`, and the components in `src/components/`.
- The earlier Impeccable critique (`.impeccable/critique/2026-10-26T11-31-43Z__index-html.md`) and direction study (`.impeccable/decision/direction.json`).
- The `experiment/frentex-redesign` branch, read only.
- thmanyah.com, captured at 1440 and 390 px on 27 October 2026.
- The frontend-design skill. It is not in this repository (there is no `.agents/`, `.claude/` or `skills/` folder here); it was read from `C:\Users\kerol\.claude\skills\frontend-design\SKILL.md`.

---

## A. Current visual assessment

**What works**
- A restrained, cool palette: navy ink `#173f61` on a pale sky ground `#f7fafc`.
- A distinctive logo: an orthogonal F with a teal 45° corner (`public/assets/mark.svg`).
- The Work Lab's mini product windows are the most authored visuals on the site. They show the three real demos (مدار Madar, سير Sayr, رصيد Raseed), each in its own colour field.
- Calm tone, generous space, and honest disclosures ("Illustrative demos with sample data, not client projects").

**What makes it read as a template**
1. **The hero is decorative glassmorphism.** A gradient orb, two orbit rings and three tilted frosted tiles (`.hero-art` in `HomePage.tsx`) say "tech" without showing a system.
   - The Arabic page carries English micro-labels: YOUR NEXT CHAPTER, BUILT AROUND YOUR BUSINESS, FRENTEX TECH / SYSTEMS.
   - The same glass vocabulary repeats twice: in the solutions aside (three skewed glass cards and DESIGN → BUILD → CONNECT) and in the contact block (an orb with a glass arrow tile). The contact orb is cropped behind the text on mobile.
2. **Every inner page uses the same component.** Services, the six solutions, Process, About and Contact are a headline followed by a grid of identical gradient cards (`.enterprise-card`: 28px radius, gradient fill, soft shadow).
   - A business problem, the solution and the deliverables all look the same.
   - There are no diagrams on a site whose positioning is connected systems.
   - On About, the PDF download button floats alone under the CTA.
3. **The type hierarchy is flat.**
   - Headings use weight 500 with negative tracking (-2.4px on the 69px Arabic h1), which pinches the joins of connected Arabic letters.
   - English inherits the Arabic line height (1.38 on a Latin display line), so "Systems, / not just sites." reads loose.
4. **Small text is too small and too light.**
   - The home page alone has about 120 text nodes under 12px, per the earlier critique: 8–9px Arial labels, and 6–8px text inside the demo windows.
   - Label greys fail WCAG text contrast on `#f7fafc`: `#849aac` (2.78:1), `#8296a7` (2.92:1), and `#adbdc9` (1.84:1, used for the process numbers).
5. **There is no motion beyond hover nudges.** Nothing on the site behaves like a system.
6. **There are no design tokens.** About 220 hard-coded colours sit in one minified stylesheet.
7. **The share image has the wrong shape.** `social-cover.png` is a 1584×396 (4:1) LinkedIn banner, used as `og:image` for both languages.
   - Link previews fill a 1.91:1 frame, so they crop it to its middle and lose the brand name and the logo tile.
   - Arabic shares show English text.

**Image audit, in one line:** the site contains no photography and no AI-generated images. The only image files are the logo and the share banner. The generic feel comes from CSS-built decoration: orbs, glass tiles and the ✦ ribbon.

**Shared vs locale-specific:**
- Every page and layout component is shared between Arabic and English (`src/components/**`).
- Locale-specific parts are:
  - copy in `src/content/{ar,en}/*`;
  - the route files in `src/app/(ar)/**` and `src/app/en/**`;
  - the two root layouts;
  - the `[dir="ltr"]` overrides at the end of `site.css`.

A visual change to a component therefore lands in both languages at once.

---

## B. Design direction: "The Systems Map" (خريطة الأنظمة)

**Thesis.** The site is drawn like the systems map Frentex produces for a client. The map is a real artifact of the business:
- «خريطة الأنظمة» (systems map) is a named deliverable of the integration service.
- «خريطة عمليات» (process map) is an output of the discovery stage.

On the map, a business's real interfaces are the nodes, and the lines Frentex builds connect them. "Systems, not just sites" becomes something a visitor can see, and then open.

### Principles taken from Thmanyah (not its form)

| Thmanyah | Frentex translation |
| --- | --- |
| Flat ink on a paper ground; depth comes from content, not effects | Remove glass, blur, orbs and gradient cards. Flat paper and ink lines, with real interface as the content. |
| One type family, confident weight contrast | Keep IBM Plex Sans Arabic. Thmanyah uses it too, so Frentex's identity must come from the map, the wordmarks and the palette. Headings move to 600 with zero tracking in Arabic. |
| Every programme has a bespoke cover: its own colour field and Arabic lettering | Each demo gets a cover: its existing hue field, a custom wordmark (FX-A03–A05) and a live fragment of its real interface. |
| Hairline rules and quiet section headers organise dense content | 1px rules in `#dce7ee` and small, exact section headers. Large type is reserved for page intros. |
| One unambiguous primary action | One solid ink button across header, hero and CTAs. Today the header CTA is outlined and the hero's is solid. |

**Not taken from Thmanyah:**
- its cream and black palette;
- its grid and layouts;
- its illustrations, covers, lettering and motion.

### Token system

All values already exist in `site.css` or the logo. No new hues.

| Token | Hex | Where it comes from | Role |
| --- | --- | --- | --- |
| ink | `#173f61` | primary button, logo gradient end | headlines, primary actions, built connectors |
| ink-text | `#193953` | body colour | running headings and text |
| paper | `#f7fafc` | page background | ground |
| tint | `#edf4fa` | logo tile | map bands, node fills |
| steel | `#638daf` | hero second line | second headline lines (3.36:1, large text only); proposed (dashed) connectors |
| teal | `#73adbd` | logo triangle | connection ports only. It is 2.37:1 on paper, so it always sits inside an ink outline or on navy (4.70:1). |
| deep | `#173b56` | About band | at most one dark band per page |
| signal | `#347fcc` | focus ring | focus, and the active connector on hover or focus |
| text-2 | `#536b7e` | paragraphs | body copy and all small labels (5.31:1) |
| line | `#dce7ee` | borders | rules, node edges, skeleton bars |

Demo hues (existing):

| Demo | Text | Graphic | Tint | Field |
| --- | --- | --- | --- | --- |
| Madar | `#5775a2` | — | `#dae7f7` | `#e4eaf5` → `#b9ceec` |
| Sayr | `#4c7569` | `#5a8475` | `#daeae3` | `#e3eeeb` → `#cce8e5` |
| Raseed | `#70614d` | `#b28a4f` | `#f5ead9` | `#f1ede6` → `#e7daca` |

**The only colour change proposed:** retire the label greys that fail contrast (`#849aac`, `#8296a7`, `#8ca2b0`, `#adbdc9` and similar) in favour of text-2 `#536b7e`.

### Type

**Display and body: IBM Plex Sans Arabic**, using the existing files. Settings per locale:

| | Arabic display | English display | Body |
| --- | --- | --- | --- |
| Weight | 600 | 600 | 400, 17px |
| Line height | 1.3 | 1.08–1.12 | Arabic 1.85, English 1.6 |
| Tracking | 0 | -0.02em | 0 |

Arabic and English get separate type settings through `:root[lang]`, instead of English inheriting Arabic metrics.

**Scale, desktop → mobile:**

| Role | Size |
| --- | --- |
| Hero | 88 → 48 |
| Page intro | 64 → 40 |
| Section | 44 → 32 |
| Lower headings | 28 → 24, then 22 → 20 |
| Body | 17 |
| Small | 15 |
| Text floor | 13; Latin codes may go to 12 |

**Utility face (recommended, owner decision): IBM Plex Mono 500.**
- Latin subset only, roughly 25 KB as WOFF2, OFL licensed.
- Used for codes and data: CRM, request numbers, counts, stage numbers.
- It replaces today's 8–9px Arial labels and belongs to the same superfamily as the brand font.
- If declined, use Plex Sans Arabic with tabular figures.

**Considered, not proposed:** a Kufi display face (Noto Kufi Arabic was trialled on `experiment/frentex-redesign`).
- It would change every Arabic heading at once.
- It would need a matching English pairing.
- It can be revisited after the foundation pass.

### Layout concept

- Every page opens with a type-only headline plate: full width, generous, right-aligned in Arabic.
- The plate is followed by a band showing the part of the map that page is about.
- Sections are separated by rules and band changes, not by floating cards.

### Brand geometry

- The logo is an orthogonal F plus one teal right triangle with a 45° hypotenuse.
- The map uses exactly that grammar: orthogonal ink connectors, a 45° chamfer at each turn, and a small teal triangle as the port where a connection is live.
- Nodes are flat rectangles with a 10px radius.
- The triangle appears only on live ports and on interactive nodes, never as decoration on every card.

### Signature: the hero systems map

Desktop, 1440 px, Arabic. The flow reads right to left; English mirrors it.

```
┌──────────────────────────────────────────────────────────────────────────┐
│ ▣ Frentex  حلولنا  مختبر الأعمال  كيف نعمل  عن فرينتكس  English  [ناقش احتياج شركتك] │  flat bar, hairline, solid CTA
├──────────────────────────────────────────────────────────────────────────┤
│                                     ● حلول B2B للشركات والمؤسسات في السعودية. │
│                                                          أنظمة مترابطة.  │  88px ink
│                                                           أعمال تتقدّم.   │  88px steel
│                                      نصمّم ونطوّر منصات وتطبيقات وأنظمة أعمال │  intro, 19px
│                               [حلول تناسب عملك ↓]   [استكشف ما نبنيه]         │
├─ map band: tint, bleeds past both page edges ────────────────────────────┤
│ ─┐  ┌────────┐     ┌────────┐     ┌────────┐     ┌───────┐   ┌───────┐  ┌─ │
│  └──┤ رصيد    ├◣───┤ سير     ├◣───┤ مدار    ├◣───┤ الموقع ├───┤التطبيق│──┘  │
│     │stock row│     │step 3/4│     │kanban  │     │ frame │   │ frame │     │
│     └────────┘     └────────┘     └────────┘     └───────┘   └───────┘     │
│      ERP & CRM      تكاملات وأتمتة    ERP & CRM      مواقع ومنصات  تطبيقات جوال │  legend = existing capability strings
│                                                تصوّر بصري لمنظومة مترابطة      │  existing caption
└──────────────────────────────────────────────────────────────────────────┘
```

Mobile, 390 px: the headline plate, then the map turned vertical. There is no horizontal scroll.

```
┌──────────────────────────┐
│ ▣ Frentex   [ناقش]    ≡  │
│ ● حلول B2B …             │
│ أنظمة مترابطة.   48px    │
│ أعمال تتقدّم.            │
│ intro                    │
│ [استكشف ما نبنيه]        │
│ حلول تناسب عملك ↓        │
├─ map ────────────────────┤
│ [الموقع]──┬──[التطبيق]   │
│           ◣              │
│ [مدار · فرصة جديدة 02]   │
│           ◣              │
│ [سير · مراجعة]           │
│           ◣              │
│ [رصيد · إعادة طلب 03]    │
└──────────────────────────┘
```

**Nodes and their content:**
- The Madar, Sayr and Raseed nodes are links to their demos. They show small fragments of each demo's real interface, at legible size.
- The website and app nodes have no demo, so they are drawn as plain browser and phone frames carrying the mark, not invented screens.

**Honesty rules for the map:**
- The three demos are separate illustrative concepts with separate sample data. The map shows systems connected in principle; it never shows one record moving between demos.
- The token that travels along the connector carries no data.
- The existing caption «تصوّر بصري لمنظومة مترابطة» / "Illustration of a connected system" stays with the map.

### Self-critique against generic defaults (from the skill)

- **The split hero** (headline beside a floating screenshot and a gradient blob) is today's hero.
  - Revised: a headline plate above, and a map band below that bleeds off both edges.
- **The glowing network graph.**
  - Avoided: the nodes are real Arabic interfaces, the lines are flat ink, and nothing glows.
- **The metro map** was rejected as familiar in the earlier Impeccable study.
  - This map has one ink colour and no stations, and its orthogonal runs come from the logo.
- **Removed after critique:**
  - A continuous route rail down every page, from the earlier Waybill study. It costs layout everywhere, so the map appears in three places only: hero, Process and the contact CTA.
  - Chamfered corners on every card, which reads as a sci-fi interface. Ports appear only on interactive nodes.
  - A headline entrance animation. The headline stays static, because it is the thesis and the page's Largest Contentful Paint (LCP).

### How it differs from today

| | Today | Proposed |
| --- | --- | --- |
| Hero | Glass orb and tilted tiles with English labels | Headline plate plus a systems map built from the real demos |
| Inner pages | Identical gradient card grids | Situation → what we build → deliverables flows, process map, locator maps |
| Surfaces | Glass, gradients, blur, 28px radii, soft shadows | Flat paper, 1px rules, 10–12px radii, no blur |
| Type | Weight 500, negative tracking in Arabic, 8–9px labels | Weight 600, Arabic tracking 0, per-locale metrics, 13px floor |
| Demos | Hand-copied mini windows with 6–8px text | Covers with wordmarks and live previews of the real components |
| Motion | Hover nudges only | One drawn map moment, quiet reveals, state feedback in demos |
| Contact | Orb and glass arrow | An open, dashed node that connects when you act |

---

## C. Changes per page and shared component

### Shared

| File | Change |
| --- | --- |
| `src/styles/site.css` | Introduce CSS custom properties for the tokens above, first with zero visual change. Then: flat surfaces, a radius system (control 8, node 10, panel 12), the type scale, the 13px floor and the label greys. Remove glass, blur and gradient-card rules once unused. |
| New `src/styles/tokens.css`, later `motion.css` | Colour, type and motion tokens in one place; shared motion rules join them in `motion.css` once they exist. New component styles go into CSS Modules next to their components, so global rules stop growing. |
| `src/components/layout/RootDocument.tsx` | A tiny inline script sets `data-motion="ok"` on `<html>` only when JavaScript runs and `prefers-reduced-motion` is `no-preference`. Every hidden "before" state is scoped to that attribute. |
| `SiteHeader.tsx` | Flat full-width bar instead of the floating glass pill, with a hairline that appears after scrolling. Solid ink CTA. SVG menu icon that switches ≡ → ×; `aria-expanded` already exists. A current-page indicator with `aria-current`. The language link stays last. |
| `SiteFooter.tsx` | Phone, WhatsApp and email at a readable size; today the phone is 11px. Hairline top rule; Privacy kept. |
| `PageIntro.tsx` | Headline plate with an optional inline-end slot for a locator map (solution pages). |
| `EnterpriseCta.tsx` | Becomes the open-node CTA band: a dashed connector that turns solid when the CTA is hovered or focused. |
| `MutedSecondLine.tsx` | Kept. The steel second line is a brand pattern. |
| `BriefDialog.tsx` | Tokens and flat surfaces only; behaviour unchanged. |
| New `src/components/visual/` | `SystemsMap`, `MapLocator`, `ProcessMap`, `DemoCover`, `Reveal` (one IntersectionObserver), `icons.tsx`. |

### Pages

| Page and files | Change |
| --- | --- |
| **Home** `HomePage.tsx` (`/`, `/en`) | **Hero:** headline plate plus `SystemsMap`, replacing `.hero-art`. **Capability ribbon:** becomes the map legend, with the same four strings. **Solutions:** the accordion becomes a list with a `MapLocator` per service, and the glass aside is removed. **Work Lab:** covers (below). **Approach:** a four-stage strip in map states. **About band:** stays navy, flat, without the decorative circle. **Start:** open-node CTA instead of the orb. |
| **Work Lab** `WorkLab.tsx` (home `#work`, `/work`, `/en/work`) | Each card becomes a cover: hue field, wordmark, and a static preview of the real demo component in place of the hand-copied mini window. The filter is restyled; the sample-data disclosure becomes more visible. |
| **Services** `ServicesPage.tsx` | Six cards with a `MapLocator` showing where each service sits in a business's systems. The "three ways to start" are alternatives, not a sequence, so they are drawn as three entry ports, not numbered steps. |
| **Six solutions** `SolutionPage.tsx` | Problem → solution → outcome, using fields that already exist: `whenItFits` → `summary` → `deliverables`. Deliverables become chips, split on «؛» / ";" (both locales use them consistently). `agreeFirst` becomes a ruled "defined with your team first" band. The intro gets a locator with the service highlighted. All labels come from the existing `cardTitles`. |
| **Process** `ProcessPage.tsx` | The five stages become a vertical process map whose state matures: **01** a dashed sketch, **02** a solid outline (scoped), **03** filled (built), **04** checked (accepted), **05** a teal port (handed over). Outputs become deliverable chips; the practices sit in three ruled columns. |
| **About** `AboutPage.tsx` | The four principles become a 2×2 editorial grid with hairlines. "Arabic is part of the experience" gets a figure showing one node in RTL and its LTR mirror. The PDF link moves next to the intro, fixing the orphaned button. |
| **Contact** `ContactPage.tsx` | The WhatsApp and phone panel is primary and larger; the brief panel is secondary. The three "points" are shown as the brief's three fields, matching the dialog. |
| **Demos** `ProjectView.tsx`, `CrmDemo.tsx`, `OpsDemo.tsx`, `ErpDemo.tsx` | The header becomes a cover: hue field, wordmark and case facts as a ruled data row. The demo shell is framed in the product's hue. Text floor 13px inside demos; a brief highlight on each state change; a cover strip for the next demo. Data, IDs, query parameters and behaviour stay unchanged. |
| **Privacy, Presentation, 404** | Tokens and type only. |

---

## D. Existing assets: retain, replace or remove

| Asset | Path | Where | Purpose | Assessment | Action |
| --- | --- | --- | --- | --- | --- |
| Logo mark | `public/assets/mark.svg` | Header, footer, hero tile, favicon | Brand mark | Authentic and distinctive. It is the only favicon: there is no PNG icon or apple-touch-icon. | **Retain unchanged.** Add PNG icons generated from it (P10). |
| Share banner | `public/assets/social-cover.png` (1584×396, 49 KB) | `og:image` for every page in both languages (`src/lib/metadata.ts`) | Link previews | 4:1 banner in a 1.91:1 slot, so previews crop the brand name and logo. English-only text on Arabic shares. | **Retain the file.** Replace its `og:image` role with FX-A01 and FX-A02. |
| Company profile | `public/downloads/frentex-company-profile.pdf` | About | Download | Arabic only; outside the visual scope | Retain |
| Fonts | `src/styles/fonts/plex-arabic-{0..3}.ttf` (about 220 KB each) | Every page | Brand type | Right family. Uncompressed TTF adds about 900 KB across 4 weights. | **Retain the family; convert to WOFF2.** |
| Hero art (CSS) | `.hero-art`, `.glass-orb`, `.orbit-*`, `.glass-tile`, `.live-dot`, `.art-note` | Home hero | "Connected system" illustration | Generic glassmorphism. 6–9px text; English labels on the Arabic page. | **Replace** with `SystemsMap` (P01). |
| Capability ribbon (CSS) | `.capability-ribbon` with ✦ | Home | Lists capabilities | Template ribbon | **Redesign** as the map legend |
| Solutions aside (CSS) | `.solution-intro`, `.mini-stack` | Home `#solutions` | Decoration | Duplicates the glass motif; DESIGN → BUILD → CONNECT label | **Remove**; replaced by locators |
| Work Lab mini windows (HTML/CSS) | `.product-window`, `.kanban-mini`, `.request-mini`, `.inventory-mini` | Home `#work`, `/work` | Demo previews | The best existing visuals and true to the demos, but 6–9px text, and hand-copied UI that can drift from the real demos | **Redesign:** previews of the real components inside covers (P02, P03) |
| Process numbers (CSS) | `.process article>span` | Home approach | Sequence | A real sequence, but the number colour is 1.84:1 | **Redesign** as map states |
| About circle (CSS) | `.about-section:after` | Home about | Decoration | Adds nothing | **Remove** |
| Contact orb (CSS) | `.contact-art`, `.small-orb` | Home `#start` | Decoration | Generic; cropped behind text on mobile | **Remove**; replaced by the open-node CTA (P08) |
| Unicode icons | ☰ × ✓ ✦ ↔ ••• and directional arrows from `directionalArrows()` | Header, cards, hero | Icons | Inconsistent; three different arrow directions for "go" | **Replace the component-rendered glyphs** with SVG icons (P09). Arrows written inside copy strings stay, as copy. |
| Card surfaces (CSS) | `.enterprise-card`, `.enterprise-cta` | All inner pages | Containers | Uniform gradient glass | **Redesign** as flat surfaces |
| Hero wash, demo band (CSS) | `.hero:before`, `.demo-section` | Home, demos | Atmosphere | Soft gradients | **Remove** the hero wash; **retint** the demo band per product |
| Unused rule | `.brand-mark` (CSS bars) | none | none | Dead CSS | Remove during the token pass |

---

## E. Custom asset brief

Few supplied assets are needed. For a systems company, the most credible visuals are the real interfaces and diagrams built in code (listed under "Programmatic"). They stay accurate, work in both languages and can be animated. Supplied files are reserved for what code cannot do well: social images and Arabic lettering.

**Rules for every supplied asset**
- Use only the hex values in section B.
- Do not depict people, offices, clients, third-party logos or invented product screens.
- Typeset Arabic text from the bundled IBM Plex Sans Arabic (`src/styles/fonts/`).
- Do not let an image generator draw Arabic letters; it gets joins and dots wrong.
- Deliver a master and an export. Filenames are lowercase-kebab, under `public/assets/`.

### Essential: first redesign pass

#### FX-A01 · Arabic share image: `public/assets/social/og-ar.png`
1. **ID and filename:** FX-A01, `og-ar.png`. Keep a 2400×1260 master with your design sources.
2. **Page and section:** not shown on a page. It is the `og:image` and Twitter image for every Arabic page, in WhatsApp, LinkedIn, X and iMessage previews. Wired per locale in `src/lib/metadata.ts`.
3. **Concept:** «أنظمة مترابطة» at thumbnail size. Frentex connects a business's systems, and the image is recognisable as Frentex in a chat list.
4. **Composition:**
   - A single node card centred in the frame: white, 2px ink stroke, 16px radius, about 640×380.
   - Inside the card:
     - the header's brand lockup at its top-right (mark plus "Frentex" / "TECH", as in `SiteHeader`);
     - the existing hero title in two lines: «أنظمة مترابطة.» / «أعمال تتقدّم.»;
     - «frntextech.com» at the bottom.
   - Orthogonal ink connectors (4px) enter the card from the left and right image edges. Each has one 45° chamfered step and meets the card at a teal triangle port, outlined in ink.
   - One smaller node on each side shows only 2–3 skeleton bars, no text. The image edge partly crops it.
5. **Main subject and supporting elements:** the headline inside the node. Supporting: the lockup, the connectors, the two partial nodes and the domain.
6. **Camera and perspective:** flat, front-on. No 3D or perspective.
7. **Background and lighting:**
   - Flat `#f7fafc`, with an optional 24px grid of 1px `#dce7ee` lines at 50% opacity.
   - No gradients, glows or soft shadows; at most a 2px `#dce7ee` offset line under the card.
   - No lighting effects.
8. **Colours:**

   | Element | Colour |
   | --- | --- |
   | Line 1, connectors, card stroke | ink `#173f61` |
   | Line 2 | steel `#638daf` |
   | Domain and "TECH" | text-2 `#536b7e` |
   | Card | `#ffffff` |
   | Grid and skeleton bars | `#dce7ee` |
   | Ports | teal `#73adbd` with ink outline |
   | Mark | as `mark.svg` |

9. **Aspect ratio and size:** 1.91:1, exported at 1200×630 PNG-24 under 300 KB.
10. **Transparency:** none. The image is opaque, because platforms fill transparent areas with black or white unpredictably.
11. **Text in the image:** yes, and only existing text: the hero title, the brand lockup and the domain. All of it must be typeset, never generated.
12. **Areas to keep empty:** no HTML text sits over this image. Keep 60px clear margins, and no text within 32px of the top or bottom edge.
13. **Cropping:**
    - Large previews (LinkedIn, X, Facebook, iMessage) show the whole image.
    - WhatsApp's compact preview can centre-crop to a square, so all text must sit inside x 300–900, y 90–540. Connectors and side nodes may be cut.
14. **Static or animated:** static.
15. **Why a custom asset:**
    - Platforms need a raster file and cannot render the page's CSS or SVG.
    - The current image has the wrong shape and shows English on Arabic shares.
    - A designed composition stays legible at a 300px-wide thumbnail.
    - It can also be rendered from an HTML template (P11) if you prefer not to draw it.

#### FX-A02 · English share image: `public/assets/social/og-en.png`
Same as FX-A01, mirrored for left-to-right, with these differences:
- The lockup sits at the card's top-left.
- The title is the existing English hero title, «Systems,» / «not just sites.», set in Plex Sans Arabic Latin glyphs at 600, about 88px, with -0.02em tracking and 1.05 line height.
- The connectors are mirrored.
- It is the `og:image` for every `/en` page.

#### FX-A03 to FX-A05 · Demo wordmarks
Filenames in `public/assets/lab/`:
- `wordmark-madar.svg` (مدار)
- `wordmark-sayr.svg` (سير)
- `wordmark-raseed.svg` (رصيد)

1. **IDs and filenames:** FX-A03 Madar, FX-A04 Sayr, FX-A05 Raseed, at the paths above.
2. **Pages and sections:**
   - Work Lab covers: home `#work`, `/work`, `/en/work`.
   - The demo page header: `/project?project=crm|ops|erp` and `/en/project?...`.
   - The "next demo" strip at the foot of each demo.
   - Demo share images (P11).
3. **Concept:** each demo reads as a named product with its own identity; this is where Thmanyah's "every programme has a cover" principle applies. The lettering hints at the job:
   - **مدار** (CRM): a path from first opportunity to agreement.
   - **سير** (requests and approvals): steady step-by-step progress. The teeth of س can read as the request's steps.
   - **رصيد** (inventory and purchasing): a sturdy, flat-bottomed, stacked balance.
4. **Composition:**
   - Lettering only, set horizontally. No container, icon or tagline.
   - Geometric, Kufi-leaning letterforms built on the brand's orthogonal and 45° grammar, each with at most one 45° terminal.
   - The same stroke weight, letter height and baseline across all three, so they read as one family.
   - No calligraphic styles such as Thuluth or Diwani, and nothing resembling Thmanyah's lettering.
5. **Main subject:** the Arabic word. No supporting elements.
6. **Camera and perspective:** none. Flat vector.
7. **Background and lighting:** transparent, with no effects. It must sit on its hue tint, on white or on paper.
8. **Colours:** deliver as one colour with `fill="currentColor"`; the site colours it.

   | Wordmark | Text colour | On tint | Contrast |
   | --- | --- | --- | --- |
   | Madar | `#5775a2` | `#dae7f7` | 3.75:1 |
   | Sayr | `#4c7569` | `#daeae3` | 4.16:1 |
   | Raseed | `#70614d` | `#f5ead9` | 5.04:1 |

   Any of them may also appear in ink `#173f61` on paper.
9. **Aspect ratio and size:** tight `viewBox` with a height of 120 units; width as the word needs, roughly 2.5:1 to 4:1. It will display between 32px (cards, mobile) and 96px (demo header) tall.
10. **Transparency:** yes. The SVG has no background.
11. **Text in the asset:** the lettering is the text. It is a logotype, so the page keeps the demo's name as HTML text (heading or link), and the SVG is `alt=""`.
12. **Areas to keep empty:** nothing overlays the wordmark. Do not add padding inside the `viewBox`; spacing is set in CSS.
13. **Desktop and mobile cropping:** never cropped, only scaled. It must stay legible at 32px tall, so the thinnest stroke must be at least 9% of the lettering height (about 3px at that size). All three share the same optical baseline so they align in a row.
14. **Static or animated:** static. The frontend fades it in with its cover; no stroke animation is required.
15. **Why a custom asset:**
    - Arabic display lettering cannot be produced with CSS on Plex Sans Arabic.
    - Product wordmarks are what make the demos read as credible products rather than cards.
    - Draw them in a vector tool, optionally starting from an OFL Arabic font's outlines. Have a native Arabic reader check joins and dots.
    - If they are not ready when step 4 starts, the covers use the names in Plex Sans Arabic 700 and switch later.

### Optional enhancements

#### FX-B01 · Latin companion wordmarks: `public/assets/lab/wordmark-{madar,sayr,raseed}-latin.svg`
- Used on `/en` covers beside the Arabic wordmark.
- Specs match FX-A03–A05: geometric Latin letters, the same height and weight, `currentColor`.
- Without them, English covers show the Arabic wordmark and the Latin name as HTML text, which is acceptable.

#### FX-B02 · Discovery-session photograph: `public/assets/about/discovery.webp`
Only if it is real.
1. **ID and filename:** FX-B02, `discovery.webp`, plus `discovery-portrait.webp`.
2. **Page and section:** About, between the intro and the principles, and optionally Process stage 01.
3. **Concept:** the discovery workshop where a systems map is drawn. It shows that a real team does this work.
4. **Composition:**
   - Hands mapping a process on paper or a whiteboard, with Arabic notes and sample content (no client data).
   - Faces are optional. A laptop may appear only if it shows a real Frentex screen.
5. **Main subject:** the map being drawn. Supporting: hands, markers, notes.
6. **Camera:** 35mm-equivalent, eye level or 30° down.
7. **Background and lighting:** soft natural daylight, cool white balance (5200–5600 K) to sit with the sky palette. No tungsten warmth and no dramatic lighting.
8. **Colours:**
   - Neutral whites and greys; ink and steel-blue markers.
   - Nothing strongly saturated outside the palette.
   - Grading may lean towards `#f7fafc` and `#173f61`.
9. **Aspect ratio and size:** 3:2, with a 2400×1600 master.
   - Desktop export: 1800×1200 WebP.
   - Mobile: a 4:5 crop at 1080×1350.
10. **Transparency:** none.
11. **Text in the image:** none added. Handwritten notes in the shot are fine if they are legible and not confidential.
12. **Areas to keep empty:** none. Page text sits beside the photo, not over it.
13. **Cropping:** keep the subject in the central 60%, so the 3:2 → 4:5 crop works.
14. **Static or animated:** static.
15. **Why a custom asset:**
    - Only real photography can show a real team.
    - Stock or AI images would undercut the credibility the site is built on.
    - The design does not depend on this photo; if no such photo exists, skip it.

#### FX-B03 · LinkedIn banner refresh (off-site)
- `social-cover.png` stays in the repository unchanged.
- If you want the LinkedIn banner to match the new direction, keep it at 1584×396 and use the FX-A01 lockup plus connectors.
- It no longer drives website previews once FX-A01 and FX-A02 exist.

### Programmatic: built in code, not supplied as images

| ID | What | Where and how | Why code |
| --- | --- | --- | --- |
| P01 | Hero systems map | `src/components/visual/SystemsMap.tsx` + CSS Module. Inline SVG connectors and HTML nodes. Uses the existing hero chips, the lab window strings and the demo links. | Live text in both languages, mirrors RTL and LTR, nodes are real links, can be animated, stays crisp |
| P02 | Demo previews | A static preview mode of `CrmDemo`, `OpsDemo` and `ErpDemo` (board, request list, stock table only), marked `inert` and `aria-hidden`, using `src/content/{ar,en}/projects.ts` | Always matches the real demo; legible; nothing to regenerate |
| P03 | Demo covers | `DemoCover.tsx`: existing hue field, FX-A03–A05 wordmark and P02 preview | Combines the supplied lettering with live UI |
| P04 | Map locator | `MapLocator.tsx`: a six-node mini map with one part highlighted per service. **Platforms:** the website node. **Apps:** the app node. **Business:** the core nodes. **Integration:** the connectors. **Automation:** the flow token. **Support:** every port live. | One drawing explains all six services and how they relate |
| P05 | Solution flow | In `SolutionPage.tsx`: situation → what we build → deliverables, with SVG connectors | Data-driven from existing fields |
| P06 | Process map | `ProcessMap.tsx`: five stage states | Encodes the real process state; animates on scroll |
| P07 | Bidirectional node | About: one node in RTL and its LTR mirror, labelled with the existing language names | Demonstrates an actual capability |
| P08 | Open-node CTA | `EnterpriseCta.tsx` and home `#start` | Continues the map into the conversion step |
| P09 | Icon set | `src/components/visual/icons.tsx`: menu, close, arrow (mirrored by direction), external, download, check. 24px grid, 1.75px stroke, square caps. | Replaces the component-rendered Unicode glyphs consistently |
| P10 | App icons | `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` and `favicon.ico` (16/32), rendered from `mark.svg` with the Playwright already installed | No new dependency; fills the missing icon sizes |
| P11 | Per-demo share images (optional) | `scripts/` renders 1200×630 images from an HTML template (wordmark plus real preview) for `/project` and `/en/project` | Accurate to the real UI |
| P12 | Drafting grid | CSS background on map bands only | No file needed |

---

## F. Animation plan

### Global rules
- **No animation library.** The dependencies are `next`, `react` and `react-dom`. CSS transitions and keyframes, SVG `stroke-dashoffset`, CSS `offset-path`, and one small IntersectionObserver helper cover everything.
- **Animated properties:** only `transform`, `opacity`, `stroke-dashoffset` and colour.
- **Every animation is finite** and plays once per page view. Nothing loops.
- **Hidden starting states apply only under `html[data-motion="ok"]`.** Visitors without JavaScript, visitors who prefer reduced motion, and the Playwright suite (which runs with `reducedMotion: "reduce"`) see final states.
- **Directional movement uses the block axis**, or is mirrored with `[dir]`.

**Tokens:**

| Token | Value |
| --- | --- |
| `--dur-1` | 160ms |
| `--dur-2` | 280ms |
| `--dur-3` | 520ms |
| `--ease-out` | `cubic-bezier(.2,.7,.2,1)` |
| `--ease-in-out` | `cubic-bezier(.65,0,.35,1)` |

### Specification

| Component | Trigger | Initial state | Final state | Duration and easing | Stagger | Mobile | Reduced motion | Performance |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hero headline, intro, CTAs | — | Final | Final | None | — | — | — | Static on purpose: the h1 is the LCP element and must not start hidden. |
| Hero map connectors | Map 30% visible and `document.fonts.ready`. That is immediate on load at 1440 and 1024; after a short scroll at 390. | `stroke-dashoffset` = path length | 0 | 560ms each, ease-out | Next path starts 400ms after the previous one; about 2.2s total | Vertical paths, 320ms each | Drawn | At most 12 paths, no filters, one run |
| Hero map nodes | Their connector arrives | Opacity 0.001, `translateY(8px)`; port unfilled | Opacity 1, 0; port teal | 280ms, ease-out | Follows the connectors | Same | Final | Transform and opacity only |
| Hero map token | Starts with the first connector | `offset-distance: 0%` | 100%, then fades out | 2200ms, ease-in-out | — | Same path, vertical | Hidden | One element |
| Madar node tick (optional) | Token reaches Madar | Card in «فرصة جديدة» | Card in «عرض مرسل», as the real demo's move does | 240ms | — | Same | Final | One transform |
| Map node hover and focus | Pointer or keyboard focus | Rest | Lift 2px; incoming connector in signal blue; port ink | 160ms, ease-out | — | None (tap navigates) | Colour only, no lift | — |
| Section reveal | Header or group 20% visible, once | Opacity 0.001, `translateY(16px)` | 1, 0 | 480ms, ease-out | 60ms, at most 6 items | 12px distance | None | One shared observer; unobserve after the reveal. Reveal immediately when arriving at a `#hash`. |
| Work Lab filter | Click | Leaving cards | Opacity 0.001, scale .98, then `hidden` | 180ms | 40ms | Same | Instant (today's behaviour) | View Transitions API where supported, otherwise instant |
| Work Lab cover hover and focus | Pointer or `:focus-visible` | Rest | Preview up 6px; field one tint deeper; port teal | 200ms, ease-out | — | None | Colour only | — |
| Process map stages | Stage 50% visible, once | Dashed, outline node, chips hidden | Solid, filled node, chips visible | 500ms line, 300ms node, 280ms chips | Chips 50ms | Same | All stages final | Observer per stage; no pinning, no scroll-jacking |
| Solution flow row | Row 30% visible, once | Steps hidden, connectors undrawn | Shown and drawn, in reading order | 400ms steps, 300ms lines | 120ms | Vertical | Final | — |
| Open-node CTA | Band 40% visible, once; then CTA hover or focus | Connector undrawn; dashed | Drawn dashed; solid on hover or focus | 700ms, ease-out; 200ms | — | Same | Drawn; colour change only | — |
| Buttons and links | Hover or focus | Rest | Ink `#173f61` → `#285779` (existing hover); arrow nudges 3px in the reading direction | 150ms | — | No nudge on touch | Colour only | Direction via `[dir]` |
| Header | Scroll beyond 8px | Transparent hairline | Hairline `#dce7ee`, opaque background | 160ms | — | Same | Instant | Sentinel observer. The header never hides. |
| Mobile menu | Toggle | Closed; ≡ | Panel opacity 1, `translateY(0)` from -8px; × | 200ms | Items 30ms | — | Instant | — |
| Demo state changes | Move card, approve, create a purchase order | Hue tint on the changed element | Transparent | 600ms, ease-out | — | Same | No flash | The status live region is unchanged |
| Brief dialog | Open | Backdrop 0; dialog `translateY(12px)` | 1; 0 | 220ms | — | Same | Instant | Native `<dialog>`; focus handling unchanged |

**Deliberately excluded:**
- parallax;
- pinned or hijacked scrolling;
- looping ambient motion;
- cursor followers;
- page-load intros;
- animated counters;
- typing effects;
- page transitions (Next.js client navigation would make them unreliable).

---

## G. Risks

### Accessibility
- **Map nodes are links.** Their accessible names come from the existing `linkLabel` strings. The map is a `<figure>` with the existing caption, and its SVG is `aria-hidden`. Nodes come after the hero CTAs in tab order, are at least 44px tall, and show the `#347fcc` focus ring (3.96:1).
- **Teal fails 3:1 as a graphic on paper.** State is always also shown by dashed vs solid lines, never by colour alone.
- **Demo previews inside cards** must be `inert` and `aria-hidden`: no duplicate controls, IDs or live regions.
- **Reveals** must never hide content without JavaScript or under reduced motion. They must also not break anchor jumps (`#work`, `#approach`) or find-in-page.

### Responsive
- **No horizontal overflow.** Map bands bleed with `overflow-x: clip`, and the map is vertical at 390. The suite does not check horizontal overflow today, so step 1 adds a test that `scrollWidth` equals the viewport width on every page.
- **1024 px:** the map drops its interface fragments and keeps labels.
- **Line lengths differ by locale.** English labels run longer than Arabic, so each locale is tuned separately.

### Performance
- **Fonts:** about 900 KB of TTF today. Convert to WOFF2 before adding anything, and add Plex Mono only as a Latin-subset WOFF2.
- **LCP:** the h1 stays static. The map is HTML and SVG, with no images.
- **JavaScript:** one observer helper. Avoid turning server components into client components; the map animates through CSS classes.

### Arabic regression
- **The foundation pass touches every Arabic page.** Tokens, type, radius, surfaces and the text floor all land on every Arabic page, so they go in one deliberate pass with nothing else mixed in. Every Arabic baseline is reviewed side by side.
- **Arabic heading line breaks.** Zero tracking and weight 600 change line breaks. The copy relies on intentional `<br>`s and non-breaking spaces, so each Arabic heading is checked at 1440, 1024 and 390.
- **SVG geometry does not mirror with `dir`.** Mirror only the connector layer with a transform; keep HTML labels unmirrored; never mirror the logo. Logical properties resolve against the element's own direction, as already seen with `.hero-art`.
- **Known gotcha:** splitting Arabic strings across JSX text nodes shifts rendering by sub-pixels, so keep strings whole.

### Copy (owner approval before implementation)
These strings would no longer be shown:
- the hero art labels (`hero.art.topTile`, `mainTile`, `bottomTile`), including the English labels on the Arabic page;
- the solutions aside label DESIGN → BUILD → CONNECT;
- the Work Lab mini-window strings, if covers use the real components.

The capability strings are reused as the map legend.

The numbered eyebrows («01 / حلولنا» and others) are copy and stay unless you approve removing them. Their numbers do not mark a real sequence.

This plan needs no new visible copy. If any becomes necessary, it will be listed for approval first.

### Tests
- **Screenshots stay deterministic.** The suite runs with reduced motion, so screenshots show final states.
- **New test needed:** a `no-preference` test that the map completes and nothing stays hidden.
- **Deliberate update needed:** `styles.spec.ts` asserts today's transition values.
- **Every step changes baselines,** so each is reviewed page by page, never bulk-accepted.

### Static export
- `next/image` optimisation is not available with `output: "export"`. Supplied files are pre-sized and referenced through `asset()`, so the `/frentex-tech` base path still works.
- A per-locale `og:image` needs a small change to `src/lib/metadata.ts`.

---

## H. Implementation sequence

Each step is reviewable on its own. Each one runs lint, typecheck, build and the full suite, and changed baselines are inspected before acceptance. Nothing is committed.

1. **Groundwork, with zero visual change.** Implemented 27 October 2026.
   - CSS custom properties for the core tokens (`src/styles/tokens.css`); the suite must stay pixel-identical.
   - Fonts converted to WOFF2, with rendering verified against the baselines.
   - The motion gate (`RootDocument.tsx`). The reveal helper lands with its first use in step 4, so it is tested against real content rather than shipped unused.
   - Tests: no horizontal overflow on any page at any viewport, and the motion gate.
2. **Share images.** FX-A01 and FX-A02 wired per locale. This changes metadata only and can land as soon as the files exist.
3. **Foundation pass (global and deliberate):** Implemented 27 October 2026.
   - type scale and per-locale typography;
   - text floor and label greys;
   - flat surfaces, radius and button system;
   - header and footer;
   - the SVG icon set (P09).

   As built, and where it differs from the plan above:
   - **Tokens** for the type scale (with its 1000px and 720px steps), per-locale metrics under `:root[lang="en"]`, and radii (control 8, node 10, panel 12) live in `tokens.css`. `site.css` was expanded to one declaration per line first; the built CSS was byte-identical before and after.
   - **Hero title:** weight, leading and tracking follow the new type settings; its size stays as it is until the step 4 headline plate.
   - **Line breaks:** page titles are 38px on phones, not 40px, so two-line English titles such as "to a clear handover." keep their designed lines. The demo titles scale with their column between 720px and about 1150px, so their three hand-set lines never wrap. Headings and text links use `text-wrap: balance`, which avoids a single word or a trailing arrow alone on the last line. Compared with the previous build at 1440, 1024 and 390 px, the only headings that newly wrap are the two Privacy titles, now on two balanced lines; 20 earlier wraps are gone, including the Arabic Contact title on phones.
   - **Phones:** the capability ribbon becomes a 2×2 grid without its ✦ separators (the English labels no longer fit one row at 13px), and a demo's sample-data note sits under the demo title.
   - **Text floor and greys:** applied everywhere, including inside the demos, which the plan had left to step 5. An audit of every route at 1440, 1024 and 390 px finds no text under 13px (12px only for uppercase Latin labels) and no text below WCAG AA contrast. Exempt until they are replaced: the logo lockup, the hero art, the solutions aside and the contact art (step 4), and the Work Lab mini windows (step 5).
   - **Second headline lines** use steel throughout, matching the hero.
   - **Surfaces:** cards, the CTA band, the dialog, the demo frame and the demo band are flat, with 1px rules and no shadow or blur. The hero's gradient wash is also removed now: the opaque header bar would have cut it in a visible seam.
   - **Controls:** one solid ink primary button, an ink-outlined secondary, 8px radii, colour-only hover (the lift is gone), and inputs outlined in steel so their edges reach 3:1.
   - **Header:** a flat full-width bar aligned to the content edge, with a hairline once the page scrolls or the menu opens, a solid CTA, and `aria-current` on the current page's link. The menu button takes over below 900px instead of 720px, because the inline navigation no longer fits between 721 and about 880px.
   - **Footer:** text at 15px and the copyright at 13px. WhatsApp and email were not added, because they would be new visible copy.
   - **Icons:** only the ones the markup now uses: menu, close, and the forward, forward-down and down arrows (`src/components/visual/icons.tsx`). External, download and check join when they are first used. Arrows written inside copy strings are unchanged.
   - Unused rules from the original presentation page were removed.
4. **Home hero systems map** (P01). Arabic first, English mirrored, mobile vertical. The glass hero art is retired. Implemented 28 October 2026.

   As built:
   - **Headline plate:** the title (48–84px, fluid) on the start side; the intro, actions and caption on the end side. They stack below 900px.
   - **Map band** (`src/components/visual/SystemsMap.tsx`), in the reading direction:
     - the two customer channels (website and app frames carrying the mark);
     - a bracket and the integration connector, labelled with the existing «تكاملات وأتمتة» string and ending in the teal port;
     - the three demo systems on one bus, grouped under «ERP & CRM». Each system is a link to its demo and shows one real string from its preview (first pipeline stage, request status, reorder item).
   - **Legend and sequence:** the four capability strings label the map, so the capability ribbon is removed. "DESIGN → BUILD → CONNECT" moved from the solutions aside to the top of the map; its arrows are drawn and turn with the reading direction. The hero art strings (`hero.art` tiles) are no longer shown; `hero.art.label` names the figure and `hero.art.note` is its caption.
   - **Motion:** the nodes rise in sequence, the connector draws, then the bus, port and labels fade in, about 1.3s in all, once. It runs only under `html[data-motion="ok"]`; with reduced motion the map is static, which a test checks. System nodes lift 2px on hover and focus.
   - **Copy arrows:** arrows written at the start or end of link copy are drawn as icons by `ArrowText`. The words are unchanged and the arrow is no longer part of the link name. ↖ follows the reading direction, ↗ stays ↗, and ← and → keep their direction. Arrows inside the demo buttons are left for step 5.
   - **Deviations:**
     - The map plays on load rather than on scroll, so on phones it has finished before it comes into view.
     - IBM Plex Mono was not added; it needs a font file the repository doesn't have. The sequence and codes use Plex Sans with tracking.
   - **Workshop photo:** the repository has none (only `mark.svg` and `social-cover.png`), so there is nothing to keep or replace; FX-B02 remains optional and only if a real photo exists.
5. **Work Lab and demos.** Covers (P02, P03) on home and `/work`; demo page headers; the next-demo strip. Uses wordmarks FX-A03–A05, or the text fallback.

   Built on 28 October 2026 as the first page redesign under `design-system.md`, in a different form from the covers above:
   - The cards are enlarged system nodes, full width, each beside an inert, full-size window onto its real demo (P02). They have no hue-field covers and no wordmarks.
   - The demo frame and the next-demo node take the demo's hue edge.
   - The demo band stays neutral, because the secondary text fails AA on the Madar and Sayr tints.
   - The record is in `design-system.md` sections 12.20 and 13.
   - The wordmarks FX-A03 to FX-A05 are no longer needed by the Work Lab. They remain optional for the demo page headers.
6. **Services and the six solution pages** (P04, P05).

   Built on 28 October 2026:
   - The map locator (P04) is on each service card and in each solution intro. Automation is a token on the connection; support is the whole map.
   - P05 became a spec sheet of four labelled rows, with the deliverables as list items, rather than a flow with connectors.
   - The ways to start are ruled columns.
   - The record is in `design-system.md` sections 12.21 and 13.
7. **Process map** (P06), **About** (P07) and **Contact** with the open-node CTA (P08).

   Process built on 28 October 2026:
   - A vertical connector with nodes drawn as the work matures: sketch, defined, built, accepted, live.
   - The outputs stay prose; the copy has no separators to split them.
   - The practices are ruled columns.
   - About and Contact were built the same day:
     - About: the download moves into the intro; the principles form a ruled 2×2 grid; the bidirectional node (P07) is drawn from the demo's own strings.
     - Contact: the business panel is primary, and the brief panel is tinted.
   - The open-node CTA (P08) is not built in the shared `EnterpriseCta`. Home's closing section got an open node instead of the orb.
   - The rest of home was built the same day:
     - the solutions are an open list (the accordion, its numbers and the glass aside are retired);
     - the approach output colour is tokenised;
     - the About band's circle is removed.
   - Privacy, Presentation and 404 followed the same day, so every page has had its redesign:
     - Privacy uses ruled rows;
     - Presentation uses link cards and no longer has the outdated glass sentence;
     - 404 puts its actions in the intro.
   - Remaining from this plan: step 8 (the motion pass) and step 9 (the audit), plus P08 in the shared CTA band.
8. **Motion pass across pages:** reveals, hover and the filter. The map's own animation ships in step 4.
9. **Audit:**
   - keyboard and screen reader (NVDA) in Arabic and English;
   - contrast;
   - Lighthouse (LCP, CLS);
   - Safari and Firefox, which were not checked so far;
   - an RTL/LTR review at 1440, 1024 and 390;
   - owner review.

---

## I. First assets to create

Before implementation, five files:

1. **FX-A01** `og-ar.png` (1200×630)
2. **FX-A02** `og-en.png` (1200×630)
3. **FX-A03** `wordmark-madar.svg`
4. **FX-A04** `wordmark-sayr.svg`
5. **FX-A05** `wordmark-raseed.svg`

Steps 1, 3 and 4 do not depend on any supplied asset, so implementation can start while these are in progress.

**Decisions needed with the assets:**
- Approve the "Systems Map" direction.
- IBM Plex Mono as the utility face: yes or no.
- Retire the hero art labels and DESIGN → BUILD → CONNECT.
- Keep or remove the numbered eyebrows.
- Home solutions: keep the accordion, or show all five services open.
- Whether a real discovery-session photograph (FX-B02) exists.

---

## J. Step 5 audit and asset brief (28 October 2026)

### What exists today
- **Image files:**
  - `public/assets/mark.svg` (logo and favicon).
  - `public/assets/social-cover.png`, a 1584×396 LinkedIn banner that `src/lib/metadata.ts` uses as the `og:image` for every page in both languages.
  - There are no photographs, no workshop photo, no product screenshots and no `srcset`. `next/image` is unavailable in the static export.
- **Drawn in code:** the hero systems map (step 4), the line icons, and the Work Lab mini windows (`WorkLab.tsx`).
  - The mini windows are hand-copied HTML of the demos, with their own strings in `src/content/*/lab.ts`, so they can drift from the real demos.
  - Several of their labels are still under 13px; they are exempt until replaced.
- **Demos:** `CrmDemo`, `OpsDemo` and `ErpDemo` are real interactive components with the sample data in `src/content/*/projects.ts`. They are the source of truth for what each product does.

### Implemented in step 5
- **Systems map on view:** `src/components/visual/MapFigure.tsx` uses one IntersectionObserver and no dependency.
  - It marks the map `data-shown` the first time 30% of it is on screen, then disconnects, so the map draws once and never replays.
  - It observes only when `html[data-motion="ok"]` is set.
  - Until the map is shown, its parts wait hidden, and only under that gate. If the script never runs, they appear after 2.5s.
  - With reduced motion, or without JavaScript, the map is complete from the first paint.
  - Only opacity and transform animate, so there is no layout shift.
- **Demo button arrows:**
  - «نقل إلى … ←» / "Move to … →" (Madar) is a direction cue, so `ArrowText` draws the arrow as an icon and the button names no longer include it. `.small-button` is now inline-flex so the icon stays on the label line.
  - «اعتماد تجريبي ✓» / "Approve (demo) ✓" is left as written. The check is part of the action's label rather than decoration, and removing it would change the visible wording.

### Demo visuals: code, not screenshots
For the step 5 Work Lab covers (P02, P03), render a static preview mode of the real demo components, rather than supplying screenshots or keeping the hand-copied windows.
- **Accuracy:** the preview is the demo itself, with the same data and labels. It cannot drift and needs no recapture when the copy changes. It is live text in both languages and mirrors with `dir`.
- **Implementation:** a `preview` prop on each demo renders its first view only.
  - Madar shows its three stage columns, Sayr its request list and selected request, and Raseed its stock table.
  - The preview is wrapped in `inert` and `aria-hidden`, and scaled with CSS `transform` inside a 16:10 cover. The 13px floor is measured after scaling.
  - Ids are omitted in preview mode, so there are no duplicates.
- **Cover:** each cover keeps its existing hue field and the sample-data disclosure. The demo name is HTML text, using wordmarks FX-A03 to FX-A05 when they are supplied.
- **Where screenshots are still needed:** only where code cannot render: the share images and the optional per-demo share cards (P11).

### Capture specification (P11 per-demo share cards, optional)
The cards are generated by a script from the real demos, never drawn by hand.
- **Routes:** `/project?project=crm|ops|erp` and their `/en` equivalents, from the production build (`npm run build`, then `npm run preview`).
- **Browser:**
  - Bundled Playwright Chromium.
  - Capture `.demo-shell` at a 1024×640 viewport, `deviceScaleFactor` 2, `reducedMotion: "reduce"`.
  - Wait for `document.fonts.ready`. Park the pointer, and leave no focus ring.
- **State:** the initial state only, with no clicks, so every value shown is the shipped sample data. Keep the «بيانات تجريبية محلية» / "Local sample data" note visible.
- **Output:** composed into 1200×630 PNG cards under 300 KB, at `public/assets/social/demo-{crm,ops,erp}-{ar,en}.png`.

### Services and solution pages (recommendation for step 6)
One drawing serves every service, rather than six separate illustrations.
- **Map locator (P04):** the hero map reduced to line art of its parts (two channels, the connection, three systems). The part a service covers is drawn in ink, and the rest in `--fx-line`.
- **Cards:** they stay typographic: label, title, summary, and the link with its drawn arrow.
- **Hover:** the border turns ink and the locator's highlighted part draws. This belongs to the step 8 motion pass.
- **Numbering:** none added. The services are alternatives, not a sequence.

### IBM Plex Mono
Still not recommended.
- Steps 3 to 5 set codes and labels in Plex Sans with tracking and tabular figures, with no legibility problem.
- Revisit it only if the step 6 locators need aligned technical labels.

### Prioritised asset brief
The section E rules still apply:
- only the hex values in `tokens.css`;
- Arabic typeset from the bundled Plex Sans Arabic, never generated letterforms;
- no people, offices, clients or invented screens;
- lowercase-kebab filenames under `public/assets/`.

**Priority 1: required for the current design**

| ID | File | Used by | Purpose |
| --- | --- | --- | --- |
| FX-A01 | `public/assets/social/og-ar.png` | `og:image` and `twitter:image` of every Arabic page, wired per locale in `src/lib/metadata.ts` when supplied | Arabic link previews that show the brand and the hero idea |
| FX-A02 | `public/assets/social/og-en.png` | The same for every `/en` page | The English variant of the same design |

This OG specification replaces the section E composition, so the images match the shipped hero:
- **Size:** 1200×630 px (1.91:1), PNG-24, opaque, under 300 KB. Keep a 2400×1260 master.
- **Background:**
  - The canvas is `--fx-paper` `#f7fafc`.
  - The lower 45% is a band in `--fx-tint` `#edf4fa`, with the 24px drafting grid in `--fx-line` `#dce7ee` at 60%, as on the home page.
- **Upper part (text):** the header lockup (mark plus "Frentex" / "TECH") and the hero title on two lines.
  - Arabic: «أنظمة مترابطة.» in `--fx-ink` `#173f61` and «أعمال تتقدّم.» in `--fx-steel` `#638daf`.
  - English: "Systems," and "not just sites." in the same two colours.
  - Type: IBM Plex Sans Arabic 600. Arabic at 76–84px, line height 1.3, letter-spacing 0. English at 80–88px, line height 1.1, letter-spacing −0.02em.
- **Band (picture):** a simplified copy of the hero map, without node text, so it stays legible as a thumbnail. Its parts:
  - the two channel frames;
  - the ink connector with the teal port;
  - three system nodes on the bus.

  It flows right-to-left in the Arabic image and left-to-right in the English one; otherwise the two are identical.
- **Text-safe area:** all text inside x 300–900 and y 70–360, so it survives WhatsApp's square crop. Nothing within 60px of any edge; the map may run off the left and right edges.
- **Text allowed:** only the lockup and the hero title. No URL, tagline or claims.
- **Relationship:** one master design with an RTL and an LTR variant, using the same layout, colours and map.
- **Why:** the current banner is 4:1 in a 1.91:1 slot, so previews crop away the name and logo, and Arabic shares show English text.

**Priority 2: improves Work Lab and the demos (step 5 implementation)**

| ID | File | Used by |
| --- | --- | --- |
| FX-A03 | `public/assets/lab/wordmark-madar.svg` | Work Lab cover, demo header, next-demo strip, map node |
| FX-A04 | `public/assets/lab/wordmark-sayr.svg` | The same places, for Sayr |
| FX-A05 | `public/assets/lab/wordmark-raseed.svg` | The same places, for Raseed |

The wordmark specification is in section E:
- one colour (`currentColor`) Arabic lettering;
- viewBox height 120, transparent, with no padding;
- legible at 32px tall;
- static; any reveal is done in CSS.

Without them, the covers use the names in Plex Sans Arabic 700, and nothing breaks.

**Priority 3: optional**
- FX-B01: Latin companion wordmarks (section E).
- FX-B02: a discovery-session photograph, only if a real one exists (section E). There is no existing workshop photo to replace.
- FX-B03: a refreshed LinkedIn banner, used off-site.
- P11: per-demo share cards, generated by script from the capture specification above. No owner artwork is needed.

**Not requested:** service illustrations, stock or AI photography, and product screenshots for the Work Lab, because the real components render those previews.
