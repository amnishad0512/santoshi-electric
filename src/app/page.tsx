'use client';

import Image from "next/image";
import ProtectedPage from "@/components/ProtectedPage";
import { useEffect, useState } from "react";
import authService from '@/services/auth.service';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const auth = authService.isAuthenticated();
      setIsAuthenticated(auth);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ProtectedPage allowedRoles={['guest', 'user']}>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to Santoshi Electric</h1>
            <p className="text-xl mb-8">Discover amazing deals and new collections on electronics</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300">
              Shop Now
            </button>
          </div>
        </section>

        {/* Discounts and Deals */}
        <section className="py-16">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Discounts & Deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Image src="https://source.unsplash.com/300x200/?electronics" alt="Deal 1" width={300} height={200} className="rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">50% Off on Electronics</h3>
                <p className="mt-2 text-gray-300">Grab the best deals on top electronics like TVs, laptops, and more.</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Image src="https://source.unsplash.com/300x200/?gadgets" alt="Deal 2" width={300} height={200} className="rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">Buy 1 Get 1 Free</h3>
                <p className="mt-2 text-gray-300">Exclusive offer on select mobile phones and accessories.</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Image src="https://source.unsplash.com/300x200/?appliances" alt="Deal 3" width={300} height={200} className="rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">Up to 30% Off on Home Appliances</h3>
                <p className="mt-2 text-gray-300">Upgrade your home with the latest appliances at discounted prices.</p>
              </div>
            </div>
          </div>
        </section>

        {/* New Collections */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">New Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Image src="https://source.unsplash.com/300x200/?summer,collection" alt="Collection 1" width={300} height={200} className="rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">Summer Collection</h3>
                <p className="mt-2 text-gray-300">Explore our latest summer collection of cool gadgets and devices.</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Image src="https://source.unsplash.com/300x200/?smart,home" alt="Collection 2" width={300} height={200} className="rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">Smart Home Devices</h3>
                <p className="mt-2 text-gray-300">Make your home smarter with our new range of smart home devices.</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Image src="https://source.unsplash.com/300x200/?gaming,gear" alt="Collection 3" width={300} height={200} className="rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">Gaming Gear</h3>
                <p className="mt-2 text-gray-300">Level up your gaming experience with our latest gaming gear collection.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Electronics Categories */}
        <section className="py-16">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Explore Our Electronics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Image src="https://source.unsplash.com/300x200/?tv" alt="TV" width={300} height={200} className="rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">TV</h3>
                <p className="mt-2 text-gray-300">Discover our range of smart and LED TVs with stunning visuals.</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Image src="https://source.unsplash.com/300x200/?cooler" alt="Cooler" width={300} height={200} className="rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">Cooler</h3>
                <p className="mt-2 text-gray-300">Stay cool with our efficient coolers.</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Image src="https://source.unsplash.com/300x200/?fridge" alt="Fridge" width={300} height={200} className="rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">Fridge</h3>
                <p className="mt-2 text-gray-300">Keep your food fresh with our energy-efficient refrigerators.</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Image src="https://source.unsplash.com/300x200/?washing-machine" alt="Washing Machine" width={300} height={200} className="rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">Washing Machine</h3>
                <p className="mt-2 text-gray-300">Discover our range of washing machines for effortless laundry.</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Image src="https://source.unsplash.com/300x200/?lights" alt="Lights" width={300} height={200} className="rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">Lights (LED, Tube)</h3>
                <p className="mt-2 text-gray-300">Brighten your home with our LED and tube lights.</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Image src="https://source.unsplash.com/300x200/?ceiling-fan" alt="Ceiling Fan" width={300} height={200} className="rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">Ceiling Fan</h3>
                <p className="mt-2 text-gray-300">Cool your space with our stylish ceiling fans.</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Image src="https://source.unsplash.com/300x200/?home-theatre" alt="Home Theatre" width={300} height={200} className="rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">Home Theatre</h3>
                <p className="mt-2 text-gray-300">Experience cinema-quality sound with our home theatres.</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Image src="https://source.unsplash.com/300x200/?speaker" alt="Speaker" width={300} height={200} className="rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">Speaker</h3>
                <p className="mt-2 text-gray-300">Enjoy high-quality sound with our speakers.</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Image src="https://source.unsplash.com/300x200/?induction" alt="Induction" width={300} height={200} className="rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">Induction</h3>
                <p className="mt-2 text-gray-300">Cook efficiently with our induction cooktops.</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Image src="https://source.unsplash.com/300x200/?exhaust-fan" alt="Exhaust Fan" width={300} height={200} className="rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">Exhaust Fan</h3>
                <p className="mt-2 text-gray-300">Ventilate your space with our exhaust fans.</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Image src="https://source.unsplash.com/300x200/?wire" alt="Wire" width={300} height={200} className="rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">Wire</h3>
                <p className="mt-2 text-gray-300">Find durable wires for all your electrical needs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Visuals */}
        <style jsx>{`
          .hero-section {
            background-image: url('https://source.unsplash.com/1600x900/?electronics');
            background-size: cover;
            background-position: center;
          }
        `}</style>
      </div>
    </ProtectedPage>
  );
}
