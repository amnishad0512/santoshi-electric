import api from '@/lib/axios';

export interface ApiResponse<T> {
  status: string;
  data: T;
}

export interface DashboardStats {
  total_users: number;
  total_orders: number;
  total_products: number;
  total_categories: number;
  total_sub_categories: number;
  total_sub_sub_categories: number;
  total_brands: number;
  total_reviews: number;
  total_active_coupons: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  role: number;
  status: number;
}

export interface Payment {
  id: number;
  payment_method: string;
  payment_status: string;
  amount: string;
  transaction_id: string;
  paid_at: string;
}

export interface RecentOrder {
  id: number;
  user_id: number;
  order_status: string;
  order_total: string;
  user?: User;
  payment?: Payment;
}

export interface ProductImage {
  id: number;
  product_id: number;
  path_name: string;
  status: number;
}

export interface FeaturedProduct {
  id: number;
  product_name: string;
  product_slug: string;
  product_code: string;
  product_quantity: number;
  product_selling_price: string;
  product_discount_price: string;
  product_short_desc: string;
  product_thumbnail: string;
  featured: number;
  status: number;
  product_images: ProductImage[];
}

class DashboardService {
  private static instance: DashboardService;

  private constructor() {}

  static getInstance() {
    if (!DashboardService.instance) {
      DashboardService.instance = new DashboardService();
    }
    return DashboardService.instance;
  }

  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    const response = await api.get('/admin/dashboard');
    return response;
  }

  async getRecentOrders(limit: number): Promise<ApiResponse<RecentOrder[]>> {
    const response = await api.get(`/orders?limit=${limit}`);
    return response.data;
  }

  async getFeaturedProducts(limit: number): Promise<ApiResponse<FeaturedProduct[]>> {
    const response = await api.get(`/featured-products?limit=${limit}`);
    return response.data;
  }
}

export default DashboardService.getInstance(); 