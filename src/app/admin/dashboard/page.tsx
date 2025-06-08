'use client';

import { useEffect, useState } from 'react';
import ProtectedPage from '@/components/ProtectedPage';
import { 
  Users,
  ShoppingBag,
  Tag,
  LayoutGrid,
  Grid2X2,
  Grid3X3,
  Star,
  Ticket,
  BadgePercent,
  Loader2
} from 'lucide-react';
import dashboardService, { 
  DashboardStats, 
  RecentOrder, 
  FeaturedProduct,
  User,
  Payment
} from '@/services/dashboard.service';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface DashboardState {
  stats: DashboardStats;
  recentOrders: RecentOrder[];
  featuredProducts: FeaturedProduct[];
}

// Animated Counter Component
const AnimatedCounter = ({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000; // 2 seconds
    const incrementTime = 10; // Update every 20ms
    const steps = duration / incrementTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardState>({
    stats: {
      total_users: 0,
      total_orders: 0,
      total_products: 0,
      total_categories: 0,
      total_sub_categories: 0,
      total_sub_sub_categories: 0,
      total_brands: 0,
      total_reviews: 0,
      total_active_coupons: 0
    },
    recentOrders: [],
    featuredProducts: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch stats
        const statsResponse = await dashboardService.getDashboardStats();
        
        // Fetch recent orders
        const recentOrdersResponse = await dashboardService.getRecentOrders(5);
        
        // Fetch featured products
        const featuredProductsResponse = await dashboardService.getFeaturedProducts(5);
        
        setDashboardData({
          stats: statsResponse,
          recentOrders: recentOrdersResponse,
          featuredProducts: featuredProductsResponse
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to fetch dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon: Icon }: { 
    title: string; 
    value: number; 
    icon: any;
  }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">
            <AnimatedCounter value={value} />
          </p>
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>
  );

  return (
    <ProtectedPage allowedRoles={['admin']}>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Overview</h1>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
              <StatCard title="Total Users" value={dashboardData.stats.total_users} icon={Users} />
              <StatCard title="Total Orders" value={dashboardData.stats.total_orders} icon={ShoppingBag} />
              <StatCard title="Total Products" value={dashboardData.stats.total_products} icon={Tag} />
              <StatCard title="Total Categories" value={dashboardData.stats.total_categories} icon={LayoutGrid} />
              <StatCard title="Total Sub Categories" value={dashboardData.stats.total_sub_categories} icon={Grid2X2} />
              <StatCard title="Total Sub-Sub Categories" value={dashboardData.stats.total_sub_sub_categories} icon={Grid3X3} />
              <StatCard title="Total Brands" value={dashboardData.stats.total_brands} icon={Star} />
              <StatCard title="Total Reviews" value={dashboardData.stats.total_reviews} icon={Ticket} />
              <StatCard title="Active Coupons" value={dashboardData.stats.total_active_coupons} icon={BadgePercent} />
            </div>

            <div className="space-y-6">
              {/* Featured Products */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Featured Products</h2>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto max-w-full">
                    <table className="w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dashboardData.featuredProducts.map((product) => (
                          <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="relative h-16 w-16">
                                <Image
                                  src={`/uploads/${product.product_thumbnail}`}
                                  alt={product.product_name}
                                  fill
                                  className="rounded-lg object-cover"
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{product.product_name}</p>
                                <p className="text-sm text-gray-500">{product.product_short_desc}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.product_code}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.product_quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ₹{product.product_selling_price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              ₹{product.product_discount_price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${product.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {product.status === 1 ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dashboardData.recentOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.user?.name || 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.order_total}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${order.payment?.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {order.payment?.payment_status || 'pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${order.order_status === 'completed' ? 'bg-green-100 text-green-800' : 
                                  order.order_status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                                  'bg-yellow-100 text-yellow-800'}`}>
                                {order.order_status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.payment?.payment_method || 'N/A'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ProtectedPage>
  );
}