'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import productService from '@/services/product.service';
import brandService, { DropdownOption } from '@/services/brand.service';
import subSubcategoryService from '@/services/sub-subcategory.service';
import subcategoryService from '@/services/subcategory.service';
import categoryService from '@/services/category.service';
import { useStatus } from '@/contexts/StatusContext';

interface ProductFormData {
  brand_id: string;
  category_id: string;
  sub_category_id: string;
  sub_sub_category_id: string;
  product_name: string;
  product_code: string;
  product_quantity: string;
  product_tags: string;
  product_size: string;
  product_colour: string;
  product_selling_price: string;
  product_discount_price: string;
  product_short_desc: string;
  product_long_desc: string;
  product_thumbnail: File | null;
  hot_deal: '0' | '1';
  featured: '0' | '1';
  special_offer: '0' | '1';
  special_deals: '0' | '1';
  status: string;
}

const AddProduct = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    brand_id: '',
    category_id: '',
    sub_category_id: '',
    sub_sub_category_id: '',
    product_name: '',
    product_code: '',
    product_quantity: '',
    product_tags: '',
    product_size: '',
    product_colour: '',
    product_selling_price: '',
    product_discount_price: '',
    product_short_desc: '',
    product_long_desc: '',
    product_thumbnail: null,
    hot_deal: '0',
    featured: '0',
    special_offer: '0',
    special_deals: '0',
    status: 'active',
  });

  const [brandDropdown, setBrandDropdown] = useState<DropdownOption[]>([]);
  const [categoryDropdown, setCategoryDropdown] = useState<DropdownOption[]>([]);
  const [subCategoryDropdown, setSubCategoryDropdown] = useState<DropdownOption[]>([]);
  const [subSubCategoryDropdown, setSubSubCategoryDropdown] = useState<DropdownOption[]>([]);
  const { categoryStatus } = useStatus();

  const fetchBrandDropdown = async () => {
    try {
      const response = await brandService.getDropdown();
      if (Array.isArray(response)) {
        setBrandDropdown(response as DropdownOption[]);
      } else {
        console.error('Invalid brand dropdown response format');
        setBrandDropdown([]);
      }
    } catch (error) {
      console.error('Error fetching brand dropdown:', error);
      setBrandDropdown([]);
    }
  }

  const fetchCategoryDropdown = async (brand_id: string) => {
    try {
      const response = await categoryService.getDropdown(brand_id);
      if (Array.isArray(response)) {
        setCategoryDropdown(response as DropdownOption[]);
      } else {
        console.error('Invalid category dropdown response format');
        setCategoryDropdown([]);
      }
    } catch (error) {
      console.error('Error fetching category dropdown:', error);
      setCategoryDropdown([]);
    }
  }

  const fetchSubCategoryDropdown = async (category_id: string) => {
    try {
      const response = await subcategoryService.getDropdown(category_id);
      if (Array.isArray(response)) {
        setSubCategoryDropdown(response as DropdownOption[]);
      } else {
        console.error('Invalid subcategory dropdown response format');
        setSubCategoryDropdown([]);
      }
    } catch (error) {
      console.error('Error fetching subcategory dropdown:', error);
      setSubCategoryDropdown([]);
    }
  }

  const fetchSubSubCategoryDrodown = async (subcategory_id: string) => {
    try {
      const response = await subSubcategoryService.getDropdown(subcategory_id);
      if (Array.isArray(response)) {
        setSubSubCategoryDropdown(response as DropdownOption[]);
      } else {
        console.error('Invalid sub-subcategory dropdown response format');
        setSubSubCategoryDropdown([]);
      }
    } catch (error) {
      console.error('Error fetching sub-subcategory dropdown:', error);
      setSubSubCategoryDropdown([]);
    }
  }
  useEffect(() => {
    fetchBrandDropdown();
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? ((e.target as HTMLInputElement).checked ? '1' : '0') : value
    }));

    // Handle cascading dropdowns
    if (name === 'brand_id' && value) {
      fetchCategoryDropdown(value);
      // Reset dependent fields
      setFormData(prev => ({
        ...prev,
        category_id: '',
        sub_category_id: '',
        sub_sub_category_id: ''
      }));
      setCategoryDropdown([]);
      setSubCategoryDropdown([]);
      setSubSubCategoryDropdown([]);
    }
    else if (name === 'category_id' && value) {
      fetchSubCategoryDropdown(value);
      // Reset dependent fields
      setFormData(prev => ({
        ...prev,
        sub_category_id: '',
        sub_sub_category_id: ''
      }));
      setSubCategoryDropdown([]);
      setSubSubCategoryDropdown([]);
    }
    else if (name === 'sub_category_id' && value) {
      fetchSubSubCategoryDrodown(value);
      // Reset dependent fields
      setFormData(prev => ({
        ...prev,
        sub_sub_category_id: ''
      }));
      setSubSubCategoryDropdown([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        product_thumbnail: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          data.append(key, value.toString());
        }
      });

      const response = await productService.createProduct(data);

      toast.success('Product created successfully');
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      toast.error('Failed to create product');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="product_name" className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                id="product_name"
                name="product_name"
                value={formData.product_name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="product_code" className="block text-sm font-medium text-gray-700">Product Code</label>
              <input
                type="text"
                id="product_code"
                name="product_code"
                value={formData.product_code}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="brand_id" className="block text-sm font-medium text-gray-700">Brand</label>
              <select
                id="brand_id"
                name="brand_id"
                value={formData.brand_id}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              >
                <option value="">Select Brand</option>
                {brandDropdown.map((brand: any) => (
                  <option key={brand.label} value={brand.value}>{brand.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              >
                <option value="">Select Category</option>
                {categoryDropdown.map((category: any) => (
                  <option key={category.label} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="sub_category_id" className="block text-sm font-medium text-gray-700">Sub Category</label>
              <select
                id="sub_category_id"
                name="sub_category_id"
                value={formData.sub_category_id}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="">Select Sub Category</option>
                {subCategoryDropdown.map((subcategory: any) => (
                  <option key={subcategory.label} value={subcategory.value}>{subcategory.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sub_sub_category_id" className="block text-sm font-medium text-gray-700">Sub Sub Category</label>
              <select
                id="sub_sub_category_id"
                name="sub_sub_category_id"
                value={formData.sub_sub_category_id}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="">Select Sub Sub Category</option>
                {subSubCategoryDropdown.map((subSubCategory: any) => (
                  <option key={subSubCategory.label} value={subSubCategory.value}>{subSubCategory.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="product_quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                id="product_quantity"
                name="product_quantity"
                value={formData.product_quantity}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
                min="0"
              />
            </div>
            <div>
              <label htmlFor="product_tags" className="block text-sm font-medium text-gray-700">Tags</label>
              <input
                type="text"
                id="product_tags"
                name="product_tags"
                value={formData.product_tags}
                onChange={handleInputChange}
                placeholder="Separate tags with commas"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="product_size" className="block text-sm font-medium text-gray-700">Size</label>
              <input
                type="text"
                id="product_size"
                name="product_size"
                value={formData.product_size}
                onChange={handleInputChange}
                placeholder="e.g., 6.7 inch, 15.6 inch"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="product_colour" className="block text-sm font-medium text-gray-700">Color</label>
              <input
                type="text"
                id="product_colour"
                name="product_colour"
                value={formData.product_colour}
                onChange={handleInputChange}
                placeholder="e.g., Black, Silver"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="product_selling_price" className="block text-sm font-medium text-gray-700">Selling Price</label>
              <input
                type="number"
                id="product_selling_price"
                name="product_selling_price"
                value={formData.product_selling_price}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label htmlFor="product_discount_price" className="block text-sm font-medium text-gray-700">Discount Price</label>
              <input
                type="number"
                id="product_discount_price"
                name="product_discount_price"
                value={formData.product_discount_price}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="product_short_desc" className="block text-sm font-medium text-gray-700">Short Description</label>
            <textarea
              id="product_short_desc"
              name="product_short_desc"
              value={formData.product_short_desc}
              onChange={handleInputChange}
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="product_long_desc" className="block text-sm font-medium text-gray-700">Long Description</label>
            <textarea
              id="product_long_desc"
              name="product_long_desc"
              value={formData.product_long_desc}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="product_thumbnail" className="block text-sm font-medium text-gray-700">Product Thumbnail</label>
            <input
              type="file"
              id="product_thumbnail"
              name="product_thumbnail"
              onChange={handleFileChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          {/* Special Flags */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hot_deal"
                  name="hot_deal"
                  checked={formData.hot_deal === '1'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hot_deal" className="ml-2 text-sm text-gray-700">Hot Deal</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured === '1'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 text-sm text-gray-700">Featured</label>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="special_offer"
                  name="special_offer"
                  checked={formData.special_offer === '1'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="special_offer" className="ml-2 text-sm text-gray-700">Special Offer</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="special_deals"
                  name="special_deals"
                  checked={formData.special_deals === '1'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="special_deals" className="ml-2 text-sm text-gray-700">Special Deals</label>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct; 