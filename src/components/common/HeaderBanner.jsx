import React, { useState, useEffect } from 'react';
import { HEADER_TICKER } from '../../data/promotions';
import { ChevronLeft, ChevronRight, Sparkles, Tag, Truck } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const HeaderBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { openCheckout } = useUI();

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HEADER_TICKER.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentPromo = HEADER_TICKER[currentIndex];

  const scrollToOffer = () => {
    const el = document.getElementById('product-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative bg-gradient-to-r from-slate-950 via-[#600000] to-slate-950 text-white text-xs py-2.5 px-4 transition-colors duration-500 overflow-hidden select-none border-b border-white/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Previous Button */}
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === 0 ? HEADER_TICKER.length - 1 : prev - 1
            )
          }
          className="p-1 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors focus:outline-none"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Sliding Message Text */}
        <div className="flex-1 flex items-center justify-center text-center space-x-2 px-2 overflow-hidden">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 animate-pulse" />
          <span className="font-semibold truncate tracking-tight text-[11px] sm:text-xs text-slate-100">
            {currentPromo.text}
          </span>
          <button
            onClick={scrollToOffer}
            className="underline font-black text-amber-300 hover:text-amber-200 transition-colors flex-shrink-0 ml-1.5 flex items-center space-x-0.5"
          >
            <span>{currentPromo.linkText} →</span>
          </button>
        </div>

        {/* Next Button */}
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev + 1) % HEADER_TICKER.length)
          }
          className="p-1 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors focus:outline-none"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
