# Pohen Hills Camp — Next.js + Cloudinary Migration

Full migration of [Pohen Hills Camp](https://moccasin-wombat-987069.hostingersite.com/) from WordPress (Astra + Elementor) to Next.js 15 with App Router, TypeScript, and Cloudinary CDN.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | CSS Modules + Custom Properties (no Tailwind) |
| Media CDN | Cloudinary (`f_auto,q_auto` transformations) |
| Booking | SSA (Simple Schedule Appointments) — embedded iframe |
| Deployment | Vercel |

---

## Project Structure

```
pohenhillscamp-app/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Homepage (all content sections)
│   ├── layout.tsx          # Root layout + SEO metadata
│   ├── robots.ts           # robots.txt generation
│   ├── sitemap.ts          # XML sitemap generation
│   ├── not-found.tsx       # 404 page
│   ├── about-us/           # Redirect → /#about
│   ├── rooms/              # Redirect → /#rooms
│   ├── activities/         # Redirect → /#activities
│   └── terms-conditions/   # Redirect → /#terms
│
├── components/             # React Server/Client Components
│   ├── Header.tsx          # Sticky transparent header
│   ├── Footer.tsx
│   ├── HeroSection.tsx     # Autoplay video hero
│   ├── AboutSection.tsx    # About + Google Reviews
│   ├── RoomsSection.tsx    # All 9 room types + Camping Tent
│   ├── RoomCard.tsx        # Individual room with carousel + SSA
│   ├── CampingTentCard.tsx
│   ├── ActivitiesSection.tsx
│   ├── TermsSection.tsx
│   ├── ContactSection.tsx
│   ├── ImageCarousel.tsx   # Accessible image carousel
│   ├── SSABookingWidget.tsx # SSA booking iframe
│   └── GoogleReviews.tsx
│
├── data/                   # Static content (extracted from WordPress)
│   ├── site.ts             # Site-wide constants, nav items
│   ├── rooms.ts            # All room types, pricing, images
│   ├── activities.ts       # Activities, restaurant, destinations
│   └── terms.ts            # Terms & Conditions
│
├── lib/
│   ├── cloudinary.ts       # URL builder + WP→Cloudinary resolver
│   └── media.ts            # URL replacement utilities
│
├── migration/              # Migration scripts (Node.js, no framework)
│   ├── migrate-inspect.mjs    # Phase 1: Inspect WordPress data
│   ├── migrate-media.mjs      # Phase 3: Upload media to Cloudinary
│   ├── migrate-content.mjs    # Phase 6: Export WP content to JSON
│   ├── migrate-validate.mjs   # Phase 10: Validate no WP URLs remain
│   ├── media-inventory.json   # Full media inventory with metadata
│   ├── url-mapping.json       # WP URL → Cloudinary URL (generated)
│   ├── url-redirect-map.json  # WP page → Next.js route mapping
│   └── migration-report.json  # Generated migration report
│
├── .env.example            # Environment variable template
├── .env.local              # Local secrets (gitignored)
├── next.config.ts          # Next.js config (redirects, images, headers)
└── vercel.json             # Vercel deployment config
```

---

## Setup

### 1. Clone & install

```bash
git clone <your-repo>
cd pohenhillscamp-app
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
CLOUDINARY_CLOUD_NAME=zktumplt
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=zktumplt
NEXT_PUBLIC_WP_BASE_URL=https://moccasin-wombat-987069.hostingersite.com
NEXT_PUBLIC_SITE_URL=https://pohenhillscamp.com
```

**⚠️ Never commit `.env.local` or hardcode API secrets.**

---

## Migration Scripts

All scripts are idempotent — safe to run multiple times.

### Full migration (all phases in order)

```bash
npm run migrate
```

### Individual phases

```bash
# Inspect WordPress data (read-only, no changes)
npm run migrate:inspect

# Upload all media from WordPress to Cloudinary
# Writes: migration/url-mapping.json
npm run migrate:media

# Export WordPress content to JSON files
# Writes: migration/content-export/
npm run migrate:content

# Validate no unresolved WordPress URLs remain
# Writes: migration/migration-report.json
npm run migrate:validate
```

### How media migration works

1. Reads `migration/media-inventory.json` (127 images + 3 videos)
2. For each item: checks if already in Cloudinary (idempotent)
3. Downloads from WordPress, uploads to Cloudinary
4. Saves mapping: `migration/url-mapping.json`
5. Skips known duplicates automatically

After `migrate:media`, all images in the app automatically resolve to Cloudinary via `lib/cloudinary.ts → resolveImageUrl()`.

---

## Development

```bash
npm run dev
# → http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

```bash
# Push to GitHub, then import project on vercel.com
# Or use Vercel CLI:
vercel deploy --prod
```

Set these environment variables in Vercel dashboard:

| Variable | Value |
|----------|-------|
| `CLOUDINARY_CLOUD_NAME` | `zktumplt` |
| `CLOUDINARY_API_KEY` | *(from Cloudinary console)* |
| `CLOUDINARY_API_SECRET` | *(from Cloudinary console)* |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `zktumplt` |
| `NEXT_PUBLIC_SITE_URL` | `https://pohenhillscamp.com` |

---

## URL Mapping (WordPress → Next.js)

| WordPress URL | Next.js Route | Type |
|---------------|---------------|------|
| `/` | `/` | Direct |
| `/about-us/` | `/#about` | 301 Redirect |
| `/rooms/` | `/#rooms` | 301 Redirect |
| `/activities/` | `/#activities` | 301 Redirect |
| `/terms-conditions/` | `/#terms` | 301 Redirect |
| `/hello-world/` | `/` | 301 Redirect |
| `/category/uncategorized/` | `/` | 301 Redirect |

All redirects are configured in `next.config.ts`.

---

## Media Architecture

```
WordPress uploads
  └── /wp-content/uploads/2025/06/

        ↓  npm run migrate:media

Cloudinary
  └── wordpress/images/2025/06/MLG00999
  └── wordpress/images/2025/06/Blooms
  └── wordpress/videos/2025/06/POHEN-HILLS-2025-TEASER
  └── ...

        ↓  resolveImageUrl()

Next.js app
  └── https://res.cloudinary.com/zktumplt/image/upload/f_auto,q_auto/...
```

Images in `data/rooms.ts` and `data/activities.ts` use WordPress URLs as the source of truth. After `migrate:media` runs, `lib/cloudinary.ts → resolveImageUrl()` automatically maps them to Cloudinary at build time.

---

## Booking System

The SSA (Simple Schedule Appointments) booking calendar is embedded as an iframe pointing to the WordPress SSA endpoint. No backend changes are required.

The **actual booking** is handled via WhatsApp (`https://wa.wizard.id/ddaefb`). The calendar is for availability display only, as noted in the original site.

---

## Key Decisions

- **Single-page architecture preserved** — the WordPress site was a single Elementor page with anchor navigation. Next.js reproduces this exactly.
- **No blog** — the only WordPress post (`hello-world`) is the default placeholder, not real content.
- **SSA iframes kept** — booking backend stays on WordPress. No need to migrate the booking system.
- **Google Reviews widget** — static implementation showing rating/count/link. The live review feed requires the original WordPress plugin or a Google Places API integration.

---

## Sources

- WordPress source: `https://moccasin-wombat-987069.hostingersite.com/`
- WordPress REST API: `/wp-json/wp/v2/`
- Audit report: `pohenhillscamp/AUDIT_REPORT.md`
- Media inventory: `migration/media-inventory.json`
