import { Suspense } from 'react';
import EditCouponForm from './EditCouponForm';

interface Props {
  params: { id: string };
}

// This function will be used to generate the static paths at build time
export async function generateStaticParams() {
  // In a real application, you would fetch this from your API or database
  // For now, we'll pre-render these specific coupon IDs
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    // Add more IDs as needed
  ];
}

// This function runs at build time for static generation
// and on the server at runtime for server-side rendering
export async function generateMetadata({ params }: Props) {
  return {
    title: `Edit Coupon ${params.id}`,
    description: `Edit coupon details for coupon ${params.id}`,
  };
}

async function getData(id: string) {
  try {
    // In a real application, you would fetch the coupon data from your API
    // For now, we'll return a mock object
    return {
      id,
      code: `COUPON${id}`,
      discount: 10,
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      status: 'active'
    };
  } catch (error) {
    console.error('Error fetching coupon data:', error);
    throw new Error('Failed to fetch coupon data');
  }
}

export default async function Page({ params }: Props) {
  const couponData = await getData(params.id);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Coupon</h1>
      </div>
      <Suspense fallback={
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }>
        <EditCouponForm id={params.id} initialData={couponData} />
      </Suspense>
    </div>
  );
} 