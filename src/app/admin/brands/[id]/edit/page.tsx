// File: app/admin/brands/[id]/edit/page.tsx

import BrandEdit from '@/components/brands/BrandEdit';
import brandService from '@/services/brand.service';

interface Props {
  params: {
    id: string;
  };
}

// This function is required for static site generation
export async function generateStaticParams() {
  try {
    // Fetch all brands to generate static paths
    const response = await brandService.getAllBrands();
    const brands = Array.isArray(response) ? response : [];
    
    // Return an array of objects with id parameter
    return brands.map((brand) => ({
      id: brand.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return []; // Return empty array if fetch fails
  }
}

export default function EditBrandPage({ params }: Props) {
  return <BrandEdit id={params.id} />;
}
