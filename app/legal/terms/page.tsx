import React from 'react';
import { Gavel, Scale, FileText, AlertCircle, Globe, Mail, ChevronRight } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function TermsPage() {
    const sections = [
        { id: 'usage', title: '1. Website Use', icon: <Globe className="w-5 h-5" /> },
        { id: 'ip', title: '2. Intellectual Property', icon: <FileText className="w-5 h-5" /> },
        { id: 'products', title: '3. Product Info', icon: <AlertCircle className="w-5 h-5" /> },
        { id: 'liability', title: '4. Liability Limits', icon: <Scale className="w-5 h-5" /> },
        { id: 'law', title: '5. Governing Law', icon: <Gavel className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-slate-900">
            {/* Dynamic Hero Header */}
            <header className="bg-black text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6">
                        The Legal Vibe
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase italic">
                        Terms <span className="text-indigo-500">&</span> Conditions
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        By using VibeCart, you agree to these rules. We keep it fair so you can keep it stylish.
                    </p>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">

                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-1">
                        <nav className="sticky top-8 space-y-2">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-3">Legal Navigation</p>
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="flex items-center justify-between group px-4 py-3 rounded-2xl transition-all hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100"
                                >
                                    <span className="flex items-center gap-3 text-sm font-semibold text-gray-500 group-hover:text-black">
                                        {section.icon} {section.title}
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 translate-x-0 group-hover:translate-x-1 transition-transform" />
                                </a>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:col-span-3 space-y-12 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">

                        <section id="intro" className="pb-8 border-b border-gray-50">
                            <p className="text-xl text-gray-600 leading-relaxed font-medium italic">
                                "Welcome to VibeCart! These terms and conditions outline the rules and regulations for the use of our website and services."
                            </p>
                        </section>

                        <section id="usage" className="scroll-mt-8 group">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xs font-black bg-indigo-100 text-indigo-600 px-2 py-1 rounded">01</span>
                                <h2 className="text-2xl font-bold uppercase tracking-tight">Use of Our Website</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                You agree to use our website only for lawful purposes. Prohibited behavior includes harassing or causing distress to any other user, transmitting obscene content, or disrupting the normal flow of dialogue within our website.
                            </p>
                        </section>

                        <section id="ip" className="scroll-mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xs font-black bg-indigo-100 text-indigo-600 px-2 py-1 rounded">02</span>
                                <h2 className="text-2xl font-bold uppercase tracking-tight">Intellectual Property</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                All content on our website—text, graphics, logos, and images—is the property of <span className="text-black font-semibold">VibeCart</span>. You may not reproduce, distribute, or create derivative works without our express written permission.
                            </p>
                        </section>

                        <section id="products" className="scroll-mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xs font-black bg-black text-white px-2 py-1 rounded">03</span>
                                <h2 className="text-2xl font-bold uppercase tracking-tight">Product Information</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                We strive for accuracy, but we do not warrant that product descriptions or prices are error-free. We reserve the right to correct any inaccuracies and update information at any time without prior notice.
                            </p>
                        </section>

                        <section id="liability" className="scroll-mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xs font-black bg-indigo-100 text-indigo-600 px-2 py-1 rounded">04</span>
                                <h2 className="text-2xl font-bold uppercase tracking-tight">Limitation of Liability</h2>
                            </div>
                            <div className="bg-red-50/50 border border-red-100 p-6 rounded-2xl">
                                <p className="text-gray-600 leading-relaxed text-sm uppercase font-semibold mb-2 text-red-800">Legal Disclaimer:</p>
                                <p className="text-gray-600 leading-relaxed">
                                    In no event shall VibeCart be liable for any direct, indirect, or incidental damages arising out of your use of our website or products. This includes loss of profits, data, or goodwill.
                                </p>
                            </div>
                        </section>

                        <section id="law" className="scroll-mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xs font-black bg-indigo-100 text-indigo-600 px-2 py-1 rounded">05</span>
                                <h2 className="text-2xl font-bold uppercase tracking-tight">Governing Law</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                These terms are governed by the laws of our operating jurisdiction. By using this site, you submit to the exclusive jurisdiction of our local courts to resolve any disputes.
                            </p>
                        </section>

                        {/* Contact Footer */}
                        <div className="mt-16 p-8 bg-black rounded-[2rem] text-center text-white">
                            <h3 className="text-2xl font-bold mb-2">Questions about these Terms?</h3>
                            <p className="text-gray-400 mb-6">We're transparent about how we operate.</p>
                            <a
                                href="mailto:info@vibecart.com"
                                className="inline-flex items-center gap-2 text-indigo-400 font-bold hover:text-white transition-colors underline underline-offset-8"
                            >
                                <Mail className="w-5 h-5" />
                                info@vibecart.com
                            </a>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
}