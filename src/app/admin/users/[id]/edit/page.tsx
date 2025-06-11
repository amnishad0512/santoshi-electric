import { Suspense } from 'react';
import EditUserForm from './EditUserForm';
import api from '@/lib/axios';

export async function generateStaticParams() {
  try {
    const response = await api.get('/users');
    const users = response.data;
    return users.map((user: { id: string }) => ({
      id: user.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  // Parse the params to ensure we have a plain object
  const { id } = await params;

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <EditUserForm userId={id} />
    </Suspense>
  );
} 