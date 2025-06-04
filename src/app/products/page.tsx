import ProtectedPage from '@/components/ProtectedPage';
import React from 'react';
const ProductsPage = () => {
  return (
    <ProtectedPage allowedRoles={['guest', 'user']}>
    <div style={{ padding: '20px' }}>
      <h1>Our Products</h1>
      <p>Explore our wide range of products.</p>
    </div>
    </ProtectedPage>
  );
};

export default ProductsPage; 