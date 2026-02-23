// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/context/CartContext";
// import { useAuth, useClerk } from "@clerk/nextjs"; // <--- CLERK HOOKS
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

// export default function CartSidebar() {
//   const { cart, removeFromCart, toggleCart, isCartOpen, cartTotal } = useCart();
//   const { isSignedIn } = useAuth();
//   const { openSignIn } = useClerk();
//   const router = useRouter();

//   // --- THE CHECKOUT LOGIC ---
//   const handleCheckout = () => {
//     if (!isSignedIn) {
//       // 1. If not signed in, close cart and open Clerk Modal
//       toggleCart();
//       openSignIn(); 
//     } else {
//       // 2. If signed in, go to Checkout Page
//       toggleCart();
//       router.push("/checkout");
//     }
//   };

//   return (
//     <Sheet open={isCartOpen} onOpenChange={toggleCart}>
//       <SheetContent className="bg-[#0a0a0a] border-l border-white/10 text-white w-full sm:w-[400px] flex flex-col p-0 h-full">
        
//         {/* HEADER (Fixed at top) */}
//         <SheetHeader className="p-6 border-b border-white/10 shrink-0">
//           <SheetTitle className="text-white flex items-center gap-2">
//             <ShoppingBag className="w-5 h-5" /> YOUR VAULT
//           </SheetTitle>
//         </SheetHeader>

//         {/* CART ITEMS LIST (Scrollable Middle Section) */}
//         <div className="flex-1 overflow-y-auto p-6 overscroll-y-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
//           {cart.length === 0 ? (
//             <div className="h-full flex flex-col items-center justify-center space-y-4 text-gray-500 mt-20">
//                <ShoppingBag className="w-16 h-16 opacity-20" />
//                <p>Your vault is empty.</p>
//                <Button variant="outline" onClick={toggleCart} className="border-white/10 text-black hover:bg-blue-500">
//                  Start Shopping
//                </Button>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {cart.map((item) => (
//                 <div key={item.cartId} className="flex gap-4">
//                   {/* Image */}
//                   <div className="relative w-20 h-20 bg-white/5 rounded-lg border border-white/10 flex-shrink-0">
//                     <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
//                   </div>
                  
//                   {/* Details */}
//                   <div className="flex-1 space-y-1">
//                     <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
//                     <p className="text-xs text-gray-400">{item.brand} • {item.category}</p>
//                     <div className="flex items-center gap-2 mt-2">
//                        <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: item.selectedColor }} />
//                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
//                     </div>
//                   </div>

//                   {/* Price & Remove */}
//                   <div className="flex flex-col justify-between items-end">
//                     <span className="font-bold text-sm">${item.price * item.quantity}</span>
//                     <button 
//                       onClick={() => removeFromCart(item.cartId)}
//                       className="text-gray-500 hover:text-red-500 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* FOOTER TOTALS (Fixed at bottom) */}
//         {cart.length > 0 && (
//           <div className="p-6 bg-[#050505] border-t border-white/10 space-y-4 shrink-0">
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm text-gray-400">
//                 <span>Subtotal</span>
//                 <span>${cartTotal}</span>
//               </div>
//               <div className="flex justify-between text-sm text-gray-400">
//                 <span>Shipping</span>
//                 <span>Free</span>
//               </div>
//               <Separator className="bg-white/10" />
//               <div className="flex justify-between text-lg font-bold text-white">
//                 <span>Total</span>
//                 <span>${cartTotal}</span>
//               </div>
//             </div>

//             {/* CHECKOUT BUTTON */}
//             <Button 
//               onClick={handleCheckout} 
//               className="w-full h-12 bg-white text-black hover:bg-blue-600 hover:text-white font-bold rounded-full transition-all"
//             >
//               PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4 ml-2" />
//             </Button>
//           </div>
//         )}

//       </SheetContent>
//     </Sheet>
//   );
// }

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartSidebar() {
  const { cart, removeFromCart, toggleCart, isCartOpen, cartTotal } = useCart();
  const router = useRouter();

  // --- THE GUEST CHECKOUT LOGIC ---
  const handleCheckout = () => {
    toggleCart(); // Close the drawer
    router.push("/checkout"); // Proceed directly to checkout
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="bg-[#0a0a0a] border-l border-white/10 text-white w-full sm:w-[400px] flex flex-col p-0 h-full">
        
        {/* HEADER (Fixed at top) */}
        <SheetHeader className="p-6 border-b border-white/10 shrink-0">
          <SheetTitle className="text-white flex items-center gap-2 font-serif tracking-widest uppercase">
            <ShoppingBag className="w-5 h-5 text-yellow-500" /> YOUR VAULT
          </SheetTitle>
        </SheetHeader>

        {/* CART ITEMS LIST (Scrollable Middle Section) */}
        <div className="flex-1 overflow-y-auto p-6 overscroll-y-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 text-gray-500 mt-20">
               <ShoppingBag className="w-16 h-16 opacity-20" />
               <p>Your vault is empty.</p>
               <Button variant="outline" onClick={toggleCart} className="border-white/10 text-gray-900 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all rounded-full">
                 Start Shopping
               </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.cartId} className="flex gap-4 group">
                  {/* Image */}
                  <div className="relative w-20 h-20 bg-white/5 rounded-lg border border-white/10 flex-shrink-0 group-hover:border-yellow-500/50 transition-colors">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">{item.brand}</p>
                    <div className="flex items-center gap-2 mt-2">
                       <div className="w-4 h-4 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: item.selectedColor }} />
                       <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col justify-between items-end">
                    <span className="font-bold text-sm text-yellow-500">Rs. {item.price * item.quantity}</span>
                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-gray-500 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER TOTALS (Fixed at bottom) */}
        {cart.length > 0 && (
          <div className="p-6 bg-[#050505] border-t border-white/10 space-y-4 shrink-0">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal</span>
                <span>Rs. {cartTotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Shipping</span>
                <span className="text-yellow-500 font-bold">Free Delivery</span>
              </div>
              <Separator className="bg-white/10 my-4" />
              <div className="flex justify-between text-xl font-black text-white font-serif">
                <span>Total</span>
                <span>Rs. {cartTotal}</span>
              </div>
            </div>

            {/* CHECKOUT BUTTON */}
            <Button 
              onClick={handleCheckout} 
              className="w-full h-14 bg-gradient-to-r from-[#BF953F] to-[#B38728] text-black hover:scale-[1.02] font-black tracking-widest rounded-full transition-all shadow-[0_0_20px_rgba(191,149,63,0.2)] hover:shadow-[0_0_30px_rgba(191,149,63,0.4)]"
            >
              PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

      </SheetContent>
    </Sheet>
  );
}