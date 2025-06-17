'use client';

import { ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import orderService, { Order } from '@/services/order.service';
import { useEffect, useState } from 'react';

export default function OrderDetails({ id }: { id: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    fetchOrder();
  }, [id])
  const fetchOrder = async () => {
    try {
      const response = await orderService.getOrderById(Number(id));
      console.log(response);
      setOrders(response);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  }
  return 1;
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/admin/orders" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order #{orders.id}</h1>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Total Amount</div>
              <div className="text-2xl font-bold text-gray-900">${orders.order_total}</div>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Name</div>
                  <div className="text-sm font-medium text-gray-900">{orders.user.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="text-sm font-medium text-gray-900">{orders.user.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="text-sm font-medium text-gray-900">{orders.user.phone_number}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Account Status</div>
                  <div className="text-sm font-medium text-gray-900">
                    {order.user.status === 1 ? (
                      <span className="text-green-600">Active</span>
                    ) : (
                      <span className="text-red-600">Inactive</span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Member Since</div>
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(order.user.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-900">{order.shipping_address.address_line_1}</div>
                {order.shipping_address.address_line_2 && (
                  <div className="text-sm font-medium text-gray-900">{order.shipping_address.address_line_2}</div>
                )}
                <div className="text-sm font-medium text-gray-900">
                  {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}
                </div>
                <div className="text-sm font-medium text-gray-900">{order.shipping_address.country}</div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Added on {new Date(order.shipping_address.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.order_items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{item.product.product_name}</div>
                      <div className="text-sm text-gray-500">SKU: {item.product.product_code}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div>Size: {item.product.product_size}</div>
                        <div>Color: {item.product.product_colour}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.product.product_short_desc}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">${item.item_price}</div>
                      {item.product.product_discount_price && (
                        <div className="text-xs text-gray-500 line-through">
                          ${item.product.product_selling_price}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{item.item_quantity}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-sm text-gray-900">
                        ${(Number(item.item_price) * item.item_quantity).toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-500">Payment Method</div>
                <div className="text-sm font-medium text-gray-900 capitalize">{order.payment.payment_method}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Payment Status</div>
                <div className="text-sm font-medium text-gray-900 capitalize">
                  <span className={order.payment.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}>
                    {order.payment.payment_status}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Transaction ID</div>
                <div className="text-sm font-medium text-gray-900">{order.payment.transaction_id}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Amount</div>
                <div className="text-sm font-medium text-gray-900">${order.payment.amount}</div>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-gray-500">Payment Date</div>
                <div className="text-sm font-medium text-gray-900">
                  {new Date(order.payment.paid_at).toLocaleString()}
                </div>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-gray-500">Last Updated</div>
                <div className="text-sm font-medium text-gray-900">
                  {new Date(order.payment.updated_at).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 