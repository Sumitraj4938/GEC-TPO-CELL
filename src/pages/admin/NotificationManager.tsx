import React, { useState } from 'react';
import { Branch, Notification } from '@/src/types';
import { Send, Trash2, Calendar, Target, UserCheck } from 'lucide-react';
import { format } from 'date-fns';

export const NotificationManager: React.FC = () => {
  const [notifs, setNotifs] = useState<Notification[]>([
    { id: '1', title: 'TCS On-Campus Drive Registration', message: 'Eligible students are requested to fill the form.', branch: 'CSE', role: 'All', created_at: new Date().toISOString(), created_by: 'admin', is_scheduled: false }
  ]);

  const [form, setForm] = useState({
    title: '',
    message: '',
    branch: 'All' as Branch | 'All',
    role: 'All' as any,
    scheduled: false,
    date: ''
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotif: Notification = {
      id: Math.random().toString(),
      ...form,
      created_at: new Date().toISOString(),
      created_by: 'admin',
      is_scheduled: form.scheduled
    };
    setNotifs([newNotif, ...notifs]);
    setForm({ title: '', message: '', branch: 'All', role: 'All', scheduled: false, date: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <section className="card">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
          <Send className="text-primary" size={20} />
          Broadcast New Notice
        </h3>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Notice Title</label>
              <input 
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="e.g. End Semester Exam Fee Payment"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Target Branch</label>
                <select 
                  value={form.branch}
                  onChange={e => setForm({...form, branch: e.target.value as any})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                >
                  <option value="All">All Branches</option>
                  <option value="CSE">CSE</option>
                  <option value="Civil">Civil</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="EE">EE</option>
                  <option value="ECE">ECE</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Target Role</label>
                <select 
                  value={form.role}
                  onChange={e => setForm({...form, role: e.target.value as any})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                >
                  <option value="All">Everyone</option>
                  <option value="student">Students</option>
                  <option value="tpo_admin">TPO Members</option>
                  <option value="hod_admin">HODs</option>
                </select>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Message Content</label>
            <textarea 
              value={form.message}
              onChange={e => setForm({...form, message: e.target.value})}
              rows={4}
              className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              placeholder="Detailed notification message here..."
              required
            />
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={form.scheduled}
                  onChange={e => setForm({...form, scheduled: e.target.checked})}
                  className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300" 
                />
                <span className="text-sm font-semibold text-text-muted group-hover:text-text-dark transition-colors">Schedule for later</span>
              </label>
              {form.scheduled && (
                <input 
                  type="datetime-local" 
                  value={form.date}
                  onChange={e => setForm({...form, date: e.target.value})}
                  className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-1 text-xs focus:ring-2 focus:ring-primary/20 outline-none"
                />
              )}
            </div>
            <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
              <Send size={18} />
              Broadcast Now
            </button>
          </div>
        </form>
      </section>

      <section className="card">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
          <Calendar className="text-text-muted" size={20} />
          Sent History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border text-[10px] font-bold text-text-muted uppercase tracking-widest">
                <th className="pb-4 pl-4">Notice info</th>
                <th className="pb-4">Targeting</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifs.map(n => (
                <tr key={n.id} className="border-b border-slate-50 last:border-0 group">
                  <td className="py-4 pl-4">
                    <div className="font-bold text-sm">{n.title}</div>
                    <div className="text-xs text-text-muted max-w-sm truncate">{n.message}</div>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <span className="tag">{n.branch}</span>
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{n.role}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase tracking-wider">Sent</span>
                  </td>
                  <td className="py-4 pr-4 transition-all group-hover:opacity-100 opacity-0 text-right">
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
