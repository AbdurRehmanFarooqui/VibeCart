import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFAB() {
  const whatsappNumber = "923072570265"; // Your actual number
  const message = "Hi Vibe Cart! I have a question about a product."; // Pre-filled message
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center"
      aria-label="Contact us on WhatsApp"
    >
      {/* "Chat with us" Tooltip - appears on hover */}
      <span className="mr-3 bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-bold shadow-xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none border border-slate-100">
        Chat with us!
      </span>

      {/* The Icon Button */}
      <div className="bg-emerald-500 text-white p-4 rounded-full shadow-[0_10px_25px_-5px_rgba(16,185,129,0.4)] hover:bg-emerald-400 hover:scale-110 active:scale-95 transition-all duration-300 relative">
        <MessageCircle className="w-7 h-7" />
        
        {/* Notification Ping - makes it feel alive */}
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300"></span>
        </span>
      </div>
    </a>
  );
}