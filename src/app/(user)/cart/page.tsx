import ProtectedPage from '@/components/ProtectedPage';

export default function CartPage() {
  return (
    <ProtectedPage allowedRoles={['user']}>
      <div>
        <h1>Cart</h1>
        <p>Your cart items will be displayed here.</p>
      </div>
    </ProtectedPage>
  );
} 