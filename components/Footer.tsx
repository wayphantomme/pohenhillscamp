import Link from "next/link";
import Image from "next/image";
import { SITE, NAV_ITEMS } from "@/data/site";
import { resolveImageUrl } from "@/lib/cloudinary";

const LOGO_URL =
  "https://moccasin-wombat-987069.hostingersite.com/wp-content/uploads/2025/06/Pohen-Hills-Logo-Circle-Big.png";

export default function Footer() {
  return (
    <footer className="ph-footer" role="contentinfo">
      <div className="ph-footer__inner">
        {/* Brand */}
        <div className="ph-footer__brand">
          <Image
            src={resolveImageUrl(LOGO_URL, { width: 64, height: 64 })}
            alt={`${SITE.name} logo`}
            width={64}
            height={64}
            className="ph-footer__logo"
          />
          <h2 className="ph-footer__name">{SITE.name}</h2>
          <p className="ph-footer__desc">
            Glamping in the heart of Bali's highlands
          </p>
        </div>

        {/* Nav links */}
        <nav className="ph-footer__nav" aria-label="Footer navigation">
          <ul role="list">
            {NAV_ITEMS.map((item) =>
              item.external ? null : (
                <li key={item.href}>
                  <a href={item.href} className="ph-footer__link">
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Contact */}
        <div className="ph-footer__contact">
          <p className="ph-footer__contact-label">Book via WhatsApp</p>
          <a
            href={SITE.whatsapp}
            className="ph-footer__wa-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Now
          </a>
          <a
            href={SITE.googleReviewUrl}
            className="ph-footer__review-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            ⭐ {SITE.googleRating} ({SITE.googleReviewCount} reviews on Google)
          </a>
        </div>
      </div>

      <div className="ph-footer__bottom">
        <p>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <p className="ph-footer__legal">
          <a href="/#terms">Terms &amp; Conditions</a>
        </p>
      </div>
    </footer>
  );
}
