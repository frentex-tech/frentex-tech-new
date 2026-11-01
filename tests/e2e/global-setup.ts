import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const sources = ["src", "public", "next.config.ts", "package.json"];

function newestModification(path: string): number {
  const stats = statSync(path);
  if (!stats.isDirectory()) return stats.mtimeMs;
  return Math.max(stats.mtimeMs, ...readdirSync(path).map((entry) => newestModification(join(path, entry))));
}

/** Refuses to run against a missing, stale or base-path build of the static export. */
export default function globalSetup() {
  const index = join(root, "out", "index.html");
  if (!existsSync(index)) {
    throw new Error("out/index.html is missing. Run `npm run build` before the regression suite.");
  }
  const builtAt = statSync(index).mtimeMs;
  const changed = sources.filter((source) => existsSync(join(root, source)) && newestModification(join(root, source)) > builtAt);
  if (changed.length) {
    throw new Error(`out/ is older than ${changed.join(", ")}. Run \`npm run build\` before the regression suite.`);
  }
  if (!readFileSync(index, "utf8").includes('src="/assets/mark.svg"')) {
    throw new Error("out/ was built with NEXT_PUBLIC_BASE_PATH. Rebuild without it before the regression suite.");
  }
}
