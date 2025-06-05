import api from '@/lib/axios';

export interface Brand {
  id: string;
  brand_name: string;
  brand_image: string;
  products_count: number;
  created_at: string;
  updated_at: string;
  status: number;
}

export interface CreateBrandData {
  brand_name: string;
  brand_image: File;
  status: number;
}

export interface UpdateBrandData {
  brand_name?: string;
  brand_image?: File;
  status?: number;
}

class BrandService {
  private static instance: BrandService;

  private constructor() {}

  static getInstance() {
    if (!BrandService.instance) {
      BrandService.instance = new BrandService();
    }
    return BrandService.instance;
  }

  async getAllBrands() {
    const response = await api.get<Brand[]>('/brands');
    return response;
  }

  async getBrandById(id: string) {
    const response = await api.get<Brand>(`/brands/${id}`);
    return response;
  }

  async createBrand(data: FormData) {
    const response = await api.post<Brand>('/brands', data);
    return response;
  }

  async updateBrand(id: string, data: FormData) {
    const response = await api.post<Brand>(`/brands/${id}`, data);
    return response;
  }

  async deleteBrand(id: string) {
    const response = await api.delete(`/brands/${id}`);
    return response;
  }
}

export default BrandService.getInstance(); 