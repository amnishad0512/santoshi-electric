import api from '@/lib/axios';

export interface Brand {
  id: string;
  name: string;
  phone_number: string;
  role: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface CreateBrandData {
  name: string;
  phone_number: string;
  role: number;
  status: number;
}

export interface UpdateBrandData {
  name?: string;
  phone_number?: string;
  role?: number;
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

  async createBrand(data: CreateBrandData) {
    const response = await api.post<Brand>('/brands', data);
    return response;
  }

  async updateBrand(id: string, data: UpdateBrandData) {
    const response = await api.put<Brand>(`/brands/${id}`, data);
    return response;
  }

  async deleteBrand(id: string) {
    const response = await api.delete(`/brands/${id}`);
    return response;
  }

  async updateBrandStatus(id: string, status: number) {
    const response = await api.patch<Brand>(`/brands/${id}/status`, { status });
    return response;
  }
}

export default BrandService.getInstance(); 