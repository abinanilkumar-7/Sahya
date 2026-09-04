import React from 'react';
import { Resource } from '../../types';
import { AvailabilityBadge } from '../common/AvailabilityBadge';
import {
  CheckCircle2,
  MapPin,
  Phone,
  Navigation,
  ArrowRight,
  Activity,
  Bed,
  Wind,
  Droplet,
  Utensils
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ResourceCardProps {
  resource: Resource;
  onSelect?: (resource: Resource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onSelect }) => {
  const getCategoryIcon = () => {
    switch (resource.category) {
      case 'Hospitals':
      case 'Healthcare':
        return <Activity className="w-4 h-4 text-teal-600" />;
      case 'Pharmacies':
      case 'Medicines':
        return <Activity className="w-4 h-4 text-cyan-600" />;
      case 'Oxygen':
        return <Wind className="w-4 h-4 text-sky-600" />;
      case 'Blood Banks':
        return <Droplet className="w-4 h-4 text-rose-600" />;
      case 'Food Support':
        return <Utensils className="w-4 h-4 text-amber-600" />;
      default:
        return <Activity className="w-4 h-4 text-teal-600" />;
    }
  };

  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    const lat = resource.location.coordinates[1];
    const lng = resource.location.coordinates[0];
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <div
      onClick={() => onSelect && onSelect(resource)}
      className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle hover:shadow-glass-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
    >
      {/* Subtle Top Gradient Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200">
            {getCategoryIcon()}
            <span>{resource.category}</span>
          </div>

          <div className="flex items-center gap-2">
            {resource.verified && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Verified
              </span>
            )}
            <AvailabilityBadge status={resource.availability.status} showText={false} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-navy-900 group-hover:text-teal-600 transition-colors line-clamp-1 mb-1">
          {resource.name}
        </h3>

        {/* Address & Distance */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <MapPin className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
          <span className="truncate">{resource.address.street}, {resource.address.city}</span>
          {resource.distanceKm !== undefined && (
            <span className="ml-auto font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md text-[10px]">
              {resource.distanceKm} km away
            </span>
          )}
        </div>

        {/* Availability Breakdown Grid */}
        <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-100 mb-4 grid grid-cols-2 gap-2 text-xs">
          {resource.availability.beds !== undefined && (
            <div className="flex items-center gap-2">
              <Bed className="w-3.5 h-3.5 text-teal-600" />
              <div>
                <span className="text-[10px] text-slate-400 block -mb-0.5">Avail Beds</span>
                <span className="font-bold text-navy-900">{resource.availability.beds}</span>
              </div>
            </div>
          )}

          {resource.availability.icuBeds !== undefined && (
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-cyan-600" />
              <div>
                <span className="text-[10px] text-slate-400 block -mb-0.5">ICU Beds</span>
                <span className="font-bold text-navy-900">{resource.availability.icuBeds}</span>
              </div>
            </div>
          )}

          {resource.availability.oxygenCylinders !== undefined && (
            <div className="flex items-center gap-2">
              <Wind className="w-3.5 h-3.5 text-sky-600" />
              <div>
                <span className="text-[10px] text-slate-400 block -mb-0.5">Oxygen</span>
                <span className="font-bold text-navy-900">{resource.availability.oxygenCylinders} cylinders</span>
              </div>
            </div>
          )}

          {resource.availability.foodPackets !== undefined && (
            <div className="flex items-center gap-2">
              <Utensils className="w-3.5 h-3.5 text-amber-600" />
              <div>
                <span className="text-[10px] text-slate-400 block -mb-0.5">Meals</span>
                <span className="font-bold text-navy-900">{resource.availability.foodPackets} ready</span>
              </div>
            </div>
          )}

          {resource.operatingHours && (
            <div className="col-span-2 text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 truncate">
              🕒 {resource.operatingHours}
            </div>
          )}
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
        <a
          href={`tel:${resource.contact.phone}`}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 text-xs font-semibold transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call</span>
        </a>

        <button
          onClick={handleDirections}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 text-xs font-semibold transition-colors"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Directions</span>
        </button>

        <Link
          to={`/resources/${resource._id}`}
          onClick={(e) => e.stopPropagation()}
          className="p-2 rounded-xl bg-navy-950 text-white hover:bg-teal-600 transition-colors flex items-center justify-center group-hover:translate-x-0.5"
          title="View Details"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
