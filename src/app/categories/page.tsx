import ProtectedPage from '@/components/ProtectedPage';
import React from 'react';

const CategoriesPage = () => {
  return (
    <ProtectedPage allowedRoles={['guest', 'user']}>
    <div style={{ padding: '20px' }}>
      <h1>Categories</h1>
      <p>Browse products by categories.</p>
    </div>
    </ProtectedPage>
  );
};

export default CategoriesPage; 