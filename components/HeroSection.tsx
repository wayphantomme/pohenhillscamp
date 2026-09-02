"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/data/site";

/**
 * Hero Section — full-width autoplay video (Client Component).
 * WordPress original: POHEN-HILLS-2025-TEASER.mp4 (start: 8.5s, end: 70s)
 *
 * videoUrl is resolved in the parent Server Component (page.tsx) via
 * lib/cloudinary.ts → resolveImageUrl(), so no fs usage happens here.
 */

interface HeroSectionProps {
  videoUrl: string;
}

export default function HeroSection({ videoUrl }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Start at 8.5s to match the original Elementor widget settings
    video.currentTime = 8.5;
    // Loop the segment between 8.5s and 70s
    const checkTime = () => {
      if (video.currentTime >= 70) video.currentTime = 8.5;
    };
    video.addEventListener("timeupdate", checkTime);
    return () => video.removeEventListener("timeupdate", checkTime);
  }, []);

  return (
    <section className="ph-hero" aria-label="Hero">
      <div className="ph-hero__video-wrap">
        <video
          ref={videoRef}
          className="ph-hero__video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          controlsList="nodownload"
        >
          <source src={`${videoUrl}#t=8.5,70`} type="video/mp4" />
        </video>
        <div className="ph-hero__overlay" aria-hidden="true" />
      </div>

      <div className="ph-hero__content">
        <h1 className="ph-hero__title">{SITE.name}</h1>
        <p className="ph-hero__sub">
          Glamping in the heart of Bali&apos;s highlands
        </p>
        <a
          href={SITE.whatsapp}
          className="ph-btn ph-btn--primary ph-btn--lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book Now
        </a>
      </div>
    </section>
  );
}
