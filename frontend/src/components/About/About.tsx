import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { getHeroImage, getPaintBucketImage, getPaintFrames } from '@utils/imageLoader';

const FRAMES = getPaintFrames();

/** Animated counter hook */
function useCounter(target: number, duration = 2000, isActive = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, isActive]);

  return count;
}

/** Stat Counter Card */
function StatCard({
  value,
  label,
  icon,
  suffix = '',
  delay,
  isActive,
}: {
  value: number;
  label: string;
  icon: string;
  suffix?: string;
  delay: number;
  isActive: boolean;
}) {
  const count = useCounter(value, 2000, isActive);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="counter-card"
      style={{ flex: 1 }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div className="counter-value">
        {count}
        {suffix}
      </div>
      <div
        style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.85rem',
          fontFamily: 'Inter, sans-serif',
          marginTop: '0.25rem',
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.1 });
  const heroImageSrc = getHeroImage() || getPaintBucketImage();

  const aboutRows = [
    {
      title: 'Our 10+ Year Legacy in Ghazipur',
      text: 'Satyam Hardware & Paint has been the most trusted destination for genuine paints and construction supplies in Ghazipur, UP. We bring official paint products directly from India’s top brands to your doorstep.',
      image: heroImageSrc,
    },
    {
      title: 'Professional Guidance & Computer Color Tinting',
      text: 'From choosing the perfect shade to calculating paint requirements — our expert team provides on-site color consulting and instant tinting for over 3000+ shades.',
      image: FRAMES[15] || heroImageSrc,
    },
    {
      title: 'Complete Hardware & Contractor Solutions',
      text: 'We stock durable stainless steel hardware, waterproof coatings, primers, wall putty, and professional rollers — supporting both individual homeowners and large commercial builders.',
      image: FRAMES[35] || heroImageSrc,
    },
  ];

  return (
    <section
      id="about"
      className="section"
      style={{
        background: 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-surface-2) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Paint Frame Texture */}
      {FRAMES.length > 0 && (
        <div
          style={{
            position: 'absolute',
            left: '-10%',
            top: '20%',
            width: '600px',
            height: '600px',
            backgroundImage: `url(${FRAMES[20] || heroImageSrc})`,
            backgroundSize: 'cover',
            opacity: 0.08,
            filter: 'blur(15px) saturate(2)',
            pointerEvents: 'none',
          }}
        />
      )}

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-tag"
            style={{ justifyContent: 'center' }}
          >
            <span>ℹ️</span> About Satyam Hardware & Paint
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-heading"
          >
            Why Choose <span className="gradient-text">Satyam Hardware &amp; Paint</span>
          </motion.h2>
        </div>

        {/* Vertical Alternating Layout: Text | Image */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', marginBottom: '5rem' }}>
          {aboutRows.map((row, index) => {
            const isEven = index % 2 === 0;
            const bgFrameSrc = FRAMES[(index * 15) % (FRAMES.length || 1)] || heroImageSrc;

            return (
              <div
                key={row.title}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                  gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '1.5rem',
                  padding: 'clamp(1.25rem, 4vw, 2.5rem)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Line Item Animated Paint Background Image */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${bgFrameSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.18,
                    filter: `hue-rotate(${index * 50}deg) saturate(2)`,
                    pointerEvents: 'none',
                  }}
                />

                {/* Text Block */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  style={{ order: isEven ? 1 : 2, position: 'relative', zIndex: 2 }}
                >
                  <h3
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: 'clamp(1.25rem, 4vw, 1.6rem)',
                      fontWeight: 700,
                      color: 'white',
                      marginBottom: '1rem',
                    }}
                  >
                    {row.title}
                  </h3>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                      lineHeight: 1.8,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {row.text}
                  </p>
                </motion.div>

                {/* Image Block */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  style={{
                    order: isEven ? 2 : 1,
                    height: 'clamp(180px, 30vw, 240px)',
                    borderRadius: '1.25rem',
                    overflow: 'hidden',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 12px 35px rgba(0,0,0,0.4)',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <img
                    src={row.image}
                    alt={`${row.title} - Satyam Hardware & Paint Ghazipur`}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: `hue-rotate(${index * 45}deg) saturate(1.6)`,
                    }}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Stats Row */}
        <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
          <StatCard value={10} label="Years of Experience" icon="🏆" suffix="+" delay={0} isActive={statsInView} />
          <StatCard value={1000} label="Happy Customers" icon="👥" suffix="+" delay={0.1} isActive={statsInView} />
          <StatCard value={500} label="Products Available" icon="🛒" suffix="+" delay={0.2} isActive={statsInView} />
          <StatCard value={7} label="Authorized Brands" icon="⭐" suffix="+" delay={0.3} isActive={statsInView} />
        </div>
      </div>
    </section>
  );
}
