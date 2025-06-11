import ViewSubcategoryClient from './ViewSubcategoryClient';

export async function generateStaticParams() {
  try {
    // For static export, we'll generate some common subcategory IDs
    // In a real app, this would fetch from your subcategories API/database
    const subcategoryIds = ['1', '2', '3', '4', '5'];
    
    return subcategoryIds.map((id) => ({
      id: id,
    }));
  } catch (error) {
    console.error('Error generating static params for subcategories view:', error);
    return [];
  }
}

// Server component wrapper that handles async params
export default async function ViewSubcategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ViewSubcategoryClient id={id} />;
} 