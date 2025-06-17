import api from '@/lib/axios';
import { DropdownOption } from './brand.service';

export interface SubCategory {
  id: string;
  subcategory_name: string;
  category_id: string;
  status: number;
  created_at: string;
  updated_at: string;
  products_count?: number;
}

export interface CreateSubCategoryData {
  subcategory_name: string;
  category_id: string;
  status: number;
}

export interface UpdateSubCategoryData {
  subcategory_name?: string;
  category_id?: string;
  status?: number;
}

class SubCategoryService {
  private static instance: SubCategoryService;
  getSubCategoriesByCategory: any;

  private constructor() {}

  static getInstance() {
    if (!SubCategoryService.instance) {
      SubCategoryService.instance = new SubCategoryService();
    }
    return SubCategoryService.instance;
  }

  async getAllSubCategories() {
    try {
      const response = await api.get('/sub-categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  }

  async getSubcategoriesByCategory(categoryId: string) {
    if (!categoryId) {
      throw new Error('Category ID is required');
    }

    try {
      console.log('Fetching subcategories for category:', categoryId);
      const response = await api.get(`/sub-categories/by-category/${categoryId}`);
      console.log('Subcategories by category response:', response);
      return response;
    } catch (error) {
      console.error(`Error fetching subcategories for category ${categoryId}:`, error);
      throw error;
    }
  }

  async getSubCategoryById(id: string) {
    if (!id) {
      throw new Error('SubCategory ID is required');
    }

    try {
      const response = await api.get(`/sub-categories/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching subcategory ${id}:`, error);
      throw error;
    }
  }

  async createSubCategory(data: CreateSubCategoryData) {
    try {
      const response = await api.post('/sub-categories', data);
      return response;
    } catch (error) {
      console.error('Error creating subcategory:', error);
      throw error;
    }
  }

  async updateSubCategory(id: string, data: UpdateSubCategoryData) {
    if (!id) {
      throw new Error('SubCategory ID is required');
    }

    try {
      const response = await api.put(`/sub-categories/${id}`, data);
      return response;
    } catch (error) {
      console.error(`Error updating subcategory ${id}:`, error);
      throw error;
    }
  }

  async deleteSubCategory(id: string) {
    if (!id) {
      throw new Error('SubCategory ID is required');
    }

    try {
      const response = await api.delete(`/sub-categories/${id}`);
      return response;
    } catch (error) {
      console.error(`Error deleting subcategory ${id}:`, error);
      throw error;
    }
  }

  async getDropdown(category_id: string) {
    try {
      const response = await api.get<DropdownOption[]>(`/sub-category-dropdown/${category_id}`);
      return response.data;
    } catch (error) {
      console.error('Error in getAllCategories:', error);
      throw error;
    }
  }
}

export default SubCategoryService.getInstance(); 