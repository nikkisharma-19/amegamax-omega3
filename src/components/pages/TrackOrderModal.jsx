import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2 } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const TrackOrderModal = () => {
  const { isTrackOrderOpen, setIsTrackOrderOpen, lastOrderDetails } = useUI();
  const [searchId, setSearchId] = useState(lastOrderDetails?.orderId || '');
  const [searchedOrder, setSearchedOrder] = useState(lastOrderDetails || null);
  const [searched, setSearched] = useState(false);

  if (!isTrackOrderOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    try {
      const orders = JSON.parse(localStorage.getItem('amegamax_orders') || '[]');
      const found = orders.find(
        (o) =>
          o.orderId.toLowerCase() === searchId.trim().toLowerCase() ||
          o.customer.phone.includes(searchId.trim())
      );
      setSearchedOrder(found || (lastOrderDetails?.orderId.includes(searchId) ? lastOrderDetails : null));
    } catch {
      setSearchedOrder(lastOrderDetails);
    }
  };

  const stages = [
    { label: 'Order Confirmed', desc: 'Registered with Amega Max Logistics', done: true, time: 'Today, 10:15 AM' },
    { label: 'Packed & Quality Verified', desc: 'Ahmedabad Central Warehouse', done: true, time: 'Today, 01:30 PM' },
    { label: 'In Transit / Dispatched', desc: 'BlueDart Air Express #8492019', done: true, time: 'Today, 04:00 PM' },
    { label: 'Out for Delivery', desc: 'Estimated delivery within 2-3 days', done: false, time: 'Upcoming' }
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={() => setIsTrackOrderOpen(false)}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Truck className="w-5 h-5 text-brand-blue" />
            <h2 className="text-lg font-black text-slate-900">
              Track Your Amega Max Order
            </h2>
          </div>
          <button
            onClick={() => setIsTrackOrderOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              Enter Order ID or Mobile Number:
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="e.g. AMX-849201 or 9413304333"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#7A0000] hover:bg-[#600000] text-white font-bold text-xs shadow-sm transition-colors"
              >
                Track
              </button>
            </div>
          </form>

          {/* Timeline Output */}
          {searchedOrder ? (
            <div className="space-y-4 pt-2 animate-in fade-in duration-200">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Order ID: {searchedOrder.orderId}</span>
                  <span className="text-[#7A0000] font-black">In Transit</span>
                </div>
                <p className="text-slate-500">Destination: {searchedOrder.customer?.city || 'Ahmedabad'}, PIN {searchedOrder.customer?.pincode || '380005'}</p>
                <p className="text-slate-500 font-semibold">Carrier: BlueDart Air Express</p>
              </div>

              {/* Step Timeline */}
              <div className="space-y-4 pl-2">
                {stages.map((stage, idx) => (
                  <div key={idx} className="flex items-start space-x-3 relative">
                    {/* Vertical Line */}
                    {idx < stages.length - 1 && (
                      <div
                        className={`absolute left-3 top-6 bottom-0 w-0.5 -ml-px ${
                          stage.done ? 'bg-emerald-500' : 'bg-slate-200'
                        }`}
                      ></div>
                    )}

                    {/* Stage Dot */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 z-10 ${
                        stage.done
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {stage.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    {/* Stage Details */}
                    <div className="text-xs flex-1">
                      <p className={`font-bold ${stage.done ? 'text-slate-900' : 'text-slate-400'}`}>
                        {stage.label}
                      </p>
                      <p className="text-slate-500 text-[11px]">{stage.desc}</p>
                      <span className="text-[10px] text-slate-400 font-medium">{stage.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : searched ? (
            <div className="py-8 text-center text-slate-500 text-xs space-y-2">
              <p className="font-bold text-slate-700">No recent order found matching "{searchId}"</p>
              <p>Place an order or check the mobile number used during checkout.</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
