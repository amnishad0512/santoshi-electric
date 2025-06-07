import { Suspense } from 'react';
import categoryService, { Category } from '@/services/category.service';
import CategoryEdit from './CategoryEdit';

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryEdit id={params.id} />
    </Suspense>
  );
}

// For static exports, we need to pre-render all possible paths
export async function generateStaticParams() {
  try {
    const response = await categoryService.getAllCategories();
    const categories = response || [];
    
    // Generate paths for all categories
    return categories.map((category: Category) => ({
      id: String(category.id),
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