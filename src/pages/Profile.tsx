import React from 'react';
import { useAuth } from '@/src/contexts/AuthContext';
import { User, Shield, Briefcase, Mail, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="relative h-48 bg-gradient-to-r from-primary to-blue-600 rounded-3xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 L100 100 M0 100 L100 0" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      <div className="px-8 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
          <div className="w-40 h-40 rounded-3xl bg-white p-2 shadow-xl border border-border">
            <div className="w-full h-full rounded-2xl bg-slate-100 flex items-center justify-center text-primary border-2 border-primary-light">
              <User size={80} />
            </div>
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-extrabold tracking-tight">{user.name}</h1>
              <span className="bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-primary/20">
                {user.role.replace('_', ' ')}
              </span>
            </div>
            <p className="text-text-muted font-medium mt-1 flex items-center gap-2">
              <Shield size={16} />
              {user.branch || 'Institutional'} Management
            </p>
          </div>
          <div className="pb-4">
            <button className="bg-white border border-border px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-shadow">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section className="card">
              <h2 className="section-title">Account Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-1">
                    <Mail size={12} /> Email Address
                  </label>
                  <p className="font-semibold text-sm">{user.email}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-1">
                    <Briefcase size={12} /> Primary Role
                  </label>
                  <p className="font-semibold text-sm">{user.role}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-1">
                    <Calendar size={12} /> Joined Portal
                  </label>
                  <p className="font-semibold text-sm">April 15, 2026</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-1">
                    <MapPin size={12} /> Location
                  </label>
                  <p className="font-semibold text-sm">GEC Vaishali Campus</p>
                </div>
              </div>
            </section>

            <section className="card">
              <h2 className="section-title">Administrative Scoping</h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Your account is scoped to the <span className="text-primary font-bold">{user.branch || 'Full Institution'}</span> level. 
                You have permissions to broadcast notices, manage department profiles, and update course content for your respective scope.
              </p>
            </section>
          </div>

          <div className="space-y-8">
            <section className="card bg-primary-light/30 border-primary-light">
              <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Security Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-text-dark">Email Verified</span>
                  <span className="text-green-600 font-bold">YES</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-text-dark">Two-Factor</span>
                  <span className="text-yellow-600 font-bold">DISABLED</span>
                </div>
                <div className="pt-2">
                  <button className="w-full bg-primary text-white py-2 rounded-lg text-xs font-bold shadow-md shadow-primary/10">
                    Update Security
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
