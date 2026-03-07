"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Star,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import CollectionsSection from "../components/CollectionsSection";
import MarqueeBar from "@/components/GoldMarquee";
import PremiumNewsletter from "@/components/PremiumNewsLetter";
import SpotlightSection from "@/components/SpotlightSection";

// =========================================
// DATA CONSTANTS
// =========================================

const HERO_ITEMS = [
  {
    id: 14,
    title: "IMPERIAL APEX",
    subtitle: "EID SALE",
    description: "A bold fruity-woody scent with smoky depth made for leaders and strong presence.",
    price: "Rs. 1,580",
    image: "/1.png",
    accent: "from-yellow-500 to-yellow-900",
    bgGlow: "bg-yellow-500/20"
  },
  {
    id: 17,
    title: "WILD INSTINCT",
    subtitle: "EID SALE",
    description: "A sharp spicy-fresh fragrance with powerful projection and bold masculine energy.",
    price: "Rs. 1,880",
    image: "/2.png",
    accent: "from-gray-500 to-gray-900",
    bgGlow: "bg-white/20"
  },
  {
    id: 16,
    title: "CRIMSON HEAT",
    subtitle: "EID SALE",
    description: "A warm sweet fragrance with spicy depth and a seductive masculine finish.",
    price: "Rs. 1,580",
    image: "/3.png",
    accent: "from-orange-600 to-red-900",
    bgGlow: "bg-red-500/20"
  }
];


export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  colors: string[];
  isNew?: boolean;
  isSale?: boolean;
  isClearance?: boolean;
}
// =========================================
// SUB-COMPONENTS
// =========================================

// --- COMPONENT: HERO SECTION ---
const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === HERO_ITEMS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? HERO_ITEMS.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentItem = HERO_ITEMS[currentIndex];

  // const textVariants = {
  //   hidden: (dir: number) => ({ opacity: 0, x: dir === 1 ? 100 : -100 }),
  //   visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  //   exit: (dir: number) => ({ opacity: 0, x: dir === 1 ? -100 : 100, transition: { duration: 0.4 } })
  // };
  const textVariants = {
    hidden: (dir: number) => ({
      opacity: 0,
      x: dir === 1 ? 100 : -100
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const  // Add 'as const' here
      }
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir === 1 ? -100 : 100,
      transition: { duration: 0.4 }
    })
  };
  // const imageVariants = {
  //   hidden: (dir: number) => ({ opacity: 0, x: dir === 1 ? 200 : -200, rotate: dir === 1 ? 15 : -15, scale: 0.8 }),
  //   visible: { opacity: 1, x: 0, rotate: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
  //   exit: (dir: number) => ({ opacity: 0, x: dir === 1 ? -200 : 200, rotate: dir === 1 ? -15 : 15, scale: 0.8, transition: { duration: 0.5 } })
  // };
  const imageVariants = {
    hidden: (dir: number) => ({
      opacity: 0,
      x: dir === 1 ? 200 : -200,
      rotate: dir === 1 ? 15 : -15,
      scale: 0.8
    }),
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20
      }
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir === 1 ? -200 : 200,
      rotate: dir === 1 ? -15 : 15,
      scale: 0.8,
      transition: { duration: 0.5 }
    })
  };
  return (
    <section className="relative w-full bg-[#050505] text-white overflow-hidden pt-0 pb-12 md:pt-0 md:pb-0 md:min-h-[82vh] flex items-center ">
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] transition-colors duration-1000 pointer-events-none ${currentItem.bgGlow}`} />

      {/* ========================================= */}
      {/* 1. DEDICATED MOBILE INTERFACE (Image FIRST) */}
      {/* ========================================= */}
      <div className="md:hidden flex flex-col w-full px-6 gap-0 relative z-10">

        {/* MOBILE: IMAGE ON TOP */}
        <div className="relative w-full h-[350px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={currentIndex} custom={direction} variants={imageVariants} initial="hidden" animate="visible" exit="exit" className="absolute w-[300px] h-[300px]">
              <Image src={currentItem.image} alt={currentItem.title} fill className="object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)]" priority sizes="100vw" />
            </motion.div>
          </AnimatePresence>

          {/* MOBILE: ARROWS */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between z-30 pointer-events-none">
            <button onClick={handlePrev} className="pointer-events-auto w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-90"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={handleNext} className="pointer-events-auto w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-90"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>

        {/* MOBILE: TEXT BELOW */}
        <div className="flex flex-col items-start w-full z-20">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={currentIndex} custom={direction} variants={textVariants} animate="visible" exit="exit" className="space-y-4 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded-full backdrop-blur-md">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-gray-300 text-[10px] font-bold tracking-widest uppercase">Best Seller</span>
              </div>

              <h1 className="text-5xl font-black leading-[0.9] tracking-tighter">
                {currentItem.title} <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentItem.accent}`}>{currentItem.subtitle}</span>
              </h1>

              <p className="text-gray-400 text-base leading-relaxed">{currentItem.description}</p>

              <div className="flex flex-col gap-4 pt-4 w-full">
                <Link href={`/product/${currentItem.id}`} className="w-full">
                  <button className="w-full h-14 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition active:scale-95 flex items-center justify-center gap-2 text-sm">
                    Buy Now - {currentItem.price} <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-green-500" /> Cash On Delivery Nationwide
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ========================================= */}
      {/* 2. DEDICATED DESKTOP INTERFACE (Side by Side) */}
      {/* ========================================= */}
      <div className="hidden md:grid max-w-7xl mx-auto px-12 w-full grid-cols-2 gap-12 items-center relative z-10">

        {/* DESKTOP: TEXT ON LEFT */}
        <div className="flex items-start space-y-6 z-20 justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={currentIndex} custom={direction} variants={textVariants} animate="visible" exit="exit" className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded-full backdrop-blur-md">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-gray-300 text-xs font-bold tracking-widest uppercase">Best Seller</span>
              </div>

              <h1 className="text-8xl font-black leading-[0.9] tracking-tighter">
                {currentItem.title} <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentItem.accent}`}>{currentItem.subtitle}</span>
              </h1>

              <p className="text-gray-400 text-xl max-w-md leading-relaxed">{currentItem.description}</p>

              <div className="flex items-center gap-4 pt-4">
                <Link href={`/product/${currentItem.id}`}>
                  <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition active:scale-95 flex items-center justify-center gap-2 text-base">
                    Buy Now - {currentItem.price} <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-green-500" /> Cash On Delivery
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* DESKTOP: IMAGE ON RIGHT */}
        <div className="relative flex justify-center items-center h-[600px]">
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={currentIndex} custom={direction} variants={imageVariants} initial="hidden" animate="visible" exit="exit" className="absolute w-[500px] h-[500px]">
                <Image src={currentItem.image} alt={currentItem.title} fill className="object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)]" priority sizes="50vw" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between px-4 z-30 pointer-events-none">
            <button onClick={handlePrev} className="pointer-events-auto w-14 h-14 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-90"><ChevronLeft className="w-6 h-6" /></button>
            <button onClick={handleNext} className="pointer-events-auto w-14 h-14 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-90"><ChevronRight className="w-6 h-6" /></button>
          </div>
        </div>

      </div>
    </section>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  const [trendingPage, setTrendingPage] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 4;
  const totalTrendingPages = Math.ceil(featuredProducts.length / itemsPerPage);

  // FETCH DATA FROM SUPABASE
  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        setIsLoading(true);

        // Fetch products with variants, pricing, and sale info
        const { data, error } = await supabase
          .from("products")
          .select(`
            id,
            title,
            brand,
            base_price,
            categories ( name ),
            product_images ( image_url ),
            product_variants ( id, color, is_primary, price, sale_price, is_on_sale ) 
          `)
          .eq("is_active", true)
          .eq("product_images.is_primary", true)
          .limit(12);

        if (error) throw error;
        console.log("Raw product data from Supabase:", data);

        // Map the data and apply sale pricing logic
        // Map the data and apply sale pricing logic
        const mappedProducts: Product[] = data.map((item: any) => {
          // Find the variant marked as primary, or fallback to the first available variant
          const primaryVariant = item.product_variants?.find((v: any) => v.is_primary === true);
          const defaultVariantId = primaryVariant?.id || item.product_variants?.[0]?.id || null;
          // Use primary variant price, fallback to base_price
          const variantPrice = primaryVariant?.price || item.base_price;
          const salePrice = primaryVariant?.sale_price || null;
          const isOnSale = primaryVariant?.is_on_sale || false;

          // Safely extract colors as string[]
          const colorsArray: string[] = item.product_variants?.length
            ? [...new Set(item.product_variants
              .map((v: any) => v.color)
              .filter((color: string | null) => color !== null && color !== undefined))]
              .map(String) // Ensure they're strings
            : ["#000"];

          return {
            id: item.id.toString(),
            name: item.title,
            brand: item.brand || "VibeCart",
            category: item.categories?.name || "Classic",
            price: variantPrice,
            salePrice: salePrice,
            isOnSale: isOnSale,
            image: item.product_images?.[0]?.image_url || "/watch-1.png",
            colors: colorsArray,
            defaultVariantId: defaultVariantId,
            isNew: false,
            isSale: isOnSale,
          };
        });

        setFeaturedProducts(mappedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  const nextTrending = () => {
    if (totalTrendingPages > 0) {
      setTrendingPage((prev) => (prev + 1) % totalTrendingPages);
    }
  };

  const prevTrending = () => {
    if (totalTrendingPages > 0) {
      setTrendingPage((prev) => (prev - 1 + totalTrendingPages) % totalTrendingPages);
    }
  };

  const currentTrendingProducts = featuredProducts.slice(
    trendingPage * itemsPerPage,
    (trendingPage + 1) * itemsPerPage
  );
  return (
    <main className="min-h-screen relative bg-[#050505] text-white overflow-x-hidden selection:bg-blue-500/30">

      {/* 1. NAVBAR */}
      {/* <Navbar /> */}

      {/* 2. HERO SECTION */}
      <HeroSection />

      {/* 3. MARQUEE */}
      <div className="py-8 md:py-12">
        <MarqueeBar />
      </div>

      {/* 4. TRENDING HEAT */}
      <section className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left justify-between md:flex-row md:items-end mb-8 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter">
              TRENDING HEAT <span className="text-yellow-500">.</span>
            </h2>
            <p className="text-gray-400 text-xs md:text-sm mt-3 md:border-l-2 md:border-yellow-500 md:pl-4">
              Top rated picks by our customers this week.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : (
          <>
            {/* MOBILE VIEW */}
            <div className="md:hidden flex overflow-x-auto gap-4 snap-x snap-mandatory pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {featuredProducts.map((product) => (
                <div key={product.id} className="min-w-[calc(50vw-20px)] flex-1 shrink-0 snap-start">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* DESKTOP VIEW */}
            <div className="hidden md:block min-h-[400px] relative">
              {featuredProducts.length > itemsPerPage && (
                <>
                  <button
                    onClick={prevTrending}
                    className="absolute left-0 top-1/2 -translate-x-12 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 bg-black/50 hover:bg-white hover:text-black transition flex items-center justify-center z-20 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextTrending}
                    className="absolute right-0 top-1/2 translate-x-12 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 bg-black/50 hover:bg-white hover:text-black transition flex items-center justify-center z-20 backdrop-blur-sm"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={trendingPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-4 gap-4"
                >
                  {currentTrendingProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
      </section>

      {/* 5. SPOTLIGHT SECTION */}
      <SpotlightSection />

      {/* 6. MIRROR COLLECTION */}
      <div className="relative z-10 bg-[#050505]">
        <CollectionsSection />
      </div>

      {/* 7. NEWSLETTER */}
      <PremiumNewsletter />
      {/* <Footer /> */}

    </main>
  );
}