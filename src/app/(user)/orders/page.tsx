'use client';

import React from 'react';
import ProtectedPage from '@/components/ProtectedPage';

const OrdersPage = () => {
  return (
    <ProtectedPage allowedRoles={['user']}>
      <div style={{ padding: '20px' }}>
        <h1>Our Order</h1>
        <p>Explore our wide range of products.</p>
      </div>
    </ProtectedPage>
  );
};

export default OrdersPage; 