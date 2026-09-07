import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Star,
  ShoppingBag,
  Zap,
  Heart,
  Award,
  Truck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

export const NutritionQuizModal = () => {
  const { isQuizOpen, setIsQuizOpen, showToast, openCheckout } = useUI();
  const { addToCart } = useCart();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: '',
    diet: '',
    activity: ''
  });

  if (!isQuizOpen) return null;

  const handleSelect = (field, val) => {
    setAnswers((prev) => ({ ...prev, [field]: val }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((s) => s + 1);
    } else {
      setStep(4);
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    }
  };

  const product = PRODUCTS[0];
  const recommendedVariant = product.variants[1]; // 2-bottle 40% OFF bundle

  const handleAddRecommendedToCart = () => {
    addToCart(product, recommendedVariant, 1);
    showToast(`Added 2-Bottle Recommended Pack to Cart (40% OFF + FREE Delivery)!`, 'success');
    setIsQuizOpen(false);
    setStep(1);
    openCheckout();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={() => setIsQuizOpen(false)}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Amega Max" className="w-8 h-8 object-contain rounded-full" />
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#7A0000]">
                Amega Max Dosage Calculator
              </h2>
              <p className="text-[11px] text-slate-500 font-semibold">Personalized EPA & DHA Daily Requirement</p>
            </div>
          </div>

          <button
            onClick={() => setIsQuizOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Ticker */}
        {step < 4 && (
          <div className="px-6 pt-4 pb-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1.5">
              <span>Step {step} of 3</span>
              <span className="text-[#7A0000] font-black">{Math.round((step / 3) * 100)}% Completed</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-[#7A0000] transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Content Stages */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Step 1: Health Goal */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  What is your primary health & wellness goal?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Select the key area where you want maximum cellular nourishment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'heart', label: 'Heart & Cardiovascular Health', desc: 'Maintain clear arteries & healthy lipid levels', icon: Heart, color: 'text-rose-500' },
                  { id: 'brain', label: 'Brain Focus & Screen Time Relief', desc: 'Mental sharpness, memory & eye retina support', icon: Zap, color: 'text-amber-500' },
                  { id: 'joints', label: 'Joint Mobility & Cartilage Flexibility', desc: 'Reduce morning knee & shoulder stiffness', icon: Award, color: 'text-emerald-600' },
                  { id: 'vitality', label: 'Overall Daily Longevity & Immunity', desc: 'Cellular lipid balance & daily energy', icon: ShieldCheck, color: 'text-cyan-600' }
                ].map((opt) => {
                  const isSelected = answers.goal === opt.id;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect('goal', opt.id)}
                      className={`p-4 rounded-2xl border-2 text-left flex items-start space-x-3 transition-all ${
                        isSelected
                          ? 'border-[#7A0000] bg-rose-50/70 shadow-sm ring-1 ring-[#7A0000]'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${opt.color}`} />
                      <div>
                        <p className="font-extrabold text-sm text-slate-900">{opt.label}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleNext}
                  disabled={!answers.goal}
                  className="px-8 py-3.5 rounded-full bg-[#7A0000] hover:bg-[#600000] disabled:opacity-40 text-white font-black text-sm shadow-md transition-all flex items-center space-x-2"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Dietary Fish Consumption */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  How often do you consume fatty marine fish in your diet?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Helps determine baseline dietary Omega-3 deficit.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'never', label: '100% Vegetarian / Rarely or Never', desc: 'High Omega-3 deficiency risk. 2 softgels/day strongly advised.' },
                  { id: 'monthly', label: '1–2 times a month', desc: 'Moderate deficiency. Daily supplementation recommended.' },
                  { id: 'weekly', label: '1–2 times a week', desc: 'Maintenance dose of 1 softgel/day to sustain cellular levels.' }
                ].map((opt) => {
                  const isSelected = answers.diet === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect('diet', opt.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-[#7A0000] bg-rose-50/70 shadow-sm ring-1 ring-[#7A0000]'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <p className="font-extrabold text-sm text-slate-900">{opt.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-full border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={!answers.diet}
                  className="px-8 py-3.5 rounded-full bg-[#7A0000] hover:bg-[#600000] disabled:opacity-40 text-white font-black text-sm shadow-md transition-all flex items-center space-x-2"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Lifestyle & Screen Time */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  What best describes your daily routine?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Adjusts for oxidative stress and eye/joint strain.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'desk', label: 'High Screen Time / Desk Work', desc: '6+ hours of digital screens daily' },
                  { id: 'active', label: 'Active Fitness / Heavy Exercise', desc: 'Athletics, running, or gym workouts' },
                  { id: 'senior', label: 'Senior / Joint Care Focus', desc: 'Age 45+ focused on active joint mobility' },
                  { id: 'general', label: 'General Balanced Lifestyle', desc: 'Everyday wellness & family health' }
                ].map((opt) => {
                  const isSelected = answers.activity === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect('activity', opt.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-[#7A0000] bg-rose-50/70 shadow-sm ring-1 ring-[#7A0000]'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <p className="font-extrabold text-sm text-slate-900">{opt.label}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</p>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-full border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={!answers.activity}
                  className="px-8 py-3.5 rounded-full bg-[#7A0000] hover:bg-[#600000] disabled:opacity-40 text-white font-black text-sm shadow-md transition-all flex items-center space-x-2"
                >
                  <span>Calculate My Dosage</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Results & 40% OFF Recommendation */}
          {step === 4 && (
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              <div className="text-center space-y-1">
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200">
                  Dosage Calibration Complete
                </span>
                <h3 className="text-2xl font-black text-slate-900 pt-1">
                  Your Recommended Regimen: 2 Softgels Daily
                </h3>
                <p className="text-xs text-slate-500">
                  Delivers 2000mg Marine Fish Oil (360mg EPA + 240mg DHA) to optimally target your goals
                </p>
              </div>

              {/* Offer Recommendation Box */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 border-2 border-[#7A0000] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-slate-200 shadow-sm"
                    />
                    <div>
                      <span className="text-[10px] font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full uppercase">
                        ★ BEST VALUE RECOMMENDATION ★
                      </span>
                      <h4 className="text-lg font-black text-slate-900 mt-0.5">
                        2 Bottles Pack (120 Softgels)
                      </h4>
                      <p className="text-xs text-slate-600">60-Day Complete Cellular Support</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-black text-[#7A0000]">
                      ₹778.80
                    </p>
                    <p className="text-xs text-slate-400 line-through">₹1,298.00</p>
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      SAVE 40% + FREE SHIPPING
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-rose-200/60 text-xs text-slate-700 space-y-1">
                  <p>✓ 100% Molecularly Distilled & Mercury Tested</p>
                  <p>✓ Enteric Coated for Zero Fishy Burps or Odor</p>
                  <p>✓ Free Express Shipping direct to your door</p>
                </div>

                <button
                  onClick={handleAddRecommendedToCart}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-[#8A0000] to-[#6A0000] hover:from-amber-400 hover:to-[#7A0000] text-white font-black text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Claim 2 Bottles @ 40% OFF (₹778.80 Total)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
