import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import { CommonDataProvider } from '@/contexts/CommonDataContext';
import { StatusProvider } from '@/contexts/StatusContext';
import LayoutContent from "@/components/layout/LayoutContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Santoshi Electric - Your One-Stop Electronics Shop",
  description: "Find the best electronics and electrical equipment at Santoshi Electric. Quality products at competitive prices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CommonDataProvider>
          <AuthProvider>
            <StatusProvider>
              <LayoutContent>{children}</LayoutContent>
            </StatusProvider>
          </AuthProvider>
        </CommonDataProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
