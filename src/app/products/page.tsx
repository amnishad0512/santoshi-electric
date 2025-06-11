'use client';

import ProtectedPage from '@/components/ProtectedPage';
import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Filter, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'tv', name: 'TVs & Displays' },
    { id: 'cooling', name: 'Air Cooling' },
    { id: 'refrigerator', name: 'Refrigerators' },
    { id: 'washing', name: 'Washing Machines' },
    { id: 'lighting', name: 'Lighting' },
    { id: 'fans', name: 'Fans' },
    { id: 'audio', name: 'Audio Systems' },
    { id: 'kitchen', name: 'Kitchen Appliances' },
  ];

  const brands = [
    'Havells', 'Crompton', 'Orient', 'Philips', 'Bajaj', 'Luminous',
    'V-Guard', 'Syska', 'Polycab', 'Finolex'
  ];

  // Sample products data
  const products = [
    {
      id: 1,
      name: 'Smart LED TV',
      brand: 'Havells',
      category: 'tv',
      price: 32999,
      rating: 4.5,
      image: '/images/tv.jpg',
      discount: '20% off',
      inStock: true
    },
    {
      id: 2,
      name: 'Desert Air Cooler',
      brand: 'Crompton',
      category: 'cooling',
      price: 8499,
      rating: 4.3,
      image: '/images/cooler.jpg',
      discount: '15% off',
      inStock: true
    },
    {
      id: 3,
      name: 'Double Door Refrigerator',
      brand: 'Philips',
      category: 'refrigerator',
      price: 28999,
      rating: 4.7,
      image: '/images/fridge.jpg',
      discount: '10% off',
      inStock: true
    },
    {
      id: 4,
      name: 'Premium Ceiling Fan',
      brand: 'Orient',
      category: 'fans',
      price: 2499,
      rating: 4.4,
      image: '/images/fan.jpg',
      discount: '25% off',
      inStock: true
    },
    {
      id: 5,
      name: 'Smart LED Strip Lights',
      brand: 'Syska',
      category: 'lighting',
      price: 1499,
      rating: 4.2,
      image: '/images/led-strip.jpg',
      inStock: true
    },
    {
      id: 6,
      name: 'Automatic Washing Machine',
      brand: 'Bajaj',
      category: 'washing',
      price: 25999,
      rating: 4.6,
      image: '/images/washing.jpg',
      discount: '12% off',
      inStock: false
    },
    {
      id: 7,
      name: 'Home Theater System',
      brand: 'Philips',
      category: 'audio',
      price: 15999,
      rating: 4.5,
      image: '/images/audio.jpg',
      discount: '18% off',
      inStock: true
    },
    {
      id: 8,
      name: 'Microwave Oven',
      brand: 'Havells',
      category: 'kitchen',
      price: 9999,
      rating: 4.3,
      image: '/images/microwave.jpg',
      inStock: true
    },
    {
      id: 9,
      name: 'LED Panel Light',
      brand: 'Syska',
      category: 'lighting',
      price: 2999,
      rating: 4.4,
      image: '/images/panel.jpg',
      discount: '8% off',
      inStock: true
    },
    {
      id: 10,
      name: 'Inverter AC',
      brand: 'Crompton',
      category: 'cooling',
      price: 35999,
      rating: 4.8,
      image: '/images/ac.jpg',
      discount: '22% off',
      inStock: true
    },
    {
      id: 11,
      name: 'Electric Kettle',
      brand: 'Bajaj',
      category: 'kitchen',
      price: 1299,
      rating: 4.1,
      image: '/images/kettle.jpg',
      inStock: true
    },
    {
      id: 12,
      name: 'Tower Fan',
      brand: 'Orient',
      category: 'fans',
      price: 4999,
      rating: 4.3,
      image: '/images/tower-fan.jpg',
      discount: '15% off',
      inStock: true
    },
    {
      id: 13,
      name: 'Side by Side Refrigerator',
      brand: 'Luminous',
      category: 'refrigerator',
      price: 65999,
      rating: 4.9,
      image: '/images/side-fridge.jpg',
      discount: '10% off',
      inStock: false
    },
    {
      id: 14,
      name: 'Bluetooth Speaker',
      brand: 'Philips',
      category: 'audio',
      price: 3999,
      rating: 4.4,
      image: '/images/speaker.jpg',
      inStock: true
    },
    {
      id: 15,
      name: 'Smart Chandelier',
      brand: 'Havells',
      category: 'lighting',
      price: 12999,
      rating: 4.7,
      image: '/images/chandelier.jpg',
      discount: '20% off',
      inStock: true
    }
  ];

  return (
    <ProtectedPage allowedRoles={['guest', 'user']}>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Filter Button */}
        <div className="lg:hidden bg-white shadow-sm p-4 sticky top-0 z-50">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Filter className="w-5 h-5 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6">Filters</h2>

                {/* Categories */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={selectedCategory === category.id}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="form-radio text-blue-600"
                        />
                        <span className="ml-2">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Brands</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          value={brand}
                          checked={selectedBrand === brand}
                          onChange={(e) => setSelectedBrand(e.target.value)}
                          className="form-checkbox text-blue-600"
                        />
                        <span className="ml-2">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Availability</h3>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600"
                    />
                    <span className="ml-2">In Stock Only</span>
                  </label>
                </div>

                {/* Clear Filters Button */}
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBrand('all');
                    setPriceRange([0, 50000]);
                  }}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              {/* Sort Bar */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
                <span className="text-gray-600">{products.length} products</span>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
                    {/* Product Image */}
                    <div className="relative h-64">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.discount && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {product.discount}
                        </div>
                      )}
                      <button className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                        <Heart className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">{product.brand}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-blue-600 font-bold">₹{product.price.toLocaleString()}</p>
                        <button className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-8">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow hover:shadow-md transition-shadow">
                  Load More Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
};

export default ProductsPage; 