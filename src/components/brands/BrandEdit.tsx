'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import brandService from '@/services/brand.service';
import { Brand } from '@/services/brand.service';

interface Props {
  id: string;
}

export default function BrandEdit({ id }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState({
    brand_name: '',
    status: 1,
    image: null as File | null,
    currentImage: ''
  });

  useEffect(() => {
    fetchBrand();
  }, []);

  const fetchBrand = async () => {
    try {
      const response = await brandService.getBrandById(id);
      console.log('Brand Response:', response);
      
      if (response && response.data) {
        const brandData = Array.isArray(response.data) ? response.data[0] : response.data;
        setBrand(brandData);
        setFormData({
          brand_name: brandData.brand_name,
          status: brandData.status,
          image: null,
          currentImage: brandData.brand_image
        });
        setImagePreview(brandData.brand_image);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching brand:', error);
      toast.error('Failed to fetch brand details');
      router.push('/admin/brands');
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

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

    setFormData(prev => ({ ...prev, image: file }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('brand_name', formData.brand_name);
      formDataToSend.append('status', formData.status.toString());
      formDataToSend.append('_method', 'PUT');
      
      // If a new image is selected, append it
      if (formData.image) {
        formDataToSend.append('brand_image', formData.image);
      }
      // Don't send the current image URL if no new image is selected
      // The backend will keep the existing image

      // Update the brand with the new data
      await brandService.updateBrand(Number(id), formDataToSend);

      toast.success('Brand updated successfully');
      router.push('/admin/brands');
    } catch (error) {
      console.error('Error updating brand:', error);
      toast.error('Failed to update brand');
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

  if (!brand) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Brand not found</h2>
          <p className="mt-2 text-gray-600">The brand you're looking for doesn't exist.</p>
          <Link
            href="/admin/brands"
            className="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Back to Brands
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Brand</h1>
        <Link
          href="/admin/brands"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back to List
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Brand Information</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-xs text-gray-500">ID</dt>
                <dd className="text-sm text-gray-900">#{brand.id}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Created At</dt>
                <dd className="text-sm text-gray-900">{new Date(brand.created_at).toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Last Updated</dt>
                <dd className="text-sm text-gray-900">{new Date(brand.created_at).toLocaleString()}</dd>
              </div>
              {brand.products_count !== undefined && (
                <div>
                  <dt className="text-xs text-gray-500">Products Count</dt>
                  <dd className="text-sm text-gray-900">{brand.products_count}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Image
            </label>
            <div 
              className="relative w-48 h-48 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors bg-gray-50"
              onClick={handleImageClick}
            >
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Brand preview"
                  fill
                  className="rounded-lg object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="text-center">
                  <div className="text-gray-500">Click to upload</div>
                  <div className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</div>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.currentImage && (
              <p className="mt-2 text-xs text-gray-500 break-all">
                Current image: {formData.currentImage}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="brand_name" className="block text-sm font-medium text-gray-700 mb-2">
              Brand Name
            </label>
            <input
              type="text"
              id="brand_name"
              value={formData.brand_name}
              onChange={(e) => setFormData(prev => ({ ...prev, brand_name: e.target.value }))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: Number(e.target.value) }))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
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
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 