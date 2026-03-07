import {
  Star,
  Facebook,
  Instagram,
  Twitter
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const PremiumNewsletter = () => {

  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !phone) {
      alert("Please fill in both fields.");
      return;
    }

    const payload = { email, phone };

    const { error: itemsError } = await supabase
      .from('vibe_club_subscribers')
      .insert(payload);

    if (itemsError) {
      console.error("Database Insert Error:", itemsError);
      alert("Failed to subscribe. Please try again.");
    } else {
      alert("Thank you for joining the Vibe Club! Stay tuned for exclusive updates.");
      setEmail("");
      setPhone("");
    }
  }

  return (
    <section className="relative z-10 pb-12 md:pb-24 bg-[#050505] px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 px-4 py-12 md:px-6 md:py-24 text-center group">

          <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-black z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-600/20 rounded-full blur-[80px] group-hover:bg-yellow-600/30 transition-all duration-1000" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] group-hover:bg-blue-600/20 transition-all duration-1000" />

          <div className="relative z-10 space-y-8 md:space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase tracking-widest mb-2 md:mb-4">
                <Star className="w-3 h-3 fill-current" /> Members Only Access
              </div>
              <h2 className="text-4xl md:text-7xl font-serif font-black text-white tracking-tighter uppercase leading-[0.9]">
                Join The <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">Vibe Club</span>
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-lg font-light">
                Unlock early access to limited drops, secret sales, and priority shipping.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto px-2">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 md:px-6 py-4 md:py-5 text-xs md:text-sm font-bold tracking-wider text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500 focus:bg-black transition-all uppercase"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex-1 relative">
                <input
                  type="tel"
                  placeholder="PHONE (WHATSAPP)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 md:px-6 py-4 md:py-5 text-xs md:text-sm font-bold tracking-wider text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500 focus:bg-black transition-all uppercase"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <Button className="h-auto rounded-xl px-8 py-4 md:py-5 bg-gradient-to-r from-[#BF953F] to-[#B38728] text-black font-black tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(191,149,63,0.3)] cursor-pointer" onClick={handleSubmit}>
                JOIN CLUB
              </Button>
              
            </div>

            <p className="text-[9px] md:text-[10px] text-gray-600 uppercase tracking-widest pt-2 md:pt-4">
              By joining, you agree to our terms. No spam, just vibe.
            </p>

            <div className="mt-8 md:mt-10 pt-8 border-t border-white/10">
              <p className="text-xs md:text-sm font-bold text-gray-400 mb-6 md:mb-10 uppercase tracking-widest">Or Follow Us On</p>
              <div className="flex justify-center gap-4 md:gap-6">
                <Link href="https://www.facebook.com/vibecart.official.pk/" target="_blank" className="group flex items-center gap-2 text-gray-400 hover:text-blue-500 transition">
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-blue-500/20 transition">
                    <Facebook className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">Facebook</span>
                </Link>

                <Link href="https://instagram.com" target="_blank" className="group flex items-center gap-2 text-gray-400 hover:text-pink-500 transition">
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-pink-500/20 transition">
                    <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">Instagram</span>
                </Link>

                <Link href="https://twitter.com" target="_blank" className="group flex items-center gap-2 text-gray-400 hover:text-white transition">
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/20 transition">
                    <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">X / Twitter</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default PremiumNewsletter;