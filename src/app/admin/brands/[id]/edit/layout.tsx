import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Brand',
  description: 'Edit brand details',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
} 