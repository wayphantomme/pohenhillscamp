import Image from "next/image";
import { SITE } from "@/data/site";
import { resolveImageUrl } from "@/lib/cloudinary";

const LOGO_WHITE_URL =
  "https://res.cloudinary.com/zktumplt/image/upload/wordpress/images/2025/06/2.-Putih.JPG-scaled.png";

const COMPANY_LINKS = [
  { label: "Careers", href: "#" },
  { label: "About Us", href: "/#about" },
  { label: "Blog", href: "#" },
];

const SERVICE_LINKS = [
  { label: "Experiences", href: "/#activities" },
  { label: "Rooms", href: "/#rooms" },
  { label: "Restaurants", href: "/#activities" },
];

export default function Footer() {
  return (
    <footer className="ph-footer" role="contentinfo">
      {/* Main grid */}
      <div className="ph-footer__inner">

        {/* Col 1 — Brand + socials */}
        <div className="ph-footer__brand">
          <Image
            src={resolveImageUrl(LOGO_WHITE_URL, { width: 80, height: 80 })}
            alt={`${SITE.name} logo`}
            width={80}
            height={80}
            className="ph-footer__logo"
          />
          <p className="ph-footer__name">
            <span className="ph-footer__name-pohen">POHEN</span>
            <span className="ph-footer__name-sub">HILLS CAMP</span>
          </p>

          {/* Social icons */}
          <div className="ph-footer__socials">
            <a
              href={SITE.instagram}
              className="ph-footer__social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              {/* Instagram SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a
              href={SITE.tiktok}
              className="ph-footer__social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              {/* TikTok SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
              </svg>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="ph-footer__social-link"
              aria-label="Email"
            >
              {/* Email SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <polyline points="2,4 12,13 22,4"/>
              </svg>
            </a>
            <a
              href={SITE.whatsapp}
              className="ph-footer__social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              {/* WhatsApp SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2 — Company */}
        <nav className="ph-footer__col" aria-label="Company links">
          <h3 className="ph-footer__col-heading">Company</h3>
          <ul role="list">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="ph-footer__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Col 3 — Our Services */}
        <nav className="ph-footer__col" aria-label="Services links">
          <h3 className="ph-footer__col-heading">Our Services</h3>
          <ul role="list">
            {SERVICE_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="ph-footer__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Col 4 — Address */}
        <div className="ph-footer__col">
          <h3 className="ph-footer__col-heading">Address</h3>
          <ul className="ph-footer__address-list" role="list">
            <li>
              <a href={SITE.phoneHref} className="ph-footer__address-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="ph-footer__address-icon">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="ph-footer__address-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="ph-footer__address-icon">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <polyline points="2,4 12,13 22,4"/>
                </svg>
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.googleMapsUrl} className="ph-footer__address-item" target="_blank" rel="noopener noreferrer">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="ph-footer__address-icon">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {SITE.address}
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="ph-footer__bottom">
        <p>{SITE.email}</p>
        <p>Copyright © {new Date().getFullYear()} All rights reserved</p>
      </div>
    </footer>
  );
}
