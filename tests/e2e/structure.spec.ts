import { domSignature, headMetadata } from "./support/capture";
import { expect, openPage, test } from "./support/fixtures";
import { expectedProblems, routes } from "./support/routes";

for (const route of routes) {
  test.describe(route.name, () => {
    test.use({ allowedProblems: expectedProblems(route) });

    // Visible text, landmarks, headings, link targets and accessible names.
    // Hidden content (the closed mobile menu, closed dialogs) is excluded, so
    // the snapshot differs per viewport.
    test("accessibility tree and visible text", async ({ page }) => {
      const response = await openPage(page, route.path);
      expect(response?.status()).toBe(route.status ?? 200);
      await expect(page).toHaveTitle(route.title);
      await expect(page.locator("body")).toMatchAriaSnapshot({ name: `${route.name}.aria.yml` });
    });

    // A page wider than the viewport scrolls sideways, which full-page screenshots do not show.
    test("no horizontal overflow", async ({ page }) => {
      await openPage(page, route.path);
      const widths = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      expect(widths.scroll, `page width ${widths.scroll}px in a ${widths.client}px viewport`).toBe(widths.client);
    });

    // Markup and head tags do not change with the viewport, so they are captured once.
    test("markup and head metadata", async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop-1440", "captured at desktop width only");
      await openPage(page, route.path);
      expect(await domSignature(page)).toMatchSnapshot(`${route.name}.dom.txt`);
      expect(await headMetadata(page)).toMatchSnapshot(`${route.name}.head.txt`);
    });
  });
}
