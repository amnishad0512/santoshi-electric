'use client';

import ProtectedPage from '@/components/ProtectedPage';
import { useRouter } from 'next/navigation';
export default function AdminPage() {
  const router = useRouter();
  router.push('/admin/dashboard');
  return (
    <ProtectedPage allowedRoles={['admin']}>
      <div>
        <h1>Admin Panel</h1>
        {/* Your admin panel content */}
      </div>
    </ProtectedPage>
  );
} 