import api from '@/lib/axios';

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  product?: {
    id: string;
    name: string;
    image: string;
  };
}

export interface CreateReviewData {
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewData {
  rating?: number;
  comment?: string;
  status?: 'pending' | 'approved' | 'rejected';
}

class ReviewService {
  private static instance: ReviewService;

  private constructor() {}

  static getInstance() {
    if (!ReviewService.instance) {
      ReviewService.instance = new ReviewService();
    }
    return ReviewService.instance;
  }

  async getAllReviews() {
    const response = await api.get<Review[]>('/reviews');
    return response.data;
  }

  async getReviewById(id: string) {
    const response = await api.get<Review>(`/reviews/${id}`);
    return response.data;
  }

  async getReviewsByProduct(productId: string) {
    const response = await api.get<Review[]>(`/reviews/product/${productId}`);
    return response.data;
  }

  async getReviewsByUser(userId: string) {
    const response = await api.get<Review[]>(`/reviews/user/${userId}`);
    return response.data;
  }

  async createReview(data: CreateReviewData) {
    const response = await api.post<Review>('/reviews', data);
    return response.data;
  }

  async updateReview(id: string, data: UpdateReviewData) {
    const response = await api.put<Review>(`/reviews/${id}`, data);
    return response.data;
  }

  async deleteReview(id: string) {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  }

  async approveReview(id: string) {
    return this.updateReview(id, { status: 'approved' });
  }

  async rejectReview(id: string) {
    return this.updateReview(id, { status: 'rejected' });
  }
}

export default ReviewService.getInstance(); 