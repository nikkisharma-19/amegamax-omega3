import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  User,
  Truck,
  Menu,
  X,
  Sparkles,
  Heart,
  ShieldCheck,
  Zap,
  Tag
} from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';

export const Navbar = () => {
  const {
    activeTab,
    setActiveTab,
    setIsSearchOpen,
    setIsCartOpen,
    setIsAuthOpen,
    setIsQuizOpen,
    setIsTrackOrderOpen,
    user
  } = useUI();

  const { totalItemsCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Amega Max Brand Logo */}
            <div
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer flex items-center space-x-3 group select-none"
            >
              <img
                src="/logo.png"
                alt="Amega Max Logo"
                className="w-11 h-11 sm:w-12 sm:h-12 object-contain group-hover:scale-105 transition-transform drop-shadow-sm rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#7A0000] flex items-baseline">
                  Amega Max
                </span>
                <span className="text-[7px] font-bold text-slate-500 -mt-1 tracking-wider uppercase">
                  Omega-3 Super Strength
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 font-semibold text-sm text-slate-700">
            
            <button
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 py-2 rounded-xl transition-colors ${
                activeTab === 'home'
                  ? 'text-[#7A0000] font-bold bg-rose-50'
                  : 'hover:text-[#7A0000] hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection('benefits-section')}
              className="px-3.5 py-2 rounded-xl hover:text-[#7A0000] hover:bg-slate-50 transition-colors"
            >
              Health Benefits
            </button>

            <button
              onClick={() => scrollToSection('product-showcase')}
              className="px-3.5 py-2 rounded-xl text-[#7A0000] font-bold hover:bg-rose-50 transition-colors flex items-center space-x-1"
            >
              <span>Omega-3 Offers</span>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-extrabold px-1.5 py-0.5 rounded-full uppercase">
                40% OFF
              </span>
            </button>

            <button
              onClick={() => setIsQuizOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-slate-700 font-semibold hover:text-[#7A0000] hover:bg-rose-50 transition-colors group"
            >
              <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform" />
              <span>Dosage Calculator</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 py-2 rounded-xl transition-colors ${
                activeTab === 'about'
                  ? 'text-[#7A0000] font-bold bg-rose-50'
                  : 'hover:text-[#7A0000] hover:bg-slate-50'
              }`}
            >
              Purity & Science
            </button>

            <button
              onClick={() => {
                setActiveTab('faq');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 py-2 rounded-xl transition-colors ${
                activeTab === 'faq'
                  ? 'text-[#7A0000] font-bold bg-rose-50'
                  : 'hover:text-[#7A0000] hover:bg-slate-50'
              }`}
            >
              FAQ
            </button>

            {/* Track Order */}
            <button
              onClick={() => setIsTrackOrderOpen(true)}
              className="flex items-center space-x-1 px-3 py-2 rounded-xl text-slate-600 hover:text-brand-blue hover:bg-blue-50 transition-colors text-xs font-bold"
            >
              <Truck className="w-4 h-4 text-brand-blue" />
              <span>Track Order</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Offer Button */}
            <button
              onClick={() => scrollToSection('product-showcase')}
              className="hidden md:flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-rose-50 text-[#7A0000] border border-rose-200 text-xs font-black hover:bg-rose-100 transition-colors"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Buy 2 @ ₹778.80 (40% OFF)</span>
            </button>

            {/* User Account / Login */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="p-2 rounded-full text-slate-700 hover:bg-slate-100 hover:text-[#7A0000] transition-colors relative"
              aria-label="User Account"
            >
              <User className="w-5 h-5" />
              {user && (
                <span className="absolute bottom-1 right-1 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#7A0000] text-white hover:bg-[#600000] shadow-md hover:shadow-lg transition-all transform hover:scale-105 focus:outline-none"
              aria-label={`Cart with ${totalItemsCount} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow border-2 border-white animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="p-3 bg-rose-50 text-[#7A0000] rounded-2xl border border-rose-200 text-center font-black text-sm">
            🔥 Special Launch Offer: 40% OFF on 2 Bottles + FREE Shipping
          </div>

          <div className="space-y-1 text-sm font-semibold">
            <button
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl text-slate-800 hover:bg-slate-50"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('benefits-section')}
              className="w-full text-left py-2.5 px-3 rounded-xl text-slate-800 hover:bg-slate-50"
            >
              Health Benefits
            </button>
            <button
              onClick={() => scrollToSection('product-showcase')}
              className="w-full text-left py-2.5 px-3 rounded-xl text-[#7A0000] font-bold hover:bg-rose-50 flex items-center justify-between"
            >
              <span>Omega-3 Pricing & Offers</span>
              <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                40% OFF
              </span>
            </button>
            <button
              onClick={() => {
                setIsQuizOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl text-slate-800 hover:bg-slate-50 flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Personalized Dosage Calculator</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('about');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl text-slate-800 hover:bg-slate-50"
            >
              About Amega Max & Purity Science
            </button>
            <button
              onClick={() => {
                setActiveTab('faq');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl text-slate-800 hover:bg-slate-50"
            >
              Frequently Asked Questions (FAQ)
            </button>
            <button
              onClick={() => {
                setIsTrackOrderOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl text-brand-blue font-bold hover:bg-blue-50 flex items-center space-x-2"
            >
              <Truck className="w-4 h-4" />
              <span>Track Your Order</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
