import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export const VolunteerBanner: React.FC = () => {
  return (
    <section className="py-20 bg-brandbg border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-subtle grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4" data-aos="fade-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <Users className="w-4 h-4" /> Community First Responders
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-navy-950">
              Become a verified Sahya Community Volunteer
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              Join over 480+ local volunteers who help update resource availability, deliver critical medicines to vulnerable citizens, run community food kitchens, and assist in emergency response coordination.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
                <HeartHandshake className="w-4 h-4 text-emerald-600" /> Food Distribution Leads
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-teal-600" /> Resource Verification Fielders
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
                <Users className="w-4 h-4 text-cyan-600" /> Medical Logistics Drivers
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 text-left lg:text-right" data-aos="fade-left">
            <Link
              to="/volunteers"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all hover:scale-105"
            >
              <span>Register as Volunteer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
