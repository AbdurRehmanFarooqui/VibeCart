import React from 'react';
import { RefreshCcw, CheckCircle, XCircle, CreditCard, HelpCircle, ChevronRight, Mail, Banknote } from 'lucide-react';

export default function ReturnsPage() {
  const sections = [
    { id: 'policy', title: 'Return Window', icon: <RefreshCcw className="w-5 h-5" /> },
    { id: 'eligibility', title: 'Eligibility', icon: <CheckCircle className="w-5 h-5" /> },
    { id: 'exceptions', title: 'Exceptions', icon: <XCircle className="w-5 h-5" /> },
    { id: 'process', title: 'How to Return', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'refunds', title: 'Refunds & COD', icon: <CreditCard className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      {/* Hero Header */}
      <header className="bg-black text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-6">
            Quality Check Guaranteed
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">
            Returns <span className="text-emerald-500 font-light italic">&</span> Exchanges
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Received the wrong vibe? If your product isn't what you ordered or arrived damaged, we'll make it right immediately.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="sticky top-8 space-y-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-3">Returns Guide</p>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center justify-between group px-4 py-3 rounded-2xl transition-all hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100"
                >
                  <span className="flex items-center gap-3 text-sm font-semibold text-gray-500 group-hover:text-black">
                    {section.icon} {section.title}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 translate-x-0 group-hover:translate-x-1 transition-transform" />
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3 space-y-12 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
            
            <section id="policy" className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-4">
                 <div className="bg-emerald-100 text-emerald-600 p-2 rounded-xl"><RefreshCcw className="w-6 h-6" /></div>
                 <h2 className="text-2xl font-bold uppercase tracking-tight">The 7-Day Window</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                We accept reports for incorrect or damaged items up to <span className="font-bold text-black">7 days after delivery</span>. To ensure a smooth process, please inspect your accessories immediately upon arrival.
              </p>
            </section>

            <section id="eligibility" className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-4">
                 <div className="bg-emerald-100 text-emerald-600 p-2 rounded-xl"><CheckCircle className="w-6 h-6" /></div>
                 <h2 className="text-2xl font-bold uppercase tracking-tight">When can I return?</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4 font-medium">
                At Vibe Cart, we prioritize quality. Returns and exchanges are strictly limited to the following cases:
              </p>
              <ul className="space-y-3">
                {[
                  'Received the wrong product (different from your order)',
                  'Product arrived with visible damage or defects',
                  'Incomplete order (missing items/parts)',
                  'Item is in original packaging with all tags attached'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section id="refunds" className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-4">
                 <div className="bg-emerald-100 text-emerald-600 p-2 rounded-xl"><CreditCard className="w-6 h-6" /></div>
                 <h2 className="text-2xl font-bold uppercase tracking-tight">Refunds & COD Orders</h2>
              </div>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Once your return is received and inspected, we will notify you of the approval. If approved, your refund will be processed based on your original payment method:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2 font-bold text-black">
                      <CreditCard className="w-5 h-5 text-emerald-500" />
                      Prepaid Orders
                    </div>
                    <p className="text-sm">Refunds will be credited back to your original Credit/Debit card or Wallet within 5-7 business days.</p>
                  </div>
                  
                  <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="flex items-center gap-2 mb-2 font-bold text-black">
                      <Banknote className="w-5 h-5 text-emerald-600" />
                      COD Orders
                    </div>
                    <p className="text-sm">For Cash on Delivery, we will issue your refund via <span className="font-bold">Bank Transfer</span> or <span className="font-bold">Store Credit</span>. Our team will contact you for your account details.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Support Footer */}
            <div className="mt-12 p-6 bg-slate-900 rounded-[2rem] text-center text-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="text-xl font-bold mb-1">Issue with your order?</h3>
                <p className="text-slate-400 text-sm">Send us a photo of the item and your order ID.</p>
              </div>
              <a 
                href="mailto:support@vibecart.com" 
                className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-400 transition-colors whitespace-nowrap"
              >
                <Mail className="w-5 h-5" />
                Contact Support
              </a>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}