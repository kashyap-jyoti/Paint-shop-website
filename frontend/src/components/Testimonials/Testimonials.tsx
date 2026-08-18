import { motion } from 'framer-motion';
import { TESTIMONIALS } from '@utils/constants';
import { getPaintFrames, getHeroImage } from '@utils/imageLoader';

const FRAMES = getPaintFrames();
const HERO_IMG = getHeroImage();

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: '0.9rem',
            color: i < rating ? '#fbbf24' : 'rgba(255,255,255,0.15)',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }: { t: (typeof TESTIMONIALS)[0]; index: number }) {
  const frameAsset = FRAMES[(index * 7) % (FRAMES.length || 1)] || HERO_IMG;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1.25rem',
        padding: 'clamp(1.25rem, 4vw, 2rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minWidth: 'min(300px, 85vw)',
        maxWidth: '380px',
        flexShrink: 0,
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      whileHover={{
        y: -6,
        boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(249,115,22,0.12)',
      }}
    >
      {/* Uploaded Paint Asset Background Overlay */}
      <div
        style={{
          position: 'absolute',
          right: '-20px',
          bottom: '-20px',
          width: '120px',
          height: '120px',
          backgroundImage: `url(${frameAsset})`,
          backgroundSize: 'cover',
          opacity: 0.1,
          borderRadius: '50%',
          filter: `hue-rotate(${index * 45}deg) saturate(2)`,
          pointerEvents: 'none',
        }}
      />

      {/* Quote symbol */}
      <div
        style={{
          fontSize: '2rem',
          color: '#f97316',
          opacity: 0.6,
          lineHeight: 1,
          fontFamily: 'Georgia, serif',
        }}
      >
        "
      </div>

      <p
        style={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: '0.9rem',
          lineHeight: 1.75,
          fontFamily: 'Inter, sans-serif',
          flex: 1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {t.content}
      </p>

      <StarRating rating={t.rating} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative', zIndex: 1 }}>
        {/* Avatar featuring Uploaded Paint Image Cutout */}
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #f97316',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <img
            src={frameAsset}
            alt=""
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: `hue-rotate(${index * 50}deg)` }}
          />
        </div>
        <div>
          <div
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: 'white',
            }}
          >
            {t.name}
          </div>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              color: '#fb923c',
            }}
          >
            {t.role}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section"
      style={{
        background: 'linear-gradient(180deg, var(--color-surface) 0%, var(--color-bg) 100%)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Uploaded Background Paint Splash Decoration */}
      {FRAMES.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            height: '450px',
            backgroundImage: `url(${FRAMES[18] || HERO_IMG})`,
            backgroundSize: 'cover',
            opacity: 0.08,
            filter: 'blur(20px) saturate(2)',
            pointerEvents: 'none',
          }}
        />
      )}

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-tag"
            style={{ justifyContent: 'center' }}
          >
            <span>💬</span> Testimonials
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-heading"
          >
            What Our <span className="gradient-text">Customers</span> Say
          </motion.h2>
        </div>

        {/* Horizontal Scroll Carousel */}
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            overflowX: 'auto',
            paddingBottom: '1.5rem',
            scrollbarWidth: 'thin',
            scrollbarColor: '#f97316 transparent',
            scrollSnapType: 'x mandatory',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div key={t.id} style={{ scrollSnapAlign: 'start' }}>
              <TestimonialCard t={t} index={i} />
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginTop: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', gap: '4px' }}>
            {[...Array(5)].map((_, i) => (
              <span key={i} style={{ fontSize: '1.5rem', color: '#fbbf24' }}>
                ★
              </span>
            ))}
          </div>
          <div>
            <span
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 800,
                fontSize: '1.8rem',
                background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              5.0
            </span>
            <span
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                marginLeft: '0.5rem',
              }}
            >
              Average Rating · 1000+ Verified Customers in Ghazipur
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
