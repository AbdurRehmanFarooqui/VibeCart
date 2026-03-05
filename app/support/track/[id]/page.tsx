"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Truck, Package, CheckCircle, Clock, MapPin, AlertCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// Helper to simulate status levels
const STATUS_STEPS = ["ordered", "processing", "shipped", "delivered"];

export default function OrderStatusPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      // Replace with your actual Supabase query
      // const { data, error } = await supabase.from('orders').select('*').eq('id', id).single();
      
      // Mock Data for UI demonstration
      setTimeout(() => {
        const mockOrder = {
          id: id,
          status: 'shipped', // Change to 'ordered', 'processing', etc to see UI update
          total: 5000,
          items: [{ title: "Creed Aventus 50ml", price: 5000 }],
          created_at: new Date().toISOString(),
          customer_name: "Alex Vibe"
        };
        
        if (id?.length !== 36) { // Basic UUID length check
          setError(true);
        } else {
          setOrder(mockOrder);
        }
        setLoading(false);
      }, 1000);
    }
    fetchOrder();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 font-bold uppercase tracking-widest animate-pulse">Checking the vibe...</div>;

  if (error || !order) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-black uppercase">Invalid Tracking ID</h1>
      <p className="text-gray-500 mb-8">We couldn't find an order with that ID.</p>
      <Link href="/support/track" className="bg-black text-white px-8 py-3 rounded-full font-bold">Try Another ID</Link>
    </div>
  );

  const currentStep = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/support/track" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-black mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Tracking
        </Link>

        {/* Header */}
        <div className="bg-white p-8 rounded-t-[2.5rem] border-x border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-1">Order Confirmed</p>
              <h1 className="text-2xl font-black uppercase tracking-tight">Order #{order.id.slice(0,8)}</h1>
              <p className="text-gray-400 text-sm">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
            </div>
            <div className="bg-black text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
              {order.status}
            </div>
          </div>
        </div>

        {/* Status Tracker */}
        <div className="bg-white p-8 border-x border-gray-100 flex justify-between relative overflow-hidden">
          {/* Progress Bar Line */}
          <div className="absolute top-[3.25rem] left-[10%] right-[10%] h-[2px] bg-gray-100 z-0">
             <div 
               className="h-full bg-emerald-500 transition-all duration-1000" 
               style={{ width: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%` }}
             />
          </div>

          {STATUS_STEPS.map((step, idx) => (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-colors ${
                idx <= currentStep ? 'bg-emerald-500 border-emerald-100 text-white' : 'bg-white border-gray-100 text-gray-300'
              }`}>
                {idx < currentStep ? <CheckCircle className="w-5 h-5" /> : (
                  idx === 0 ? <Package className="w-4 h-4" /> :
                  idx === 1 ? <Clock className="w-4 h-4" /> :
                  idx === 2 ? <Truck className="w-4 h-4" /> :
                  <MapPin className="w-4 h-4" />
                )}
              </div>
              <p className={`mt-3 text-[10px] font-black uppercase tracking-widest ${idx <= currentStep ? 'text-black' : 'text-gray-300'}`}>
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Order Details */}
        <div className="bg-slate-50 p-8 rounded-b-[2.5rem] border-x border-b border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Summary</h3>
              {order.items.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center mb-2">
                  <span className="text-sm text-black font-bold">{item.title}</span>
                  <span className="text-sm text-gray-500">Rs. {item.price}</span>
                </div>
              ))}
              <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between items-center">
                <span className="font-black text-black uppercase text-sm">Total Paid</span>
                <span className="font-black text-indigo-600">Rs. {order.total}</span>
              </div>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">Something not right with your order?</p>
              <Link href="/contact" className="block text-center py-3 bg-gray-100 hover:bg-black hover:text-white rounded-xl text-xs font-bold transition-all uppercase tracking-widest text-black">
                Message Support
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
