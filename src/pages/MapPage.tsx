import React, { useState, useEffect } from 'react';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { Resource } from '../types';
import { resourceService } from '../services/resourceService';
import { useLocation } from '../context/LocationContext';
import { Search, MapPin, Filter, CheckCircle2, Phone, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MapPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [radius, setRadius] = useState<number>(25);

  const { latitude, longitude, city } = useLocation();

  useEffect(() => {
    resourceService
      .getNearbyResources({
        latitude,
        longitude,
        radiusKm: radius,
        category: category === 'All' ? undefined : category,
        verifiedOnly: true,
      })
      .then((data) => {
        let filtered = data;
        if (search.trim()) {
          const q = search.toLowerCase().trim();
          filtered = filtered.filter(
            (r) => r.name.toLowerCase().includes(q) || r.address.fullAddress.toLowerCase().includes(q)
          );
        }
        setResources(filtered);
      });
  }, [category, search, radius, latitude, longitude]);

  const categories = ['All', 'Hospitals', 'Pharmacies', 'Oxygen', 'Blood Banks', 'Food Support', 'Shelters'];

  return (
    <div className="pt-20 min-h-screen bg-brandbg flex flex-col lg:flex-row">
      
      {/* Sidebar Controls & List */}
      <div className="w-full lg:w-96 bg-white border-r border-slate-200 p-5 flex flex-col h-[calc(100vh-5rem)] overflow-y-auto z-10 shadow-lg">
        <div className="mb-4">
          <h1 className="font-serif text-2xl font-bold text-navy-950">Map Search</h1>
          <p className="text-xs text-slate-500">Discover verified resources near {city}</p>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search on map..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Category Filters */}
        <div className="mb-4">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Category Filter</label>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  category === cat ? 'bg-navy-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Distance Radius Slider */}
        <div className="mb-6 bg-slate-50 p-3 rounded-2xl border border-slate-100">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
            <span>Radius Slider</span>
            <span className="text-teal-600">{radius} km</span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full accent-teal-500"
          />
        </div>

        {/* List of Matched Resources */}
        <div className="flex-1 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Matched Locations ({resources.length})
          </span>
          {resources.map((res) => (
            <div key={res._id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-400 transition-colors text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-navy-900 line-clamp-1">{res.name}</span>
                {res.verified && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />}
              </div>
              <p className="text-[11px] text-slate-500 mb-2">{res.address.street}</p>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-teal-700 font-bold">{res.distanceKm} km away</span>
                <Link to={`/resources/${res._id}`} className="text-cyan-700 hover:underline font-semibold">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Map View */}
      <div className="flex-1 h-[calc(100vh-5rem)] p-2">
        <InteractiveMap resources={resources} centerLat={latitude} centerLng={longitude} height="100%" />
      </div>

    </div>
  );
};
