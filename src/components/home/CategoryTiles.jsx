import React from 'react';
import { Heart, Zap, ShieldCheck, Eye, Sparkles, Activity, Check } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const CategoryTiles = () => {
  const { openCheckout } = useUI();

  const benefits = [
    {
      id: 'heart',
      title: 'Cardiovascular Health',
      tagline: '180mg EPA for Healthy Arteries & Normal Cholesterol',
      desc: 'Clinical EPA helps maintain optimal blood triglyceride levels, clear arterial flow, and healthy heart rhythm.',
      icon: Heart,
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50/80',
      borderColor: 'border-rose-100',
      badge: 'Clinically Studied'
    },
    {
      id: 'brain',
      title: 'Cognitive & Brain Sharpness',
      tagline: '120mg DHA for Mental Focus & Memory',
      desc: 'DHA constitutes 40% of brain polyunsaturated fatty acids, supporting neurotransmission, mental clarity, and focus.',
      icon: Zap,
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50/80',
      borderColor: 'border-amber-100',
      badge: '40% Brain Lipids'
    },
    {
      id: 'joints',
      title: 'Joint Flexibility & Comfort',
      tagline: 'Soothes Inflammation & Lubricates Cartilage',
      desc: 'Omega-3 fatty acids actively reduce morning joint stiffness, enhancing knee, shoulder, and spinal mobility.',
      icon: Activity,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50/80',
      borderColor: 'border-emerald-100',
      badge: 'Anti-Inflammatory'
    },
    {
      id: 'eyes',
      title: 'Eye Vision & Retina Support',
      tagline: 'Protects Retinal Cells against Digital Strain',
      desc: 'Nourishes photoreceptor cells in the retina to relieve dry eye syndrome, screen fatigue, and maintain clear vision.',
      icon: Eye,
      iconColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50/80',
      borderColor: 'border-cyan-100',
      badge: 'Retina Protection'
    }
  ];

  const scrollToOffer = () => {
    const el = document.getElementById('product-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="benefits-section" className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-50 text-[#7A0000] border border-amber-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Essential Daily Micronutrition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Why Your Body Needs <span className="text-[#7A0000]">Amega Max Omega-3</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Omega-3 fatty acids are essential lipids that our bodies cannot synthesize naturally. Every softgel of Amega Max delivers 1000mg of molecularly distilled marine oil to nourish vital organs at the cellular level.
          </p>
        </div>

        {/* 4 Health Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                className={`rounded-3xl ${b.bgColor} border ${b.borderColor} p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center">
                      <Icon className={`w-6 h-6 ${b.iconColor}`} />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white text-slate-700 px-2.5 py-1 rounded-full shadow-2xs border border-slate-200/60">
                      {b.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900">{b.title}</h3>
                    <p className="text-xs font-bold text-[#7A0000] mt-1">{b.tagline}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {b.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center text-xs font-semibold text-slate-700 space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>100% Bioavailable Absorption</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner callout */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-[#600000] to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-black">
              Pure Marine Source • Enteric Coated • Zero Fishy Burps
            </h4>
            <p className="text-xs text-slate-300">
              Formulated specifically for Indian diets with 100% molecular purity guarantees.
            </p>
          </div>

          <button
            onClick={scrollToOffer}
            className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2 whitespace-nowrap"
          >
            <span>Claim 40% Off Deal (2 Bottles)</span>
          </button>
        </div>

      </div>
    </section>
  );
};
