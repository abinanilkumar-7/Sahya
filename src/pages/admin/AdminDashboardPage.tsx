import React, { useState, useEffect } from 'react';
import { resourceService } from '../../services/resourceService';
import { emergencyService } from '../../services/emergencyService';
import { complaintService } from '../../services/complaintService';
import { Resource, EmergencyRequest, Complaint } from '../../types';
import { ShieldCheck, Activity, AlertTriangle, Users, CheckCircle2, Clock, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboardPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [emergencies, setEmergencies] = useState<EmergencyRequest[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    resourceService.getResources().then(setResources);
    emergencyService.getEmergencies().then(setEmergencies);
    complaintService.getComplaints().then(setComplaints);
  }, []);

  const pendingVerification = resources.filter((r) => !r.verified);
  const activeEmergencies = emergencies.filter((e) => e.status !== 'RESOLVED' && e.status !== 'CANCELLED');

  return (
    <div className="pt-28 pb-24 bg-brandbg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Admin Command Suite
            </span>
            <h1 className="font-serif text-4xl font-normal text-navy-950 mt-2">Platform Operational Control</h1>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/admin/analytics" className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md">
              <BarChart3 className="w-4 h-4" /> Full Analytics
            </Link>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-teal-50 text-teal-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Resources</span>
              <span className="font-serif text-3xl font-bold text-navy-950">{resources.length}</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Pending Verification</span>
              <span className="font-serif text-3xl font-bold text-amber-600">{pendingVerification.length}</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-rose-50 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Active Emergencies</span>
              <span className="font-serif text-3xl font-bold text-rose-600">{activeEmergencies.length}</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-600">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Open Complaints</span>
              <span className="font-serif text-3xl font-bold text-indigo-600">{complaints.length}</span>
            </div>
          </div>
        </div>

        {/* Admin Navigation Quick Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Link to="/admin/resources" className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-purple-400 transition-colors shadow-subtle">
            <h3 className="font-bold text-navy-950 text-lg mb-1">Manage Resources</h3>
            <p className="text-xs text-slate-500">Approve listings, update bed/oxygen counts, verify hospital statuses.</p>
          </Link>

          <Link to="/admin/emergencies" className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-purple-400 transition-colors shadow-subtle">
            <h3 className="font-bold text-navy-950 text-lg mb-1">Emergency Dispatch</h3>
            <p className="text-xs text-slate-500">Assign ambulance fleets, update ticket dispatches, monitor GPS dispatches.</p>
          </Link>

          <Link to="/admin/complaints" className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-purple-400 transition-colors shadow-subtle">
            <h3 className="font-bold text-navy-950 text-lg mb-1">Complaint Resolution</h3>
            <p className="text-xs text-slate-500">Review data correction flags, update resource details, respond to tickets.</p>
          </Link>
        </div>

      </div>
    </div>
  );
};
