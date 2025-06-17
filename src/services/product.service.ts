import api from '@/lib/axios';

export interface Product {
  id: string;
  brand_id: string;
  category_id: string;
  sub_category_id: string;
  sub_sub_category_id: string;
  product_name: string;
  product_code: string;
  product_quantity: number;
  product_tags: string;
  product_size: string;
  product_colour: string;
  product_selling_price: number;
  product_discount_price: number;
  product_short_desc: string;
  product_long_desc: string;
  product_thumbnail: string;
  hot_deal: boolean;
  featured: boolean;
  special_offer: boolean;
  special_deals: boolean;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface CreateProductData {
  brand_id: string;
  category_id: string;
  sub_category_id: string;
  sub_sub_category_id?: string;
  product_name: string;
  product_code: string;
  product_quantity: number;
  product_tags?: string;
  product_size?: string;
  product_colour?: string;
  product_selling_price: number;
  product_discount_price?: number;
  product_short_desc: string;
  product_long_desc: string;
  product_thumbnail?: File;
  hot_deal?: boolean;
  featured?: boolean;
  special_offer?: boolean;
  special_deals?: boolean;
  status?: 'active' | 'inactive';
}

export interface UpdateProductData {
  brand_id?: string;
  category_id?: string;
  sub_category_id?: string;
  sub_sub_category_id?: string;
  product_name?: string;
  product_code?: string;
  product_quantity?: number;
  product_tags?: string;
  product_size?: string;
  product_colour?: string;
  product_selling_price?: number;
  product_discount_price?: number;
  product_short_desc?: string;
  product_long_desc?: string;
  product_thumbnail?: File;
  hot_deal?: boolean;
  featured?: boolean;
  special_offer?: boolean;
  special_deals?: boolean;
  status?: 'active' | 'inactive';
}

class ProductService {
  private static instance: ProductService;

  private constructor() {}

  static getInstance() {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async getAllProducts() {
    const response = await api.get<Product[]>('/products');
    return response;
  }

  async getProductById(id: string) {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  }

  async createProduct(data: CreateProductData | FormData) {
    const config = data instanceof FormData 
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};
    
    const response = await api.post<Product>('/products', data, config);
    return response;
  }

  async updateProduct(id: string, data: UpdateProductData | FormData) {
    const config = data instanceof FormData 
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};
    
    const response = await api.post<Product>(`/products/${id}`, data, config);
    return response;
  }

  async updateProductPUT(id: string, data: UpdateProductData | FormData) {
    const config = data instanceof FormData 
      ? { headers: { 'Content-Type': 'application/json' } }
      : {};
    
    const response = await api.put<Product>(`/products/${id}`, data, config);
    return response;
  }

  async deleteProduct(id: string) {
    const response = await api.delete(`/products/${id}`);
    return response;
  }

  async updateProductStatus(id: string, status: 'active' | 'inactive') {
    const response = await api.patch<Product>(`/products/${id}/status`, { status });
    return response;
  }

  async uploadProductImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.post<ApiResponse<{ imageUrl: string }>>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export default ProductService.getInstance(); 