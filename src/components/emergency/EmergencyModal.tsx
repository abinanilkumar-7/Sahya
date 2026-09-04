import React, { useState } from 'react';
import { useLocation } from '../../context/LocationContext';
import { emergencyService } from '../../services/emergencyService';
import { useNotifications } from '../../context/NotificationContext';
import { EmergencyRequest, EmergencyType } from '../../types';
import {
  AlertTriangle,
  X,
  Phone,
  MapPin,
  Ambulance,
  HeartPulse,
  Wind,
  ShieldAlert,
  CheckCircle2,
  Loader2
} from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const { latitude, longitude, addressString, isDetecting, detectLocation } = useLocation();
  const { showToast } = useNotifications();

  const [step, setStep] = useState<'CONFIRM' | 'FORM' | 'SUBMITTED'>('CONFIRM');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [emergencyType, setEmergencyType] = useState<EmergencyType>('Medical');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdRequest, setCreatedRequest] = useState<EmergencyRequest | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) {
      showToast({ type: 'warning', title: 'Input Required', message: 'Please provide your name and phone number.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await emergencyService.createEmergencyRequest({
        userName,
        userPhone,
        location: { coordinates: [longitude, latitude] },
        addressString,
        type: emergencyType,
        description: description || 'Immediate emergency assistance dispatch required.',
      });

      setCreatedRequest(res);
      setStep('SUBMITTED');
      showToast({
        type: 'emergency',
        title: 'Emergency Request Created',
        message: `Dispatch Ticket #${res.requestId} generated. Response team alerted.`,
      });
    } catch {
      showToast({
        type: 'warning',
        title: 'Connection Issue',
        message: 'Could not connect to emergency dispatch server.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const emergencyTypes: { type: EmergencyType; label: string; icon: any }[] = [
    { type: 'Medical', label: 'Medical ICU / Hospital', icon: HeartPulse },
    { type: 'Ambulance', label: 'Ambulance Pick-up', icon: Ambulance },
    { type: 'Oxygen', label: 'Urgent Oxygen Supply', icon: Wind },
    { type: 'Shelter', label: 'Emergency Shelter', icon: ShieldAlert },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-navy-900 border border-emergency-500/40 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl relative overflow-hidden">
        {/* Top Emergency Stripe */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emergency-600 via-rose-500 to-emergency-600" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'CONFIRM' && (
          <div className="text-center pt-2 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emergency-600/20 border border-emergency-500/50 flex items-center justify-center mx-auto shadow-emergency">
              <AlertTriangle className="w-8 h-8 text-emergency-500 animate-pulse" />
            </div>

            <div>
              <h3 className="text-2xl font-bold font-serif text-white">Emergency Assistance Request</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
                This will alert nearest verified emergency dispatch centers and ambulance fleets to your GPS position.
              </p>
            </div>

            {/* GPS Location Status Pill */}
            <div className="bg-navy-950/60 p-3 rounded-2xl border border-white/10 text-left text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" /> Detected Location
                </span>
                <button onClick={() => detectLocation()} className="text-teal-400 hover:underline text-[11px]">
                  {isDetecting ? 'Detecting...' : 'Refresh GPS'}
                </button>
              </div>
              <p className="font-semibold text-white truncate">{addressString}</p>
            </div>

            {/* Confirmation CTA Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-semibold text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep('FORM')}
                className="flex-1 py-3 rounded-xl bg-emergency-600 hover:bg-emergency-700 text-white font-bold text-xs shadow-emergency transition-all hover:scale-105"
              >
                Proceed to Request Dispatch
              </button>
            </div>
          </div>
        )}

        {step === 'FORM' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emergency-400" />
              <h4 className="text-lg font-bold text-white">Select Assistance Type</h4>
            </div>

            {/* Emergency Type Grid */}
            <div className="grid grid-cols-2 gap-2">
              {emergencyTypes.map((item) => {
                const Icon = item.icon;
                const isSelected = emergencyType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setEmergencyType(item.type)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs font-semibold ${
                      isSelected
                        ? 'bg-emergency-600/20 border-emergency-500 text-white shadow-emergency'
                        : 'bg-navy-950/40 border-white/10 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-emergency-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* User Contact Inputs */}
            <div className="space-y-2 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-emergency-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Phone Number for Dispatcher *</label>
                <input
                  type="tel"
                  required
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-emergency-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Brief Situation Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe patient condition or immediate urgency..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-emergency-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep('CONFIRM')}
                className="py-3 px-4 rounded-xl bg-white/10 text-slate-300 font-medium text-xs"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl bg-emergency-600 hover:bg-emergency-700 text-white font-bold text-xs shadow-emergency flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Dispatching Alert...
                  </>
                ) : (
                  'Transmit SOS Dispatch Ticket'
                )}
              </button>
            </div>
          </form>
        )}

        {step === 'SUBMITTED' && createdRequest && (
          <div className="text-center pt-3 space-y-4">
            <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-teal-400" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-teal-400">
                Ticket #{createdRequest.requestId} Active
              </span>
              <h3 className="text-xl font-bold text-white mt-1">Emergency Dispatch Initiated</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
                Nearest responders have received your coordinates. Please keep your phone reachable.
              </p>
            </div>

            {/* Assigned Provider Cards */}
            <div className="bg-navy-950 p-3.5 rounded-2xl border border-white/10 text-left text-xs space-y-2.5">
              {createdRequest.nearestHospital && (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Matched Hospital</span>
                    <p className="font-bold text-white">{createdRequest.nearestHospital.name}</p>
                  </div>
                  <a
                    href={`tel:${createdRequest.nearestHospital.phone}`}
                    className="p-2 rounded-xl bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 flex items-center gap-1 font-bold text-[11px]"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>
                </div>
              )}

              {createdRequest.nearestAmbulance && (
                <div className="flex items-center justify-between border-t border-white/10 pt-2">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Matched Ambulance Unit</span>
                    <p className="font-bold text-white">{createdRequest.nearestAmbulance.name}</p>
                  </div>
                  <a
                    href={`tel:${createdRequest.nearestAmbulance.phone}`}
                    className="p-2 rounded-xl bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 flex items-center gap-1 font-bold text-[11px]"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-teal-500 text-navy-950 font-bold text-xs shadow-md"
            >
              Done & Return to Sahya
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
