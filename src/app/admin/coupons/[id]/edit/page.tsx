import { Metadata } from 'next';
import EditCouponForm from './EditCouponForm';

export const metadata: Metadata = {
  title: 'Edit Coupon',
  description: 'Edit coupon details',
};

// Enable dynamic rendering for this route
export const dynamic = 'force-dynamic';

export default function Page({
  params,
}: {
  params: { id: string };
}) {
  return <EditCouponForm id={params.id} />;
} 