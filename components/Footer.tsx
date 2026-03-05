import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Twitter, Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] pt-20 pb-10 px-6 z-10 relative overflow-hidden border-t border-white/10">

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16 relative z-10">

        {/* 1. BRAND COLUMN */}
        <div className="space-y-6 max-w-sm">
          <div className="flex items-center gap-3">
            {/* Replace with your actual logo path */}
            <Image src="/vibecart-logo-transparent.png" alt="Vibe Cart" width={40} height={40} />
            <span className="text-2xl font-serif font-black text-white tracking-tighter uppercase">
              VIBE <span className="text-yellow-500">CART</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed font-light">
            To set the right expectations: We specialize in selling high-quality <strong className="text-white">copies of original watches</strong> and premium <strong className="text-white">branded perfume impressions</strong>.
          </p>

          {/* PAYMENT & TRUST */}
          <div className="pt-6">
            <p className="text-[10px] text-gray-500 font-bold mb-4 tracking-[0.2em] uppercase">Secure Transactions</p>
            <div className="flex flex-wrap gap-3 items-center opacity-80">

              {/* Cash On Delivery Badge */}
              <div className="bg-white/5 border border-white/10 px-3 py-2 rounded flex items-center gap-2">
                <Truck className="w-4 h-4 text-yellow-500" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Cash on Delivery</span>
              </div>

              {/* VISA (Visual Only) */}
              <div className="bg-white/5 p-1 rounded w-10 h-7 flex items-center justify-center border border-white/10">
                <svg viewBox="0 0 48 48" className="w-full h-full fill-gray-400">
                  <path d="M18.8 30.6l3-18.4h-4.9l-2.3 11.5c-0.3 1.1-1.1 1.7-2.1 1.7h-7.8l-0.1 0.4 4.8 11.2c1.1 2.5 3.1 4.6 6.5 4.6h12.8l-0.6-2.9h-8.8c-0.3 0-0.6-0.3-0.5-0.6z" />
                  <path d="M33.4 12.2h-3.7c-1.1 0-2 0.8-2.3 1.9l-6.6 15.7h5l1.1-2.9h6.1l0.6 2.9h4.4l-4.6-17.6z m-4.8 11l2.3-6.5c0-0.1 0.1-0.2 0.2-0.2h0.1l1.1 6.7h-3.7z" />
                  <path d="M42.2 12.2h-3.8c-1 0-1.8 0.6-2.1 1.6l-6.8 16.8h4.9l1-3.2h6.1l0.6 3.2h4.3l-4.2-18.4z" />
                </svg>
              </div>
              {/* MASTERCARD (Visual Only) */}
              <div className="bg-white/5 p-1 rounded w-10 h-7 flex items-center justify-center border border-white/10">
                <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                  <circle cx="7" cy="12" r="7" fill="#666" fillOpacity="0.8" />
                  <circle cx="17" cy="12" r="7" fill="#888" fillOpacity="0.8" />
                  <path d="M12 16.8C10.8 16.8 9.7 16.4 8.8 15.6C8 14.7 7.5 13.4 7.5 12C7.5 10.6 8 9.3 8.8 8.4C9.7 7.6 10.8 7.2 12 7.2C13.2 7.2 14.3 7.6 15.2 8.4C16 9.3 16.5 10.6 16.5 12C16.5 13.4 16 14.7 15.2 15.6C14.3 16.4 13.2 16.8 12 16.8Z" fill="#999" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 2. LINKS COLUMNS */}
        <div className="flex flex-wrap gap-12 md:gap-24 mt-8 lg:mt-0">
          <div>
            <h4 className="text-white font-serif font-bold mb-6 tracking-wide">COLLECTIONS</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link href="/product?context=watch" className="hover:text-yellow-500 transition-colors">Luxury Watches</Link></li>
              <li><Link href="/product?context=perfume" className="hover:text-yellow-500 transition-colors">Signature Scents</Link></li>
              <li><Link href="/product" className="hover:text-yellow-500 transition-colors">New Arrivals</Link></li>
              <li><Link href="/product" className="hover:text-yellow-500 transition-colors">Best Sellers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-serif font-bold mb-6 tracking-wide">SUPPORT</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li className="">
                <Link href="/support/track"><li className="hover:text-yellow-500 transition-colors">Track Order</li></Link>
              </li>
              <li className="">
                <Link href="/support/shipping"><li className="hover:text-yellow-500 transition-colors">Shipping Policy</li></Link>
              </li>
              <li className="">
                <Link href="/support/returns"><li className="hover:text-yellow-500 transition-colors">Returns & Exchanges</li></Link>
              </li>
              <li className="">
                <Link href="/support/contact"><li className="hover:text-yellow-500 transition-colors">Contact Us</li></Link>
              </li>
              <li className="">
                <Link href="/support/faq"><li className="hover:text-yellow-500 transition-colors">FAQs</li></Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-serif font-bold mb-6 tracking-wide">LEGAL</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li>
                <Link href="/legal/policy" className="hover:text-yellow-500 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-yellow-500 transition-colors">Terms of Service</Link>
              </li>
              {/* <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li> */}
              {/* <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li> */}
            </ul>
          </div>
        </div>

      </div>

      {/* COPYRIGHT SECTION */}
      <div className="mt-20 relative">
        <Separator className="bg-white/10 mb-8" />
        <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 font-bold tracking-[0.2em] uppercase">
          <p>&copy; {new Date().getFullYear()} VIBE CART. EST. KARACHI.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-yellow-500 transition-colors"><Instagram className="w-4 h-4" /></Link>
            <Link href="#" className="hover:text-yellow-500 transition-colors"><Facebook className="w-4 h-4" /></Link>
            <Link href="#" className="hover:text-yellow-500 transition-colors"><Twitter className="w-4 h-4" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}