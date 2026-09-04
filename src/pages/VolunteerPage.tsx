import React, { useState, useEffect } from 'react';
import { volunteerService } from '../services/volunteerService';
import { Volunteer } from '../types';
import { useNotifications } from '../context/NotificationContext';
import { Users, HeartHandshake, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';

export const VolunteerPage: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [preferredRole, setPreferredRole] = useState('Food Kitchen Lead');
  const [availability, setAvailability] = useState<'IMMEDIATE' | 'WEEKENDS' | 'PART_TIME' | 'ON_CALL'>('IMMEDIATE');
  const [submitting, setSubmitting] = useState(false);

  const { showToast } = useNotifications();

  useEffect(() => {
    volunteerService.getVolunteers().then(setVolunteers);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !city.trim()) {
      showToast({ type: 'warning', title: 'Input Required', message: 'Please fill in all contact details.' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await volunteerService.registerVolunteer({
        name,
        email,
        phone,
        city,
        skills: ['Community Support', 'Emergency Response', preferredRole],
        availability,
        preferredRole,
      });

      setVolunteers((prev) => [res, ...prev]);
      setName('');
      setEmail('');
      setPhone('');
      showToast({ type: 'success', title: 'Volunteer Registered!', message: 'Thank you for joining the Sahya volunteer network.' });
    } catch {
      showToast({ type: 'warning', title: 'Error', message: 'Could not complete volunteer registration.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-brandbg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-400 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <Users className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-4xl font-normal text-navy-950">Volunteer Network</h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Join community leads helping run food kitchens, update hospital bed data, and dispatch emergency relief.
          </p>
        </div>

        {/* Volunteer Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle mb-10">
          <h3 className="font-serif text-2xl text-navy-950 mb-4">Register as a Volunteer</h3>
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-navy-950 font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Siddharth Rao"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-navy-950 font-bold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="siddharth@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-navy-950 font-bold mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98234 56789"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-navy-950 font-bold mb-1">City / Region *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Central City"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-navy-950 font-bold mb-1">Availability</label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 font-semibold"
                >
                  <option value="IMMEDIATE">Immediate Full-time</option>
                  <option value="WEEKENDS">Weekends Only</option>
                  <option value="PART_TIME">Part-Time Hours</option>
                  <option value="ON_CALL">On-Call Emergency Dispatch</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-navy-950 font-bold mb-1">Preferred Volunteer Role</label>
              <input
                type="text"
                value={preferredRole}
                onChange={(e) => setPreferredRole(e.target.value)}
                placeholder="e.g. First Responder, Food Distribution, Logistics Driver"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <HeartHandshake className="w-4 h-4" />}
              <span>Complete Volunteer Registration</span>
            </button>
          </form>
        </div>

        {/* Active Volunteers List */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle">
          <h3 className="font-serif text-2xl text-navy-950 mb-4">Active Community Responders</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {volunteers.map((vol) => (
              <div key={vol._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-navy-950 text-sm">{vol.name}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    {vol.availability}
                  </span>
                </div>
                <p className="text-slate-500">{vol.city} • {vol.preferredRole}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {vol.skills.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 rounded-md bg-white border text-[10px] text-slate-600">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
