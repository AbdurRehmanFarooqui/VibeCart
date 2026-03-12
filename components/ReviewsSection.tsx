"use client";

import { use, useEffect, useState } from "react";
import { Star, Plus, User, Calendar, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ReviewModal from "@/components/ReviewModal";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  message: string;
  images?: string[];
  verified: boolean;
}

export default function ReviewSection({ productId, avgRating, totalReviews }: { productId: string; avgRating: number; totalReviews: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const getReviews = async () => {
    console.log("Fetching reviews for product ID:", productId);
    console.log("Type of productId:", typeof productId); // Add this

    const { data, error } = await supabase
      .from('reviews')
      .select('id, reviewer_name, created_at, rating, msg, verified, review_images(url)')
      .eq('product_id', productId)
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(5);

    console.log("Fetched reviews:", data);
    console.log("Error if any:", error);
    setReviews(
      data?.map((item) => ({
        id: item.id,
        name: item.reviewer_name,
        date: new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        rating: item.rating,
        message: item.msg,
        verified: item.verified,
        images: item.review_images?.map((img) => img.url) || [],
      })) || []
    ); // Check for errors
  }
  useEffect(() => {
    getReviews();
  }, [productId]);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24 bg-[#050505] text-white">
      {/* HEADER & SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-end">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-black uppercase tracking-tighter">
            Client <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] to-[#B38728]">Perspectives</span>
          </h2>
          <p className="text-gray-400 text-sm tracking-widest uppercase">Authentic experiences from our global collectors.</p>
        </div>

        <div className="flex flex-col items-center md:items-start justify-center p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black font-serif">{avgRating}</span>
            <span className="text-gray-500 font-bold">/ 5.0</span>
          </div>
          <div className="flex gap-1 my-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < Math.floor(avgRating) ? "fill-[#BF953F] text-[#BF953F]" : "text-gray-700"}`} />
            ))}
          </div>
          <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">Based on {totalReviews} Reviews</p>
        </div>

        <div className="flex justify-center md:justify-end">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="group relative h-16 px-10 rounded-full bg-white text-black font-black uppercase tracking-widest hover:bg-[#BF953F] hover:text-white transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Write a Review <Plus className="w-5 h-5" />
            </span>
          </Button>
        </div>
      </div>
      {/* Below the header summary */}
      {reviews.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-[40px]">
          <p className="text-gray-500 font-serif italic">No perspectives shared yet. Be the first to leave a mark.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ... your reviews.map code ... */}
        </div>
      )}
      {/* REVIEWS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col gap-6"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-white/10">
                  <User className="text-gray-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold flex items-center gap-2">
                    {review.name} {review.verified && <CheckCircle2 className="w-4 h-4 text-[#BF953F]" />}
                  </h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{review.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-[#BF953F] text-[#BF953F]" : "text-gray-800"}`} />
                ))}
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed italic font-serif text-lg">"{review.message}"</p>

            {/* REVIEWS LIST - Inside the map loop */}
            {review.images && review.images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {review.images.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-white/10 group cursor-zoom-in bg-white/5"
                  >
                    <Image
                      width={100}
                      height={100}
                      src={url}
                      alt={`Review attachment ${idx + 1}`}
                      className="object-cover w-full h-full hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110 "
                    />
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} productId={productId} />
    </section>
  );
}