// Works around a Windows-only bug in Next.js 16 static export.
//
// The client router prefetches segment data from files such as
// `out/about/__next.about.__PAGE__.txt`. On Windows, `next build` joins the
// segment path with a backslash, so the file is written to
// `out/about/__next.about/__PAGE__.txt` instead and every prefetch 404s.
// Builds on Linux and macOS are unaffected, so this script changes nothing there.
import { readdir, rename, rmdir } from "node:fs/promises";
import { join } from "node:path";

const outDir = process.argv[2] ?? "out";

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? listFiles(path) : [path];
    }),
  );
  return nested.flat();
}

async function removeEmptyDirectories(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) await removeEmptyDirectories(join(directory, entry.name));
  }
  await rmdir(directory);
}

// Segment file names never contain a directory separator, so any directory
// named `__next.*` was created by the bug.
async function fixDirectory(directory) {
  let fixed = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(directory, entry.name);
    if (!entry.name.startsWith("__next.")) {
      fixed += await fixDirectory(path);
      continue;
    }
    for (const file of await listFiles(path)) {
      const relativeName = file.slice(directory.length + 1).replace(/[\\/]/g, ".");
      await rename(file, join(directory, relativeName));
      fixed++;
    }
    await removeEmptyDirectories(path);
  }
  return fixed;
}

const fixed = await fixDirectory(outDir);
if (fixed) console.log(`Renamed ${fixed} segment prefetch file(s) in ${outDir}.`);
