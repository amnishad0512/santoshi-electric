import orderService from '@/services/order.service';
import OrderDetails from './OrderDetails';

// This function tells Next.js which order IDs should be pre-rendered at build time
export async function generateStaticParams() {
  try {
    // Fetch all orders or a subset of orders that you want to pre-render
    const orders = await orderService.getAllOrders();
    
    // Return an array of objects with the id parameter
    return orders.map((order) => ({
      id: order.id.toString(),
    }));
  } catch (error) {
    // If there's an error, return an empty array as fallback
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const orderId = Number(params.id);
  const order = await orderService.getOrderById(orderId);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-xl font-semibold text-red-600">Order not found</h1>
        </div>
      </div>
    );
  }

  return <OrderDetails order={order} />;
} 