import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { PRODUCTS } from '../../data/products';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, openCheckout } = useUI();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const product = PRODUCTS[0];

  const trendingTags = [
    "Omega-3 Super Strength",
    "EPA & DHA",
    "2 Bottles (40% OFF)",
    "Heart Health",
    "Joint Mobility",
    "Molecular Distillation",
    "Zero Fishy Burps",
    "FREE Shipping"
  ];

  const scrollToOffer = () => {
    setIsSearchOpen(false);
    const el = document.getElementById('product-showcase');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center space-x-3 bg-slate-50/70">
          <Search className="w-6 h-6 text-[#7A0000] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Amega Max Omega-3 benefits, EPA/DHA, pricing..."
            className="w-full bg-transparent text-base sm:text-lg font-medium text-slate-800 focus:outline-none placeholder-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold"
          >
            ESC
          </button>
        </div>

        {/* Quick Trending Tags */}
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Popular Topics & Benefits</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-[#7A0000] text-xs font-semibold text-slate-700 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Featured Product Result Card */}
          <div className="pt-4 border-t border-slate-100">
            <div
              onClick={scrollToOffer}
              className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-100 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-slate-200 flex-shrink-0"
                />
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full">
                    Special 40% Deal on 2 Bottles
                  </span>
                  <h4 className="font-black text-slate-900 text-sm group-hover:text-[#7A0000] transition-colors mt-0.5">
                    {product.name}
                  </h4>
                  <p className="text-xs text-slate-500">1000mg Marine Oil • 180mg EPA + 120mg DHA</p>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-sm font-black text-[#7A0000]">From ₹486.75</p>
                <span className="text-[11px] text-brand-blue font-bold flex items-center justify-end space-x-0.5 group-hover:underline">
                  <span>View Offers</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
