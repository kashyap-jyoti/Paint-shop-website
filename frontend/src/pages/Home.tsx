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
    description: 'Satyam Hardware & Paint in Rauza, Ghazipur offers premium paints, construction hardware, wall putty, colours, tools and expert colour consultation.',
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
