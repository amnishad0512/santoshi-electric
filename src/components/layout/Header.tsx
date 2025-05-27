'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import authService from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(authService.isAuthenticated());
      setUser(authService.getCurrentUser());
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = async () => {
    Cookies.remove('token');
    localStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
    router.push('/');
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white backdrop-blur-md bg-opacity-90 shadow-lg w-full fixed top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-500 transition-all">
              SantoshiElectric
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <div className="relative group">
              <Link href="/electronics" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Electronics
              </Link>
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 max-h-64 overflow-y-auto">
                <div className="px-4 py-2 text-sm font-semibold text-gray-900">Home Appliances</div>
                <Link href="/electronics/tv" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">TV</Link>
                <Link href="/electronics/fridge" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Fridge</Link>
                <Link href="/electronics/washing-machine" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Washing Machine</Link>
                <Link href="/electronics/cooler" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cooler</Link>
                <Link href="/electronics/induction" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Induction</Link>
                <div className="px-4 py-2 text-sm font-semibold text-gray-900">Lighting</div>
                <Link href="/electronics/lights" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Lights (LED, Tube)</Link>
                <Link href="/electronics/ceiling-fan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Ceiling Fan</Link>
                <Link href="/electronics/exhaust-fan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Exhaust Fan</Link>
                <div className="px-4 py-2 text-sm font-semibold text-gray-900">Audio & Entertainment</div>
                <Link href="/electronics/home-theatre" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home Theatre</Link>
                <Link href="/electronics/speaker" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Speaker</Link>
                <div className="px-4 py-2 text-sm font-semibold text-gray-900">Electrical Accessories</div>
                <Link href="/electronics/wire" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Wire</Link>
              </div>
            </div>
            
            <Link href="/home-kitchen" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home & Kitchen
            </Link>
            <Link href="/deals" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Deals
            </Link>
          </nav>

          {/* Search, Cart, and User */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-64 pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm bg-gray-50"
              />
              <span className="absolute left-3.5 top-3 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
            
            <button className="relative text-gray-700 hover:text-blue-600 transition-colors" onClick={() => router.push('/cart')}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                  {cartCount}
                </span>
              )}
            </button>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button 
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link href="/change-password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Change Password</Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
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
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors p-2"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-white border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link href="/electronics" className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2" onClick={handleMenuItemClick}>
                Electronics
              </Link>
          
              <Link href="/home-kitchen" className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2" onClick={handleMenuItemClick}>
                Home & Kitchen
              </Link>
              <Link href="/deals" className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2" onClick={handleMenuItemClick}>
                Deals
              </Link>
              <Link href="/cart" className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2" onClick={handleMenuItemClick}>
                Cart
              </Link>
              <div className="relative px-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm bg-gray-50"
                />
                <span className="absolute left-7 top-3 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </div>
              {isAuthenticated ? (
                <div className="px-4 py-2">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{user?.name}</div>
                      <div className="text-gray-500">{user?.email}</div>
                    </div>
                  </div>
                  <Link href="/profile" className="block py-2 text-gray-700 hover:text-blue-600" onClick={handleMenuItemClick}>Profile</Link>
                  <Link href="/change-password" className="block py-2 text-gray-700 hover:text-blue-600" onClick={handleMenuItemClick}>Change Password</Link>
                  <Link href="/orders" className="block py-2 text-gray-700 hover:text-blue-600" onClick={handleMenuItemClick}>Orders</Link>
                  <button 
                    onClick={() => { handleLogout(); handleMenuItemClick(); }}
                    className="block w-full text-left py-2 text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login"
                  className="mx-4 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  onClick={handleMenuItemClick}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 