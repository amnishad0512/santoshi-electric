import ChangePasswordPage from '@/components/layout/ChangePasswordPage';
import React, { Suspense } from 'react';

export default function ChangePassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangePasswordPage />
    </Suspense>
  );
}
