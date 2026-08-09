import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '@utils/constants';
import { getPaintFrames } from '@utils/imageLoader';

const FRAMES = getPaintFrames();

export default function Hero() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const animFrameRef = useRef<number>(0);
  const lastFrameTime = useRef(0);

  // Frame cycling loop (~11fps)
  const animateFrames = useCallback((timestamp: number) => {
    if (FRAMES.length === 0) return;
    const elapsed = timestamp - lastFrameTime.current;
    if (elapsed > 90) {
      setCurrentFrame((f) => (f + 1) % FRAMES.length);
      lastFrameTime.current = timestamp;
    }
    animFrameRef.current = requestAnimationFrame(animateFrames);
  }, []);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(animateFrames);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [animateFrames]);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #090814 0%, #151138 40%, #0d1226 100%)',
      }}
    >
      {/* ── LAYER 1: Background Animated Frame Texture */}
      {FRAMES.length > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${FRAMES[currentFrame]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.25,
            zIndex: 1,
            filter: 'saturate(2) brightness(0.85)',
            transition: 'background-image 0.25s linear',
          }}
        />
      )}

      {/* ── Hero Content (Typography & CTAs sitting naturally over background animation) */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: 'calc(var(--nav-height) + 2.5rem)',
          paddingBottom: '4rem',
        }}
      >
        <div style={{ maxWidth: '680px' }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-tag"
            style={{ marginBottom: '1.5rem', background: 'rgba(249,115,22,0.18)', borderColor: 'rgba(249,115,22,0.4)' }}
          >
            <span>⭐</span>
            <span>Trusted Store Since 10+ Years · Ghazipur, UP</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(2.8rem, 7vw, 5.2rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              marginBottom: '1.5rem',
              color: 'white',
            }}
          >
            Transform Your{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
              }}
            >
              Walls
            </span>{' '}
            Into Masterpieces
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.15rem',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.7,
              maxWidth: '540px',
              marginBottom: '2.5rem',
            }}
          >
            Premium paints, construction hardware, and expert color consultation at{' '}
            <strong style={{ color: 'white' }}>Satyam Hardware & Paint</strong>, Rauza, Ghazipur.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}
          >
            <Link
              to="/products"
              id="hero-explore-btn"
              className="btn btn-primary btn-ripple"
              style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}
            >
              🎨 Explore Products
            </Link>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              id="hero-call-btn"
              className="btn btn-outline btn-ripple"
              style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}
            >
              📞 Call Now
            </a>
          </motion.div>
        </div>
      </div>


    </section>
  );
}
