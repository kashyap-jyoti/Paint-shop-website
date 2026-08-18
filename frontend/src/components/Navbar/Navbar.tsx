import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BUSINESS_INFO } from '@utils/constants';
import { getShopLogo } from '@utils/imageLoader';

/* ─── Nav links (no routes for Brands/Gallery → hash-scroll on home page) ─── */
const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/contact',  label: 'Contact' },
];

/* Mobile menu also shows section-scroll links */
const MOBILE_EXTRA_LINKS = [
  { href: '/#brands',  label: 'Brands' },
  { href: '/#gallery', label: 'Gallery' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location  = useLocation();
  const shopLogoSrc = getShopLogo();
  const menuRef   = useRef<HTMLDivElement>(null);

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close mobile menu on route change ── */
  useEffect(() => setMenuOpen(false), [location.pathname]);

  /* ── Prevent body scroll when mobile menu is open ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ── Close menu on outside click (handles backdrop) ── */
  const closeMenu = () => setMenuOpen(false);

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* ════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════ */}
      <motion.nav
        id="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="nav-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 'var(--nav-height)',
          background: scrolled ? 'rgba(10, 10, 15, 0.92)' : 'rgba(10, 10, 18, 0.78)',
          backdropFilter: 'blur(18px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(18px) saturate(1.6)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.04)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : '0 2px 15px rgba(0,0,0,0.2)',
          transition: 'background 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease, border-bottom 0.35s ease',
        }}
      >
        {/* ── Inner container ── */}
        <div
          className="nav-container"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 20px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          {/* ── Logo ── */}
          <Link
            to="/"
            id="nav-logo"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              flexShrink: 0,
              minWidth: 0,
            }}
          >
            <motion.div
              className="nav-logo-badge"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: '0 4px 15px rgba(0,0,0,0.35), 0 0 12px rgba(249,115,22,0.2)',
                border: '1.5px solid rgba(255,255,255,0.25)',
                background: '#0a0a12',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                aspectRatio: '1 / 1',
              }}
              whileHover={{ scale: 1.06, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={shopLogoSrc}
                alt="Satyam Hardware &amp; Paint Store Logo Ghazipur"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </motion.div>

            {/* Text — clean business name */}
            <div style={{ minWidth: 0 }}>
              <span
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
                  background: 'linear-gradient(135deg, #f97316, #ef4444)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'block',
                  lineHeight: 1.1,
                  whiteSpace: 'nowrap',
                }}
              >
                Satyam Hardware
              </span>
              <span
                className="nav-subtitle"
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif',
                  whiteSpace: 'nowrap',
                }}
              >
                &amp; Paint Store
              </span>
            </div>
          </Link>

          {/* ── Desktop / Tablet Links ── */}
          <ul
            id="nav-desktop-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.1rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              flexShrink: 1,
              flexWrap: 'nowrap',
              overflow: 'hidden',
            }}
            className="nav-desktop-links"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} style={{ flexShrink: 0 }}>
                  <Link
                    to={link.href}
                    id={`nav-link-${link.label.toLowerCase()}`}
                    style={{
                      position: 'relative',
                      padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.5rem, 1.5vw, 0.9rem)',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: active ? 600 : 400,
                      fontSize: 'clamp(0.78rem, 1.2vw, 0.9rem)',
                      color: active ? '#f97316' : 'rgba(255,255,255,0.8)',
                      transition: 'color 0.2s',
                      display: 'block',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) (e.currentTarget as HTMLElement).style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)';
                    }}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        style={{
                          position: 'absolute',
                          bottom: '2px',
                          left: '0.6rem',
                          right: '0.6rem',
                          height: '2px',
                          background: 'linear-gradient(90deg, #f97316, #ef4444)',
                          borderRadius: '9999px',
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Right: CTA + Hamburger ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            {/* Call Now — hidden on mobile */}
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              id="nav-call-btn"
              className="btn btn-primary btn-ripple nav-cta"
              style={{ padding: '0.45rem 1.1rem', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
            >
              📞 Call Now
            </a>

            {/* Hamburger — hidden on desktop */}
            <button
              id="nav-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                padding: '8px',
                borderRadius: '10px',
                width: '44px',
                height: '44px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="nav-hamburger"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  style={{
                    display: 'block',
                    width: '20px',
                    height: '2px',
                    background: 'white',
                    borderRadius: '9999px',
                    transformOrigin: 'center',
                  }}
                  animate={
                    menuOpen
                      ? i === 0 ? { rotate: 45,  y: 7 }
                      : i === 1 ? { opacity: 0,  scaleX: 0 }
                      :           { rotate: -45, y: -7 }
                      : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                  }
                  transition={{ duration: 0.25 }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ════════════════════════════════════════
          MOBILE MENU PANEL
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(320px, 85vw)',
              background: 'rgba(10, 10, 20, 0.97)',
              backdropFilter: 'blur(28px) saturate(1.6)',
              WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
              zIndex: 1100,
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              overflowY: 'auto',
            }}
          >
            {/* ── Header row: logo + close ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 700,
                  fontSize: '1rem',
                  background: 'linear-gradient(135deg, #f97316, #ef4444)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Satyam Hardware
              </span>

              {/* Close button */}
              <button
                id="mobile-menu-close"
                onClick={closeMenu}
                aria-label="Close navigation menu"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '1.1rem',
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>

            {/* ── Nav items ── */}
            <nav style={{ padding: '1rem 0', flex: 1 }}>
              {[...NAV_LINKS, ...MOBILE_EXTRA_LINKS].map((link, i) => {
                const active = isActive(link.href);
                const isHashLink = link.href.includes('#');
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055, duration: 0.28 }}
                  >
                    {isHashLink ? (
                      <a
                        href={link.href}
                        id={`mobile-nav-${link.label.toLowerCase()}`}
                        onClick={closeMenu}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.95rem 1.5rem',
                          fontFamily: 'Outfit, sans-serif',
                          fontSize: '1.25rem',
                          fontWeight: 400,
                          color: 'rgba(255,255,255,0.8)',
                          borderBottom: '1px solid rgba(255,255,255,0.05)',
                          minHeight: '44px',
                          transition: 'color 0.2s, background 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        id={`mobile-nav-${link.label.toLowerCase()}`}
                        onClick={closeMenu}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.95rem 1.5rem',
                          fontFamily: 'Outfit, sans-serif',
                          fontSize: '1.25rem',
                          fontWeight: active ? 700 : 400,
                          color: active ? '#f97316' : 'rgba(255,255,255,0.85)',
                          borderBottom: '1px solid rgba(255,255,255,0.05)',
                          minHeight: '44px',
                          transition: 'color 0.2s, background 0.2s',
                          background: active ? 'rgba(249,115,22,0.07)' : 'transparent',
                          borderLeft: active ? '3px solid #f97316' : '3px solid transparent',
                        }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            {/* ── CTA Buttons ── */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                id="mobile-call-btn"
                className="btn btn-primary btn-ripple"
                style={{ justifyContent: 'center', minHeight: '48px' }}
                onClick={closeMenu}
              >
                📞 {BUSINESS_INFO.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
                id="mobile-whatsapp-btn"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ justifyContent: 'center', minHeight: '48px' }}
                onClick={closeMenu}
              >
                💬 WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════
          BACKDROP (click to close)
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeMenu}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.55)',
              zIndex: 1050,
              cursor: 'pointer',
            }}
          />
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════
          RESPONSIVE STYLES
      ════════════════════════════════════════ */}
      <style>{`
        /* Desktop (≥ 1024px): show links + CTA, hide hamburger */
        @media (min-width: 1024px) {
          .nav-desktop-links { display: flex !important; }
          .nav-cta           { display: inline-flex !important; }
          .nav-hamburger     { display: none !important; }
          .nav-subtitle      { display: block !important; }
        }

        /* Tablet (768px – 1023px): show links, reduce spacing, show hamburger if no space */
        @media (min-width: 768px) and (max-width: 1023px) {
          .nav-desktop-links { display: flex !important; }
          .nav-cta           { display: none !important; }
          .nav-hamburger     { display: none !important; }
          .nav-subtitle      { display: none !important; }
        }

        /* Mobile (< 768px): hide links + CTA, show hamburger */
        @media (max-width: 767px) {
          .nav-desktop-links { display: none !important; }
          .nav-cta           { display: none !important; }
          .nav-hamburger     { display: flex !important; }
          .nav-subtitle      { display: none !important; }
        }

        /* Ensure navbar never creates horizontal scroll */
        #navbar {
          overflow: visible;
        }
        #navbar > div {
          overflow: visible;
        }
      `}</style>
    </>
  );
}
