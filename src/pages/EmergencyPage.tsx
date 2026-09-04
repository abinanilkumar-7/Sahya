import React, { useState, useEffect } from 'react';
import { emergencyService } from '../services/emergencyService';
import { EmergencyRequest } from '../types';
import { AlertTriangle, PhoneCall, Ambulance, HeartPulse, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';

interface EmergencyPageProps {
  onOpenEmergencyModal: () => void;
}

export const EmergencyPage: React.FC<EmergencyPageProps> = ({ onOpenEmergencyModal }) => {
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);

  useEffect(() => {
    emergencyService.getEmergencies().then(setRequests);
  }, []);

  const helplines = [
    { title: 'National Emergency Hotline', number: '112', icon: AlertTriangle },
    { title: 'Medical & Ambulance Support', number: '108 / 102', icon: Ambulance },
    { title: 'Disaster Relief Hotline', number: '1070', icon: ShieldAlert },
    { title: 'Women & Child Emergency', number: '1091', icon: HeartPulse },
  ];

  return (
    <div className="pt-28 pb-24 bg-brandbg min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="w-16 h-16 rounded-full bg-emergency-600/20 border border-emergency-500/50 flex items-center justify-center mx-auto mb-4 shadow-emergency">
            <AlertTriangle className="w-8 h-8 text-emergency-500 animate-pulse" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-navy-950">Emergency Assistance</h1>
          <p className="text-sm text-slate-600 mt-2">
            Priority dispatch control room for medical emergencies, trauma transport, and oxygen support.
          </p>

          <button
            onClick={onOpenEmergencyModal}
            className="mt-6 px-8 py-4 rounded-2xl bg-emergency-600 hover:bg-emergency-700 text-white font-bold text-sm shadow-emergency transition-all hover:scale-105"
          >
            Launch Emergency SOS Request Now
          </button>
        </div>

        {/* National Emergency Helplines Grid */}
        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl mb-10 border border-white/10">
          <h3 className="font-serif text-2xl text-white mb-4">Direct Emergency Hotlines</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {helplines.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={`tel:${item.number.split('/')[0].trim()}`}
                  className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/10 transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-2 text-emergency-400">
                    <Icon className="w-5 h-5" />
                    <span className="text-[10px] uppercase font-bold text-slate-300">{item.title}</span>
                  </div>
                  <span className="font-serif text-2xl font-bold text-cyan-300">{item.number}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Active Emergency Requests Status Tracker */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle">
          <h3 className="font-serif text-2xl text-navy-950 mb-4">Recent Dispatch Tickets</h3>

          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy-950 text-sm">Ticket #{req.requestId}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emergency-100 text-emergency-800 font-bold text-[11px]">
                      {req.type}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-800 font-bold text-[11px] border border-teal-500/30">
                    Status: {req.status}
                  </span>
                </div>

                <p className="text-slate-600">
                  <strong>Patient:</strong> {req.userName} ({req.userPhone}) • <strong>Location:</strong> {req.addressString}
                </p>
                <p className="text-slate-500 italic">"{req.description}"</p>

                {req.nearestHospital && (
                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-slate-700">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Matched Hospital</span>
                      <p className="font-bold text-navy-950">{req.nearestHospital.name} ({req.nearestHospital.distance})</p>
                    </div>
                    <a href={`tel:${req.nearestHospital.phone}`} className="px-3 py-1.5 rounded-lg bg-teal-500 text-navy-950 font-bold text-xs">
                      Call Hospital
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
