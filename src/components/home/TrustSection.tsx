import React from 'react';
import { ShieldCheck, UserCheck, Clock, MapPin, RefreshCw } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      title: 'Algorithmic & Field Verification',
      desc: 'All hospital bed counts, pharmacy stocks, and oxygen supplies require admin verification badges.',
      icon: ShieldCheck,
    },
    {
      title: 'Community Reporting',
      desc: 'Users can flag incorrect phone numbers or stale bed data directly via the Complaints portal.',
      icon: UserCheck,
    },
    {
      title: 'Real-Time Socket Stream',
      desc: 'Bed availability updates push live over WebSockets so you never drive to a full hospital.',
      icon: RefreshCw,
    },
    {
      title: 'Geospatial Proximity Search',
      desc: 'MongoDB 2dsphere indexing sorts search results by true travel distance in kilometers.',
      icon: MapPin,
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Trust & Integrity Standard
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-navy-950 mt-3 mb-3">
            Built around verified information
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            During medical emergencies, accurate data saves lives. Sahya guarantees rigorous multi-tier verification before marking any resource active.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="bg-brandbg rounded-3xl p-6 border border-slate-200/80 shadow-subtle hover:-translate-y-1 transition-all"
              >
                <div className="p-3.5 rounded-2xl bg-teal-500/10 text-teal-600 w-fit mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-navy-950 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
