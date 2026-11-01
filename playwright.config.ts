import { defineConfig, devices } from "@playwright/test";

// Regression suite for the static export in `out/`. Build first: `npm run build`.
// See tests/e2e/README.md for running, reviewing and updating baselines.

// Uncommon port: a server already listening here is reused outside CI.
const port = Number(process.env.E2E_PORT ?? 4329);

const viewports = {
  "desktop-1440": { width: 1440, height: 900 },
  "tablet-1024": { width: 1024, height: 768 },
  "mobile-390": { width: 390, height: 844 },
};

export default defineConfig({
  testDir: "tests/e2e",
  globalSetup: "./tests/e2e/global-setup.ts",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  // A retry would hide a nondeterministic screenshot; failures should be investigated.
  retries: 0,
  timeout: 60_000,
  // The HTML report shows expected, actual and diff images: `npm run test:e2e:report`.
  reporter: [["list"], ["html", { open: "never" }]],

  // Text, ARIA and style snapshots do not depend on the operating system.
  snapshotPathTemplate: "{testDir}/__snapshots__/{testFileName}/{projectName}/{arg}{ext}",
  expect: {
    toHaveScreenshot: {
      // Font rasterisation differs between operating systems, so screenshot
      // baselines are kept per platform (win32, linux, darwin).
      pathTemplate: "{testDir}/__screenshots__/{platform}/{projectName}/{testFileName}/{arg}{ext}",
      animations: "disabled",
      caret: "hide",
      scale: "css",
      maxDiffPixels: 0,
    },
    toMatchAriaSnapshot: {
      pathTemplate: "{testDir}/__snapshots__/{testFileName}/{projectName}/{arg}{ext}",
      children: "deep-equal",
    },
  },

  use: {
    baseURL: `http://localhost:${port}`,
    // Bundled Chromium, pinned by the exact @playwright/test version in package.json.
    browserName: "chromium",
    deviceScaleFactor: 1,
    locale: "en-US",
    timezoneId: "UTC",
    colorScheme: "light",
    // Transitions are disabled for deterministic screenshots; the styles spec
    // checks normal-motion values explicitly.
    reducedMotion: "reduce",
    trace: "retain-on-failure",
  },

  projects: Object.entries(viewports).map(([name, viewport]) => ({
    name,
    use: { ...devices["Desktop Chrome"], viewport, deviceScaleFactor: 1 },
  })),

  webServer: {
    command: "node scripts/preview.mjs out",
    url: `http://localhost:${port}/`,
    // The suite covers the root build; global-setup rejects a base-path build.
    env: { PORT: String(port), NEXT_PUBLIC_BASE_PATH: "" },
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
