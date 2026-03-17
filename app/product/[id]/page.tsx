"use client";

import { useState, use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, Clock, Droplet, Play, X, ArrowLeft, ArrowRight, Diamond, PackageCheck, Truck, RefreshCcw, Star, ShieldCheck, ShoppingBag, Banknote } from "lucide-react";
import { Facebook, Instagram, Twitter } from "lucide-react";

import ProductCard from "@/components/ProductCard";
import LifeStyleImageSection from "@/components/LifeStyleImageSection";
import ReviewsSection from "@/components/ReviewsSection";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

// IMPORT SUPABASE
import { supabase } from "@/lib/supabase";
import PremiumNewsletter from "@/components/PremiumNewsLetter";

// --- STYLING CONSTANTS ---
const GOLD_TEXT = "bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]";

// --- INTERFACES ---
interface MappedColor {
    name: string;
    hex: string;
    img: string;
    images: string[]; // All images for this variant
    variantId: number | string;
    price: number;
    salePrice?: number | null;
    isOnSale?: boolean;
}
interface ProductData {
    id: string;
    title: string;
    brand: string | null;
    description: string | null;
    base_price: number;
    avg_rating: number | null;
    number_of_reviews: number | null;
    collection_products: Array<{
        collections: Array<{
            title: string
        }> | null
    }> | null;
    product_images: Array<{
        id: string;
        variant_id: string | null;
        image_url: string;
        is_primary: boolean
    }> | null;
    product_variants: Array<{
        id: string;
        color: string | null;
        size: string | null;
        price: number | null;
        sale_price: number | null;
        is_on_sale: boolean | null
    }> | null;
    lifestyle_images: Array<{
        url: string; // Changed from image_url to url to match your query
    }> | null;
}

interface MappedProduct {
    id: string;
    brand: string;
    name: string;
    collection: string;
    price: number;
    description: string;
    videoSrc: string;
    avg_rating?: number;
    number_of_reviews?: number;
    colors: MappedColor[];
    variants: string[];
    lifestyle_images: string[];
}
const images = [
    "/1.png",
    "/2.png",
    "/3.png",
    "/4.png",
    "/5.png",
    "/6.png",
]
// --- COMPONENT: TITLE ---
const FormatName = ({ name }: { name: string }) => {
    const parts = name.split(" ");
    return (
        <h1 className="text-4xl md:text-7xl font-serif font-black uppercase tracking-tighter leading-[0.9] relative z-0">
            {parts.map((word, i) => {
                const isGold = i === parts.length - 1 || /\d/.test(word);
                return (
                    <span key={i} className={isGold ? GOLD_TEXT + " drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]" : "text-white"}>
                        {word}{" "}{i === 1 && <br className="hidden md:block" />}
                    </span>
                );
            })}
        </h1>
    );
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    // --- DATA STATES ---
    const [product, setProduct] = useState<MappedProduct | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- UI STATES ---
    const [activeColorIndex, setActiveColorIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Index of image within the variant's images
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [cartItem, setCartItem] = useState<any>(null); // Track if current variant is in cart
    const { addToCart, cart } = useCart();

    // --- FETCH DATA FROM SUPABASE ---
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setIsLoading(true);

                // 1. Fetch Main Product
                const { data: data, error: productError } = await supabase
                    .from("products")
                    .select(`
            id,
            title,
            brand,
            description,
            base_price,
            avg_rating,
            number_of_reviews,
            collection_products ( collections ( title ) ),
            product_images ( id, variant_id, image_url, is_primary ),
            product_variants ( id, color, size, price, sale_price, is_on_sale ),
            lifestyle_images ( url )
          `)
                    .eq("id", id)
                    .single();

                if (productError) throw productError;
                const productData = data as ProductData;
                // Process Images & Colors
                const primaryImg = productData.product_images?.find((img: any) => img.is_primary)?.image_url || "/watch-1.png";

                // Group variants into unique colors for the selector
                // Inside fetchProductData, update the uniqueColorsMap logic:

                const uniqueColorsMap = new Map<string, MappedColor & { variantId: number | string }>();

                if (productData.product_variants && productData.product_variants.length > 0) {
                    productData.product_variants.forEach((v: any) => {
                        if (!v.color) return;

                        // If we haven't added this color yet, add it
                        if (!uniqueColorsMap.has(v.color)) {
                            // Get ALL images for this variant
                            const variantImages = productData.product_images
                                ?.filter((img: any) => img.variant_id === v.id)
                                .map((img: any) => img.image_url) || [];

                            // Fallback to primary image if no variant-specific images
                            const imagesForVariant = variantImages.length > 0 ? variantImages : [primaryImg];
                            const mainImg = imagesForVariant[0] || primaryImg;

                            uniqueColorsMap.set(v.color, {
                                name: v.color,
                                hex: v.color.startsWith('#') ? v.color : v.color,
                                img: mainImg,
                                images: imagesForVariant,
                                variantId: v.id,
                                price: v.price || productData.base_price,
                                salePrice: v.sale_price || null,
                                isOnSale: v.is_on_sale || false
                            });
                        }
                    });
                }

                let mappedColors = Array.from(uniqueColorsMap.values());
                // Fallback if no specific colors exist in DB
                if (mappedColors.length === 0) {
                    mappedColors = [{
                        name: "Standard",
                        hex: "#e2e8f0",
                        img: primaryImg,
                        images: [primaryImg],
                        variantId: productData.product_variants?.[0]?.id || 0,
                        price: productData.base_price,
                        salePrice: null,
                        isOnSale: false
                    }];
                }

                // Extract available sizes (if applicable)
                const sizes = [...new Set(productData.product_variants?.map((v: any) => v.size).filter(Boolean))] as string[];

                setProduct({
                    id: productData.id.toString(),
                    brand: productData.brand || "VibeCart",
                    name: productData.title,
                    avg_rating: productData.avg_rating || 0,
                    number_of_reviews: productData.number_of_reviews || 0,
                    collection: productData.collection_products?.[0]?.collections?.[0]?.title || "Exclusive",
                    price: productData.base_price,
                    description: productData.description || "The epitome of modern horology and luxury.",
                    videoSrc: "/watch-promo.mp4", // Kept static as DB doesn't have video column yet
                    colors: mappedColors,
                    variants: sizes,
                    lifestyle_images: productData.lifestyle_images?.map((img) => img.url) || []
                });

                // 2. Fetch Related Products (Limit 3)
                const { data: relatedData, error: relatedError } = await supabase
                    .from("products")
                    .select(`
            id, title, brand, base_price,
            product_images ( image_url, is_primary ),
            product_variants ( id, color, is_on_sale, price, sale_price, is_primary ),
            collection_products ( collections ( title, type ) )
          `)
                    .eq("is_active", true)
                    .neq("id", id) // Don't fetch the current product
                    .limit(3);

                if (!relatedError && relatedData) {
                    const mappedRelated = relatedData.map((item: any) => {
                        const img = item.product_images?.find((i: any) => i.is_primary)?.image_url || item.product_images?.[0]?.image_url || "/watch-1.png";
                        // Get the primary variant price, fallback to base_price
                        const primaryVariant = item.product_variants?.find((v: any) => v.is_primary === true);
                        const variantPrice = primaryVariant?.price || item.base_price;
                        const salePrice = primaryVariant?.sale_price || null;
                        const isOnSale = primaryVariant?.is_on_sale || false;
                        const defaultVariantId = primaryVariant?.id || item.product_variants?.[0]?.id;

                        return {
                            id: item.id.toString(),
                            name: item.title,
                            brand: item.brand || "VibeCart",
                            category: item.collection_products?.[0]?.collections?.title || "Luxury",
                            price: variantPrice,
                            salePrice: salePrice,
                            isOnSale: isOnSale,
                            image: img,
                            colors: item.product_variants?.length ? ["#000"] : ["#000"],
                            defaultVariantId: defaultVariantId
                        };
                    });
                    setRelatedProducts(mappedRelated);
                }
                console.log("Fetched Product:", productData);
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchProductData();
    }, [id]);

    useEffect(() => {
        setCartItem(cart.find((item) => item.variantId === product?.colors[activeColorIndex].variantId))
        console.log("Cart Item for current variant:", cartItem);
    }, [cart, activeColorIndex, product]);

    // --- INTERACTION LOGIC ---
    const getCurrentImages = () => {
        if (!product || !product.colors[activeColorIndex]) return ["/watch-1.png"];
        return product.colors[activeColorIndex].images || ["/watch-1.png"];
    };

    const getCurrentImage = () => {
        const images = getCurrentImages();
        return images[currentImageIndex] || "/watch-1.png";
    };

    const goToNextImage = () => {
        const images = getCurrentImages();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const goToPreviousImage = () => {
        const images = getCurrentImages();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const getCurrentPrice = () => {
        if (!product || !product.colors[activeColorIndex]) {
            return product?.price || 0;
        }
        const currentColor = product.colors[activeColorIndex];
        // Use sale price if available and on sale, otherwise use regular price
        return currentColor.isOnSale && currentColor.salePrice
            ? currentColor.salePrice
            : currentColor.price;
    };

    const getCurrentSalePrice = () => {
        if (!product || !product.colors[activeColorIndex]) return null;
        const currentColor = product.colors[activeColorIndex];
        return currentColor.isOnSale && currentColor.salePrice ? currentColor.salePrice : null;
    };

    const getOriginalPrice = () => {
        if (!product || !product.colors[activeColorIndex]) return null;
        const currentColor = product.colors[activeColorIndex];
        return currentColor.isOnSale && currentColor.salePrice ? currentColor.price : null;
    };

    const handleColorChange = (index: number) => {
        setActiveColorIndex(index);
        setCurrentImageIndex(0); // Reset to first image of this variant
    };

    // --- LOADING STATE ---
    if (isLoading || !product) {
        return (
            <main className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </main>
        );
    }
    useEffect(() => {
        if (typeof window !== "undefined" && window.fbq) {
            window.fbq('track', 'ViewContent', {
                content_name: product.name,
                content_category: 'Perfume', // or product.category
                content_ids: [product.id],
                content_type: 'product',
                value: product.price,
                currency: 'PKR'
            });
        }
    }, [product]);
    return (
        <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden flex flex-col">
            {/* <Navbar /> */}

            {/* BACKGROUND AMBIANCE */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-yellow-900/10 via-[#050505] to-[#050505] pointer-events-none z-0" />

            {/* ========================================================= */}
            {/* VIDEO OVERLAY */}
            {/* ========================================================= */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 bg-black flex flex-col items-center justify-center"
                    >
                        <button
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute top-8 right-8 z-50 text-white hover:text-yellow-500 transition-colors flex items-center gap-2 group"
                        >
                            <span className="uppercase font-bold tracking-widest text-sm group-hover:underline">Close Video</span>
                            <div className="p-2 rounded-full border border-white/20 group-hover:border-yellow-500">
                                <X className="w-6 h-6" />
                            </div>
                        </button>

                        <div className="relative w-full h-full max-w-7xl max-h-[80vh]">
                            <video
                                src={product.videoSrc}
                                autoPlay
                                controls
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ========================================================= */}
            {/* MOBILE VIEW */}
            {/* ========================================================= */}
            <div className="md:hidden flex-1 flex flex-col px-6 overflow-y-auto relative z-10 pt-5">
                <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4">
                    <Link href="/" className="hover:text-yellow-500">Home</Link> /
                    <Link href="/product" className="hover:text-yellow-500">{product.collection}</Link> /
                    <span className="text-white truncate max-w-25">{product.name}</span>
                </div>

                <div className="relative w-screen h-[50vh] mb-8 -mx-6 overflow-hidden flex flex-col justify-center items-center group">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
                        <h1 className="text-[120px] font-black text-white/5 italic">VIBE</h1>
                    </div>

                    <button onClick={goToPreviousImage} className="absolute left-4 z-20 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button onClick={goToNextImage} className="absolute right-4 z-20 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">
                        <ArrowRight className="w-5 h-5" />
                    </button>

                    {/* <button onClick={() => setIsVideoOpen(true)} className="absolute bottom-4 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-yellow-500/50 text-yellow-500 text-xs font-bold uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all">
                        <Play className="w-3 h-3 fill-current" /> Watch Film
                    </button> */}

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={getCurrentImage()}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="relative w-full h-full flex items-center justify-center z-10"
                        >
                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="relative w-[80%] h-[80%]">
                                <Image src={getCurrentImage()} alt={product.name} fill className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]" priority />
                            </motion.div>
                            {/* Image counter for mobile */}
                            {getCurrentImages().length > 1 && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-bold">
                                    {currentImageIndex + 1} / {getCurrentImages().length}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* COLOR SELECTOR */}
                {!product.collection.toLowerCase().includes("fragrance") && product.colors.length > 1 && (
                    <div className="w-full flex justify-center mt-4 mb-2">
                        <div className="flex flex-row items-center gap-4 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10">
                            {product.colors.slice(0, 3).map((color, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleColorChange(index)}
                                    className={`w-6 h-6 rounded-full border border-white/20 transition-all duration-300 ${index === activeColorIndex ? "scale-125 ring-2 ring-yellow-500 opacity-100" : "scale-100 opacity-60 hover:opacity-100"
                                        }`}
                                    style={{ backgroundColor: color.hex }}
                                />
                            ))}
                            {product.colors.length > 3 && (
                                <span className="text-xs text-gray-400 font-bold ml-1">+{product.colors.length - 3}</span>
                            )}
                        </div>
                    </div>
                )}

                {/* DETAILS & CART */}
                <div className="space-y-2 pt-5 pb-24">

                    <div className="text-yellow-500 font-bold tracking-[0.4em] text-sm uppercase text-center">{product.brand}</div>

                    <div className="flex-col justify-between items-start ">

                        <div className="text-center"><FormatName name={product.name} /></div>

                        <div className=" space-y-1 pt-4">
                            <div className="flex justify-center items-center gap-2">
                                <div className="text-gray-400 font-bold tracking-widest uppercase text-[10px]">{product.collection}</div>
                                {product.colors[activeColorIndex]?.isOnSale && (
                                    <span className="text-[10px] font-black tracking-widest px-2 py-1 rounded-sm bg-red-500/20 text-red-400 border border-red-500/50">SALE</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                {getOriginalPrice() && (
                                    <span className="text-sm text-gray-400 line-through">Rs. {getOriginalPrice()?.toLocaleString()}</span>
                                )}
                                <div className="text-2xl font-serif font-black tracking-tight text-white">Rs. {getCurrentPrice().toLocaleString()}</div>
                            </div>
                        </div>

                    </div>

                    <Button
                        size="lg"
                        onClick={() => {
                            try {
                                const selectedVariant = product.colors[activeColorIndex];
                                addToCart(
                                    {
                                        id: product.id,
                                        name: product.name,
                                        brand: product.brand,
                                        category: product.collection,
                                        price: getCurrentPrice(),
                                        image: getCurrentImage(),
                                        colors: [selectedVariant.hex]
                                    },
                                    selectedVariant.variantId // <--- PASS THE VARIANT ID
                                );

                            } catch (error: any) {
                                alert(error.message || "Failed to add item to cart. Please try again.");
                            }
                        }}
                        className="w-full h-14 bg-linear-to-r from-[#BF953F] to-[#B38728] text-black font-black tracking-widest text-lg rounded-full"
                    >
                        {cartItem?.cartId == product.colors[activeColorIndex].variantId ? "UPDATE VAULT" : "ADD TO VAULT"}
                    </Button>
                </div>
            </div>

            {/* ========================================================= */}
            {/* DESKTOP VIEW */}
            {/* ========================================================= */}
            <div className="hidden md:flex flex-1 relative w-full h-full flex-row max-w-7xl mx-auto px-6 py-12 items-center z-10 mt-16">

                {/* LEFT COLUMN */}
                <div className="flex-1 flex flex-col justify-center space-y-6 relative z-20 pointer-events-auto max-w-[45%]">
                    <div className="text-yellow-500 font-bold tracking-[0.4em] text-lg uppercase mb-2">{product.brand}</div>
                    <FormatName name={product.name} />
                    <div className="space-y-6 relative z-30 pt-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 font-bold tracking-widest uppercase text-sm">{product.collection} Collection</span>
                                {product.colors[activeColorIndex]?.isOnSale && (
                                    <span className="text-[10px] font-black tracking-widest px-2 py-1 rounded-sm bg-red-500/20 text-red-400 border border-red-500/50">SALE</span>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                {getOriginalPrice() && (
                                    <span className="text-lg text-gray-400 line-through">Rs. {getOriginalPrice()?.toLocaleString()}</span>
                                )}
                                <p className="text-5xl font-serif font-black tracking-tight text-white">Rs. {getCurrentPrice().toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="pt-4">
                            <Button
                                size="lg"
                                onClick={() => {
                                    try {
                                        const selectedVariant = product.colors[activeColorIndex];
                                        addToCart(
                                            {
                                                id: product.id,
                                                name: product.name,
                                                brand: product.brand,
                                                category: product.collection,
                                                price: getCurrentPrice(),
                                                image: getCurrentImage(),
                                                colors: [selectedVariant.hex]
                                            },
                                            selectedVariant.variantId // <--- PASS THE VARIANT ID
                                        );
                                    } catch (error: any) {
                                        alert(error.message || "Failed to add item to cart. Please try again.");
                                    }
                                }}
                                className="h-14 px-10 rounded-full bg-linear-to-r from-[#BF953F] to-[#B38728] hover:from-[#FCF6BA] hover:to-[#BF953F] text-black font-black font-serif tracking-widest text-lg shadow-[0_0_30px_rgba(234,179,8,0.2)] hover:shadow-[0_0_40px_rgba(252,246,186,0.4)] hover:scale-105 transition-all duration-300"
                            >
                                {cartItem?.cartId == product.colors[activeColorIndex].variantId ? "UPDATE VAULT" : "ADD TO VAULT"} <ShoppingBag className="ml-3 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* CENTER/RIGHT COLUMN */}
                <div className={`relative w-[65%] -ml-12 h-[80vh] z-10 transition-opacity duration-300 flex flex-col items-center justify-center ${isDrawerOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
                        <h1 className="text-[250px] font-black italic text-white/2 tracking-tighter">VIBE</h1>
                    </div>

                    {/* <motion.button
                        onClick={() => setIsVideoOpen(true)}
                        whileHover={{ scale: 1.05 }}
                        className="absolute top-0 right-1.5/4 z-30 flex items-center gap-3 px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:border-yellow-500 hover:bg-black/60 transition-all group"
                    >
                        <div className="p-2 bg-yellow-500 rounded-full text-black">
                            <Play className="w-3 h-3 fill-current" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-white group-hover:text-yellow-500">Watch Cinematic</span>
                    </motion.button> */}

                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full flex justify-between px-12 z-30 pointer-events-none">
                        <button onClick={goToPreviousImage} className="pointer-events-auto p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all text-white backdrop-blur-md">
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <button onClick={goToNextImage} className="pointer-events-auto p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all text-white backdrop-blur-md">
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </div>


                    <AnimatePresence mode="wait">
                        <motion.div
                            key={getCurrentImage()}
                            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 1.05, rotate: 2 }}
                            transition={{ duration: 0.4 }}
                            className="relative w-[80%] h-[80%] z-10 flex items-center justify-center"
                        >
                            <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="w-full h-full relative">
                                <Image src={getCurrentImage()} alt={product.name} fill className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]" priority />
                            </motion.div>
                            {/* Image counter for desktop */}
                            {getCurrentImages().length > 1 && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-bold">
                                    {currentImageIndex + 1} / {getCurrentImages().length}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* RIGHT EDGE (Color Palette) */}
                {!product.collection.toLowerCase().includes("fragrance") && product.colors.length > 1 && (
                    <div className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-transform duration-500 ${isDrawerOpen ? "translate-x-full" : "translate-x-0"}`}>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-72 bg-white/5 backdrop-blur-xl border-l border-white/10 rounded-l-3xl shadow-xl" />
                        <div className="relative h-72 flex flex-col items-center justify-center gap-8 pr-6">

                            {product.colors.map((color, index) => (
                                <div key={index} className="relative group">
                                    <button onClick={() => handleColorChange(index)} className={`w-8 h-8 rounded-full shadow-lg transition-all duration-300 ${index === activeColorIndex ? "scale-125 ring-2 ring-yellow-500 ring-offset-2 ring-offset-black" : "scale-100 opacity-50 hover:opacity-100"}`} style={{ backgroundColor: color.hex }} />
                                </div>
                            ))}

                        </div>
                    </div>
                )}
            </div>
            <motion.div
                key="drawer"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className=" bg-[#050505]/98 backdrop-blur-3xl text-white flex flex-col border-t border-white/10"
            >
                <div className="w-full max-w-5xl mx-auto px-6 py-18 space-y-14">

                    {/* 1. HEADER & INTRO */}
                    <div className="text-center space-y-8">
                        <h2 className="text-5xl md:text-8xl font-serif font-black uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-gray-700">
                            The Vibe
                        </h2>
                        <div className="w-24 h-1 bg-linear-to-r from-[#BF953F] to-[#B38728] mx-auto rounded-full" />
                        <p className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light italic whitespace-pre-line">
                            "{product.description}"
                        </p>
                    </div>

                    {/* 2. THE THREE PILLARS (Generalized for all Accessories) */}
                    <div className="grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-3 gap-1 md:gap-6">
                        {[
                            {
                                icon: Diamond,
                                title: "Curated Style",
                                sub: "Hand-selected pieces designed to elevate your daily look, from timeless watches to signature scents.",
                                color: '[#BF953F]',
                                bordercolor: 'border-yellow-500/30'
                            },
                            {
                                icon: PackageCheck,
                                title: "Quality Inspected",
                                sub: "Every item undergoes a rigorous check before dispatch to ensure it arrives in perfect condition.",
                                color: 'emerald-400',
                                bordercolor: 'border-green-500/30'
                            },
                            {
                                icon: Truck,
                                title: "Doorstep Delivery",
                                sub: "Fast, secure shipping with Cash on Delivery options available across the country.",
                                color: 'blue-400',
                                bordercolor: 'border-blue-500/30'
                            },
                        ].map((item, i) => (
                            <div key={i} className={`bg-white/3 border border-white/10 p-2 md:p-10 rounded-xl md:rounded-3xl text-left md:text-center hover:${item.bordercolor} hover:bg-white/5 transition-all duration-500 group`}>
                                <div className="flex md:flex-col items-center md:items-center gap-2 md:gap-0 justify-start pb-2 md:pb-0">
                                    <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-white/5 md:mx-auto md:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <item.icon className={`w-5 h-5 md:w-8 md:h-8 text-${item.color}`} />
                                    </div>
                                    <h4 className="font-serif font-bold text-xs md:text-2xl md:mb-3 text-white">{item.title}</h4>
                                </div>
                                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                                    {item.sub}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </motion.div>

            {/* LifeStyle Images Sections */}
            {/* In your ProductDetailPage */}
            {product?.lifestyle_images && product.lifestyle_images.length > 0 && (
                <LifeStyleImageSection
                    images={product.lifestyle_images}
                    productTitle={product.name || ""}
                />
            )}

            {/* Reviews Sections */}
            <ReviewsSection productId={product.id} avgRating={product.avg_rating || 0} totalReviews={product.number_of_reviews || 0} />



            {/* ========================================================= */}
            {/* 1. THE VIBE PROMISE (Trust Signals) */}
            {/* ========================================================= */}
            <section className="relative z-10 bg-[#080808] border-t border-white/5 py-18">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-6">
                        {[
                            {
                                icon: ShieldCheck,
                                title: "Quality Assured",
                                sub: "Inspected Before Dispatch"
                            },
                            {
                                icon: Banknote, // Use Banknote for COD focus
                                title: "Pay on Delivery",
                                sub: "Cash on Delivery Available"
                            },
                            {
                                icon: RefreshCcw,
                                title: "Secure Exchange",
                                sub: "7-Day Wrong/Damage Policy"
                            },
                            {
                                icon: Clock,
                                title: "Support",
                                sub: "Quick Response Assistance"
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-2 py-4 md:p-8 rounded-2xl bg-white/0.02 border border-white/5 hover:border-yellow-500/30 hover:bg-white/0.04 transition-all duration-300 group flex flex-col items-center text-center gap-2 md:gap-4 cursor-default">
                                <div className="p-2 md:p-4 rounded-full bg-white/5 group-hover:bg-yellow-500/20 transition-colors duration-500">
                                    <item.icon className="w-5 md:w-6 h-6 md:h-6 text-gray-400 group-hover:text-yellow-500 transition-colors" />
                                </div>
                                <div>
                                    <h4 className="font-serif font-bold text-white text-sm md:text-lg tracking-tight">{item.title}</h4>
                                    <p className="text-[10px] text-gray-500 md:uppercase tracking-widest mt-2 group-hover:text-gray-400 transition-colors">{item.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 2. RELATED PRODUCTS (Curated Grid) */}
            {/* ========================================================= */}
            <section className="relative z-10 py-18 bg-[#050505] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl md:text-6xl font-serif font-black text-white uppercase leading-none">
                                Curated <span className="text-gray-700">&</span><br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#BF953F] to-[#B38728]">
                                    Characterized
                                </span>
                            </h2>
                            <p className="text-gray-400 text-sm tracking-wide max-w-sm">
                                Selections designed to amplify your presence. Pieces that don't just complete an outfit—they define your signature vibe.
                            </p>
                        </div>
                        <Link href="/product">
                            <Button variant="ghost" className="text-white hover:text-yellow-500 font-bold uppercase tracking-widest border-b border-white/20 hover:border-yellow-500 rounded-none px-0 pb-1 h-auto transition-all group">
                                View Entire Vault <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    {/* THE DYNAMIC GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 md:gap-8">
                        {relatedProducts.map((prod) => (
                            <ProductCard key={prod.id} product={prod} />
                        ))}
                    </div>

                    <div className="mt-12 md:hidden text-center">
                        <Link href="/product">
                            <Button className="w-full rounded-xl py-6 border border-white/10 bg-white/5 text-white font-bold tracking-widest uppercase hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all">
                                Load More Styles
                            </Button>
                        </Link>
                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* 3. THE LIFESTYLE EDIT (Creative Visual Break) */}
            {/* ========================================================= */}
            <section className="relative z-10 py-20 bg-[#050505] overflow-hidden">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none">
                    <div className="whitespace-nowrap max-w-min mx-auto text-[5vw] px-6 font-black italic text-white animate-marquee">
                        LIFESTYLE • LUXURY • VIBE • CART •
                    </div>
                </div>

                {/* <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[600px] w-full group overflow-hidden rounded-2xl border border-white/10">
                            <Image
                                src="/lifestyle-man.jpg"
                                alt="Lifestyle"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-90" />
                            <div className="absolute bottom-8 left-8">
                                <h3 className="text-3xl font-serif font-bold text-white mb-2">The Executive Standard</h3>
                                <p className="text-gray-400 text-sm max-w-xs">Designed for the boardroom, the gala, and the drive home.</p>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <h3 className="text-4xl font-serif font-black text-white">
                                NOT JUST A WATCH. <br />
                                <span className="text-yellow-500">A STATEMENT.</span>
                            </h3>
                            <div className="flex gap-4">
                                <div className="w-1 bg-yellow-500 h-24" />
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    "In a world of noise, silence is luxury. Our pieces are designed to speak volumes without saying a word. Join the ranks of those who understand the value of presence."
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                                    <div className="text-3xl font-bold text-white">5k+</div>
                                    <div className="text-[10px] uppercase text-gray-500 tracking-widest">Vault Members</div>
                                </div>
                                <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                                    <div className="text-3xl font-bold text-white">4.9</div>
                                    <div className="text-[10px] uppercase text-gray-500 tracking-widest">Average Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>*/}
            </section>

            <PremiumNewsletter />
            {/* <Footer /> */}

            {/* ========================================================= */}
            {/* DRAWER TOGGLE BUTTON */}
            {/* ========================================================= */}
            {/* <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4 transition-all duration-500 ${isDrawerOpen ? "translate-y-0" : ""}`}>
                <AnimatePresence>
                    {!isDrawerOpen && (
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="text-[10px] uppercase font-bold tracking-[0.3em] text-yellow-500 drop-shadow-md bg-black/80 px-4 py-2 rounded-full backdrop-blur-md border border-yellow-500/20"
                        >
                            Discover Details
                        </motion.span>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    className={`relative p-5 rounded-full transition-all duration-500 group shadow-[0_0_30px_rgba(0,0,0,0.5)] border ${isDrawerOpen ? "bg-white/10 border-white/20 text-white hover:bg-white hover:text-black rotate-180" : "bg-black/80 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-black hover:scale-110"}`}
                >
                    <ChevronUp className="w-6 h-6" />
                </button>
            </div> */}

            {/* ========================================================= */}
            {/* DRAWER CONTENT OVERLAY */}
            {/* ========================================================= */}
            <AnimatePresence mode="wait">
                {isDrawerOpen && (
                    <motion.div
                        key="drawer"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-3xl text-white flex flex-col overflow-y-auto border-t border-white/10"
                    >
                        <div className="w-full max-w-5xl mx-auto px-6 py-32 space-y-24">

                            {/* 1. HEADER & INTRO */}
                            <div className="text-center space-y-8">
                                <h2 className="text-5xl md:text-8xl font-serif font-black uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-gray-700">
                                    Craftsmanship
                                </h2>
                                <div className="w-24 h-1 bg-linear-to-r from-[#BF953F] to-[#B38728] mx-auto rounded-full" />
                                <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light whitespace-pre-line">
                                    {product.description}
                                </p>
                            </div>

                            {/* 2. THE THREE PILLARS */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center hover:border-yellow-500/30 hover:bg-white/5 transition-all duration-500 group">
                                    <div className="w-16 h-16 rounded-full bg-white/5 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Clock className="w-8 h-8 text-yellow-500" />
                                    </div>
                                    <h4 className="font-serif font-bold text-2xl mb-3 text-white">Precision</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">Automatic sweeping movement with a 48-hour power reserve.</p>
                                </div>

                                <div className="bg-white/3 border border-white/10 p-10 rounded-3xl text-center hover:border-blue-500/30 hover:bg-white/5 transition-all duration-500 group">
                                    <div className="w-16 h-16 rounded-full bg-white/5 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Droplet className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <h4 className="font-serif font-bold text-2xl mb-3 text-white">Durability</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">Water resistant up to 50 meters. Sapphire crystal glass.</p>
                                </div>

                                <div className="bg-white/3 border border-white/10 p-10 rounded-3xl text-center hover:border-green-500/30 hover:bg-white/5 transition-all duration-500 group">
                                    <div className="w-16 h-16 rounded-full bg-white/5 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <ShieldCheck className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h4 className="font-serif font-bold text-2xl mb-3 text-white">Guarantee</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">100% verified authentic. 2 Year Vibe Cart Warranty.</p>
                                </div>
                            </div>

                            <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

                            {/* 3. THE MOVEMENT */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                                <div className="flex-1 relative group">
                                    <div className="absolute inset-0 bg-yellow-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <div className="relative h-100 w-full rounded-2xl overflow-hidden border border-white/10">
                                        <Image
                                            src="/mechanism.jpg"
                                            alt="Movement"
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60" />
                                        <div className="absolute bottom-8 left-8">
                                            <div className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-2">Internal Mechanism</div>
                                            <div className="text-3xl font-serif text-white">Swiss Engineering</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-yellow-500 font-bold tracking-[0.3em] text-xs uppercase">
                                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" /> The Heartbeat
                                        </div>
                                        <h3 className="text-4xl md:text-6xl font-serif font-black text-white leading-[0.9]">
                                            CALIBER <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-[#BF953F] to-[#B38728]">3255</span>
                                        </h3>
                                        <p className="text-gray-400 text-lg font-light leading-relaxed">
                                            At its core lies a self-winding mechanical movement entirely developed and manufactured in-house. It offers a fundamental gain in terms of precision, power reserve, resistance to shocks and magnetism.
                                        </p>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-white/10">
                                        {[
                                            { label: "Power Reserve", val: "70 Hours" },
                                            { label: "Precision", val: "-2/+2 sec/day" },
                                            { label: "Oscillator", val: "Paramagnetic Blue" }
                                        ].map((spec, i) => (
                                            <div key={i} className="flex justify-between items-center group cursor-default">
                                                <span className="text-gray-500 uppercase text-xs tracking-widest group-hover:text-white transition-colors">{spec.label}</span>
                                                <span className="text-white font-serif font-bold text-xl">{spec.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 4. THE MATERIALS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                                <div className="space-y-8 order-2 md:order-1">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-gray-400 font-bold tracking-[0.3em] text-xs uppercase">
                                            <span className="w-2 h-2 rounded-full bg-gray-400" /> The Armor
                                        </div>
                                        <h3 className="text-4xl md:text-6xl font-serif font-black text-white leading-[0.9]">
                                            OYSTERSTEEL <br /> <span className="text-gray-600">&</span> GOLD
                                        </h3>
                                        <p className="text-gray-400 text-lg font-light leading-relaxed">
                                            A meeting of two metals. Gold is coveted for its lustre and nobility. Steel reinforces strength and reliability. Together, they harmoniously combine the best of their properties.
                                        </p>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <div className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 text-center flex-1">
                                            <div className="text-3xl font-serif font-bold text-white mb-1">904L</div>
                                            <div className="text-[10px] uppercase text-gray-500 tracking-widest">Steel Grade</div>
                                        </div>
                                        <div className="px-8 py-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 text-center flex-1">
                                            <div className="text-3xl font-serif font-bold text-yellow-500 mb-1">18K</div>
                                            <div className="text-[10px] uppercase text-yellow-500/50 tracking-widest">Plating</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 relative group">
                                    <div className="absolute inset-0 bg-white/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <div className="relative aspect-square md:aspect-4/3 rounded-3xl overflow-hidden border border-white/10 bg-white/5 group shadow-2xl order-1 md:order-2">
                                        <Image
                                            src="/material.jpg"
                                            alt="Materials"
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />
                                    <div className="absolute bottom-8 left-8">
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Exterior Finish</div>
                                        <div className="text-3xl font-serif text-white">Rolesor Finish</div>
                                    </div>
                                </div>
                            </div>

                            <div className="h-24" />

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}