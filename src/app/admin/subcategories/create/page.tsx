import { Metadata } from 'next';
import SubCategoryCreate from './SubCategoryCreate';

export const metadata: Metadata = {
  title: 'Create SubCategory | Admin Dashboard',
  description: 'Create a new subcategory in your e-commerce platform',
};

export default function CreateSubCategoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SubCategoryCreate />
    </div>
  );
} 