import categoryService, { Category } from '@/services/category.service';
import CategoryView from './CategoryView';

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
    console.error('Error generating static params for categories view:', error);
    return [];
  }
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  // Pass the id directly instead of the params object
  return <CategoryView id={id} />;
} 