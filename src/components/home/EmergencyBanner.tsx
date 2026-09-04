import React from 'react';
import { Phone, Check, ArrowRight } from 'lucide-react';

interface EmergencyBannerProps {
  onOpenEmergency: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ onOpenEmergency }) => {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#053443] via-[#07475B] to-[#053241] p-6 sm:p-8 text-white overflow-hidden shadow-lg shadow-teal-950/15">
          
          {/* Subtle Decorative Background Halftone / Circles */}
          <div className="absolute right-0 top-0 w-96 h-full bg-[radial-gradient(#ffffff0d_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Left Column: Phone Icon + Text + Verified Pills */}
            <div className="flex items-center gap-4 sm:gap-5">
              
              {/* Circular White Phone Icon */}
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#07475B] shadow-md flex-shrink-0">
                <Phone className="w-6 h-6 fill-current" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
                  Need immediate assistance?
                </h3>
                <p className="text-xs sm:text-sm text-teal-100/90 mt-0.5 font-normal">
                  Our helpline is available 24/7 to support you.
                </p>

                {/* 3 Verified Badges */}
                <div className="flex flex-wrap items-center gap-2 mt-2.5">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-teal-100 text-[11px] font-medium backdrop-blur-xs">
                    <Check className="w-3 h-3 text-teal-300 stroke-[3]" />
                    <span>Trusted</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-teal-100 text-[11px] font-medium backdrop-blur-xs">
                    <Check className="w-3 h-3 text-teal-300 stroke-[3]" />
                    <span>Verified</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-teal-100 text-[11px] font-medium backdrop-blur-xs">
                    <Check className="w-3 h-3 text-teal-300 stroke-[3]" />
                    <span>Secure</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: White Pill Call Button */}
            <div className="w-full sm:w-auto flex items-center justify-end">
              <button
                onClick={onOpenEmergency}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-white hover:bg-slate-50 text-[#07475B] font-bold text-xs sm:text-sm shadow-md inline-flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Call Helpline Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
