"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE, NAV_ITEMS } from "@/data/site";
import { resolveImageUrlClient } from "@/lib/cloudinary-client";

const LOGO_URL =
  "https://res.cloudinary.com/zktumplt/image/upload/wordpress/images/2025/06/Pohen-Hills-Logo-Circle-Big.png";
const LOGO_WHITE_URL =
  "https://res.cloudinary.com/zktumplt/image/upload/wordpress/images/2025/06/2.-Putih.JPG-scaled.png";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu when clicking a nav item
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`ph-header${scrolled ? " ph-header--scrolled" : ""}`}
      role="banner"
    >
      <div className="ph-header__inner">
        {/* Logo */}
        <Link href="/" className="ph-header__logo" aria-label={SITE.name}>
          <Image
            src={resolveImageUrlClient(LOGO_URL, { width: 52, height: 52 })}
            alt={`${SITE.name} logo`}
            width={52}
            height={52}
            className="ph-header__logo-img"
            priority
          />
          <span className="ph-header__logo-text">{SITE.name}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="ph-header__nav" aria-label="Main navigation">
          <ul className="ph-header__nav-list" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    className="ph-header__nav-link ph-header__nav-link--cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <a href={item.href} className="ph-header__nav-link">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="ph-header__hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="ph-mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile nav */}
      <nav
        id="ph-mobile-menu"
        className={`ph-header__mobile-nav${menuOpen ? " ph-header__mobile-nav--open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              {item.external ? (
                <a
                  href={item.href}
                  className="ph-header__mobile-link ph-header__mobile-link--cta"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
              ) : (
                <a
                  href={item.href}
                  className="ph-header__mobile-link"
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
