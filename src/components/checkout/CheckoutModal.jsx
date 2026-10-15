import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

export const CheckoutModal = () => {
  const { isCheckoutOpen, closeCheckout, openOrderSuccess, user } = useUI();
  const {
    items,
    subtotal,
    originalSubtotal,
    mrpSavings,
    couponDiscount,
    shippingFee,
    isFreeShipping,
    grandTotal,
    appliedCoupon,
    clearCart
  } = useCart();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.contact || '',
    email: '',
    address: '',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380005',
    paymentMethod: 'upi' // 'upi' | 'card' | 'cod'
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderId = 'AMX-' + Math.floor(100000 + Math.random() * 900000);

      const orderRecord = {
        orderId: generatedOrderId,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        customer: formData,
        items: [...items],
        grandTotal,
        subtotal,
        discount: mrpSavings + couponDiscount,
        paymentMethod: formData.paymentMethod.toUpperCase()
      };

      // Save order to localStorage for tracking simulation
      try {
        const storedOrders = JSON.parse(localStorage.getItem('amegamax_orders') || '[]');
        storedOrders.unshift(orderRecord);
        localStorage.setItem('amegamax_orders', JSON.stringify(storedOrders));
      } catch {}

      clearCart();
      closeCheckout();
      openOrderSuccess(orderRecord);

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={closeCheckout}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Secure Checkout • Amega Max
            </h2>
          </div>
          <button
            onClick={closeCheckout}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handlePlaceOrder} className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          
          {/* Section 1: Delivery Address */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#7A0000] text-white flex items-center justify-center text-xs">
                1
              </span>
              <span>Shipping & Delivery Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. sam joshi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Mobile Number (For Delivery Updates) *</label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 94133 04333"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-600 mb-1">Street Address / House No. *</label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. 11, Satyam Park, Nicol Gam"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">City *</label>
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">PIN Code *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Options */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#7A0000] text-white flex items-center justify-center text-xs">
                2
              </span>
              <span>Select Payment Method</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'upi', label: 'Instant UPI / QR', desc: 'GPay, PhonePe, Paytm', icon: QrCode },
                { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, MasterCard, RuPay', icon: CreditCard },
                { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when delivered', icon: Truck }
              ].map((opt) => {
                const isSelected = formData.paymentMethod === opt.id;
                const Icon = opt.icon;
                return (
                  <label
                    key={opt.id}
                    className={`p-4 rounded-2xl border-2 cursor-pointer flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'border-[#7A0000] bg-rose-50/70 ring-1 ring-[#7A0000] shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-[#7A0000]' : 'text-slate-400'}`} />
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={opt.id}
                        checked={isSelected}
                        onChange={handleChange}
                        className="text-[#7A0000] focus:ring-rose-500"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-slate-900">{opt.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Section 3: Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Items Total MRP</span>
              <span className="line-through">₹{originalSubtotal.toFixed(2)}</span>
            </div>
            {mrpSavings > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Quantity Discount Savings</span>
                <span>- ₹{mrpSavings.toFixed(2)}</span>
              </div>
            )}
            {couponDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Coupon Discount ({appliedCoupon.code})</span>
                <span>- ₹{couponDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Delivery Charges</span>
              <span>
                {isFreeShipping ? (
                  <strong className="text-emerald-700 font-black">FREE (₹0.00)</strong>
                ) : (
                  `₹${shippingFee.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm sm:text-base font-black text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Payable Amount</span>
              <span className="text-[#7A0000] font-black text-xl">
                ₹{grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Place Order CTA - Standardized Brand Primary Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-[#7A0000] hover:bg-[#600000] disabled:opacity-60 text-white font-black text-base shadow-xl transition-all flex items-center justify-center space-x-2 border border-rose-900/40"
          >
            <span>{isProcessing ? 'Confirming & Placing Order...' : `Place Order (₹${grandTotal.toFixed(2)})`}</span>
            {!isProcessing && <ArrowRight className="w-5 h-5" />}
          </button>

          {/* Quick Direct WhatsApp Order Option */}
          <a
            href={`https://wa.me/919413304333?text=${encodeURIComponent(
              `Hi Amega Max, I want to order Amega Max Omega-3 Super Strength (Total: ₹${grandTotal.toFixed(
                2
              )}).\nName: ${formData.name || 'Customer'}\nPhone: ${formData.phone || ''}\nAddress: ${
                formData.address || ''
              }, ${formData.city || ''} - ${formData.pincode || ''}\nPayment: ${formData.paymentMethod.toUpperCase()}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm border border-emerald-300 flex items-center justify-center space-x-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Or Confirm Order Directly via WhatsApp →</span>
          </a>

        </form>
      </div>
    </div>
  );
};
