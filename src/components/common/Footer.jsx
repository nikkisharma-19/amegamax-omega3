import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUp,
  ShieldCheck,
  Award,
  Globe
} from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const Footer = () => {
  const { setActiveTab, setIsTrackOrderOpen } = useUI();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800 text-center sm:text-left">
          <div className="flex items-center space-x-3 justify-center sm:justify-start">
            <Award className="w-8 h-8 text-amber-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-white text-sm">1000mg Pure Marine Oil</p>
              <p className="text-xs text-slate-400">180mg EPA + 120mg DHA</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 justify-center sm:justify-start">
            <ShieldCheck className="w-8 h-8 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-white text-sm">Molecularly Distilled</p>
              <p className="text-xs text-slate-400">100% Mercury & Heavy Metal Free</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 justify-center sm:justify-start">
            <div className="w-8 h-8 rounded-full bg-rose-950 flex items-center justify-center text-amber-400 font-black text-sm flex-shrink-0 border border-amber-400/40">
              ₹
            </div>
            <div>
              <p className="font-bold text-white text-sm">FREE Express Delivery</p>
              <p className="text-xs text-slate-400">On all orders of 2 or more bottles</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 justify-center sm:justify-start">
            <Clock className="w-8 h-8 text-cyan-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-white text-sm">Fast 24h Dispatch</p>
              <p className="text-xs text-slate-400">Delivery across 20,000+ pincodes</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12 border-b border-slate-800">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="Amega Max Logo"
                className="w-10 h-10 object-contain rounded-full bg-white p-0.5"
              />
              <span className="text-2xl font-black text-white tracking-tight">
                Amega Max
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Amega Max is a specialized nutritional wellness brand dedicated to delivering premium, high-potency Omega-3 formulations. Manufactured in GMP-certified facilities compliant with Indian ICMR guidelines.
            </p>

            <div className="pt-1 flex items-center space-x-2 text-xs text-amber-400 font-medium">
              <Globe className="w-3.5 h-3.5" />
              <span>Official Website: <strong>amegamax.in</strong></span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setActiveTab('home'); scrollToTop(); }} className="hover:text-amber-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('benefits-section')} className="hover:text-amber-400 transition-colors">
                  Health Benefits
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('product-showcase')} className="hover:text-amber-400 transition-colors">
                  Omega-3 Offers (40% OFF)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('about'); scrollToTop(); }} className="hover:text-amber-400 transition-colors">
                  About Amega Max & Science
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('faq'); scrollToTop(); }} className="hover:text-amber-400 transition-colors">
                  FAQ & Dosage Advice
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Customer Care</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setIsTrackOrderOpen(true)} className="hover:text-amber-400 transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <span className="text-slate-400">Shipping & Delivery Policy</span>
              </li>
              <li>
                <span className="text-slate-400">Returns & Refund Guarantee</span>
              </li>
              <li>
                <span className="text-slate-400">Terms & Conditions</span>
              </li>
              <li>
                <span className="text-slate-400">Privacy Notice</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Contact Us</h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#7A0000] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  11, sabarmti highway, opp. satyam park, Karnavati nagar, Nicol Gam, sabarmati, Ahmedabad, Gujarat 380005
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="tel:919413304333" className="text-white hover:underline font-semibold">
                  +91 94133 04333
                </a>
              </div>
              <p className="text-[11px] text-slate-500 pl-6">Mon to Sat | 10:00 AM – 6:00 PM IST</p>
              
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href="mailto:orders@amegamax.in" className="text-white hover:underline">
                  orders@amegamax.in
                </a>
              </div>
            </div>

            {/* Social Links (Instagram & Facebook ONLY) */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://www.instagram.com/amega_max?igsi=eXo2ZmhiYWEwMWs0&utm_source=ig_contact_invite"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-rose-700 flex items-center justify-center text-white transition-colors p-2"
                aria-label="Amega Max Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/19JJ7qGJzc/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-blue-700 flex items-center justify-center text-white transition-colors p-2"
                aria-label="Amega Max Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.57 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left space-y-1">
            <p>© {new Date().getFullYear()} Amega Max (amegamax.in). All rights reserved.</p>
            <p className="text-[11px] text-slate-600">
              Manufactured in a GMP certified facility. Nutritional dietary supplement for daily health support.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-full border border-slate-800 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
