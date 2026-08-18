import AboutSection from '@components/About/About';
import { useSeo } from '@utils/useSeo';

/** Dedicated About page */
export default function About() {
  useSeo({
    title: 'About Us | Satyam Hardware & Paint Ghazipur',
    description: 'Learn about Satyam Hardware & Paint in Rauza, Ghazipur. 10+ years of trust providing Berger Paints, wall putty, polishes, and complete hardware supplies.',
    canonicalPath: '/about',
  });

  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <AboutSection />
    </div>
  );
}
