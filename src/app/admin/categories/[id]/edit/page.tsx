'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import categoryService, { Category } from '@/services/category.service';

interface Props {
  params: {
    id: string;
  };
}

const EditCategoryPage = ({ params }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Category>({
    id: '',
    category_name: '',
    category_icon: '',
  });

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const data = await categoryService.getCategoryById(params.id);
      setFormData(data);
    } catch (error) {
      toast.error('Failed to fetch category');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await categoryService.updateCategory(params.id, {
        category_name: formData.category_name,
        category_icon: formData.category_icon,
      });
      toast.success('Category updated successfully');
      router.push('/admin/categories');
    } catch (error) {
      toast.error('Failed to update category');
      console.error(error);
    } finally {
      setSaving(false);
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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Category</h1>

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
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategoryPage; 