# FRENTEX TECH — VERIFIED DEFECT REGISTER

**Verification Date:** October 31, 2026  
**Auditor:** Independent Technical Verification & Review Team  
**Governing Documents:**  
- [`WEBSITE_AUDIT_REPORT.md`](file:///d:/ado-omar/live-site/frentex-tech/WEBSITE_AUDIT_REPORT.md)  
- [`WEBSITE_AUDIT_VERIFICATION.md`](file:///d:/ado-omar/live-site/frentex-tech/WEBSITE_AUDIT_VERIFICATION.md)  
**Target Codebase:** `d:\ado-omar\live-site\frentex-tech` (`feature/nextjs-migration` at `300ed55`)  
**Scope:** Actionable Defect Register containing only **CONFIRMED** and **PARTIALLY CONFIRMED** issues that genuinely require technical remediation. (False positives and duplicates have been filtered out).

---

## 1. Verified Defect Summary Matrix

| Defect ID | Verified Title | Category | Verified Severity | Status | Primary Action Required |
|---|---|---|:---:|:---:|---|
| **V-DEF-01** | Strict Mode Selector Collision on `/contact` | UX / Automated Testing | **P1** | **CONFIRMED** | Disambiguate `data-open-brief` attribute on hero and channels buttons. |
| **V-DEF-02** | Missing `id="filter-status"` on `/work` | Accessibility / Testing | **P1** | **CONFIRMED** | Add `id="filter-status"` to live region in `WorkLabShowcase.tsx`. |
| **V-DEF-03** | Footer Contact Links Contrast Failure (1.42:1) | WCAG 2.2 AA Contrast | **P1** | **CONFIRMED** | Update footer contact color from `#c6dce9` to `#173f61` (`--fx-ink`). |
| **V-DEF-04** | Stale Playwright Test Baselines (243 Test Mismatches) | Quality Assurance | **P1** | **PARTIALLY CONFIRMED** | Regenerate snapshot baselines after fixing V-DEF-01 and V-DEF-02. |
| **V-DEF-05** | Stylesheet Duopoly & 120 `!important` Overrides | CSS Architecture | **P2** | **PARTIALLY CONFIRMED** | Harmonize `solutions.css` with `tokens.css`; purge `!important` rules. |
| **V-DEF-06** | WCAG 2.5.3 (Label in Name) on Brand Links | Accessibility (Level A) | **P2** | **CONFIRMED** | Align `aria-label` with visible text "Frentex Tech" in header and footer. |
| **V-DEF-07** | Sub-Minimum Touch Targets on Footer Links (16.6px – 18.0px) | WCAG 2.2 AA Target Size | **P2** | **CONFIRMED** | Add `min-height: 44px; display: inline-flex;` to footer navigation targets. |
| **V-DEF-08** | Unoptimized 1.5 MB JPEG Payload | Web Performance / LCP | **P2** | **CONFIRMED** | Convert raw JPEGs in `public/assets/` to WebP/AVIF with `<picture>` tags. |
| **V-DEF-09** | OpenGraph Social Image Aspect Ratio (1584×396) | Technical SEO / Social | **P2** | **CONFIRMED** | Replace 4:1 panoramic banner with standard 1200×630 (1.91:1) cover. |
| **V-DEF-10** | Micro-Typography down to 8px in `solutions.css` | Typography / A11y | **P2** | **CONFIRMED** | Enforce minimum font floor of 12px across telemetry and SLA labels. |
| **V-DEF-11** | Negative Letter-Spacing on Arabic Headlines in `site.css` | Localization / Typography | **P2** | **CONFIRMED** | Scope negative tracking to Latin text (`:lang(en)`); use normal tracking for Arabic. |
| **V-DEF-12** | Unsubstantiated Technical SLA Claims in Content | Content / Commercial | **P2** | **CONFIRMED** | Rephrase "99.99% Availability" and "Zero-Loss Guarantee" to engineering patterns. |
| **V-DEF-13** | Brief Generator Lacks Automated Direct Intake Transmission | Business Conversion | **P2** | **PARTIALLY CONFIRMED** | Connect brief form to serverless webhook or direct WhatsApp payload. |
| **V-DEF-14** | Dynamic Query Case Study Routing Excluded from Search Indexing | Technical SEO | **P2** | **CONFIRMED** | Refactor `/project?project=:slug` to static paths `/project/madar-crm`, etc. |
| **V-DEF-15** | Raw Unicode Emojis in TSX Components | Visual Brand Identity | **P3** | **CONFIRMED** | Replace `🎯`, `📦`, `💬`, `✉️`, `📞` with custom vector SVG icons. |
| **V-DEF-16** | Decorative macOS Window Traffic Dots | Brand Art Direction | **P3** | **CONFIRMED** | Remove simulated Mac OS dots in `AboutHero.tsx` and `WorkLabShowcase.tsx`. |
| **V-DEF-17** | Orphaned Dead Components (`WorkLab.tsx`, `ServicesEcosystem.tsx`) | Code Maintainability | **P3** | **CONFIRMED** | Delete unused legacy files from the repository. |
| **V-DEF-18** | Inconsistent Card Corner Radii (18px vs 12px) | Brand Design Tokens | **P3** | **CONFIRMED** | Normalize card border radii to brand token `--fx-radius-panel: 12px;`. |
| **V-DEF-19** | Asymmetric Canonical URLs (`.html` Suffixes) | Technical SEO | **P3** | **CONFIRMED** | Harmonize canonical URLs in `src/i18n/routes.ts` to emit clean URLs. |
| **V-DEF-20** | Missing Corporate Legal Details in Contact Channels | Commercial Credibility | **P3** | **CONFIRMED** | Add Commercial Registration (CR) and tax identifiers to contact pages. |
| **V-DEF-21** | Redundant PDF Download Callouts in `AboutPage.tsx` | Content Hierarchy | **P4** | **CONFIRMED** | Keep PDF in Section 4; redirect Section 1 Hero CTA to interactive lab. |
| **V-DEF-22** | Dev-Only `console.error` Monkey-Patch in `RootDocument.tsx` | Code Hygiene | **P4** | **PARTIALLY CONFIRMED** | Replace monkey-patch with `suppressHydrationWarning` on `<html>`. |
| **V-DEF-23** | ESLint `<head>` Warning in `RootDocument.tsx:63` | Code Quality / Lint | **P4** | **CONFIRMED** | Replace raw `<head>` with Next.js App Router metadata conventions. |

---

## 2. Actionable Defect Dossiers (Detailed Technical Register)

---

### [V-DEF-01] Strict Mode Selector Collision on `/contact`
- **Severity:** P1 (Critical Launch Blocker)
- **Category:** UX & Automated Testing
- **Status:** **CONFIRMED**
- **Affected Route(s):** `/contact`, `/en/contact`
- **Verified Code Location:**
  - `src/components/visual/contact/ContactHero.tsx:43`: `<button className="hero-cta-primary" data-open-brief="">`
  - `src/components/visual/contact/ContactChannels.tsx:112`: `<button className="contact-brief-button" data-open-brief="">`
- **Verified Evidence:** Live DOM inspection confirms two elements with `data-open-brief=""`. This single defect causes 10 Playwright test crashes in `interactions.spec.ts` and `localization.spec.ts` (`Error: strict mode violation: locator('[data-open-brief]') resolved to 2 elements`).
- **Remediation:** Update `ContactHero.tsx` to `data-open-brief="hero"` and `ContactChannels.tsx` to `data-open-brief="channels"`. Update selectors in tests and scripts.

---

### [V-DEF-02] Missing `id="filter-status"` on `/work`
- **Severity:** P1 (Critical Accessibility & Test Defect)
- **Category:** Accessibility (WCAG 4.1.3 Status Messages) & Automated Testing
- **Status:** **CONFIRMED**
- **Affected Route(s):** `/work`, `/en/work`
- **Verified Code Location:** `src/components/visual/work/WorkLabShowcase.tsx:103-106`:
  ```tsx
  <div className="work-filter-status" role="status">
    <span className="status-live-dot" />
    <span>{lab.status(visibleCount, cardCategories.length)}</span>
  </div>
  ```
- **Verified Evidence:** The element has `role="status"` but lacks `id="filter-status"`. Playwright tests waiting for `locator('#filter-status')` time out after 5,000ms across all viewports.
- **Remediation:** Add `id="filter-status"` to the container in `WorkLabShowcase.tsx:103`.

---

### [V-DEF-03] Critical WCAG 2.2 AA Contrast Failure on Footer Contact Links (1.42:1)
- **Severity:** P1 (Critical Accessibility Defect)
- **Category:** Accessibility (WCAG 1.4.3 Contrast Minimum)
- **Status:** **CONFIRMED**
- **Affected Route(s):** All 35 routes (`src/components/layout/SiteFooter.tsx`)
- **Verified Code Location:** `src/styles/solutions.css:1240` and `site.css:2840`.
- **Verified Evidence:** Measured in live Chromium:
  - Phone link (`+966 59 200 5751`): `color: rgb(198, 220, 233)` on `effectiveBg: rgb(255, 255, 255)`.
  - Email link (`INFO@frntextech.com`): `color: rgb(198, 220, 233)` on `effectiveBg: rgb(255, 255, 255)`.
  - Calculated contrast ratio: **1.42 : 1** (Standard requires **4.5 : 1**). Completely illegible.
- **Remediation:** Update footer contact links to `color: var(--fx-ink, #173f61)` (contrast **10.43:1**) or `--fx-steel` (`#536b7e`, contrast **5.57:1**).

---

### [V-DEF-04] Stale Playwright Test Baselines (243 Test Failures)
- **Severity:** P1 (Quality Assurance & CI Blocker)
- **Category:** Automated Testing & Reliability
- **Status:** **PARTIALLY CONFIRMED** (Scope calibrated from 256 functional failures to 243 stale baselines + 13 real DOM bugs)
- **Affected Route(s):** All routes (`visual.spec.ts`, `structure.spec.ts`, `styles.spec.ts`)
- **Verified Evidence:** Forensic analysis of `playwright-report/data`:
  - 111 failures in `visual.spec.ts`: full-page visual regression snapshots differed from old pre-redesign baseline.
  - 90 failures in `structure.spec.ts`: HTML string snapshots and ARIA accessibility trees changed during redesign.
  - 27 failures in `styles.spec.ts`: CSS assertions checked old styling values.
- **Remediation:** Fix V-DEF-01 and V-DEF-02 first, then execute `npx playwright test --update-snapshots` to re-align test contracts with the approved redesign.

---

### [V-DEF-05] Stylesheet Duopoly & 120 `!important` Declarations
- **Severity:** P2 (Major Technical Debt)
- **Category:** CSS Architecture & Code Quality
- **Status:** **PARTIALLY CONFIRMED** (Overstated severity: dark/light page flash was false; CSS size bloat and override density are confirmed)
- **Affected Route(s):** Global (`src/components/layout/RootDocument.tsx:7-8`)
- **Verified Evidence:** `RootDocument.tsx` imports both `site.css` (8,152 lines) and `solutions.css` (7,967 lines), totaling 16,119 lines (~282 KB uncompressed). `solutions.css` contains exactly 120 `!important` declarations.
- **Remediation:** Harmonize `solutions.css` with design tokens in `tokens.css`; remove `!important` tags by adjusting selector specificity; eliminate duplicate utility declarations.

---

### [V-DEF-06] WCAG 2.5.3 (Label in Name) Violation on Brand Links
- **Severity:** P2 (Major Accessibility Defect)
- **Category:** Accessibility (Level A)
- **Status:** **CONFIRMED**
- **Affected Route(s):** All 35 routes (`src/components/layout/SiteHeader.tsx:32`)
- **Verified Evidence:** Measured in live DOM:
  - Accessible name: `aria-label="فرينتكس — الرئيسية"`
  - Visible inner text: `"Frentex TECH"`
  - Voice-navigation software searching for the visible string fails to locate the interactive element.
- **Remediation:** Change `aria-label` to `"Frentex Tech"` or remove the redundant `aria-label` to let the visible text provide the accessible name naturally.

---

### [V-DEF-07] Sub-Minimum Touch Targets on Footer Navigation Links (16.6px – 18.0px)
- **Severity:** P2 (Major Usability Defect)
- **Category:** Mobile Usability & Accessibility (WCAG 2.5.8 Target Size)
- **Status:** **CONFIRMED**
- **Affected Route(s):** All 35 routes (Global Footer)
- **Verified Evidence:** Measured on 390px mobile viewport:
  - Phone link: **18.0px height**
  - Email link: **18.0px height**
  - Privacy link: **16.6px height** (font size: 9px)
  - All targets are stacked with 0px spacing, strictly violating the 24×24px minimum.
- **Remediation:** Add `min-height: 44px; display: inline-flex; align-items: center;` to footer navigation anchors.

---

### [V-DEF-08] Unoptimized 1.5 MB JPEG Asset Payload
- **Severity:** P2 (Major Performance Defect)
- **Category:** Web Performance & Core Web Vitals (LCP)
- **Status:** **CONFIRMED**
- **Affected Route(s):** `/`, `/services`, `/en`, `/en/services`
- **Verified Evidence:** 7 JPEG files in `public/assets/` (`hero-teal.jpg`, `service-*.jpg`) total 1,525,787 bytes (~1.46 MB). Rendered via raw `<img>` tags without WebP/AVIF formats or responsive `srcset`. Next.js static export disables default image optimization.
- **Remediation:** Convert all JPGs to WebP/AVIF (reducing payload to <250 KB total) and implement responsive `<picture>` tags.

---

### [V-DEF-09] OpenGraph Social Cover Image Aspect Ratio Mismatch (1584×396)
- **Severity:** P2 (Major Brand Visibility Defect)
- **Category:** Technical SEO & Social Unfurls
- **Status:** **CONFIRMED**
- **Affected Route(s):** All 35 routes (`public/assets/social-cover.png`)
- **Verified Evidence:** PNG header inspection confirms dimensions of 1584 × 396 pixels (a 4.00:1 ratio). When shared on LinkedIn or Twitter/X (1.91:1 standard), the banner is center-cropped, truncating branding and text.
- **Remediation:** Generate a dedicated 1200×630 pixel `social-cover.png` with centered logo and value proposition.

---

### [V-DEF-10] Micro-Typography Violations (8px – 10px Font Sizes)
- **Severity:** P2 (Major Accessibility Defect)
- **Category:** Visual Design & Accessibility
- **Status:** **CONFIRMED**
- **Affected Route(s):** `/services`, `/work`, `/solution-*`
- **Verified Evidence:** Verified `font-size: 8px;` at lines 6367, 6403, 7475, 7495 in `solutions.css`, `9px` at 20+ locations, and `10px` at 50+ locations.
- **Remediation:** Enforce a strict minimum typography floor of `0.75rem` (12px) across all telemetry labels and SLA cards.

---

### [V-DEF-11] Negative Letter-Spacing on Arabic Headlines in `site.css`
- **Severity:** P2 (Major Localization Defect)
- **Category:** Localization & Visual Quality
- **Status:** **CONFIRMED**
- **Affected Route(s):** Arabic routes (`src/styles/site.css`)
- **Verified Evidence:** Verified in `site.css:84` (`h2 { letter-spacing: -1.1px; }`) and `site.css:250` (`.hero h1 { letter-spacing: -2.4px; }`). Arabic is a cursive script; negative tracking clips and detaches connecting character strokes.
- **Remediation:** Scope `letter-spacing: -1.1px` strictly to Latin typography (`:lang(en)`); enforce `letter-spacing: normal;` on Arabic typography (`:lang(ar)`).

---

### [V-DEF-12] Unsubstantiated Technical SLA Claims in Content
- **Severity:** P2 (Major Commercial Risk)
- **Category:** Commercial Credibility & Content
- **Status:** **CONFIRMED**
- **Affected Route(s):** `/services`, `/solution-business`, `/solution-support`
- **Verified Evidence:** Verified in `src/content/solution-details.ts`:
  - Line 72: "100% Tax Reconciliation"
  - Line 83: "Zero-Loss Queue Guarantee", "Strict Exactly-Once Delivery"
  - Line 104: "99.99% Measured SLA Uptime"
- **Remediation:** Reframe guarantees into architectural principles (e.g., "High-Availability Architecture Patterns", "Audited ZATCA Phase 2 Blueprints").

---

### [V-DEF-13] Brief Generator Lacks Automated Direct Intake Transmission
- **Severity:** P2 (Major Commercial Conversion Limitation)
- **Category:** Functionality & Business Conversion
- **Status:** **PARTIALLY CONFIRMED** (Corrected: `localStorage` is NOT used; lack of direct API transmission confirmed)
- **Affected Route(s):** All routes (`src/components/BriefDialog.tsx`)
- **Verified Evidence:** `BriefDialog.tsx` generates a formatted client-side `.txt` file for the user to download. It does not transmit lead data via webhook, email, or API endpoint.
- **Remediation:** Connect the submission handler to a serverless form webhook (e.g., Formspree/Resend) or format a direct WhatsApp pre-filled chat link.

---

### [V-DEF-14] Dynamic Query Route Indexing Vulnerability (`/project?project=...`)
- **Severity:** P2 (Major SEO Architecture Defect)
- **Category:** Technical SEO & Architecture
- **Status:** **CONFIRMED**
- **Affected Route(s):** `/project`, `/en/project`
- **Verified Evidence:** `src/i18n/routes.ts:27` explicitly marks `project: { indexable: false }`. Search engine crawlers and social bots cannot index Madar CRM, Sayr Ops, or Raseed ERP case studies independently.
- **Remediation:** Refactor into static path segments `/project/madar-crm`, `/project/sayr-ops`, `/project/raseed-erp` using `generateStaticParams()`.

---

### [V-DEF-15] Raw Unicode Emoji Clutter in TSX Components
- **Severity:** P3 (Minor Brand Defect)
- **Category:** Visual Brand Identity
- **Status:** **CONFIRMED**
- **Affected Route(s):** `/services`, `/contact`
- **Verified Evidence:** Verified in `ServicesPage.tsx:112` (`🎯`, `📦`, `🔄`) and `ContactChannels.tsx:57, 75, 79, 103` (`💬`, `📞`, `✉`, `📋`).
- **Remediation:** Replace Unicode emojis with clean, custom SVG stroke icons matching the `brand-mark` aesthetic.

---

### [V-DEF-16] Decorative macOS Window Traffic Dots
- **Severity:** P3 (Minor Design Defect)
- **Category:** Brand Art Direction
- **Status:** **CONFIRMED**
- **Affected Route(s):** `/about`, `/work`
- **Verified Evidence:** Verified in `AboutHero.tsx:132-135` and `WorkLabShowcase.tsx:126-129` (`<span className="dot red" />`, `yellow`, `green`).
- **Remediation:** Remove traffic light dots; replace with minimalist monospace terminal headers.

---

### [V-DEF-17] Orphaned Dead Components in Source Tree
- **Severity:** P3 (Minor Maintainability Defect)
- **Category:** Code Quality
- **Status:** **CONFIRMED**
- **Affected Route(s):** None (Dead code in source tree)
- **Verified Evidence:** Verified that `src/components/WorkLab.tsx` and `src/components/visual/solutions/ServicesEcosystem.tsx` have zero references across the codebase.
- **Remediation:** Safely delete both dead files.

---

### [V-DEF-18] Inconsistent Card Corner Radii (18px vs 12px)
- **Severity:** P3 (Minor Design Token Defect)
- **Category:** Visual Consistency
- **Status:** **CONFIRMED**
- **Affected Route(s):** `/services`, `/work`, `/solution-*`
- **Verified Evidence:** Verified `border-radius: 18px;` in `solutions.css:12, 4509, 5195, 5694` vs brand token `var(--fx-radius-panel: 12px)`.
- **Remediation:** Standardize card radii to `var(--fx-radius-panel, 12px)`.

---

### [V-DEF-19] Asymmetric Canonical URLs (`.html` Suffixes)
- **Severity:** P3 (Minor SEO Defect)
- **Category:** Technical SEO
- **Status:** **CONFIRMED**
- **Affected Route(s):** All inner routes and `/en`
- **Verified Evidence:** Verified in `src/i18n/routes.ts:65`: root route emits clean URL (`https://frntextech.com/`), while English home and inner routes emit `.html` (`https://frntextech.com/en.html`).
- **Remediation:** Unify canonical URL generator to emit clean trailing URLs without `.html`.

---

### [V-DEF-20] Missing Corporate Legal Details in Contact Channels
- **Severity:** P3 (Minor Commercial Defect)
- **Category:** Commercial Credibility
- **Status:** **CONFIRMED**
- **Affected Route(s):** `/contact`, `/en/contact`
- **Verified Evidence:** Verified in `ContactChannels.tsx`. Lacks Commercial Registration (CR) and tax identifiers required by enterprise procurement officers.
- **Remediation:** Add official CR number and headquarters address to contact channels.

---

### [V-DEF-21] Redundant PDF Download Callouts in `AboutPage.tsx`
- **Severity:** P4 (Cosmetic Defect)
- **Category:** Content Hierarchy
- **Status:** **CONFIRMED**
- **Affected Route(s):** `/about`, `/en/about`
- **Verified Evidence:** Verified in `AboutHero.tsx:56` and `AboutProfileDownload.tsx:28`: both offer identical download button for `frentex-company-profile.pdf`.
- **Remediation:** Keep PDF in Section 4; change Hero CTA to "Explore Interactive Lab".

---

### [V-DEF-22] Dev-Only `console.error` Monkey-Patch in `RootDocument.tsx`
- **Severity:** P4 (Cosmetic Hygiene Defect)
- **Category:** Code Quality
- **Status:** **PARTIALLY CONFIRMED** (Downgraded to P4; dev-only, zero production static export impact)
- **Affected Route(s):** Global (`src/components/layout/RootDocument.tsx:11-19`)
- **Verified Evidence:** Code is guarded by `process.env.NODE_ENV === "development"`. It never runs in production. Filters `"Encountered a script tag"`.
- **Remediation:** Remove monkey-patch; use `suppressHydrationWarning` on `<html>`.

---

### [V-DEF-23] Hardcoded ESLint Warning in Root Layout (`@next/next/no-head-element`)
- **Severity:** P4 (Cosmetic Lint Defect)
- **Category:** Code Quality
- **Status:** **CONFIRMED**
- **Affected Route(s):** Global (`src/components/layout/RootDocument.tsx:63`)
- **Verified Evidence:** `<head>` element inside App Router layout triggers ESLint warning.
- **Remediation:** Migrate inline script to Next.js App Router metadata or script component.

---

## 3. Filtered & Dismissed Items (False Positives & Duplicates)

1. **[DEF-06] (FALSE POSITIVE): Sub-Minimum Contrast on Work Lab Category Badges (2.11:1)**  
   - *Dismissal Rationale:* `#99b6ce` does not exist in any stylesheet. Live browser evaluation measured `.console-category-tag span` at `rgb(83, 107, 126)` on `rgb(248, 250, 252)` = **5.33:1 contrast ratio**, which fully passes WCAG 2.2 AA (4.5:1).
2. **[DEF-21] (DUPLICATE): Interactive Demo 1px Layout Shifts & Visual Mismatches**  
   - *Dismissal Rationale:* Merged into V-DEF-04. The visual regression test failures were caused by intentional card restyling during redesign without updating visual snapshot baselines, not an unpredictable 1px rendering bug.

---

**Report Prepared By:** Independent Technical Verification & Review Team  
**Governing Verification Report:** [`WEBSITE_AUDIT_VERIFICATION.md`](file:///d:/ado-omar/live-site/frentex-tech/WEBSITE_AUDIT_VERIFICATION.md)
