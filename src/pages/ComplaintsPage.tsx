import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { complaintService } from '../services/complaintService';
import { Complaint, ComplaintPriority } from '../types';
import { useNotifications } from '../context/NotificationContext';
import { ShieldCheck, AlertCircle, CheckCircle2, Send, Loader2 } from 'lucide-react';

export const ComplaintsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefillResourceId = searchParams.get('resourceId') || '';

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<ComplaintPriority>('MEDIUM');
  const [submitting, setSubmitting] = useState(false);

  const { showToast } = useNotifications();

  useEffect(() => {
    complaintService.getComplaints().then(setComplaints);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim() || !subject.trim() || !description.trim()) {
      showToast({ type: 'warning', title: 'Input Required', message: 'Please complete all required fields.' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await complaintService.createComplaint({
        userName,
        userEmail,
        resourceId: prefillResourceId,
        subject,
        description,
        priority,
      });

      setComplaints((prev) => [res, ...prev]);
      setSubject('');
      setDescription('');
      showToast({ type: 'success', title: 'Ticket Submitted', message: 'Your complaint ticket has been filed for admin review.' });
    } catch {
      showToast({ type: 'warning', title: 'Error', message: 'Could not submit ticket.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-brandbg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Quality Assurance & Data Verification
          </span>
          <h1 className="font-serif text-4xl font-normal text-navy-950 mt-2 mb-2">Report Data Issue or Complaint</h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Help maintain Sahya's data integrity. Report inaccurate bed counts, wrong phone numbers, or poor service.
          </p>
        </div>

        {/* Complaint Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle mb-10">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-navy-950 font-bold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. David Miller"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-navy-950 font-bold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="david@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-navy-950 font-bold mb-1">Subject / Issue Title *</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Hospital phone number not working"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-navy-950 font-bold mb-1">Priority Level</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as ComplaintPriority)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 font-semibold"
                >
                  <option value="LOW">Low Priority</option>
                  <option value="MEDIUM">Medium Priority</option>
                  <option value="HIGH">High Priority</option>
                  <option value="URGENT">Urgent Data Correction</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-navy-950 font-bold mb-1">Detailed Description *</label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide specific details regarding the inaccuracy..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-navy-950 font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Submit Complaint Ticket</span>
            </button>
          </form>
        </div>

        {/* Existing Tracked Complaints */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle">
          <h3 className="font-serif text-2xl text-navy-950 mb-4">Tracked Complaint Tickets</h3>
          <div className="space-y-3">
            {complaints.map((cmp) => (
              <div key={cmp._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-navy-950 text-sm">{cmp.subject}</span>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                    cmp.status === 'RESOLVED' ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {cmp.status}
                  </span>
                </div>
                <p className="text-slate-600">{cmp.description}</p>
                {cmp.adminResponse && (
                  <div className="p-2.5 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 text-[11px]">
                    <strong>Admin Note:</strong> {cmp.adminResponse}
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
