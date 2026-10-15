import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const phoneNumber = '919413304333';
  const prefilledMessage = encodeURIComponent(
    'Hi Amega Max, I have a question regarding Amega Max Omega-3 Super Strength (Offer: 2 Bottles @ ₹778.80). Please assist me!'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${prefilledMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto select-none">
      
      {/* Floating Interactive Speech Bubble Tooltip */}
      {showTooltip && (
        <div className="mb-3 max-w-xs bg-white text-slate-800 p-3 rounded-2xl shadow-2xl border border-emerald-100 flex items-start space-x-2 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0 animate-ping"></div>
          <div className="flex-1 pr-1">
            <p className="text-xs font-black text-slate-900 flex items-center justify-between">
              <span>Amega Max Support</span>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full font-bold ml-1">
                Online
              </span>
            </p>
            <p className="text-xs text-slate-600 mt-0.5 leading-snug">
              Have questions or want to order via WhatsApp? Chat with our team!
            </p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Animated WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center space-x-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba5a] hover:to-[#0f7a6e] text-white shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 animate-whatsapp border-2 border-white/40"
        aria-label="Chat directly on WhatsApp with Amega Max (+91 94133 04333)"
      >
        {/* WhatsApp Vector Icon */}
        <div className="relative">
          <svg
            className="w-7 h-7 fill-current transform group-hover:rotate-12 transition-transform duration-300 drop-shadow-sm"
            viewBox="0 0 24 24"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.055-.992-.05-.23-.068-.523-.19-1.077-.428-1.558-.673-2.55-2.261-2.628-2.365-.077-.104-.633-.842-.633-1.608 0-.766.401-1.144.544-1.298.144-.155.313-.194.417-.194.105 0 .209.001.301.006.096.005.226-.037.353.27.13.314.444 1.083.483 1.162.039.078.065.17.013.273-.052.105-.078.17-.156.262-.078.092-.164.205-.235.275-.079.078-.161.164-.069.322.092.158.409.676.877 1.093.602.536 1.109.702 1.267.78.157.078.25.065.342-.039.092-.104.392-.457.496-.614.105-.157.209-.13.353-.078.144.052.915.431 1.071.51.157.078.261.118.299.183.039.066.039.38-.105.786zm-3.4-12.416c-5.523 0-10 4.477-10 10 0 1.766.46 3.424 1.263 4.872l-1.341 4.9 5.029-1.319c1.401.765 3.003 1.196 4.708 1.196 5.522 0 10-4.478 10-10 0-5.523-4.478-10-10-10zm0 18.228c-1.542 0-3.035-.42-4.329-1.192l-.311-.185-2.981.782.796-2.906-.202-.322c-.84-1.336-1.284-2.888-1.284-4.405 0-4.536 3.692-8.228 8.229-8.228 4.538 0 8.229 3.692 8.229 8.228 0 4.537-3.691 8.228-8.228 8.228z" />
          </svg>
          {/* Active Status Dot */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          </span>
        </div>

        {/* Text Label on desktop */}
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-black tracking-wide leading-none">
            Chat on WhatsApp
          </span>
          <span className="text-[10px] text-emerald-100 font-medium leading-tight mt-0.5">
            Instant Support & Orders
          </span>
        </div>
      </a>
    </div>
  );
};
