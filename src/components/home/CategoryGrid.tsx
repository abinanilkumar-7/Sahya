import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Bed,
  Wind,
  Pill,
  Heart,
  Droplets,
  ArrowRight
} from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  description: string;
  icon: any;
  path: string;
  iconBg: string;
  iconColor: string;
  linkColor?: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'hospitals',
    name: 'Hospitals',
    description: 'Find nearby hospitals and specialty care centers.',
    icon: Building2,
    path: '/hospitals',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    linkColor: 'text-teal-700 hover:text-teal-800',
  },
  {
    id: 'beds',
    name: 'Hospital Beds',
    description: 'Check live availability of general and ICU beds.',
    icon: Bed,
    path: '/resources?category=Hospitals',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    linkColor: 'text-teal-700 hover:text-teal-800',
  },
  {
    id: 'oxygen',
    name: 'Oxygen',
    description: 'Locate oxygen suppliers and refill centers.',
    icon: Wind,
    path: '/oxygen',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    linkColor: 'text-teal-700 hover:text-teal-800',
  },
  {
    id: 'medicines',
    name: 'Medicines',
    description: 'Search for essential medicines near you.',
    icon: Pill,
    path: '/pharmacies',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    linkColor: 'text-teal-700 hover:text-teal-800',
  },
  {
    id: 'vaccination',
    name: 'Vaccination',
    description: 'Find vaccination centers and slots near you.',
    icon: Heart,
    path: '/resources?category=Vaccination',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500',
    linkColor: 'text-rose-600 hover:text-rose-700',
  },
  {
    id: 'essentials',
    name: 'Essentials',
    description: 'Find food, groceries and daily essentials near you.',
    icon: Droplets,
    path: '/food',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    linkColor: 'text-teal-700 hover:text-teal-800',
  },
];

export const CategoryGrid: React.FC = () => {
  return (
    <section className="pt-16 pb-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            Find resources near you
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 font-normal">
            Real-time availability across your region.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${cat.iconBg} ${cat.iconColor} flex items-center justify-center mb-4 transition-transform group-hover:scale-105`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-5 mt-auto">
                  <Link
                    to={cat.path}
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${cat.linkColor || 'text-teal-700 hover:text-teal-800'} transition-colors group`}
                  >
                    <span>View all</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
