import ProductsSection from '@components/Products/Products';
import { useSeo } from '@utils/useSeo';

export default function Products() {
  useSeo({
    title: 'Paint & Hardware Products | Satyam Hardware & Paint Ghazipur',
    description: 'Explore interior paints, exterior paints, wall putty, primers, waterproof coatings, and construction hardware products at Satyam Hardware & Paint in Ghazipur.',
    canonicalPath: '/products',
  });

  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <ProductsSection />
    </div>
  );
}
