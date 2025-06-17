import api from '@/lib/axios';

export interface Brand {
  id: string;
  brand_name: string;
  description?: string;
  brand_image?: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface DropdownOption {
  label: string;
  value: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
}

export interface CreateBrandData {
  brand_name: string;
  description?: string;
  status: number;
  brand_image?: string;
}

export interface UpdateBrandData {
  brand_name?: string;
  description?: string;
  status?: number;
  brand_image?: string;
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
    return response.data;
  }

  async createBrand(data: CreateBrandData | FormData) {
    const config = data instanceof FormData 
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};
    
    const response = await api.post<Brand>('/brands', data, config);
    return response;
  }

  async updateBrand(id: string, data: UpdateBrandData | FormData) {
    const config = data instanceof FormData 
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};
    
    const response = await api.post<Brand>(`/brands/${id}`, data, config);
    return response;
  }

  async updateBrandPUT(id: string, data: UpdateBrandData | FormData) {
    const config = data instanceof FormData 
      ? { headers: { 'Content-Type': 'application/json' } }
      : {};
    
    const response = await api.put<Brand>(`/brands/${id}`, data, config);
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

  async getDropdown() {
    const response = await api.get<DropdownOption[]>('/brand-dropdown');
    return response.data;
  }

  async uploadBrandImage(file: File) {
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

export default BrandService.getInstance(); 