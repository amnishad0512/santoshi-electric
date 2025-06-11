'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, User, Menu, Search, Heart, Bell, HelpCircle, Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import useSearch from '@/hooks/useSearch';
import SearchResults from '@/components/SearchResults';
import useClickOutside from '@/hooks/useClickOutside';

export default function Header() {
  const router = useRouter();
  const { user, isAuthenticated, logout, checkAuthStatus } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { searchTerm, setSearchTerm, results, isLoading, isOpen, closeSearch } = useSearch();
  const searchRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchRef, closeSearch);

  // Load cart count on mount and when auth state changes
  useEffect(() => {
    if (isAuthenticated) {
      // TODO: Implement cart count loading
      setCartCount(3); // Sample count for demo
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
    <header className="bg-[#f9f7f3] from-slate-50 to-white sticky top-0 z-50 border-b border-gray-100">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="SantoshiElectric Logo"
                width={120}
                height={48}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Search Section */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative" ref={searchRef}>
              <div className="relative group">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="What are you looking for?"
                  className="w-full h-12 pl-12 pr-4 bg-white rounded-xl focus:border-[#e69204] focus:outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm focus:shadow-md"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#e69204] transition-colors" />
              </div>
              {isOpen && (
                <SearchResults
                  results={results}
                  isLoading={isLoading}
                  onClose={closeSearch}
                />
              )}
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex items-center space-x-2">
            {/* Wishlist */}
            <button 
              onClick={() => router.push('/wishlist')}
              className="hidden md:flex h-12 w-12 items-center justify-center text-gray-700 hover:text-[#e69204] hover:bg-orange-50 rounded-xl transition-all duration-200 relative group"
              title="Wishlist"
            >
              <Heart className="w-6 h-6" />
              {/* You can add wishlist count here */}
              {/* <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">3</span> */}
            </button>

            {/* Notifications */}
            <button 
              className="hidden md:flex h-12 w-12 items-center justify-center text-gray-700 hover:text-[#e69204] hover:bg-orange-50 rounded-xl transition-all duration-200 relative group"
              title="Notifications"
            >
              <Bell className="w-6 h-6" />
              {/* Notification indicator */}
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Track Order */}
            <button 
              onClick={() => router.push('/track-order')}
              className="hidden lg:flex h-12 w-12 items-center justify-center text-gray-700 hover:text-[#e69204] hover:bg-orange-50 rounded-xl transition-all duration-200 group"
              title="Track Order"
            >
              <Package className="w-6 h-6" />
            </button>

            {/* Help/Support */}
            <button 
              onClick={() => router.push('/help')}
              className="hidden lg:flex h-12 w-12 items-center justify-center text-gray-700 hover:text-[#e69204] hover:bg-orange-50 rounded-xl transition-all duration-200 group"
              title="Help & Support"
            >
              <HelpCircle className="w-6 h-6" />
            </button>

            {/* Cart */}
            <button 
              onClick={handleCartClick}
              className="relative h-12 w-12 flex items-center justify-center text-gray-700 hover:text-[#e69204] hover:bg-orange-50 rounded-xl transition-all duration-200"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-[#e69204] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Section */}
            {isAuthenticated ? (
              <div className="relative group">
                <button 
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 h-12 px-3 text-gray-700 hover:text-[#e69204] hover:bg-orange-50 rounded-xl transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#e69204] to-[#d46a04] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:block font-medium text-sm">
                    {user?.name?.split(' ')[0]}
                  </span>
                </button>
                
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-semibold text-gray-800 text-sm">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button onClick={handleProfileClick} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#e69204]">
                    Profile
                  </button>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#e69204]">
                    Orders
                  </Link>
                  <Link href="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#e69204]">
                    Wishlist
                  </Link>
                  <hr className="my-1" />
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                href="/login"
                className="flex items-center space-x-2 h-10 px-4 bg-[#e69204] text-white rounded-lg font-medium over:bg-white hover:text-white transition-all duration-300"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:block">Login</span>
              </Link>
            )}

            {/* Mobile Menu */}
            <button 
              onClick={toggleMenu}
              className="md:hidden h-12 w-12 flex items-center justify-center text-gray-700 hover:text-[#e69204] hover:bg-orange-50 rounded-xl transition-all duration-200"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative" ref={searchRef}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full h-12 pl-12 pr-4 bg-white border-2 border-gray-200 rounded-xl focus:border-[#e69204] focus:outline-none transition-all duration-300 text-gray-700"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            {isOpen && (
              <SearchResults
                results={results}
                isLoading={isLoading}
                onClose={closeSearch}
              />
            )}
          </div>
        </div>

        {/* Navigation Bar
        <div className="hidden md:flex items-center justify-center py-3 border-t border-gray-100">
          <nav className="flex items-center space-x-8">
            <Link href="/categories" className="text-gray-600 hover:text-[#e69204] font-medium transition-colors duration-200">
              Categories
            </Link>
            <Link href="/deals" className="text-gray-600 hover:text-[#e69204] font-medium transition-colors duration-200">
              Deals
            </Link>
            <Link href="/brands" className="text-gray-600 hover:text-[#e69204] font-medium transition-colors duration-200">
              Brands
            </Link>
            <Link href="/track-order" className="text-gray-600 hover:text-[#e69204] font-medium transition-colors duration-200">
              Track Order
            </Link>
            <Link href="/help" className="text-gray-600 hover:text-[#e69204] font-medium transition-colors duration-200">
              Support
            </Link>
          </nav>
        </div> */}

        {/* Mobile Menu */}
        {/* {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="py-4 space-y-2">
              <Link href="/categories" className="block px-4 py-3 text-gray-700 hover:text-[#e69204] hover:bg-orange-50 rounded-lg font-medium transition-all">
                Categories
              </Link>
              <Link href="/deals" className="block px-4 py-3 text-gray-700 hover:text-[#e69204] hover:bg-orange-50 rounded-lg font-medium transition-all">
                Deals
              </Link>
              <Link href="/brands" className="block px-4 py-3 text-gray-700 hover:text-[#e69204] hover:bg-orange-50 rounded-lg font-medium transition-all">
                Brands
              </Link>
              <Link href="/track-order" className="block px-4 py-3 text-gray-700 hover:text-[#e69204] hover:bg-orange-50 rounded-lg font-medium transition-all">
                Track Order
              </Link>
              <Link href="/help" className="block px-4 py-3 text-gray-700 hover:text-[#e69204] hover:bg-orange-50 rounded-lg font-medium transition-all">
                Support
              </Link>
            </div>
          </div>
        )} */}
      </div>
    </header>
  );
} 