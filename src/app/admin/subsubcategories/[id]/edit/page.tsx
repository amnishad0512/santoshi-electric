import { Metadata } from 'next';
import SubSubCategoryEdit from './SubSubCategoryEdit';

export const metadata: Metadata = {
  title: 'Edit Sub-SubCategory | Admin Dashboard',
  description: 'Edit an existing sub-subcategory in your e-commerce platform',
};

export default function EditSubSubCategoryPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <SubSubCategoryEdit id={params.id} />
    </div>
  );
}

export async function generateStaticParams() {
  return [];
} 