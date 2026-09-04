import React, { useState, useEffect } from 'react';
import { resourceService } from '../../services/resourceService';
import { Resource } from '../../types';
import { useNotifications } from '../../context/NotificationContext';
import { CheckCircle2, XCircle, Trash2, Edit3, Plus, ShieldCheck, Search } from 'lucide-react';

export const AdminResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [search, setSearch] = useState('');
  const { showToast } = useNotifications();

  useEffect(() => {
    resourceService.getResources().then(setResources);
  }, []);

  const handleToggleVerify = async (id: string, currentVerified: boolean) => {
    try {
      const updated = await resourceService.toggleVerifyResource(id, !currentVerified);
      setResources((prev) => prev.map((r) => (r._id === id ? updated : r)));
      showToast({
        type: 'success',
        title: 'Verification Status Updated',
        message: `Resource is now ${!currentVerified ? 'Verified' : 'Unverified'}.`,
      });
    } catch {
      showToast({ type: 'warning', title: 'Error', message: 'Could not update verification.' });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this resource listing?')) {
      await resourceService.deleteResource(id);
      setResources((prev) => prev.filter((r) => r._id !== id));
      showToast({ type: 'info', title: 'Resource Deleted', message: 'Resource removed from database.' });
    }
  };

  const filtered = resources.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-28 pb-24 bg-brandbg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Admin Resource Manager
            </span>
            <h1 className="font-serif text-4xl font-normal text-navy-950 mt-2">Resource Verification & Directory</h1>
          </div>
        </div>

        {/* Search Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-subtle mb-6 flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resource name or category..."
            className="flex-1 bg-transparent text-xs font-medium focus:outline-none"
          />
        </div>

        {/* Resource Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-4">Name & Category</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Verification</th>
                  <th className="p-4">Availability</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((res) => (
                  <tr key={res._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-navy-950">{res.name}</p>
                      <span className="text-[10px] text-teal-600 font-semibold">{res.category}</span>
                    </td>
                    <td className="p-4 text-slate-600">
                      {res.address.city}, {res.address.pincode}
                    </td>
                    <td className="p-4">
                      {res.verified ? (
                        <span className="inline-flex items-center gap-1 font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200 text-[10px]">
                          <CheckCircle2 className="w-3 h-3 text-teal-600" /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 text-[10px]">
                          Pending Review
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-slate-600">
                      {res.availability.beds !== undefined && `${res.availability.beds} Beds `}
                      {res.availability.oxygenCylinders !== undefined && `${res.availability.oxygenCylinders} Cylinders`}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleVerify(res._id, res.verified)}
                        className={`px-3 py-1 rounded-lg font-bold text-[11px] ${
                          res.verified
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            : 'bg-teal-500 text-navy-950 hover:bg-teal-600'
                        }`}
                      >
                        {res.verified ? 'Revoke Verify' : 'Approve Verify'}
                      </button>
                      <button
                        onClick={() => handleDelete(res._id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
