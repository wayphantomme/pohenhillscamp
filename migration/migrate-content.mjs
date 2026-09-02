#!/usr/bin/env node
/**
 * PHASE 6 — Content Migration Script
 *
 * Fetches content from WordPress REST API and writes static JSON/TS data files.
 * Idempotent: can be run multiple times, overwrites data files.
 *
 * Usage:
 *   node migration/migrate-content.mjs
 *   npm run migrate:content
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const WP_BASE = "https://moccasin-wombat-987069.hostingersite.com";

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json();
}

async function fetchAll(endpoint) {
  const results = [];
  let page = 1;
  while (true) {
    const data = await fetchJson(`${WP_BASE}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}`);
    if (!Array.isArray(data) || data.length === 0) break;
    results.push(...data);
    if (data.length < 100) break;
    page++;
  }
  return results;
}

async function migrateContent() {
  console.log("\n🚀  Starting content migration from WordPress REST API\n");

  const outDir = path.join(ROOT, "migration", "content-export");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1. Pages
  console.log("📄  Fetching pages...");
  const pages = await fetchAll(
    "pages?_fields=id,slug,title,content,excerpt,featured_media,date,modified,parent,status,link,menu_order"
  );
  fs.writeFileSync(path.join(outDir, "pages.json"), JSON.stringify(pages, null, 2));
  console.log(`    ✓ ${pages.length} pages exported`);

  // 2. Posts
  console.log("📝  Fetching posts...");
  const posts = await fetchAll(
    "posts?_fields=id,slug,title,content,excerpt,featured_media,date,modified,categories,tags,author,status,link"
  );
  fs.writeFileSync(path.join(outDir, "posts.json"), JSON.stringify(posts, null, 2));
  console.log(`    ✓ ${posts.length} posts exported`);

  // 3. Categories
  console.log("🏷️  Fetching categories...");
  const cats = await fetchAll("categories");
  fs.writeFileSync(path.join(outDir, "categories.json"), JSON.stringify(cats, null, 2));
  console.log(`    ✓ ${cats.length} categories exported`);

  // 4. Tags
  console.log("🏷️  Fetching tags...");
  const tags = await fetchAll("tags");
  fs.writeFileSync(path.join(outDir, "tags.json"), JSON.stringify(tags, null, 2));
  console.log(`    ✓ ${tags.length} tags exported`);

  // 5. Media
  console.log("🖼️  Fetching media...");
  const media = await fetchAll(
    "media?_fields=id,slug,title,source_url,media_type,mime_type,media_details,alt_text,date,post"
  );
  fs.writeFileSync(path.join(outDir, "media.json"), JSON.stringify(media, null, 2));
  console.log(`    ✓ ${media.length} media items exported`);

  // 6. Build URL redirect map
  console.log("\n🔀  Building URL redirect map...");
  const redirectMap = {};
  for (const page of pages) {
    // Map WordPress page URLs to Next.js routes
    if (page.slug === "home") {
      redirectMap["/"] = "/";
    } else if (page.slug === "about-us") {
      redirectMap["/about-us/"] = "/#about";
      redirectMap["/about-us"] = "/#about";
    } else if (page.slug === "rooms") {
      redirectMap["/rooms/"] = "/#rooms";
      redirectMap["/rooms"] = "/#rooms";
    } else if (page.slug === "activities") {
      redirectMap["/activities/"] = "/#activities";
      redirectMap["/activities"] = "/#activities";
    } else if (page.slug === "terms-conditions") {
      redirectMap["/terms-conditions/"] = "/#terms";
      redirectMap["/terms-conditions"] = "/#terms";
    }
  }

  // Blog post (hello-world — skip, not real content)
  redirectMap["/hello-world/"] = "/";

  // Category pages
  redirectMap["/category/uncategorized/"] = "/";

  fs.writeFileSync(
    path.join(__dirname, "url-redirect-map.json"),
    JSON.stringify(redirectMap, null, 2)
  );
  console.log(`    ✓ ${Object.keys(redirectMap).length} redirects written to migration/url-redirect-map.json`);

  // 7. Report
  const report = {
    pages: { total: pages.length, migrated: pages.filter((p) => p.status === "publish").length },
    posts: { total: posts.length, migrated: posts.filter((p) => p.status === "publish").length },
    categories: { total: cats.length },
    tags: { total: tags.length },
    media: { total: media.length },
    redirects: { total: Object.keys(redirectMap).length },
    runAt: new Date().toISOString(),
  };

  const reportPath = path.join(__dirname, "migration-report.json");
  let existingReport = {};
  if (fs.existsSync(reportPath)) {
    existingReport = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
  }
  fs.writeFileSync(reportPath, JSON.stringify({ ...existingReport, content: report }, null, 2));

  console.log("\n=".repeat(60));
  console.log("CONTENT MIGRATION REPORT");
  console.log("=".repeat(60));
  console.log(`  Pages:      ${report.pages.total} (${report.pages.migrated} published)`);
  console.log(`  Posts:      ${report.posts.total} (${report.posts.migrated} published)`);
  console.log(`  Categories: ${report.categories.total}`);
  console.log(`  Tags:       ${report.tags.total}`);
  console.log(`  Media:      ${report.media.total}`);
  console.log(`  Redirects:  ${report.redirects.total}`);
  console.log("=".repeat(60) + "\n");
}

migrateContent().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
