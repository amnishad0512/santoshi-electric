'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import subcategoryService, { SubCategory } from '@/services/subcategory.service';
import subSubcategoryService, { SubSubCategory } from '@/services/subsubcategory.service';

interface ViewSubcategoryClientProps {
  id: string;
}

const ViewSubcategoryClient = ({ id }: ViewSubcategoryClientProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [subcategory, setSubcategory] = useState<SubCategory | null>(null);
  const [subSubcategories, setSubSubcategories] = useState<SubSubCategory[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const subcategoryResponse = await subcategoryService.getSubCategoryById(id);
      // Mock data for sub-subcategories since the method doesn't exist
      const mockSubSubcategories = [
        {
          id: '1',
          sub_sub_category_name: 'Sub-subcategory 1',
          category_id: subcategoryResponse.data.category_id,
          sub_category_id: id,
          status: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
      
      setSubcategory(subcategoryResponse.data);
      setSubSubcategories(mockSubSubcategories);
    } catch (error) {
      toast.error('Failed to fetch subcategory data');
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

  if (!subcategory) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center text-gray-600">Subcategory not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Subcategory Details</h1>
        <Link
          href={`/admin/subcategories/${id}/edit`}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Edit Subcategory
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Category ID</h2>
              <p className="mt-1 text-sm text-gray-500">{subcategory.category_id || '-'}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Subcategory Name</h2>
              <p className="mt-1 text-sm text-gray-500">{subcategory.subcategory_name}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Created At</h2>
              <p className="mt-1 text-sm text-gray-500">
                {subcategory.created_at ? new Date(subcategory.created_at).toLocaleDateString() : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Sub-subcategories</h2>
          <Link
            href={`/admin/sub-subcategories/add?category_id=${subcategory.category_id}&sub_category_id=${subcategory.id}`}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add Sub-subcategory
          </Link>
        </div>

        {subSubcategories.length === 0 ? (
          <div className="text-center text-gray-600 py-8">No sub-subcategories found</div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sub-subcategory Name
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
                {subSubcategories.map((subSubcategory) => (
                  <tr key={subSubcategory.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {subSubcategory.sub_sub_category_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {subSubcategory.created_at
                          ? new Date(subSubcategory.created_at).toLocaleDateString()
                          : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Link
                        href={`/admin/sub-subcategories/${subSubcategory.id}/view`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/sub-subcategories/${subSubcategory.id}/edit`}
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

export default ViewSubcategoryClient; 