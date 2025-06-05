'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface StatusContextType {
  brandStatus: any[];
  categoryStatus: any[];
  userStatus: any[];
  couponStatus: any[];
  orderStatus: any[];
  setStatuses: (brand: any[], category: any[], user_status: any[], coupon_status: any[], order_status: any[]) => void;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export function StatusProvider({ children }: { children: ReactNode }) {
  const [brandStatus, setBrandStatus] = useState<any[]>([]);
  const [categoryStatus, setCategoryStatus] = useState<any[]>([]);
  const [userStatus, setUserStatus] = useState<any[]>([]);
  const [couponStatus, setCouponStatus] = useState<any[]>([]);
  const [orderStatus, setOrderStatus] = useState<any[]>([]);


  const setStatuses = (brand: any[], category: any[], user_status: any[], coupon_status: any[], order_status: any[]) => {
    setBrandStatus(brand);
    setCategoryStatus(category);
    setUserStatus(user_status);
    setCouponStatus(coupon_status);
    setOrderStatus(order_status);
  };

  return (
    <StatusContext.Provider 
      value={{ 
        brandStatus, 
        categoryStatus, 
        userStatus,
        couponStatus,
        orderStatus,
        setStatuses 
      }}
    >
      {children}
    </StatusContext.Provider>
  );
}

export function useStatus() {
  const context = useContext(StatusContext);
  if (context === undefined) {
    throw new Error('useStatus must be used within a StatusProvider');
  }
  return context;
} 