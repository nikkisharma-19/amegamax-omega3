import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const Toast = () => {
  const { toasts, removeToast } = useUI();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />;
        let borderClass = 'border-emerald-200 bg-white';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />;
          borderClass = 'border-red-200 bg-white';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-brand-blue flex-shrink-0" />;
          borderClass = 'border-blue-200 bg-white';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border ${borderClass} flex items-center justify-between space-x-3 animate-in slide-in-from-bottom-5 duration-200`}
          >
            <div className="flex items-center space-x-3 min-w-0">
              {icon}
              <p className="text-xs sm:text-sm font-semibold text-slate-800 break-words">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
