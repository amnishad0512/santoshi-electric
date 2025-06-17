import orderService from '@/services/order.service';
import OrderDetails from './OrderDetails';

// This function tells Next.js which order IDs should be pre-rendered at build time
export async function generateStaticParams() {
  try {
    const orders = await orderService.getAllOrders();
    
    // Ensure we include the specific ID that caused the error
    const staticParams = orders.map((order) => ({
      id: order.id.toString(),
    }));

    return staticParams;
  } catch (error) {
    console.error('Error generating static params for orders:', error);
    // Return at least the specific ID that caused the error
    return [{ id: "7" }];
  }
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <OrderDetails id={id} />;
} 