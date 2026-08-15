import { motion } from 'framer-motion';
import { SERVICES } from '@utils/constants';
import { getPaintFrames, getHeroImage } from '@utils/imageLoader';

const FRAMES = getPaintFrames();
const HERO_IMG = getHeroImage();

export default function Services() {
  return (
    <section
      id="services"
      className="section"
      style={{
        background: 'var(--color-bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Uploaded Paint Splash Decoration */}
      {FRAMES.length > 0 && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '-10%',
              width: '550px',
              height: '550px',
              backgroundImage: `url(${FRAMES[12] || HERO_IMG})`,
              backgroundSize: 'cover',
              opacity: 0.12,
              filter: 'blur(10px) saturate(2.2)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '5%',
              right: '-10%',
              width: '500px',
              height: '500px',
              backgroundImage: `url(${FRAMES[38] || HERO_IMG})`,
              backgroundSize: 'cover',
              opacity: 0.1,
              filter: 'blur(12px) hue-rotate(180deg) saturate(2)',
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-tag"
            style={{ justifyContent: 'center' }}
          >
            <span>🔧</span> Our Services
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-heading"
          >
            Complete Painting & <span className="gradient-text">Hardware Solutions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subheading"
            style={{ margin: '0 auto' }}
          >
            From color consultation to bulk contractor supply, we deliver expert guidance and authentic products.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 270px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {SERVICES.map((service, i) => {
            const frameAsset = FRAMES[(i * 9) % (FRAMES.length || 1)] || HERO_IMG;

            return (
              <motion.article
                key={service.id}
                id={`service-card-${service.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(249,115,22,0.1)' } as any}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '1.25rem',
                  padding: 'clamp(1.25rem, 4vw, 2rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                {/* Line Item Animated Paint Frame Background */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${frameAsset})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.18,
                    filter: `hue-rotate(${i * 45}deg) saturate(2)`,
                    pointerEvents: 'none',
                  }}
                />

                {/* Service Image Graphic */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={frameAsset}
                    alt={service.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: `hue-rotate(${i * 50}deg) saturate(1.8)`,
                    }}
                  />
                </div>

                <h3
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'white',
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.875rem',
                    lineHeight: 1.7,
                    fontFamily: 'Inter, sans-serif',
                    flex: 1,
                  }}
                >
                  {service.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#f97316',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <span>Learn More</span>
                  <span style={{ fontSize: '1rem' }}>→</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
