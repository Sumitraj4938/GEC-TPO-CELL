import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Branch, Notification } from '@/src/types';
import { Send, Trash2, Calendar, Edit2, Link, Image as ImageIcon, FileText, Check, X } from 'lucide-react';
import { format } from 'date-fns';
import { 
  subscribeToNotifications, 
  createNotification, 
  updateNotification, 
  deleteNotification 
} from '@/src/lib/firestore-utils';
import { useAuth } from '@/src/contexts/AuthContext';

export const NotificationManager: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const branchParam = searchParams.get('branch');

  const [notifs, setNotifs] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: '',
    message: '',
    branch: (branchParam as Branch) || 'All' as Branch | 'All',
    batch: 'All',
    role: 'All' as any,
    scheduled: false,
    date: '',
    attachment_url: '',
    attachment_type: 'none' as 'none' | 'link' | 'pdf' | 'photo'
  });

  useEffect(() => {
    if (branchParam) {
      setForm(prev => ({ ...prev, branch: branchParam as Branch }));
    }
  }, [branchParam]);

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToNotifications((data) => {
      setNotifs(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const payload: Omit<Notification, 'id'> = {
      title: form.title,
      message: form.message,
      branch: form.branch as Branch,
      batch: form.batch === 'All' ? undefined : form.batch,
      role: form.role,
      created_at: new Date().toISOString(),
      created_by: user.id,
      is_scheduled: form.scheduled,
      scheduled_for: form.scheduled ? form.date : undefined,
      attachment_url: form.attachment_url || undefined,
      attachment_type: form.attachment_type === 'none' ? undefined : form.attachment_type as any
    };

    if (editingId) {
      await updateNotification(editingId, payload);
      setEditingId(null);
    } else {
      await createNotification(payload);
    }
    
    setForm({ title: '', message: '', branch: 'All', batch: 'All', role: 'All', scheduled: false, date: '', attachment_url: '', attachment_type: 'none' });
  };

  const handleEdit = (n: Notification) => {
    setEditingId(n.id);
    setForm({
      title: n.title,
      message: n.message,
      branch: n.branch || 'All',
      batch: n.batch || 'All',
      role: n.role || 'All',
      scheduled: !!n.is_scheduled,
      date: n.scheduled_for || '',
      attachment_url: n.attachment_url || '',
      attachment_type: n.attachment_type || 'none'
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      await deleteNotification(id);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ title: '', message: '', branch: 'All', batch: 'All', role: 'All', scheduled: false, date: '', attachment_url: '', attachment_type: 'none' });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <section className="card">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
          {editingId ? <Edit2 className="text-primary" size={20} /> : <Send className="text-primary" size={20} />}
          {editingId ? 'Edit Broadcast' : 'Broadcast New Notice'}
        </h3>
        <form onSubmit={handleCreateOrUpdate} className="space-y-4">
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
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Target Batch</label>
                <select 
                  value={form.batch}
                  onChange={e => setForm({...form, batch: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                >
                  <option value="All">All Batches</option>
                  <option value="2024">Batch 2024</option>
                  <option value="2025">Batch 2025</option>
                  <option value="2026">Batch 2026</option>
                  <option value="2027">Batch 2027</option>
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

          {/* Attachment Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Attachment Type</label>
              <select 
                value={form.attachment_type}
                onChange={e => setForm({...form, attachment_type: e.target.value as any})}
                className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="none">None</option>
                <option value="link">Direct Link</option>
                <option value="pdf">PDF URL</option>
                <option value="photo">Photo / Image URL</option>
              </select>
            </div>
            {form.attachment_type !== 'none' && (
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Attachment URL</label>
                <input 
                  type="url"
                  value={form.attachment_url}
                  onChange={e => setForm({...form, attachment_url: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder={`Enter ${form.attachment_type} URL...`}
                  required
                />
              </div>
            )}
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
            <div className="flex items-center gap-2">
              {editingId && (
                <button type="button" onClick={cancelEdit} className="bg-slate-100 text-slate-600 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
              )}
              <button type="submit" className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                {editingId ? <Check size={18} /> : <Send size={18} />}
                {editingId ? 'Save Changes' : 'Broadcast Now'}
              </button>
            </div>
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
                <th className="pb-4">Attachment</th>
                <th className="pb-4 pr-4 border-l border-border pl-4">Actions</th>
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
                    <div className="flex flex-wrap gap-2">
                      <span className="tag">{n.branch}</span>
                      {n.batch && <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{n.batch}</span>}
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{n.role}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    {n.attachment_type === 'link' && <Link size={16} className="text-blue-500" />}
                    {n.attachment_type === 'pdf' && <FileText size={16} className="text-red-500" />}
                    {n.attachment_type === 'photo' && <ImageIcon size={16} className="text-green-500" />}
                    {!n.attachment_type && <span className="text-xs text-slate-400">None</span>}
                  </td>
                  <td className="py-2 pr-4 border-l border-slate-100 pl-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(n)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(n.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {notifs.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-sm text-slate-500">
                    No notifications sent yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

