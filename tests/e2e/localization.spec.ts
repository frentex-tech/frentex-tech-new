import { existsSync } from "node:fs";
import { join } from "node:path";
import { expect, openPage, test } from "./support/fixtures";
import { exportedEnglishPaths, routes } from "./support/routes";

// Locale structure and language switching. English pages exist only where approved
// copy has been added, so the expectations are derived from the exported files.

const isEnglishPath = (path: string) => /^\/en(\/|$|\?|#)/.test(path);
const arabicRoutes = routes.filter((item) => item.status !== 404 && !isEnglishPath(item.path));

/** The English URL of an Arabic page: `/` -> `/en`, `/about?x` -> `/en/about?x`. */
function englishPath(arabicPath: string): string {
  const url = new URL(arabicPath, "http://site");
  return `${url.pathname === "/" ? "/en" : `/en${url.pathname}`}${url.search}`;
}

/** The Arabic URL of an English page: `/en` -> `/`, `/en/about` -> `/about`. */
function arabicPath(englishUrl: string): string {
  const url = new URL(englishUrl, "http://site");
  return `${url.pathname.replace(/^\/en/, "") || "/"}${url.search}`;
}

function isExported(path: string): boolean {
  const pathname = new URL(path, "http://site").pathname;
  return existsSync(join("out", pathname === "/" ? "index.html" : `${pathname}.html`));
}

test.beforeEach(() =>
  test.skip(test.info().project.name !== "desktop-1440", "locale structure does not depend on the viewport"),
);

test("Arabic pages are right-to-left and link to English only where it exists", async ({ page }) => {
  test.setTimeout(180_000); // visits every route
  for (const route of arabicRoutes) {
    await openPage(page, route.path);
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

    const english = englishPath(route.path);
    const languageLink = page.locator(".language-switch");
    if (isExported(english)) {
      await expect(languageLink, route.path).toHaveAttribute("href", english);
      await expect(languageLink).toHaveAttribute("hreflang", "en");
      await expect(languageLink).toHaveAttribute("lang", "en");
      await expect(languageLink).toHaveAttribute("aria-label", "English");
      await expect(languageLink).toHaveText("EN");
    } else {
      await expect(languageLink, `${route.path} has no English page, so no language link`).toHaveCount(0);
    }
  }
});

test("English pages are left-to-right and link back to their Arabic page", async ({ page }) => {
  test.setTimeout(180_000);
  const englishPages = exportedEnglishPaths();
  test.skip(englishPages.length === 0, "no English page has approved copy yet");

  for (const path of englishPages) {
    await openPage(page, path);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page.locator(".language-switch"), path).toHaveAttribute("href", arabicPath(path));
    await expect(page.locator(".language-switch")).toHaveAttribute("hreflang", "ar");
    await expect(page.locator(".language-switch")).toHaveAttribute("lang", "ar");
    await expect(page.locator(".language-switch")).toHaveAttribute("aria-label", "العربية");
    await expect(page.locator(".language-switch")).toHaveText("ع");
  }
});

test("English pages keep visitors in English, or say when a link opens an Arabic page", async ({ page }) => {
  test.setTimeout(180_000);
  const englishPages = exportedEnglishPaths();
  test.skip(englishPages.length === 0, "no English page has approved copy yet");

  const sectionLinks = new Set<string>();
  for (const path of englishPages) {
    await openPage(page, path);
    const navigation = await page.locator("#navigation a:not(.language-switch)").evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")!),
    );
    expect(navigation.filter((href) => !isEnglishPath(href)), `${path}: header links that leave English`).toEqual([]);

    const links = await page.locator("a[href]:not(.language-switch)").evaluateAll((anchors) =>
      anchors.map((anchor) => ({
        href: anchor.getAttribute("href")!,
        hrefLang: anchor.getAttribute("hreflang") ?? "",
        name: (anchor.getAttribute("aria-label") ?? anchor.textContent ?? "").replace(/\s+/g, " ").trim(),
      })),
    );
    for (const link of links) {
      if (!link.href.startsWith("/")) continue; // in-page, phone and external links
      const opensArabic = !isEnglishPath(link.href);
      // A link to an Arabic page is marked in its name; the marker disappears once the page has English copy.
      expect(link.hrefLang, `${path}: "${link.name}" -> ${link.href}`).toBe(opensArabic ? "ar" : "");
      expect(link.name.includes("(in Arabic)"), `${path}: "${link.name}" -> ${link.href}`).toBe(opensArabic);
      if (link.href.includes("#")) sectionLinks.add(link.href);
    }
  }

  for (const href of sectionLinks) {
    const [target, id] = href.split("#");
    await openPage(page, target);
    await expect(page.locator(`[id="${id}"]`), `${href} has no target section`).toHaveCount(1);
  }
});

test("the English brief dialog prepares an English summary", async ({ page }) => {
  test.skip(!isExported("/en/contact"), "the Contact page has no English copy yet");
  await openPage(page, "/en/contact");
  await page.locator("[data-open-brief]").click();
  await expect(page.locator("#brief-dialog")).toBeVisible();
  await page.locator('select[name="service"]').selectOption({ index: 2 });
  await page.locator('textarea[name="challenge"]').fill("  Customer requests are tracked in messages and spreadsheets  ");
  await page.locator('input[name="users"]').fill(" The sales team ");
  await page.locator('#brief-form [type="submit"]').click();

  await expect(page.locator("#brief-result")).toBeVisible();
  await expect(page.locator("#brief-text")).toHaveText(
    "Project summary — Frentex Tech\n\nSolution type: An ERP or CRM system\n\nThe problem:\nCustomer requests are tracked in messages and spreadsheets\n\nUsers:\nThe sales team\n\nQuestions to discuss:\n- Which systems and data are available?\n- What is the first user journey we want to enable?\n- What are the acceptance criteria for the first release?\n- What are the scope, budget and target date?\n\nThis summary was prepared on your device. No data was sent and no meeting was booked.",
  );
});

test("the English demos run in English", async ({ page }) => {
  test.skip(!isExported("/en/project"), "the demos have no English copy yet");
  const status = page.locator("#demo-status");

  await openPage(page, "/en/project?project=crm");
  // Lower case on purpose: the search ignores letter case.
  await page.locator("#lead-search").fill(" partner ");
  await expect(status).toHaveText("Matching opportunities: 1");
  await expect(page.locator(".lead-card")).toHaveText([/Partner portal/]);
  await page.locator("#lead-search").fill("");
  await page.locator('[data-lead="1"][data-direction="1"]').click();
  await expect(status).toHaveText("Moved “Services company website” to “Proposal sent”. This is a local sample action.");

  await openPage(page, "/en/project?project=ops");
  await page.locator('#request-detail [data-action="approve"]').click();
  await expect(status).toHaveText("Approved (demo) — request 14");
  await expect(page.locator('[data-request="14"] small')).toHaveText("#14 · Approved (demo)");

  await openPage(page, "/en/project?project=erp");
  await page.locator("#qty-3").fill("1");
  await page.locator('[data-buy="3"]').click();
  await expect(page.locator(".purchase-item span").first()).toHaveText("#001 · Docking station · 1 unit");
  await page.locator('[data-receive="1"]').click();
  await expect(status).toHaveText("Simulated receipt of 1 unit of Docking station. Current stock: 4.");
});

test("alternate-language links list exactly the languages a page exists in", async ({ page }) => {
  test.setTimeout(180_000);
  for (const route of arabicRoutes) {
    await openPage(page, route.path);
    const canonical = page.locator('link[rel="canonical"]');
    const alternates = page.locator('link[rel="alternate"][hreflang]');
    if (!(await canonical.count()) || !isExported(englishPath(route.path))) {
      await expect(alternates, route.path).toHaveCount(0);
      continue;
    }
    const arabicUrl = await canonical.getAttribute("href");
    await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute("href", arabicUrl!);
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", arabicUrl!);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
  }
});
