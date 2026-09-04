import React, { useState } from 'react';
import {
  X,
  FileText,
  ShieldCheck,
  Plus,
  Download,
  Calendar,
  AlertTriangle,
  Heart,
  Droplet,
  CheckCircle2,
  Syringe,
  FileSpreadsheet
} from 'lucide-react';

interface MedicalRecordsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RecordItem {
  id: string;
  type: 'Vaccine' | 'Lab Report' | 'Prescription' | 'Emergency Info';
  title: string;
  provider: string;
  date: string;
  status: string;
  details: string;
}

export const MedicalRecordsModal: React.FC<MedicalRecordsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'records' | 'profile' | 'add'>('records');

  const [records, setRecords] = useState<RecordItem[]>([
    {
      id: 'REC-01',
      type: 'Vaccine',
      title: 'Covid-19 Booster Dose (mRNA)',
      provider: 'Metro Immunization Center',
      date: '2026-02-14',
      status: 'Verified',
      details: 'Dose 3 administered. Batch #COV-9941. No adverse reactions recorded.',
    },
    {
      id: 'REC-02',
      type: 'Lab Report',
      title: 'Comprehensive Metabolic & Blood Panel',
      provider: 'Apollo Diagnostics Laboratory',
      date: '2026-04-10',
      status: 'Normal',
      details: 'Hemoglobin 14.2 g/dL, Glucose Fasting 92 mg/dL, Platelets 280,000 /mcL.',
    },
    {
      id: 'REC-03',
      type: 'Prescription',
      title: 'Respiratory Care & Inhaler Protocol',
      provider: 'Dr. Anita Roy, Pulmonology',
      date: '2026-05-22',
      status: 'Active',
      details: 'Budecort 200mcg 1 puff twice daily; Cetirizine 10mg as needed.',
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newProvider, setNewProvider] = useState('');
  const [newType, setNewType] = useState<'Vaccine' | 'Lab Report' | 'Prescription'>('Prescription');
  const [newDetails, setNewDetails] = useState('');

  if (!isOpen) return null;

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const item: RecordItem = {
      id: `REC-${Date.now().toString().slice(-4)}`,
      type: newType,
      title: newTitle,
      provider: newProvider || 'Verified Healthcare Clinic',
      date: new Date().toISOString().split('T')[0],
      status: 'Verified',
      details: newDetails || 'Record securely encrypted and stored.',
    };
    setRecords([item, ...records]);
    setNewTitle('');
    setNewProvider('');
    setNewDetails('');
    setActiveTab('records');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 to-cyan-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/15 rounded-xl">
              <FileText className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Digital Medical Records Vault</h3>
              <p className="text-xs text-teal-200">End-to-End Encrypted Health Dossier</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 bg-slate-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('records')}
            className={`pb-3 text-xs font-bold transition-colors border-b-2 px-3 ${
              activeTab === 'records'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Prescriptions & Labs ({records.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-xs font-bold transition-colors border-b-2 px-3 ${
              activeTab === 'profile'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Emergency Health ID
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`pb-3 text-xs font-bold transition-colors border-b-2 px-3 flex items-center gap-1 ${
              activeTab === 'add'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plus className="w-3.5 h-3.5" /> Add Record
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'records' && (
            <div className="space-y-3">
              {records.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-300 hover:shadow-md transition-all flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-teal-50 text-teal-700">
                        {rec.type === 'Vaccine' ? (
                          <Syringe className="w-4 h-4" />
                        ) : rec.type === 'Lab Report' ? (
                          <FileSpreadsheet className="w-4 h-4" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-navy-950">{rec.title}</h4>
                        <p className="text-[11px] text-slate-500">{rec.provider} • {rec.date}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {rec.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 pl-9 leading-relaxed">{rec.details}</p>
                </div>
              ))}

              <button
                onClick={() => alert('Medical dossier exported as encrypted PDF!')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors mt-2"
              >
                <Download className="w-4 h-4" /> Download Medical Summary PDF
              </button>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-5 border border-teal-200/80">
                <div className="flex items-center justify-between border-b border-teal-200/60 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                      Sahya Health ID
                    </span>
                    <h4 className="text-base font-bold text-navy-950 mt-1">Citizen Emergency Pass</h4>
                  </div>
                  <ShieldCheck className="w-8 h-8 text-teal-600" />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl shadow-xs border border-teal-100">
                    <div className="flex items-center gap-1.5 text-rose-600 mb-1 font-semibold">
                      <Droplet className="w-4 h-4" /> Blood Group
                    </div>
                    <span className="text-lg font-extrabold text-navy-950">O Positive (O+)</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl shadow-xs border border-teal-100">
                    <div className="flex items-center gap-1.5 text-amber-600 mb-1 font-semibold">
                      <AlertTriangle className="w-4 h-4" /> Allergies
                    </div>
                    <span className="text-sm font-bold text-slate-800">Penicillin, Peanuts</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl shadow-xs border border-teal-100">
                    <div className="flex items-center gap-1.5 text-indigo-600 mb-1 font-semibold">
                      <Heart className="w-4 h-4" /> Organ Donor
                    </div>
                    <span className="text-sm font-bold text-slate-800">Registered (Yes)</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl shadow-xs border border-teal-100">
                    <div className="flex items-center gap-1.5 text-teal-600 mb-1 font-semibold">
                      <CheckCircle2 className="w-4 h-4" /> Emergency Contact
                    </div>
                    <span className="text-xs font-bold text-slate-800">+91 98450 11223 (Kin)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'add' && (
            <form onSubmit={handleAddRecord} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Record Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
                >
                  <option value="Prescription">Prescription</option>
                  <option value="Lab Report">Lab Report</option>
                  <option value="Vaccine">Vaccine Certificate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Record Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Chest X-Ray or Cardiology Report"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Doctor / Hospital Name</label>
                <input
                  type="text"
                  value={newProvider}
                  onChange={(e) => setNewProvider(e.target.value)}
                  placeholder="e.g. City General Hospital"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Notes & Dosages</label>
                <textarea
                  rows={3}
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                  placeholder="Dosage, doctor advice, or key laboratory observations..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <CheckCircle2 className="w-4 h-4" /> Save Encrypted Record
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
