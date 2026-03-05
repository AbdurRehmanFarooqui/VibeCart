import React from 'react';
import { HelpCircle, CreditCard, Package, RefreshCcw, Watch, MessageCircle, ChevronRight, Search } from 'lucide-react';

export default function FAQPage() {
  const categories = [
    { id: 'orders', title: 'Orders & Payments', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'shipping', title: 'Shipping & Tracking', icon: <Package className="w-5 h-5" /> },
    { id: 'returns', title: 'Returns & Exchanges', icon: <RefreshCcw className="w-5 h-5" /> },
    // { id: 'products', title: 'Product Info', icon: <Watch className="w-5 h-5" /> },
    { id: 'support', title: 'Contact Support', icon: <MessageCircle className="w-5 h-5" /> },
  ];

  const faqs = {
    orders: [
      {
        q: "What payment methods do you accept?",
        a: "Currently, we exclusively offer Cash on Delivery (COD) to ensure you pay only when you have the product in hand. Stay tuned—online payment methods are coming soon!"
      },
      {
        q: "Can I change or cancel my order?",
        a: "Since we process orders quickly to get your accessories to you ASAP, you can modify or cancel your order within 1 hour of placing it. Please contact us via WhatsApp or Email immediately for any changes."
      },
      {
        q: "How does Cash on Delivery work?",
        a: "Simply place your order online and pay the total amount in cash to the courier representative when they deliver your package to your doorstep. Please have the exact amount ready if possible!"
      }
    ],
    shipping: [
      {
        q: "How do I track my order?",
        a: "Once your order is dispatched, you'll receive a tracking number via SMS/Email. You can use this on our carrier's website to see exactly where your vibe is."
      },
      {
        q: "Do you ship internationally?",
        a: "Currently, we only ship within the country to ensure the fastest delivery times and reliable COD service. We do not offer international shipping at this time."
      },
      {
        q: "What is the delivery timeline?",
        a: "Orders usually arrive within 3-5 business days. If there’s a carrier delay beyond 7 business days, please reach out so we can track it down for you."
      }
    ],
    returns: [
      {
        q: "What is your return policy?",
        a: "To maintain quality and hygiene for our accessories, we only accept returns or exchanges if the product is damaged, defective, or incorrect. You must notify us within 7 days of delivery."
      },
      {
        q: "How do I get a refund for a COD order?",
        a: "For approved returns on COD orders, we will process your refund via Bank Transfer or Store Credit. Our support team will reach out to collect your account details once the item is inspected."
      },
      {
        q: "Are there any non-returnable items?",
        a: "Yes. For hygiene reasons, opened fragrances and jewelry (like earrings) cannot be returned unless they arrived damaged."
      }
    ],

    // products: [
    //   { q: "Are your watches water-resistant?", a: "Most of our everyday watches are splash-resistant (3 ATM), meaning they can handle rain or hand-washing. However, we do not recommend showering or swimming with them unless specifically noted in the product description." },
    //   { q: "Will the jewelry tarnish?", a: "Our jewelry is crafted from high-quality materials like stainless steel and durable plating. To keep it looking fresh, avoid direct contact with perfumes, lotions, and prolonged water exposure." }
    // ]
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      {/* Hero Header */}
      <header className="bg-black text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-500 via-transparent to-transparent"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-violet-300 text-xs font-bold uppercase tracking-widest mb-6">
            Help Center
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">
            Frequently <span className="text-violet-500 font-light italic">Asked</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Got questions? We've got answers. Find everything you need to know about shopping at VibeCart.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="sticky top-8 space-y-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-3">Jump To</p>
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="flex items-center justify-between group px-4 py-3 rounded-2xl transition-all hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100"
                >
                  <span className="flex items-center gap-3 text-sm font-semibold text-gray-500 group-hover:text-black">
                    {category.icon} {category.title}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-violet-500 translate-x-0 group-hover:translate-x-1 transition-transform" />
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3 space-y-16 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">

            {/* Quick Search Bar (Visual Only for Layout) */}
            {/* <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for an answer..."
                className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
            </div> */}

            {/* Loop through categories and render FAQs */}
            {Object.entries(faqs).map(([categoryKey, questions]) => {
              const categoryDetails = categories.find(c => c.id === categoryKey);

              return (
                <section id={categoryKey} key={categoryKey} className="scroll-mt-8 group">
                  <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
                    <div className="bg-violet-100 text-violet-600 p-2 rounded-xl">
                      {categoryDetails?.icon}
                    </div>
                    <h2 className="text-2xl font-bold uppercase tracking-tight">{categoryDetails?.title}</h2>
                  </div>

                  <div className="space-y-4">
                    {questions.map((item, index) => (
                      <div key={index} className="p-5 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                        <h4 className="font-bold text-lg mb-2 text-black">{item.q}</h4>
                        <p className="text-gray-600 leading-relaxed text-sm">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

            {/* Contact Support Footer */}
            <section id="support" className="scroll-mt-8 pt-8">
              <div className="p-8 bg-violet-600 rounded-[2rem] text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full translate-y-8 -translate-x-8"></div>

                <HelpCircle className="w-10 h-10 mx-auto mb-4 text-violet-200" />
                <h3 className="text-2xl font-bold mb-2 relative z-10">Still can't find the answer?</h3>
                <p className="text-violet-200 mb-6 max-w-md mx-auto relative z-10">
                  Our customer vibe team is available Monday through Friday, 9am - 5pm EST to help you out.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                  <a href="mailto:support@vibecart.com" className="bg-white text-violet-900 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors w-full sm:w-auto">
                    Email Support
                  </a>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}