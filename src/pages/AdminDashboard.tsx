import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Users, 
  Trophy, 
  FileText, 
  LayoutDashboard, 
  Plus, 
  Users2,
  Settings,
  Calendar
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { NotificationManager, ProfileManager, AchievementManager, ContentManager } from './admin';

export const AdminDashboard: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { label: 'Overview', path: '', icon: LayoutDashboard },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Faculty Profiles', path: '/profiles', icon: Users },
    { label: 'Achievements', path: '/achievements', icon: Trophy },
    { label: 'Content Management', path: '/content', icon: FileText },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Management Suite</h1>
          <p className="text-text-muted mt-1">Configure campus portals, update faculty, and broadcast notices.</p>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Admin Navigation */}
        <div className="w-64 shrink-0 space-y-1">
          {menuItems.map((item) => {
            const path = `/admin${item.path}`;
            const isActive = location.pathname === path;
            return (
              <Link
                key={item.label}
                to={path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-text-muted hover:bg-white hover:shadow-sm"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="notifications" element={<NotificationManager />} />
            <Route path="profiles" element={<ProfileManager />} />
            <Route path="achievements" element={<AchievementManager />} />
            <Route path="content" element={<ContentManager />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const AdminOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="card text-center space-y-4">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
          <Users2 size={24} />
        </div>
        <div>
          <h4 className="font-bold text-2xl">1,240</h4>
          <p className="text-text-muted text-xs uppercase font-bold tracking-widest mt-1">Total Students</p>
        </div>
      </div>
      <div className="card text-center space-y-4">
        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto">
          <Bell size={24} />
        </div>
        <div>
          <h4 className="font-bold text-2xl">48</h4>
          <p className="text-text-muted text-xs uppercase font-bold tracking-widest mt-1">Live Notices</p>
        </div>
      </div>
      <div className="card text-center space-y-4">
        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
          <Settings size={24} />
        </div>
        <div>
          <h4 className="font-bold text-2xl">98%</h4>
          <p className="text-text-muted text-xs uppercase font-bold tracking-widest mt-1">System Health</p>
        </div>
      </div>

      <section className="md:col-span-2 card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">Quick Actions</h3>
          <Calendar size={18} className="text-text-muted" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 rounded-xl border border-dashed border-slate-200 hover:border-primary hover:bg-primary-light/50 transition-all text-center space-y-2 group">
            <Plus size={20} className="mx-auto text-primary group-hover:scale-110 transition-transform" />
            <span className="block text-xs font-bold text-text-dark">New Notice</span>
          </button>
          <button className="p-4 rounded-xl border border-dashed border-slate-200 hover:border-primary hover:bg-primary-light/50 transition-all text-center space-y-2 group">
            <Plus size={20} className="mx-auto text-primary group-hover:scale-110 transition-transform" />
            <span className="block text-xs font-bold text-text-dark">Add Faculty</span>
          </button>
          <button className="p-4 rounded-xl border border-dashed border-slate-200 hover:border-primary hover:bg-primary-light/50 transition-all text-center space-y-2 group">
            <Plus size={20} className="mx-auto text-primary group-hover:scale-110 transition-transform" />
            <span className="block text-xs font-bold text-text-dark">Post Achievement</span>
          </button>
          <button className="p-4 rounded-xl border border-dashed border-slate-200 hover:border-primary hover:bg-primary-light/50 transition-all text-center space-y-2 group">
            <Plus size={20} className="mx-auto text-primary group-hover:scale-110 transition-transform" />
            <span className="block text-xs font-bold text-text-dark">Update Banner</span>
          </button>
        </div>
      </section>
    </div>
  );
}
