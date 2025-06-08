'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import orderService, { Order } from '@/services/order.service';

interface OrderStatusProps {
  order: Order;
}

const OrderStatusBadge = ({ status }: { status: Order['order_status'] }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function OrderStatus({ order: initialOrder }: OrderStatusProps) {
  const [order, setOrder] = useState(initialOrder);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: Order['order_status']) => {
    if (isUpdating) return;

    try {
      setIsUpdating(true);
      const updatedOrder = await orderService.updateOrderStatus(order.id, newStatus);
      if (updatedOrder) {
        setOrder(updatedOrder);
        toast.success('Order status updated successfully');
      } else {
        toast.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
      toast.error('Failed to update order status');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="mt-2 flex items-center space-x-4">
      <OrderStatusBadge status={order.order_status} />
      <select
        value={order.order_status}
        onChange={(e) => handleStatusChange(e.target.value as Order['order_status'])}
        className="border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
        disabled={isUpdating}
      >
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  );
} 