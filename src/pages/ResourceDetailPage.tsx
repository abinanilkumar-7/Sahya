import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Resource } from '../types';
import { resourceService } from '../services/resourceService';
import { AvailabilityBadge } from '../components/common/AvailabilityBadge';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { useNotifications } from '../context/NotificationContext';
import {
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Navigation,
  Bookmark,
  AlertTriangle,
  ArrowLeft,
  Activity,
  Bed,
  Wind,
  Droplet,
  Utensils
} from 'lucide-react';

export const ResourceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const { showToast } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      resourceService.getResourceById(id).then((res) => {
        setResource(res);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 text-center text-slate-400 text-sm">
        Loading resource details...
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="pt-32 pb-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-3xl text-navy-950 mb-2">Resource Not Found</h2>
        <p className="text-xs text-slate-500 mb-4">The requested resource could not be located in our directory.</p>
        <Link to="/resources" className="px-5 py-2.5 rounded-xl bg-teal-500 text-navy-950 font-bold text-xs">
          Return to Resources
        </Link>
      </div>
    );
  }

  const handleBookmark = () => {
    setIsSaved(!isSaved);
    showToast({
      type: 'success',
      title: isSaved ? 'Removed from Bookmarks' : 'Saved to Profile',
      message: `${resource.name} ${isSaved ? 'removed from' : 'saved to'} your profile bookmarks.`,
    });
  };

  const handleDirections = () => {
    const lat = resource.location.coordinates[1];
    const lng = resource.location.coordinates[0];
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <div className="pt-28 pb-24 bg-brandbg min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-950 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to listings
        </button>

        {/* Main Resource Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle mb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                  {resource.category}
                </span>
                {resource.verified && (
                  <span className="flex items-center gap-1 text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                    <CheckCircle2 className="w-4 h-4" /> Verified Resource
                  </span>
                )}
                <AvailabilityBadge status={resource.availability.status} />
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 mt-1 mb-2">
                {resource.name}
              </h1>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{resource.address.fullAddress}</span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleBookmark}
                className={`p-3 rounded-2xl border transition-all ${
                  isSaved
                    ? 'bg-teal-500 text-navy-950 border-teal-500 shadow-md'
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                }`}
                title="Bookmark Resource"
              >
                <Bookmark className="w-5 h-5" />
              </button>

              <button
                onClick={handleDirections}
                className="px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-600 text-navy-950 font-bold text-xs flex items-center gap-2 shadow-md"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </button>
            </div>
          </div>

          {/* Description & Key Details */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy-950">About this service</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {resource.description}
              </p>

              {/* Operating Info */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 text-xs">
                <Clock className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Operating Hours</span>
                  <span className="font-bold text-navy-900">{resource.operatingHours}</span>
                </div>
              </div>
            </div>

            {/* Contact Box */}
            <div className="bg-navy-950 text-white p-5 rounded-2xl space-y-3 text-xs">
              <h4 className="font-bold text-sm text-cyan-300">Contact Information</h4>
              
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <a href={`tel:${resource.contact.phone}`} className="hover:underline font-bold">
                  {resource.contact.phone}
                </a>
              </div>

              {resource.contact.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span className="truncate">{resource.contact.email}</span>
                </div>
              )}

              {resource.contact.website && (
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <a href={resource.contact.website} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline truncate">
                    Visit Official Site
                  </a>
                </div>
              )}

              <div className="pt-2">
                <Link
                  to={`/complaints?resourceId=${resource._id}`}
                  className="inline-flex items-center gap-1.5 text-[11px] text-amber-400 hover:underline"
                >
                  <AlertTriangle className="w-3.5 h-3.5" /> Report Incorrect Information
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Supply Breakdown Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-navy-950 mb-4">
            Live Resource Availability Metrics
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {resource.availability.beds !== undefined && (
              <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-100">
                <Bed className="w-5 h-5 text-teal-600 mb-2" />
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Available General Beds</span>
                <span className="text-2xl font-bold text-navy-950">{resource.availability.beds}</span>
              </div>
            )}

            {resource.availability.icuBeds !== undefined && (
              <div className="bg-cyan-50/60 p-4 rounded-2xl border border-cyan-100">
                <Activity className="w-5 h-5 text-cyan-600 mb-2" />
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">ICU / Ventilator Beds</span>
                <span className="text-2xl font-bold text-navy-950">{resource.availability.icuBeds}</span>
              </div>
            )}

            {resource.availability.oxygenCylinders !== undefined && (
              <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-100">
                <Wind className="w-5 h-5 text-sky-600 mb-2" />
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Oxygen Cylinders</span>
                <span className="text-2xl font-bold text-navy-950">{resource.availability.oxygenCylinders}</span>
              </div>
            )}

            {resource.availability.foodPackets !== undefined && (
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
                <Utensils className="w-5 h-5 text-amber-600 mb-2" />
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Meals Available</span>
                <span className="text-2xl font-bold text-navy-950">{resource.availability.foodPackets}</span>
              </div>
            )}
          </div>

          {resource.availability.notes && (
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
              📌 <strong>Status Note:</strong> {resource.availability.notes}
            </div>
          )}
        </div>

        {/* Map Location Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle">
          <h3 className="text-sm font-bold uppercase tracking-wider text-navy-950 mb-4">Location Preview</h3>
          <InteractiveMap
            resources={[resource]}
            centerLat={resource.location.coordinates[1]}
            centerLng={resource.location.coordinates[0]}
            zoom={15}
            height="350px"
          />
        </div>

      </div>
    </div>
  );
};
