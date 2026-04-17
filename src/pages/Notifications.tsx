import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Filter, Search, Calendar } from 'lucide-react';
import { Notification } from '@/src/types';
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/src/lib/utils';

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'TCS On-Campus Drive Registration', message: 'Eligible students from CSE, ECE, and EE are requested to fill the form by 5 PM today. Please ensure all documents are ready for upload.', branch: 'CSE', role: 'All', created_at: new Date().toISOString(), created_by: 'admin', is_scheduled: false },
    { id: '2', title: 'Internal Assessment - Semester 5', message: 'The schedule for internal vivas is now posted on the notice board. Please check your respective lab groups.', branch: 'All', role: 'All', created_at: new Date(Date.now() - 3600000 * 5).toISOString(), created_by: 'admin', is_scheduled: false },
    { id: '3', title: 'Tarang 2024 - Cultural Fest', message: 'Core committee applications are open for the annual cultural extravaganza. Interested students can apply via the student council portal.', branch: 'All', role: 'All', created_at: new Date(Date.now() - 86400000).toISOString(), created_by: 'admin', is_scheduled: false },
    { id: '4', title: 'Hostel Maintenance Notice', message: 'Routine water tank cleaning will be carried out this weekend. Please store water accordingly.', branch: 'All', role: 'student', created_at: new Date(Date.now() - 86400000 * 2).toISOString(), created_by: 'admin', is_scheduled: false },
  ]);

  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredNotifs = activeFilter === 'All' 
    ? notifications 
    : notifications.filter(n => n.branch === activeFilter);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Notice Board</h1>
          <p className="text-text-muted mt-1">Official announcements and daily updates from GEC Vaishali.</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-xl shadow-sm border border-border">
          {['All', 'CSE', 'Civil', 'Mechanical', 'EE', 'ECE'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                activeFilter === filter 
                  ? "bg-primary text-white" 
                  : "text-text-muted hover:bg-primary-light hover:text-primary"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((notif, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={notif.id}
              className="card group hover:border-primary transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Bell size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{notif.title}</h3>
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {format(new Date(notif.created_at), 'MMM dd, yyyy')}
                      </span>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(notif.created_at))} ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="tag">{notif.branch}</span>
                  {notif.role !== 'All' && (
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      {notif.role}s
                    </span>
                  )}
                </div>
              </div>
              <p className="text-text-muted text-sm leading-relaxed mt-4 pl-12 border-l-2 border-primary/10 ml-5">
                {notif.message}
              </p>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 card bg-slate-50 border-dashed">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-text-muted">
              <Filter size={32} />
            </div>
            <h3 className="font-bold text-xl text-text-dark">No notices found</h3>
            <p className="text-text-muted">Try clearing your filters to see more updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};
