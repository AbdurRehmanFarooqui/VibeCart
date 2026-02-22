"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, ShieldCheck, MapPin, Phone, Banknote, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// IMPORT SUPABASE
import { supabase } from "@/lib/supabase";

// --- MOCK AREA DATA FOR AUTO-SUGGEST ---
const CITY_AREAS: Record<string, string[]> = {
  Karachi: ["DHA Phase 1-8", "Clifton", "Bahria Town", "Gulshan-e-Iqbal", "North Nazimabad", "PECHS", "Malir", "Tariq Road", "Korangi", "Saddar"],
  Lahore: ["DHA Phase 1-8", "Gulberg", "Johar Town", "Bahria Town", "Model Town", "Wapda Town", "Cantonment", "Iqbal Town", "Askari"],
  Islamabad: ["F-6", "F-7", "F-8", "F-11", "E-7", "G-11", "G-13", "DHA Phase 1-5", "Bahria Town", "Blue Area", "I-8"],
};

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState<string | null>(null);

  // --- FORM STATES ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  
  // --- AUTO-SUGGEST STATES ---
  const [filteredAreas, setFilteredAreas] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Auto-fill City from Local Storage (if you have a welcome popup)
  useEffect(() => {
    const savedCity = localStorage.getItem("vibe_user_city");
    if (savedCity && Object.keys(CITY_AREAS).includes(savedCity)) {
      setCity(savedCity);
    }
  }, []);

  // Handle Address Auto-Suggest Logic
  useEffect(() => {
    if (!city || !address) {
      setFilteredAreas([]);
      return;
    }
    const areas = CITY_AREAS[city] || [];
    const matches = areas.filter(area => 
      area.toLowerCase().includes(address.toLowerCase())
    );
    setFilteredAreas(matches);
  }, [address, city]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectArea = (area: string) => {
    setAddress(area + ", ");
    setShowSuggestions(false);
  };

  // ==========================================
  // VALIDATION FUNCTIONS
  // ==========================================
  const validateForm = (): string | null => {
    // Validate first name
    if (!firstName.trim()) return "First name is required";
    if (firstName.trim().length < 2) return "First name must be at least 2 characters";

    // Validate last name
    if (!lastName.trim()) return "Last name is required";
    if (lastName.trim().length < 2) return "Last name must be at least 2 characters";

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";

    // Validate phone
    const phoneRegex = /^(\+92|0)[0-9]{10}$/; // Pakistani phone format
    if (!phone.trim()) return "Phone number is required";
    if (!phoneRegex.test(phone.replace(/\s|-/g, ""))) return "Please enter a valid phone number (e.g., 03XX-XXXXXXX)";

    // Validate city
    if (!city) return "Please select a city";

    // Validate address
    if (!address.trim()) return "Street address is required";
    if (address.trim().length < 5) return "Please enter a complete street address";

    // Validate postal code
    if (!postalCode.trim()) return "Postal code is required";
    if (postalCode.trim().length < 3) return "Please enter a valid postal code";

    return null;
  };

  const validateCart = (): string | null => {
    if (!cart || cart.length === 0) return "Your cart is empty";

    // Validate that all items have variant IDs
    for (const item of cart) {
      if (!item.variantId) {
        return `Invalid product in cart: "${item.name}" is missing variant ID`;
      }
      if (item.quantity < 1) {
        return `Invalid quantity for "${item.name}"`;
      }
    }

    return null;
  };

  // ==========================================
  // HANDLE ORDER SUBMISSION (API ROUTE)
  // ==========================================
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    try {
      // 1. Validate form
      const formError = validateForm();
      if (formError) {
        setError(formError);
        setIsProcessing(false);
        return;
      }

      // 2. Validate cart
      const cartError = validateCart();
      if (cartError) {
        setError(cartError);
        setIsProcessing(false);
        return;
      }

      // 3. Try to get the current user (if authenticated)
      let userId: string | null = null;
      try {
        const { data: { user } } = await supabase.auth.getUser();
        userId = user?.id || null;
      } catch (authError) {
        // User not authenticated, proceed with null user_id
        userId = null;
      }

      // 4. Prepare cart items for API
      const cartItems = cart.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.price
      }));

      // 5. Send order data to backend API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          city: city,
          address: address.trim(),
          postalCode: postalCode.trim(),
          cartItems: cartItems,
          cartTotal: cartTotal,
          userId: userId
        })
      });

      const responseData = await response.json();

      // 6. Handle API response
      if (!response.ok) {
        setError(responseData.error || "Failed to place order. Please try again.");
        setIsProcessing(false);
        return;
      }

      // 7. Success! Clear form and show success screen
      setOrderId(responseData.orderId);
      setIsSuccess(true);
      clearCart();

    } catch (error: any) {
      console.error("Checkout failed:", error);
      setError(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  // --- SUCCESS VIEW ---
  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 text-center space-y-6 shadow-2xl"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter">ORDER CONFIRMED!</h1>
            <p className="text-gray-400">
              Thank you, <span className="text-yellow-500 font-semibold">{firstName}</span>! Your order has been successfully placed.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg space-y-2">
              <div className="text-sm text-yellow-500 font-mono">Order ID: <span className="font-bold">#{orderId.split('-')[0].toUpperCase()}</span></div>
              <div className="text-sm text-gray-300">Status: <span className="text-green-400 font-semibold">PENDING</span></div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg text-sm text-gray-300">
               Check your email at <span className="text-blue-400 font-semibold">{email}</span> for tracking details.
            </div>
            <Link href="/product">
              <Button className="w-full h-12 bg-white text-black hover:bg-yellow-500 font-bold rounded-full mt-4 transition-colors tracking-widest">
                CONTINUE SHOPPING
              </Button>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  // --- EMPTY CART VIEW ---
  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
           <h2 className="text-2xl font-bold">Your vault is empty</h2>
           <Link href="/product">
             <Button className="bg-[#BF953F] hover:bg-[#B38728] text-black font-bold tracking-widest rounded-full">Browse Collection</Button>
           </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // --- MAIN CHECKOUT FORM ---
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
          Secure Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: FORMS */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. SHIPPING INFO */}
            <Card className="bg-[#0a0a0a] border-white/10 text-white rounded-2xl overflow-hidden shadow-xl">
              <CardHeader className="bg-white/[0.02] border-b border-white/5">
                <CardTitle className="flex items-center gap-2 text-lg uppercase tracking-widest text-yellow-500 font-bold">
                   <MapPin className="w-5 h-5" /> Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <form id="checkout-form" onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   
                   {/* Error Message Display */}
                   {error && (
                      <div className="md:col-span-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                         <p className="text-red-400 text-sm font-semibold">{error}</p>
                      </div>
                   )}
                   
                   {/* Name Fields */}
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 tracking-wider">FIRST NAME *</label>
                      <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-white/5 border-white/10 text-white h-12" required />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 tracking-wider">LAST NAME *</label>
                      <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-white/5 border-white/10 text-white h-12" required />
                   </div>

                   {/* Email & Phone */}
                   <div className="space-y-2 md:col-span-1">
                      <label className="text-xs font-bold text-gray-500 tracking-wider">EMAIL ADDRESS *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/5 border-white/10 text-white pl-10 h-12" required />
                      </div>
                   </div>
                   <div className="space-y-2 md:col-span-1">
                      <label className="text-xs font-bold text-gray-500 tracking-wider">PHONE NUMBER *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="03XX-XXXXXXX" className="bg-white/5 border-white/10 text-white pl-10 h-12" required />
                      </div>
                   </div>

                   {/* City Dropdown */}
                   <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-gray-500 tracking-wider">CITY *</label>
                      <select 
                        value={city} 
                        onChange={(e) => { setCity(e.target.value); setAddress(""); }} 
                        required 
                        className="w-full h-12 bg-[#111] border border-white/10 text-white rounded-md px-4 focus:outline-none focus:border-yellow-500 transition-colors cursor-pointer appearance-none"
                      >
                        <option value="" disabled>Select City</option>
                        {Object.keys(CITY_AREAS).map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                   </div>

                   {/* Address with Auto-Suggest */}
                   <div className="space-y-2 md:col-span-2 relative" ref={wrapperRef}>
                      <label className="text-xs font-bold text-gray-500 tracking-wider">STREET ADDRESS *</label>
                      <Input 
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder={city ? `e.g. House 1, Street 2, ${CITY_AREAS[city][0]}` : "Select a city first"} 
                        className="bg-white/5 border-white/10 text-white h-12" 
                        required 
                        disabled={!city}
                      />
                      
                      {/* Suggestions Dropdown */}
                      <AnimatePresence>
                        {showSuggestions && filteredAreas.length > 0 && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-50 w-full mt-1 bg-[#1a1a1a] border border-white/10 rounded-md shadow-2xl overflow-hidden max-h-48 overflow-y-auto"
                          >
                            {filteredAreas.map(area => (
                              <div 
                                key={area} 
                                onClick={() => selectArea(area)}
                                className="px-4 py-3 cursor-pointer hover:bg-yellow-500/20 hover:text-yellow-500 text-sm text-gray-300 transition-colors border-b border-white/5 last:border-0"
                              >
                                {area}, {city}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </div>

                   {/* Postal Code */}
                   <div className="space-y-2 md:col-span-1">
                      <label className="text-xs font-bold text-gray-500 tracking-wider">POSTAL CODE *</label>
                      <Input 
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="e.g., 75500" 
                        className="bg-white/5 border-white/10 text-white h-12" 
                        required 
                      />
                   </div>

                </form>
              </CardContent>
            </Card>

            {/* 2. PAYMENT INFO (COD ONLY) */}
            <Card className="bg-[#0a0a0a] border-white/10 text-white rounded-2xl overflow-hidden shadow-xl">
              <CardHeader className="bg-white/[0.02] border-b border-white/5">
                <CardTitle className="flex items-center gap-2 text-lg uppercase tracking-widest text-yellow-500 font-bold">
                   <ShieldCheck className="w-5 h-5" /> Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                 <div className="p-4 border-2 border-yellow-500 bg-yellow-500/10 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                          <Banknote className="w-6 h-6" />
                       </div>
                       <div>
                          <h4 className="font-bold text-white text-lg">Cash on Delivery (COD)</h4>
                          <p className="text-sm text-gray-400">Pay securely upon receiving your package.</p>
                       </div>
                    </div>
                    <div className="w-6 h-6 rounded-full border-4 border-yellow-500 bg-black" />
                 </div>
              </CardContent>
            </Card>

          </div>

          {/* RIGHT COLUMN: SUMMARY */}
          <div className="lg:col-span-1">
             <div className="sticky top-24 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 space-y-6 shadow-2xl">
                <h3 className="font-serif font-bold text-xl uppercase tracking-widest text-white border-b border-white/10 pb-4">Order Summary</h3>
                
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                   {cart.map((item) => (
                      <div key={item.cartId} className="flex gap-4 group">
                         <div className="relative w-16 h-16 bg-white/5 rounded-lg border border-white/10 flex-shrink-0 group-hover:border-yellow-500/50 transition-colors">
                            <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                         </div>
                         <div className="flex-1 flex flex-col justify-center">
                            <h4 className="text-sm font-bold line-clamp-1 text-white">{item.name}</h4>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">{item.brand}</p>
                            <div className="flex justify-between mt-2 text-sm items-center">
                               <span className="text-gray-400 bg-white/5 px-2 py-0.5 rounded text-[10px]">Qty: {item.quantity}</span>
                               <span className="font-bold text-yellow-500">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-3 text-sm">
                   <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span className="text-white">Rs. {cartTotal.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-gray-400">
                      <span>Delivery (Nationwide)</span>
                      <span className="text-green-400 font-bold uppercase tracking-widest text-xs">Free</span>
                   </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="flex justify-between items-center">
                   <span className="text-gray-400 uppercase tracking-widest text-sm">Total</span>
                   <span className="text-3xl font-serif font-black text-white">Rs. {cartTotal.toLocaleString()}</span>
                </div>

                {/* THE SUBMIT BUTTON - LINKED TO THE FORM ID */}
                <Button 
                  type="submit" 
                  form="checkout-form"
                  disabled={isProcessing}
                  className="w-full h-14 bg-gradient-to-r from-[#BF953F] to-[#B38728] hover:from-[#FCF6BA] hover:to-[#BF953F] text-black font-black uppercase tracking-[0.2em] rounded-full transition-all shadow-[0_0_20px_rgba(191,149,63,0.3)] hover:scale-105"
                >
                   {isProcessing ? (
                     <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> PROCESSING...</>
                   ) : (
                     "CONFIRM ORDER"
                   )}
                </Button>

                <p className="text-[10px] text-center text-gray-600 uppercase tracking-widest">
                   By confirming, you agree to our Terms & Return Policy.
                </p>
             </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}