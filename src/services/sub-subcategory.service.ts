import api from '@/lib/axios';

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
  name: string;
  category_id: string;
  subcategory_id: string;
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
    const response = await api.get<SubSubCategory[]>('/sub-subcategories');
    return response.data;
  }

  async getSubSubCategoryById(id: string) {
    const response = await api.get<SubSubCategory>(`/sub-subcategories/${id}`);
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

  async createSubSubCategory(data: CreateSubSubCategoryData) {
    const response = await api.post<SubSubCategory>('/sub-subcategories', data);
    return response.data;
  }

  async updateSubSubCategory(id: string, data: UpdateSubSubCategoryData) {
    const response = await api.put<SubSubCategory>(`/sub-subcategories/${id}`, data);
    return response.data;
  }

  async deleteSubSubCategory(id: string) {
    const response = await api.delete(`/sub-subcategories/${id}`);
    return response.data;
  }
}

export default SubSubCategoryService.getInstance(); 