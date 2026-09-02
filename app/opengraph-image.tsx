import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const runtime = "nodejs";
export const alt = "Pohen Hills Camp — Glamping in Bali";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a2e1c 100%)",
          fontFamily: "Georgia, serif",
          padding: 60,
        }}
      >
        {/* Decorative background pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #7a9e7e 0%, transparent 50%), radial-gradient(circle at 75% 75%, #5a7a5e 0%, transparent 50%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            position: "relative",
          }}
        >
          {/* Site name */}
          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#f0ece3",
              margin: 0,
              textAlign: "center",
              letterSpacing: "-1px",
              lineHeight: 1.1,
            }}
          >
            {SITE.name}
          </h1>

          {/* Divider */}
          <div
            style={{
              width: 80,
              height: 3,
              background: "#7a9e7e",
              borderRadius: 2,
            }}
          />

          {/* Tagline */}
          <p
            style={{
              fontSize: 28,
              color: "rgba(240, 236, 227, 0.75)",
              margin: 0,
              textAlign: "center",
              fontStyle: "italic",
              letterSpacing: "0.02em",
            }}
          >
            Glamping in the heart of Bali&apos;s highlands
          </p>

          {/* Rating badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 8,
              background: "rgba(122, 158, 126, 0.2)",
              borderRadius: 40,
              padding: "10px 24px",
              border: "1px solid rgba(122, 158, 126, 0.4)",
            }}
          >
            <span style={{ color: "#f5a623", fontSize: 22 }}>4.7 / 5</span>
            <span style={{ color: "rgba(240,236,227,0.5)", fontSize: 22 }}>|</span>
            <span style={{ color: "#f0ece3", fontSize: 18, fontFamily: "sans-serif" }}>
              {SITE.googleReviewCount} Google Reviews
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
