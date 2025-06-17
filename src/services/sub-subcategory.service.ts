import api from '@/lib/axios';
import { DropdownOption } from './brand.service';

export interface SubSubCategory {
  id: string;
  name: string;
  category_id: string;
  subcategory_id: string;
  createdAt?: string;
  updatedAt?: string;
  category?: {
    id: string;
    name: string;
  };
  subcategory?: {
    id: string;
    name: string;
  };
}

export interface CreateSubSubCategoryData {
  sub_category_id: string;
  category_id: string;
  sub_sub_category_name: string;
  status: number;
}

export interface UpdateSubSubCategoryData {
  name?: string;
  category_id?: string;
  subcategory_id?: string;
}

class SubSubCategoryService {
  private static instance: SubSubCategoryService;

  private constructor() {}

  static getInstance() {
    if (!SubSubCategoryService.instance) {
      SubSubCategoryService.instance = new SubSubCategoryService();
    }
    return SubSubCategoryService.instance;
  }

  async getAllSubSubCategories() {
    const response = await api.get<SubSubCategory[]>('/sub-sub-categories');
    return response.data;
  }

  async getSubSubCategoryById(id: string) {
    const response = await api.get<SubSubCategory>(`/sub-sub-categories/${id}`);
    return response.data;
  }

  async getSubSubCategoriesByCategory(categoryId: string) {
    const response = await api.get<SubSubCategory[]>(`/sub-subcategories/category/${categoryId}`);
    return response.data;
  }

  async getSubSubCategoriesBySubcategory(subcategoryId: string) {
    const response = await api.get<SubSubCategory[]>(`/sub-subcategories/subcategory/${subcategoryId}`);
    return response.data;
  }

  async createSubSubCategory(data: CreateSubSubCategoryData | FormData) {
    const response = await api.post<SubSubCategory>('/sub-sub-categories', data, {
      headers: {
        'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    });
    return response.data;
  }

  async updateSubSubCategory(id: string, data: UpdateSubSubCategoryData) {
    const response = await api.put<SubSubCategory>(`/sub-sub-categories/${id}`, data);
    return response.data;
  }

  async deleteSubSubCategory(id: string) {
    const response = await api.delete(`/sub-sub-categories/${id}`);
    return response.data;
  }

  async getDropdown(subcategory_id: string) {
    const response = await api.get<DropdownOption[]>(`/sub-sub-category-dropdown/${subcategory_id}`);
    return response.data;
  }
}

export default SubSubCategoryService.getInstance(); 