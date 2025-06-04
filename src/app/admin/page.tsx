'use client';

import ProtectedPage from '@/components/ProtectedPage';

export default function AdminPage() {
  return (
    <ProtectedPage allowedRoles={['admin']}>
      <div>
        <h1>Admin Panel</h1>
        {/* Your admin panel content */}
      </div>
    </ProtectedPage>
  );
} 