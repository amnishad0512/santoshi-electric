import { Metadata } from 'next';
import SubCategoriesList from './SubCategoriesList';

export const metadata: Metadata = {
  title: 'SubCategories | Admin Dashboard',
  description: 'Manage subcategories in your e-commerce platform',
};

export default function SubCategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SubCategoriesList />
    </div>
  );
} 