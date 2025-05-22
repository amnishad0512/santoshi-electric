import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Toaster } from 'react-hot-toast';

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
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
