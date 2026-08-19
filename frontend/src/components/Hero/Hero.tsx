import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '@utils/constants';
import { getPaintFrames } from '@utils/imageLoader';

// Centralized array of existing uploaded hero image paths
const FRAMES = getPaintFrames();

// Global set to ensure image URLs are preloaded into browser memory cache
const preloadedCache = new Set<string>();

function preloadHeroImages(images: string[]) {
  images.forEach((src) => {
    if (!preloadedCache.has(src)) {
      const img = new Image();
      img.src = src;
      preloadedCache.add(src);
    }
  });
}

export default function Hero() {
  // Two persistent layers for continuous ping-pong crossfade
  const [frameAIndex, setFrameAIndex] = useState(0);
  const [frameBIndex, setFrameBIndex] = useState(1 % (FRAMES.length || 1));
  const [activeLayer, setActiveLayer] = useState<'A' | 'B'>('A');

  const currentIndexRef = useRef(0);
  const activeLayerRef = useRef<'A' | 'B'>('A');

  useEffect(() => {
    if (FRAMES.length === 0) return;

    // A. Preload all uploaded existing hero frame images
    preloadHeroImages(FRAMES);

    // Respect prefers-reduced-motion setting
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) return;
    }

    // C. Single animation timer for crossfading hero background images
    const interval = setInterval(() => {
      const totalFrames = FRAMES.length;
      if (totalFrames <= 1) return;

      const nextIndex = (currentIndexRef.current + 1) % totalFrames;
      currentIndexRef.current = nextIndex;

      if (activeLayerRef.current === 'A') {
        // Update Layer B (currently opacity: 0) to next image, then fade it in
        setFrameBIndex(nextIndex);
        setActiveLayer('B');
        activeLayerRef.current = 'B';
      } else {
        // Update Layer A (currently opacity: 0) to next image, then fade it in
        setFrameAIndex(nextIndex);
        setActiveLayer('A');
        activeLayerRef.current = 'A';
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const hasFrames = FRAMES.length > 0;
  const imageA = hasFrames ? FRAMES[frameAIndex] : '';
  const imageB = hasFrames ? FRAMES[frameBIndex] : '';

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
        background: 'linear-gradient(135deg, rgba(7,7,18,0.55) 0%, rgba(18,16,46,0.65) 45%, rgba(11,15,32,0.7) 100%)',
      }}
    >
      {/* ── B. TWO PERMANENT IMAGE LAYERS FOR ZERO-FLICKER CROSSFADE ── */}
      {hasFrames && (
        <>
          {/* Layer A */}
          <div
            className="hero-bg-layer hero-bg-layer-a"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${imageA})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: activeLayer === 'A' ? 0.38 : 0,
              zIndex: 1,
              filter: 'saturate(1.8) brightness(0.85)',
              transition: 'opacity 1.2s ease-in-out',
              willChange: 'opacity',
            }}
          />

          {/* Layer B */}
          <div
            className="hero-bg-layer hero-bg-layer-b"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${imageB})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: activeLayer === 'B' ? 0.38 : 0,
              zIndex: 2,
              filter: 'saturate(1.8) brightness(0.85)',
              transition: 'opacity 1.2s ease-in-out',
              willChange: 'opacity',
            }}
          />
        </>
      )}

      {/* ── Dark Overlay gradient (Semi-transparent so paint motion shines through) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 35%, rgba(249,115,22,0.1) 0%, rgba(10,10,20,0.55) 60%, rgba(7,7,18,0.82) 100%)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* ── Hero Content Container ── */}
      <div
        className="container hero-container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
        }}
      >
        <div className="hero-content-wrapper">
          {/* 1. Trust Badge — 0.1s staggered entry */}
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

          {/* 2. Main Heading — 0.25s staggered entry */}
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

          {/* 3. Description — 0.4s staggered entry */}
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

          {/* 4. CTA Buttons — 0.55s staggered entry */}
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

