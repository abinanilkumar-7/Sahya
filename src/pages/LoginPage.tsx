import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { HeartHandshake, LogIn, ShieldCheck, Loader2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    try {
      await login(email, password);
      showToast({ type: 'success', title: 'Welcome Back!', message: 'Successfully signed into Sahya.' });
      navigate('/profile');
    } catch {
      showToast({ type: 'warning', title: 'Login Failed', message: 'Invalid credentials.' });
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
          <h1 className="font-serif text-3xl font-bold text-navy-950">Sign In to Sahya</h1>
          <p className="text-xs text-slate-500 mt-1">Access your saved bookmarks & complaint dispatches</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-navy-950 font-bold mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sahya.org or your email"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500"
            />
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
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
            <span>Sign In</span>
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          <span>Demo admin login: </span>
          <button
            onClick={() => {
              setEmail('admin@sahya.org');
              setPassword('admin123');
            }}
            className="text-teal-600 font-bold hover:underline"
          >
            Click to fill admin credentials
          </button>
        </div>

        <div className="mt-4 text-center text-xs text-slate-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-teal-600 font-bold hover:underline">
            Register now
          </Link>
        </div>

      </div>
    </div>
  );
};
