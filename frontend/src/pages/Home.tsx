import Hero from '@components/Hero/Hero';
import Products from '@components/Products/Products';
import Services from '@components/Services/Services';
import About from '@components/About/About';
import Brands from '@components/Brands/Brands';
import Testimonials from '@components/Testimonials/Testimonials';
import Contact from '@components/Contact/Contact';

/**
 * Home page — assembles all sections in sequence.
 * Each section has its own scroll-triggered animations.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Products />
      <Services />
      <Brands />
      <Testimonials />
      <Contact />
    </>
  );
}
