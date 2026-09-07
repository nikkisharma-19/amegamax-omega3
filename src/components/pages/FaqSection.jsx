import React, { useState } from 'react';
import { FAQS } from '../../data/faqs';
import { ChevronDown, Search, HelpCircle, Phone, Mail, MapPin } from 'lucide-react';

export const FaqSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedIndex, setExpandedIndex] = useState(0);

  const categories = ['all', 'Product & Formulation', 'Pricing & Discounts', 'Dosage & Usage', 'Purity & Safety', 'Orders & Delivery'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-rose-50 text-[#7A0000] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-rose-200">
            <HelpCircle className="w-4 h-4" />
            <span>Amega Max Help Center</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Everything you need to know about Amega Max Omega-3 Super Strength, daily dosage, purity, and our 40% discount bundle.
          </p>

          {/* Search Box */}
          <div className="pt-2 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search topics (e.g. Dosage, Burps, Mercury, Delivery)..."
              className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 text-xs sm:text-sm bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex space-x-2 overflow-x-auto justify-center pb-2 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#7A0000] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Questions' : cat}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs">
              No questions match "{searchTerm}". Try another search term or reach out directly to our customer support desk.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between space-x-4 hover:bg-slate-50/60 transition-colors"
                  >
                    <span className="font-extrabold text-sm sm:text-base text-slate-800">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transform transition-transform duration-200 flex-shrink-0 ${
                        isExpanded ? 'rotate-180 text-[#7A0000]' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Support Contact Box */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-100 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Still have questions? We are here to help!
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Reach our customer care team directly Mon to Sat, 10 AM to 6 PM IST.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <a
                href="tel:919413304333"
                className="px-4 py-2.5 rounded-full bg-white text-slate-800 border border-slate-200 text-xs font-bold shadow-xs hover:bg-slate-100 flex items-center space-x-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>+91 94133 04333</span>
              </a>
              <a
                href="mailto:orders@amegamax.in"
                className="px-4 py-2.5 rounded-full bg-[#7A0000] text-white text-xs font-bold shadow-xs hover:bg-[#600000] flex items-center space-x-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>orders@amegamax.in</span>
              </a>
            </div>
          </div>

          <div className="pt-2 border-t border-rose-200/50 flex items-start space-x-2 text-xs text-slate-500">
            <MapPin className="w-4 h-4 text-[#7A0000] flex-shrink-0 mt-0.5" />
            <span>11, sabarmti highway, opp. satyam park, Karnavati nagar, Nicol Gam, sabarmati, Ahmedabad, Gujarat 380005</span>
          </div>
        </div>

      </div>
    </div>
  );
};
