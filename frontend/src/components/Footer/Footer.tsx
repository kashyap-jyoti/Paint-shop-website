import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '@utils/constants';
import { getPaintFrames, getHeroImage, getPaintBucketImage, getShopLogo } from '@utils/imageLoader';

const FRAMES = getPaintFrames();

const FOOTER_LINKS = {
  'Quick Links': [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ],
  Products: [
    { label: 'Birla Opus Paints', href: '/products' },
    { label: 'Interior Paints', href: '/products' },
    { label: 'Exterior Paints', href: '/products' },
    { label: 'Wall Putty', href: '/products' },
    { label: 'Primer', href: '/products' },
    { label: 'Waterproof Coating', href: '/products' },
    { label: 'Hardware Tools', href: '/products' },
  ],
  Brands: [
    { label: 'Birla Opus Paints', href: '/products' },
    { label: 'Asian Paints', href: '/products' },
    { label: 'Berger Paints', href: '/products' },
    { label: 'Nerolac', href: '/products' },
    { label: 'Indigo Paints', href: '/products' },
    { label: 'JK Putty', href: '/products' },
    { label: 'Dr. Fixit', href: '/products' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();
  const heroImageSrc = getHeroImage() || getPaintBucketImage();
  const shopLogoSrc = getShopLogo();

  return (
    <footer
      id="footer"
      style={{
        background: 'linear-gradient(180deg, var(--color-surface-2) 0%, #050508 100%)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent gradient line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #f97316, #ef4444, transparent)',
          opacity: 0.5,
        }}
      />

      {/* Floating Uploaded Paint Frame Images in Footer Background */}
      {FRAMES.length > 0 &&
        [0, 15, 30, 45].map((frameIdx, i) => (
          <motion.div
            key={`footer-floating-${i}`}
            style={{
              position: 'absolute',
              left: `${10 + i * 25}%`,
              bottom: `${15 + (i % 2) * 20}%`,
              width: `${60 + (i % 3) * 20}px`,
              height: `${60 + (i % 3) * 20}px`,
              borderRadius: '50%',
              backgroundImage: `url(${FRAMES[frameIdx] || heroImageSrc})`,
              backgroundSize: 'cover',
              opacity: 0.12,
              filter: `hue-rotate(${i * 45}deg) saturate(2)`,
              pointerEvents: 'none',
              zIndex: 0,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, (i % 2 === 0 ? 12 : -12), 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}

      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '2rem', position: 'relative', zIndex: 1 }}>
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand Column */}
          <div>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                marginBottom: '1.25rem',
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '1.5px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 12px rgba(0,0,0,0.35)', flexShrink: 0, aspectRatio: '1 / 1' }}>
                <img src={shopLogoSrc} alt="Satyam Hardware & Paint Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <span
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(135deg, #f97316, #ef4444)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    display: 'block',
                    lineHeight: 1.1,
                  }}
                >
                  Satyam Hardware
                </span>
                <span
                  style={{
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  &amp; Paint — Ghazipur
                </span>
              </div>
            </Link>

            <p
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.85rem',
                lineHeight: 1.7,
                fontFamily: 'Inter, sans-serif',
                marginBottom: '1.5rem',
                maxWidth: '260px',
              }}
            >
              Ghazipur's trusted paint and hardware store for over 10 years. Quality products, expert guidance, honest service.
            </p>

            {/* Contact Snippet */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { icon: '📞', text: BUSINESS_INFO.phoneDisplay, href: `tel:${BUSINESS_INFO.phone}` },
                { icon: '📍', text: '00 00 00 RAUZA, Ghazipur, UP', href: '#' },
                { icon: '🧾', text: `GSTIN: ${BUSINESS_INFO.gstin}`, href: '#' },
                { icon: '🗺️', text: `State: ${BUSINESS_INFO.stateCode}`, href: '#' },
              ].map(({ icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.8rem',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'color 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#f97316')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)')}
                >
                  <span>{icon}</span> {text}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: 'white',
                  marginBottom: '1.25rem',
                  letterSpacing: '0.02em',
                }}
              >
                {section}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '0.85rem',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'color 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#f97316')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
                    >
                      <span style={{ fontSize: '0.6rem', color: '#f97316' }}>▸</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, rgba(249,115,22,0.14), rgba(239,68,68,0.1))',
            border: '1px solid rgba(249,115,22,0.25)',
            borderRadius: '1.25rem',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 700,
                fontSize: '1.2rem',
                color: 'white',
                marginBottom: '0.375rem',
              }}
            >
              Ready to Transform Your Space?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', fontFamily: 'Inter, sans-serif' }}>
              Visit our store at Rauza, Ghazipur or call us for expert color consultation today.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              id="footer-call-btn"
              className="btn btn-primary btn-ripple"
              style={{ fontSize: '0.875rem', padding: '0.625rem 1.5rem' }}
            >
              📞 Call Now
            </a>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-whatsapp-btn"
              className="btn btn-outline"
              style={{ fontSize: '0.875rem', padding: '0.625rem 1.5rem', borderColor: '#25D366', color: '#25D366' }}
            >
              💬 WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: '0.8rem',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            © {year} Satyam Hardware & Paint. All rights reserved.
          </p>
          <p
            style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '0.75rem',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Ghazipur, Uttar Pradesh, India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
