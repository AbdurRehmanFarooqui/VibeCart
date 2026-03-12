"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { X, Star, Camera, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "sonner"; // Optional: for premium notifications

export default function ReviewModal({ isOpen, onClose, productId }: { isOpen: boolean, onClose: () => void, productId: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // Image Logic
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      if (selectedFiles.length + files.length > 3) {
        alert("Maximum 3 images allowed for luxury curation.");
        return;
      }

      const newFiles = [...selectedFiles, ...files].slice(0, 3);
      setSelectedFiles(newFiles);

      // Generate Previews
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);
    }
  };

  const removeImage = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  // Convert File to Base64 for the API
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a rating.");

    setLoading(true);

    try {
      const base64Images = await Promise.all(selectedFiles.map(file => fileToBase64(file)));
      console.log("Submitting review with data:", { ...formData, rating, images: base64Images });
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          reviewer_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          msg: formData.message,
          rating: rating,
          images: base64Images
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      // Success Logic
      setRating(0);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSelectedFiles([]);
      setPreviews([]);
      onClose();
      // toast.success("Review submitted to the collection.");
    } catch (err) {
      console.error(err);
      alert("Failed to submit review. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-xl"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[40px] p-8 md:p-12 overflow-y-auto max-h-[90vh] no-scrollbar shadow-2xl"
        >
          <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors z-10">
            <X className="w-8 h-8" />
          </button>

          <h3 className="text-3xl font-serif font-black uppercase mb-8">Share Your <span className="text-[#BF953F]">Legacy</span></h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* RATING SELECTOR */}
            <div className="flex flex-col items-center gap-2 py-6 bg-white/[0.02] rounded-3xl border border-white/5">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">Select Rating</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                    className="transition-transform active:scale-90"
                  >
                    <Star className={`w-8 h-8 transition-colors ${star <= (hover || rating) ? "fill-[#BF953F] text-[#BF953F]" : "text-gray-800"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* PREVIEWS AREA */}
            {previews.length > 0 && (
              <div className="flex gap-4">
                {previews.map((src, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/20 group">
                    <img src={src} className="w-full h-full object-cover" alt="Preview" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#BF953F] transition-all text-white"
              />
              <input
                required
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#BF953F] transition-all text-white "
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#BF953F] transition-all text-white col-span-full"
              />
            </div>

            <textarea
              required
              placeholder="Tell us about your experience..."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-sm focus:outline-none focus:border-[#BF953F] transition-all resize-none text-white"
            />

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <label className={`flex items-center gap-3 cursor-pointer group ${selectedFiles.length >= 3 ? "opacity-30 pointer-events-none" : ""}`}>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/30 transition-all">
                  <Camera className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-200">Upload Image</span>
                  <span className="text-[10px] text-gray-500 uppercase">{selectedFiles.length}/3 selected</span>
                </div>
                <input type="file" className="hidden" accept="image/*" multiple onChange={handleFileChange} disabled={selectedFiles.length >= 3} />
              </label>

              <button
                disabled={loading}
                className="w-full md:w-auto h-16 px-12 rounded-full bg-gradient-to-r from-[#BF953F] to-[#B38728] text-black font-black uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(191,149,63,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Submit Review <Send className="w-4 h-4" /></>}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}