"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/components/ProductCard"; // Adjust the import path as needed

// 1. Updated CartItem to use variantId instead of selectedColor
export interface CartItem extends Product {
  cartId: string | number;
  quantity: number;
  variantId: string | number;
  selectedColor?: string;
}

interface CartContextType {
  cart: CartItem[];
  // Updated signature to take variantId
  addToCart: (product: Product, variantId: string | number | null | undefined) => void;
  removeFromCart: (cartId: string | number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  increaseQuantity: (cartId: string | number) => void;
  decreaseQuantity: (cartId: string | number) => void;
  isCartOpen: boolean;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("vibecart-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("vibecart-cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  // --- ACTIONS ---

  const addToCart = (product: Product, variantId: string | number | null | undefined) => {
    // Validate that variantId exists - it must come from the database only
    if (!variantId) {
      throw new Error(`Invalid variant ID for product "${product.name}". Variant ID is required and must be provided by the database.`);
    }

    // Use the database-provided variantId
    const effectiveVariantId = variantId;

    setCart((prev) => {
      // The variantId IS the unique identifier for the cart row
      const existing = prev.find((item) => item.variantId === effectiveVariantId);

      if (existing) {
        return prev.map((item) =>
          item.variantId === effectiveVariantId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Add new item using variantId
      return [
        ...prev,
        {
          ...product,
          cartId: effectiveVariantId, // Using variantId as the cart entry key
          variantId: effectiveVariantId,
          quantity: 1
        }
      ];
    });

    setIsCartOpen(true);
  };

const increaseQuantity = ( cartId: string | number ) => {
    // Validate that variantId exists - it must come from the database only
    if (!cartId) {
      throw new Error(`Invalid variant ID ${cartId}.`);
    }

    setCart((prev) => {
      // The variantId IS the unique identifier for the cart row
      const existing = prev.find((item) => item.cartId === cartId);

      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return prev;
    });
  };

const decreaseQuantity = ( cartId: string | number ) => {
    // Validate that variantId exists - it must come from the database only
    if (!cartId) {
      throw new Error(`Invalid variant ID ${cartId}.`);
    }

    setCart((prev) => {
      // The variantId IS the unique identifier for the cart row
      const existing = prev.find((item) => item.cartId === cartId);

      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev;
    });
  };

  const removeFromCart = (cartId: string | number) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => setCart([]);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, toggleCart, increaseQuantity, decreaseQuantity, isCartOpen, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};