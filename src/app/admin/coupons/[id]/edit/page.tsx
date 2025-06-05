import EditCouponForm from './EditCouponForm';

export default function Page({ params }: { params: { id: string } }) {
  return <EditCouponForm id={params.id} />;
} 