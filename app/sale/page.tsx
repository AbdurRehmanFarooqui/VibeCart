"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, Gem } from "lucide-react";
import { supabase } from "@/lib/supabase";

// --- MOCK DATA (Updated for Vibe Cart Inventory) ---
const SALE_PRODUCTS = [
  { id: "s1", name: "Royal Oak 'Jumbo'", brand: "Rolex Style", category: "Luxury", price: 2800, originalPrice: 3500, discount: 20, image: "/watch-1.png", colors: ["#000"], isSale: true },
  { id: "s2", name: "Sauvage Elixir", brand: "Pendora", category: "Perfume", price: 1500, originalPrice: 1800, discount: 16, image: "/perfume-1.png", colors: ["#000"], isSale: true },
  { id: "s3", name: "Nautilus Blue", brand: "Patek Style", category: "Luxury", price: 3200, originalPrice: 4200, discount: 23, image: "/watch-2.png", colors: ["#000"], isSale: true },
  { id: "s4", name: "Creed Aventus", brand: "Armaf", category: "Perfume", price: 1800, originalPrice: 2200, discount: 18, image: "/perfume-1.png", colors: ["#000"], isSale: true },
  { id: "s5", name: "Hublot Big Bang", brand: "Hublot Style", category: "Sport", price: 2000, originalPrice: 4000, discount: 50, image: "/watch-1.png", colors: ["#000"], isSale: true, isClearance: true },
  { id: "s6", name: "Oud Mood", brand: "Lattafa", category: "Perfume", price: 1200, originalPrice: 2500, discount: 52, image: "/perfume-1.png", colors: ["#000"], isSale: true, isClearance: true }
];
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  sub_heading?: string | null;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  colors: string[];
  isNew?: boolean;
  isSale?: boolean;
  isClearance?: boolean;
}
function SaleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [SaleProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const filterParam = searchParams.get("filter");
    setActiveFilter(filterParam || "all");
  }, [searchParams]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    router.push(`/sale?filter=${filter}`, { scroll: false });
  };

  const filteredProducts = SaleProducts.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "20") return p.discount && p.discount >= 20;
    if (activeFilter === "50") return p.discount && p.discount >= 50;
    if (activeFilter === "clearance") return p.isClearance === true;
    return true;
  });

  const getButtonStyle = (isActive: boolean) => {
    return isActive
      ? "bg-yellow-600 text-black border-yellow-600 font-bold"
      : "bg-transparent text-gray-400 border-white/20 hover:border-yellow-500 hover:text-yellow-500";
  };
  // FETCH DATA FROM SUPABASE
  useEffect(() => {
    const fetchProducts = async () => {
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
            sub_heading,
            categories ( name ),
            product_images ( image_url ),
            product_variants ( id, color, is_primary, price, sale_price, is_on_sale ) 
          `)
          .eq("is_active", true)
          .eq("product_images.is_primary", true)
          .order("created_at", { ascending: true })
          .limit(12);

        if (error) throw error;
        console.log("Raw product data from Supabase:", data);

        // Map the data and apply sale pricing logic
        const mappedProducts = data.map((item: any) => {

          // Find the variant marked as primary, or fallback to the first available variant
          const primaryVariant = item.product_variants?.find((v: any) => v.is_primary === true);
          const defaultVariantId = primaryVariant?.id || item.product_variants?.[0]?.id || null;

          // Use primary variant price, fallback to base_price
          const variantPrice = primaryVariant?.price || item.base_price;
          const salePrice = primaryVariant?.sale_price || null;
          const isOnSale = primaryVariant?.is_on_sale || false;
          if (!isOnSale) { return null; } // Only include products that are on sale
          return {
            id: item.id.toString(),
            name: item.title,
            brand: item.brand || "VibeCart",
            category: item.categories?.name || "Classic",
            sub_heading: item.sub_heading || "",
            price: variantPrice,
            salePrice: salePrice,
            isOnSale: isOnSale,
            image: item.product_images?.[0]?.image_url || "/watch-1.png",
            colors: item.product_variants?.length
              ? [...new Set(item.product_variants.map((v: any) => v.color).filter(Boolean))]
              : ["#000"],
            defaultVariantId: defaultVariantId,
            isNew: false,
            isSale: isOnSale,
          };
        }).filter(Boolean) as Product[];

        setFeaturedProducts(mappedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">

      {/* --- FILTER TABS --- */}
      {/* <div className="flex flex-wrap justify-center gap-3 mb-12">
        <Button 
            variant="outline" 
            onClick={() => handleFilterChange("all")} 
            className={`rounded-full px-8 py-6 text-sm transition-all duration-300 ${getButtonStyle(activeFilter === "all")}`}
        >
            View All
        </Button>
        <Button 
            variant="outline" 
            onClick={() => handleFilterChange("20")} 
            className={`rounded-full px-8 py-6 text-sm transition-all duration-300 ${getButtonStyle(activeFilter === "20")}`}
        >
            Under 20% Off
        </Button>
        <Button 
            variant="outline" 
            onClick={() => handleFilterChange("50")} 
            className={`rounded-full px-8 py-6 text-sm transition-all duration-300 ${getButtonStyle(activeFilter === "50")}`}
        >
            Half Price
        </Button>
        <Button 
            variant="outline" 
            onClick={() => handleFilterChange("clearance")} 
            className={`rounded-full px-8 py-6 text-sm transition-all duration-300 ${getButtonStyle(activeFilter === "clearance")}`}
        >
            Last Chance
        </Button>
      </div> */}

      {isLoading && (
        <div className="flex justify-center items-center h-[40vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      )}

      {/* --- PRODUCT GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {filteredProducts.map((item: any) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-32 flex flex-col items-center justify-center space-y-4">
          <Gem className="w-12 h-12 text-white/10" />
          <p className="text-gray-500 font-serif">No exclusive items found in this category.</p>
          <Button variant="link" className="text-yellow-500" onClick={() => handleFilterChange("all")}>View All Offers</Button>
        </div>
      )}

    </div>
  );
}

export default function SalePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* <Navbar /> */}

      {/* HERO SECTION */}
      <section className="relative w-full h-[45vh] md:h-[50vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/10 pt-16 md:pt-0">

        {/* Background Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-[#050505] to-[#050505]" />

        <div className="text-center space-y-6 relative z-10 px-4 max-w-4xl">
          <Badge className="bg-yellow-600/10 text-yellow-500 border border-yellow-500/20 px-4 py-1.5 text-xs tracking-[0.2em] uppercase mx-auto w-fit font-serif flex items-center gap-2">
            <Clock className="w-3 h-3" /> Limited Time Access
          </Badge>

          <h1 className="text-5xl md:text-8xl font-serif font-black italic tracking-tighter uppercase leading-[0.9]">
            PRIVATE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">ARCHIVE</span>
          </h1>

          <p className="text-gray-400 text-sm md:text-lg max-w-lg mx-auto leading-relaxed">
            Exclusive pricing on our last-remaining premium stock.
            Once these pieces are gone, they will not be restocked.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="text-center py-32 text-yellow-500">Loading exclusive offers...</div>}>
        <SaleContent />
      </Suspense>

      {/* <Footer /> */}
    </main>
  );
}