"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function LifeStyleImageSection({
  images = [],
  productTitle
}: {
  images?: string[];
  productTitle?: string
}) {
  // 1. Check for images IMMEDIATELY before hooks run
  if (!images || images.length === 0) return null;

  // 2. Now it's safe to define hooks
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollXProgress } = useScroll({ 
    container: mounted ? scrollRef : undefined 
  });

  const scaleX = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.6 : clientWidth * 0.6;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // 3. Keep the mounting guard for hydration safety
  if (!mounted) return null;

  return (
    <div className="w-full max-w-full bg-[#050505] py-24 overflow-x-hidden border-y border-white/5">
      {/* ... the rest of your premium JSX code stays exactly the same ... */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-[#BF953F]"></span>
              <p className="text-[#BF953F] text-xs font-black uppercase tracking-[0.4em]">In the wild</p>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-black text-white uppercase tracking-tighter italic">
              {productTitle} <span className="text-white/20">Vibe</span>
            </h2>
          </div>
          
          {/* Progress & Nav */}
          <div className="flex items-center gap-6">
            <div className="hidden md:block w-48 h-[2px] bg-white/10 relative rounded-full overflow-hidden">
              <motion.div style={{ scaleX }} className="absolute inset-0 bg-[#BF953F] origin-left" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => scroll("left")} className="group w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white transition-all duration-500">
                <ChevronLeft className="w-6 h-6 text-white group-hover:text-black" />
              </button>
              <button onClick={() => scroll("right")} className="group w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white transition-all duration-500">
                <ChevronRight className="w-6 h-6 text-white group-hover:text-black" />
              </button>
            </div>
          </div>
      </div>

      <div ref={scrollRef} className="flex overflow-x-auto gap-8 px-[10%] pb-12 snap-x snap-mandatory scroll-smooth no-scrollbar">
        {images.map((src, index) => (
          <motion.div key={index} className="flex-shrink-0 w-[80vw] md:w-[350px] snap-center">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-neutral-900 shadow-2xl transition-all duration-700">
              <img src={src} alt="Lifestyle" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-8 left-8">
                <p className="text-white text-xs font-black tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">Edition 00{index + 1}</p>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="flex-shrink-0 w-[10%]" />
      </div>
    </div>
  );
}