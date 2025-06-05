import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Coupon',
  description: 'Edit coupon details',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
} 