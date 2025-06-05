import { Metadata } from 'next';
import BrandEdit from './BrandEdit';

export const metadata: Metadata = {
  title: 'Edit Brand',
  description: 'Edit brand details',
};

// Enable dynamic rendering for this route
export const dynamic = 'force-dynamic';

export default function Page({
  params,
}: {
  params: { id: string };
}) {
  return <BrandEdit id={params.id} />;
} 