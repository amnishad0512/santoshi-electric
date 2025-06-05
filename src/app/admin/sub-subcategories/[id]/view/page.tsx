'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import subSubcategoryService, { SubSubcategory } from '@/services/subsubcategory.service';

interface Props {
  params: {
    id: string;
  };
}

const ViewSubSubcategoryPage = ({ params }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [subSubcategory, setSubSubcategory] = useState<SubSubcategory | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await subSubcategoryService.getSubSubcategoryById(params.id);
      setSubSubcategory(data);
    } catch (error) {
      toast.error('Failed to fetch sub-subcategory data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!subSubcategory) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center text-gray-600">Sub-subcategory not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sub-subcategory Details</h1>
        <div className="space-x-2">
          <Link
            href={`/admin/sub-subcategories/${params.id}/edit`}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit Sub-subcategory
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Category</h2>
              <p className="mt-1 text-sm text-gray-500">
                {subSubcategory.category?.category_name || '-'}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Subcategory</h2>
              <p className="mt-1 text-sm text-gray-500">
                {subSubcategory.subcategory?.subcategory_name || '-'}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Sub-subcategory Name</h2>
              <p className="mt-1 text-sm text-gray-500">{subSubcategory.sub_sub_categories_name}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Created At</h2>
              <p className="mt-1 text-sm text-gray-500">
                {subSubcategory.createdAt ? new Date(subSubcategory.createdAt).toLocaleDateString() : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <Link
          href={`/admin/subcategories/${subSubcategory.sub_category_id}/view`}
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          ← Back to Subcategory
        </Link>
      </div>
    </div>
  );
};

export default ViewSubSubcategoryPage; 