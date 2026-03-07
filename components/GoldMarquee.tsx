import { motion } from "framer-motion";
import { Star } from "lucide-react";

const MarqueeBar = () =>{
  return (
    <div className="relative w-full bg-yellow-500 text-black py-3 overflow-hidden border-y-4 border-black z-20 transform -rotate-1 origin-left scale-105">
      <motion.div className="flex whitespace-nowrap gap-12 text-sm font-black uppercase tracking-widest items-center" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
        {[...Array(10)].map((_, i) => (
          <span key={i} className="flex items-center gap-12">
            LONG LASTING<Star className="w-4 h-4 fill-black" />
            {/* FAST SHIPPING KARACHI • LAHORE • ISLAMABAD <Star className="w-4 h-4 fill-black" /> */}
            FAST SHIPPING KARACHI <Star className="w-4 h-4 fill-black" />
            CASH ON DELIVERY <Star className="w-4 h-4 fill-black" />
            CATCH THE VIBE <Star className="w-4 h-4 fill-black" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};
export default MarqueeBar;