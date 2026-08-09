import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@components/Navbar/Navbar';
import Footer from '@components/Footer/Footer';
import LoadingScreen from '@components/LoadingScreen/LoadingScreen';
import AnimatedPaintBackground from '@components/AnimatedPaintBackground/AnimatedPaintBackground';
import Home from '@pages/Home';
import About from '@pages/About';
import Products from '@pages/Products';
import Services from '@pages/Services';
import Contact from '@pages/Contact';
import { useState, useEffect } from 'react';

/** Page transition wrapper */
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

/** Inner component that reads location for AnimatePresence */
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for 2.5s on first visit
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence>
        {loading && <LoadingScreen key="loading" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Global Layered Paint Background with uploaded assets */}
          <AnimatedPaintBackground />

          <Navbar />
          <main style={{ position: 'relative', zIndex: 1 }}>
            <AnimatedRoutes />
          </main>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
}
