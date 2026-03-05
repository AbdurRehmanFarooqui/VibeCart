import React from 'react';
import { Truck, Clock, Globe, MapPin, Package, AlertCircle, ChevronRight, Mail } from 'lucide-react';

export default function ShippingPage() {
  const sections = [
    { id: 'processing', title: 'Processing Times', icon: <Clock className="w-5 h-5" /> },
    { id: 'rates', title: 'Rates & Delivery', icon: <Truck className="w-5 h-5" /> },
    { id: 'tracking', title: 'Order Tracking', icon: <MapPin className="w-5 h-5" /> },
    // { id: 'international', title: 'International', icon: <Globe className="w-5 h-5" /> },
    { id: 'issues', title: 'Lost/Damaged', icon: <AlertCircle className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      {/* Hero Header */}
      <header className="bg-black text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
            Delivery Vibe
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">
            Shipping <span className="text-blue-500 font-light italic">Policy</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            We know you're excited to catch the vibe. Here's everything you need to know about how and when your accessories will arrive.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="sticky top-8 space-y-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-3">Shipping Info</p>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center justify-between group px-4 py-3 rounded-2xl transition-all hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100"
                >
                  <span className="flex items-center gap-3 text-sm font-semibold text-gray-500 group-hover:text-black">
                    {section.icon} {section.title}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 translate-x-0 group-hover:translate-x-1 transition-transform" />
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3 space-y-12 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
            
            <section id="processing" className="scroll-mt-8 group">
              <div className="flex items-center gap-3 mb-4">
                 <div className="bg-blue-100 text-blue-600 p-2 rounded-xl"><Clock className="w-6 h-6" /></div>
                 <h2 className="text-2xl font-bold uppercase tracking-tight">Processing Times</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                All orders are processed within <span className="font-bold text-black">1 to 2 business days</span> (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
              </p>
              <p className="text-sm text-gray-500 italic">
                *Note: During high-volume periods (like Black Friday or holidays), processing times may be slightly delayed.
              </p>
            </section>

            <section id="rates" className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-4">
                 <div className="bg-blue-100 text-blue-600 p-2 rounded-xl"><Truck className="w-6 h-6" /></div>
                 <h2 className="text-2xl font-bold uppercase tracking-tight">Rates & Estimates</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Shipping charges for your order will be calculated and displayed at checkout. We offer the following standard tiers:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-lg mb-1">Standard Shipping</h4>
                    <p className="text-sm text-gray-500 mb-3">3-5 Business Days</p>
                  </div>
                  <p className="text-xl font-black text-blue-600">Rs 200 <span className="text-sm font-normal text-gray-500">(Free over Rs 2,900)</span></p>
                </div>
                {/* <div className="p-5 bg-black text-white rounded-2xl flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-20"><Package className="w-12 h-12" /></div>
                  <div className="relative z-10">
                    <h4 className="font-bold text-lg mb-1">Express Shipping</h4>
                    <p className="text-sm text-gray-300 mb-3">1-2 Business Days</p>
                  </div>
                  <p className="text-xl font-black relative z-10">$14.99</p>
                </div> */}
              </div>
            </section>

            <section id="tracking" className="scroll-mt-8 p-6 bg-blue-50/50 rounded-3xl border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                 <div className="bg-white text-blue-600 p-2 rounded-xl shadow-sm"><MapPin className="w-6 h-6" /></div>
                 <h2 className="text-2xl font-bold uppercase tracking-tight">Order Tracking</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
              </p>
            </section>

            {/* <section id="international" className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-4">
                 <div className="bg-blue-100 text-blue-600 p-2 rounded-xl"><Globe className="w-6 h-6" /></div>
                 <h2 className="text-2xl font-bold uppercase tracking-tight">International Shipping</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                We currently ship to select international countries. Delivery times range from 7-14 business days depending on the destination.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
                <p className="text-sm text-yellow-800 font-medium">
                  <strong>Customs & Duties:</strong> Your order may be subject to import duties and taxes, which are incurred once a shipment reaches your destination country. VibeCart is not responsible for these charges if they are applied.
                </p>
              </div>
            </section> */}

            <section id="issues" className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-4">
                 <div className="bg-red-100 text-red-600 p-2 rounded-xl"><AlertCircle className="w-6 h-6" /></div>
                 <h2 className="text-2xl font-bold uppercase tracking-tight">Missing or Damaged Packages</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                If your order arrives damaged in any way, please email us within 48 hours at <a href="mailto:support@vibecart.com" className="text-blue-600 font-bold hover:underline">support@vibecart.com</a> with your order number and a photo of the item's condition. If your package is marked as delivered but you haven't received it, please check with neighbors or your local post office before contacting us.
              </p>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}