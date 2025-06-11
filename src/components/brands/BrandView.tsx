'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import brandService from '@/services/brand.service';

interface Brand {
  id: number;
  brand_name: string;
  brand_image: string;
  status: number;
  created_at: string;
  products_count: number;
}

interface Props {

  id: string;
}

export default function BrandView({ id }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    fetchBrand();
  }, []);

  const fetchBrand = async () => {
    try {
      const response = await brandService.getBrandById(id);
      if (response.data) {
        setBrand(Array.isArray(response.data) ? response.data[0] : response.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching brand:', error);
      toast.error('Failed to fetch brand details');
      router.push('/admin/brands');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Brand not found</h2>
          <p className="mt-2 text-gray-600">The brand you're looking for doesn't exist.</p>
          <Link
            href="/admin/brands"
            className="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Back to Brands
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Brand Details</h1>
        <div className="space-x-3">
          <Link
            href={`/admin/brands/${brand.id}/edit`}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Edit Brand
          </Link>
          <Link
            href="/admin/brands"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to List
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
            <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={brand.brand_image || '/default-brand.png'}
                alt={brand.brand_name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="flex-1">
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Brand ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">#{brand.id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Brand Name</dt>
                  <dd className="mt-1 text-lg font-semibold text-gray-900">{brand.brand_name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        brand.status === 1
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {brand.status === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Products Count</dt>
                  <dd className="mt-1 text-sm text-gray-900">{brand.products_count}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created At</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(brand.created_at).toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Image URL</dt>
                  <dd className="mt-1 text-sm text-gray-900 break-all">
                    {brand.brand_image || 'No image URL available'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 