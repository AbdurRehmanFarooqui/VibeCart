import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { CartProvider } from "@/context/CartContext";
import { Suspense } from "react";
import WelcomePopup from "@/components/WelcomePopup";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

<meta name="apple-mobile-web-app-title" content="Vibe Cart" />
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vibe Cart | Catch the Vibe",
  description: "VibeCart is your go-to online store for stylish and affordable accessories. From watches and fragrances to wallets, jewelry, and everyday essentials, we bring trendy, quality products that match your vibe without breaking your budget.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey="pk_test_cnVsaW5nLW1hbW1vdGgtMzIuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <html lang="en" className="scroll-smooth ">
        <body className={`${inter.className} bg-[#050505] text-white min-h-screen`}>

          <WelcomePopup />
          <CartProvider>
            <Navbar />
            {/* 2. Wrap SmoothScroll in Suspense to fix the build error */}
            <Suspense fallback={null}>
              <SmoothScroll />
            </Suspense>
            {children}
            <Footer />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}