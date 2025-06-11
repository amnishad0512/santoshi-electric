// File: app/admin/brands/[id]/edit/page.tsx

import BrandEdit from '@/components/brands/BrandEdit';
import brandService from '@/services/brand.service';

interface Props {
    params: Promise<{
      id: string;
    }>;
}

// This function is required for static site generation
export async function generateStaticParams() {
  try {
    // For static export, we'll generate some common brand IDs
    // In a real app, this would fetch from your brands API/database
    const brandIds = ['1', '2', '3', '4', '5'];
    
    return brandIds.map((id) => ({
      id: id,
    }));
  } catch (error) {
    console.error('Error generating static params for brands edit:', error);
    return []; // Return empty array if fetch fails
  }
}

export default async function EditBrandPage({ params }: Props) {
  const { id } = await params;  
  return <BrandEdit id={id} />;
}
