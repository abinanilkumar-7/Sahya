import React, { useState } from 'react';
import {
  X,
  FileCheck2,
  QrCode,
  ShieldCheck,
  AlertCircle,
  Calendar,
  MapPin,
  User,
  Phone,
  Download,
  CheckCircle2
} from 'lucide-react';

interface EPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PassData {
  id: string;
  name: string;
  phone: string;
  category: string;
  from: string;
  to: string;
  date: string;
  reason: string;
  status: 'ACTIVE' | 'APPROVED';
  issuedAt: string;
}

export const EPassModal: React.FC<EPassModalProps> = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState('Medical Emergency');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [reason, setReason] = useState('');
  const [generatedPass, setGeneratedPass] = useState<PassData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setGeneratedPass({
        id: `EP-${Math.floor(100000 + Math.random() * 900000)}`,
        name: name || 'Citizen Applicant',
        phone: phone || '+91 98765 43210',
        category,
        from: fromLocation || 'Central District',
        to: toLocation || 'City General Hospital',
        date,
        reason: reason || 'Urgent medical appointment and essential care.',
        status: 'ACTIVE',
        issuedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setGeneratedPass(null);
    setName('');
    setPhone('');
    setFromLocation('');
    setToLocation('');
    setReason('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 to-cyan-800 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/15 rounded-xl">
              <FileCheck2 className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Digital Emergency E-Pass</h3>
              <p className="text-xs text-teal-100">Official Movement Permit for Health Crisis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {generatedPass ? (
            /* Digital E-Pass Preview */
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-white rounded-2xl border-2 border-dashed border-teal-400 p-5 text-slate-800 relative">
                <div className="flex items-start justify-between border-b border-teal-200/60 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                      Pandemic Authority Issued
                    </span>
                    <h4 className="text-lg font-bold text-navy-950">E-Transit Permit</h4>
                    <p className="text-xs text-slate-500">Permit ID: {generatedPass.id}</p>
                  </div>
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-teal-200 flex flex-col items-center">
                    <QrCode className="w-12 h-12 text-teal-700" />
                    <span className="text-[9px] font-bold text-teal-600 mt-1">SCAN VERIFY</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Pass Holder</span>
                    <strong className="text-slate-800 text-sm">{generatedPass.name}</strong>
                    <span className="text-slate-500 block text-[11px]">{generatedPass.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Permit Category</span>
                    <span className="font-semibold text-teal-800">{generatedPass.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Travel Route</span>
                    <span className="font-medium text-slate-700">{generatedPass.from} → {generatedPass.to}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Valid Date</span>
                    <span className="font-semibold text-slate-800">{generatedPass.date}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-teal-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>STATUS: {generatedPass.status}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Issued at {generatedPass.issuedAt}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => alert(`Digital E-Pass ${generatedPass.id} saved to your device!`)}
                  className="flex-1 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Download className="w-4 h-4" /> Download PDF Pass
                </button>
                <button
                  onClick={handleReset}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  Apply Another
                </button>
              </div>
            </div>
          ) : (
            /* E-Pass Application Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p>E-passes are issued for essential travel, healthcare emergencies, and authorized volunteer duties during active restrictions.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Permit Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
                >
                  <option>Medical Emergency</option>
                  <option>Essential Food / Pharmacy Delivery</option>
                  <option>Caregiver Assistance</option>
                  <option>Volunteer Relief Services</option>
                  <option>Vaccination Appointment</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your legal name"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mobile Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit number"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">From Location</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      placeholder="Origin address / area"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Destination</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      placeholder="Hospital or clinic name"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Travel Date</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Reason / Notes</label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Brief description"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all mt-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Generating Secure E-Pass...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Submit & Generate E-Pass</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
