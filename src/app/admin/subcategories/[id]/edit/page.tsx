import { Metadata } from 'next';
import SubCategoryEdit from './SubCategoryEdit';

export const metadata: Metadata = {
  title: 'Edit SubCategory | Admin Dashboard',
  description: 'Edit an existing subcategory in your e-commerce platform',
};

export async function generateStaticParams() {
  try {
    // For static export, we'll generate some common subcategory IDs
    // In a real app, this would fetch from your subcategories API/database
    const subcategoryIds = ['1', '2', '3', '4', '5'];
    
    return subcategoryIds.map((id) => ({
      id: id,
    }));
  } catch (error) {
    console.error('Error generating static params for subcategories edit:', error);
    return [];
  }
}

export default async function EditSubCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <SubCategoryEdit id={id} />
    </div>
  );
} 