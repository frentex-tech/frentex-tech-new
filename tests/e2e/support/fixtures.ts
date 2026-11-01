import { test as base, expect, type Page } from "@playwright/test";

type Options = {
  /**
   * Problems matching one of these patterns do not fail the test. Wrapped in an
   * object because `test.use` reads a bare array as a `[value, options]` tuple.
   */
  allowedProblems: { patterns: RegExp[] };
};

/**
 * Request failures caused by the test run or the host, not by the site:
 * prefetches are aborted when a test navigates away or closes the page, and
 * Chrome cancels in-flight requests when the operating system reports a
 * network adapter change. A missing file still fails the test (HTTP 404).
 */
const environmentalFailures = ["net::ERR_ABORTED", "net::ERR_NETWORK_CHANGED"];

type Fixtures = {
  /** Fails the test on console errors, page errors or failed requests. */
  failOnBrowserProblems: void;
};

export const test = base.extend<Options & Fixtures>({
  allowedProblems: [{ patterns: [] }, { option: true }],

  failOnBrowserProblems: [
    async ({ page, allowedProblems }, provide) => {
      const problems: string[] = [];
      page.on("console", (message) => {
        const text = message.text();
        if (message.type() === "error" && !environmentalFailures.some((reason) => text.includes(reason))) {
          problems.push(`console.error: ${text}`);
        }
      });
      page.on("pageerror", (error) => problems.push(`page error: ${error.message}`));
      page.on("response", (response) => {
        if (response.status() >= 400) problems.push(`HTTP ${response.status()}: ${response.url()}`);
      });
      page.on("requestfailed", (request) => {
        const reason = request.failure()?.errorText ?? "unknown";
        if (!environmentalFailures.includes(reason)) problems.push(`request failed (${reason}): ${request.url()}`);
      });

      await provide();

      const unexpected = problems.filter(
        (problem) => !allowedProblems.patterns.some((pattern) => pattern.test(problem)),
      );
      expect(unexpected, "console errors, page errors or failed requests").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

/**
 * Opens a page and waits until it is visually settled: network idle (including
 * prefetches and the client-rendered demo), web fonts loaded, and the pointer
 * parked where it cannot trigger a hover style.
 */
export async function openPage(page: Page, path: string) {
  const response = await page.goto(path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.mouse.move(0, 0);
  return response;
}

export function isProject(projectName: string, ...names: string[]) {
  return names.includes(projectName);
}
