import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Gift,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Truck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { PRODUCTS } from '../../data/products';

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, openCheckout, showToast } = useUI();
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    originalSubtotal,
    mrpSavings,
    discountPercent,
    totalBottles,
    couponDiscount,
    shippingFee,
    isFreeShipping,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const product = PRODUCTS[0];

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      showToast(res.message, 'success');
      setCouponInput('');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleAddSecondBottle = () => {
    // If cart has 1 bottle, upgrade to 2 bottles
    const firstItem = items[0];
    if (firstItem) {
      updateQuantity(firstItem.variant.id, 2);
      showToast('Unlocked 40% OFF + FREE SHIPPING on 2 Bottles!', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#7A0000]" />
            <h2 className="text-lg font-black text-slate-900">
              Your Cart ({totalBottles} {totalBottles === 1 ? 'Bottle' : 'Bottles'})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Quantity Upgrade Milestone Banner */}
        <div className="p-4 bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 border-b border-rose-100 space-y-2">
          {totalBottles >= 2 ? (
            <div className="flex items-center space-x-2 text-xs font-black text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>🎉 40% Max Discount & FREE Express Shipping Unlocked!</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center space-x-1">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Add 1 more bottle to get <strong>40% OFF + FREE Delivery</strong></span>
                </span>
                <span className="text-[#7A0000] font-black">Save ₹568.20</span>
              </div>

              <div className="w-full h-2 bg-rose-200/60 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-[#7A0000] w-1/2 rounded-full"></div>
              </div>

              <button
                onClick={handleAddSecondBottle}
                className="w-full py-1.5 rounded-xl bg-[#7A0000] hover:bg-[#600000] text-white text-xs font-black shadow-xs transition-colors"
              >
                + Add 2nd Bottle & Unlock 40% OFF + FREE Delivery
              </button>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-20 h-20 bg-rose-50 text-[#7A0000] rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-800">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Fuel your daily heart, brain and joint vitality with Amega Max Omega-3.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  const el = document.getElementById('product-showcase');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full bg-[#7A0000] text-white font-bold text-xs hover:bg-[#600000] shadow-md transition-all"
              >
                Order Amega Max Omega-3 →
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.variant.id} className="py-4 flex items-center space-x-3 group">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-slate-50 border border-slate-100 p-1 flex-shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-[#7A0000] font-black">
                    {item.variant.size} ({discountPercent}% OFF Applied)
                  </p>

                  <div className="flex items-baseline space-x-2 pt-0.5">
                    <span className="font-black text-[#7A0000] text-sm sm:text-base">
                      ₹{(item.variant.price * item.quantity).toFixed(2)}
                    </span>
                    <span className="text-[11px] text-slate-400 line-through">
                      ₹{(item.variant.originalPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center space-x-2 pt-1">
                    <div className="flex items-center border border-slate-200 rounded-xl bg-white shadow-xs p-0.5">
                      <button
                        onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                        className="p-1 rounded-lg text-slate-600 hover:bg-slate-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 font-bold text-xs text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                        className="p-1 rounded-lg text-slate-600 hover:bg-slate-100"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.variant.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="font-black text-xs sm:text-sm text-slate-900">
                    ₹{(item.variant.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}

          {/* Complimentary Quality & Packaging Assurance */}
          {items.length > 0 && (
            <div className="pt-4 space-y-2">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>100% Certified Molecular Distillation & Tamper-Proof Packaging</span>
                </div>
                <span className="text-emerald-700 font-extrabold uppercase">GUARANTEED</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout & Calculation Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-3.5">
            
            {/* Coupon Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5 text-emerald-800 font-bold">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon "{appliedCoupon.code}" Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-500 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon code (e.g. AMEGAMAX20)"
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 uppercase font-semibold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span>Base MRP ({totalBottles}x ₹649.00)</span>
                <span className="font-semibold text-slate-800">₹{originalSubtotal.toFixed(2)}</span>
              </div>

              {mrpSavings > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Quantity Discount ({discountPercent}%)</span>
                  <span>- ₹{mrpSavings.toFixed(2)}</span>
                </div>
              )}

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span>- ₹{couponDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping & Delivery Fee</span>
                <span>
                  {isFreeShipping ? (
                    <strong className="text-emerald-700 font-black">FREE (₹0.00)</strong>
                  ) : (
                    `₹${shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm sm:text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                <span>Final Payable Total</span>
                <span className="text-[#7A0000] text-xl font-black">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={openCheckout}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-[#8A0000] to-[#6A0000] hover:from-amber-400 hover:to-[#7A0000] text-white font-black text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout (₹{grandTotal.toFixed(2)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Safe & Encrypted 256-bit Checkout • Instant Dispatch in 24h</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
