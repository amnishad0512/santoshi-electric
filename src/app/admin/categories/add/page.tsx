'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import categoryService from '@/services/category.service';

const AddCategoryPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category_name: '',
    category_icon: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await categoryService.createCategory(formData);
      toast.success('Category created successfully');
      router.push('/admin/categories');
    } catch (error) {
      toast.error('Failed to create category');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Category</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="category_name" className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            id="category_name"
            name="category_name"
            value={formData.category_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="category_icon" className="block text-sm font-medium text-gray-700">
            Category Icon URL
          </label>
          <input
            type="url"
            id="category_icon"
            name="category_icon"
            value={formData.category_icon}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {loading ? 'Creating...' : 'Create Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryPage; 