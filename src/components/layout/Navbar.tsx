import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Shield,
  Plus,
  Search,
  Bot,
  FileCheck2,
  FileText,
  AlertTriangle,
  Bell,
  User as UserIcon,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

interface NavbarProps {
  onOpenEmergencyModal: () => void;
  onOpenEPassModal?: () => void;
  onOpenMedicalRecordsModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEmergencyModal,
  onOpenEPassModal,
  onOpenMedicalRecordsModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* 1. Top Live Updates Announcement Banner */}
      <div className="bg-[#092635] text-white text-xs py-2 px-4 flex items-center justify-center gap-2 border-b border-white/5 font-medium tracking-wide">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <div className="w-4 h-4 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center">
            <Shield className="w-2.5 h-2.5" />
          </div>
          <span className="text-slate-200">
            <strong className="text-teal-300 font-semibold">Live updates:</strong> Stay informed. Stay safe.
          </span>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div
        className={`transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo - Pandemic / Sahya Resource Finder */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-700 via-teal-600 to-cyan-500 p-0.5 shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="relative w-full h-full rounded-[14px] bg-teal-700 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white fill-teal-800" />
                <Plus className="w-3.5 h-3.5 text-white stroke-[3.5] absolute" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors leading-none">
                Sahya
              </span>
              <span className="text-xs text-slate-500 font-normal leading-tight mt-0.5">
                Your Helping Hand
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <Link
              to="/resources"
              className={`transition-colors hover:text-teal-700 ${
                isActive('/resources') ? 'text-teal-700 font-semibold' : 'text-slate-700'
              }`}
            >
              Resources
            </Link>

            <Link
              to="/assistant"
              className={`transition-colors hover:text-teal-700 ${
                isActive('/assistant') ? 'text-teal-700 font-semibold' : 'text-slate-700'
              }`}
            >
              Uyra
            </Link>

            <Link
              to="/complaints"
              className={`transition-colors hover:text-teal-700 ${
                isActive('/complaints') ? 'text-teal-700 font-semibold' : 'text-slate-700'
              }`}
            >
              Complaints
            </Link>

            <button
              onClick={onOpenEPassModal}
              className="text-slate-700 hover:text-teal-700 transition-colors font-medium text-sm focus:outline-none"
            >
              E-pass
            </button>

            <button
              onClick={onOpenMedicalRecordsModal}
              className="text-slate-700 hover:text-teal-700 transition-colors font-medium text-sm focus:outline-none"
            >
              Medical Records
            </button>

            {isAdmin && (
              <Link
                to="/admin"
                className="text-purple-700 hover:text-purple-800 font-semibold text-xs bg-purple-50 px-3 py-1 rounded-full border border-purple-200"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Right Action Section */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute 1 top-0.5 right-0.5 w-4 h-4 rounded-full bg-emergency-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">
                  <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <span className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                      <Bell className="w-3.5 h-3.5 text-teal-600" /> Notifications
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-[11px] text-teal-600 font-medium hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400">No new notifications</div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n._id}
                          className={`p-3 text-xs transition-colors ${
                            !n.read ? 'bg-teal-50/50 text-slate-800' : 'text-slate-500'
                          }`}
                        >
                          <p className="font-semibold text-slate-900 mb-0.5">{n.title}</p>
                          <p className="text-[11px] leading-snug">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Emergency SOS Shortcut */}
            <button
              onClick={onOpenEmergencyModal}
              title="24/7 Emergency Dispatch SOS"
              className="p-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-all hover:scale-105"
            >
              <AlertTriangle className="w-4 h-4 animate-pulse" />
            </button>

            {/* Auth Dropdown / Sign in Pill Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {user?.name?.[0] || 'U'}
                  </div>
                  <span>{user?.name}</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-teal-600" /> My Profile
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-purple-700 hover:bg-purple-50 rounded-xl transition-colors"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> Admin Control
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#0B1E2E] hover:bg-slate-800 text-white font-semibold text-xs tracking-tight transition-all hover:scale-105 shadow-sm"
              >
                <span>Sign in</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenEmergencyModal}
              className="p-2 rounded-full bg-emergency-600 text-white text-xs font-bold shadow-md"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in fade-in">
          <Link
            to="/resources"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Search className="w-4 h-4 text-teal-600" />
            Resources
          </Link>
          <Link
            to="/assistant"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Bot className="w-4 h-4 text-teal-600" />
            Chatbot
          </Link>
          <Link
            to="/complaints"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            Complaints
          </Link>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenEPassModal?.();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 text-left"
          >
            <FileCheck2 className="w-4 h-4 text-teal-600" />
            Apply for E-pass
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenMedicalRecordsModal?.();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 text-left"
          >
            <FileText className="w-4 h-4 text-teal-600" />
            Medical Records
          </button>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            {isAuthenticated ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-slate-600">Signed in as {user?.name}</span>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="text-xs text-rose-600 font-bold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-[#0B1E2E] text-white font-bold text-xs"
              >
                Sign in →
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
