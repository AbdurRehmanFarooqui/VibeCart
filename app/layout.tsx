import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { CartProvider } from "@/context/CartContext";
import { Suspense } from "react";
import WelcomePopup from "@/components/WelcomePopup";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SaleBar from "@/components/SaleBar";
import WhatsAppFAB from "@/components/WhatsAppFAB";
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
    <html lang="en" className="scroll-smooth ">
      <body className={`${inter.className} bg-[#050505] text-white min-h-screen`}>

        <WelcomePopup />
        <WhatsAppFAB/>
        <SaleBar />
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
  );
}