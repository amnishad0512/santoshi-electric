'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import subSubCategoryService from '@/services/sub-subcategory.service';
import categoryService, { Category } from '@/services/category.service';
import subcategoryService from '@/services/subcategory.service';
import { formatDate } from '@/lib/utils/date';
import { useStatus } from '@/contexts/StatusContext';

interface DropdownOption {
  value: number;
  label: string;
}

interface Subcategory {
  id: string;
  subcategory_name: string;
  category_id: string;
}

interface SubSubCategory {
  id: string;
  sub_sub_category_name: string;
  category_id: string;
  sub_category_id: string;
  status: number;
  created_at: string;
  updated_at: string;
  category: Category;
  subcategory: Subcategory;
}

export default function SubSubCategoriesPageClient({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const [loading, setLoading] = useState(true);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [subSubCategory, setSubSubCategory] = useState<SubSubCategory[]>([]);
  const [ categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [ subCategoryOptions, setSubCategoryOptions] = useState<Subcategory[]>([]);
  const [formData, setFormData] = useState({
    sub_sub_category_name: '',
    category_id: '',
    sub_category_id: '',
    status: 1
  });
  const { categoryStatus } = useStatus();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const subSubCategoryResponse = await subSubCategoryService.getSubSubCategoryById(id);
      console.log(1, subSubCategoryResponse)
      const subcategoriesResponse = await subcategoryService.getAllSubCategories();
      const { data: categories } = await categoryService.getAllCategories();
      const option = categories.map((category: any) => ({
        label: category.category_name,
        value: category.id
      }))
      const option2 = subcategoriesResponse.map((subcategory: any) => ({
        label: subcategory.subcategory_name,
        value: subcategory.id
      }))
      setCategoryOptions(option);
      setSubCategoryOptions(option2);

      setSubSubCategory(subSubCategoryResponse);

      setFormData({
        sub_sub_category_name: subSubCategoryResponse.sub_sub_category_name,
        category_id: subSubCategoryResponse.category.id,
        category: subSubCategoryResponse.category.category_name,
        sub_category_id: subSubCategoryResponse.sub_category.id,
        status: subSubCategoryResponse.status
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
      await subSubCategoryService.updateSubSubCategory(id, formData);
      toast.success('Sub-subcategory updated successfully');
      router.push(`/admin/sub-subcategories/${id}?mode=view`);
      fetchData();
    } catch (error) {
      console.error('Error updating sub-subcategory:', error);
      toast.error('Failed to update sub-subcategory');
    }
  };

  const handleEdit = () => {
    router.push(`/admin/sub-subcategories/${id}?mode=edit`);
  };

  const handleCancel = () => {
    router.push(`/admin/sub-subcategories/${id}?mode=view`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!subSubCategory) {
    return <div>Sub-subcategory not found</div>;
  }

  console.log(1, formData)
  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === 'edit' ? 'Edit Sub-subcategory' : 'Sub-subcategory Details'}
        </h1>
        <div className="flex space-x-4">
          <Link
            href="/admin/sub-subcategories"
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
            <label htmlFor="sub_sub_category_name" className="block text-sm font-medium text-gray-700">
              Sub-subcategory Name
            </label>
            <input
              type="text"
              name="sub_sub_category_name"
              id="sub_sub_category_name"
              value={formData.sub_sub_category_name}
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
              {categoryOptions.map((category) => (
                <option key={category.label} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sub_category_id" className="block text-sm font-medium text-gray-700">
              Subcategory
            </label>
            <select
              name="sub_category_id"
              id="sub_category_id"
              value={formData.sub_category_id}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              required
              disabled={!formData.category_id || loadingSubcategories}
            >
              <option value="">
                {loadingSubcategories
                  ? 'Loading subcategories...'
                  : formData.category_id
                    ? 'Select a subcategory'
                    : 'First select a category'
                }
              </option>
              {subCategoryOptions.map((subcategory) => (
                <option key={subcategory.label} value={subcategory.value}>
                  {subcategory.label}
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
              {categoryStatus.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
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
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Sub-subcategory Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{subSubCategory.sub_sub_category_name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Category</dt>
              <dd className="mt-1 text-sm text-gray-900">{subSubCategory.category?.category_name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Subcategory</dt>
              <dd className="mt-1 text-sm text-gray-900">{subSubCategory.sub_category?.subcategory_name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {subSubCategory.status === 0 ? 'Inctive' : subSubCategory.status === 1 ? 'Active' : 'Deleted'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Created At</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatDate(subSubCategory.created_at)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Updated At</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatDate(subSubCategory.updated_at)}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
} 