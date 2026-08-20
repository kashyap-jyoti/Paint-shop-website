import { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '@utils/constants';
import { getPaintFrames } from '@utils/imageLoader';

// Centralized array of existing uploaded hero image paths
const GLOBAL_FRAMES: string[] = getPaintFrames();

// Global set to track preloaded image URLs across component mounts
const preloadedCache = new Set<string>();

/**
 * Preloads all animation image sources before starting transitions.
 * Guarantees all frames are cached in browser memory before crossfading.
 */
function preloadAllImages(sources: string[]): Promise<void> {
  if (!sources || sources.length === 0) return Promise.resolve();

  const promises = sources.map((src) => {
    return new Promise<void>((resolve) => {
      if (!src || preloadedCache.has(src)) {
        resolve();
        return;
      }
      const img = new Image();
      img.onload = () => {
        preloadedCache.add(src);
        resolve();
      };
      img.onerror = () => {
        // Resolve gracefully on error so single broken image doesn't halt loop
        preloadedCache.add(src);
        resolve();
      };
      img.src = src;
    });
  });

  return Promise.all(promises).then(() => undefined);
}

export default function Hero() {
  // Stable reference to hero frames
  const frames = useMemo(() => GLOBAL_FRAMES, []);
  const totalFrames = frames.length;

  const initialFrameA = totalFrames > 0 ? frames[0] : '';
  const initialFrameB = totalFrames > 1 ? frames[1] : initialFrameA;

  // Double-buffered layers for smooth zero-flicker opacity crossfade
  const [imageA, setImageA] = useState<string>(initialFrameA);
  const [imageB, setImageB] = useState<string>(initialFrameB);
  const [activeLayer, setActiveLayer] = useState<'A' | 'B'>('A');

  const currentIndexRef = useRef<number>(0);
  const activeLayerRef = useRef<'A' | 'B'>('A');

  useEffect(() => {
    if (totalFrames <= 1) return;

    let isMounted = true;
    let timer: ReturnType<typeof setInterval> | null = null;

    // 1. Preload all animation frames into browser memory cache first
    preloadAllImages(frames).then(() => {
      if (!isMounted) return;

      // 2. Start ONE controlled timer for cycling frames with smooth opacity crossfade
      timer = setInterval(() => {
        const nextIndex = (currentIndexRef.current + 1) % totalFrames;
        currentIndexRef.current = nextIndex;
        const nextImage = frames[nextIndex] || '';

        if (activeLayerRef.current === 'A') {
          // Prepare hidden Layer B with next preloaded image, then fade Layer B in
          setImageB(nextImage);
          requestAnimationFrame(() => {
            if (!isMounted) return;
            setActiveLayer('B');
            activeLayerRef.current = 'B';
          });
        } else {
          // Prepare hidden Layer A with next preloaded image, then fade Layer A in
          setImageA(nextImage);
          requestAnimationFrame(() => {
            if (!isMounted) return;
            setActiveLayer('A');
            activeLayerRef.current = 'A';
          });
        }
      }, 3000);
    });

    // 3. Clean up timer & mount flag on unmount to prevent memory leaks or duplicate intervals
    return () => {
      isMounted = false;
      if (timer) clearInterval(timer);
    };
  }, [frames, totalFrames]);

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
      {/* ── DOUBLE-BUFFERED IMAGE LAYERS FOR ULTRA-SMOOTH OPACITY TRANSITION ── */}
      {totalFrames > 0 && (
        <>
          {/* Background Layer A */}
          <div
            className="hero-bg-layer hero-bg-layer-a"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              backgroundImage: imageA ? `url("${imageA}")` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: activeLayer === 'A' ? 0.55 : 0,
              zIndex: activeLayer === 'A' ? 2 : 1,
              transition: 'opacity 1s ease-in-out',
              willChange: 'opacity',
              pointerEvents: 'none',
            }}
          />

          {/* Background Layer B */}
          <div
            className="hero-bg-layer hero-bg-layer-b"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              backgroundImage: imageB ? `url("${imageB}")` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: activeLayer === 'B' ? 0.55 : 0,
              zIndex: activeLayer === 'B' ? 2 : 1,
              transition: 'opacity 1s ease-in-out',
              willChange: 'opacity',
              pointerEvents: 'none',
            }}
          />
        </>
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

