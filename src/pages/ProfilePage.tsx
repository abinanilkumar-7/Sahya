import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { resourceService } from '../services/resourceService';
import { Resource } from '../types';
import { ResourceCard } from '../components/resources/ResourceCard';
import { User, ShieldCheck, Bookmark, AlertTriangle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [savedResources, setSavedResources] = useState<Resource[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    resourceService.getResources({ verifiedOnly: true }).then((data) => {
      setSavedResources(data.slice(0, 2));
    });
  }, []);

  if (!user) {
    return (
      <div className="pt-32 pb-24 text-center max-w-md mx-auto px-4">
        <p className="text-xs text-slate-500 mb-4">Please sign in to view your profile.</p>
        <button onClick={() => navigate('/login')} className="px-5 py-2 rounded-xl bg-teal-500 text-navy-950 font-bold text-xs">
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-brandbg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/20 text-teal-700 font-bold text-2xl flex items-center justify-center border border-teal-300">
              {user.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-3xl font-bold text-navy-950">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold text-[10px]">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-500">{user.email} • {user.phone || '+91 98765 00000'}</p>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Saved Bookmarks */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle">
          <h3 className="font-serif text-2xl text-navy-950 mb-4 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-teal-600" /> Saved Resource Bookmarks
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedResources.map((res) => (
              <ResourceCard key={res._id} resource={res} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
