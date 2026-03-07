'use client';

import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SPOTLIGHT_ITEMS = [
    {
        id: 14,
        tag: "Vibe Signature",
        title: "IMPERIAL ",
        highlight: "APEX",
        highlightColor: "from-yellow-300 to-yellow-600",
        desc: "A bold fruity-woody scent with smoky depth made for leaders and strong presence.",
        image: "/1.png",
        link: "/product/14",
        shadowClass: "drop-shadow-[0_20px_60px_rgba(234,179,8,0.5)]"
    },
    {
        id: 17,
        tag: "Summer Essentials",
        title: "WILD",
        highlight: "INSTINCT",
        highlightColor: "from-blue-400 to-blue-700",
        desc: "Fresh, aquatic scents paired with silver-tone timepieces. Perfect for the Karachi heat.",
        image: "/2.png",
        link: "/product/17",
        shadowClass: "drop-shadow-[0_20px_60px_rgba(59,130,246,0.5)]"
    },
];

const SpotlightSection = () => {
    const [index, setIndex] = useState(0);
    const [dir, setDir] = useState(1);

    const nextSlide = () => {
        setDir(1);
        setIndex((prev) => (prev + 1) % SPOTLIGHT_ITEMS.length);
    };

    const prevSlide = () => {
        setDir(-1);
        setIndex((prev) => (prev - 1 + SPOTLIGHT_ITEMS.length) % SPOTLIGHT_ITEMS.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [index]);

    const current = SPOTLIGHT_ITEMS[index];

    return (
        <section className="py-16 md:py-32 px-4 md:px-6 max-w-7xl mx-auto relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

            {/* ========================================= */}
            {/* 1. DEDICATED MOBILE INTERFACE (Image FIRST) */}
            {/* ========================================= */}
            <div className="md:hidden relative flex flex-col gap-8 bg-white/5 border border-white/10 rounded-[2rem] p-6 py-8 z-10 backdrop-blur-md overflow-hidden group">

                {/* MOBILE: VISUAL CONTENT TOP */}
                <div className="relative h-[280px] w-full flex items-center justify-center">

                    {/* Arrows overlapping image */}
                    <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition z-30">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition z-30">
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    <AnimatePresence mode="wait" custom={dir}>
                        <motion.div
                            key={current.id}
                            initial={{ opacity: 0, scale: 0.8, rotate: dir === 1 ? 10 : -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotate: dir === 1 ? -10 : 10 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className="relative z-10 w-full h-full px-8"
                        >
                            <Image src={current.image} alt={current.title} fill className={`object-contain transition-all duration-500 ${current.shadowClass}`} priority />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* MOBILE: TEXT CONTENT BELOW */}
                <div className="space-y-6 relative z-20 text-left w-full">
                    <AnimatePresence mode="wait" custom={dir}>
                        <motion.div
                            key={current.id}
                            initial={{ opacity: 0, x: dir === 1 ? 50 : -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: dir === 1 ? -50 : 50 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-4"
                        >
                            <div className="inline-block px-3 py-1.5 rounded-full border border-yellow-500/50 bg-yellow-500/10 text-yellow-400 text-[10px] font-bold uppercase tracking-wider">
                                {current.tag}
                            </div>
                            <h2 className="text-5xl font-black italic leading-[0.9]">
                                {current.title} <br /> <span className={`text-transparent bg-clip-text bg-gradient-to-r ${current.highlightColor}`}>{current.highlight}</span>
                            </h2>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {current.desc}
                            </p>
                            <div className="pt-2 w-full">
                                <Link href={current.link} className="w-full block">
                                    <button className="w-full h-14 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition shadow-[0_10px_40px_rgba(255,255,255,0.2)]">
                                        Shop The Look
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* ========================================= */}
            {/* 2. DEDICATED DESKTOP INTERFACE */}
            {/* ========================================= */}
            <div className="hidden md:grid relative grid-cols-2 gap-16 items-center bg-white/5 border border-white/10 rounded-[2rem] p-16 z-10 backdrop-blur-md overflow-hidden group">

                {/* DESKTOP: TEXT CONTENT LEFT */}
                <div className="space-y-8 relative z-20 px-8 text-left">
                    <AnimatePresence mode="wait" custom={dir}>
                        <motion.div
                            key={current.id}
                            initial={{ opacity: 0, x: dir === 1 ? 50 : -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: dir === 1 ? -50 : 50 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-8"
                        >
                            <div className="inline-block px-4 py-1.5 rounded-full border border-yellow-500/50 bg-yellow-500/10 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                                {current.tag}
                            </div>
                            <h2 className="text-7xl font-black italic leading-[0.9]">
                                {current.title} <br /> <span className={`text-transparent bg-clip-text bg-gradient-to-r ${current.highlightColor}`}>{current.highlight}</span>
                            </h2>
                            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                                {current.desc}
                            </p>
                            <div className="flex justify-start gap-4 pt-2">
                                <Link href={current.link}>
                                    <button className="px-10 py-4 bg-white text-black text-base font-bold rounded-full hover:bg-gray-200 transition transform hover:-translate-y-1 shadow-[0_10px_40px_rgba(255,255,255,0.2)]">
                                        Shop The Look
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* DESKTOP: VISUAL CONTENT RIGHT */}
                <div className="relative h-[500px] flex items-center justify-center w-full">
                    <button onClick={prevSlide} className="absolute -left-8 top-1/2 -translate-y-1/2 w-15 h-15 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition z-30">
                        <ChevronLeft className="w-10 h-10" />
                    </button>
                    <button onClick={nextSlide} className="absolute -right-8 top-1/2 -translate-y-1/2 w-15 h-15 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition z-30">
                        <ChevronRight className="w-10 h-10" />
                    </button>

                    <AnimatePresence mode="wait" custom={dir}>
                        <motion.div
                            key={current.id}
                            initial={{ opacity: 0, scale: 0.8, rotate: dir === 1 ? 10 : -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotate: dir === 1 ? -10 : 10 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className="relative z-10 w-full h-full"
                        >
                            <Image src={current.image} alt={current.title} fill className={`object-contain transition-all duration-500 ${current.shadowClass}`} priority />
                        </motion.div>
                    </AnimatePresence>

                    <div className="absolute inset-0 border border-white/5 rounded-full scale-75 animate-[pulse_3s_ease-in-out_infinite]" />
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-50" />
                </div>

            </div>
        </section>
    );
};

export default SpotlightSection;