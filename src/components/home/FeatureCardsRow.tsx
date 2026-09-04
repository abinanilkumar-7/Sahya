import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface FeatureCardsRowProps {
  onOpenMedicalRecords?: () => void;
}

export const FeatureCardsRow: React.FC<FeatureCardsRowProps> = ({ onOpenMedicalRecords }) => {
  const navigate = useNavigate();

  return (
    <section className="pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Medical Records (Mint) */}
          <div className="relative rounded-3xl bg-[#E8F6F5] p-7 border border-[#D3EFEA] shadow-xs flex flex-col justify-between overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-slate-900 font-sans tracking-tight">
                Medical<br />Records
              </h3>
              <p className="text-xs text-slate-600 mt-2 max-w-[210px] leading-relaxed">
                Securely store and access your medical history, reports and prescriptions.
              </p>

              <div className="mt-6">
                <button
                  onClick={onOpenMedicalRecords}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0F6B7A] hover:bg-[#0B5461] text-white text-xs font-semibold shadow-xs transition-all hover:scale-105"
                >
                  <span>Access records</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Graphic: Medical document sheet with green shield checkmark */}
            <div className="absolute right-3 bottom-3 sm:right-5 sm:bottom-4 pointer-events-none transition-transform group-hover:scale-105 duration-300">
              <svg width="120" height="110" viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Back document glow/shadow */}
                <rect x="25" y="15" width="70" height="85" rx="10" fill="#FFFFFF" fillOpacity="0.8" />
                {/* Main document */}
                <rect x="20" y="8" width="72" height="88" rx="10" fill="#FFFFFF" stroke="#BCE5DF" strokeWidth="2" />
                {/* Document lines */}
                <rect x="32" y="24" width="30" height="5" rx="2.5" fill="#88D1C7" />
                <rect x="32" y="36" width="48" height="3" rx="1.5" fill="#C5E8E3" />
                <rect x="32" y="44" width="40" height="3" rx="1.5" fill="#C5E8E3" />
                <rect x="32" y="52" width="44" height="3" rx="1.5" fill="#C5E8E3" />
                {/* Green verified shield badge */}
                <circle cx="75" cy="74" r="16" fill="#10B981" />
                <path d="M69 74.5L73.5 79L82 69" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Card 2: Chat with a Doctor (Lavender) */}
          <div className="relative rounded-3xl bg-[#F0EEF9] p-7 border border-[#E2DDF5] shadow-xs flex flex-col justify-between overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-slate-900 font-sans tracking-tight">
                Chat with<br />a Doctor
              </h3>
              <p className="text-xs text-slate-600 mt-2 max-w-[210px] leading-relaxed">
                Get professional guidance from verified doctors online.
              </p>

              <div className="mt-6">
                <button
                  onClick={() => navigate('/assistant')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#5B3EB3] hover:bg-[#4B309D] text-white text-xs font-semibold shadow-xs transition-all hover:scale-105"
                >
                  <span>Start chat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Graphic: Doctor avatar portrait */}
            <div className="absolute right-3 bottom-2 sm:right-4 sm:bottom-2 pointer-events-none transition-transform group-hover:scale-105 duration-300">
              <svg width="125" height="115" viewBox="0 0 125 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background aura circle */}
                <circle cx="65" cy="55" r="42" fill="#E2DCF7" />
                {/* Doctor torso in white coat */}
                <path d="M36 102C36 84 48 76 65 76C82 76 94 84 94 102H36Z" fill="#FFFFFF" />
                {/* Inner scrub / shirt */}
                <path d="M56 76L65 88L74 76H56Z" fill="#7C5CDA" />
                {/* Stethoscope */}
                <path d="M50 78C50 90 56 97 65 97C74 97 80 90 80 78" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="65" cy="100" r="3.5" fill="#374151" />
                {/* Neck */}
                <rect x="58" y="62" width="14" height="15" rx="4" fill="#F8C8A0" />
                {/* Hair back */}
                <circle cx="65" cy="46" r="23" fill="#2E2452" />
                {/* Face */}
                <ellipse cx="65" cy="49" rx="15" ry="17" fill="#FADAC1" />
                {/* Hair front / bangs */}
                <path d="M50 42C52 30 65 30 65 30C65 30 78 30 80 42C73 37 68 37 65 39C62 37 57 37 50 42Z" fill="#2E2452" />
                {/* Eyes and mouth */}
                <circle cx="59" cy="49" r="1.5" fill="#2E2452" />
                <circle cx="71" cy="49" r="1.5" fill="#2E2452" />
                <path d="M62 56C63.5 58 66.5 58 68 56" stroke="#2E2452" strokeWidth="1.5" strokeLinecap="round" />
                {/* Chat badge */}
                <rect x="82" y="24" width="26" height="18" rx="6" fill="#7C5CDA" />
                <circle cx="89" cy="33" r="1.5" fill="white" />
                <circle cx="95" cy="33" r="1.5" fill="white" />
                <circle cx="101" cy="33" r="1.5" fill="white" />
              </svg>
            </div>
          </div>

          {/* Card 3: Lodge a Complaint (Peach) */}
          <div className="relative rounded-3xl bg-[#FDF3E9] p-7 border border-[#F8E3CD] shadow-xs flex flex-col justify-between overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-slate-900 font-sans tracking-tight">
                Lodge a<br />Complaint
              </h3>
              <p className="text-xs text-slate-600 mt-2 max-w-[210px] leading-relaxed">
                Report issues and help us improve services in your area.
              </p>

              <div className="mt-6">
                <button
                  onClick={() => navigate('/complaints')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C35B2E] hover:bg-[#A94C23] text-white text-xs font-semibold shadow-xs transition-all hover:scale-105"
                >
                  <span>File complaint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Graphic: Clipboard with checkmarks and pencil */}
            <div className="absolute right-3 bottom-3 sm:right-5 sm:bottom-4 pointer-events-none transition-transform group-hover:scale-105 duration-300">
              <svg width="120" height="110" viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Clipboard body */}
                <rect x="24" y="14" width="62" height="82" rx="9" fill="#FFFFFF" stroke="#F1D1B4" strokeWidth="2" />
                {/* Metal clip */}
                <rect x="42" y="9" width="26" height="11" rx="4" fill="#9CA3AF" />
                <rect x="47" y="6" width="16" height="6" rx="2" fill="#6B7280" />
                {/* 4 Checklist lines with checkmarks */}
                <path d="M32 30L34.5 32.5L39 28" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="43" y="29" width="34" height="3" rx="1.5" fill="#E5E7EB" />

                <path d="M32 44L34.5 46.5L39 42" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="43" y="43" width="30" height="3" rx="1.5" fill="#E5E7EB" />

                <path d="M32 58L34.5 60.5L39 56" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="43" y="57" width="32" height="3" rx="1.5" fill="#E5E7EB" />

                <path d="M32 72L34.5 74.5L39 70" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="43" y="71" width="24" height="3" rx="1.5" fill="#E5E7EB" />

                {/* Stylized pencil */}
                <g transform="rotate(35 84 68)">
                  <rect x="80" y="44" width="8" height="38" rx="2" fill="#1E293B" />
                  <path d="M80 82L84 92L88 82H80Z" fill="#F8C8A0" />
                  <path d="M82.5 88L84 92L85.5 88H82.5Z" fill="#1E293B" />
                </g>

                {/* Speech bubble */}
                <circle cx="95" cy="80" r="11" fill="#FDE68A" fillOpacity="0.7" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
