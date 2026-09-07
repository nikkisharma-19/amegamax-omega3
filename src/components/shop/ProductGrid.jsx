import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCarousel } from '../home/ProductCarousel';
import { ShieldCheck, Award, Heart, Check, Clock, Star, Sparkles } from 'lucide-react';

export const ProductGrid = () => {
  const product = PRODUCTS[0];
  const [activeTab, setActiveTab] = useState('nutrition');

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <div className="text-xs text-slate-400 font-medium">
          <span>Home</span> / <span className="text-slate-800 font-bold">Shop</span> /{' '}
          <span className="text-[#7A0000] font-bold">{product.name}</span>
        </div>

        {/* Flagship Product Showcase Component */}
        <ProductCarousel />

        {/* Deep Dive Information Tabs */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
          
          {/* Tab Navigation */}
          <div className="flex space-x-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'nutrition'
                  ? 'bg-[#7A0000] text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Nutritional Facts & RDA
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'benefits'
                  ? 'bg-[#7A0000] text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Key Health Benefits
            </button>
            <button
              onClick={() => setActiveTab('howToUse')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'howToUse'
                  ? 'bg-[#7A0000] text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Dosage & Directions
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'reviews'
                  ? 'bg-[#7A0000] text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Customer Reviews ({product.reviewCount})
            </button>
          </div>

          {/* Tab 1: Nutritional Table */}
          {activeTab === 'nutrition' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
                <p>Values formulated strictly according to Indian ICMR Guidelines & Pharmacopeia standards</p>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                  100% Mercury Free & Pure
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-800 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">Active Nutrient</th>
                      <th className="py-3.5 px-4 sm:px-6">Amount / Serving</th>
                      <th className="py-3.5 px-4 sm:px-6">Efficacy Ratio</th>
                      <th className="py-3.5 px-4 sm:px-6 hidden sm:table-cell">Physiological Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {product.keyNutrients.map((n, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">{n.name}</td>
                        <td className="py-3 px-4 sm:px-6 text-slate-700 font-semibold">{n.amount}</td>
                        <td className="py-3 px-4 sm:px-6 font-black text-[#7A0000]">{n.rda}</td>
                        <td className="py-3 px-4 sm:px-6 text-xs text-slate-500 hidden sm:table-cell">{n.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Benefits */}
          {activeTab === 'benefits' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
              {product.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start space-x-3"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: How to Use */}
          {activeTab === 'howToUse' && (
            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center space-x-2 text-amber-950 font-bold text-sm sm:text-base">
                <Clock className="w-5 h-5 text-amber-600" />
                <span>Recommended Daily Dosage</span>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">
                {product.howToUse}
              </p>
              <div className="pt-2 border-t border-amber-200/60 text-xs text-slate-700 space-y-1.5">
                <p>• Do not exceed recommended daily dose unless advised by a healthcare professional.</p>
                <p>• Best consumed with dietary fats (during meals) to optimize intestinal absorption.</p>
                <p>• Keep bottle tightly closed with desiccant pouch inside.</p>
              </div>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-200 gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-black text-slate-900">{product.rating}</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Based on {product.reviewCount} verified buyer reviews across India
                  </p>
                </div>

                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
                  ✓ 100% Verified Purchases
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl border border-slate-200/80 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Dr. Vivek Kulkarni (Cardiologist & Verified Buyer)</span>
                    <span className="text-[10px] text-slate-400">Delhi • 1 week ago</span>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    "I am thoroughly impressed by the purity and lack of fishy burps. The 180mg EPA to 120mg DHA ratio is clean, effective, and the 2-bottle 40% discount makes it very accessible."
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200/80 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Anita Sen (Verified Buyer)</span>
                    <span className="text-[10px] text-slate-400">Bangalore • 2 weeks ago</span>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    "My knee stiffness from climbing stairs has noticeably subsided after 3 weeks of daily intake. Super fast delivery and the free shipping on 2 bottles was great!"
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
