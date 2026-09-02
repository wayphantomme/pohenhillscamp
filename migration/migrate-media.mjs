#!/usr/bin/env node
/**
 * PHASE 3 — Cloudinary Media Migration Script
 *
 * Usage:
 *   node migration/migrate-media.mjs
 *
 * Environment variables required (set in .env.local or shell):
 *   CLOUDINARY_CLOUD_NAME
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_API_SECRET
 *
 * This script is IDEMPOTENT:
 * - Skips files already uploaded (checks by public_id)
 * - Skips detected duplicates (same filesize as canonical)
 * - Writes url-mapping.json after completion
 *
 * Run: npm run migrate:media
 */

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// --- Configuration -----------------------------------------------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "zktumplt",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error(
    "❌  Missing CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET environment variables."
  );
  console.error(
    "    Set them in .env.local or export them before running this script."
  );
  process.exit(1);
}

// --- Load inventory ----------------------------------------------------------
const inventoryPath = path.join(__dirname, "media-inventory.json");
const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf-8"));

// Load existing mapping if present
const mappingPath = path.join(__dirname, "url-mapping.json");
let existingMapping = {};
if (fs.existsSync(mappingPath)) {
  existingMapping = JSON.parse(fs.readFileSync(mappingPath, "utf-8"));
}

// --- State -------------------------------------------------------------------
const report = {
  total: inventory.length,
  uploaded: 0,
  skipped: 0,
  duplicate: 0,
  failed: 0,
  urlsReplaced: 0,
  brokenReferences: 0,
};

const urlMapping = { ...existingMapping }; // wordpress_url → cloudinary_secure_url
const publicIdMapping = {}; // wordpress_url → cloudinary_public_id

/**
 * Derive the Cloudinary public_id from a WordPress URL + year/month.
 */
function toPublicId(item) {
  const fname = path.basename(item.original_url);
  const nameWithoutExt = fname.replace(/\.[^.]+$/, "");
  const folder =
    item.mime_type.startsWith("video/")
      ? `wordpress/videos/${item.year}/${item.month}`
      : `wordpress/images/${item.year}/${item.month}`;
  return `${folder}/${nameWithoutExt}`;
}

/**
 * Download a URL to a temporary file.
 */
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (resp) => {
      if (resp.statusCode === 301 || resp.statusCode === 302) {
        // Follow redirect
        https.get(resp.headers.location, (r) => {
          r.pipe(file);
          file.on("finish", () => file.close(resolve));
        }).on("error", reject);
        return;
      }
      if (resp.statusCode !== 200) {
        reject(new Error(`HTTP ${resp.statusCode} for ${url}`));
        return;
      }
      resp.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", reject);
  });
}

/**
 * Check if a public_id already exists in Cloudinary.
 */
async function existsInCloudinary(publicId, resourceType = "image") {
  try {
    await cloudinary.api.resource(publicId, { resource_type: resourceType });
    return true;
  } catch {
    return false;
  }
}

// --- Main migration loop -----------------------------------------------------
async function migrateMedia() {
  console.log(`\n🚀  Starting Cloudinary media migration`);
  console.log(`    Total media items: ${inventory.length}\n`);

  const tmpDir = path.join(__dirname, ".tmp");
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

  for (const item of inventory) {
    const publicId = toPublicId(item);
    const resourceType = item.mime_type.startsWith("video/") ? "video" : "image";
    const wpUrl = item.original_url;

    // Skip if duplicate
    if (item.duplicate_of !== null) {
      console.log(`  ⚡ SKIP duplicate  [ID ${item.wordpress_attachment_id}] ${item.original_filename}`);
      // Map duplicate URL to the same Cloudinary URL as canonical
      const canonicalItem = inventory.find(
        (i) => i.wordpress_attachment_id === item.duplicate_of
      );
      if (canonicalItem && urlMapping[canonicalItem.original_url]) {
        urlMapping[wpUrl] = urlMapping[canonicalItem.original_url];
        publicIdMapping[wpUrl] = toPublicId(canonicalItem);
      }
      report.duplicate++;
      continue;
    }

    // Skip if already in mapping
    if (urlMapping[wpUrl]) {
      console.log(`  ✓  ALREADY MAPPED  [ID ${item.wordpress_attachment_id}] ${item.original_filename}`);
      report.skipped++;
      continue;
    }

    // Check Cloudinary
    const alreadyUploaded = await existsInCloudinary(publicId, resourceType);
    if (alreadyUploaded) {
      console.log(`  ✓  ALREADY EXISTS  [ID ${item.wordpress_attachment_id}] ${item.original_filename}`);
      const info = await cloudinary.api.resource(publicId, { resource_type: resourceType });
      urlMapping[wpUrl] = info.secure_url;
      publicIdMapping[wpUrl] = publicId;
      report.skipped++;
      // Save checkpoint
      saveMapping(urlMapping, publicIdMapping);
      continue;
    }

    // Download and upload
    const tmpFile = path.join(tmpDir, item.original_filename);
    try {
      console.log(`  ⬇  Downloading    [ID ${item.wordpress_attachment_id}] ${item.original_filename}`);
      await downloadFile(wpUrl, tmpFile);

      console.log(`  ☁  Uploading      [ID ${item.wordpress_attachment_id}] → ${publicId}`);
      const result = await cloudinary.uploader.upload(tmpFile, {
        public_id: publicId,
        resource_type: resourceType,
        overwrite: false,
        use_filename: false,
        unique_filename: false,
      });

      urlMapping[wpUrl] = result.secure_url;
      publicIdMapping[wpUrl] = publicId;
      report.uploaded++;
      console.log(`  ✅ Uploaded        ${result.secure_url}`);

      // Save checkpoint after each upload
      saveMapping(urlMapping, publicIdMapping);
    } catch (err) {
      console.error(`  ❌ FAILED          [ID ${item.wordpress_attachment_id}] ${item.original_filename}: ${err.message}`);
      report.failed++;
    } finally {
      if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
    }
  }

  // Cleanup tmp
  if (fs.existsSync(tmpDir)) {
    fs.rmdirSync(tmpDir, { recursive: true });
  }

  // Final save
  saveMapping(urlMapping, publicIdMapping);

  // Print report
  console.log("\n" + "=".repeat(60));
  console.log("MIGRATION REPORT — MEDIA");
  console.log("=".repeat(60));
  console.log(`  Total WordPress media:  ${report.total}`);
  console.log(`  Uploaded:               ${report.uploaded}`);
  console.log(`  Skipped (existing):     ${report.skipped}`);
  console.log(`  Duplicate (skipped):    ${report.duplicate}`);
  console.log(`  Failed:                 ${report.failed}`);
  console.log("=".repeat(60) + "\n");

  // Save report
  const reportPath = path.join(__dirname, "migration-report.json");
  let existingReport = {};
  if (fs.existsSync(reportPath)) {
    existingReport = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
  }
  fs.writeFileSync(
    reportPath,
    JSON.stringify({ ...existingReport, media: report, runAt: new Date().toISOString() }, null, 2)
  );
}

function saveMapping(urlMapping, publicIdMapping) {
  // url-mapping.json: wordpress_url → cloudinary_secure_url
  fs.writeFileSync(mappingPath, JSON.stringify(urlMapping, null, 2));

  // public-id-mapping.json: wordpress_url → cloudinary_public_id
  const pidPath = path.join(__dirname, "public-id-mapping.json");
  fs.writeFileSync(pidPath, JSON.stringify(publicIdMapping, null, 2));

  console.log(`    💾 Mapping saved (${Object.keys(urlMapping).length} entries)`);
}

migrateMedia().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
