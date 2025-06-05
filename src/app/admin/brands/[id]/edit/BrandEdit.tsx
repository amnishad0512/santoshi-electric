'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import brandService, { Brand } from '@/services/brand.service';
import { useCommonData } from '@/contexts/CommonDataContext';
import api from '@/lib/axios';

const BrandEdit = ({ id }: { id: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingBrand, setLoadingBrand] = useState(true);
  const { statuses = [], isLoading: isLoadingStatuses } = useCommonData();
  
  const [formData, setFormData] = useState<Brand>({
    id: '',
    brand_name: '',
    brand_image: '',
    status: 1,
    products_count: 0,
    created_at: '',
  });

  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await brandService.getBrandById(id);
        setFormData(response.data);
        setImagePreview(response.data.brand_image);
      } catch (error) {
        toast.error('Failed to fetch brand');
        console.error(error);
      } finally {
        setLoadingBrand(false);
      }
    };

    fetchBrand();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
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
    setLoading(true);

    try {
      // Create FormData instance
      const formDataToSend = new FormData();
      formDataToSend.append('brand_name', formData.brand_name);
      formDataToSend.append('status', formData.status.toString());
      formDataToSend.append('_method', 'PUT');
      
      // Only append image if a new one was selected
      if (newImage) {
        formDataToSend.append('brand_image', newImage);
      }

      // Send the request directly using axios
      await api.post(`/brands/${id}`, formDataToSend);

      toast.success('Brand updated successfully');
      router.push('/admin/brands');
      router.refresh();
    } catch (error) {
      toast.error('Failed to update brand');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingBrand || isLoadingStatuses) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Brand</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div className="space-y-4">
          <div>
            <label htmlFor="brand_name" className="block text-sm font-medium text-gray-700">Brand Name</label>
            <input
              type="text"
              id="brand_name"
              name="brand_name"
              value={formData.brand_name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {imagePreview && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Logo</label>
              <div className="mb-4">
                <div className="h-32 w-32 relative flex items-center justify-center bg-gray-100 rounded-lg">
                  <Image
                    src={imagePreview}
                    alt={formData.brand_name}
                    fill
                    className="rounded-lg object-contain p-1"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="brand_image" className="block text-sm font-medium text-gray-700">Update Logo</label>
            <input
              type="file"
              id="brand_image"
              name="brand_image"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: parseInt(e.target.value) }))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {statuses.length > 0 ? (
                statuses.map((status) => (
                  <option key={status.id} value={status.value}>
                    {status.name}
                  </option>
                ))
              ) : (
                <>
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </>
              )}
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
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Brand'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandEdit; 