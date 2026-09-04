import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Plus,
  Send,
  CheckCircle2,
  Heart
} from 'lucide-react';

interface FooterProps {
  onOpenEPassModal?: () => void;
  onOpenMedicalRecordsModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenEPassModal,
  onOpenMedicalRecordsModal,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#071F2D] text-slate-300 pt-16 pb-8 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Socials (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-700 to-cyan-500 p-0.5 flex items-center justify-center">
                <div className="relative w-full h-full rounded-[14px] bg-teal-800 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white fill-teal-900" />
                  <Plus className="w-3.5 h-3.5 text-white stroke-[3.5] absolute" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xl font-bold tracking-tight text-white leading-none">
                  Sahya
                </span>
                <span className="text-xs text-slate-400 font-normal leading-tight mt-0.5">
                  Your Helping Hand
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Helping communities find verified resources during a health crisis.
            </p>

            {/* Social Media Pill Icons */}
            <div className="flex items-center gap-2 pt-2">
              {/* Facebook */}
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
              >
                f
              </a>
              {/* Twitter */}
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
              >
                𝕏
              </a>
              {/* Instagram */}
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
              >
                ig
              </a>
              {/* LinkedIn */}
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
              >
                in
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/resources" className="hover:text-teal-300 transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/assistant" className="hover:text-teal-300 transition-colors">Chatbot</Link>
              </li>
              <li>
                <button onClick={onOpenEPassModal} className="hover:text-teal-300 transition-colors text-left">
                  E-pass
                </button>
              </li>
              <li>
                <button onClick={onOpenMedicalRecordsModal} className="hover:text-teal-300 transition-colors text-left">
                  Medical Records
                </button>
              </li>
              <li>
                <Link to="/complaints" className="hover:text-teal-300 transition-colors">Complaints</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Support (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Help & Support</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/assistant" className="hover:text-teal-300 transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/weather" className="hover:text-teal-300 transition-colors">Help Center</Link>
              </li>
              <li>
                <span className="hover:text-teal-300 transition-colors cursor-pointer">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-teal-300 transition-colors cursor-pointer">Terms & Conditions</span>
              </li>
              <li>
                <Link to="/emergency" className="hover:text-teal-300 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Stay Updated Newsletter (3 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Stay Updated</h4>
            <p className="text-xs text-slate-400 leading-snug">
              Subscribe for alerts and important updates in your area.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-2xl bg-teal-950/60 border border-teal-500/40 text-teal-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>Subscribed! Thank you for staying connected.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center mt-2 max-w-sm">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-4 pr-12 py-2.5 rounded-full bg-white text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 w-8 h-8 rounded-full bg-[#0E6C7D] hover:bg-[#0B5A69] text-white flex items-center justify-center transition-transform hover:scale-105"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Made with care */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2025 Pandemic Resource Finder. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-slate-400">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Made with care for a safer tomorrow.</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
