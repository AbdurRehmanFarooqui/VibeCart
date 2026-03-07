import React from 'react';
import { MessageCircle, Instagram, Facebook, Mail, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const socials = [
    {
      name: "WhatsApp",
      value: "+92 307 2570265", // Replace with your number
      label: "Chat with us",
      icon: <MessageCircle className="w-6 h-6 text-emerald-400" />,
      href: "https://wa.me/923072570265", // Replace with your WhatsApp link
      color: "hover:border-emerald-500/50"
    },
    {
      name: "Instagram",
      value: "@vibecartpk", // Replace with your handle
      label: "Follow the vibe",
      icon: <Instagram className="w-6 h-6 text-pink-500" />,
      href: "https://www.instagram.com/vibecartpk",
      color: "hover:border-pink-500/50"
    },
    {
      name: "Facebook",
      value: "VibeCart", // Replace with your page name
      label: "Join our community",
      icon: <Facebook className="w-6 h-6 text-blue-500" />,
      href: "https://www.facebook.com/vibecart.official.pk",
      color: "hover:border-blue-500/50"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-yellow-500/30">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-serif font-black uppercase tracking-tighter mb-6">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] to-[#B38728]">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Have questions about your order or need style advice? Reach out to us directly on your favorite platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 transition-all duration-500 ${social.color} hover:-translate-y-2 block text-center`}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                {social.icon}
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-1">{social.label}</p>
              <h3 className="text-xl font-bold text-white">{social.name}</h3>
              <p className="mt-4 text-sm text-gray-400 font-light">{social.value}</p>
            </a>
          ))}
        </div>

        {/* Business Info Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-16 border-t border-white/5 max-w-3xl mx-auto">
          <div className="flex items-center gap-4 group">
            <div className="p-3 rounded-full bg-white/5 group-hover:bg-yellow-500/10 transition-colors">
              <Mail className="w-5 h-5 text-gray-400 group-hover:text-yellow-500" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Email Support</p>
              <p className="text-sm font-medium">info@vibecart.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="p-3 rounded-full bg-white/5 group-hover:bg-yellow-500/10 transition-colors">
              <Clock className="w-5 h-5 text-gray-400 group-hover:text-yellow-500" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Service Hours</p>
              <p className="text-sm font-medium">Mon - Sat: 10:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="mt-24 text-center">
            <p className="text-[10px] uppercase tracking-[0.5em] text-gray-600 font-bold">Catch the Vibe</p>
        </div>
      </div>
    </div>
  );
}