import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  Zap,
  CheckCircle2,
  Award,
  Truck
} from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

export const HERO_SLIDES = [
  {
    id: 'flagship',
    badge: 'Amega Max Flagship Formula',
    tag: 'Save up to 40% Today',
    title: 'Amega Max Omega-3 Super Strength',
    subtitle: 'Daily Support for Heart, Brain & Joint Health. Ultra-pure 1000mg molecularly distilled fish oil delivering 180mg EPA & 120mg DHA for peak daily vitality.',
    ctaText: 'Shop Now (From ₹486.75)',
    secondaryCta: 'View Health Benefits',
    actionType: 'buy-now',
    bgGradient: 'from-slate-950 via-[#4A0000] to-slate-900',
    keyPoints: ['1000mg Pure Marine Fish Oil', '180mg EPA + 120mg DHA', 'Zero Fishy Aftertaste', '100% Mercury Free'],
    image: '/medicines/omega-3.jpeg'
  },
  {
    id: 'purity',
    badge: 'Molecularly Distilled Purity',
    tag: 'Highest Bioavailability',
    title: 'Superior Cellular Nutrition with Zero Fishy Burps',
    subtitle: 'State-of-the-art molecular distillation purifies every drop, removing heavy metals, PCBs and mercury for maximum cellular absorption and heart wellness.',
    ctaText: 'Get 2 Bottles @ 40% OFF',
    secondaryCta: 'Explore Purity Science',
    actionType: 'buy-2',
    bgGradient: 'from-slate-950 via-[#600000] to-slate-900',
    keyPoints: ['Ultra-Filtered Deep Sea Oil', 'Enteric-Coated Softgels', 'Doctor Formulated', 'Fast Joint & Heart Action'],
    image: '/medicines/omega-3 (1).jpeg'
  },
  {
    id: 'bundle-offer',
    badge: 'Special Direct Launch Offer',
    tag: 'FREE Express Delivery',
    title: 'Buy 2 Bottles & Save 40% + Free Shipping',
    subtitle: 'Get 120 softgels for just ₹778.80 (Regular MRP ₹1,298). Complete 4-month continuous cardiovascular, cognitive and joint mobility support.',
    ctaText: 'Claim 40% Off Deal (₹778.80)',
    secondaryCta: 'See Pricing Details',
    actionType: 'buy-2',
    bgGradient: 'from-slate-950 via-[#7A0A0A] to-slate-900',
    keyPoints: ['1 Bottle: 25% OFF (₹486.75)', '2+ Bottles: 40% OFF (₹778.80)', '100% Free Shipping on 2+', 'Instant Dispatch in 24h'],
    image: '/medicines/omega-3.jpeg'
  }
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { openCheckout, showToast } = useUI();
  const { addToCart } = useCart();

  const product = PRODUCTS[0];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = HERO_SLIDES[current];

  const handleAction = (type) => {
    const selectedVariant = type === 'buy-2' || slide.actionType === 'buy-2'
      ? product.variants[1] // 2 bottles
      : product.variants[0]; // 1 bottle

    addToCart(product, selectedVariant, 1);
    showToast(`Added ${selectedVariant.size} to your cart (${selectedVariant.discount}% OFF applied!)`, 'success');
    openCheckout();
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-slate-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={`relative min-h-[560px] sm:min-h-[620px] lg:min-h-[660px] bg-gradient-to-r ${slide.bgGradient} flex items-center transition-all duration-700`}>
        
        {/* Subtle Decorative Ambient Grid & Glows */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Copy & Value Proposition */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold border border-white/15 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{slide.badge}</span>
                <span className="bg-amber-400 text-slate-950 text-[10px] uppercase font-black px-2 py-0.5 rounded-full ml-1">
                  {slide.tag}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-md">
                {slide.title}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-200 font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {slide.subtitle}
              </p>

              {/* Key Bullet Highlights */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 max-w-lg mx-auto lg:mx-0 text-xs sm:text-sm font-semibold text-slate-200">
                {slide.keyPoints.map((point, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => handleAction('buy-now')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-rose-600 to-[#9A0000] hover:from-amber-400 hover:to-[#B50000] text-white font-black text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 border border-white/20"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollToSection('product-showcase')}
                  className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/20 transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>{slide.secondaryCta}</span>
                </button>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-3 flex items-center justify-center lg:justify-start space-x-4 sm:space-x-6 text-xs text-slate-300 border-t border-white/10">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>GMP Certified</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1.5">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  <span>Free Express Delivery on 2+</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>100% Indian RDA</span>
                </div>
              </div>

            </div>

            {/* Right Interactive Product Presentation with Premium Animation */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-sm sm:max-w-md flex flex-col items-center">
                
                {/* Glowing Aura backdrop */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/30 to-rose-500/20 blur-2xl rounded-full transform scale-95 animate-golden-glow"></div>

                {/* Animated Bottle Container with Cap Reveal Effect */}
                <div className="relative z-10 w-full flex flex-col items-center animate-float">
                  
                  {/* Decorative Simulated Floating Bottle Cap */}
                  <div className="relative -mb-4 z-20 animate-cap-open">
                    <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-[11px] shadow-lg border border-white/40 flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5 text-slate-900" />
                      <span>1000mg Pure Marine Oil</span>
                    </div>
                  </div>

                  {/* Main Product Bottle Visual */}
                  <div className="relative p-3 bg-white/95 rounded-3xl shadow-2xl border-2 border-amber-400/40 backdrop-blur-sm transform hover:scale-105 transition-transform duration-500">
                    <img
                      src={slide.image}
                      alt="Amega Max Omega-3 Super Strength Bottle"
                      className="w-full h-auto max-h-[340px] sm:max-h-[380px] object-contain rounded-2xl drop-shadow-xl"
                    />

                    {/* Floating Offer Badge on Image */}
                    <div className="absolute bottom-4 right-4 bg-[#7A0000] text-white px-3 py-1.5 rounded-2xl shadow-xl border border-amber-300 flex items-center space-x-1 text-xs font-black">
                      <span>40% OFF (Buy 2)</span>
                    </div>

                    <div className="absolute top-4 left-4 bg-emerald-700 text-white px-2.5 py-1 rounded-full shadow-md text-[10px] font-extrabold uppercase">
                      Enteric Softgels
                    </div>
                  </div>

                  {/* Floating Softgel & Purity Benefit Chips */}
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold flex items-center space-x-1">
                      <Heart className="w-3.5 h-3.5 text-rose-400" />
                      <span>180mg EPA (Heart)</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold flex items-center space-x-1">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      <span>120mg DHA (Brain)</span>
                    </span>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={() => setCurrent((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all transform hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={() => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all transform hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
