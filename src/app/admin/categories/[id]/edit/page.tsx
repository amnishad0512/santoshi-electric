import { Suspense } from 'react';
import categoryService, { Category } from '@/services/category.service';
import CategoryEdit from './CategoryEdit';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

// For static exports, we need to pre-render all possible paths
export async function generateStaticParams() {
  try {
    // For static export, we'll generate some common category IDs
    // In a real app, this would fetch from your categories API/database
    const categoryIds = ['1', '2', '3', '4', '5'];
    
    return categoryIds.map((id) => ({
      id: id,
    }));
  } catch (error) {
    console.error('Error generating static params for categories edit:', error);
    return [];
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryEdit id={id} />
    </Suspense>
  );
} 