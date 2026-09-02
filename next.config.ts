import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // WordPress source (fallback before Cloudinary migration)
      {
        protocol: "https",
        hostname: "moccasin-wombat-987069.hostingersite.com",
        pathname: "/wp-content/uploads/**",
      },
      // Cloudinary CDN
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/zktumplt/**",
      },
      // Google profile images (used in Google Reviews widget)
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  async redirects() {
    return [
      // WordPress subpages → anchor sections (301 permanent)
      {
        source: "/about-us",
        destination: "/#about",
        permanent: true,
      },
      {
        source: "/about-us/",
        destination: "/#about",
        permanent: true,
      },
      {
        source: "/rooms",
        destination: "/#rooms",
        permanent: true,
      },
      {
        source: "/rooms/",
        destination: "/#rooms",
        permanent: true,
      },
      {
        source: "/activities",
        destination: "/#activities",
        permanent: true,
      },
      {
        source: "/activities/",
        destination: "/#activities",
        permanent: true,
      },
      {
        source: "/terms-conditions",
        destination: "/#terms",
        permanent: true,
      },
      {
        source: "/terms-conditions/",
        destination: "/#terms",
        permanent: true,
      },
      // WordPress default blog post
      {
        source: "/hello-world",
        destination: "/",
        permanent: true,
      },
      {
        source: "/hello-world/",
        destination: "/",
        permanent: true,
      },
      // WordPress category archive
      {
        source: "/category/uncategorized",
        destination: "/",
        permanent: true,
      },
      {
        source: "/category/uncategorized/",
        destination: "/",
        permanent: true,
      },
      // WordPress feed
      {
        source: "/feed",
        destination: "/",
        permanent: true,
      },
      // WordPress wp-admin / wp-login → home
      {
        source: "/wp-admin/:path*",
        destination: "/",
        permanent: false,
      },
      {
        source: "/wp-login.php",
        destination: "/",
        permanent: false,
      },
    ];
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
