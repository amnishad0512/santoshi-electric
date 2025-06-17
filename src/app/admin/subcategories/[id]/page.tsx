import { Suspense } from 'react';
import SubCategoryDetails from './SubCategoriesPageClient';
import subcategoryService, { SubCategory } from '@/services/subcategory.service';
import SubCategoriesPageClient from './SubCategoriesPageClient';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const response = await subcategoryService.getAllSubCategories();
    return response.map((subcategory: SubCategory) => ({
      id: subcategory.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params for categories:', error);
    // Return a list of known category IDs to ensure static generation works
    return [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
      { id: '5' },
    ];
  }
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  console.log(id);
  
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }>
        <SubCategoriesPageClient id={id} />
      </Suspense>
    </div>
  );
} 