import ContactSection from '@components/Contact/Contact';
import { useSeo } from '@utils/useSeo';

export default function Contact() {
  useSeo({
    title: 'Contact Us | Satyam Hardware & Paint Shop Ghazipur',
    description: 'Contact Satyam Hardware & Paint in Rauza, Ghazipur. Phone: +91 92365 14590. Near Pooja Pali Clinic & Roohi Mandi, Ghazipur, UP 233002.',
    canonicalPath: '/contact',
  });

  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <ContactSection />
    </div>
  );
}
