import React from 'react';
import { CATEGORIES } from '../../data/products';
import { Filter, Check } from 'lucide-react';

export const FilterSidebar = ({ selectedCategory, onSelectCategory, selectedBenefit, onSelectBenefit }) => {
  const benefits = [
    { id: 'all', label: 'All Health Benefits' },
    { id: 'vitality-radiance', label: 'Radiance & Glowing Skin' },
    { id: 'strength-energy', label: 'Strength, Energy & Stamina' },
    { id: 'longevity-vitality', label: 'Senior Vitality & Active Aging' },
    { id: 'heart-brain-joint', label: 'Heart & Brain Health' },
    { id: 'bone-strength', label: 'Bone Strength & Calcium' },
    { id: 'joint-flexibility', label: 'Joint Mobility & Collagen' },
    { id: 'energy-hydration', label: 'Electrolytes & Instant Hydration' }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
      
      {/* Title */}
      <div className="flex items-center space-x-2 pb-4 border-b border-slate-100">
        <Filter className="w-4 h-4 text-brand-pink" />
        <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider">
          Filter Catalog
        </h3>
      </div>

      {/* Category Filter */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Categories
        </h4>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-brand-pink text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{cat.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Health Needs Filter */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Health Goals
        </h4>
        <div className="space-y-1">
          {benefits.map((b) => {
            const isSelected = selectedBenefit === b.id;
            return (
              <button
                key={b.id}
                onClick={() => onSelectBenefit(b.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-brand-navy text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="truncate">{b.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Filters */}
      {(selectedCategory !== 'all' || selectedBenefit !== 'all') && (
        <button
          onClick={() => {
            onSelectCategory('all');
            onSelectBenefit('all');
          }}
          className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
        >
          Reset All Filters
        </button>
      )}

    </div>
  );
};
