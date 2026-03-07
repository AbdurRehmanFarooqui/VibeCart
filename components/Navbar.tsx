"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Menu, ShoppingBag } from "lucide-react";

import { useCart } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- DATA STRUCTURE ---
const NAV_ITEMS = [
  {
    title: "Home",
    href: "/",
    hasSubmenu: false
  },
  {
    title: "Products",
    href: "/product",
    hasSubmenu: false,
    content: [
      {
        section: "Collections",
        items: ["Classic", "Sports", "Office", "New Arrival", "Best Selling"]
      },
      {
        section: "Brands",
        items: ["Nike", "Adidas", "Puma", "New Balance", "Dior"]
      }
    ]
  },
  // {
  //   title: "New & Featured",
  //   href: "/new",
  //   hasSubmenu: true,
  //   content: [
  //     {
  //       section: "New Arrivals",
  //       items: ["Just Dropped", "This Week", "Trending"]
  //     },
  //     {
  //       section: "Featured",
  //       items: ["Sole Vault Exclusives", "Collaborations", "Staff Picks"]
  //     }
  //   ]
  // },
  {
    title: "Sale",
    href: "/sale",
    hasSubmenu: false,
    content: [
      {
        section: "Discounts",
        items: ["Up to 20% Off", "Up to 50% Off", "Clearance"]
      }
    ]
  },
  {
    title: "Contact",
    href: "/support/contact",
    hasSubmenu: false
  }
  // {
  //   title: "About",
  //   href: "/about",
  //   hasSubmenu: false
  // }
];

const getHref = (menuTitle: string, sectionTitle: string, itemName: string) => {
  if (menuTitle === "Product") {
    if (sectionTitle === "Brands") {
      return `/product?brand=${encodeURIComponent(itemName)}`;
    }
    return `/product?category=${encodeURIComponent(itemName)}`;
  }

  if (menuTitle === "New & Featured") {
    if (itemName === "Staff Picks") return "/new#staff-picks";
    if (itemName === "Trending" || itemName === "Just Dropped") return "/new#trending";
    if (itemName === "This Week") return "/new#schedule";
    if (itemName.includes("Exclusives") || itemName === "Collaborations") return "/new#exclusive";
    return "/new";
  }

  if (menuTitle === "Sale") {
    if (itemName.includes("20%")) return "/sale?filter=20";
    if (itemName.includes("50%")) return "/sale?filter=50";
    if (itemName === "Clearance") return "/sale?filter=clearance";
    return "/sale";
  }

  return "/";
};

export default function Navbar() {
  const router = useRouter();
  const { toggleCart, cartCount } = useCart();
  const blueGlow = "drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]";

  return (
    <nav className="relative flex justify-between items-center px-4 md:px-8 py-6 z-40 w-full max-w-7xl mx-auto  bg-[#050505]">

      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="text-white p-2 hover:bg-white/10 rounded-full transition">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#0a0a0a] border-r-white/10 text-white p-0 z-[100]">
            <SheetHeader className="p-6 border-b border-white/10">
              <SheetTitle className="text-left flex items-center gap-2">
                <Image src="/vibecart-logo-transparent.png" alt="Logo" width={30} height={30} className="w-8" />
                <span className="text-xl font-bold tracking-tighter text-white">Vibe Cart</span>
              </SheetTitle>
            </SheetHeader>

            <ScrollArea className="h-[calc(100vh-80px)]">
              <div className="p-6 flex flex-col gap-4">
                {NAV_ITEMS.map((item, index) => (
                  <div key={index}>
                    {item.hasSubmenu ? (
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={item.title} className="border-none">
                          <AccordionTrigger className="text-lg font-medium py-2 hover:no-underline hover:text-blue-500">
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent className="pl-4 border-l border-white/10 ml-2">
                            <Link href={item.href} className="text-sm font-bold text-white mb-2 block hover:text-blue-400">
                              View All {item.title}
                            </Link>

                            {item.content?.map((subSection, i) => (
                              <Accordion type="single" collapsible key={i} className="w-full">
                                <AccordionItem value={subSection.section} className="border-none">
                                  <AccordionTrigger className="text-base text-gray-400 py-2 hover:no-underline hover:text-white">
                                    {subSection.section}
                                  </AccordionTrigger>
                                  <AccordionContent className="flex flex-col gap-2 pl-4">
                                    {subSection.items && subSection.items.map((subItem: string, j: number) => (
                                      <Link
                                        key={j}
                                        href={getHref(item.title, subSection.section, subItem)}
                                        className="text-sm text-gray-500 hover:text-blue-400 py-1 block"
                                      >
                                        {subItem}
                                      </Link>
                                    ))}
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <SheetTrigger asChild>
                        <Link href={item.href} className="text-lg font-medium block py-2 hover:text-gray-700">
                          {item.title}
                        </Link>
                      </SheetTrigger>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* LOGO */}
      <Link href="/" className="flex items-center gap-3 cursor-pointer">
        <Image src="/vibecart-logo-transparent.png" alt="Sole Vault icon" width={50} height={50} className="w-8 md:w-10 h-auto opacity-90" />
        <h1 className="text-base md:text-2xl font-bold tracking-widest uppercase flex items-center font-serif">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#FBF5B7] via-[#BF953F] to-[#AA771C] drop-shadow-[0_0_10px_rgba(234,179,8,0.2)]">
            VIBE
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#FBF5B7] via-[#BF953F] to-[#AA771C] drop-shadow-[0_0_10px_rgba(234,179,8,0.2)] ml-2">
            CART
          </span>
        </h1>
      </Link>

      {/* DESKTOP NAVIGATION */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="gap-2">

            {NAV_ITEMS.map((item, index) => (
              <NavigationMenuItem key={index} >
                {item.hasSubmenu ? (
                  <>
                    {/* --- THE FIX IS HERE --- */}
                    <NavigationMenuTrigger
                      onClick={(e) => {
                        // 1. Navigate to the page
                        router.push(item.href);
                        // 2. FORCE LOSE FOCUS (Blur the button)
                        // This removes the "active/focused" black box immediately
                        (e.currentTarget as HTMLElement).blur();
                      }}
                      className="bg-transparent text-gray-400 hover:text-black hover:bg-white/5 data-[active]:bg-white/5 data-[state=open]:bg-white/1 focus:bg-black focus:text-black focus:outline-none cursor-pointer transition-colors"
                    >
                      {item.title}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr] bg-[#0a0a0a] border border-white/10 text-white rounded-xl shadow-2xl">
                        {item.content?.map((section, i) => (
                          <div key={i} className="space-y-3">
                            <h4 className="font-bold text-blue-500 text-sm tracking-widest uppercase mb-2">
                              {section.section}
                            </h4>
                            <ul className="space-y-2">
                              {section.items && section.items.map((subItem: string, j: number) => (
                                <li key={j}>
                                  <Link
                                    href={getHref(item.title, section.section, subItem)}
                                    className="block p-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                                  >
                                    {subItem}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link href={item.href} className="bg-transparent text-gray-400 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-colors block focus:text-black focus:outline-none">
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* --- ACTIONS --- */}
      <div className="flex items-center gap-4 md:gap-6">

        {/* CART BUTTON */}
        <button
          onClick={(e) => {
            toggleCart();
            (e.currentTarget as HTMLElement).blur();
          }}
          className="relative p-2 text-white hover:text-[#FCF6BA] transition-all duration-300 group focus:outline-none"
        >
          {/* Bag Icon with slight glow on hover */}
          <ShoppingBag className="w-6 h-6 transition-transform group-hover:scale-110 group-active:scale-95" />

          {/* LUXURY GOLD NOTIFICATION BADGE */}
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-gradient-to-r from-[#BF953F] to-[#B38728] text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(191,149,63,0.6)] border border-black/10">
              {cartCount}
            </span>
          )}
        </button>

        {/* <div className="flex items-center">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] hover:from-[#FCF6BA] hover:to-[#BF953F] text-black text-xs font-black px-2 md:px-6 py-2 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(191,149,63,0.4)] hover:shadow-[0_0_30px_rgba(252,246,186,0.6)] hover:scale-105 uppercase tracking-widest font-serif">
                SIGN IN
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-8 h-8 border-2 border-blue-500" } }} />
          </SignedIn>
        </div> */}
      </div>

      <CartSidebar />

    </nav>
  );
}