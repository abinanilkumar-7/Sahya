import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { HeartHandshake, UserPlus, Loader2 } from 'lucide-react';
import { UserRole } from '../types';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('USER');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setLoading(true);
    try {
      await register(name, email, password, role, phone);
      showToast({ type: 'success', title: 'Account Created', message: 'Welcome to Sahya Community Network!' });
      navigate('/profile');
    } catch {
      showToast({ type: 'warning', title: 'Registration Failed', message: 'Could not complete registration.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-brandbg min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-glass max-w-md w-full">
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-400 p-0.5 shadow-md mx-auto mb-3">
            <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
              <HeartHandshake className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h1 className="font-serif text-3xl font-bold text-navy-950">Join Sahya Network</h1>
          <p className="text-xs text-slate-500 mt-1">Create your verified community account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-navy-950 font-bold mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Rahul Sharma"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-navy-950 font-bold mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rahul@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-navy-950 font-bold mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-navy-950 font-bold mb-1">Account Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
            >
              <option value="USER">Community Citizen</option>
              <option value="VOLUNTEER">Volunteer Responder</option>
              <option value="RESOURCE_PROVIDER">Resource / Hospital Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-navy-950 font-bold mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-navy-950 font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
            <span>Create Account</span>
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 font-bold hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};
