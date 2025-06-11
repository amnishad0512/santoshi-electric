import { z } from 'zod';
import api from '@/lib/axios';

// Types
export interface Coupon {
  id: string;
  code: string;
  discount: number;
  validFrom: string;
  validTo: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateCouponInput {
  code: string;
  discount: number;
  validFrom: string;
  validTo: string;
  status: 'active' | 'inactive';
}

export interface UpdateCouponInput extends Partial<CreateCouponInput> {
  id: string;
}

// Validation schemas
export const createCouponSchema = z.object({
  code: z.string().min(1, 'Coupon code is required').max(20, 'Coupon code must be less than 20 characters'),
  discount: z.number().min(0, 'Discount must be greater than 0').max(100, 'Discount cannot exceed 100%'),
  validFrom: z.string().min(1, 'Start date is required'),
  validTo: z.string().min(1, 'End date is required'),
  status: z.enum(['active', 'inactive']),
});

export const updateCouponSchema = createCouponSchema.partial().extend({
  id: z.string().min(1, 'Coupon ID is required'),
});

class CouponService {
  private static instance: CouponService;

  private constructor() {}

  static getInstance() {
    if (!CouponService.instance) {
      CouponService.instance = new CouponService();
    }
    return CouponService.instance;
  }

  // Create a new coupon
  async createCoupon(data: CreateCouponInput): Promise<Coupon> {
    try {
      // Validate input data
      createCouponSchema.parse(data);
      const response = await api.post<Coupon>('/coupons', data);
      return response.data;
    } catch (error) {
      console.error('Error creating coupon:', error);
      throw error;
    }
  }

  // Get all coupons with optional filtering
  async getCoupons(params?: {
    status?: 'active' | 'inactive';
    page?: number;
    limit?: number;
  }): Promise<{ coupons: Coupon[]; total: number }> {
    try {
      const response = await api.get<{ coupons: Coupon[]; total: number }>('/coupons', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching coupons:', error);
      throw error;
    }
  }

  // Get a single coupon by ID
  async getCouponById(id: string): Promise<Coupon> {
    try {
      const response = await api.get<Coupon>(`/coupons/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching coupon:', error);
      throw error;
    }
  }

  // Update a coupon
  async updateCoupon(data: UpdateCouponInput): Promise<Coupon> {
    try {
      // Validate input data
      updateCouponSchema.parse(data);
      const { id, ...updateData } = data;
      const response = await api.put<Coupon>(`/coupons/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating coupon:', error);
      throw error;
    }
  }

  // Delete a coupon
  async deleteCoupon(id: string): Promise<void> {
    try {
      await api.delete(`/coupons/${id}`);
    } catch (error) {
      console.error('Error deleting coupon:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export default CouponService.getInstance(); 