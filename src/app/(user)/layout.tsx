'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { AddressProvider } from '@/contexts/AddressContext';
import {
  UserCircle,
  ShoppingBag,
  ShoppingCart,
  Key,
  MapPin,
  Menu,
  X
} from 'lucide-react';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigation = [
    { 
      name: 'Profile', 
      href: '/profile',
      icon: UserCircle
    },
    { 
      name: 'Orders', 
      href: '/orders',
      icon: ShoppingBag
    },
    { 
      name: 'Cart', 
      href: '/cart',
      icon: ShoppingCart
    },
    { 
      name: 'Addresses', 
      href: '/addresses',
      icon: MapPin
    },
    { 
      name: 'Change Password', 
      href: '/change-password',
      icon: Key
    },
  ];

  return (
    <CartProvider>
      <AddressProvider>
        <div className="min-h-screen bg-gray-50">
          <div className="flex h-screen">
            {/* Sidebar */}
            <div
              className={`w-64 bg-white shadow-lg ${
                isSidebarOpen ? 'block' : 'hidden'
              } lg:block`}
            >
              <div className="px-4 flex items-center justify-between h-16 px-4 border-b">
                <h1 className="px-2 text-xl font-bold text-gray-900">My Account</h1>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-md lg:hidden"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="px-4 py-4">
                <ul className="space-y-2">
                  {navigation.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                          pathname === item.href
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon className={`w-5 h-5 mr-3 ${
                          pathname === item.href ? 'text-blue-700' : 'text-gray-400'
                        }`} />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
              {/* Mobile Header */}
              <div className="lg:hidden bg-white shadow">
                <div className="flex items-center justify-between h-16 px-4">
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 rounded-md"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                  <h1 className="text-xl font-bold text-gray-900">My Account</h1>
                  <div className="w-10"></div> {/* Spacer for alignment */}
                </div>
              </div>

              {/* Page Content */}
              <div className="p-6">
                <div className="bg-white shadow rounded-lg p-6">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AddressProvider>
    </CartProvider>
  );
} 