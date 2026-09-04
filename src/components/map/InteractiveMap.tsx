import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Resource } from '../../types';
import L from 'leaflet';
import { Phone, Navigation, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom Map Marker Icons using SVG Data URIs
const createCustomMarker = (color: string) => {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      ">
        <div style="
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const hospitalIcon = createCustomMarker('#0F9FA8'); // Teal
const pharmacyIcon = createCustomMarker('#39C6D5'); // Cyan
const oxygenIcon = createCustomMarker('#0284C7'); // Sky
const defaultIcon = createCustomMarker('#063B5C'); // Navy

interface InteractiveMapProps {
  resources: Resource[];
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  height?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  resources,
  centerLat = 19.0760,
  centerLng = 72.8777,
  zoom = 13,
  height = '500px',
}) => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Hospitals':
      case 'Healthcare':
        return hospitalIcon;
      case 'Pharmacies':
        return pharmacyIcon;
      case 'Oxygen':
        return oxygenIcon;
      default:
        return defaultIcon;
    }
  };

  return (
    <div style={{ height }} className="w-full rounded-3xl overflow-hidden shadow-glass border border-slate-200 relative z-0">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {resources.map((res) => {
          const lat = res.location.coordinates[1];
          const lng = res.location.coordinates[0];

          return (
            <Marker key={res._id} position={[lat, lng]} icon={getIcon(res.category)}>
              <Popup className="custom-leaflet-popup">
                <div className="p-2 max-w-xs">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                      {res.category}
                    </span>
                    {res.verified && (
                      <span className="text-[10px] text-teal-600 font-semibold flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-navy-950 mb-1">{res.name}</h4>
                  <p className="text-xs text-slate-500 mb-2">{res.address.street}</p>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <a
                      href={`tel:${res.contact.phone}`}
                      className="flex-1 py-1 px-2 text-[11px] font-bold text-center bg-slate-100 rounded-lg text-slate-700"
                    >
                      Call
                    </a>
                    <Link
                      to={`/resources/${res._id}`}
                      className="flex-1 py-1 px-2 text-[11px] font-bold text-center bg-teal-500 text-navy-950 rounded-lg"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
