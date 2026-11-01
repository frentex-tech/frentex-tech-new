import { criticalStyles } from "./support/capture";
import { expect, openPage, test } from "./support/fixtures";
import { route, styleRoutes } from "./support/routes";

test.describe("computed styles", () => {
  // Real transition values are part of the snapshot.
  test.use({ reducedMotion: "no-preference" });

  for (const name of styleRoutes) {
    test(`critical elements on ${name}`, async ({ page }) => {
      await openPage(page, route(name).path);
      expect(await criticalStyles(page)).toMatchSnapshot(`${name}.styles.json`);
    });
  }
});

test.describe("reduced motion", () => {
  const motionStyles = () =>
    ({
      scroll: getComputedStyle(document.documentElement).scrollBehavior,
      button: getComputedStyle(document.querySelector(".button")!).transitionDuration,
      card: getComputedStyle(document.querySelector(".feature-service")!).transitionDuration,
    });

  test("transitions and smooth scrolling follow prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await openPage(page, "/");
    expect(await page.evaluate(motionStyles)).toEqual({
      scroll: "smooth",
      button: "0.25s, 0.25s, 0.25s",
      card: "0.4s, 0.4s",
    });

    await page.emulateMedia({ reducedMotion: "reduce" });
    expect(await page.evaluate(motionStyles)).toEqual({ scroll: "auto", button: "0s", card: "0s" });
  });

  // Hero canvas and ambient-field animations must stay still under reduced motion.
  test("hero canvas and ambient-field stay still for reduced motion", async ({ page }) => {
    const ambientAnimations = () =>
      document.getAnimations().filter((a) => (a.effect as KeyframeEffect).target?.closest(".ambient-field")).length;

    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const path of ["/", "/en", "/services", "/about"]) {
      await openPage(page, path);
      expect(await page.evaluate(ambientAnimations), path).toBe(0);
    }
  });

  // Animations may hide content in their starting state only under html[data-motion="ok"].
  test("the motion gate is set only without a reduced-motion preference", async ({ page }) => {
    const gate = () => document.documentElement.getAttribute("data-motion");

    await page.emulateMedia({ reducedMotion: "no-preference" });
    for (const path of ["/", "/en"]) {
      await openPage(page, path);
      expect(await page.evaluate(gate), path).toBe("ok");
    }

    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const path of ["/", "/en"]) {
      await openPage(page, path);
      expect(await page.evaluate(gate), path).toBeNull();
    }
  });
});
