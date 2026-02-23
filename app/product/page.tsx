"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, X, ChevronLeft, ChevronRight, ArrowRightLeft, Pause, Star, ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";


// ==========================================
// 1. DATA & CONSTANTS
// ==========================================

interface ProductWithType extends Product {
  type: "watch" | "perfume";
}



const WATCH_BRANDS = ["ROLEX STYLE", "PATEK STYLE", "NAVIFORCE", "POEDAGAR", "CURREN", "SVESTON", "SKMEI", "HUBLOT STYLE", "VibeCart"];
const PERFUME_BRANDS = ["LATTAFA", "ARMAF", "PENDORA", "J.", "BONANZA", "RASASI", "AJMAL", "DUNHILL IMPRESSIONS"];

const WATCH_COLLECTIONS = ["The Executive", "Sport & Speed", "Mechanical", "Tactical", "French Signatures"];
const PERFUME_COLLECTIONS = ["French Signatures", "Arabic Oud", "Night Mode", "Pakistani Edit", "Oud"];

// EXPANDED DATA TO PREVENT EMPTY FILTER RESULTS
const ALL_PRODUCTS: ProductWithType[] = [
  // WATCHES
  { id: "1", type: "watch", name: "Royal Oak Series", brand: "ROLEX STYLE", category: "The Executive", price: 3500, image: "/watch-1.png", colors: ["#000"], isNew: true },
  { id: "3", type: "watch", name: "Nautilus Steel", brand: "PATEK STYLE", category: "The Executive", price: 4200, image: "/watch-2.png", colors: ["#000"] },
  { id: "4", type: "watch", name: "Hublot Big Bang", brand: "HUBLOT STYLE", category: "Sport & Speed", price: 2900, image: "/watch-1.png", colors: ["#000"], isNew: true },
  { id: "6", type: "watch", name: "Daytona Panda", brand: "ROLEX STYLE", category: "Mechanical", price: 4500, image: "/watch-2.png", colors: ["#fff"], isNew: true },
  { id: "8", type: "watch", name: "G-Shock Mudmaster", brand: "SKMEI", category: "Tactical", price: 1200, image: "/watch-1.png", colors: ["#000"] },
  { id: "10", type: "watch", name: "Naviforce Beast", brand: "NAVIFORCE", category: "Sport & Speed", price: 2200, image: "/watch-1.png", colors: ["#000"] },
  { id: "11", type: "watch", name: "Curren Chrono", brand: "CURREN", category: "The Executive", price: 1800, image: "/watch-2.png", colors: ["#000"] },

  // PERFUMES
  { id: "2", type: "perfume", name: "Sauvage Elixir", brand: "PENDORA", category: "French Signatures", price: 1800, image: "/perfume-1.png", colors: ["#000"], isSale: true },
  { id: "5", type: "perfume", name: "Creed Aventus", brand: "ARMAF", category: "French Signatures", price: 2200, image: "/perfume-1.png", colors: ["#000"] },
  { id: "7", type: "perfume", name: "Bleu de Chanel", brand: "LATTAFA", category: "Night Mode", price: 1900, image: "/perfume-1.png", colors: ["#000"] },
  { id: "9", type: "perfume", name: "Oud Mood", brand: "LATTAFA", category: "Arabic Oud", price: 2500, image: "/perfume-1.png", colors: ["#000"] },
  { id: "12", type: "perfume", name: "J. Core", brand: "J.", category: "Pakistani Edit", price: 3000, image: "/perfume-1.png", colors: ["#000"] },
];

const WATCH_SLIDES = [
  { id: 1, type: "video", src: "/watch-promo.mp4", fallback: "/watch-hero.png", title: "THE GOLD STANDARD", subtitle: "Automatic Movement • Sapphire Glass", link: "#" },
  { id: 2, type: "image", src: "/watch-2.png", title: "SILVER PHANTOM", subtitle: "Chronograph • Waterproof", link: "#" },
];

const PERFUME_SLIDES = [
  { id: 1, type: "image", src: "/perfume-hero.png", title: "MIDNIGHT OUD", subtitle: "Long Lasting • French Oil", link: "#" },
  { id: 2, type: "video", src: "/perfume-promo.mp4", fallback: "/perfume-1.png", title: "OCEAN BREEZE", subtitle: "Citrus Notes • Summer Ready", link: "#" },
];

// ==========================================
// 2. HERO SPLIT (INTRO - UNCHANGED)
// ==========================================

interface HeroSplitProps {
  onEnter: (type: "watch" | "perfume") => void;
}

const HeroSplit = ({ onEnter }: HeroSplitProps) => {
  const [hoveredSide, setHoveredSide] = useState<"watch" | "perfume" | null>(null);

  const GOLD_GRADIENT = "bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]";
  const GOLD_TEXT = "bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]";

  return (
    <section className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center z-50">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-[#050505] to-[#050505]" />

      <div><p className={`py-2 text-base font-bold ${GOLD_TEXT}`}>Select Category</p></div>

      {/* --- DESKTOP VIEW --- */}
      <div className="flex w-full max-w-7xl mx-auto h-full justify-center relative z-10">


        {/* Left Text */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[40%] z-40 flex items-center justify-end pr-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: hoveredSide === "watch" ? 1 : 0, x: hoveredSide === "watch" ? 0 : -50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-right">
            <h2 className={`text-6xl font-serif font-bold ${GOLD_TEXT}`}>AURUM</h2>
            <p className="text-sm tracking-[0.4em] text-[#FCF6BA] mt-2 uppercase drop-shadow-md">Timeless Precision</p>
          </div>
          <div className="w-[100px] h-[2px] bg-gradient-to-r from-transparent via-[#FCF6BA] to-[#BF953F] ml-6 shadow-[0_0_15px_#FCF6BA]" />
        </motion.div>

        {/* Right Text */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[40%] z-40 flex items-center pl-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: hoveredSide === "perfume" ? 1 : 0, x: hoveredSide === "perfume" ? 0 : 50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-[100px] h-[2px] bg-gradient-to-l from-transparent via-blue-400 to-blue-600 mr-6 shadow-[0_0_15px_#60A5FA]" />
          <div className="text-left">
            <h2 className="text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-500">CHRONOS</h2>
            <p className="text-sm tracking-[0.4em] text-blue-200 mt-2 uppercase drop-shadow-md">Signature Scent</p>
          </div>
        </motion.div>

        {/* Central Ring Container */}
        <motion.div
          className="relative w-[400px] h-[500px] md:w-[600px] md:h-[600px] p-4 md:p-0"
          animate={{ x: hoveredSide === "watch" ? 50 : hoveredSide === "perfume" ? -50 : 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {/* The Ring Visuals */}
          <div className="absolute inset-[6px] md:inset-[2px] rounded-full border-[6px] md:border-[10px] border-transparent" style={{ background: "linear-gradient(#050505, #050505) padding-box, linear-gradient(to right, #BF953F, #FCF6BA, #B38728) border-box", }} />

          {/* Diagonal Line */}
          <div className="absolute top-1/2 left-1/2 w-[150%] -translate-x-1/2 -translate-y-1/2 -rotate-45 z-20 pointer-events-none">
            <div className={`absolute inset-0 h-[3px] ${GOLD_GRADIENT} opacity-70 blur-[6px]`} />
            <div className={`absolute inset-0 h-[3px] ${GOLD_GRADIENT}`} style={{ clipPath: "polygon(0% 50%, 6% 0%, 94% 0%, 100% 50%, 94% 100%, 6% 100%)" }} />
          </div>

          {/* --- STRICT HOVER ZONES --- */}
          <div className="absolute inset-0 rounded-full overflow-hidden z-50">
            <div onClick={() => onEnter("watch")} className="absolute inset-0 w-full h-full cursor-pointer clip-path-diagonal-left hover:bg-white/5 transition-colors duration-300" onMouseEnter={() => setHoveredSide("watch")} onMouseLeave={() => setHoveredSide(null)} />
            <div onClick={() => onEnter("perfume")} className="absolute inset-0 w-full h-full cursor-pointer clip-path-diagonal-right hover:bg-blue-500/5 transition-colors duration-300" onMouseEnter={() => setHoveredSide("perfume")} onMouseLeave={() => setHoveredSide(null)} />
          </div>

          {/* Images */}
          <motion.div
            className="absolute -top-6 left-0 md:top-12 md:left-12 w-[250px] md:w-[350px] h-[350px] pointer-events-none"
            animate={{
              scale: hoveredSide === "watch" ? 1.35 : hoveredSide === "perfume" ? 0.8 : 1,
              opacity: hoveredSide === "perfume" ? 0.3 : 1,
              filter: hoveredSide === "perfume" ? "blur(5px)" : "blur(0px)",
              zIndex: hoveredSide === "watch" ? 30 : 10,
              x: hoveredSide === "watch" ? -30 : 0,
              y: hoveredSide === "watch" ? -30 : 0
            }}
            transition={{ duration: 0.4 }}
          >
            <Image src="/watch-hero.png" alt="Luxury Watch" fill className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]" />
          </motion.div>

          <motion.div
            className="absolute bottom-0 right-0 md:bottom-12 md:right-12 w-[250px] md:w-[300px] h-[300px] pointer-events-none"
            animate={{
              scale: hoveredSide === "perfume" ? 1.45 : hoveredSide === "watch" ? 0.8 : 1,
              opacity: hoveredSide === "watch" ? 0.3 : 1,
              filter: hoveredSide === "watch" ? "blur(5px)" : "blur(0px)",
              zIndex: hoveredSide === "perfume" ? 30 : 10,
              x: hoveredSide === "perfume" ? 30 : 0,
              y: hoveredSide === "perfume" ? 30 : 0
            }}
            transition={{ duration: 0.4 }}
          >
            <Image src="/perfume-hero.png" alt="Luxury Perfume" fill className="object-contain drop-shadow-[0_30px_60px_rgba(59,130,246,0.5)]" />
          </motion.div>
        </motion.div>
      </div>

      <style jsx global>{`
        .clip-path-diagonal-left { clip-path: polygon(0 0, 100% 0, 0 100%); }
        .clip-path-diagonal-right { clip-path: polygon(100% 0, 100% 100%, 0 100%); }
      `}</style>
    </section>
  );
};


// ==========================================
// 3. CATEGORY HERO (NEW: Video/Image Slider)
// ==========================================

const CategoryHero = ({ context }: { context: "watch" | "perfume" }) => {
  const slides = context === "watch" ? WATCH_SLIDES : PERFUME_SLIDES;
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = () => setCurrent((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // FIXED: Safe Video Logic
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (isHovered) {
        video.pause();
      } else {
        // Ensure it plays only if visible/ready
        video.play().catch(e => console.log("Video autoplay blocked", e));
      }
    }
  }, [isHovered, current]);

  return (
    <div
      className="relative w-full h-[60vh] md:h-[70vh] bg-black overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          {slides[current].type === "video" ? (
            <video
              ref={videoRef}
              src={slides[current].src}
              autoPlay loop muted playsInline
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <div className="relative w-full h-full">
              <Image src={slides[current].src} alt="Hero" fill className="object-cover opacity-60" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 transition-all duration-300">
        <motion.div
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          key={`text-${current}`} // Re-animate on slide change
          className={`bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 transition-all duration-300 ${isHovered ? "scale-105 border-yellow-500/50" : "scale-100"}`}
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-2 tracking-tight">{slides[current].title}</h2>

          <div className={`overflow-hidden transition-all duration-500 ${isHovered ? "max-h-[200px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
            <p className="text-yellow-400 font-bold tracking-widest text-sm mb-6 uppercase">{slides[current].subtitle}</p>
            <Link href={slides[current].link}>
              <Button className="bg-white text-black hover:bg-yellow-500 hover:text-black font-bold rounded-full px-8 py-6">
                SHOP NOW <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className={`transition-opacity duration-300 mt-2 ${isHovered ? "opacity-0" : "opacity-60"}`}>
            <p className="text-xs text-white uppercase tracking-widest flex items-center justify-center gap-2">
              {slides[current].type === "video" ? <Pause className="w-3 h-3" /> : <Star className="w-3 h-3" />}
              Hover for Details
            </p>
          </div>
        </motion.div>
      </div>

      {/* Arrows */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-30 pointer-events-none px-4 md:px-12">
        <button onClick={handlePrev} className="pointer-events-auto p-3 rounded-full bg-black/50 border border-white/20 text-white hover:bg-white hover:text-black transition-all hover:scale-110"><ChevronLeft className="w-6 h-6" /></button>
        <button onClick={handleNext} className="pointer-events-auto p-3 rounded-full bg-black/50 border border-white/20 text-white hover:bg-white hover:text-black transition-all hover:scale-110"><ChevronRight className="w-6 h-6" /></button>
      </div>
    </div>
  );
};

// ==========================================
// 4. PRODUCT FILTERS
// ==========================================

interface FilterProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedBrands: string[];
  setSelectedBrands: (val: string[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (val: string[]) => void;
  context: "watch" | "perfume" | null;
}

function ProductFilters({ searchQuery, setSearchQuery, selectedBrands, setSelectedBrands, selectedCategories, setSelectedCategories, context }: FilterProps) {
  const brandsToShow = context === "watch" ? WATCH_BRANDS : context === "perfume" ? PERFUME_BRANDS : [...WATCH_BRANDS, ...PERFUME_BRANDS];
  const collectionsToShow = context === "watch" ? WATCH_COLLECTIONS : context === "perfume" ? PERFUME_COLLECTIONS : [...WATCH_COLLECTIONS, ...PERFUME_COLLECTIONS];

  const toggleFilter = (item: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(item)) setList(list.filter((i) => i !== item));
    else setList([...list, item]);
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-white/5 border-white/10 pl-10 text-white focus:border-yellow-500 transition-colors rounded-full" />
      </div>
      <Separator className="bg-white/10" />
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-sm tracking-widest text-yellow-500 uppercase">Brands</h3>
        <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20">
          {brandsToShow.map((brand) => (
            <div key={brand} className="flex items-center space-x-3">
              <Checkbox id={`brand-${brand}`} checked={selectedBrands.includes(brand)} onCheckedChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)} className="border-white/30 data-[state=checked]:bg-yellow-600 data-[state=checked]:text-black w-5 h-5 rounded-full" />
              <label htmlFor={`brand-${brand}`} className="text-sm font-medium cursor-pointer text-gray-400 hover:text-white transition-colors">{brand}</label>
            </div>
          ))}
        </div>
      </div>
      <Separator className="bg-white/10" />
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-sm tracking-widest text-blue-500 uppercase">Collections</h3>
        <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20">
          {collectionsToShow.map((cat) => (
            <div key={cat} className="flex items-center space-x-3">
              <Checkbox id={`cat-${cat}`} checked={selectedCategories.includes(cat)} onCheckedChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)} className="border-white/30 data-[state=checked]:bg-blue-600 w-5 h-5 rounded-full" />
              <label htmlFor={`cat-${cat}`} className="text-sm font-medium cursor-pointer text-gray-400 hover:text-white transition-colors">{cat}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. MAIN PAGE EXPORT
// ==========================================

export default function ProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialContext = searchParams.get("context") as "watch" | "perfume" | null;
  const hasValidContext = initialContext === "watch" || initialContext === "perfume";
  const [viewState, setViewState] = useState<"INTRO" | "SHOP">(hasValidContext ? "SHOP" : "INTRO");
  const [context, setContext] = useState<"watch" | "perfume" | null>(null);


  useEffect(() => {
    const urlContext = searchParams.get("context") as "watch" | "perfume" | null;

    // If URL has context, force SHOP view. If not, go back to INTRO.
    if (urlContext === "watch" || urlContext === "perfume") {
      setContext(urlContext);
      setViewState("SHOP");
    } else {
      setViewState("INTRO");
      setContext(null);
    }
  }, [searchParams]);

  // 4. CHECK URL ON MOUNT
  useEffect(() => {
    const contextParam = searchParams.get("context");
    if (contextParam === "watch" || contextParam === "perfume") {
      setContext(contextParam);
      setViewState("SHOP");
    }
  }, [searchParams]);

  const handleEnterShop = (type: "watch" | "perfume") => {
    setContext(type);
    setViewState("SHOP");
    router.push(`/product?context=${type}`); // NEW: Pushes to URL
  };

  const handleSwitchContext = () => {
    const newContext = context === "watch" ? "perfume" : "watch";
    setContext(newContext);
    router.push(`/product?context=${newContext}`); // NEW: Pushes to URL
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white relative">
      <Navbar />

      <AnimatePresence mode="wait">
        {viewState === "INTRO" && (
          <motion.div key="intro" exit={{ opacity: 0, transition: { duration: 0.5 } }} className="relative z-10">
            <HeroSplit onEnter={handleEnterShop} />
          </motion.div>
        )}

        {viewState === "SHOP" && context && (
          <motion.div
            key="shop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 min-h-screen bg-[#050505]"
          >
            <CategoryHero context={context} />

            <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
              <ProductContent context={context} toggleContext={handleSwitchContext} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

import { supabase } from "@/lib/supabase"; // Make sure to add this import at the top!

// ==========================================
// 5. PRODUCT CONTENT (DYNAMIC SUPABASE FETCH)
// ==========================================

function ProductContent({ context, toggleContext }: { context: "watch" | "perfume" | null, toggleContext: () => void }) {
  const searchParams = useSearchParams();

  // Data State
  const [allProducts, setAllProducts] = useState<ProductWithType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // --- FETCH PRODUCTS FROM SUPABASE ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        // Query products, joining images, variants, and their linked collections
        const { data, error } = await supabase
          .from("products")
          .select(`
            id,
            title,
            brand,
            base_price,
            product_images ( image_url, is_primary ),
            product_variants ( id, color, is_on_sale, price, is_primary ),
            collection_products ( collections ( title, type ) ),
            categories ( name )
          `)
          .eq("is_active", true);
        console.log("Raw Supabase Data:", data); // Debug log to inspect raw data
        if (error) throw error;

        // Map the raw database data to match your UI's ProductWithType interface
        const mappedProducts: ProductWithType[] = data.map((item: any) => {
          // Get primary image, or fallback to the first available image
          const primaryImg = item.product_images?.find((img: any) => img.is_primary)?.image_url;
          const fallbackImg = item.product_images?.[0]?.image_url || "/watch-1.png";

          // Check if any variant of this product is on sale
          const isSale = item.product_variants?.some((v: any) => v.is_on_sale) || false;

          // Get the collection data (Assuming it belongs to at least one)
          const collectionData = item.collection_products?.[0];
          console.log("Collection Data for Product ID", item.id, ":", collectionData); // Debug log to inspect collection data
          const categoryData = item.categories?.name.toLowerCase();

          // Get primary variant or first variant for pricing
          const primaryVariant = item.product_variants?.find((v: any) => v.is_primary === true);
          const variantPrice = primaryVariant?.price || item.base_price;
          const salePrice = primaryVariant?.sale_price || null;
          const isOnSale = primaryVariant?.is_on_sale || false;
          const defaultVariantId = primaryVariant?.id || item.product_variants?.[0]?.id;

          return {
            id: item.id.toString(),
            category: categoryData,
            name: item.title,
            brand: item.brand || "VibeCart", // Uses the new brand column
            collection: collectionData?.collections?.title || "Uncategorized",
            price: variantPrice,
            salePrice: salePrice,
            isOnSale: isOnSale,
            image: primaryImg || fallbackImg,
            colors: item.product_variants?.length
              ? [...new Set(item.product_variants.map((v: any) => v.color).filter(Boolean))] as string[]
              : ["#000"],
            defaultVariantId: defaultVariantId,
            isSale: isSale,
            isNew: false // You can make this dynamic later based on created_at dates
          };
        });

        setAllProducts(mappedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- AUTOMATIC FILTER RESET LOGIC ---
  useEffect(() => {
    setSearchQuery("");
    setSelectedBrands([]);

    const urlCategory = searchParams.get("category");
    const urlContext = searchParams.get("context");

    if (urlCategory && urlContext === context) {
      setSelectedCategories([decodeURIComponent(urlCategory)]);
    } else {
      setSelectedCategories([]);
    }
  }, [context, searchParams]);

  // --- CLIENT-SIDE FILTERING ---
  const filteredProducts = allProducts.filter((product) => {
    if (context && product.category !== context) return false;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.collection);
    console.log(product.collection, "matches category?", matchesCategory); // Debug log to check category matching
    return matchesSearch && matchesBrand && matchesCategory;
  });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-screen relative">

      {/* FLOATING SWITCH BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 right-4 md:bottom-10 md:right-6 z-[100]"
      >
        <Button
          onClick={toggleContext}
          className="h-12 md:h-14 px-6 md:px-8 rounded-full bg-gradient-to-r from-[#BF953F] to-[#B38728] hover:from-[#FCF6BA] hover:to-[#BF953F] text-black font-black text-[10px] md:text-xs tracking-[0.2em] shadow-[0_0_40px_rgba(191,149,63,0.4)] transition-all hover:scale-105 flex items-center gap-2 md:gap-3 border-2 border-white/10"
        >
          <ArrowRightLeft className="w-4 h-4 md:w-5 md:h-5" />
          SWITCH TO {context === "watch" ? "PERFUMES" : "WATCHES"}
        </Button>
      </motion.div>

      {/* MOBILE FILTER HEADER */}
      <div className="lg:hidden flex items-center justify-between sticky top-[0px] z-[60] bg-[#050505] p-4 border-b border-white/10 -mx-4 px-6 shadow-xl mb-6">
        <span className="text-white text-sm font-serif font-bold tracking-widest">{filteredProducts.length} Results</span>
        <Button variant="outline" onClick={() => setIsMobileFiltersOpen(true)} className="border-white/20 bg-white/5 text-white hover:bg-white hover:text-black transition-colors gap-2 rounded-full h-9">
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:block w-64 space-y-8 flex-shrink-0 sticky top-24 h-fit">
        <ProductFilters
          context={context}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </aside>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileFiltersOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] lg:hidden" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-[85vw] max-w-[350px] bg-[#0a0a0a] border-l border-white/10 p-6 z-[1000] lg:hidden overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h3 className="font-serif font-bold text-xl text-white">FILTERS</h3>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <ProductFilters context={context} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
              <Button className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-6 rounded-full mt-8 shadow-lg" onClick={() => setIsMobileFiltersOpen(false)}>SHOW {filteredProducts.length} RESULTS</Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* PRODUCT GRID */}
      <div className="flex-1">
        <div className="hidden lg:block mb-8 border-b border-white/10 pb-4">
          <h2 className="text-4xl font-serif font-bold text-white mb-2">{context === "watch" ? "TIMEPIECES" : context === "perfume" ? "FRAGRANCES" : "INVENTORY"}</h2>
          <p className="text-gray-400 text-sm">Showing {filteredProducts.length} curated items</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-[40vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`${context}-${selectedBrands}-${selectedCategories}`}
          >
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={cardVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="h-[50vh] flex flex-col items-center justify-center text-gray-500 space-y-4">
            <Search className="w-12 h-12 opacity-20" />
            <p>No products found matching your criteria.</p>
            <Button variant="link" className="text-yellow-500" onClick={() => { setSelectedBrands([]); setSelectedCategories([]); setSearchQuery(""); }}>Clear all filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}