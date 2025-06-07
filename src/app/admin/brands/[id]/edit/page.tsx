// File: app/admin/brands/[id]/edit/page.tsx

import { Suspense } from 'react';
import BrandEdit from './BrandEdit';
import brandService from '@/services/brand.service';

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrandEdit id={params.id} />
    </Suspense>
  );
}

// For static exports, we need to pre-render all possible paths
export async function generateStaticParams() {
  try {
    const response = await brandService.getAllBrands();
    const brands = response.data || [];
    
    // Generate paths for all brands
    return brands.map((brand) => ({
      id: String(brand.id),
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    // For static generation, return these default paths
    return [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
      { id: '5' },
    ];
  }
}
