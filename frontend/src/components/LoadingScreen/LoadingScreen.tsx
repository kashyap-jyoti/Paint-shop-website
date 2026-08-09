import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getShopLogo } from '@utils/imageLoader';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');

  const shopLogoSrc = getShopLogo();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('done'), 200);
          setTimeout(() => onComplete(), 600);
          return 100;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'linear-gradient(135deg, #0a0a0f 0%, #1e1b4b 50%, #0f172a 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {/* Animated background orbs */}
          <motion.div
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Logo & Extracted Asset */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ textAlign: 'center', zIndex: 1 }}
          >
            {/* Extracted Paint Asset graphic */}
            <motion.div
              style={{
                width: '110px',
                height: '110px',
                margin: '0 auto 1.5rem',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 40px rgba(249,115,22,0.4)',
              }}
              animate={{ rotate: [0, -6, 6, -3, 3, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src={shopLogoSrc}
                alt="Satyam Hardware & Paint Shop Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </motion.div>

            <h1
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '2.2rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #f97316, #ef4444, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
              }}
            >
              Satyam Hardware
            </h1>
            <p
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.9rem',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginTop: '0.25rem',
              }}
            >
              &amp; Paint — Ghazipur
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ width: '260px', zIndex: 1 }}
          >
            <div
              style={{
                height: '3px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '9999px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #f97316, #ef4444)',
                  borderRadius: '9999px',
                  boxShadow: '0 0 12px rgba(249,115,22,0.8)',
                }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p
              style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.75rem',
                fontFamily: 'Inter, sans-serif',
                textAlign: 'center',
                marginTop: '0.75rem',
              }}
            >
              Loading premium paint experience...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
