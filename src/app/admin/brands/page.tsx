'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import brandService, { Brand } from '@/services/brand.service';

// Add dynamic configuration
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Default image for brands without a logo
const DEFAULT_BRAND_IMAGE = '/images/default-brand.png';

const BrandsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const {data} = await brandService.getAllBrands();
      setBrands(data);
    } catch (error) {
      toast.error('Failed to fetch brands');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this brand?')) return;

    try {
      await brandService.deleteBrand(id);
      toast.success('Brand deleted successfully');
      fetchBrands();
    } catch (error) {
      toast.error('Failed to delete brand');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
console.log(brands)
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Brands</h1>
        <Link
          href="/admin/brands/add"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add New Brand
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {brands.map((brand) => (
              <tr key={brand.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-12 w-12 relative flex items-center justify-center bg-gray-100 rounded-lg">
                    {brand.brand_image ? (
                      <Image
                        src={brand.brand_image}
                        alt={`${brand.brand_name} logo`}
                        fill
                        className="rounded-lg object-contain p-1"
                        unoptimized
                      />
                    ) : (
                      <span className="text-2xl text-gray-400">
                        {brand.brand_name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{brand.brand_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{brand.products_count || 0}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    brand.status === 1 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {brand.status === 1 ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {brand.created_at ? new Date(brand.created_at).toLocaleDateString() : '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <Link
                    href={`/admin/brands/${brand.id}/view`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/brands/${brand.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(brand.id)}
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
  );
};

export default BrandsPage; 