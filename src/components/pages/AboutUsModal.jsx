import React from 'react';
import { Award, ShieldCheck, Globe, CheckCircle2, Sparkles, MapPin, Phone, Mail } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const AboutUsModal = () => {
  const { setActiveTab } = useUI();

  const scrollToOffer = () => {
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById('product-showcase');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-rose-50 text-[#7A0000] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-rose-200">
            <Award className="w-4 h-4" />
            <span>Premium Nutritional Wellness</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Science-Backed Omega-3 For Everyday Vitality
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            At Amega Max, we are committed to delivering premium, molecularly distilled Omega-3 fish oil formulated with high bioavailability and certified purity to nourish your heart, brain, and joints.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-[#7A0000] flex items-center justify-center mx-auto sm:mx-0">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Highest Purity Standards</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every batch undergoes strict testing for potency, molecular purity, and freedom from heavy metals and mercury.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-brand-blue flex items-center justify-center mx-auto sm:mx-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">100% Indian RDA Compliant</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Formulated specifically to meet the daily micronutrient requirements of Indian lifestyles.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto sm:mx-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Superior Absorption</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enteric-coated softgels with zero fishy aftertaste or reflux for rapid, smooth cellular absorption.
            </p>
          </div>
        </div>

        {/* The Amega Max Promise */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border border-rose-100/80 space-y-4">
          <h2 className="text-2xl font-black text-slate-900">The Amega Max Promise</h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Amega Max was founded with the mission of providing honest, pure, and high-potency nutritional supplements directly to families across India. By cutting out unnecessary middleman markups, we provide premium deep-sea Omega-3 at affordable direct-to-consumer prices.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-slate-800">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Mercury & Heavy Metal Tested</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Manufactured in GMP Certified Facilities</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Doctor Recommended Formulation</span>
            </div>
          </div>
        </div>

        {/* Company Contact Information */}
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 text-xs">
          <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
            Registered Office & Support
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-600">
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-slate-900">
                <MapPin className="w-4 h-4 text-[#7A0000]" />
                <span>Headquarters:</span>
              </div>
              <p className="leading-relaxed">
                11, sabarmti highway, opp. satyam park, Karnavati nagar, Nicol Gam, sabarmati, Ahmedabad, Gujarat 380005
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-slate-900">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Phone / WhatsApp:</span>
              </div>
              <a href="tel:919413304333" className="block text-slate-900 font-semibold hover:underline">
                +91 94133 04333
              </a>
              <p className="text-slate-400">Mon to Sat | 10 AM – 6 PM</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-slate-900">
                <Mail className="w-4 h-4 text-cyan-600" />
                <span>Email Support:</span>
              </div>
              <a href="mailto:orders@amegamax.in" className="block text-slate-900 font-semibold hover:underline">
                orders@amegamax.in
              </a>
              <p className="text-slate-400">Domain: amegamax.in</p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pt-2">
          <button
            onClick={scrollToOffer}
            className="px-8 py-4 rounded-full bg-[#7A0000] hover:bg-[#600000] text-white font-black text-sm shadow-xl transition-all"
          >
            Order Amega Max Omega-3 (Save Up to 40%) →
          </button>
        </div>

      </div>
    </div>
  );
};
