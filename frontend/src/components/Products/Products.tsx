import { motion } from 'framer-motion';
import { useState } from 'react';
import { PRODUCTS } from '@utils/constants';
import { getPaintFrames, getHeroImage, getProductImage } from '@utils/imageLoader';

const CATEGORIES = ['All', 'Interior', 'Exterior', 'Putty', 'Primer', 'Waterproof', 'Tools', 'Hardware', 'Special'];
const FRAMES = getPaintFrames();
const HERO_IMG = getHeroImage();

interface ProductCardProps {
  product: (typeof PRODUCTS)[0];
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  // Assign uploaded frame asset per product
  const frameSrc = FRAMES.length > 0 ? FRAMES[(index * 7) % FRAMES.length] : HERO_IMG;
  const productImageSrc = product.image ? getProductImage(product.image) : undefined;
  const displaySrc = productImageSrc || frameSrc;

  return (
    <motion.article
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(249,115,22,0.15)'
          : '0 4px 20px rgba(0,0,0,0.2)',
        transition: 'box-shadow 0.35s ease',
      }}
    >
      {/* Background Animated Paint Asset */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${frameSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: hovered ? 0.25 : 0.1,
          filter: `saturate(2) hue-rotate(${index * 40}deg)`,
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}
      />

      {/* Gradient border overlay on hover */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '1.25rem',
          padding: '1px',
          background: `linear-gradient(135deg, ${product.gradient.replace('from-', '#').replace(' to-', ', #').replace(/[a-z]+-\d+/g, (m) => {
            const colorMap: Record<string, string> = {
              'orange-400': '#fb923c', 'red-500': '#ef4444', 'blue-400': '#60a5fa',
              'indigo-600': '#4f46e5', 'stone-400': '#a8a29e', 'gray-600': '#4b5563',
              'yellow-400': '#facc15', 'orange-500': '#f97316', 'cyan-400': '#22d3ee',
              'blue-600': '#2563eb', 'purple-400': '#c084fc', 'pink-500': '#ec4899',
              'green-400': '#4ade80', 'teal-600': '#0d9488', 'slate-500': '#64748b',
              'zinc-700': '#3f3f46', 'rose-600': '#e11d48', 'blue-500': '#3b82f6',
            };
            return colorMap[m] || '#f97316';
          })})`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        style={{
          padding: 'clamp(1.25rem, 4vw, 2rem) clamp(1rem, 3vw, 1.5rem) 1.25rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 3,
        }}
      >
        {/* Extracted Product Image Thumbnail */}
        <motion.div
          style={{
            width: '110px',
            height: '110px',
            margin: '0 auto 1rem',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
          animate={hovered ? { scale: 1.12, rotate: [0, -4, 4, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={displaySrc}
            alt={`${product.name} at Satyam Hardware & Paint Ghazipur`}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: productImageSrc ? 'none' : `hue-rotate(${index * 45}deg) saturate(1.8)`,
            }}
          />
        </motion.div>

        {/* Category badge */}
        <span
          style={{
            display: 'inline-block',
            padding: '0.2rem 0.75rem',
            background: 'rgba(249,115,22,0.12)',
            border: '1px solid rgba(249,115,22,0.2)',
            borderRadius: '9999px',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#fb923c',
            marginBottom: '0.75rem',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {product.category}
        </span>

        <h3
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'white',
            marginBottom: '0.625rem',
          }}
        >
          {product.name}
        </h3>

        <p
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            fontFamily: 'Inter, sans-serif',
            marginBottom: '1rem',
          }}
        >
          {product.description}
        </p>

        {/* Features */}
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.375rem',
            justifyContent: 'center',
            marginBottom: '1.25rem',
          }}
        >
          {product.features.map((f) => (
            <li
              key={f}
              style={{
                padding: '0.2rem 0.6rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '9999px',
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'Inter, sans-serif',
                listStyle: 'none',
              }}
            >
              ✓ {f}
            </li>
          ))}
        </ul>

        {/* Price */}
        <div
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 700,
            fontSize: '1rem',
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {product.priceRange}
        </div>
      </div>
    </motion.article>
  );
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="section" style={{ background: 'var(--color-surface)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-tag"
            style={{ justifyContent: 'center' }}
          >
            <span>🛒</span> Our Products
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-heading"
          >
            Our <span className="gradient-text">Products</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subheading"
            style={{ margin: '0 auto 2rem' }}
          >
            Explore our wide range of professional paints, tools, and hardware supplies featuring our authentic paint finishes.
          </motion.p>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`product-filter-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '9999px',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? '#f97316' : 'rgba(255,255,255,0.1)',
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg, #f97316, #ef4444)'
                    : 'transparent',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: activeCategory === cat ? 600 : 400,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.2s',
                  boxShadow: activeCategory === cat ? '0 0 20px rgba(249,115,22,0.3)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
