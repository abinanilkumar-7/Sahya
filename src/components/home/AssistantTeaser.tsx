import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, ShieldCheck, ArrowRight, MessageSquare, Zap } from 'lucide-react';

export const AssistantTeaser: React.FC = () => {
  return (
    <section className="py-20 bg-navy-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-navy-900 via-navy-900 to-navy-950 border border-teal-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5" data-aos="fade-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-cyan-300 text-xs font-bold">
                <Bot className="w-4 h-4" /> Controlled Algorithmic Intelligence
              </div>
              
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-white">
                Meet <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-cyan-300">Uyra</span>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                An intelligent assistance bot strictly wired to Sahya's verified database. Ask complex location queries, compare ICU availability, or find open 24/7 pharmacies instantly without fake medical hallucinations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-xs flex items-center gap-2.5 text-slate-300">
                  <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>"Find a pharmacy near me open now"</span>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-xs flex items-center gap-2.5 text-slate-300">
                  <Zap className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>"Which hospitals have ICU beds?"</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  to="/assistant"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-400 text-navy-950 font-bold text-xs shadow-lg shadow-teal-500/20 hover:scale-105 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start Conversation with Assistant</span>
                </Link>
              </div>
            </div>

            {/* Right Graphic Mockup */}
            <div className="lg:col-span-5" data-aos="fade-left">
              <div className="bg-navy-950/80 border border-white/20 p-5 rounded-2xl shadow-2xl space-y-3 text-xs">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                  <span className="font-bold text-white">Uyra Tool Execution</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl text-slate-300">
                  <span className="text-[10px] text-cyan-400 font-mono block mb-1">▶ Invoking tool: findNearbyResources()</span>
                  "Found 4 verified pharmacies operating near Central City with active stock."
                </div>
                <div className="bg-teal-500/10 p-3 rounded-xl border border-teal-500/30 text-teal-200">
                  ✓ Verified: Apex LifeCare Pharmacy • 2.3 km away • 24/7 Open
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
