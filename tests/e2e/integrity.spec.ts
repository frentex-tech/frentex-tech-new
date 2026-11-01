import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { expect, openPage, test } from "./support/fixtures";
import { exportedEnglishPaths, routes } from "./support/routes";

const pageRoutes = routes.filter((item) => item.status !== 404);
const coveredPaths = new Set(routes.map((item) => new URL(item.path, "http://site").pathname));

test.beforeEach(() =>
  test.skip(test.info().project.name !== "desktop-1440", "links and files do not depend on the viewport"),
);

test("every exported page is in the route list", () => {
  const exported = readdirSync("out")
    .filter((file) => file.endsWith(".html") && !["404.html", "_not-found.html"].includes(file))
    .map((file) => (file === "index.html" ? "/" : `/${file.replace(/\.html$/, "")}`));
  const pages = new Set([...exported, ...exportedEnglishPaths()]);
  expect([...pages].filter((path) => !coveredPaths.has(path)), "exported pages missing from routes.ts").toEqual([]);
});

test("internal links and assets resolve, and external links are unchanged", async ({ page, request }) => {
  test.setTimeout(180_000); // visits every route
  const internal = new Set<string>();
  const external = new Set<string>();
  for (const route of pageRoutes) {
    await openPage(page, route.path);
    const origin = new URL(page.url()).origin;
    const urls = await page.evaluate(() => [
      ...[...document.querySelectorAll<HTMLAnchorElement>("a[href]")].map((link) => link.href),
      ...[...document.querySelectorAll<HTMLImageElement | HTMLScriptElement>("img[src], script[src]")].map((el) => el.src),
      ...[...document.querySelectorAll<HTMLLinkElement>("link[href]")].map((link) => link.href),
    ]);
    for (const href of urls) {
      const url = new URL(href);
      if (url.origin === origin) internal.add(url.pathname + url.search);
      else external.add(href);
    }
  }

  const linkedPages = [...internal].filter((path) => !/\.\w+$/.test(new URL(path, "http://site").pathname));
  const uncovered = linkedPages.filter((path) => !coveredPaths.has(new URL(path, "http://site").pathname));
  expect(uncovered, "linked pages missing from routes.ts").toEqual([]);

  const broken: string[] = [];
  for (const path of internal) {
    const response = await request.get(path);
    if (response.status() !== 200) broken.push(`${response.status()} ${path}`);
  }
  expect(broken, "internal links or assets that do not resolve").toEqual([]);

  // Contact details, canonical URLs and reference links; review any change.
  expect([...external].sort().join("\n") + "\n").toMatchSnapshot("external-links.txt");
});

test.describe("legacy URLs of the original static site", () => {
  for (const route of routes.filter((item) => item.legacyPath)) {
    test(route.legacyPath!, async ({ page }) => {
      const response = await openPage(page, route.legacyPath!);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(route.title);
    });
  }
});

test("static files are served", async ({ request }) => {
  for (const path of [
    "/robots.txt",
    "/sitemap.xml",
    "/downloads/frentex-company-profile.pdf",
    "/assets/mark.svg",
    "/assets/social-cover.png",
    "/assets/OFL.txt",
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect((await response.body()).length, path).toBeGreaterThan(0);
  }
});

test("the bundled web fonts load", async ({ page }) => {
  await openPage(page, "/");
  const fonts = await page.evaluate(() =>
    [...document.fonts].map((font) => ({ family: font.family.replace(/["']/g, ""), weight: font.weight, status: font.status })),
  );
  expect(fonts.filter((font) => font.status === "error"), "font files that failed to load").toEqual([]);
  for (const weight of ["400", "500"]) {
    expect(fonts).toContainEqual({ family: "IBM Plex Sans Arabic", weight, status: "loaded" });
  }
});

test("the sitemap, canonical URLs and robots.txt agree", async ({ page, request }) => {
  test.setTimeout(180_000); // visits every route
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();

  const canonicals = new Set<string>();
  for (const route of pageRoutes) {
    await openPage(page, route.path);
    const canonical = page.locator('link[rel="canonical"]');
    if (await canonical.count()) canonicals.add((await canonical.getAttribute("href"))!);
  }
  expect([...canonicals].sort(), "pages with a canonical URL must match the sitemap").toEqual(locations);

  const siteRoot = locations.find((location) => location.endsWith("/"))!;
  expect(await (await request.get("/robots.txt")).text()).toContain(`Sitemap: ${siteRoot}sitemap.xml`);

  for (const location of locations) {
    const file = location.slice(siteRoot.length) || "index.html";
    expect(existsSync(join("out", file)), `${location} is exported`).toBe(true);
  }
});
