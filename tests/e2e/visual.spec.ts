import { expect, openPage, test } from "./support/fixtures";
import { expectedProblems, routes } from "./support/routes";

// Full-page screenshots of every route at every viewport (see the projects in playwright.config.ts).
for (const route of routes.filter((item) => item.screenshot !== false)) {
  test.describe(route.name, () => {
    test.use({ allowedProblems: expectedProblems(route) });

    test(`full page matches the baseline`, async ({ page }) => {
      await openPage(page, route.path);
      // The longest pages need more than the default 5 s to produce two
      // identical consecutive captures while other workers are busy.
      await expect(page).toHaveScreenshot(`${route.name}.png`, { fullPage: true, timeout: 30_000 });
    });
  });
}
