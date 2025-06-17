'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import subSubCategoryService, { SubSubCategory } from '@/services/sub-subcategory.service';
import { formatDate } from '@/lib/utils/date';

export default function SubSubCategoriesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [subSubCategories, setSubSubCategories] = useState<SubSubCategory[]>([]);

  useEffect(() => {
    fetchSubSubCategories();
  }, []);

  const fetchSubSubCategories = async () => {
    try {
      const data = await subSubCategoryService.getAllSubSubCategories();
      console.log(9,data);
      setSubSubCategories(data);
    } catch (error) {
      toast.error('Failed to fetch sub-subcategories');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {

    try {
      await subSubCategoryService.deleteSubSubCategory(id);
      toast.success('Sub-subcategory deleted successfully');
      fetchSubSubCategories();
    } catch (error) {
      toast.error('Failed to delete sub-subcategory');
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sub Sub Categories</h1>
        <Link
          href="/admin/sub-subcategories/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add New Sub Sub Category
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subcategory
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
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
            {subSubCategories.map((subSubCategory) => (
              <tr key={subSubCategory.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{subSubCategory.sub_sub_category_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {subSubCategory.category?.category_name }
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {subSubCategory.sub_category.subcategory_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subSubCategory.status === 0 ? 'Inactive' : subSubCategory.status === 1 ? 'Active' : "Deleted"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subSubCategory.created_at ? formatDate(subSubCategory.created_at) : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <Link
                    href={`/admin/sub-subcategories/${subSubCategory.id}`}
                    className="text-blue-600 hover:text-blue-900 inline-block"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/sub-subcategories/${subSubCategory.id}`}
                    className="text-blue-600 hover:text-blue-900 inline-block"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(subSubCategory.id)}
                    className="text-red-600 hover:text-red-900 inline-block"
                  >
                    Delete
                  </button>
                </td>
              </tr> 
            ))}
            {subSubCategories.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No sub-subcategories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 