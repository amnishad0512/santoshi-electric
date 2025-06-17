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
  Loader2,
  Eye
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
import { useRouter } from 'next/navigation';

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
    const duration = 100; // Reduced from 1000ms to 400ms for faster animation
    const incrementTime = 20; // Reduced from 10ms to 8ms for smoother animation
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
      totalUsers: 0,
      totalOrders: 0,
      totalProducts: 0,
      totalCategories: 0,
      totalSubCategories: 0,
      totalSubSubCategories: 0,
      totalBrands: 0,
      totalReviews: 0,
      totalActiveCoupons: 0
    },
    recentOrders: [],
    featuredProducts: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
          stats: statsResponse.data,
          recentOrders: recentOrdersResponse.data,
          featuredProducts: featuredProductsResponse.data
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

  const StatCard = ({ title, value, icon: Icon, onClick }: { 
    title: string; 
    value: number; 
    icon: any;
    onClick: () => void;
  }) => (
    <div className="bg-white rounded-lg shadow p-6 cursor-pointer" onClick={onClick}>
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
  
  const {totalUsers, totalOrders, totalProducts, totalCategories, totalSubCategories, totalSubSubCategories, totalBrands, totalReviews, totalActiveCoupons} = dashboardData.stats;
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
              <StatCard title="Total Users" value={totalUsers} icon={Users} onClick={() => router.push('/admin/users')} />
              <StatCard title="Total Orders" value={totalOrders} icon={ShoppingBag} onClick={() => router.push('/admin/orders')}/>
              <StatCard title="Total Products" value={totalProducts} icon={Tag} onClick={() => router.push('/admin/products')}/>
              <StatCard title="Total Categories" value={totalCategories} icon={LayoutGrid} onClick={() => router.push('/admin/categories')}/>
              <StatCard title="Total Sub Categories" value={totalSubCategories} icon={Grid2X2} onClick={() => router.push('/admin/subcategories')}/>
              <StatCard title="Total Sub-Sub Categories" value={totalSubSubCategories} icon={Grid3X3} onClick={() => router.push('/admin/sub-subcategories')}/>
              <StatCard title="Total Brands" value={totalBrands} icon={Star} onClick={() => router.push('/admin/brands')}/>
              <StatCard title="Total Reviews" value={totalReviews} icon={Ticket} onClick={() => router.push('/admin/reviews')}/>
              <StatCard title="Active Coupons" value={totalActiveCoupons} icon={BadgePercent} onClick={() => router.push('/admin/coupons')}/>
            </div>

            <div className="space-y-6">
              {/* Featured Products */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Featured Products</h2>
                </div>
                <div className="p-6">
                  {dashboardData.featuredProducts.length === 0 ? (
                    <div className="text-center py-12">
                      <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Featured Products</h3>
                      <p className="text-gray-500 mb-4">There are no featured products to display at the moment.</p>
                      <button
                        onClick={() => router.push('/admin/products')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                      >
                        Manage Products
                      </button>
                    </div>
                  ) : (
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                                    onError={(e) => {
                                      e.currentTarget.src = '/images/user.jpg';
                                    }}
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
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                  onClick={() => router.push(`/admin/products/${product.id}`)}
                                  className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors"
                                  title="View Product Details"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
                </div>
                <div className="p-6">
                  {dashboardData.recentOrders.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Recent Orders</h3>
                      <p className="text-gray-500 mb-4">There are no recent orders to display at the moment.</p>
                      <button
                        onClick={() => router.push('/admin/orders')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                      >
                        View All Orders
                      </button>
                    </div>
                  ) : (
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                  onClick={() => router.push(`/admin/orders/${order.id}`)}
                                  className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors"
                                  title="View Order Details"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ProtectedPage>
  );
}