import api from '@/lib/axios';
import { Category } from './category.service';
import { Subcategory } from './subcategory.service';

export interface SubSubcategory {
  id: string;
  category_id: string;
  sub_category_id: string;
  sub_sub_categories_name: string;
  createdAt?: string;
  category?: Category;
  subcategory?: Subcategory;
}

export interface CreateSubSubcategoryData {
  category_id: string;
  sub_category_id: string;
  sub_sub_categories_name: string;
}

export interface UpdateSubSubcategoryData {
  category_id?: string;
  sub_category_id?: string;
  sub_sub_categories_name?: string;
}

class SubSubcategoryService {
  private static instance: SubSubcategoryService;

  private constructor() {}

  static getInstance() {
    if (!SubSubcategoryService.instance) {
      SubSubcategoryService.instance = new SubSubcategoryService();
    }
    return SubSubcategoryService.instance;
  }

  async getAllSubSubcategories() {
    const response = await api.get<SubSubcategory[]>('/sub-subcategories');
    return response.data;
  }

  async getSubSubcategoryById(id: string) {
    const response = await api.get<SubSubcategory>(`/sub-subcategories/${id}`);
    return response.data;
  }

  async getSubSubcategoriesByCategory(categoryId: string) {
    const response = await api.get<SubSubcategory[]>(`/sub-subcategories/category/${categoryId}`);
    return response.data;
  }

  async getSubSubcategoriesBySubcategory(subcategoryId: string) {
    const response = await api.get<SubSubcategory[]>(`/sub-subcategories/subcategory/${subcategoryId}`);
    return response.data;
  }

  async createSubSubcategory(data: CreateSubSubcategoryData) {
    const response = await api.post<SubSubcategory>('/sub-subcategories', data);
    return response.data;
  }

  async updateSubSubcategory(id: string, data: UpdateSubSubcategoryData) {
    const response = await api.put<SubSubcategory>(`/sub-subcategories/${id}`, data);
    return response.data;
  }

  async deleteSubSubcategory(id: string) {
    const response = await api.delete(`/sub-subcategories/${id}`);
    return response.data;
  }
}

export default SubSubcategoryService.getInstance(); 