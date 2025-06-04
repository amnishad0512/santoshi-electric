import React from 'react';
import ProtectedPage from '@/components/ProtectedPage';
const DealsPage = () => {
  return (
    <ProtectedPage allowedRoles={['user']}>
    <div style={{ padding: '20px' }}>
      <h1>Deals</h1>
      <p>Check out our latest deals and discounts.</p>
    </div>
    </ProtectedPage>
  );
};

export default DealsPage; 