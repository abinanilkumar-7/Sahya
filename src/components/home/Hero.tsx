import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../../context/LocationContext';
import {
  Search,
  MapPin,
  LocateFixed,
  Bot,
  FileCheck2,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  onOpenEmergency: () => void;
  onOpenEPassModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEmergency, onOpenEPassModal }) => {
  const [searchInput, setSearchInput] = useState('');
  const { city, detectLocation, isDetecting } = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/resources?search=${encodeURIComponent(searchInput.trim())}`);
    } else {
      navigate('/resources');
    }
  };

  return (
    <section className="relative pt-36 sm:pt-40 pb-16 lg:pb-24 bg-gradient-to-b from-[#E7F3FA] via-[#F4F9FC] to-white overflow-hidden">
      {/* Soft Ambient Decorative Lighting */}
      <div className="absolute top-16 left-1/4 w-[450px] h-[450px] bg-teal-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-28 right-10 w-[550px] h-[550px] bg-cyan-200/25 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Search & Quick Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Live Alert Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEECEB] border border-rose-200/80 text-rose-600 text-xs font-semibold shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
              </span>
              <span>Live pandemic alert for your area</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold text-slate-900 leading-[1.12] tracking-tight font-sans">
              Find verified help,<br />
              fast,{' '}
              <span className="font-sans italic font-normal text-teal-700">
                wherever
              </span><br />
              you are
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
              Hospitals, medicines, oxygen, beds and essentials — all in one place during a health crisis.
            </p>

            {/* Search Bar Capsule */}
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-slate-200/90 p-1.5 pl-5 flex items-center gap-2 max-w-xl transition-all focus-within:ring-2 focus-within:ring-teal-500/30 focus-within:border-teal-500"
            >
              <MapPin className="w-5 h-5 text-teal-700 flex-shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={city ? `Enter your city or pincode (e.g. ${city})` : "Enter your city or pincode"}
                className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 text-sm font-normal py-2 focus:outline-none"
              />
              
              <button
                type="button"
                onClick={() => detectLocation()}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-teal-700 transition-colors"
                title="Detect GPS Location"
              >
                <LocateFixed className={`w-4 h-4 ${isDetecting ? 'animate-spin text-teal-600' : ''}`} />
              </button>

              <button
                type="submit"
                className="px-7 py-2.5 rounded-full bg-[#0E6C7D] hover:bg-[#0B5A69] text-white font-medium text-sm transition-all shadow-sm flex items-center justify-center flex-shrink-0"
              >
                Search
              </button>
            </form>

            {/* Quick Action Pill Buttons directly below Search */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => navigate('/assistant')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs hover:shadow-sm transition-all hover:border-teal-400"
              >
                <Bot className="w-4 h-4 text-teal-600" />
                <span>Talk to Uyra</span>
              </button>

              <button
                onClick={onOpenEPassModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs hover:shadow-sm transition-all hover:border-teal-400"
              >
                <FileCheck2 className="w-4 h-4 text-teal-600" />
                <span>Apply for e-pass</span>
              </button>
            </div>

          </div>

          {/* Right Column: 3D Medical Shield on Pedestal with Mask & Botanicals */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              
              {/* Soft Radial Ambient Glow */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-cyan-400/20 via-teal-300/20 to-blue-200/30 blur-3xl pointer-events-none" />

              {/* Seamless blended 3D artwork container */}
              <div className="relative z-10 w-full h-full flex items-center justify-center group [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)]">
                <img
                  src="/hero-shield.png"
                  alt="3D Medical Shield on Pedestal with Mask"
                  className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(4,38,61,0.12)] transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
