'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import subSubCategoryService from '@/services/sub-subcategory.service';
import categoryService from '@/services/category.service';
import subcategoryService from '@/services/subcategory.service';

interface Category {
  id: string;
  category_name: string;
}

interface Subcategory {
  id: string;
  subcategory_name: string;
  category_id: string;
}

export default function AddSubSubCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [formData, setFormData] = useState({
    sub_sub_category_name: '',
    category_id: '',
    sub_category_id: '',
    status: 1
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (formData.category_id) {
      fetchSubcategories(formData.category_id);
    } else {
      setSubcategories([]);
      setFormData(prev => ({ ...prev, sub_category_id: '' }));
    }
  }, [formData.category_id]);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      console.log('Categories response:', response);
      
      let categoriesData: Category[] = [];
      if (response?.data?.categories) {
        categoriesData = response.data.categories;
      } else if (Array.isArray(response?.data)) {
        categoriesData = response.data;
      } else if (response?.data) {
        categoriesData = [response.data];
      }
      
      console.log('Processed categories:', categoriesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    } finally {
      setLoadingInitial(false);
    }
  };

  const fetchSubcategories = async (categoryId: string) => {
    setLoadingSubcategories(true);
    setSubcategories([]); // Clear existing subcategories while loading
    
    try {
      const response = await subcategoryService.getSubCategoryById(categoryId);
      console.log('Subcategories response:', response);
      
      let subcategoriesData: Subcategory[] = [];
      if (response?.data?.subcategories) {
        subcategoriesData = response.data.subcategories;
      } else if (Array.isArray(response?.data)) {
        subcategoriesData = response.data;
      } else if (response?.data) {
        subcategoriesData = [response.data];
      }
      
      if (subcategoriesData.length === 0) {
        toast.error('No subcategories found for this category');
      } else {
        console.log('Processed subcategories:', subcategoriesData);
        setSubcategories(subcategoriesData);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      toast.error('Failed to fetch subcategories');
      setFormData(prev => ({ ...prev, sub_category_id: '' }));
    } finally {
      setLoadingSubcategories(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sub_sub_category_name || !formData.category_id || !formData.sub_category_id) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await subSubCategoryService.createSubSubCategory({
        name: formData.sub_sub_category_name,
        category_id: formData.category_id,
        subcategory_id: formData.sub_category_id,
      });
      toast.success('Sub-subcategory created successfully');
      router.push('/admin/sub-subcategories');
    } catch (error) {
      console.error('Error creating sub-subcategory:', error);
      toast.error('Failed to create sub-subcategory');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loadingInitial) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/sub-subcategories"
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Sub-subcategory</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">Select a category</option>
              {Array.isArray(categories) && categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sub_category_id" className="block text-sm font-medium text-gray-700">
              Subcategory
            </label>
            <select
              id="sub_category_id"
              name="sub_category_id"
              value={formData.sub_category_id}
              onChange={handleChange}
              required
              disabled={!formData.category_id || loadingSubcategories}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md disabled:bg-gray-100"
            >
              <option value="">
                {loadingSubcategories 
                  ? 'Loading subcategories...' 
                  : formData.category_id 
                    ? 'Select a subcategory'
                    : 'First select a category'
                }
              </option>
              {Array.isArray(subcategories) && subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.subcategory_name}
                </option>
              ))}
            </select>
            {loadingSubcategories && (
              <div className="mt-2 text-sm text-gray-500">
                Loading subcategories...
              </div>
            )}
          </div>

          <div>
            <label htmlFor="sub_sub_category_name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="sub_sub_category_name"
              name="sub_sub_category_name"
              value={formData.sub_sub_category_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter sub-subcategory name"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              href="/admin/sub-subcategories"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 