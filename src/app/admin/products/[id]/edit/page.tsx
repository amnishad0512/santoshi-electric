import EditProductClient from './EditProductClient';

export async function generateStaticParams() {
  try {
    // For static export, we'll generate some common product IDs
    // In a real app, this would fetch from your products API/database
    const productIds = ['1', '2', '3', '4', '5'];
    
    return productIds.map((id) => ({
      id: id,
    }));
  } catch (error) {
    console.error('Error generating static params for products:', error);
    return [];
  }
}

// Server component wrapper that handles async params
export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditProductClient id={id} />;
} 