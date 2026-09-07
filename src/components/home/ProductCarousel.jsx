import React, { useState } from 'react';
import {
  Star,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  Sparkles,
  Zap,
  Heart,
  Lock,
  ArrowRight,
  Droplet,
  Award
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { PRODUCTS } from '../../data/products';

export const ProductCarousel = () => {
  const product = PRODUCTS[0];
  const { addToCart } = useCart();
  const { openCheckout, showToast } = useUI();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(1); // Default to 2-bottle 40% offer (index 1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex];

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincode.trim())) {
      setPincodeStatus('valid');
    } else {
      setPincodeStatus('invalid');
    }
  };

  const handleOrder = () => {
    setIsAdding(true);
    addToCart(product, selectedVariant, 1);
    showToast(`Added ${selectedVariant.size} to cart with ${selectedVariant.discount}% discount!`, 'success');

    setTimeout(() => {
      setIsAdding(false);
      openCheckout();
    }, 250);
  };

  return (
    <section id="product-showcase" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-rose-50 text-[#7A0000] border border-rose-200 text-xs font-extrabold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Special Direct Launch Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Amega Max Omega-3 Super Strength
          </h2>
          <p className="text-sm text-slate-600">
            Choose your bottle package below. Orders of 2 or more bottles unlock <strong>40% OFF + 100% FREE Express Delivery</strong>.
          </p>
        </div>

        {/* Clean 2-Column Product Showcase Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200/80 p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Product Images & Quality Badges */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Main Photo */}
              <div className="relative h-80 sm:h-96 bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-center justify-center overflow-hidden">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt="Amega Max Omega-3 Bottle"
                  className="max-h-full max-w-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                />

                {/* Offer Tag */}
                <div className="absolute top-4 left-4 bg-[#7A0000] text-white px-3 py-1 rounded-full text-xs font-black shadow-md">
                  SAVE {selectedVariant.discount}%
                </div>

                {selectedVariant.shippingFee === 0 && (
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-black shadow-md flex items-center space-x-1">
                    <Truck className="w-3.5 h-3.5" />
                    <span>FREE SHIPPING</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Switcher */}
              <div className="flex space-x-3 justify-center">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`w-16 h-16 rounded-xl p-1 bg-white border-2 flex-shrink-0 transition-all ${
                      selectedImageIndex === i
                        ? 'border-[#7A0000] scale-105 shadow-sm'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>

              {/* 3 Clean Quality Seals */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs font-bold text-slate-700">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                  <Droplet className="w-4 h-4 text-cyan-600 mx-auto" />
                  <p className="text-[11px] text-slate-800">1000mg Marine Oil</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto" />
                  <p className="text-[11px] text-slate-800">Molecularly Distilled</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                  <Sparkles className="w-4 h-4 text-amber-500 mx-auto" />
                  <p className="text-[11px] text-slate-800">Zero Fishy Burps</p>
                </div>
              </div>

            </div>

            {/* Right: Package Selector & Checkout */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* Product Rating & Header */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-extrabold text-slate-900 text-sm">{product.rating}</span>
                  <span className="text-xs text-slate-400 font-medium">({product.reviewCount} verified ratings)</span>
                </div>

                <h3 className="text-2xl font-black text-slate-900">
                  Select Your Package:
                </h3>
              </div>

              {/* 3 Clean Package Cards */}
              <div className="space-y-3">
                {product.variants.map((variant, idx) => {
                  const isSelected = selectedVariantIndex === idx;
                  return (
                    <div
                      key={variant.id}
                      onClick={() => setSelectedVariantIndex(idx)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative flex items-center justify-between ${
                        isSelected
                          ? 'border-[#7A0000] bg-rose-50/40 shadow-sm ring-1 ring-[#7A0000]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {/* Best value tag */}
                      {variant.isPopular && (
                        <span className="absolute -top-3 right-4 bg-gradient-to-r from-amber-500 to-[#7A0000] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                          ★ BEST VALUE • MOST POPULAR ★
                        </span>
                      )}

                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'border-[#7A0000] bg-[#7A0000]' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>

                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-black text-slate-900 text-sm sm:text-base">
                              {variant.size}
                            </p>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-rose-100 text-[#7A0000]">
                              {variant.discount}% OFF
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 mt-0.5">
                            {variant.shippingFee === 0 ? (
                              <strong className="text-emerald-700 font-bold">FREE Express Delivery</strong>
                            ) : (
                              <span>₹49 Standard Delivery</span>
                            )}
                            <span className="text-slate-400"> • {variant.unitPrice}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-black text-[#7A0000]">
                          ₹{variant.finalTotal.toFixed(2)}
                        </p>
                        <p className="text-xs text-slate-400 line-through">
                          ₹{variant.originalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Base MRP ({selectedVariant.bottles}x ₹649):</span>
                  <span className="line-through">₹{selectedVariant.originalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount ({selectedVariant.discount}% OFF):</span>
                  <span>- ₹{(selectedVariant.originalPrice - selectedVariant.price).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Charges:</span>
                  <span>
                    {selectedVariant.shippingFee === 0 ? (
                      <strong className="text-emerald-700 font-bold">FREE (₹0.00)</strong>
                    ) : (
                      '₹49.00'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Payable Amount:</span>
                  <span className="text-[#7A0000] text-xl font-black">
                    ₹{selectedVariant.finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleOrder}
                disabled={isAdding}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-[#8A0000] to-[#6A0000] hover:from-amber-400 hover:to-[#7A0000] text-white font-black text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>
                  {isAdding ? 'Processing...' : `Order Now - ₹${selectedVariant.finalTotal.toFixed(2)}`}
                </span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-500 text-center">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-bit Encrypted Checkout • Instant UPI QR, Card & COD Supported</span>
              </div>

              {/* Pincode Estimator */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center space-x-1 text-xs font-bold text-slate-700">
                  <Truck className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Check Delivery Date to Your Pincode:</span>
                </div>
                <form onSubmit={handlePincodeCheck} className="flex space-x-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit Pincode (e.g. 380005)"
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white font-medium"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                  >
                    Check
                  </button>
                </form>

                {pincodeStatus === 'valid' && (
                  <p className="text-xs font-semibold text-emerald-700 flex items-center pt-0.5">
                    <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    Delivery available to PIN {pincode} within 2-3 business days!
                  </p>
                )}
                {pincodeStatus === 'invalid' && (
                  <p className="text-xs font-semibold text-red-500 pt-0.5">
                    Please enter a valid 6-digit Indian pincode.
                  </p>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
