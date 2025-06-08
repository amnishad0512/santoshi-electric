'use client';

import AdminSidebar from '@/components/layout/AdminSidebar';
import ProtectedPage from '@/components/ProtectedPage';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedPage allowedRoles={['admin']}>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </ProtectedPage>
  );
} 