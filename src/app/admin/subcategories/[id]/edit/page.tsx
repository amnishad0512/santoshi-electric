'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import categoryService, { Category } from '@/services/category.service';
import subcategoryService, { Subcategory } from '@/services/subcategory.service';

interface Props {
  params: {
    id: string;
  };
}

const EditSubcategoryPage = ({ params }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<Subcategory>({
    id: '',
    category_id: '',
    subcategory_name: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesData, subcategoryData] = await Promise.all([
        categoryService.getAllCategories(),
        subcategoryService.getSubcategoryById(params.id),
      ]);
      setCategories(categoriesData);
      setFormData(subcategoryData);
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      await subcategoryService.updateSubcategory(params.id, {
        category_id: formData.category_id,
        subcategory_name: formData.subcategory_name,
      });
      toast.success('Subcategory updated successfully');
      router.push('/admin/categories/' + formData.category_id + '/view');
    } catch (error) {
      toast.error('Failed to update subcategory');
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Subcategory</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subcategory_name" className="block text-sm font-medium text-gray-700">
            Subcategory Name
          </label>
          <input
            type="text"
            id="subcategory_name"
            name="subcategory_name"
            value={formData.subcategory_name}
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

export default EditSubcategoryPage; 