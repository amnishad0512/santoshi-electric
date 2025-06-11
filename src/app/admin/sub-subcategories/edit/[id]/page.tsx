import EditSubSubCategoryClient from './EditSubSubCategoryClient';

export async function generateStaticParams() {
  try {
    // For static export, we'll generate some common sub-subcategory IDs
    // In a real app, this would fetch from your sub-subcategories API/database
    const subSubcategoryIds = ['1', '2', '3', '4', '5'];
    
    return subSubcategoryIds.map((id) => ({
      id: id,
    }));
  } catch (error) {
    console.error('Error generating static params for sub-subcategories edit alternate path:', error);
    return [];
  }
}

// Server component wrapper that handles async params
export default async function EditSubSubCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditSubSubCategoryClient id={id} />;
} 