import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RoomsSection from "@/components/RoomsSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import TermsSection from "@/components/TermsSection";
import ContactSection from "@/components/ContactSection";
import { SITE } from "@/data/site";
import { resolveVideoUrl } from "@/lib/cloudinary";

export const metadata: Metadata = {
  title: `${SITE.name} — Glamping & Camping in Bali`,
  description:
    "Pohen Hills Camp — glamping & camping resort in the Pohen forest area, Bali. Stunning mountain views, 9 room types, restaurant, and activities. Book via WhatsApp.",
  alternates: {
    canonical: SITE.url,
  },
};

const WP_VIDEO_URL =
  "https://moccasin-wombat-987069.hostingersite.com/wp-content/uploads/2025/06/POHEN-HILLS-2025-TEASER.mp4";

export default function HomePage() {
  // Resolve at build time (Server Component) — no fs in client bundle
  const heroVideoUrl = resolveVideoUrl(WP_VIDEO_URL);

  return (
    <>
      <HeroSection videoUrl={heroVideoUrl} />
      <AboutSection />
      <RoomsSection />
      <ActivitiesSection />
      <TermsSection />
      <ContactSection />
    </>
  );
}
