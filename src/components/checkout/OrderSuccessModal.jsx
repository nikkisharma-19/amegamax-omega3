import React from 'react';
import { CheckCircle2, Truck, X, Phone, Mail } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const OrderSuccessModal = () => {
  const { lastOrderDetails, isOrderSuccessOpen, closeOrderSuccess, setIsTrackOrderOpen, setActiveTab } = useUI();

  if (!isOrderSuccessOpen || !lastOrderDetails) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={closeOrderSuccess}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Hero */}
        <div className="p-8 bg-gradient-to-b from-emerald-50 via-emerald-50/50 to-white text-center space-y-3 relative">
          <button
            onClick={closeOrderSuccess}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
            Order Confirmed
          </span>

          <h2 className="text-2xl font-black text-slate-900">
            Thank you for choosing Amega Max!
          </h2>

          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Your order has been placed successfully and dispatched for priority delivery.
          </p>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-5 border-t border-slate-100 bg-slate-50/50 text-xs">
          
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex justify-between font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
              <span>Order Number:</span>
              <span className="text-[#7A0000] font-black">{lastOrderDetails.orderId}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Delivery To:</span>
              <span className="font-semibold text-slate-800">{lastOrderDetails.customer.name} ({lastOrderDetails.customer.pincode})</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Payment Mode:</span>
              <span className="font-semibold text-slate-800">{lastOrderDetails.paymentMethod}</span>
            </div>

            <div className="flex justify-between text-slate-900 font-extrabold pt-2 border-t border-slate-100 text-sm">
              <span>Total Amount Paid:</span>
              <span className="text-[#7A0000] font-black">₹{lastOrderDetails.grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs space-y-1">
            <p className="font-bold">Need help with your order?</p>
            <p className="text-slate-600">Email us at <strong>orders@amegamax.in</strong> or call <strong>+91 94133 04333</strong></p>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => {
                closeOrderSuccess();
                setIsTrackOrderOpen(true);
              }}
              className="w-full py-3.5 rounded-2xl bg-[#7A0000] hover:bg-[#600000] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center space-x-2 transition-all"
            >
              <Truck className="w-4 h-4" />
              <span>Track Live Delivery Status</span>
            </button>

            <button
              onClick={() => {
                closeOrderSuccess();
                setActiveTab('home');
              }}
              className="w-full py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
            >
              Return to Home
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
