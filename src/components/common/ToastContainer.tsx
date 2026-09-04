import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useNotifications();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isEmergency = toast.type === 'emergency';
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-2xl border shadow-2xl flex items-start gap-3 backdrop-blur-md transition-all animate-in slide-in-from-right duration-300 ${
              isEmergency
                ? 'bg-emergency-950/90 border-emergency-500/50 text-white'
                : isSuccess
                ? 'bg-teal-950/90 border-teal-500/50 text-white'
                : isWarning
                ? 'bg-amber-950/90 border-amber-500/50 text-white'
                : 'bg-navy-900/90 border-white/20 text-white'
            }`}
          >
            {isEmergency ? (
              <AlertTriangle className="w-5 h-5 text-emergency-400 flex-shrink-0 mt-0.5 animate-bounce" />
            ) : isSuccess ? (
              <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
            ) : (
              <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            )}

            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold leading-tight mb-0.5">{toast.title}</h5>
              <p className="text-[11px] text-slate-300 leading-snug">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
