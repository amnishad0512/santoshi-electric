import { Metadata } from 'next';
import SubSubCategoriesList from './SubSubCategoriesList';

export const metadata: Metadata = {
  title: 'Sub-SubCategories | Admin Dashboard',
  description: 'Manage sub-subcategories in your e-commerce platform',
};

export default function SubSubCategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SubSubCategoriesList />
    </div>
  );
} 