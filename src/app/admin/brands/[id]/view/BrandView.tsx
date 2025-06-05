'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import brandService, { Brand } from '@/services/brand.service';
import api from '@/lib/axios';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  status: number;
  created_at: string;
  stock: number;
  category: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
}

const BrandView = ({ id }: { id: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 10; // Items per page

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const {data} = await brandService.getBrandById(id);
        setBrand(data);
      } catch (error) {
        toast.error('Failed to fetch brand');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
  }, [id]);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const skip = (page - 1) * limit;
      const {data} = await api.get<ProductsResponse>(`/brands/${id}/products?skip=${skip}&limit=${limit}`);
      setProducts(data.products || []);
      setTotalProducts(data.total || 0);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (!loading && brand) {
      fetchProducts();
    }
  }, [page, id, loading, brand]);

  const totalPages = Math.ceil(totalProducts / limit);

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await api.delete(`/products/${productId}`);
      toast.success('Product deleted successfully');
      // Refresh the products list
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
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
          <p className="mt-2 text-gray-600">The brand you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/admin/brands"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Brands
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Brand Details</h1>
        <div className="space-x-4">
          <Link
            href={`/admin/brands/${brand.id}/edit`}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit Brand
          </Link>
          <Link
            href="/admin/brands"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to List
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {brand.brand_image ? (
                <div className="h-48 w-48 relative flex items-center justify-center bg-gray-100 rounded-lg">
                  <Image
                    src={brand.brand_image}
                    alt={brand.brand_name}
                    fill
                    className="rounded-lg object-contain p-1"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="h-48 w-48 flex items-center justify-center bg-gray-100 rounded-lg">
                  <span className="text-4xl text-gray-400">
                    {brand.brand_name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="ml-6 flex-grow">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Brand Name</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">{brand.brand_name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {brand.created_at ? new Date(brand.created_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }) : '-'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Updated At</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {brand.updated_at ? new Date(brand.updated_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }) : '-'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className="mt-1">
                    <span className={`px-2 py-1 text-sm font-medium rounded-full ${
                      brand.status === 1 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {brand.status === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                </div>
                {brand.products_count !== undefined && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Products Count</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">{brand.products_count}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Products</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {loadingProducts ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading products...</p>
            </div>
          ) : !Array.isArray(products) || products.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">No products found for this brand</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="h-12 w-12 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.description.substring(0, 50)}...</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">₹{product.price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.stock}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.status === 1 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.status === 1 ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <Link
                              href={`/admin/products/${product.id}/view`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </Link>
                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={page === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{((page - 1) * limit) + 1}</span> to{' '}
                        <span className="font-medium">{Math.min(page * limit, totalProducts)}</span> of{' '}
                        <span className="font-medium">{totalProducts}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                          disabled={page === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">Previous</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        {/* Page numbers */}
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              page === i + 1
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={page === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">Next</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandView; 