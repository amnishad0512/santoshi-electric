'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import categoryService, { Category } from '@/services/category.service';
import subcategoryService, { Subcategory } from '@/services/subcategory.service';

interface Props {
  params: {
    id: string;
  };
}

const ViewCategoryPage = ({ params }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoryData, subcategoriesData] = await Promise.all([
        categoryService.getCategoryById(params.id),
        subcategoryService.getSubcategoriesByCategory(params.id),
      ]);
      setCategory(categoryData);
      setSubcategories(subcategoriesData);
    } catch (error) {
      toast.error('Failed to fetch category data');
      console.error(error);
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

  if (!category) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center text-gray-600">Category not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Category Details</h1>
        <Link
          href={`/admin/categories/${params.id}/edit`}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Edit Category
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <Image
                src={category.category_icon}
                alt={category.category_name}
                width={96}
                height={96}
                className="rounded-lg object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{category.category_name}</h2>
              <p className="mt-1 text-sm text-gray-500">
                Created at: {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Subcategories</h2>
          <Link
            href={`/admin/subcategories/add?category_id=${params.id}`}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add Subcategory
          </Link>
        </div>

        {subcategories.length === 0 ? (
          <div className="text-center text-gray-600 py-8">No subcategories found</div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subcategory Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subcategories.map((subcategory) => (
                  <tr key={subcategory.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{subcategory.subcategory_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {subcategory.createdAt ? new Date(subcategory.createdAt).toLocaleDateString() : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Link
                        href={`/admin/subcategories/${subcategory.id}/view`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/subcategories/${subcategory.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCategoryPage; 