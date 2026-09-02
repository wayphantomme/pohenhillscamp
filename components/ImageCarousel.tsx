"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { resolveImageUrlClient } from "@/lib/cloudinary-client";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  aspectRatio?: "landscape" | "square";
}

export default function ImageCarousel({
  images,
  alt,
  aspectRatio = "landscape",
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1)),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1)),
    [images.length]
  );

  if (!images.length) return null;

  return (
    <div
      className={`ph-carousel ph-carousel--${aspectRatio}`}
      role="region"
      aria-label={`${alt} image gallery`}
      aria-roledescription="carousel"
    >
      <div className="ph-carousel__track">
        {images.map((src, i) => {
          const resolvedSrc = resolveImageUrlClient(src, { width: 800, height: 533 });
          return (
            <div
              key={src + i}
              className={`ph-carousel__slide${i === current ? " ph-carousel__slide--active" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}`}
              aria-hidden={i !== current}
            >
              <Image
                src={resolvedSrc}
                alt={`${alt} — image ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                style={{ objectFit: "cover" }}
                priority={i === 0}
              />
            </div>
          );
        })}
      </div>

      {images.length > 1 && (
        <>
          <button
            className="ph-carousel__btn ph-carousel__btn--prev"
            onClick={prev}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className="ph-carousel__btn ph-carousel__btn--next"
            onClick={next}
            aria-label="Next image"
          >
            ›
          </button>
          <div className="ph-carousel__dots" aria-hidden="true">
            {images.map((_, i) => (
              <button
                key={i}
                className={`ph-carousel__dot${i === current ? " ph-carousel__dot--active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
