'use client';

import React from 'react';
import ProtectedPage from '@/components/ProtectedPage';
import { useRouter } from 'next/navigation';
import { Package, ChevronRight, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';

// This would typically come from your API
const mockOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-03-15',
    status: 'Delivered',
    total: 129.99,
    items: [
      { id: '1', name: 'LED Bulb 9W', quantity: 2, price: 49.99, image: '/images/bulb.jpg' },
      { id: '2', name: 'Extension Cord', quantity: 1, price: 30.01, image: '/images/cord.jpg' },
    ],
    deliveryAddress: '123 Main St, City, State, 12345',
    paymentMethod: 'Credit Card (**** 1234)',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-2024-002',
    date: '2024-03-10',
    status: 'Processing',
    total: 79.99,
    items: [
      { id: '3', name: 'Wall Socket', quantity: 1, price: 79.99, image: '/images/socket.jpg' },
    ],
    deliveryAddress: '456 Oak St, City, State, 12345',
    paymentMethod: 'PayPal',
    trackingNumber: null
  },
  {
    id: 'ORD-2024-003',
    date: '2024-03-05',
    status: 'Shipped',
    total: 199.99,
    items: [
      { id: '4', name: 'Ceiling Fan', quantity: 1, price: 199.99, image: '/images/fan.jpg' },
    ],
    deliveryAddress: '789 Pine St, City, State, 12345',
    paymentMethod: 'Credit Card (**** 5678)',
    trackingNumber: 'TRK987654321'
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-purple-100 text-purple-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return <CheckCircle className="w-5 h-5" />;
    case 'processing':
      return <Clock className="w-5 h-5" />;
    case 'shipped':
      return <Truck className="w-5 h-5" />;
    case 'cancelled':
      return <AlertCircle className="w-5 h-5" />;
    default:
      return <Package className="w-5 h-5" />;
  }
};

const OrdersPage = () => {
  const router = useRouter();

  return (
    <ProtectedPage allowedRoles={['user']}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Orders</h1>
          <button
            onClick={() => router.push('/products')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Continue Shopping
          </button>
        </div>

        {mockOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">When you place an order, it will appear here.</p>
            <button
              onClick={() => router.push('/products')}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Order Header */}
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">ORDER PLACED</p>
                      <p className="font-medium">{order.date}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">TOTAL</p>
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">ORDER ID</p>
                      <p className="font-medium">{order.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Details */}
                  <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Shipping Address</h3>
                      <p className="text-gray-600">{order.deliveryAddress}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Payment Method</h3>
                      <p className="text-gray-600">{order.paymentMethod}</p>
                    </div>
                    {order.trackingNumber && (
                      <div className="md:col-span-2">
                        <h3 className="font-medium mb-2">Tracking Number</h3>
                        <p className="text-gray-600">{order.trackingNumber}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Actions */}
                <div className="p-4 bg-gray-50 border-t flex justify-end">
                  <button
                    onClick={() => router.push(`/orders/${order.id}`)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    View Order Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedPage>
  );
};

export default OrdersPage; 