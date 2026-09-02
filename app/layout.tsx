import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Pohen Hills Camp — glamping & camping resort in the Pohen forest area, Bali. Stunning mountain views, luxurious tents, restaurant, activities. Book via WhatsApp.",
  keywords: [
    "Pohen Hills Camp",
    "glamping Bali",
    "camping Bali highlands",
    "glamping Bedugul",
    "tent accommodation Bali",
    "The Blooms Garden",
    "Pohen forest",
    "Ulun Danu Beratan",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name,
    description:
      "Pohen Hills Camp — glamping & camping resort in the Pohen forest area, Bali. Stunning mountain views, restaurant, and activities.",
    images: [
      {
        url: `${SITE.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Pohen Hills Camp — glamping in Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description:
      "Pohen Hills Camp — glamping & camping resort in Bali's highlands.",
    images: [`${SITE.url}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      {
        url: "https://moccasin-wombat-987069.hostingersite.com/wp-content/uploads/2025/06/cropped-Pohen-Hills-Logo-Circle-Big-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "https://moccasin-wombat-987069.hostingersite.com/wp-content/uploads/2025/06/cropped-Pohen-Hills-Logo-Circle-Big-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "https://moccasin-wombat-987069.hostingersite.com/wp-content/uploads/2025/06/cropped-Pohen-Hills-Logo-Circle-Big-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a1a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="ph-skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
