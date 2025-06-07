import { Metadata } from 'next';
import SubCategoryEdit from './SubCategoryEdit';

export const metadata: Metadata = {
  title: 'Edit SubCategory | Admin Dashboard',
  description: 'Edit an existing subcategory in your e-commerce platform',
};

export default function EditSubCategoryPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <SubCategoryEdit id={params.id} />
    </div>
  );
}

export async function generateStaticParams() {
  return [];
} 