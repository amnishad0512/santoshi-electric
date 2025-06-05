import api from '@/lib/axios';
import { Category } from './category.service';

export interface Subcategory {
  id: string;
  category_id: string;
  subcategory_name: string;
  createdAt?: string;
  category?: Category;
}

export interface CreateSubcategoryData {
  category_id: string;
  subcategory_name: string;
}

export interface UpdateSubcategoryData {
  category_id?: string;
  subcategory_name?: string;
}

class SubcategoryService {
  private static instance: SubcategoryService;

  private constructor() {}

  static getInstance() {
    if (!SubcategoryService.instance) {
      SubcategoryService.instance = new SubcategoryService();
    }
    return SubcategoryService.instance;
  }

  async getAllSubcategories() {
    const response = await api.get<Subcategory[]>('/subcategories');
    return response.data;
  }

  async getSubcategoryById(id: string) {
    const response = await api.get<Subcategory>(`/subcategories/${id}`);
    return response.data;
  }

  async getSubcategoriesByCategory(categoryId: string) {
    const response = await api.get<Subcategory[]>(`/subcategories/category/${categoryId}`);
    return response.data;
  }

  async createSubcategory(data: CreateSubcategoryData) {
    const response = await api.post<Subcategory>('/subcategories', data);
    return response.data;
  }

  async updateSubcategory(id: string, data: UpdateSubcategoryData) {
    const response = await api.put<Subcategory>(`/subcategories/${id}`, data);
    return response.data;
  }

  async deleteSubcategory(id: string) {
    const response = await api.delete(`/subcategories/${id}`);
    return response.data;
  }
}

export default SubcategoryService.getInstance(); 