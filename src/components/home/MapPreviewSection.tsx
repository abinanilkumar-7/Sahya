import React, { useState, useEffect } from 'react';
import { InteractiveMap } from '../map/InteractiveMap';
import { Resource } from '../../types';
import { resourceService } from '../../services/resourceService';
import { useLocation } from '../../context/LocationContext';
import { MapPin, ArrowRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MapPreviewSection: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const { latitude, longitude } = useLocation();

  useEffect(() => {
    resourceService.getResources({ verifiedOnly: true }).then(setResources);
  }, []);

  return (
    <section className="py-24 bg-brandbg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6" data-aos="fade-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold border border-cyan-200">
              <Layers className="w-4 h-4" /> Live Geospatial Tracking
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-navy-950 leading-tight">
              Interactive Community Resource Map
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Visualize real-time bed availability, oxygen refilling hubs, ambulance depots, and shelter coordinates across your city with verified GPS precision.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs font-medium text-slate-700">
                <span className="w-3 h-3 rounded-full bg-teal-500 shadow-sm" /> Verified Hospitals & ICU Facilities
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-slate-700">
                <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-sm" /> 24/7 Pharmacies & Critical Drugs
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-slate-700">
                <span className="w-3 h-3 rounded-full bg-sky-600 shadow-sm" /> Emergency Oxygen & Ventilator Hubs
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/map"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-600 text-navy-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition-all hover:scale-105"
              >
                <span>Open Full-Screen Interactive Map</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Map Preview */}
          <div className="lg:col-span-7" data-aos="fade-left">
            <InteractiveMap resources={resources} centerLat={latitude} centerLng={longitude} height="480px" />
          </div>

        </div>
      </div>
    </section>
  );
};
