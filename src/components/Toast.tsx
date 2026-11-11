import React from 'react';
import { useBooking } from '../context/BookingContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useBooking();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-[#0f1912]/95 border-emerald-500/30 text-emerald-100 shadow-emerald-950/40'
              : toast.type === 'error'
              ? 'bg-[#1e0f0f]/95 border-rose-500/30 text-rose-100 shadow-rose-950/40'
              : 'bg-[#12151c]/95 border-[#d4af37]/30 text-amber-100 shadow-black/60'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-[#d4af37]" />}
          </div>
          <div className="flex-1 text-sm leading-relaxed">{toast.message}</div>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
