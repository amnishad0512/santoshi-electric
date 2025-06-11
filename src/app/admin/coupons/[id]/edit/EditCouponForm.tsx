'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import couponService, { createCouponSchema, type Coupon } from '@/services/couponService';

type CouponFormData = {
  code: string;
  discount: number;
  validFrom: string;
  validTo: string;
  status: 'active' | 'inactive';
};

interface Props {
  id: string;
  initialData: Coupon;
}

export default function EditCouponForm({ id, initialData }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponFormData>({
    resolver: zodResolver(createCouponSchema),
    defaultValues: {
      code: initialData.code,
      discount: initialData.discount,
      validFrom: initialData.validFrom.split('T')[0],
      validTo: initialData.validTo.split('T')[0],
      status: initialData.status,
    },
  });

  const onSubmit = async (data: CouponFormData) => {
    setLoading(true);
    try {
      await couponService.updateCoupon({
        id,
        ...data,
      });
      toast.success('Coupon updated successfully');
      router.push('/admin/coupons');
      router.refresh(); // Refresh the page data
    } catch (error) {
      console.error('Error updating coupon:', error);
      toast.error('Failed to update coupon');
    } finally {
      setLoading(false);
    }
  };

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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
              Discount (%)
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
            <label htmlFor="validFrom" className="block text-sm font-medium text-gray-700">
              Valid From
            </label>
            <input
              type="date"
              id="validFrom"
              {...register('validFrom')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.validFrom && (
              <p className="mt-1 text-sm text-red-600">{errors.validFrom.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="validTo" className="block text-sm font-medium text-gray-700">
              Valid To
            </label>
            <input
              type="date"
              id="validTo"
              {...register('validTo')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.validTo && (
              <p className="mt-1 text-sm text-red-600">{errors.validTo.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              {...register('status')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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
            className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
} 