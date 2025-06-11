'use client';

import Image from "next/image";
import ProtectedPage from "@/components/ProtectedPage";
import { useEffect, useState } from "react";
import authService from '@/services/auth.service';
import {
  ChevronRight,
  ChevronLeft,
  Tv,
  Fan,
  Refrigerator,
  Lightbulb,
  Speaker,
  Microwave,
  Zap,
  Star,
  Heart,
  Eye,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle
} from 'lucide-react';
import Loader from "@/components/common/Loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [visibleBrands, setVisibleBrands] = useState(6); // Default to desktop

  // Define brands array before useEffect hooks
  const brands = [
    'Samsung', 'LG', 'Sony', 'Panasonic', 'Whirlpool', 'Bosch',
    'Havells', 'Crompton', 'Orient', 'Bajaj', 'Philips', 'Godrej'
  ];

  useEffect(() => {
    const checkAuth = () => {
      const auth = authService.isAuthenticated();
      setIsAuthenticated(auth);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Handle responsive screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleBrands(2); // Mobile: 2 brands
      } else if (width < 1024) {
        setVisibleBrands(4); // Tablet: 4 brands
      } else {
        setVisibleBrands(6); // Desktop: 6 brands
      }
      setCurrentBrandIndex(0); // Reset carousel position on resize
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide effect for brands carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBrandIndex((prevIndex) => {
        const maxIndex = brands.length - visibleBrands;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval);
  }, [brands.length, visibleBrands]);

  const nextBrands = () => {
    setCurrentBrandIndex((prevIndex) => {
      const maxIndex = brands.length - visibleBrands;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevBrands = () => {
    setCurrentBrandIndex((prevIndex) => {
      const maxIndex = brands.length - visibleBrands;
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f9f7f3]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e69204]"></div>
      </div>
    );
  }

  const categories = [
    { name: 'TVs & Displays', icon: Tv, count: '200+' },
    { name: 'Air Cooling', icon: Fan, count: '150+' },
    { name: 'Refrigerators', icon: Refrigerator, count: '80+' },
    { name: 'Lighting', icon: Lightbulb, count: '300+' },
    { name: 'Audio Systems', icon: Speaker, count: '120+' },
    { name: 'Kitchen Appliances', icon: Microwave, count: '180+' },
    { name: 'Electrical', icon: Zap, count: '250+' },
    { name: 'Fans', icon: Fan, count: '100+' },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Samsung 55" 4K Smart TV',
      category: 'TVs & Displays',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
      price: '₹42,999',
      originalPrice: '₹52,999',
      discount: 19,
      rating: 4.5,
      reviews: 2341
    },
    {
      id: 2,
      name: 'LG Inverter AC 1.5 Ton',
      category: 'Air Cooling',
      image: 'https://images.unsplash.com/photo-1631545177021-7fd1ee781d43?w=400',
      price: '₹35,999',
      originalPrice: '₹45,999',
      discount: 22,
      rating: 4.3,
      reviews: 1876
    },
    {
      id: 3,
      name: 'Whirlpool Double Door Fridge',
      category: 'Refrigerators',
      image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400',
      price: '₹28,999',
      originalPrice: '₹35,999',
      discount: 19,
      rating: 4.4,
      reviews: 987
    },
    {
      id: 4,
      name: 'Havells Ceiling Fan',
      category: 'Fans',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      price: '₹3,299',
      originalPrice: '₹4,999',
      discount: 34,
      rating: 4.6,
      reviews: 3456
    }
  ];

  return (
    <ProtectedPage allowedRoles={['guest', 'user']}>
      <div className="min-h-screen flex flex-col bg-[#f9f7f3]">

        <main className="flex-grow">
          {/* Categories Navigation */}
          {/* <div className="bg-[#10100e] py-4">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center space-x-8 overflow-x-auto">
                {categories.slice(0, 6).map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-2 cursor-pointer whitespace-nowrap text-white hover:text-[#e69204] font-medium transition-colors"
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="text-sm">{category.name}</span>
                    </div>
                  );
                })}
                <button className="text-[#e69204] hover:text-[#cd812d] font-medium flex items-center">
                  All Categories <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div> */}

          {/* Hero Banner */}
          <div className="relative h-[600px] w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200"
              alt="Electronics Deal"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#10100e]/90 via-[#10100e]/50 to-transparent">
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl text-white">
                  <div className="inline-block bg-[#e69204] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    🔥 MEGA SALE
                  </div>
                  <h1 className="text-6xl font-bold mb-6 leading-tight">
                    Summer Electronics
                    <span className="text-[#e69204] block">Bonanza</span>
                  </h1>
                  <p className="text-xl mb-8 text-gray-300">
                    Get up to 60% off on premium electronics and home appliances.
                    Free installation & 2-year warranty included.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button className="bg-[#e69204] hover:bg-[#d46a04] text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all transform hover:scale-105">
                      Shop Now
                    </button>
                    <button className="border-2 border-white text-white hover:bg-white hover:text-[#10100e] px-8 py-4 rounded-full font-semibold transition-all">
                      View Deals
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="container mx-auto px-4 py-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#10100e] mb-4">Shop by Category</h2>
              <p className="text-[#b87317] text-lg">Discover our wide range of premium electronics</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all cursor-pointer group hover:-translate-y-2"
                  >
                    <div className="bg-gradient-to-br from-[#e69204] to-[#d46a04] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-[#10100e] mb-2">{category.name}</h3>
                    <p className="text-[#b87317] text-sm">{category.count} products</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Featured Products */}
          <div className="bg-white py-20">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="text-4xl font-bold text-[#10100e] mb-2">Featured Products</h2>
                  <p className="text-[#b87317]">Best selling items this month</p>
                </div>
                <button className="text-[#e69204] hover:text-[#cd812d] font-semibold flex items-center transition-colors">
                  View All <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="bg-[#f9f7f3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-[#e69204] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        -{product.discount}%
                      </div>
                      <div className="absolute top-4 right-4 flex flex-col space-y-2">
                        <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow transition-colors">
                          <Heart className="w-4 h-4 text-[#b87317]" />
                        </button>
                        <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow transition-colors">
                          <Eye className="w-4 h-4 text-[#b87317]" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-sm text-[#b87317] mb-2">{product.category}</p>
                      <h3 className="font-semibold text-[#10100e] mb-3 line-clamp-2">{product.name}</h3>

                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-[#e69204] fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-[#b87317] ml-2">({product.reviews})</span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-xl font-bold text-[#e69204]">{product.price}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                        </div>
                      </div>

                      <button className="w-full bg-[#e69204] hover:bg-[#d46a04] text-white py-3 rounded-xl font-semibold transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Promotional Banner */}
          <div className="bg-[#e69204] py-20">
            <div className="container mx-auto px-4 text-center text-white">
              <h2 className="text-5xl font-bold mb-6">Premium Quality Electronics</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Discover our exclusive collection of top-rated appliances with
                extended warranty and free installation services.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button className="bg-white text-[#e69204] px-8 py-4 rounded-full font-semibold hover:bg-[#f5e2c0] shadow-lg transition-all transform hover:scale-105">
                  Explore Collection
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-[#e69204] px-8 py-4 rounded-full font-semibold transition-all">
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* Brands Section */}
          <div className="container mx-auto px-4 py-18">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-[#10100e] mb-4">Trusted Brands</h2>
              <p className="text-[#b87317] text-sm md:text-base">We partner with the world's leading manufacturers</p>
            </div>

            {/* Animated Carousel Container */}
            <div className="relative max-w-6xl mx-auto overflow-hidden h-35">
              {/* Navigation Buttons */}
              {/* <button
                onClick={prevBrands}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 md:left-4"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#e69204]" />
              </button>
               */}
              {/* <button
                onClick={nextBrands}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 md:right-4"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#e69204]" />
              </button> */}

              {/* Carousel Track */}
              <div className="flex transition-transform duration-1000 ease-in-out px-8 md:px-12"
                style={{
                  transform: `translateX(-${currentBrandIndex * (100 / visibleBrands)}%)`
                }}>
                {brands.map((brand, index) => (
                  <div
                    key={index}
                    className="min-w-[50%] md:min-w-[25%] lg:min-w-[16.666%] px-2 md:px-3"
                  >
                    <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-8 flex items-center justify-center hover:shadow-2xl transition-all duration-500 cursor-pointer group transform">
                      <span className="text-sm md:text-xl font-bold text-[#e69204] hover:text-[#d46a04] transition-all duration-500 text-center group-hover:scale-110">
                        {brand}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({
                  length: Math.max(1, brands.length - visibleBrands + 1)
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBrandIndex(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${currentBrandIndex === index
                        ? 'bg-[#e69204] scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="bg-black py-12">
            <div className="max-w-3xl mx-auto text-center">
              <h4 className="text-2xl font-bold text-white mb-3">Stay Updated</h4>
              <p className="text-gray-400 mb-8">Get exclusive deals, new arrivals, and electronics tips delivered to your inbox</p>
              <div className="flex max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
                />
                <button className="bg-gradient-to-r from-[#e69204] to-[#d46a04] hover:from-[#d46a04] hover:to-[#b87317] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative overflow-hidden bg-[#f9f7f3]">
          {/* Gradient Background */}
          <div className="absolute inset-0"></div>

          {/* Decorative Elements */}
          <div className="relative z-10">
            <div className="container mx-auto px-4">
              {/* Main Footer Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20">

                {/* Company Info */}
                <div className="lg:col-span-1">
                  <div className="flex items-center mb-6">
                    {/* <div className="w-12 h-12 bg-gradient-to-br from-[#e69204] to-[#d46a04] rounded-xl flex items-center justify-center mr-4">
                      <Zap className="w-6 h-6 text-white" />
                    </div> */}
                    <h3 className="text-2xl font-bold text-[#e69204]">Santoshi Electric</h3>
                  </div>
                  <p className="text-[#666666] text-sm leading-relaxed mb-6">
                    Your trusted destination for premium electronics and home appliances.
                    We bring the best quality at unbeatable prices with exceptional service.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-[#e69204]/20 shadow-sm">
                      <div className="text-[#e69204] text-2xl font-bold">25+</div>
                      <div className="text-[#666666] text-xs">Years Experience</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-[#e69204]/20 shadow-sm">
                      <div className="text-[#e69204] text-2xl font-bold">10K+</div>
                      <div className="text-[#666666] text-xs">Happy Customers</div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex space-x-4">
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/80 hover:bg-[#1877F2] border border-[#e69204]/20 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-sm group"
                    >
                      <Facebook className="w-5 h-5 text-[#1877F2] group-hover:text-white transition-colors" />
                    </a>
                    <a 
                      href="https://wa.me/911234567890" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/80 hover:bg-[#25D366] border border-[#e69204]/20 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-sm group"
                    >
                      <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors" />
                    </a>
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/80 hover:bg-gradient-to-r hover:from-[#E4405F] hover:to-[#C13584] border border-[#e69204]/20 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-sm group"
                    >
                      <Instagram className="w-5 h-5 text-[#E4405F] group-hover:text-white transition-colors" />
                    </a>
                    <a 
                      href="https://youtube.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/80 hover:bg-[#FF0000] border border-[#e69204]/20 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-sm group"
                    >
                      <Youtube className="w-5 h-5 text-[#FF0000] group-hover:text-white transition-colors" />
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="text-lg font-semibold text-[#10100e] mb-6 flex items-center">
                    <div className="w-2 h-6 bg-gradient-to-b from-[#e69204] to-[#d46a04] rounded-full mr-3"></div>
                    Quick Links
                  </h4>
                  <ul className="space-y-4">
                    {["All Products", "Categories", "Best Deals", "New Arrivals", "Customer Support", "Track Order"].map((item) => (
                      <li key={item}>
                        <a href="#" className="text-[#666666] hover:text-[#e69204] transition-colors duration-300 text-sm flex items-center group">
                          <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#e69204]" />
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Customer Service */}
                <div>
                  <h4 className="text-lg font-semibold text-[#10100e] mb-6 flex items-center">
                    <div className="w-2 h-6 bg-gradient-to-b from-[#e69204] to-[#d46a04] rounded-full mr-3"></div>
                    Customer Service
                  </h4>
                  <ul className="space-y-4">
                    {["Help Center", "Returns & Exchanges", "Warranty Info", "Installation Service", "Bulk Orders", "EMI Options"].map((item) => (
                      <li key={item}>
                        <a href="#" className="text-[#666666] hover:text-[#e69204] transition-colors duration-300 text-sm flex items-center group">
                          <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#e69204]" />
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="text-lg font-semibold text-[#10100e] mb-6 flex items-center">
                    <div className="w-2 h-6 bg-gradient-to-b from-[#e69204] to-[#d46a04] rounded-full mr-3"></div>
                    Contact Us
                  </h4>
                  <div className="space-y-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-[#e69204]/20 shadow-sm">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-[#e69204]/20 rounded-lg flex items-center justify-center mt-1">
                          <div className="w-4 h-4 bg-[#e69204] rounded-sm"></div>
                        </div>
                        <div>
                          <div className="text-[#10100e] font-medium text-sm mb-1">Store Location</div>
                          <div className="text-[#666666] text-xs">123 Electronics Street, Tech City, TC 12345</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-[#e69204]/20 shadow-sm">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-[#e69204]/20 rounded-lg flex items-center justify-center mt-1">
                          <div className="w-4 h-4 bg-[#e69204] rounded-sm"></div>
                        </div>
                        <div>
                          <div className="text-[#10100e] font-medium text-sm mb-1">Phone & Email</div>
                          <div className="text-[#666666] text-xs">+91 7692977552</div>
                          <div className="text-[#666666] text-xs">+91 7509155041</div>
                          <div className="text-[#666666] text-xs">info@santoshielectric.in</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-[#e69204]/20 shadow-sm">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-[#e69204]/20 rounded-lg flex items-center justify-center mt-1">
                          <div className="w-4 h-4 bg-[#e69204] rounded-sm"></div>
                        </div>
                        <div>
                          <div className="text-[#10100e] font-medium text-sm mb-1">Opening Hours</div>
                          <div className="text-[#666666] text-xs">Mon-Sat: 9AM-8PM</div>
                          <div className="text-[#666666] text-xs">Sun: 10AM-6PM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter Section */}


              {/* Footer Bottom */}
              <div className="border-t border-[#e69204]/20 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="text-[#666666] text-sm mb-4 md:mb-0">
                    &copy; 2025 <span className="text-[#e69204] font-semibold">Santoshi Electric</span>. All rights reserved.
                  </div>
                  <div className="flex space-x-6 text-sm">
                    <a href="/privacy-policy" className="text-[#666666] hover:text-[#e69204] transition-colors">Privacy Policy</a>
                    <a href="/terms-of-service" className="text-[#666666] hover:text-[#e69204] transition-colors">Terms of Service</a>
                    <a href="#" className="text-[#666666] hover:text-[#e69204] transition-colors">Cookie Policy</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ProtectedPage>
  );
}
