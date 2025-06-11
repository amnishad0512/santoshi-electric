import orderService from '@/services/order.service';
import OrderDetails from './OrderDetails';

// This function tells Next.js which order IDs should be pre-rendered at build time
export async function generateStaticParams() {
  try {
    // For static export, we'll generate some common order IDs
    // In a real app, this would fetch from your orders API/database
    const orderIds = ['1', '2', '3', '4', '5'];
    
    return orderIds.map((id) => ({
      id: id,
    }));
  } catch (error) {
    console.error('Error generating static params for orders:', error);
    return [];
  }
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orderId = Number(id);
  
  let order;
  try {
    order = await orderService.getOrderById(orderId);
  } catch (error) {
    console.error('Error fetching order during build:', error);
    order = null;
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-xl font-semibold text-red-600">Order not found</h1>
          <p className="text-gray-600 mt-2">The requested order could not be found or is not available during static generation.</p>
        </div>
      </div>
    );
  }

  return <OrderDetails order={order} />;
} 