'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import ProtectedPage from '@/components/ProtectedPage';

interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  website: string;
  isActive: boolean;
  createdAt: string;
}

const brandSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .regex(/^[a-zA-Z0-9\s-]+$/, 'Name can only contain letters, numbers, spaces, and hyphens'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),
  logo: z
    .string()
    .url('Must be a valid URL')
    .refine((url) => {
      if (!url) return true;
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
    }, 'Logo must be a valid image URL (jpg, jpeg, png, gif, or webp)')
    .optional()
    .or(z.literal('')),
  website: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  isActive: z.boolean(),
});

type BrandFormData = z.infer<typeof brandSchema>;

export default function BrandsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [brands, setBrands] = useState<Brand[]>([
    {
      id: '1',
      name: 'Apple',
      slug: 'apple',
      description: 'Think Different',
      logo: 'https://example.com/apple-logo.png',
      website: 'https://apple.com',
      isActive: true,
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'Samsung',
      slug: 'samsung',
      description: 'Do What You Can\'t',
      logo: 'https://example.com/samsung-logo.png',
      website: 'https://samsung.com',
      isActive: true,
      createdAt: '2024-01-02',
    },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, dirtyFields, isValid },
  } = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    mode: 'onChange',
    defaultValues: {
      isActive: true,
      logo: '',
      website: '',
    },
  });

  // Check if all required fields have been touched and are valid
  const isFormValid = isValid && 
    dirtyFields.name && 
    dirtyFields.description;

  const onSubmit = async (data: BrandFormData) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      if (editingBrand) {
        // Update existing brand
        setBrands(brands.map(brand => 
          brand.id === editingBrand.id 
            ? { ...brand, ...data, slug: data.name.toLowerCase().replace(/\s+/g, '-') }
            : brand
        ));
        toast.success('Brand updated successfully');
      } else {
        // Create new brand
        const newBrand: Brand = {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          slug: data.name.toLowerCase().replace(/\s+/g, '-'),
          createdAt: new Date().toISOString(),
        };
        setBrands([...brands, newBrand]);
        toast.success('Brand created successfully');
      }

      setIsModalOpen(false);
      reset();
      setEditingBrand(null);
    } catch (error) {
      toast.error(editingBrand ? 'Failed to update brand' : 'Failed to create brand');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    reset(brand);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brand?')) return;

    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setBrands(brands.filter(brand => brand.id !== id));
      toast.success('Brand deleted successfully');
    } catch (error) {
      toast.error('Failed to delete brand');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setBrands(brands.map(brand => 
        brand.id === id ? { ...brand, isActive: !currentStatus } : brand
      ));
      
      toast.success(`Brand ${currentStatus ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      toast.error('Failed to update brand status');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProtectedPage allowedRoles={['admin']}>
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Brands Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your store brands, their details, and status
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full sm:w-64 rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingBrand(null);
              reset();
              setIsModalOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Brand
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Website
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBrands.map((brand) => (
                <tr key={brand.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {brand.logo && (
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="h-10 w-10 rounded-full object-cover mr-3 border border-gray-200"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                        <div className="text-sm text-gray-500">{brand.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {brand.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {brand.website}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(brand.id, brand.isActive)}
                      disabled={isLoading}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        brand.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {brand.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(brand)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(brand.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBrands.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No brands found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new brand.</p>
          <div className="mt-6">
            <button
              onClick={() => {
                setEditingBrand(null);
                reset();
                setIsModalOpen(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Brand
            </button>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                {editingBrand ? 'Edit Brand' : 'Create New Brand'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  reset();
                  setEditingBrand(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                        errors.name ? 'border-red-500' : dirtyFields.name && !errors.name ? 'border-green-500' : 'border-gray-300'
                      } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                        errors.name ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                      } focus:border-blue-500 sm:text-sm`}
                      placeholder="Enter brand name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      rows={3}
                      {...register('description')}
                      className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                        errors.description ? 'border-red-500' : dirtyFields.description && !errors.description ? 'border-green-500' : 'border-gray-300'
                      } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                        errors.description ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                      } focus:border-blue-500 sm:text-sm`}
                      placeholder="Enter brand description"
                    />
                  </div>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                    Logo URL
                  </label>
                  <div className="mt-1">
                    <input
                      type="url"
                      id="logo"
                      {...register('logo')}
                      className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                        errors.logo ? 'border-red-500' : dirtyFields.logo && !errors.logo ? 'border-green-500' : 'border-gray-300'
                      } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                        errors.logo ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                      } focus:border-blue-500 sm:text-sm`}
                      placeholder="Enter logo URL"
                    />
                  </div>
                  {errors.logo && (
                    <p className="mt-1 text-sm text-red-500">{errors.logo.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                    Website URL
                  </label>
                  <div className="mt-1">
                    <input
                      type="url"
                      id="website"
                      {...register('website')}
                      className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                        errors.website ? 'border-red-500' : dirtyFields.website && !errors.website ? 'border-green-500' : 'border-gray-300'
                      } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                        errors.website ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                      } focus:border-blue-500 sm:text-sm`}
                      placeholder="Enter website URL"
                    />
                  </div>
                  {errors.website && (
                    <p className="mt-1 text-sm text-red-500">{errors.website.message}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    {...register('isActive')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                    Active
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    reset();
                    setEditingBrand(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Saving...' : editingBrand ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </ProtectedPage>
  );
} 