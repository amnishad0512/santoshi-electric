'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import categoryService, { Category } from '@/services/category.service';
import subcategoryService, { Subcategory } from '@/services/subcategory.service';
import subSubcategoryService, { SubSubcategory } from '@/services/subsubcategory.service';

interface Props {
  params: {
    id: string;
  };
}

const EditSubSubcategoryPage = ({ params }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [formData, setFormData] = useState<SubSubcategory>({
    id: '',
    category_id: '',
    sub_category_id: '',
    sub_sub_categories_name: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (formData.category_id) {
      fetchSubcategories(formData.category_id);
    } else {
      setSubcategories([]);
    }
  }, [formData.category_id]);

  const fetchData = async () => {
    try {
      const [categoriesData, subSubcategoryData] = await Promise.all([
        categoryService.getAllCategories(),
        subSubcategoryService.getSubSubcategoryById(params.id),
      ]);
      setCategories(categoriesData);
      setFormData(subSubcategoryData);
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategories = async (categoryId: string) => {
    try {
      const data = await subcategoryService.getSubcategoriesByCategory(categoryId);
      setSubcategories(data);
    } catch (error) {
      toast.error('Failed to fetch subcategories');
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'category_id' ? { sub_category_id: '' } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await subSubcategoryService.updateSubSubcategory(params.id, {
        category_id: formData.category_id,
        sub_category_id: formData.sub_category_id,
        sub_sub_categories_name: formData.sub_sub_categories_name,
      });
      toast.success('Sub-subcategory updated successfully');
      router.push('/admin/subcategories/' + formData.sub_category_id + '/view');
    } catch (error) {
      toast.error('Failed to update sub-subcategory');
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Sub-subcategory</h1>

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
          <label htmlFor="sub_category_id" className="block text-sm font-medium text-gray-700">
            Subcategory
          </label>
          <select
            id="sub_category_id"
            name="sub_category_id"
            value={formData.sub_category_id}
            onChange={handleChange}
            required
            disabled={!formData.category_id}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-100"
          >
            <option value="">Select a subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.subcategory_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sub_sub_categories_name" className="block text-sm font-medium text-gray-700">
            Sub-subcategory Name
          </label>
          <input
            type="text"
            id="sub_sub_categories_name"
            name="sub_sub_categories_name"
            value={formData.sub_sub_categories_name}
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

export default EditSubSubcategoryPage; 