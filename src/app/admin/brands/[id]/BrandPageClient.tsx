'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import brandService, { Brand } from '@/services/brand.service';
import { formatDate } from '@/lib/utils/date';
import { useStatus } from '@/contexts/StatusContext';

export default function BrandPageClient({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(true);
  const {brandStatus} = useStatus();
  const [saving, setSaving] = useState(false);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    brand_name: '',
    status: 1,
    brand_image: '',
    product_count: ''
  });

  useEffect(() => {
    fetchBrand();
  }, []);

  const fetchBrand = async () => {
    try {
      const response = await brandService.getBrandById(id);
      if (response) {
        const brandData = response;
        console.log(brandData)
        setBrand(brandData);
        setFormData({
          id: brandData.id.toString(),
          brand_name: brandData.brand_name || '',
          status: brandData.status,
          brand_image: brandData.brand_image || '',
          product_count: brandData.products_count.toString()
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching brand:', error);
      toast.error('Failed to fetch brand details');
    } finally {
      setLoading(false);
    }
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

      // Store the actual file for form submission
      setImageFile(file);
      
      // Create a preview URL for immediate display
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
      const userData = new FormData();
      
      userData.append('brand_name', formData.brand_name);
      userData.append('status', formData.status.toString());
      userData.append('_method', 'PUT');
      
      if (imageFile) {
        userData.append('brand_image', imageFile);
      } else {
        userData.append('brand_image', formData.brand_image);
      }
      
      await brandService.updateBrand(id, userData);
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

  const renderForm = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{mode === 'edit' ? 'Edit Brand' : 'Brand Details'}</h1>
        <div className="space-x-3">
          {mode === 'edit' ? (
            <Link
              href={`/admin/brands/${id}`}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              View Details
            </Link>
          ) : (
            <Link
              href={`/admin/brands/${brand.id}?mode=edit`}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Edit Brand
            </Link>
          )}
          <Link
            href="/admin/brands"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to List
          </Link>
        </div>
      </div>

      <form onSubmit={mode === 'edit' ? handleSubmit : (e) => e.preventDefault()}>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Image
                  src={(imagePreview || (mode === 'edit' ? formData.brand_image : brand.brand_image)) || '/images/placeholder.jpg'}
                  alt={mode === 'edit' ? formData.brand_name : brand.name}
                  width={150}
                  height={150}
                  className="rounded-lg shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/placeholder.jpg';
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Brand Name</label>
                <input
                  type="text"
                  value={mode === 'edit' ? formData.brand_name : brand.brand_name}
                  onChange={mode === 'edit' ? (e) => setFormData(prev => ({ ...prev, brand_name: e.target.value })) : undefined}
                  readOnly={mode !== 'edit'}
                  className={`w-full px-4 py-2 ${mode === 'edit' ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'} text-gray-700 border rounded-lg focus:outline-none ${mode === 'edit' ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent' : ''}`}
                  required={mode === 'edit'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                <select
                  value={mode === 'edit' ? formData.status : brand.status}
                  onChange={mode === 'edit' ? (e) => setFormData(prev => ({ ...prev, status: Number(e.target.value) })) : undefined}
                  disabled={mode !== 'edit'}
                  className={`w-full px-4 py-2 ${mode === 'edit' ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'} text-gray-700 border rounded-lg focus:outline-none ${mode === 'edit' ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent' : ''}`}
                  required={mode === 'edit'}
                >
                  {brandStatus.map((status) => (
                    <option key={status.label} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Created At</label>
                <input
                  type="text"
                  value={brand.created_at ? formatDate(brand.created_at) : '-'}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Updated At</label>
                <input
                  type="text"
                  value={brand.updated_at ? formatDate(brand.updated_at) : '-'}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg focus:outline-none"
                />
              </div>
            </div>

            {mode === 'edit' && (
              <div className="mt-6 flex justify-end space-x-3">
                <Link
                  href="/admin/brands"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );

  return renderForm();
} 