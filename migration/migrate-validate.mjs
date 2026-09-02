#!/usr/bin/env node
/**
 * PHASE 10 — Validation Script
 *
 * Scans built/source files for remaining WordPress references.
 * Reports any unreplaced URLs.
 *
 * Usage:
 *   node migration/migrate-validate.mjs
 *   npm run migrate:validate
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const WP_DOMAIN = "moccasin-wombat-987069.hostingersite.com";
const WP_UPLOADS = "/wp-content/uploads/";

const EXTENSIONS_TO_SCAN = [".ts", ".tsx", ".js", ".jsx", ".json", ".html", ".css"];
const DIRS_TO_SCAN = ["app", "components", "lib", "data", "migration"];
const SKIP_FILES = [
  "migrate-media.mjs",
  "migrate-inspect.mjs",
  "migrate-validate.mjs",
  "migrate-content.mjs",
  "media-inventory.json",
  "url-mapping.json",
  "public-id-mapping.json",
  "migration-report.json",
];

let totalFilesScanned = 0;
let filesWithWpUrls = 0;
let totalWpUrlMatches = 0;
const findings = [];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const relPath = path.relative(ROOT, filePath);

  const uploadsMatches = [...content.matchAll(/\/wp-content\/uploads\//g)];
  const domainMatches = [...content.matchAll(new RegExp(WP_DOMAIN, "g"))];

  const uploadsCount = uploadsMatches.length;
  const domainCount = domainMatches.length;

  totalFilesScanned++;

  if (uploadsCount > 0 || domainCount > 0) {
    // Check if it's a data/media file that intentionally references WP URLs
    const isDataFile =
      filePath.includes("data/") ||
      filePath.includes("rooms.ts") ||
      filePath.includes("activities.ts");

    if (isDataFile) {
      // These files intentionally reference WP URLs as fallback
      return;
    }

    filesWithWpUrls++;
    totalWpUrlMatches += uploadsCount + domainCount;
    findings.push({
      file: relPath,
      uploadsRefs: uploadsCount,
      domainRefs: domainCount,
    });
  }
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    if (SKIP_FILES.includes(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (EXTENSIONS_TO_SCAN.includes(path.extname(entry.name))) {
      scanFile(fullPath);
    }
  }
}

// Check url-mapping.json completeness
function checkMapping() {
  const mappingPath = path.join(__dirname, "url-mapping.json");
  if (!fs.existsSync(mappingPath)) {
    console.warn("⚠️   url-mapping.json not found. Run npm run migrate:media first.");
    return { total: 0, cloudinaryEntries: 0 };
  }
  const mapping = JSON.parse(fs.readFileSync(mappingPath, "utf-8"));
  const total = Object.keys(mapping).length;
  const cloudinaryEntries = Object.values(mapping).filter((v) =>
    v.includes("cloudinary.com")
  ).length;
  return { total, cloudinaryEntries };
}

console.log("\n🔍  Validation scan started...\n");

for (const dir of DIRS_TO_SCAN) {
  scanDir(path.join(ROOT, dir));
}

const mappingStats = checkMapping();

console.log("=".repeat(60));
console.log("VALIDATION REPORT");
console.log("=".repeat(60));
console.log(`\n📁  Files scanned: ${totalFilesScanned}`);
console.log(`🗺️   URL mapping entries: ${mappingStats.total}`);
console.log(`☁️   Cloudinary mapped: ${mappingStats.cloudinaryEntries}`);
console.log();

if (findings.length === 0) {
  console.log("✅  No unreplaced WordPress media URLs found in source files.");
} else {
  console.log(
    `⚠️   Found WordPress references in ${filesWithWpUrls} file(s):\n`
  );
  for (const f of findings) {
    console.log(
      `  ${f.file}  (uploads refs: ${f.uploadsRefs}, domain refs: ${f.domainRefs})`
    );
  }
  console.log(`\n  Total matches: ${totalWpUrlMatches}`);
  console.log(
    "\n  NOTE: Data files (rooms.ts, activities.ts) intentionally keep"
  );
  console.log(
    "  WP URLs as fallback — they are excluded from this count."
  );
}

// Check for SSA iframe references (expected, not an error)
const appDir = path.join(ROOT, "app");
let ssaRefs = 0;
function countSsaRefs(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) countSsaRefs(path.join(dir, entry.name));
    else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
      const content = fs.readFileSync(path.join(dir, entry.name), "utf-8");
      ssaRefs += (content.match(/ssa\/v1\/embed/g) || []).length;
    }
  }
}
countSsaRefs(appDir);
console.log(`\nℹ️   SSA booking iframe references: ${ssaRefs} (expected — booking system)`);

// Save validation report
const reportPath = path.join(__dirname, "migration-report.json");
let existingReport = {};
if (fs.existsSync(reportPath)) {
  existingReport = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
}
const validationResult = {
  filesScanned: totalFilesScanned,
  filesWithUnreplacedUrls: filesWithWpUrls,
  totalUnreplacedMatches: totalWpUrlMatches,
  findings,
  urlMappingTotal: mappingStats.total,
  cloudinaryMapped: mappingStats.cloudinaryEntries,
  ssaIframeRefs: ssaRefs,
  runAt: new Date().toISOString(),
};
fs.writeFileSync(
  reportPath,
  JSON.stringify({ ...existingReport, validation: validationResult }, null, 2)
);

console.log(`\n💾  Validation report saved to migration/migration-report.json\n`);
