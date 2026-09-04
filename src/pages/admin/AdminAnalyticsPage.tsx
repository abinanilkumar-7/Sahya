import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const categoryData = [
  { name: 'Pharmacies', count: 1950 },
  { name: 'Hospitals', count: 840 },
  { name: 'Ambulances', count: 620 },
  { name: 'Food', count: 560 },
  { name: 'Oxygen', count: 420 },
  { name: 'Blood', count: 310 },
];

const pieData = [
  { name: 'Verified', value: 78, color: '#0F9FA8' },
  { name: 'Pending Admin Check', value: 15, color: '#F59E0B' },
  { name: 'Invalid Request', value: 7, color: '#ca2804'}
];

const trendData = [
  { day: 'Mon', requests: 12 },
  { day: 'Tue', requests: 19 },
  { day: 'Wed', requests: 15 },
  { day: 'Thu', requests: 28 },
  { day: 'Fri', requests: 35 },
  { day: 'Sat', requests: 22 },
  { day: 'Sun', requests: 18 },
];

export const AdminAnalyticsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-brandbg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Platform Intelligence
          </span>
          <h1 className="font-sans text-4xl font-normal text-navy-950 mt-2">Platform Analytics Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart: Resources by Category */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle">
            <h3 className="font-bold text-navy-950 text-base mb-4">Resources Indexed by Category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0F9FA8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart: Weekly Emergency Requests */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle">
            <h3 className="font-bold text-navy-950 text-base mb-4">Weekly Emergency SOS Requests</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="requests" stroke="#E05252" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle max-w-lg">
          <h3 className="font-bold text-navy-950 text-base mb-4">Resource Verification Ratio</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
