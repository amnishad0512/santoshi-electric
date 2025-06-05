'use client';

import ProtectedPage from '@/components/ProtectedPage';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface Coupon {
  id: number;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minPurchase: number;
  maxDiscount: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usageCount: number;
  createdAt: string;
  status: number;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      // TODO: Replace with actual API call
      const response = [
        {
          id: 1,
          code: 'SUMMER2024',
          discount: 20,
          type: 'percentage',
          minPurchase: 50,
          maxDiscount: 100,
          startDate: '2024-03-01',
          endDate: '2024-08-31',
          usageLimit: 1000,
          usageCount: 150,
          createdAt: '2024-03-15',
          status: 1,
        },
        // Add more sample coupons as needed
      ];
      setCoupons(response);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      toast.error('Failed to fetch coupons');
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        // TODO: Replace with actual API call
        setCoupons(coupons.filter(c => c.id !== id));
        toast.success('Coupon deleted successfully');
      } catch (error) {
        console.error('Error deleting coupon:', error);
        toast.error('Failed to delete coupon');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <ProtectedPage allowedRoles={['admin']}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Coupons Management</h1>
          <Link
            href="/admin/coupons/add"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add New Coupon
          </Link>
        </div>

        {/* Coupons Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Validity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{coupon.code}</div>
                    <div className="text-sm text-gray-500">
                      {coupon.type === 'percentage' ? 'Percentage' : 'Fixed Amount'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {coupon.type === 'percentage' ? `${coupon.discount}%` : `$${coupon.discount}`}
                    </div>
                    <div className="text-sm text-gray-500">
                      Min: ${coupon.minPurchase} | Max: ${coupon.maxDiscount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(coupon.startDate).toLocaleDateString()} - {new Date(coupon.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {coupon.usageCount} / {coupon.usageLimit}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      coupon.status === 1 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {coupon.status === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/admin/coupons/${coupon.id}/edit`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(coupon.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedPage>
  );
} 