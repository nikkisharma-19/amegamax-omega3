import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
  Plus,
  Minus,
  Check,
  Clock,
  Heart,
  ChevronRight,
  Info,
  Lock
} from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

export const ProductDetailModal = () => {
  const { selectedProductForDetail, closeProductDetail, showToast, openCheckout } = useUI();
  const { addToCart } = useCart();

  const product = selectedProductForDetail || PRODUCTS[0];
  if (!selectedProductForDetail) return null;

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(1); // Default to 2 bottles
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('nutrition');
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

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, selectedVariant, 1);
    showToast(`Added ${selectedVariant.size} to cart with ${selectedVariant.discount}% OFF!`, 'success');

    setTimeout(() => {
      setIsAdding(false);
      closeProductDetail();
      openCheckout();
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={closeProductDetail}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeProductDetail}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Image Frame */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative h-72 sm:h-84 bg-slate-50 rounded-3xl p-6 border border-slate-100 flex items-center justify-center overflow-hidden">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-all duration-300 drop-shadow-xl"
                />
                <span className="absolute top-4 left-4 text-xs font-black px-3 py-1.5 rounded-full bg-[#7A0000] text-white shadow-sm">
                  SAVE {selectedVariant.discount}%
                </span>
                {selectedVariant.shippingFee === 0 && (
                  <span className="absolute top-4 right-4 text-xs font-black px-3 py-1 rounded-full bg-emerald-600 text-white shadow-sm">
                    FREE SHIPPING
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar justify-center">
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
            </div>

            {/* Right Purchase Controls */}
            <div className="md:col-span-6 space-y-5">
              
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A0000] bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                  {product.badge}
                </span>
                <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold bg-amber-50 px-2.5 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  {product.subtitle}
                </p>
              </div>

              {/* Pack Selector Cards */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Select Bottle Package:
                </label>
                <div className="space-y-2">
                  {product.variants.map((v, idx) => {
                    const isSelected = selectedVariantIndex === idx;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVariantIndex(idx)}
                        className={`p-3 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-[#7A0000] bg-rose-50/60 ring-1 ring-[#7A0000]'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#7A0000] bg-[#7A0000]' : 'border-slate-300'}`}>
                            {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <div>
                            <p className="font-bold text-xs sm:text-sm text-slate-900">{v.size}</p>
                            <p className="text-[11px] text-slate-500">
                              {v.shippingFee === 0 ? 'FREE Delivery' : '₹49 Shipping'} • {v.discount}% OFF
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-black text-sm text-[#7A0000]">₹{v.finalTotal.toFixed(2)}</p>
                          <p className="text-[10px] text-slate-400 line-through">₹{v.originalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-[#8A0000] to-[#6A0000] hover:from-amber-400 hover:to-[#7A0000] text-white font-black text-sm shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAdding ? 'Processing...' : `Order Now (₹${selectedVariant.finalTotal.toFixed(2)})`}</span>
              </button>

              {/* Pincode Checker */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                  <Truck className="w-4 h-4 text-brand-blue" />
                  <span>Check Delivery Date & Pincode</span>
                </div>
                <form onSubmit={handlePincodeCheck} className="flex space-x-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit Pincode"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                  >
                    Check
                  </button>
                </form>

                {pincodeStatus === 'valid' && (
                  <p className="text-xs font-semibold text-emerald-600 flex items-center pt-0.5">
                    <Check className="w-3.5 h-3.5 mr-1" />
                    Delivery available to PIN {pincode} within 2-3 days
                  </p>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
