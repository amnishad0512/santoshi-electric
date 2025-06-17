'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import subcategoryService from '@/services/subcategory.service';
import categoryService from '@/services/category.service';
import { formatDate } from '@/lib/utils/date';
import { useStatus } from '@/contexts/StatusContext';

interface Category {
  id: string;
  category_name: string;
}

interface SubCategory {
  id: string;
  subcategory_name: string;
  category_id: string;
  status: number;
  created_at: string;
  updated_at: string;
  category: Category;
}


export default function SubCategoriesPageClient({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const [loading, setLoading] = useState(true);
  const [subcategory, setSubcategory] = useState<SubCategory | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    subcategory_name: '',
    category_id: '',
    status: 1
  });
  const { categoryStatus } = useStatus();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [subcategoryResponse, categoriesResponse] = await Promise.all([
        subcategoryService.getSubCategoryById(id),
        categoryService.getAllCategories()
      ]);

      const subcategoryData = subcategoryResponse.data;
      const categoriesData = categoriesResponse.data;

      setSubcategory(subcategoryData);
      setCategories(categoriesData);
      setFormData({
        subcategory_name: subcategoryData.subcategory_name,
        category_id: subcategoryData.category_id,
        status: subcategoryData.status
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'status' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await subcategoryService.updateSubCategory(id, formData);
      toast.success('Subcategory updated successfully');
      router.push(`/admin/subcategories/${id}?mode=view`);
      fetchData();
    } catch (error) {
      console.error('Error updating subcategory:', error);
      toast.error('Failed to update subcategory');
    }
  };

  const handleEdit = () => {
    router.push(`/admin/subcategories/${id}?mode=edit`);
  };

  const handleCancel = () => {
    router.push(`/admin/subcategories/${id}?mode=view`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!subcategory) {
    return <div>Subcategory not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === 'edit' ? 'Edit Subcategory' : 'Subcategory Details'}
        </h1>
        <div className="flex space-x-4">
          <Link
            href="/admin/subcategories"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Back to List
          </Link>
          {mode !== 'edit' && (
            <button
              onClick={handleEdit}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {mode === 'edit' ? (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-sm rounded-lg p-6">
          <div>
            <label htmlFor="subcategory_name" className="block text-sm font-medium text-gray-700">
              Subcategory Name
            </label>
            <input
              type="text"
              name="subcategory_name"
              id="subcategory_name"
              value={formData.subcategory_name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category_id"
              id="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            >
            {
                categoryStatus.map((status) => (
                    <option key={status.value} value={status.value}>
                        {status.label}
                    </option>
                ))
            }
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Subcategory Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{subcategory.subcategory_name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Category</dt>
              <dd className="mt-1 text-sm text-gray-900">{subcategory.category?.category_name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    subcategory.status === 1
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {subcategory.status === 0 ? 'Inactive' : subcategory.status === 1 ? 'Active' : "Deleted"}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Created At</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {subcategory.created_at ? formatDate(subcategory.created_at) : '-'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Updated At</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {subcategory.updated_at ? formatDate(subcategory.updated_at) : '-'}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
} 