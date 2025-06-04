'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import ProtectedPage from '@/components/ProtectedPage';
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  isActive: boolean;
  createdAt: string;
}

const subcategorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  categoryId: z.string().min(1, 'Please select a category'),
  isActive: z.boolean(),
});

type SubcategoryFormData = z.infer<typeof subcategorySchema>;

export default function SubcategoriesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - replace with actual API calls
  const [categories] = useState<Category[]>([
    { id: '1', name: 'Electronics', slug: 'electronics', description: 'Electronic devices and accessories', isActive: true, createdAt: '2024-01-01' },
    { id: '2', name: 'Clothing', slug: 'clothing', description: 'Fashion and apparel', isActive: true, createdAt: '2024-01-02' },
  ]);

  const [subcategories, setSubcategories] = useState<Subcategory[]>([
    {
      id: '1',
      name: 'Smartphones',
      slug: 'smartphones',
      description: 'Mobile phones and accessories',
      categoryId: '1',
      isActive: true,
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'Laptops',
      slug: 'laptops',
      description: 'Portable computers and accessories',
      categoryId: '1',
      isActive: true,
      createdAt: '2024-01-02',
    },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<SubcategoryFormData>({
    resolver: zodResolver(subcategorySchema),
    defaultValues: {
      isActive: true,
    },
  });

  const onSubmit = async (data: SubcategoryFormData) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      if (editingSubcategory) {
        // Update existing subcategory
        setSubcategories(subcategories.map(sub => 
          sub.id === editingSubcategory.id 
            ? { ...sub, ...data, slug: data.name.toLowerCase().replace(/\s+/g, '-') }
            : sub
        ));
        toast.success('Subcategory updated successfully');
      } else {
        // Create new subcategory
        const newSubcategory: Subcategory = {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          slug: data.name.toLowerCase().replace(/\s+/g, '-'),
          createdAt: new Date().toISOString(),
        };
        setSubcategories([...subcategories, newSubcategory]);
        toast.success('Subcategory created successfully');
      }

      setIsModalOpen(false);
      reset();
      setEditingSubcategory(null);
    } catch (error) {
      toast.error(editingSubcategory ? 'Failed to update subcategory' : 'Failed to create subcategory');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (subcategory: Subcategory) => {
    setEditingSubcategory(subcategory);
    reset(subcategory);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subcategory?')) return;

    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSubcategories(subcategories.filter(sub => sub.id !== id));
      toast.success('Subcategory deleted successfully');
    } catch (error) {
      toast.error('Failed to delete subcategory');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSubcategories(subcategories.map(sub => 
        sub.id === id ? { ...sub, isActive: !currentStatus } : sub
      ));
      
      toast.success(`Subcategory ${currentStatus ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      toast.error('Failed to update subcategory status');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Unknown Category';
  };

  const filteredSubcategories = subcategories.filter(sub => 
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProtectedPage allowedRoles={['admin']}>
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Subcategories Management</h1>
        <div className="mt-4 sm:mt-0 flex gap-4">
          <input
            type="text"
            placeholder="Search subcategories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full sm:w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              setEditingSubcategory(null);
              reset();
              setIsModalOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Subcategory
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
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
              {filteredSubcategories.map((subcategory) => (
                <tr key={subcategory.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{subcategory.name}</div>
                    <div className="text-sm text-gray-500">{subcategory.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getCategoryName(subcategory.categoryId)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {subcategory.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(subcategory.id, subcategory.isActive)}
                      disabled={isLoading}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        subcategory.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {subcategory.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(subcategory)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(subcategory.id)}
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

      {filteredSubcategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No subcategories found</p>
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                {editingSubcategory ? 'Edit Subcategory' : 'Create New Subcategory'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  reset();
                  setEditingSubcategory(null);
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
                    Name
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
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <div className="mt-1">
                    <select
                      id="categoryId"
                      {...register('categoryId')}
                      className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                        errors.categoryId ? 'border-red-500' : dirtyFields.categoryId && !errors.categoryId ? 'border-green-500' : 'border-gray-300'
                      } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                        errors.categoryId ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                      } focus:border-blue-500 sm:text-sm`}
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.categoryId && (
                    <p className="mt-1 text-sm text-red-500">{errors.categoryId.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
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
                    />
                  </div>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
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
                    setEditingSubcategory(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Saving...' : editingSubcategory ? 'Update' : 'Create'}
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