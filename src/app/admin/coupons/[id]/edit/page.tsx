'use client';

import { Suspense } from 'react';
import EditCouponForm from './EditCouponForm';

interface Props {
  params: { id: string };
}

async function getData(id: string) {
  // You can add actual data fetching here if needed
  return { id };
}

export default async function Page({ params }: Props) {
  await getData(params.id); // Ensure we have async operation

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditCouponForm id={params.id} />
    </Suspense>
  );
} 