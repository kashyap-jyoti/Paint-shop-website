import ServicesSection from '@components/Services/Services';
import { useSeo } from '@utils/useSeo';

export default function Services() {
  useSeo({
    title: 'Paint & Hardware Services | Satyam Hardware & Paint Ghazipur',
    description: 'Expert color consultation, automated computer colour mixing, bulk contractor orders, and doorstep home delivery in Rauza, Ghazipur UP.',
    canonicalPath: '/services',
  });

  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <ServicesSection />
    </div>
  );
}
