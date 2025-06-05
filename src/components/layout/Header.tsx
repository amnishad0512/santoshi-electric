'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const router = useRouter();
  const { user, isAuthenticated, logout, checkAuthStatus } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Load cart count on mount and when auth state changes
  useEffect(() => {
    if (isAuthenticated) {
      // TODO: Implement cart count loading
      setCartCount(0);
    } else {
      setCartCount(0);
    }
  }, [isAuthenticated]);

  // Check auth status when component mounts
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    router.push('/cart');
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (user?.role === 1) {
      router.push('/admin/dashboard');
    } else {
      router.push('/profile');
    }
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logout();
    checkAuthStatus(); // Re-check auth status after logout
  };

  return (
    <header className="bg-white backdrop-blur-md bg-opacity-90 shadow-lg w-full fixed top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="SantoshiElectric Logo"
                width={100}
                height={40}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Search Box */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for TVs, Refrigerators, Washing Machines..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm bg-white text-gray-900 placeholder-gray-500"
              />
              <span className="absolute left-3.5 top-3 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Cart and Profile */}
          <div className="flex items-center space-x-8">
            {/* Cart */}
            <a 
              href="/cart" 
              onClick={handleCartClick}
              className="relative flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="text-sm font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                  {cartCount}
                </span>
              )}
            </a>

            {/* Profile */}
            {isAuthenticated ? (
              <div className="relative group">
                <button 
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">Profile</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100">
                  <a 
                    href="/profile" 
                    onClick={handleProfileClick}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a 
                    href="/orders" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </a>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                href="/login"
                className="inline-flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 