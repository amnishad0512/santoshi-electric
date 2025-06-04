'use client';

import { useEffect, useState } from 'react';
import ProtectedPage from '@/components/ProtectedPage';
import { 
  Users,
  ShoppingBag,
  Tag,
  DollarSign,
  BarChart,
  ArrowUp,
  ArrowDown,
  Loader2,
  TrendingUp
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  recentOrders: any[];
  topProducts: any[];
  salesTrend: {
    labels: string[];
    data: number[];
  };
  analytics: {
    monthlyRevenue: number[];
    monthlyOrders: number[];
    monthlyUsers: number[];
    categoryDistribution: {
      labels: string[];
      data: number[];
    };
  };
}

// Animated Counter Component
const AnimatedCounter = ({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000; // 2 seconds
    const incrementTime = 20; // Update every 20ms
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
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
    recentOrders: [],
    topProducts: [],
    salesTrend: {
      labels: [],
      data: []
    },
    analytics: {
      monthlyRevenue: [],
      monthlyOrders: [],
      monthlyUsers: [],
      categoryDistribution: {
        labels: [],
        data: []
      }
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulated API response with analytics data
        const response = {
          totalUsers: 1250,
          totalOrders: 856,
          totalProducts: 324,
          totalRevenue: 45678.90,
          recentOrders: [
            { id: 1, customer: 'John Doe', amount: 299.99, status: 'Delivered' },
            { id: 2, customer: 'Jane Smith', amount: 199.99, status: 'Processing' },
            { id: 3, customer: 'Mike Johnson', amount: 499.99, status: 'Shipped' },
          ],
          topProducts: [
            { id: 1, name: 'Product A', sales: 150, revenue: 15000 },
            { id: 2, name: 'Product B', sales: 120, revenue: 12000 },
            { id: 3, name: 'Product C', sales: 100, revenue: 10000 },
          ],
          analytics: {
            monthlyRevenue: [30000, 35000, 32000, 38000, 42000, 45678],
            monthlyOrders: [120, 150, 130, 160, 180, 200],
            monthlyUsers: [800, 900, 950, 1000, 1100, 1250],
            categoryDistribution: {
              labels: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'],
              data: [30, 25, 15, 20, 10]
            }
          }
        };
        setStats(response);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Chart configurations
  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: stats.analytics.monthlyRevenue,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const ordersChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Orders',
        data: stats.analytics.monthlyOrders,
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
      }
    ]
  };

  const categoryChartData = {
    labels: stats.analytics.categoryDistribution.labels,
    datasets: [
      {
        data: stats.analytics.categoryDistribution.data,
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const StatCard = ({ title, value, icon: Icon, change, prefix = '', suffix = '' }: { 
    title: string; 
    value: number; 
    icon: any;
    change?: { value: number; isPositive: boolean };
    prefix?: string;
    suffix?: string;
  }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">
            <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
          </p>
          {change && (
            <div className="flex items-center mt-2">
              {change.isPositive ? (
                <ArrowUp className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {change.value}% from last month
              </span>
            </div>
          )}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <StatCard 
                title="Total Users" 
                value={stats.totalUsers} 
                icon={Users}
                change={{ value: 12, isPositive: true }}
              />
              <StatCard 
                title="Total Orders" 
                value={stats.totalOrders} 
                icon={ShoppingBag}
                change={{ value: 8, isPositive: true }}
              />
              <StatCard 
                title="Total Products" 
                value={stats.totalProducts} 
                icon={Tag}
                change={{ value: 5, isPositive: true }}
              />
              <StatCard 
                title="Total Revenue" 
                value={stats.totalRevenue} 
                icon={DollarSign}
                prefix="$"
                change={{ value: 15, isPositive: true }}
              />
            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Revenue Trend */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h2>
                <div className="h-80">
                  <Line data={revenueChartData} options={chartOptions} />
                </div>
              </div>

              {/* Orders Trend */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Orders Trend</h2>
                <div className="h-80">
                  <Bar data={ordersChartData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Category Distribution and Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Category Distribution */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Category Distribution</h2>
                <div className="h-80">
                  <Doughnut data={categoryChartData} options={chartOptions} />
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow lg:col-span-2">
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
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {stats.recentOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                  order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-blue-100 text-blue-800'}`}>
                                {order.status}
                              </span>
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