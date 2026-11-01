# FRENTEX TECH — WEBSITE AUDIT REMEDIATION ACTION PLAN

**Plan Date:** October 31, 2026  
**Auditor:** Independent Technical & Adversarial Audit Team  
**Scope:** Remediation Strategy for Frentex Tech Website Production Launch  
**Governing Audit Report:** [`WEBSITE_AUDIT_REPORT.md`](file:///d:/ado-omar/live-site/frentex-tech/WEBSITE_AUDIT_REPORT.md)  
**Route Inventory:** [`WEBSITE_ROUTE_INVENTORY.md`](file:///d:/ado-omar/live-site/frentex-tech/WEBSITE_ROUTE_INVENTORY.md)  
**Target Goal:** Transform NO-GO Status into a Clean Production GO with 100% Automated Test Passing Rate.

---

## 1. Remediation Strategy Overview

The adversarial audit confirmed that Frentex Tech possesses strong interactive engineering demos and clean static build infrastructure, but is crippled by an uncoordinated dual-design system (`site.css` vs `solutions.css`), broken automated test contracts (256 failing Playwright tests), critical WCAG accessibility failures (1.41:1 contrast), and unoptimized media assets.

To reach production launch safely without introducing regressions, remediation must follow a strict, disciplined 5-phase sequential roadmap.

```
PHASE IMPLEMENTATION FLOW:
┌─────────────────────────┐
│ Phase 1: QA & Blockers  │  -> Fix DOM collisions, missing ARIA IDs, stop test failures
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│ Phase 2: Design Tokens  │  -> Unify CSS, deprecate solutions.css, kill !important tags
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│ Phase 3: WCAG & Fonts   │  -> Contrast ratios >= 4.5:1, touch targets >= 24px, Arabic text
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│ Phase 4: Assets & SEO   │  -> Convert 1.5MB JPGs to AVIF/WebP, 1200x630 OG, clean canonicals
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│ Phase 5: Lead Funnel    │  -> Connect BriefDialog to webhook, verify 100% test pass rate
└─────────────────────────┘
```

---

## 2. Phased Implementation Roadmap

### Phase 1: Critical Blockers & QA Stabilization (Immediate Priority)
*Objective: Eliminate test-breaking DOM collisions and restore missing accessibility contracts.*

| Step | Action Item | Target File(s) | Defect Resolved | Est. Effort |
|:---:|---|---|:---:|:---:|
| **1.1** | **Disambiguate Duplicate Brief Triggers on Contact Pages:** Differentiate `data-open-brief` on `/contact` so that `ContactHero.tsx` uses `data-open-brief="hero"` and `ContactChannels.tsx` uses `data-open-brief="channels"`. Update selectors to resolve strict mode collisions. | `src/components/sections/contact/ContactHero.tsx`<br>`src/components/sections/contact/ContactChannels.tsx` | `[DEF-03]` | 1 hour |
| **1.2** | **Restore Missing Live Filter Status on Work Page:** Add `<div id="filter-status" className="sr-only" role="status" aria-live="polite">{statusMessage}</div>` inside `WorkLabShowcase.tsx`. Ensure screen readers announce filtered category counts. | `src/components/sections/work/WorkLabShowcase.tsx` | `[DEF-04]` | 1 hour |
| **1.3** | **Fix WCAG 2.5.3 (Label-in-Name) Mismatch on Brand Links:** Update `Header.tsx` and `Footer.tsx` so the accessible name matches the visible "Frentex TECH" string (e.g., `aria-label="Frentex Tech"` or remove redundant `aria-label`). | `src/components/layout/Header.tsx`<br>`src/components/layout/Footer.tsx` | `[DEF-07]` | 1 hour |
| **1.4** | **Remove Orphaned Dead Components:** Safely remove unused legacy components from the active source tree to reduce maintenance confusion. | `src/components/WorkLab.tsx`<br>`src/components/visual/solutions/ServicesEcosystem.tsx` | `[DEF-17]` | 30 mins |
| **1.5** | **Remove Module-Scope `console.error` Monkey-Patch:** Remove window monkey-patching in `RootDocument.tsx`. Add `suppressHydrationWarning` on `<html>` to resolve harmless server attribute warnings cleanly. | `src/components/layout/RootDocument.tsx` | `[DEF-18]` | 30 mins |

---

### Phase 2: Design System Unification & Stylesheet Deprecation
*Objective: Abolish the dual-CSS duopoly, retire `solutions.css`, and harmonize the website around unified core brand tokens.*

| Step | Action Item | Target File(s) | Defect Resolved | Est. Effort |
|:---:|---|---|:---:|:---:|
| **2.1** | **Consolidate CSS Design Tokens into `site.css`:** Audit all custom rules in `solutions.css`. Port only the missing structural layouts (`.solutions-grid`, `.showcase-stage`) into `src/styles/site.css` using established CSS custom properties (`--bg-canvas`, `--text-primary`, `--border-subtle`, `--radius-lg`). | `src/styles/site.css`<br>`src/styles/solutions.css` | `[DEF-01]` | 6 hours |
| **2.2** | **Purge 120+ `!important` Declarations:** Remove every `!important` rule in `solutions.css`. Allow the natural CSS cascade and token inheritance to control typography, card surfaces, and buttons. | `src/styles/solutions.css` | `[DEF-01]` | 4 hours |
| **2.3** | **Deprecate & Unlink `solutions.css`:** Remove `<link rel="stylesheet" href="/styles/solutions.css">` from `RootDocument.tsx`. Verify that the entire site builds with a single, unified stylesheet. | `src/components/layout/RootDocument.tsx` | `[DEF-01]` | 1 hour |
| **2.4** | **Standardize Corner Radii to 12px:** Replace all hardcoded 18px and 20px radii in showcase and solution cards with the official brand token `var(--radius-lg, 12px)`. | `src/styles/site.css` | `[DEF-23]` | 2 hours |
| **2.5** | **Eliminate AI Template Tropes (Traffic Light Window Dots):** Replace the macOS red/yellow/green window dots in `AboutEngineering.tsx` with clean monospace engineering headers. | `src/components/sections/about/AboutEngineering.tsx` | `[DEF-15]` | 1 hour |
| **2.6** | **Replace Unicode Emojis with Professional SVG Icons:** Replace raw emojis (`🎯`, `📦`, `💬`, `✉️`, `📞`, etc.) in `ServicesPage.tsx` and `ContactChannels.tsx` with clean, vector SVG stroke icons. | `src/components/pages/ServicesPage.tsx`<br>`src/components/sections/contact/ContactChannels.tsx` | `[DEF-14]` | 3 hours |

---

### Phase 3: WCAG 2.2 AA Accessibility & Typography Remediation
*Objective: Guarantee full accessibility compliance, legible contrast, and culturally authentic Arabic typography.*

| Step | Action Item | Target File(s) | Defect Resolved | Est. Effort |
|:---:|---|---|:---:|:---:|
| **3.1** | **Remediate Footer Phone Link Contrast (1.41:1 -> 12.6:1):** Ensure footer contact links use high-contrast foreground colors (`#1e293b` in light mode, `#94a3b8` in dark mode), satisfying the WCAG 4.5:1 threshold. | `src/styles/site.css`<br>`src/components/layout/Footer.tsx` | `[DEF-05]` | 1 hour |
| **3.2** | **Remediate Category Badges Contrast (2.11:1 -> 7.8:1):** Update `.showcase-badge` and category pills to use dark slate `#0f3b56` text with `#e8f1f7` background tint. | `src/styles/site.css` | `[DEF-06]` | 1 hour |
| **3.3** | **Fix Negative Letter-Spacing on Arabic Typography:** Ensure `letter-spacing: -0.5px` applies strictly to Latin text (`:lang(en)` or `[dir="ltr"]`). Set `letter-spacing: normal` for Arabic headings (`[dir="rtl"]`). | `src/styles/site.css` | `[DEF-12]` | 1 hour |
| **3.4** | **Enforce Minimum Touch Target Sizes (24px Floor):** Add `min-height: 44px; display: inline-flex; align-items: center;` to footer navigation links to satisfy WCAG 2.5.8. | `src/styles/site.css` | `[DEF-10]` | 1 hour |
| **3.5** | **Eliminate Micro-Typography (8px / 6pt Floor):** Elevate all SLA and telemetry micro-labels in `SolutionPage.tsx` to a minimum legible size of `0.75rem` (12px). | `src/styles/site.css` | `[DEF-11]` | 1 hour |

---

### Phase 4: Performance, Asset Optimization & Technical SEO
*Objective: Minimize payload transfer times, optimize Largest Contentful Paint (LCP), and refine social media link unfurls.*

| Step | Action Item | Target File(s) | Defect Resolved | Est. Effort |
|:---:|---|---|:---:|:---:|
| **4.1** | **Compress & Convert 1.5 MB JPEG Images to WebP/AVIF:** Convert `hero-teal.jpg` (306 KB) and all `service-*.jpg` images (170–233 KB) into WebP/AVIF formats with responsive `<picture>` tags. | `public/assets/`<br>`src/components/pages/ServicesPage.tsx` | `[DEF-08]` | 2 hours |
| **4.2** | **Generate Compliant 1200×630 Open Graph Social Image:** Replace the current 1584×396 (4:1) banner with a standard 1200×630 (1.91:1) `social-cover.png` featuring centered logo and bilingual value proposition. | `public/assets/social-cover.png` | `[DEF-09]` | 2 hours |
| **4.3** | **Harmonize Canonical URLs (Remove `.html` Suffixes):** Update canonical tag generators so all routes emit clean paths without `.html` extensions. | `src/app/layout.tsx`<br>`src/lib/metadata.ts` | `[DEF-20]` | 1 hour |
| **4.4** | **Refactor Dynamic Query Demos to Static Path Segments:** Transform `/project?project=:slug` into static routes `/project/madar-crm`, `/project/sayr-ops`, and `/project/raseed-erp` using `generateStaticParams()`. Maintain query redirects for backwards compatibility. | `src/app/project/[slug]/page.tsx` | `[DEF-24]` | 3 hours |
| **4.5** | **Resolve `@next/next/no-head-element` Lint Warning:** Migrate remaining raw `<head>` elements in `RootDocument.tsx` to Next.js App Router metadata conventions. | `src/components/layout/RootDocument.tsx` | `[DEF-25]` | 30 mins |

---

### Phase 5: Commercial Conversion, Lead Intake & Test Suite Sign-off
*Objective: Transform mock lead submissions into real business inquiries, ground technical copy in reality, and achieve 100% test pass rate.*

| Step | Action Item | Target File(s) | Defect Resolved | Est. Effort |
|:---:|---|---|:---:|:---:|
| **5.1** | **Implement Real Lead Intake Pipeline in Brief Dialog:** Replace `localStorage.setItem` in `BriefDialog.tsx` with a real serverless webhook endpoint (or direct-to-WhatsApp prefilled message) ensuring inquiries are delivered to Frentex sales. | `src/components/dialogs/BriefDialog.tsx` | `[DEF-16]` | 2 hours |
| **5.2** | **Ground Exaggerated Copy & SLA Promises:** Replace fictional "99.99% Availability" and unverified cloud claims in `ServicesPage.tsx` with credible engineering standards (e.g., "High-Availability Architecture Patterns"). | `src/components/pages/ServicesPage.tsx`<br>`src/components/pages/SolutionPage.tsx` | `[DEF-13]` | 2 hours |
| **5.3** | **Stabilize Interactive Demo Dimensions (Fix 1px Layout Shifts):** Enforce strict `box-sizing: border-box` and explicit container heights on Madar, Sayr, and Raseed demo controls to prevent visual regression failures. | `src/components/interactive/` | `[DEF-21]` | 2 hours |
| **5.4** | **Add Corporate Registration Context on English Contact:** Include formal Commercial Registration (CR) and tax identifiers on `/en/contact`. | `src/components/sections/contact/ContactChannels.tsx` | `[DEF-22]` | 30 mins |
| **5.5** | **Deduplicate About Page PDF Downloads:** Keep the profile PDF download in Section 4 of `AboutPage.tsx`; re-aim the Hero button to "View Interactive Lab". | `src/components/sections/about/AboutHero.tsx` | `[DEF-19]` | 30 mins |
| **5.6** | **Execute Full Quality Assurance & Playwright Test Suite Sign-Off:** Re-run `npm run lint`, `npm run typecheck`, and `npx playwright test`. Achieve 100% passing tests (639 passed, 0 failed). | Full Codebase | `[DEF-02]` | 3 hours |

---

## 3. Strict Scope Boundaries: What NOT to Touch

To avoid regression traps and accidental feature breakage, developers executing this action plan must adhere to the following negative constraints:

1. **DO NOT Modify Core Interactive Demo State Machines:**
   - Do NOT rewrite the internal state logic of `MadarInteractive.tsx`, `SayrInteractive.tsx`, or `RaseedInteractive.tsx`. Their business logic and reactive transitions function correctly in-memory; only container border sizing and visual snapshot dimensions should be stabilized.
2. **DO NOT Alter the Static Export Architecture:**
   - Do NOT attempt to convert Next.js from `output: "export"` to a Node.js server container. The static export requirement is a deliberate architectural decision for edge performance and zero server attack surface.
3. **DO NOT Discard the Dual-Locale Structure:**
   - Do NOT replace the root Arabic (`/`) and sub-path English (`/en/`) routing system with dynamic middleware rewriting. The localized static page generation is clean and fully functional.
4. **DO NOT Change Primary Brand Colors:**
   - The deep navy (`#0b1e2a`), slate (`#173b56`), and engineering teal accents established in `site.css` are the legitimate brand identity. Do NOT introduce new unapproved palettes.

---

## 4. Verification & Launch Sign-off Checklist

Before flipping the production status from **NO-GO** to **GO**, the engineering lead must verify:

- [ ] `npm run typecheck` passes with 0 errors.
- [ ] `npm run lint` passes with 0 errors and 0 warnings.
- [ ] `npm run build` generates 35 static HTML export pages cleanly in `out/`.
- [ ] `npx playwright test` passes 100% across desktop, tablet, and mobile projects (639 passed, 0 failed).
- [ ] DevTools color contrast check confirms zero text elements below 4.5:1.
- [ ] Social card validator confirms `social-cover.png` renders without cropping in 1.91:1 ratio.
- [ ] Lead brief submission sends a verified test alert to the Frentex intake channel.
- [ ] Single stylesheet `site.css` is loaded; `solutions.css` is completely removed.

---

**Report Prepared By:** Frentex Independent Adversarial Audit Team  
**Governing Documents:**  
- [`WEBSITE_AUDIT_REPORT.md`](file:///d:/ado-omar/live-site/frentex-tech/WEBSITE_AUDIT_REPORT.md)  
- [`WEBSITE_ROUTE_INVENTORY.md`](file:///d:/ado-omar/live-site/frentex-tech/WEBSITE_ROUTE_INVENTORY.md)  
- [`WEBSITE_AUDIT_EVIDENCE/`](file:///d:/ado-omar/live-site/frentex-tech/WEBSITE_AUDIT_EVIDENCE)
