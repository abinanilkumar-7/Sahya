import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Resource, ResourceCategory } from '../types';
import { resourceService } from '../services/resourceService';
import { useLocation } from '../context/LocationContext';
import { ResourceCard } from '../components/resources/ResourceCard';
import { Search, Filter, CheckCircle2, MapPin, LocateFixed, Loader2 } from 'lucide-react';

interface ResourcesPageProps {
  forcedCategory?: ResourceCategory;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ forcedCategory }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get('search') || '';
  const queryCategory = searchParams.get('category') || forcedCategory || 'All';

  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(querySearch);
  const [category, setCategory] = useState<string>(queryCategory);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const { latitude, longitude, city, detectLocation, isDetecting } = useLocation();

  const categories = [
    'All',
    'Hospitals',
    'Pharmacies',
    'Oxygen',
    'Blood Banks',
    'Food Support',
    'Shelters',
    'Ambulances',
    'Testing Centers',
  ];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    resourceService
      .getNearbyResources({
        latitude,
        longitude,
        radiusKm: 50,
        category: category === 'All' ? undefined : category,
        verifiedOnly,
      })
      .then((data) => {
        if (!isMounted) return;
        let filtered = data;
        if (search.trim()) {
          const q = search.toLowerCase().trim();
          filtered = filtered.filter(
            (r) =>
              r.name.toLowerCase().includes(q) ||
              r.description.toLowerCase().includes(q) ||
              r.address.fullAddress.toLowerCase().includes(q)
          );
        }
        setResources(filtered);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [category, search, verifiedOnly, latitude, longitude]);

  return (
    <div className="pt-28 pb-24 bg-brandbg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Resource Catalog & Search
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-navy-950 mt-2 mb-2">
            {forcedCategory ? `${forcedCategory} Directory` : 'Verified Community Resources'}
          </h1>
          <p className="text-sm text-slate-600">
            Real-time availability monitoring for healthcare, emergency oxygen, blood reserves, shelters, and food support.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-subtle mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search hospital name, drug, blood group..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* GPS Refresh */}
            <button
              onClick={() => detectLocation()}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0"
            >
              <LocateFixed className={`w-4 h-4 text-teal-600 ${isDetecting ? 'animate-spin' : ''}`} />
              <span>Location: {city}</span>
            </button>

            {/* Verified Only Toggle */}
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                verifiedOnly
                  ? 'bg-teal-500 text-navy-950 border-teal-500 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified Only</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          {!forcedCategory && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    category === cat
                      ? 'bg-navy-950 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-400 flex items-center justify-center gap-2 text-sm">
            <Loader2 className="w-5 h-5 animate-spin text-teal-600" /> Querying verified directory...
          </div>
        ) : resources.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8">
            <h3 className="font-serif text-2xl text-navy-950 mb-2">No matching resources found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Try adjusting your search terms or expanding your filter selection.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setCategory('All');
                setVerifiedOnly(false);
              }}
              className="px-5 py-2 rounded-xl bg-teal-500 text-navy-950 font-bold text-xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res) => (
              <ResourceCard key={res._id} resource={res} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
