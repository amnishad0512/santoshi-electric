'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const couponSchema = z.object({
  code: z.string().min(1, 'Coupon code is required').max(20, 'Coupon code must be less than 20 characters'),
  discount: z.number().min(0, 'Discount must be greater than 0').max(100, 'Discount cannot exceed 100%'),
  type: z.enum(['percentage', 'fixed']),
  minPurchase: z.number().min(0, 'Minimum purchase must be greater than 0'),
  maxDiscount: z.number().min(0, 'Maximum discount must be greater than 0'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  usageLimit: z.number().min(0, 'Usage limit must be greater than 0'),
  status: z.number().min(0).max(1),
});

type CouponFormData = z.infer<typeof couponSchema>;

interface Coupon extends CouponFormData {
  id: number;
  usageCount: number;
  createdAt: string;
}

export default function EditCouponForm({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingCoupon, setLoadingCoupon] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
  });

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        // TODO: Replace with actual API call
        const coupon = {
          id: parseInt(id),
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
        } as Coupon;
        
        reset({
          code: coupon.code,
          discount: coupon.discount,
          type: coupon.type,
          minPurchase: coupon.minPurchase,
          maxDiscount: coupon.maxDiscount,
          startDate: coupon.startDate,
          endDate: coupon.endDate,
          usageLimit: coupon.usageLimit,
          status: coupon.status,
        });
        setLoadingCoupon(false);
      } catch (error) {
        console.error('Error fetching coupon:', error);
        toast.error('Failed to fetch coupon');
        router.push('/admin/coupons');
      }
    };

    fetchCoupon();
  }, [id, reset, router]);

  const onSubmit = async (data: CouponFormData) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // await api.put(`/coupons/${id}`, data);
      toast.success('Coupon updated successfully');
      router.push('/admin/coupons');
    } catch (error) {
      console.error('Error updating coupon:', error);
      toast.error('Failed to update coupon');
    } finally {
      setLoading(false);
    }
  };

  if (loadingCoupon) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Coupon</h1>
        <Link
          href="/admin/coupons"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back to Coupons
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Coupon Code
            </label>
            <input
              type="text"
              id="code"
              {...register('code')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Discount Type
            </label>
            <select
              id="type"
              {...register('type')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
              Discount Value
            </label>
            <input
              type="number"
              id="discount"
              {...register('discount', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.discount && (
              <p className="mt-1 text-sm text-red-600">{errors.discount.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="minPurchase" className="block text-sm font-medium text-gray-700">
              Minimum Purchase
            </label>
            <input
              type="number"
              id="minPurchase"
              {...register('minPurchase', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.minPurchase && (
              <p className="mt-1 text-sm text-red-600">{errors.minPurchase.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="maxDiscount" className="block text-sm font-medium text-gray-700">
              Maximum Discount
            </label>
            <input
              type="number"
              id="maxDiscount"
              {...register('maxDiscount', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.maxDiscount && (
              <p className="mt-1 text-sm text-red-600">{errors.maxDiscount.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              {...register('startDate')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              {...register('endDate')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.endDate && (
              <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="usageLimit" className="block text-sm font-medium text-gray-700">
              Usage Limit
            </label>
            <input
              type="number"
              id="usageLimit"
              {...register('usageLimit', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.usageLimit && (
              <p className="mt-1 text-sm text-red-600">{errors.usageLimit.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              {...register('status', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/coupons"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Coupon'}
          </button>
        </div>
      </form>
    </div>
  );
} 