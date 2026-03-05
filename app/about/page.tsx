"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ShieldCheck, Gem, Globe, ArrowRight, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// --- MOBILE COMPONENTS ---

const MobileHero = () => (
  <section className="md:hidden relative w-full py-20 px-6 flex flex-col items-center justify-center text-center border-b border-white/10 pt-16">
     {/* Gold Glow for Mobile */}
     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-yellow-900/20 rounded-full blur-[80px] pointer-events-none" />
     
     <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }}  variants={fadeInUp} className="relative z-10 space-y-6">
        <Badge className="bg-white/10 text-yellow-500 border-yellow-500/20 px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-serif">Est. 2025</Badge>
        <h1 className="text-4xl font-serif font-black tracking-tighter uppercase leading-tight">
           BEYOND THE <br/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">ORDINARY.</span>
        </h1>
        <p className="text-base text-gray-400 leading-relaxed px-2">
           Vibe Cart isn't just a store. It's a curator of timeless elegance. Where precision meets prestige in every watch and scent.
        </p>
     </motion.div>
  </section>
);

const MobileStory = () => (
  <section className="md:hidden py-16 px-6">
     <div className="flex flex-col gap-10">
        <div className="relative w-full h-[300px] rounded-xl overflow-hidden border border-white/10">
           <Image src="/watch-hero.png" alt="Our Story" fill className="object-contain bg-gradient-to-b from-gray-900 to-black" />
        </div>

        <div className="space-y-6 text-center">
           <h2 className="text-3xl font-serif font-bold tracking-tight uppercase">THE GOLD <br/> <span className="text-yellow-500">STANDARD</span></h2>
           <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <p>In a world of mass production, true luxury is rare. We started Vibe Cart to bring back the art of curation.</p>
              <p>Every timepiece and fragrance in our vault is selected for its character, quality, and ability to leave a lasting impression.</p>
           </div>
           
           <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div>
                 <h4 className="text-3xl font-serif font-black text-white">5K+</h4>
                 <span className="text-[10px] text-yellow-500 uppercase tracking-widest">Elite Clients</span>
              </div>
              <div>
                 <h4 className="text-3xl font-serif font-black text-white">100%</h4>
                 <span className="text-[10px] text-yellow-500 uppercase tracking-widest">Authentic Sourcing</span>
              </div>
           </div>
        </div>
     </div>
  </section>
);

const MobileValues = () => (
  <section className="md:hidden py-16 bg-[#0a0a0a] border-y border-white/10 px-6">
     <div className="text-center mb-10">
        <span className="text-yellow-500 font-bold tracking-widest text-xs uppercase mb-2 block">Our Promise</span>
        <h2 className="text-3xl font-serif font-bold uppercase tracking-tighter">THE VIBE CART DIFFERENCE</h2>
     </div>

     <div className="flex flex-col gap-6">
        <div className="bg-[#050505] p-6 rounded-2xl border border-white/5 text-center group hover:border-yellow-500/30 transition-colors">
           <div className="w-12 h-12 bg-yellow-900/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-yellow-500/20 transition-colors">
              <ShieldCheck className="w-6 h-6 text-yellow-500" />
           </div>
           <h3 className="text-lg font-serif font-bold mb-2 text-white">Verified Excellence</h3>
           <p className="text-sm text-gray-500">We don't deal in doubt. Every item is inspected by specialists to ensure perfection.</p>
        </div>

        <div className="bg-[#050505] p-6 rounded-2xl border border-white/5 text-center group hover:border-blue-500/30 transition-colors">
           <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-500/20 transition-colors">
              <Gem className="w-6 h-6 text-blue-400" />
           </div>
           <h3 className="text-lg font-serif font-bold mb-2 text-white">Rare Finds</h3>
           <p className="text-sm text-gray-500">Access to exclusive drops and limited edition pieces you won't find elsewhere.</p>
        </div>

        <div className="bg-[#050505] p-6 rounded-2xl border border-white/5 text-center group hover:border-white/30 transition-colors">
           <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-white/10 transition-colors">
              <Star className="w-6 h-6 text-white" />
           </div>
           <h3 className="text-lg font-serif font-bold mb-2 text-white">Concierge Service</h3>
           <p className="text-sm text-gray-500">Personalized support for our VIP clients. We treat you like royalty.</p>
        </div>
     </div>
  </section>
);

const MobileCTA = () => (
  <section className="md:hidden py-20 px-6 text-center">
     <div className="space-y-6">
        <h2 className="text-3xl font-serif font-black uppercase tracking-tighter">ELEVATE YOUR LIFESTYLE</h2>
        <p className="text-gray-400 text-base">Discover the piece that defines you.</p>
        <div className="flex flex-col gap-3 w-full">
           <Link href="/product" className="w-full">
              <Button size="lg" className="w-full bg-white text-black font-bold rounded-full h-12 hover:bg-yellow-500 hover:text-black font-serif">EXPLORE COLLECTION</Button>
           </Link>
           <Link href="/new-and-featured" className="w-full">
              <Button variant="outline" size="lg" className="w-full bg-transparent border-white/20 text-white font-bold rounded-full h-12 hover:bg-white hover:text-black font-serif">VIEW NEW ARRIVALS</Button>
           </Link>
        </div>
     </div>
  </section>
);


// --- DESKTOP COMPONENTS ---

const DesktopHero = () => (
  <section className="hidden md:flex relative w-full py-32 px-6 flex-col items-center justify-center text-center overflow-hidden border-b border-white/10">
     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-900/10 rounded-full blur-[120px] pointer-events-none" />
     <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={fadeInUp} className="relative z-10 max-w-4xl space-y-6">
        <Badge className="bg-white/10 text-yellow-500 border-yellow-500/20 hover:bg-white/20 transition-colors px-4 py-1 text-xs tracking-[0.2em] uppercase font-serif">Est. 2025</Badge>
        <h1 className="text-7xl font-serif font-black tracking-tighter uppercase leading-none">
           BEYOND THE <br/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">ORDINARY.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
           Vibe Cart is the premier destination for the modern connoisseur. Bridging the gap between timeless craftsmanship and contemporary luxury.
        </p>
     </motion.div>
  </section>
);

const DesktopStory = () => (
  <section className="hidden md:block py-24 px-6 max-w-7xl mx-auto">
     <div className="flex flex-row items-center gap-16">
        <motion.div 
           initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.8 }}
           className="flex-1 relative w-full h-[500px] rounded-2xl overflow-hidden border border-white/10 group"
        >
           <Image src="/watch-hero.png" alt="Our Story" fill className="object-contain p-12 bg-gradient-to-br from-[#0a0a0a] to-black transition-transform duration-700 group-hover:scale-105" />
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
           className="flex-1 space-y-8"
        >
           <h2 className="text-5xl font-serif font-bold tracking-tight uppercase">THE GOLD <br/> <span className="text-yellow-500">STANDARD</span></h2>
           <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
              <p>In a marketplace flooded with the ordinary, Vibe Cart stands as a bastion of the exceptional. We don't just sell products; we curate experiences.</p>
              <p>From the precise movement of a mechanical watch to the complex notes of an imported oud, every item in our vault tells a story of quality and prestige.</p>
           </div>
           <div className="pt-4">
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                 <div><h4 className="text-4xl font-serif font-black text-white">5K+</h4><span className="text-sm text-yellow-500 uppercase tracking-widest">Elite Clients</span></div>
                 <div><h4 className="text-4xl font-serif font-black text-white">100%</h4><span className="text-sm text-yellow-500 uppercase tracking-widest">Authentic Sourcing</span></div>
              </div>
           </div>
        </motion.div>
     </div>
  </section>
);

const DesktopValues = () => (
  <section className="hidden md:block py-24 bg-[#0a0a0a] border-y border-white/10">
     <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
           <span className="text-yellow-500 font-bold tracking-widest text-xs uppercase mb-2 block">Our Promise</span>
           <h2 className="text-5xl font-serif font-bold uppercase tracking-tighter">THE VIBE CART DIFFERENCE</h2>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} className="grid grid-cols-3 gap-8">
           
           <motion.div variants={fadeInUp} className="bg-[#050505] p-8 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-colors group">
              <div className="w-14 h-14 bg-yellow-900/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-yellow-500/20 transition-colors">
                 <ShieldCheck className="w-7 h-7 text-yellow-500" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-white">Verified Excellence</h3>
              <p className="text-gray-500">We don't deal in doubt. No fakes, no compromises. Every item goes through a rigorous inspection process before it reaches your door.</p>
           </motion.div>

           <motion.div variants={fadeInUp} className="bg-[#050505] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors group">
              <div className="w-14 h-14 bg-blue-900/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                 <Gem className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-white">Rare Finds</h3>
              <p className="text-gray-500">We specialize in the hard-to-get. Access exclusive drops, limited editions, and imported scents you won't find elsewhere.</p>
           </motion.div>

           <motion.div variants={fadeInUp} className="bg-[#050505] p-8 rounded-2xl border border-white/5 hover:border-white/30 transition-colors group">
              <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                 <Star className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-white">Concierge Service</h3>
              <p className="text-gray-500">We believe in relationships, not just transactions. Our support team is dedicated to treating you like royalty.</p>
           </motion.div>

        </motion.div>
     </div>
  </section>
);

const DesktopCTA = () => (
  <section className="hidden md:block py-32 px-6 text-center">
     <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.3 }} className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-6xl font-serif font-black uppercase tracking-tighter">ELEVATE YOUR LIFESTYLE</h2>
        <p className="text-gray-400 text-lg">Browse the collection and find your next signature piece.</p>
        <div className="flex justify-center gap-4">
           <Link href="/product">
              <Button size="lg" className="bg-white text-black font-bold rounded-full px-8 hover:bg-yellow-500 hover:text-black transition-all h-14 font-serif">SHOP ALL PRODUCTS</Button>
           </Link>
           <Link href="/new-and-featured">
              <Button variant="outline" size="lg" className="bg-transparent border-white/20 text-white font-bold rounded-full px-8 hover:bg-white hover:text-black transition-all h-14 font-serif">VIEW NEW ARRIVALS</Button>
           </Link>
        </div>
     </motion.div>
  </section>
);


// --- MAIN PAGE ---
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* <Navbar /> */}

      {/* Hero */}
      <MobileHero />
      <DesktopHero />

      {/* Story */}
      <MobileStory />
      <DesktopStory />

      {/* Values */}
      <MobileValues />
      <DesktopValues />

      {/* CTA */}
      <MobileCTA />
      <DesktopCTA />

      {/* <Footer /> */}
    </main>
  );
}