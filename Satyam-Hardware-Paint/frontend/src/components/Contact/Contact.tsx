import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { BUSINESS_INFO } from '@utils/constants';
import { getPaintFrames, getHeroImage, getPaintBucketImage } from '@utils/imageLoader';
import axios from 'axios';

const FRAMES = getPaintFrames();

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: '', phone: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const heroImageSrc = getHeroImage() || getPaintBucketImage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post('/api/contact', form);
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.875rem 1.25rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '0.75rem',
    color: 'white',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  return (
    <section
      id="contact"
      className="section"
      style={{
        background: 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-surface-2) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Uploaded Decorative Background Paint Images */}
      {FRAMES.length > 0 && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '5%',
              right: '-10%',
              width: '500px',
              height: '500px',
              backgroundImage: `url(${FRAMES[22] || heroImageSrc})`,
              backgroundSize: 'cover',
              opacity: 0.12,
              filter: 'blur(10px) saturate(2.2)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '-8%',
              width: '450px',
              height: '450px',
              backgroundImage: `url(${FRAMES[45] || heroImageSrc})`,
              backgroundSize: 'cover',
              opacity: 0.1,
              filter: 'blur(12px) hue-rotate(120deg) saturate(2)',
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
            <span>📍</span> Get In Touch
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-heading"
          >
            Visit Us or <span className="gradient-text">Connect Online</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subheading"
            style={{ margin: '0 auto' }}
          >
            Visit our store at Rauza, Ghazipur, call us, WhatsApp, or send an instant message.
          </motion.p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'start',
          }}
        >
          {/* Left: Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* Quick Contact Buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                id="contact-call-btn"
                className="btn btn-primary btn-ripple"
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.9rem' }}
              >
                📞 Call Now
              </a>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hello, I'm interested in your products.`}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-whatsapp-btn"
                className="btn btn-outline"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  borderColor: '#25D366',
                  color: '#25D366',
                }}
              >
                💬 WhatsApp
              </a>
            </div>

            {/* Info Cards */}
            {[
              {
                icon: '📍',
                title: 'Address',
                content: BUSINESS_INFO.address.full,
              },
              {
                icon: '🧾',
                title: 'GSTIN Number',
                content: BUSINESS_INFO.gstin,
              },
              {
                icon: '🗺️',
                title: 'State & Code',
                content: BUSINESS_INFO.stateCode,
              },
              {
                icon: '🕐',
                title: 'Business Hours',
                content: 'Mon–Sat: 8:00 AM – 8:00 PM\nSunday: 9:00 AM – 6:00 PM',
              },
              {
                icon: '📞',
                title: 'Phone / Contact',
                content: `${BUSINESS_INFO.phoneDisplay}\nWhatsApp: ${BUSINESS_INFO.phone}`,
              },
            ].map(({ icon, title, content }, idx) => {
              const bgFrame = FRAMES[(idx * 18) % (FRAMES.length || 1)] || heroImageSrc;
              return (
                <div
                  key={title}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '1rem',
                    padding: '1.25rem',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Line Item Animated Paint Background Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${bgFrame})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: 0.15,
                      filter: `hue-rotate(${idx * 60}deg) saturate(2)`,
                      pointerEvents: 'none',
                    }}
                  />
                  <span style={{ fontSize: '1.4rem', flexShrink: 0, position: 'relative', zIndex: 2 }}>{icon}</span>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div
                      style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        color: 'white',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.825rem',
                        color: 'rgba(255,255,255,0.6)',
                        lineHeight: 1.6,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {content}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Google Maps embed */}
            <div
              style={{
                borderRadius: '1rem',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.07)',
                height: '220px',
              }}
            >
              <iframe
                title="Satyam Hardware & Paint Location"
                src={BUSINESS_INFO.mapEmbedUrl}
                width="100%"
                height="220"
                style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <h3
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '1.75rem',
                }}
              >
                Send Us a Message
              </h3>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                id="contact-form"
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: '0.375rem' }}
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Ramesh Kumar"
                    value={form.name}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: '0.375rem' }}
                  >
                    Phone Number *
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: '0.375rem' }}
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: '0.375rem' }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    placeholder="Tell us what paint or hardware products you need..."
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                  />
                </div>

                <motion.button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={status === 'sending'}
                  className="btn btn-primary btn-ripple"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}
                >
                  {status === 'sending' ? '⏳ Sending...' : '🚀 Send Message'}
                </motion.button>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      padding: '0.875rem',
                      background: 'rgba(16,185,129,0.12)',
                      border: '1px solid rgba(16,185,129,0.3)',
                      borderRadius: '0.75rem',
                      color: '#10b981',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                      textAlign: 'center',
                    }}
                  >
                    ✅ Message sent! We'll contact you shortly.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      padding: '0.875rem',
                      background: 'rgba(239,68,68,0.12)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      borderRadius: '0.75rem',
                      color: '#ef4444',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                      textAlign: 'center',
                    }}
                  >
                    ❌ Failed to send. Please call us directly.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
