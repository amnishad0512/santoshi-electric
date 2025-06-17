import { Suspense } from 'react';
import brandService, { Brand } from '@/services/brand.service';
import BrandPageClient from './BrandPageClient';

interface Props {
  params: Promise<{
    id: string;
  }>;
}


export async function generateStaticParams() {
  try {
    const response = await brandService.getAllBrands();
    return response.data.map((brand: Brand) => ({
      id: brand.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params for users:', error);
    // Return a list of known user IDs to ensure static generation works
    return [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '22' },
      // Add more IDs as needed
    ];
  }
}

export default async function BrandPage({ params }: Props) {
  const { id } = await params;
  console.log(id)
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }>
        <BrandPageClient id={id} />
      </Suspense>
    </div>
  );
} 