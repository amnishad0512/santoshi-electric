'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import categoryService from '@/services/category.service';
import brandService from '@/services/brand.service';
import type { Brand } from '@/services/brand.service';
import { useStatus } from '@/contexts/StatusContext';

// Add dynamic configuration
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

const AddCategoryPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const {categoryStatus} = useStatus()
  
  const [formData, setFormData] = useState({
    category_name: '',
    brand_id: '',
    status: 1,
  });
  
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await brandService.getAllBrands();
      setBrands(response.data);
    } catch (error) {
      toast.error('Failed to fetch brands');
      console.error(error);
    } finally {
      setLoadingBrands(false);
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
      setCategoryImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryImage) {
      toast.error('Please select a category image');
      return;
    }

    if (!formData.brand_id) {
      toast.error('Please select a brand');
      return;
    }
    
    setLoading(true);

    try {
      // Create FormData instance
      const formDataToSend = new FormData();
      formDataToSend.append('category_name', formData.category_name);
      formDataToSend.append('category_icon', categoryImage);
      formDataToSend.append('status', formData.status.toString());
      formDataToSend.append('brand_id', formData.brand_id);

      await categoryService.createCategory({
        category_name: formData.category_name,
        category_icon: categoryImage,
        status: formData.status,
        brand_id: parseInt(formData.brand_id),
      });
      
      toast.success('Category created successfully');
      router.push('/admin/categories');
      router.refresh();
    } catch (error) {
      toast.error('Failed to create category');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingBrands) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Category</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div className="space-y-4">
          <div>
            <label htmlFor="brand_id" className="block text-sm font-medium text-gray-700">Brand</label>
            <select
              id="brand_id"
              name="brand_id"
              value={formData.brand_id}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select a brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.brand_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="category_name" className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              id="category_name"
              name="category_name"
              value={formData.category_name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {imagePreview && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon Preview</label>
              <div className="mb-4">
                <Image
                  src={imagePreview}
                  alt="Category Icon Preview"
                  width={128}
                  height={128}
                  className="rounded-lg object-contain"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="category_icon" className="block text-sm font-medium text-gray-700">Category Icon</label>
            <input
              type="file"
              id="category_icon"
              name="category_icon"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Recommended: Square image (512x512px)
            </p>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {categoryStatus.map((status) => (
                <option key={status.label} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !categoryImage || !formData.brand_id}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryPage; 