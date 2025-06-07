import { Metadata } from 'next';
import SubSubCategoryCreate from './SubSubCategoryCreate';

export const metadata: Metadata = {
  title: 'Create Sub-SubCategory | Admin Dashboard',
  description: 'Create a new sub-subcategory in your e-commerce platform',
};

export default function CreateSubSubCategoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SubSubCategoryCreate />
    </div>
  );
} 