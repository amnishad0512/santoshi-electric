'use client';

import ProtectedPage from '@/components/ProtectedPage';

export default function ProfilePage() {
  return (
    <ProtectedPage allowedRoles={['user']}>
      <div>
        <h1>Profile</h1>
        <p>Your profile information will be displayed here.</p>
      </div>
    </ProtectedPage>
  );
} 