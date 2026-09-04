import React, { useState, useEffect } from 'react';
import { Resource } from '../../types';
import { resourceService } from '../../services/resourceService';
import { useLocation } from '../../context/LocationContext';
import { ResourceCard } from '../resources/ResourceCard';
import { MapPin, LocateFixed, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NearbySection: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const { latitude, longitude, city, detectLocation, isDetecting } = useLocation();

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    resourceService
      .getNearbyResources({
        latitude,
        longitude,
        radiusKm: 30,
        category: selectedCategory === 'All' ? undefined : selectedCategory,
        verifiedOnly: true,
      })
      .then((data) => {
        if (isMounted) {
          setResources(data.slice(0, 6));
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [latitude, longitude, selectedCategory]);

  const categories = ['All', 'Hospitals', 'Pharmacies', 'Oxygen', 'Blood Banks', 'Food Support'];

  return (
    <section className="py-20 bg-white relative border-t border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6" data-aos="fade-up">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 mb-2">
              <MapPin className="w-4 h-4" /> Live Location Discovery
            </div>
            <h2 className="font-serif text-4xl font-normal text-navy-950">
              Verified resources near <span className="text-teal-600 underline underline-offset-8">{city}</span>
            </h2>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-navy-950 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => detectLocation()}
              className="p-2 rounded-full bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors"
              title="Refresh Location GPS"
            >
              <LocateFixed className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Resource Cards Grid */}
        {isLoading ? (
          <div className="py-16 text-center text-slate-400 flex items-center justify-center gap-2 text-sm">
            <Loader2 className="w-5 h-5 animate-spin text-teal-600" /> Searching verified resources in {city}...
          </div>
        ) : resources.length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-slate-50 rounded-3xl border border-slate-200">
            <p className="text-sm">No verified resources found in this category near {city}.</p>
            <Link to="/resources" className="text-xs font-bold text-teal-600 hover:underline mt-2 inline-block">
              Browse all resources across regions →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res, idx) => (
              <div key={res._id} data-aos="fade-up" data-aos-delay={(idx % 3) * 100}>
                <ResourceCard resource={res} />
              </div>
            ))}
          </div>
        )}

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-navy-950 hover:bg-teal-600 text-white font-bold text-xs shadow-lg transition-all hover:scale-105"
          >
            <span>Explore Complete Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
