'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className={!isAdminRoute ? "pt-20" : ""}>
        {children}
      </main>
    </>
  );
} 