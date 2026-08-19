import { useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { getPaintFrames } from '@utils/imageLoader';

const ALL_FRAMES: string[] = getPaintFrames();
const TOTAL = ALL_FRAMES.length; // 60

/**
 * Global background layer featuring full-screen paint image animations.
 * Provides clear, vibrant background images across every section of the website.
 */
export default function AnimatedPaintBackground() {
  // Preload frames in browser cache on mount
  useEffect(() => {
    ALL_FRAMES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  // Scroll parallax
  const { scrollYProgress } = useScroll();
  const scrollParallax1 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const scrollParallax2 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.18, 1.08]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const scatterIndices = isMobile
    ? [0, 12, 24, 36, 48, 9, 21]
    : [0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 3, 9, 15, 21, 27];

  const primaryFrameSrc = ALL_FRAMES[0] || '';
  const secondaryFrameSrc = TOTAL > 0 ? ALL_FRAMES[Math.floor(TOTAL / 3)] : primaryFrameSrc;
  const tertiaryFrameSrc = TOTAL > 0 ? ALL_FRAMES[Math.floor((TOTAL * 2) / 3)] : primaryFrameSrc;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* LAYER 1: Full-Screen Animated Paint Background Image */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${primaryFrameSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.24,
          scale: scrollScale,
          filter: 'saturate(1.8) brightness(0.75)',
        }}
      />

      {/* LAYER 2: Floating Top-Right Paint Splash Image */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '60%',
          height: '75%',
          backgroundImage: `url(${secondaryFrameSrc})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: 0.28,
          y: scrollParallax1,
          x: smoothX,
          rotate: scrollRotate,
          filter: 'saturate(2.2) hue-rotate(20deg) drop-shadow(0 0 40px rgba(249,115,22,0.4))',
        }}
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* LAYER 3: Bottom-Left Inverted Paint Background Image */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: '65%',
          height: '70%',
          backgroundImage: `url(${tertiaryFrameSrc})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: 0.22,
          y: scrollParallax2,
          rotate: 180,
          filter: 'saturate(2.5) hue-rotate(180deg)',
        }}
        animate={{
          x: [0, 25, -15, 0],
          y: [0, -20, 15, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* LAYER 4: Mouse-Interactive Floating Paint Droplets */}
      {scatterIndices.map((frameIdx, i) => {
        const positions = [
          { left: '4%', top: '6%' },
          { left: '88%', top: '10%' },
          { left: '12%', top: '32%' },
          { left: '78%', top: '42%' },
          { left: '48%', top: '14%' },
          { left: '92%', top: '62%' },
          { left: '6%', top: '70%' },
          { left: '62%', top: '78%' },
          { left: '32%', top: '58%' },
          { left: '52%', top: '28%' },
          { left: '22%', top: '82%' },
          { left: '72%', top: '22%' },
          { left: '42%', top: '88%' },
          { left: '18%', top: '48%' },
          { left: '82%', top: '72%' },
        ];
        const pos = positions[i % positions.length];
        const size = 60 + (i % 5) * 20;
        const duration = 5 + (i % 6) * 1.5;
        const frameSrc = TOTAL > 0 ? ALL_FRAMES[frameIdx % TOTAL] : primaryFrameSrc;

        return (
          <motion.div
            key={`scatter-${i}`}
            style={{
              position: 'absolute',
              ...pos,
              width: `${size}px`,
              height: `${size}px`,
              backgroundImage: `url(${frameSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '50%',
              opacity: 0.18 + (i % 3) * 0.05,
              filter: `saturate(2) hue-rotate(${i * 24}deg) drop-shadow(0 0 15px rgba(249,115,22,0.3))`,
              x: smoothX,
              y: smoothY,
            }}
            animate={{
              y: [0, -(15 + (i % 4) * 6), 0],
              scale: [1, 1.15, 1],
              rotate: [0, i % 2 === 0 ? 12 : -12, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay: i * 0.25,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}

