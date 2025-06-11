import BrandView from '@/components/brands/BrandView';
import brandService from '@/services/brand.service';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  try {
    // For static export, we'll generate some common brand IDs
    // In a real app, this would fetch from your brands API/database
    const brandIds = ['1', '2', '3', '4', '5'];
    
    return brandIds.map((id) => ({
      id: id,
    }));
  } catch (error) {
    console.error('Error generating static params for brands view:', error);
    return [];
  }
}

export default async function ViewBrandPage({ params }: Props) {
  const { id } = await params;
  return <BrandView id={id} />;
} 