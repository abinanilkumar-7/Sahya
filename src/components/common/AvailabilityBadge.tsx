import React from 'react';
import { AvailabilityStatus } from '../../types';
import { CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';

interface AvailabilityBadgeProps {
  status: AvailabilityStatus;
  showText?: boolean;
}

export const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({ status, showText = true }) => {
  switch (status) {
    case 'AVAILABLE':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/15 text-teal-700 font-semibold text-[11px] border border-teal-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
          {showText && 'Open Now / Available'}
        </span>
      );
    case 'LIMITED':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-700 font-semibold text-[11px] border border-amber-500/30">
          <AlertCircle className="w-3 h-3 text-amber-500" />
          {showText && 'Limited Supply'}
        </span>
      );
    case 'FULL':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-700 font-semibold text-[11px] border border-rose-500/30">
          <XCircle className="w-3 h-3 text-rose-500" />
          {showText && 'At Full Capacity'}
        </span>
      );
    case 'CLOSED':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200 text-slate-600 font-semibold text-[11px] border border-slate-300">
          <Clock className="w-3 h-3 text-slate-500" />
          {showText && 'Currently Closed'}
        </span>
      );
  }
};
