"use client";
import React, { useState } from 'react';
import { Search, Mail, Phone, Package, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function TrackLandingPage() {
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to find orders and send email/SMS
    // In reality: await supabase.rpc('send_tracking_links', { contact_info: contact })
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">
            Track your <span className="text-indigo-600">Vibe</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Enter your email or phone number to receive your tracking links.
          </p>
        </div>

        {!submitted ? (
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
            <form className="space-y-6" onSubmit={handleRecover}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Contact Information
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {contact.includes('@') ? <Mail className="w-5 h-5 text-gray-400" /> : <Phone className="w-5 h-5 text-gray-400" />}
                  </div>
                  <input
                    required
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="email@example.com or phone"
                    className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-lg text-sm font-bold text-white bg-black hover:bg-indigo-600 transition-all disabled:opacity-50"
              >
                {loading ? "Searching..." : "Send Tracking Links"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-emerald-100 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Links Sent!</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              If an order exists for <span className="font-bold text-black">{contact}</span>, we've sent the tracking links to your inbox or phone.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-6 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Try another contact
            </button>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 italic">
          Lost your order ID? Check your confirmation email or use the form above.
        </p>
      </div>
    </div>
  );
}