"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    // Check if they have already entered before on ANY page
    const hasEntered = localStorage.getItem("vibe_vault_entered");
    if (!hasEntered) {
      setTimeout(() => setIsOpen(true), 800);
    }
  }, []);

  const handleEnter = () => {
    if (!selectedCity) return; 
    
    // Save to localStorage for checkout auto-fill
    localStorage.setItem("vibe_vault_entered", "true");
    localStorage.setItem("vibe_user_city", selectedCity);
    
    setIsOpen(false);
  };
  

  const cities = ["Karachi"];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
          {/* Background Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* The Wide Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(191,149,63,0.15)] overflow-hidden flex flex-col md:flex-row"
          >
            {/* LEFT SIDE: Brand & Transparency */}
            <div className="flex-1 p-8 md:p-12 relative flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5">
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-yellow-600/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <h2 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter text-white leading-none">
                  Welcome to <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">
                    Vibe Cart
                  </span>
                </h2>
                
                {/* <div className="bg-white/[0.03] border border-white/10 p-5 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest text-xs">
                    <Info className="w-4 h-4" /> Our Transparency Promise
                  </div>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    To set the right expectations: We specialize in selling high-quality <strong className="text-white">copies of original watches</strong> and premium <strong className="text-white">branded perfume impressions</strong>. 
                  </p>
                </div> */}
              </div>
            </div>

            {/* RIGHT SIDE: City Selection */}
            <div className="flex-1 p-8 md:p-12 bg-gradient-to-br from-white/[0.02] to-transparent flex flex-col justify-center">
              <div className="w-full space-y-6">
                <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest">
                  <MapPin className="w-5 h-5 text-yellow-500" /> Select Your City
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`relative w-full p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group
                        ${selectedCity === city 
                          ? "bg-yellow-500/10 border-yellow-500 text-white shadow-[inset_0_0_15px_rgba(234,179,8,0.2)]" 
                          : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                        }`}
                    >
                      <span className="font-serif font-bold text-lg">{city}</span>
                      <div className={`w-3 h-3 rounded-full border border-current transition-colors ${selectedCity === city ? "bg-yellow-500" : "bg-transparent group-hover:border-white"}`} />
                    </button>
                  ))}
                </div>

                <Button 
                    onClick={handleEnter}
                    disabled={!selectedCity}
                    className={`w-full h-14 mt-4 rounded-xl font-black tracking-[0.2em] uppercase transition-all duration-500
                        ${selectedCity 
                            ? "bg-gradient-to-r from-[#BF953F] to-[#B38728] text-black shadow-[0_0_20px_rgba(191,149,63,0.3)] hover:scale-105" 
                            : "bg-white/5 text-gray-600 border border-white/10 cursor-not-allowed"
                        }`}
                >
                  Enter Store
                </Button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}