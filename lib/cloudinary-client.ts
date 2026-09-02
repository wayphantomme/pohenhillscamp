/**
 * Client-safe Cloudinary utilities.
 * No Node.js built-ins (fs, path) — safe to import from "use client" components.
 *
 * After `npm run migrate:media` completes and url-mapping.json is populated,
 * the data files (rooms.ts, activities.ts) can be updated with Cloudinary URLs
 * directly. Until then, these functions return the input URL unchanged so the
 * site works in development without running the migration first.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "zktumplt";
const CDN_BASE = `https://res.cloudinary.com/${CLOUD_NAME}`;

/**
 * Add Cloudinary transformations to an already-resolved Cloudinary URL.
 * If the URL is not a Cloudinary URL, returns it unchanged.
 */
export function withTransforms(
  url: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    format?: string;
  } = {}
): string {
  if (!url.includes(CDN_BASE) && !url.includes("res.cloudinary.com")) {
    // Not a Cloudinary URL — return as-is (WordPress fallback)
    return url;
  }

  const {
    width,
    height,
    crop = "fill",
    quality = "auto",
    format = "auto",
  } = options;

  const parts: string[] = [`f_${format}`, `q_${quality}`];
  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);
  if ((width || height) && crop) parts.push(`c_${crop}`);

  return url.replace("/upload/", `/upload/${parts.join(",")}/`);
}

/**
 * Client-safe image URL resolver.
 * - If the URL is already a Cloudinary URL: optionally adds transforms.
 * - If the URL is a WordPress URL: returns it unchanged (pre-migration fallback).
 *
 * For Server Components, use resolveImageUrl() from lib/cloudinary.ts instead,
 * which reads the url-mapping.json and maps WP → Cloudinary at build time.
 */
export function resolveImageUrlClient(
  url: string,
  options: Parameters<typeof withTransforms>[1] = {}
): string {
  return withTransforms(url, options);
}
