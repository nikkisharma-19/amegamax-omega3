import React from 'react';
import { ShieldCheck, Award, Sparkles, CheckCircle2, Droplet, HeartHandshake } from 'lucide-react';

export const BrandUsps = () => {
  const usps = [
    {
      title: '1000mg Pure Marine Oil',
      subtitle: 'Derived from wild deep-sea fish',
      icon: Droplet,
      iconColor: 'text-cyan-500',
      bgColor: 'bg-cyan-50'
    },
    {
      title: 'Molecularly Distilled',
      subtitle: 'Zero heavy metals & mercury tested',
      icon: ShieldCheck,
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Optimal EPA & DHA Ratio',
      subtitle: '180mg EPA + 120mg DHA per softgel',
      icon: Sparkles,
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50'
    },
    {
      title: 'Zero Fishy Aftertaste',
      subtitle: 'Enteric coated for smooth absorption',
      icon: HeartHandshake,
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            The Amega Max Quality Standard
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Engineered with pharmaceutical-grade purity to provide consistent daily wellness.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {usps.map((usp, idx) => {
            const Icon = usp.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 hover:bg-rose-50/50 border border-slate-100 hover:border-rose-100 transition-all duration-300 flex flex-col items-center text-center space-y-3 group"
              >
                <div className={`w-16 h-16 rounded-2xl ${usp.bgColor} p-3 shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${usp.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-800">
                    {usp.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {usp.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
