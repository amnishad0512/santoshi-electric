import api from '@/lib/axios';

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  item_quantity: number;
  item_price: string;
  product: {
    id: number;
    product_name: string;
    product_slug: string;
    product_code: string;
    product_selling_price: string;
    product_discount_price: string;
    product_thumbnail: string;
  };
}

export interface Payment {
  id: number;
  order_id: number;
  payment_method: string;
  payment_status: string;
  amount: string;
  transaction_id: string;
  paid_at: string;
  created_at: string;
  updated_at: string;
}

export interface ShippingAddress {
  id: number;
  user_id: number;
  order_id: number;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface User {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  role: number;
}

export interface Order {
  id: number;
  user_id: number;
  order_status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  order_total: string;
  user: User;
  order_items: OrderItem[];
  payment: Payment;
  shipping_address: ShippingAddress;
}

interface OrderResponse {
  status: string;
  data: Order[];
}

interface SingleOrderResponse {
  status: string;
  data: Order;
}

class OrderService {
  private static instance: OrderService;

  private constructor() {}

  static getInstance() {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      const response = await api.get<OrderResponse>('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  async getOrderById(id: number): Promise<Order | null> {
    try {
      const response = await api.get<SingleOrderResponse>(`/orders/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  }

  async updateOrderStatus(id: number, status: Order['order_status']): Promise<Order | null> {
    try {
      const response = await api.patch<SingleOrderResponse>(`/orders/${id}/status`, { status });
      return response.data.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      return null;
    }
  }
}

export default OrderService.getInstance(); 