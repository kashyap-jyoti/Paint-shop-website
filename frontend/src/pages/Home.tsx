import Hero from '@components/Hero/Hero';
import Products from '@components/Products/Products';
import Services from '@components/Services/Services';
import About from '@components/About/About';
import Brands from '@components/Brands/Brands';
import Testimonials from '@components/Testimonials/Testimonials';
import Contact from '@components/Contact/Contact';
import { useSeo } from '@utils/useSeo';

/**
 * Home page — assembles all sections in sequence.
 * Each section has its own scroll-triggered animations.
 */
export default function Home() {
  useSeo({
    title: 'Satyam Hardware & Paint | Paint & Hardware Shop in Ghazipur',
    description: 'Satyam Hardware & Paint, Rauza, Ghazipur offers interior & exterior paints, hardware, construction materials, colour consultation, Berger Paints, wall putty, and polishes.',
    canonicalPath: '/',
  });

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
