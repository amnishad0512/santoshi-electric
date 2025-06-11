import api from '@/lib/axios';

export interface Brand {
  id: number;
  brand_name: string;
  brand_image: string;
  status: number;
  created_at: string;
  updated_at: string;
  products_count: number;
}

export interface CreateBrandData {
  brand_name: string;
  brand_image: string;
  status: number;
}

export interface UpdateBrandData {
  brand_name?: string;
  brand_image?: string;
  status?: number;
}

interface ApiResponse<T> {
  status: string;
  data: T;
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
    const response = await api.get<ApiResponse<Brand[]>>('/brands');
    return response.data;
  }

  async getBrandById(id: string) {
    const response = await api.get<ApiResponse<Brand>>(`/brands/${id}`);
    return response;
  }

  async createBrand(data: CreateBrandData) {
    const response = await api.post<ApiResponse<Brand>>('/brands', data);
    return response.data;
  }

  async updateBrand(id: number, data: UpdateBrandData | FormData) {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    const response = await api.post<ApiResponse<Brand>>(`/brands/${id}`, data, { headers });
    return response.data;
  }

  async deleteBrand(id: number) {
    const response = await api.delete<ApiResponse<null>>(`/brands/${id}`);
    return response.data;
  }

  async updateBrandStatus(id: number, status: number) {
    const response = await api.patch<ApiResponse<Brand>>(`/brands/${id}/status`, { status });
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