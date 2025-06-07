'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import categoryService from '@/services/category.service';

interface Category {
  id: string;
  category_name: string;
  category_icon: string;
  brand_id: string;
  status: number;
  created_at: string;
  updated_at: string;
  products_count: number;
  sub_categories_count: number;
  sub_sub_categories_count: number;
}

interface Props {
  id: string;
}

const CategoryView = ({ id }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) {
        console.error('Category ID is undefined');
        toast.error('Invalid category ID');
        router.push('/admin/categories');
        return;
      }

      try {
        setLoading(true);
        console.log('Fetching category with ID:', id); // Debug log
        const response = await categoryService.getCategoryById(id);
        console.log('Category Response:', response); // Debug log
        
        if (!response || !response.data) {
          console.error('No data returned from API');
          toast.error('Category not found');
          router.push('/admin/categories');
          return;
        }

        setCategory(response.data);
      } catch (error: any) {
        console.error('Failed to fetch category:', error);
        console.error('Error response:', error.response); // Debug log
        toast.error(error.response?.data?.message || 'Failed to fetch category');
        router.push('/admin/categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Category not found</h2>
          <p className="mt-2 text-gray-600">The category you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/admin/categories"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Category Details</h1>
        <div className="space-x-4">
          <Link
            href={`/admin/categories/${id}/edit`}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit Category
          </Link>
          <Link
            href="/admin/categories"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to List
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {category.category_icon ? (
                <div className="h-48 w-48 relative flex items-center justify-center bg-gray-100 rounded-lg">
                  <Image
                    src={category.category_icon}
                    alt={category.category_name}
                    fill
                    className="rounded-lg object-contain p-1"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="h-48 w-48 flex items-center justify-center bg-gray-100 rounded-lg">
                  <span className="text-4xl text-gray-400">
                    {category.category_name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="ml-6 flex-grow">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Category Name</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">{category.category_name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {category.created_at ? new Date(category.created_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }) : '-'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Updated At</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {category.updated_at ? new Date(category.updated_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }) : '-'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className="mt-1">
                    <span className={`px-2 py-1 text-sm font-medium rounded-full ${
                      category.status === 1 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {category.status === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Products</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {category.products_count}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Sub Categories</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {category.sub_categories_count}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Sub-Sub Categories</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {category.sub_sub_categories_count}
                  </p>
                </div>
                {category.brand_id && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Brand ID</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">{category.brand_id}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView; 