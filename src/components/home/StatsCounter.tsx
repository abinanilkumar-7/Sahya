import React, { useEffect, useRef } from 'react';
import { Building2, Bed, Syringe, Headphones } from 'lucide-react';
import { PlatformStats } from '../../types';

interface StatsCounterProps {
  stats?: PlatformStats;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({ stats }) => {
  return (
    <div className="relative -mt-10 sm:-mt-12 z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)] grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        
        {/* Metric 1: Hospitals listed */}
        <div className="flex items-center gap-4 pt-3 lg:pt-0 lg:px-4 first:pt-0">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block leading-tight font-sans">
              312
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Hospitals listed
            </span>
          </div>
        </div>

        {/* Metric 2: Beds tracked live */}
        <div className="flex items-center gap-4 pt-3 lg:pt-0 lg:px-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
            <Bed className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block leading-tight font-sans">
              1,204
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Beds tracked live
            </span>
          </div>
        </div>

        {/* Metric 3: Vaccination centers */}
        <div className="flex items-center gap-4 pt-3 lg:pt-0 lg:px-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Syringe className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block leading-tight font-sans">
              86
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Vaccination centers
            </span>
          </div>
        </div>

        {/* Metric 4: Chatbot support */}
        <div className="flex items-center gap-4 pt-3 lg:pt-0 lg:px-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block leading-tight font-sans">
              24/7
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Chatbot support
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
