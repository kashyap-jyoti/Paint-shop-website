import { motion } from 'framer-motion';
import { BRANDS } from '@utils/constants';
import { getPaintFrames, getHeroImage, getLogoImage } from '@utils/imageLoader';

const FRAMES = getPaintFrames();
const HERO_IMG = getHeroImage();

/** Renders a single brand card */
function BrandCard({ brand, index }: { brand: (typeof BRANDS)[0]; index: number }) {
  const frameAsset = FRAMES[(index * 5) % (FRAMES.length || 1)] || HERO_IMG;
  const brandLogoSrc = getLogoImage(brand.slug || brand.logo);
  const logoDisplaySrc = brandLogoSrc || frameAsset;

  return (
    <motion.div
      whileHover={{
        scale: 1.08,
        y: -4,
        boxShadow: `0 8px 40px rgba(0,0,0,0.4), 0 0 20px ${brand.color}44`,
      } as any}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '1.5rem 2rem',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1rem',
        minWidth: '170px',
        transition: 'box-shadow 0.3s ease',
        cursor: 'default',
        userSelect: 'none',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Uploaded Paint Asset Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${frameAsset})`,
          backgroundSize: 'cover',
          opacity: 0.12,
          filter: `hue-rotate(${index * 40}deg) saturate(2)`,
          pointerEvents: 'none',
        }}
      />

      {/* Brand Icon Graphic */}
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${brand.color}44, ${brand.color}11)`,
          border: `2px solid ${brand.color}66`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.3rem',
          fontWeight: 800,
          fontFamily: 'Outfit, sans-serif',
          color: brand.color,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <img
          src={logoDisplaySrc}
          alt={brand.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: brandLogoSrc ? 'none' : `hue-rotate(${index * 60}deg)`,
          }}
        />
      </div>

      <span
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 700,
          fontSize: '0.9rem',
          color: 'white',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {brand.name}
      </span>
    </motion.div>
  );
}

export default function Brands() {
  const doubled = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section
      id="brands"
      style={{
        padding: '5rem 0',
        background: 'var(--color-surface)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 'clamp(30px, 8vw, 120px)',
          background: 'linear-gradient(to right, var(--color-surface), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 'clamp(30px, 8vw, 120px)',
          background: 'linear-gradient(to left, var(--color-surface), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Section Header */}
      <div className="container" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-tag"
          style={{ justifyContent: 'center' }}
        >
          <span>🏷️</span> Authorized Dealer
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-heading"
        >
          Authorized <span className="gradient-text">Brand Partners</span>
        </motion.h2>
      </div>

      {/* Continuous Marquee Slider */}
      <div style={{ overflow: 'hidden' }}>
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            gap: '1.25rem',
            padding: '0.5rem 0',
          }}
        >
          {doubled.map((brand, i) => (
            <BrandCard key={`${brand.name}-${i}`} brand={brand} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
