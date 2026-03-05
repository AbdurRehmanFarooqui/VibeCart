import React from 'react';
import { ShieldCheck, Lock, Eye, RefreshCcw, Mail, ChevronRight } from 'lucide-react';

export default function PolicyPage() {
  const sections = [
    { id: 'privacy', title: 'Privacy Policy', icon: <Lock className="w-5 h-5" /> },
    { id: 'collect', title: 'Information We Collect', icon: <Eye className="w-5 h-5" /> },
    { id: 'use', title: 'How We Use Data', icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'security', title: 'Data Security', icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'rights', title: 'Your Rights', icon: <RefreshCcw className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      {/* Hero Header */}
      <header className="bg-black text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-200 via-transparent to-transparent"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 uppercase">
            Trust <span className="text-indigo-400">&</span> Privacy
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto italic">
            "Your vibe is our priority. We handle your data with the same care we handle our accessories."
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar Navigation - Sticky for Desktop */}
          <aside className="lg:col-span-1">
            <nav className="sticky top-8 space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-3">Sections</p>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center justify-between group px-3 py-3 rounded-xl transition-all hover:bg-white hover:shadow-sm"
                >
                  <span className="flex items-center gap-3 text-sm font-medium text-gray-600 group-hover:text-black">
                    {section.icon} {section.title}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-black" />
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3 space-y-16">
            
            <section id="privacy" className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-6">
                 <div className="bg-black text-white p-2 rounded-lg"><Lock className="w-6 h-6" /></div>
                 <h2 className="text-3xl font-bold tracking-tight">Privacy Policy</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                At <span className="font-bold text-black">VibeCart</span>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or use our services.
              </p>
            </section>

            <section id="collect" className="scroll-mt-8 p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Information We Collect</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                We may collect personal information such as your name, email address, phone number, and payment details when you make a purchase or sign up for our newsletter.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 rounded-2xl">
                  <p className="font-bold text-indigo-900 text-sm mb-1 uppercase tracking-wide">Personal Data</p>
                  <p className="text-sm text-indigo-700">Names, billing addresses, and contact info for order fulfillment.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-wide">Technical Data</p>
                  <p className="text-sm text-slate-700">IP addresses, browser types, and behavior to improve your shopping experience.</p>
                </div>
              </div>
            </section>

            <section id="use" className="scroll-mt-8">
              <h3 className="text-2xl font-bold mb-4">How We Use Your Information</h3>
              <p className="text-gray-600 leading-relaxed">
                We use your personal information to process your orders, communicate with you about your purchases, and send you promotional materials if you have opted in. We also use non-personal information to analyze website traffic and improve our services.
              </p>
            </section>

            <section id="security" className="scroll-mt-8">
              <h3 className="text-2xl font-bold mb-4">Data Security</h3>
              <div className="p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl">
                <p className="text-gray-700 leading-relaxed italic">
                  "We implement a variety of security measures to maintain the safety of your personal information. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure."
                </p>
              </div>
            </section>

            <section id="rights" className="scroll-mt-8">
              <h3 className="text-2xl font-bold mb-4 text-indigo-600">Your Rights</h3>
              <p className="text-gray-600 leading-relaxed">
                You have the right to access, correct, or delete your personal information. You can also opt out of receiving promotional emails from us at any time. If you have any questions about your rights or our privacy practices, please contact us.
              </p>
            </section>

            <footer className="pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-bold text-xl mb-1">Still have questions?</h4>
                  <p className="text-gray-500">We're here to help you catch the best vibe.</p>
                </div>
                <a 
                  href="mailto:privacy@vibecart.com" 
                  className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-600 transition-colors shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                  Contact Support
                </a>
              </div>
            </footer>

          </main>
        </div>
      </div>
    </div>
  );
}