import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, UserCheck, Shield, Heart } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const NutritionQuizBanner = () => {
  const { setIsQuizOpen } = useUI();

  return (
    <section className="py-14 sm:py-18 bg-gradient-to-r from-slate-950 via-[#600000] to-slate-900 text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -right-16 -top-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-amber-300 border border-white/15">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Personalized Omega-3 Dosage Calculator</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Curious about how much EPA & DHA your body needs daily?
            </h2>

            <p className="text-sm sm:text-base text-slate-200 max-w-2xl font-normal leading-relaxed">
              Take our 60-second lifestyle assessment. Discover your recommended daily softgel intake for heart health, desk screen time, or active sports recovery.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-300">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Takes only 1 minute</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Personalized Dosage Advice</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Unlocks Special 40% Bundle Deal</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <button
              onClick={() => setIsQuizOpen(true)}
              className="px-8 py-5 rounded-3xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm sm:text-base shadow-2xl hover:shadow-amber-400/20 transition-all transform hover:scale-105 flex items-center space-x-3"
            >
              <span>Start 60-Sec Assessment</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
