#!/usr/bin/env node
/**
 * PHASE 1 (inspect) — Fetch and display fresh data from WordPress REST API.
 * Does NOT modify any data.
 *
 * Usage:
 *   node migration/migrate-inspect.mjs
 *   npm run migrate:inspect
 */

const WP_BASE = "https://moccasin-wombat-987069.hostingersite.com";

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json();
}

async function inspect() {
  console.log("\n🔍  Inspecting WordPress REST API\n");

  // Pages
  const pages = await fetchJson(
    `${WP_BASE}/wp-json/wp/v2/pages?per_page=100&_fields=id,slug,title,link,status,parent`
  );
  console.log(`📄  Pages (${pages.length}):`);
  for (const p of pages) {
    console.log(`  [${p.id}] /${p.slug}/ — "${p.title.rendered}" (parent: ${p.parent})`);
  }

  // Posts
  const posts = await fetchJson(
    `${WP_BASE}/wp-json/wp/v2/posts?per_page=100&_fields=id,slug,title,date,status`
  );
  console.log(`\n📝  Posts (${posts.length}):`);
  for (const p of posts) {
    console.log(`  [${p.id}] /${p.slug}/ — "${p.title.rendered}" (${p.date.slice(0, 10)})`);
  }

  // Categories
  const cats = await fetchJson(
    `${WP_BASE}/wp-json/wp/v2/categories?per_page=100`
  );
  console.log(`\n🏷️  Categories (${cats.length}):`);
  for (const c of cats) {
    console.log(`  [${c.id}] ${c.slug} — "${c.name}" (${c.count} posts)`);
  }

  // Tags
  const tags = await fetchJson(
    `${WP_BASE}/wp-json/wp/v2/tags?per_page=100`
  );
  console.log(`\n🏷️  Tags (${tags.length}):`);

  // Media count
  let mediaPage = 1;
  let totalMedia = 0;
  while (true) {
    const media = await fetchJson(
      `${WP_BASE}/wp-json/wp/v2/media?per_page=100&page=${mediaPage}&_fields=id,mime_type`
    );
    if (media.length === 0) break;
    totalMedia += media.length;
    if (media.length < 100) break;
    mediaPage++;
  }
  console.log(`\n🖼️  Total media attachments: ${totalMedia}`);

  console.log("\n✅  Inspection complete. No data was modified.\n");
}

inspect().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
