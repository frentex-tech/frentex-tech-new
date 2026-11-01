# Page redesign workflow

Status: approved with the design system, 28 October 2026. Use it for every page redesign after the design system is approved. It builds on [`design-system.md`](design-system.md) (rules), [`page-architecture.md`](page-architecture.md) (page facts) and the test suite ([`tests/e2e/README.md`](../tests/e2e/README.md)).

One page (or one shared component) per change. Nothing is committed, pushed, stashed or reset unless the owner asks.

---

## 0. Before starting

- [ ] `git status` is understood: note which files are already modified, so your diff can be told apart from earlier work.
- [ ] The suite is green on the current build, or every existing failure is known and written down. Rerun once before treating a failure as yours; low free memory on this machine causes transient `ERR_INSUFFICIENT_RESOURCES` failures and timeouts.
- [ ] The owner decisions that touch this page are known: the decision log in `design-system.md` section 13, including its "Still open" list.

---

## 1. Inspect the page and what it does

- Find the page in `page-architecture.md` section 1: its component, archetype, routes in both locales and redesign status.
- Read the page component and every component it renders, its content files in `src/content/ar` and `src/content/en`, and its route files.
- View its baselines at all three viewports, in both locales: `tests/e2e/__screenshots__/win32/{desktop-1440,tablet-1024,mobile-390}/visual.spec.ts/<page>.png` and `en-<page>.png`.
- List every interactive element and state: links, anchors, query parameters, dialogs, live regions, filters and demo actions.

## 2. Record the behaviour and constraints to keep

Write down, before changing anything:
- the URLs, anchors (`id`s used as link targets), query parameters and `hreflang` behaviour;
- the visible copy, including intentional `<br>`s. It stays unless the owner approves a change;
- accessibility behaviour: landmarks, heading outline, labels, focus order and focus management, live regions;
- the class names that tests select (`grep` the class in `tests/e2e/`);
- what is shared with other pages, such as `WorkLab` on home and `/work`, or `SolutionPage` across six slugs.

This is a static site with no backend: there are no API contracts or permissions. The equivalents to preserve are the route registry, the content types and the demo behaviour.

## 3. Read the rules that apply

- `design-system.md`: sections 1–10 always; section 12 for every component the page uses.
- The page's archetype row in `page-architecture.md` section 4, and its entry in section 3.
- The plan's notes for this page (`visual-redesign-plan.md` sections C and E), as direction, not as rules.

## 4. Check references

- Figma: no Figma file is referenced anywhere in the repository. If a Figma file or screenshot is supplied for this page, inspect it and note where it conflicts with the design system. The design system wins unless the owner decides otherwise.
- Supplied assets for this page (plan sections E and J): are they present in `public/assets/`? If not, use the documented fallback.

## 5. Name the specific problems

List concrete problems with evidence: a screenshot region, a selector or a measured value. For example: "the stage cards are centred in a 980px column while the intro aligns to the content edge", as the Process page was before its redesign. Not "it looks dated". Include the relevant items from `design-audit.md`.

## 6. Define the layout and direction

- Write a one-paragraph intent: what the page must make clear, and its single signature moment, if any.
- Sketch the regions at 1440 and 390 (ASCII is enough), in reading order for Arabic. English mirrors it.
- Map every region to existing components and tokens. For anything new, say why the shared patterns are not enough (section "Exceptions" below).
- Self-critique against the frontend-design skill: would this layout appear for any similar company? Does every number, divider and label encode something true? Remove one decoration before building.
- **Stop for owner review if** the plan needs new copy, a new asset, a new token or component, or a change to a shared component that affects other pages.

## 7. Implement

- Use the tokens and the shared components. Extend a component's existing rule block in `site.css`; do not add a second block for the same selector.
- Put a new page-specific component in its own commented section of `site.css`, with classes named after the component.
- Use logical properties. Add `[dir="ltr"]` rules only where they are unavoidable, at the end of `site.css` with the other direction overrides.
- Keep Arabic strings whole in JSX; compose them with template literals.
- Motion: hidden starting states only under `html[data-motion="ok"]`, with a fallback that shows the content (design system, section 7).
- No new dependencies without justification. Prefer server components; add `"use client"` only where state or browser APIs are needed.
- This repository's Next.js has breaking changes compared with older versions. Read the relevant guide in `node_modules/next/dist/docs/` before using a Next.js API (`AGENTS.md`).

## 8. Preserve what must not change

- Route keys, URLs, anchors and query parameters.
- Content types and copy.
- Demo data, ids, behaviour and status messages.
- Validation in the brief dialog.
- Accessibility behaviour recorded in step 2.
- `hreflang` and locale labelling ("(in Arabic)" links).

## 9. Verify in a real browser

```sh
npm run build
npm run preview          # serves out/ at http://localhost:8765
```

Open the page in the browser pane. For both locales (`/<page>` and `/en/<page>`), check:
- the layout against the sketch from step 6;
- keyboard: Tab through every control; the focus ring is visible; the order follows the reading direction; Escape closes menus and dialogs;
- hover, focus, selected and empty states, and any demo action;
- `prefers-reduced-motion: no-preference` (motion plays once and ends visible) and `reduce` (nothing moves, nothing hidden);
- no console errors.

## 10. Test the viewports

At 1440, 1024 and 390 in both locales, plus a quick pass at 900, 720 and 360 because of the breakpoints:
- no horizontal scroll;
- no text under 13px except permitted Latin labels;
- headings break where the copy intends;
- touch targets are at least 44px (40px in dense demo rows);
- the mobile menu works.

## 11. Run the checks

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Failures are expected for the page you changed. Review them with `npm run test:e2e:report`, image by image and locale by locale. Then:
- **Unexpected difference on this page** → fix the code.
- **Difference on another page** → either the change leaked through a shared selector (fix it), or it was a deliberate shared change (stop and report it).
- **Intended difference** → `npm run test:e2e:update`. Then compare every rewritten PNG with the reviewed render; anti-aliasing can vary by one or two levels between runs. Never bulk-accept.
- **A light colour change** (rules, borders, tints) can pass the screenshot comparison unnoticed, because its per-pixel threshold is 0.2 (audit H7). Rewrite the affected viewports with `--update-snapshots=all`, then compare old and new PNGs pixel-exactly.
- If `styles.spec.ts` asserts a value you changed on purpose (for example a transition), update the assertion in the same change and say so.

New behaviour gets a test: a reveal that must end visible, a new interaction or a new route.

## 12. Review the diff

```sh
git status
git diff --stat
git diff -- src/
```

- Only the intended files changed. Earlier uncommitted work is untouched.
- No other page's component or shared rule changed unless that was the point.
- Baseline changes are limited to this page's screenshots and snapshots, plus any documented shared change.
- Update `page-architecture.md` (redesign status, exceptions) and, if a shared rule changed, `design-system.md`.

---

## Exceptions

A page may need something the shared patterns cannot express, such as the systems map on home. To introduce it:
1. State why the shared components and archetype pattern are not enough, in one or two sentences.
2. Keep the global language: the palette, type scale, radii, line weights, focus ring and motion rules still apply. An exception is a new arrangement, not a new style.
3. Scope it to the page's own classes. Do not change a shared selector for one page.
4. Record it in the exceptions register (`page-architecture.md` section 6) with the reason and the approval.
5. If a second page needs the same thing, promote it to a shared component in `design-system.md` section 12.

Pages should feel related, not identical.

---

## Definition of done

- [ ] The intent, sketch and problem list from steps 5–6 are in the change summary.
- [ ] Both locales verified in the browser at 1440, 1024 and 390, with keyboard and reduced motion.
- [ ] Lint, typecheck, build and the full suite pass; every changed baseline reviewed.
- [ ] No copy changed without approval; no new hex, radius, shadow, font size or breakpoint outside the design system.
- [ ] Docs updated (status and exceptions).
- [ ] Nothing committed.

## Change summary template

```
Page: <route key>, Arabic and English
Intent: <one paragraph>
Problems fixed: <list with evidence>
Shared changes: <none, or list with affected pages>
Exceptions: <none, or register entry>
Copy changes: <none, or approved list>
Checks: lint ✓ typecheck ✓ build ✓ e2e <passed>/<total>; baselines updated: <files>
Browser: <viewports and locales checked; keyboard; reduced motion>
Not verified: <anything not checked>
```

---

## Known pitfalls in this repository

- Lightning CSS drops an unprefixed `backdrop-filter` when it precedes the `-webkit-` form. This only matters if the property comes back, and the design system rules it out.
- Logical properties resolve against the element's own `direction`. Elements with `dir="ltr"` inside Arabic pages (codes, the logo lockup, the demo eyebrow) need care.
- Windows `next build` misplaces segment prefetch files; `postbuild` fixes it.
- In Git Bash, set `MSYS_NO_PATHCONV=1` before `NEXT_PUBLIC_BASE_PATH=/frentex-tech`.
- `global-setup` refuses to test a stale build or a base-path build: rebuild first.
- To compare against an older build, temporarily restore the changed sources, build into `out`, then restore and verify by checksum. A scratch copy cannot build, because Turbopack refuses a `node_modules` junction outside its root.
