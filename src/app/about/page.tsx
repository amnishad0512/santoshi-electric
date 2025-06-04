import ProtectedPage from '@/components/ProtectedPage';
import React from 'react';

const AboutPage = () => {
  return (
    <ProtectedPage allowedRoles={['guest', 'user']}>
    <div style={{ padding: '20px' }}>
      <h1>About Us</h1>
      <p>Learn more about our company and values.</p>
    </div>
    </ProtectedPage>
  );
};

export default AboutPage; 