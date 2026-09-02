/**
 * Media URL replacement utilities.
 * Handles all variants of WordPress media URL patterns.
 */

const WP_DOMAIN = "moccasin-wombat-987069.hostingersite.com";
const WP_UPLOADS_PATH = "/wp-content/uploads/";
const WP_BASE_PATTERN = new RegExp(
  `https?://${WP_DOMAIN.replace(".", "\\.")}${WP_UPLOADS_PATH.replace(/\//g, "\\/")}`,
  "gi"
);

/**
 * Replace all WordPress image URLs in HTML content with Cloudinary URLs.
 * Handles src, srcset, background-image, data-src patterns.
 */
export function replaceWordPressUrls(
  html: string,
  urlMapper: (wpUrl: string) => string
): string {
  // Replace absolute WordPress URLs
  let result = html.replace(
    /https?:\/\/moccasin-wombat-987069\.hostingersite\.com\/wp-content\/uploads\/[^\s"')]+/gi,
    (match) => {
      const cleanUrl = match.replace(/\\u002F/g, "/").replace(/\\/g, "");
      return urlMapper(cleanUrl);
    }
  );

  // Replace escaped URLs (JSON-encoded \/wp-content\/uploads\/)
  result = result.replace(
    /https?:\\\/\\\/moccasin-wombat-987069\.hostingersite\.com\\\/wp-content\\\/uploads\\\/[^\s"')\\]*/gi,
    (match) => {
      const cleanUrl = match.replace(/\\\//g, "/");
      return urlMapper(cleanUrl);
    }
  );

  // Replace relative /wp-content/uploads/ URLs
  result = result.replace(
    /(?<![a-z])\/wp-content\/uploads\/[^\s"')\]]+/gi,
    (match) => {
      const fullUrl = `https://${WP_DOMAIN}${match}`;
      return urlMapper(fullUrl);
    }
  );

  return result;
}

/**
 * Check if an HTML string contains any remaining WordPress media URLs.
 * Use for validation after migration.
 */
export function hasWordPressMediaUrls(html: string): boolean {
  return WP_BASE_PATTERN.test(html) || html.includes("/wp-content/uploads/");
}

/**
 * Extract all WordPress media URLs from HTML content.
 */
export function extractWordPressUrls(html: string): string[] {
  const urls: string[] = [];
  const regex =
    /https?:\/\/moccasin-wombat-987069\.hostingersite\.com\/wp-content\/uploads\/[^\s"')]+/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    urls.push(match[0]);
  }
  return [...new Set(urls)]; // deduplicate
}

/**
 * Format price in IDR format.
 */
export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
