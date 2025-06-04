'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  Tag,
  Settings,
  FileText,
  Percent,
  UserCircle,
  LogOut
} from 'lucide-react';
import authService from '@/services/auth.service';
import { useRouter } from 'next/navigation';

interface MenuItem {
  title: string;
  path: string;
  icon: any;
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Users',
    path: '/admin/users',
    icon: Users
  },
  {
    title: 'Orders',
    path: '/admin/orders',
    icon: ShoppingBag
  },
  {
    title: 'Products',
    path: '/admin/products',
    icon: Package
  },
  {
    title: 'Categories',
    path: '/admin/categories',
    icon: Tag
  },
  {
    title: 'Coupons',
    path: '/admin/coupons',
    icon: Percent
  },
  {
    title: 'Reports',
    path: '/admin/reports',
    icon: FileText
  },
  {
    title: 'Profile',
    path: '/admin/profile',
    icon: UserCircle
  },
  {
    title: 'Settings',
    path: '/admin/settings',
    icon: Settings
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo/Brand - Fixed at top */}
      <div className="h-16 flex-shrink-0 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      </div>

      {/* Navigation Menu - Scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="px-4 py-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Logout Button - Fixed at bottom */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3 text-gray-400" />
          Logout
        </button>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        /* For Webkit browsers (Chrome, Safari) */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* For Firefox */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f1f1;
        }
      `}</style>
    </div>
  );
} 