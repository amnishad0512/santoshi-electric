'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import categoryService, { Category } from '@/services/category.service';
import { formatDate } from '@/lib/utils/date';
import { useStatus } from '@/contexts/StatusContext';
export default function CategoryPageClient({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { categoryStatus } = useStatus()
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    category_name: '',
    status: '1',
    category_icon: '',
  });

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const { data } = await categoryService.getCategoryById(id);
      console.log(data);
      setCategory(data);
      setFormData({
        category_name: data.category_name,
        status: data.status.toString(),
        category_icon: data.category_icon || '',
      });
      if (data.category_icon) {
        setImagePreview(data.category_icon);
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      toast.error('Failed to fetch category details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await categoryService.updateCategory(id, {
        ...formData,
        status: parseInt(formData.status),
        category_icon: imageFile || formData.category_icon,
      });
      toast.success('Category updated successfully');
      router.push('/admin/categories');
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
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

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Category not found</h2>
          <p className="mt-2 text-gray-600">The category you're looking for doesn't exist.</p>
          <Link
            href="/admin/categories"
            className="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === 'edit' ? 'Edit Category' : 'Category Details'}
        </h1>
        <div className="space-x-3">
          {mode === 'edit' ? (
            <Link
              href={`/admin/categories/${id}`}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              View Details
            </Link>
          ) : (
            <Link
              href={`/admin/categories/${id}?mode=edit`}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Edit Category
            </Link>
          )}
          <Link
            href="/admin/categories"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to List
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Image
                  src={imagePreview || category.category_icon || '/images/dummy.jpg'}
                  alt={formData.category_name}
                  width={96}
                  height={96}
                  className="rounded-lg object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/images/dummy.jpg';
                  }}
                />
                {mode === 'edit' && (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={triggerImageUpload}
                      className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50"
                    >
                      <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>

            <form onSubmit={mode === 'edit' ? handleSubmit : (e) => e.preventDefault()}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="category_name" className="block text-sm font-medium text-gray-700">
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="category_name"
                    name="category_name"
                    value={mode === 'edit' ? formData.category_name : category.category_name}
                    onChange={handleInputChange}
                    readOnly={mode !== 'edit'}
                    required
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${mode !== 'edit' ? 'bg-gray-50' : ''
                      }`}
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={mode === 'edit' ? formData.status : category.status.toString()}
                    onChange={handleInputChange}
                    disabled={mode !== 'edit'}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${mode !== 'edit' ? 'bg-gray-50' : ''
                      }`}
                  >
                    {categoryStatus.map((status) => (
                      <option key={status.label} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700">Products Count</label>
                  <input
                    type="text"
                    value={category.products_count || 0}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Created At</label>
                  <input
                    type="text"
                    value={category.created_at ? formatDate(category.created_at) : '-'}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Updated At</label>
                  <input
                    type="text"
                    value={category.updated_at ? formatDate(category.updated_at) : '-'}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 sm:text-sm"
                  />
                </div>

                {mode === 'edit' && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={saving}
                      className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${saving ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 