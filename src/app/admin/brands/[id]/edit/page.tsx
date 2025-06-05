import BrandEdit from './BrandEdit';

// Remove dynamic configuration since we're using static export
export const dynamic = 'error';
export const dynamicParams = false;

export function generateStaticParams() {
  // Generate a larger range of IDs to cover more possibilities
  return Array.from({ length: 100 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  return <BrandEdit id={params.id} />;
} 