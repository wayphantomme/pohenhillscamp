/**
 * Automated screenshot script using Puppeteer.
 * Saves to public/screenshots/
 * Run: node scripts/screenshot.mjs
 */

import puppeteer from "puppeteer";
import { mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "../public/screenshots");
const BASE = "http://127.0.0.1:3000";

// Each shot: navigate to `path`, scroll to `selector` (or top), screenshot `selector` (or viewport)
const SHOTS = [
  { name: "01-hero",             path: "/",      scrollTo: null,                 capture: null,                        fullPage: false },
  { name: "02-about",            path: "/",      scrollTo: "#about",             capture: ".ph-about",                 fullPage: false },
  { name: "03-activities",       path: "/",      scrollTo: "#activities",        capture: ".ph-activities",            fullPage: false },
  { name: "04-contact",          path: "/",      scrollTo: "#contact",           capture: ".ph-contact",               fullPage: false },
  { name: "05-home-full",        path: "/",      scrollTo: null,                 capture: null,                        fullPage: true  },
  // Rooms — one per card, viewport screenshot after scrolling to each
  { name: "room-family-room",    path: "/rooms", scrollTo: "#family-room",       capture: null, fullPage: false },
  { name: "room-cabin-room",     path: "/rooms", scrollTo: "#cabin-room",        capture: null, fullPage: false },
  { name: "room-black-room",     path: "/rooms", scrollTo: "#black-room",        capture: null, fullPage: false },
  { name: "room-deluxe-room",    path: "/rooms", scrollTo: "#deluxe-room",       capture: null, fullPage: false },
  { name: "room-vip-room",       path: "/rooms", scrollTo: "#vip-room",          capture: null, fullPage: false },
  { name: "room-triangle-room",  path: "/rooms", scrollTo: "#triangle-room",     capture: null, fullPage: false },
  { name: "room-bamboo-room",    path: "/rooms", scrollTo: "#bamboo-room",       capture: null, fullPage: false },
  { name: "room-shaped-room",    path: "/rooms", scrollTo: "#shaped-room",       capture: null, fullPage: false },
  { name: "room-tent-room",      path: "/rooms", scrollTo: "#tent-room",         capture: null, fullPage: false },
  { name: "room-camping-tent",   path: "/rooms", scrollTo: "#camping-tent",      capture: null, fullPage: false },
];

const PADDING = 32; // px padding around each element screenshot

async function screenshotWithPadding(page, selector, outPath) {
  const el = await page.$(selector);
  if (!el) return false;

  const box = await el.boundingBox();
  if (!box) return false;

  const vp = page.viewport();
  const clip = {
    x: Math.max(0, box.x - PADDING),
    y: Math.max(0, box.y - PADDING),
    width: Math.min(vp.width - Math.max(0, box.x - PADDING), box.width + PADDING * 2),
    height: box.height + PADDING * 2,
  };

  await page.screenshot({ path: outPath, clip });
  return true;
}

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function scrollToSelector(page, selector) {
  if (!selector) return;
  try {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
    }, selector);
  } catch (_) {}
}

async function lazyScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let pos = 0;
      const step = 600;
      const id = setInterval(() => {
        window.scrollBy(0, step);
        pos += step;
        if (pos >= document.body.scrollHeight) {
          clearInterval(id);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 120);
    });
  });
}

(async () => {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  for (const shot of SHOTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    // Suppress console noise
    page.on("console", () => {});
    page.on("pageerror", () => {});

    console.log(`📸 ${shot.name} ...`);

    try {
      await page.goto(`${BASE}${shot.path}`, {
        waitUntil: "domcontentloaded",
        timeout: 20000,
      });

      // Let JS hydrate
      await wait(2500);

      // Trigger lazy-loading by scrolling full page
      await lazyScroll(page);
      await wait(800);

      // Scroll to target section
      if (shot.scrollTo) {
        await scrollToSelector(page, shot.scrollTo);
        await wait(600);
      }

      const outPath = join(OUT_DIR, `${shot.name}.png`);

      if (shot.capture) {
        const ok = await screenshotWithPadding(page, shot.capture, outPath);
        if (ok) {
          console.log(`   ✓ element (+padding) → ${shot.name}.png`);
        } else {
          await page.screenshot({ path: outPath, fullPage: false });
          console.log(`   ⚠ selector missing, viewport saved → ${shot.name}.png`);
        }
      } else {
        await page.screenshot({ path: outPath, fullPage: shot.fullPage });
        console.log(`   ✓ ${shot.fullPage ? "full page" : "viewport"} → ${shot.name}.png`);
      }
    } catch (err) {
      console.error(`   ✗ ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log("\n✅ Done — public/screenshots/");
})();
