import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '@utils/constants';
import { getPaintFrames } from '@utils/imageLoader';

// Centralized array of existing uploaded hero image paths (60 frames)
const GLOBAL_FRAMES: string[] = getPaintFrames();

// Global cache to prevent redundant image preloads across remounts
const preloadedCache = new Set<string>();

/**
 * Preloads image sources asynchronously in the background.
 * Non-blocking: failures or slow loads do not delay the animation timer.
 */
function preloadAllImagesBackground(sources: string[]) {
  sources.forEach((src) => {
    if (src && !preloadedCache.has(src)) {
      preloadedCache.add(src);
      const img = new Image();
      img.src = src;
    }
  });
}

export default function Hero() {
  const totalFrames = GLOBAL_FRAMES.length;

  // Initialize frame 0 immediately on mount
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const frameIndexRef = useRef<number>(0);

  useEffect(() => {
    if (totalFrames <= 1) return;

    // 1. Kick off background preloading (non-blocking)
    preloadAllImagesBackground(GLOBAL_FRAMES);

    // 2. Start ONE single timer immediately for continuous frame cycling (~130ms per frame)
    const timer = setInterval(() => {
      const nextIndex = (frameIndexRef.current + 1) % totalFrames;
      frameIndexRef.current = nextIndex;
      setCurrentFrameIndex(nextIndex);
    }, 130);

    // 3. Synchronously return cleanup function to clear timer on unmount
    return () => clearInterval(timer);
  }, [totalFrames]);

  const currentFrameSrc = totalFrames > 0 ? GLOBAL_FRAMES[currentFrameIndex] : '';

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(7,7,18,0.7) 0%, rgba(18,16,46,0.75) 45%, rgba(11,15,32,0.8) 100%)',
      }}
    >
      {/* ── CONTINUOUS FLUID PAINT BACKGROUND ANIMATION LAYER ── */}
      {totalFrames > 0 && (
        <div
          className="hero-bg-frame"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            backgroundImage: currentFrameSrc ? `url("${currentFrameSrc}")` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.45,
            zIndex: 1,
            filter: 'saturate(1.8) brightness(0.85)',
            transition: 'background-image 0.1s ease-in-out',
            pointerEvents: 'none',
            willChange: 'background-image',
          }}
        />
      )}

      {/* ── Dark Radial Overlay (zIndex: 3) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 35%, rgba(249,115,22,0.12) 0%, rgba(10,10,20,0.65) 60%, rgba(7,7,18,0.88) 100%)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* ── Hero Content Container (zIndex: 10) ── */}
      <div
        className="container hero-container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
        }}
      >
        <div className="hero-content-wrapper">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="hero-trust-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.85rem',
              background: 'rgba(249, 115, 22, 0.15)',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              borderRadius: '9999px',
              color: '#fb923c',
              fontSize: 'clamp(11px, 3.2vw, 13px)',
              fontWeight: 600,
              letterSpacing: '0.03em',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 0 15px rgba(249, 115, 22, 0.2)',
            }}
          >
            <span>★</span>
            <span>Trusted Store • 10+ Years • Ghazipur</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="hero-heading"
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              color: 'white',
              wordBreak: 'break-word',
            }}
          >
            <span className="hero-heading-line">Satyam Hardware &amp; Paint</span>
            <br />
            <span
              className="hero-heading-accent"
              style={{
                background: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
              }}
            >
              Premium Paints &amp; Hardware
            </span>{' '}
            <span className="hero-heading-line">in Ghazipur</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4, ease: 'easeOut' }}
            className="hero-description"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.5,
            }}
          >
            Ghazipur's trusted paint and hardware store in Rauza. Premium interior &amp; exterior paints, Berger Paints, wall putty, polishes, automated colour mixing, and hardware supplies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55, ease: 'easeOut' }}
            className="hero-cta-group"
          >
            <motion.div
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(249,115,22,0.5)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              style={{ flex: '1 1 auto', maxWidth: '360px', borderRadius: '9999px' }}
            >
              <Link
                to="/products"
                id="hero-explore-btn"
                className="btn btn-primary btn-ripple hero-btn"
              >
                🎨 Explore Products
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(249,115,22,0.25)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              style={{ flex: '1 1 auto', maxWidth: '360px', borderRadius: '9999px' }}
            >
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                id="hero-call-btn"
                className="btn btn-outline btn-ripple hero-btn hero-btn-secondary"
              >
                📞 Call Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
