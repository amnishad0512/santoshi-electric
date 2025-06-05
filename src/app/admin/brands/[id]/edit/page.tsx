// File: app/admin/brands/[id]/edit/page.tsx

import { Suspense } from 'react';
import BrandEdit from './BrandEdit';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrandEdit id={params.id} />
    </Suspense>
  );
}
