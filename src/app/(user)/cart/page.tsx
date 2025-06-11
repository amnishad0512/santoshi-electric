'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import ProtectedPage from '@/components/ProtectedPage';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const router = useRouter();

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
    } else {
      updateQuantity(id, quantity);
    }
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <ProtectedPage allowedRoles={['user']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {state.items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <button 
              onClick={() => router.push('/products')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
                >
                  {item.image && (
                    <div className="w-24 h-24 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1 border rounded text-sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      className="px-3 py-1 border rounded text-sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="w-24 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-bold">${state.total.toFixed(2)}</span>
              </div>
              <div className="flex gap-4 justify-end">
                <button 
                  className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </ProtectedPage>
  );
};

export default CartPage; 