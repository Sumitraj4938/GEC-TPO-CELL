import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Plus, Trash2, Edit2, Check, X, Trophy, FileText, Image as ImageIcon, Settings } from 'lucide-react';
import { Branch, Profile, Achievement, ContentSection } from '@/src/types';
import { 
  subscribeToProfiles, createProfile, updateProfile, deleteProfile,
  subscribeToAchievements, createAchievement, updateAchievement, deleteAchievement,
  subscribeToContent, createContentSection, updateContentSection,
  subscribeToSettings, updateSettings
} from '@/src/lib/firestore-utils';

export const ProfileManager: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Profile>>({ name: '', designation: 'HOD', branch: 'CSE', bio: '', image_url: '' });

  useEffect(() => {
    const unsubscribe = subscribeToProfiles(setProfiles);
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateProfile(editingId, form);
      setEditingId(null);
    } else {
      await createProfile(form);
    }
    setForm({ name: '', designation: 'HOD', branch: 'CSE', bio: '', image_url: '' });
  };

  const handleEdit = (p: Profile) => {
    setEditingId(p.id);
    setForm(p);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this profile?')) await deleteProfile(id);
  };

  return (
    <div className="space-y-8">
      <section className="card">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
          {editingId ? <Edit2 className="text-primary" size={20} /> : <Plus className="text-primary" size={20} />}
          {editingId ? 'Edit Profile' : 'Add Staff Member'}
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            value={form.name} 
            onChange={e => setForm({...form, name: e.target.value})}
            placeholder="Name" 
            className="input-field" 
            required 
          />
          <select 
            value={form.designation} 
            onChange={e => setForm({...form, designation: e.target.value as any})}
            className="input-field"
          >
            <option value="HOD">HOD</option>
            <option value="TPO_HEAD">TPO Head</option>
          </select>
          <select 
            value={form.branch} 
            onChange={e => setForm({...form, branch: e.target.value as any})}
            className="input-field"
          >
            <option value="CSE">CSE</option>
            <option value="Civil">Civil</option>
            <option value="Mechanical">Mechanical</option>
            <option value="EE">EE</option>
            <option value="ECE">ECE</option>
          </select>
          <input 
            value={form.image_url} 
            onChange={e => setForm({...form, image_url: e.target.value})}
            placeholder="Image URL" 
            className="input-field" 
          />
          <textarea 
            value={form.bio} 
            onChange={e => setForm({...form, bio: e.target.value})}
            placeholder="Short Bio" 
            className="input-field md:col-span-2" 
          />
          <div className="md:col-span-2 flex justify-end gap-2">
            {editingId && (
              <button type="button" onClick={() => {setEditingId(null); setForm({});}} className="btn-secondary">Cancel</button>
            )}
            <button type="submit" className="btn-primary">
              {editingId ? <Check size={18} /> : <Plus size={18} />}
              {editingId ? 'Update' : 'Add Member'}
            </button>
          </div>
        </form>
      </section>

      <section className="card overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border text-[10px] font-bold text-text-muted uppercase tracking-widest">
              <th className="pb-4 pl-4">Member</th>
              <th className="pb-4">Branch</th>
              <th className="pb-4">Role</th>
              <th className="pb-4 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map(p => (
              <tr key={p.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                <td className="py-4 pl-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image_url || `https://picsum.photos/seed/${p.id}/100/100`} className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                    <span className="font-bold text-sm">{p.name}</span>
                  </div>
                </td>
                <td className="py-4"><span className="tag">{p.branch}</span></td>
                <td className="py-4 text-xs font-bold text-text-muted">{p.designation}</td>
                <td className="py-4 pr-4">
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(p)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={14}/></button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export const AchievementManager: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Achievement>>({ title: '', description: '', student_name: '', batch: '', date: '', branch: 'CSE' });

  useEffect(() => {
    const unsubscribe = subscribeToAchievements(setAchievements);
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateAchievement(editingId, form);
      setEditingId(null);
    } else {
      await createAchievement(form);
    }
    setForm({ title: '', description: '', student_name: '', batch: '', date: '', branch: 'CSE' });
  };

  return (
    <div className="space-y-8">
      <section className="card">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
          <Trophy className="text-primary" size={20} />
          {editingId ? 'Edit Achievement' : 'Post Achievement'}
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Title" className="input-field md:col-span-2" required />
          <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Description" className="input-field md:col-span-2" rows={3} required />
          <input value={form.student_name} onChange={e => setForm({...form, student_name: e.target.value})} placeholder="Student/Team Name" className="input-field" required />
          <input value={form.batch} onChange={e => setForm({...form, batch: e.target.value})} placeholder="Batch (e.g. 2026)" className="input-field" required />
          <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="input-field" required />
          <select value={form.branch} onChange={e => setForm({...form, branch: e.target.value as any})} className="input-field">
            <option value="CSE">CSE</option>
            <option value="Civil">Civil</option>
            <option value="Mechanical">Mechanical</option>
            <option value="EE">EE</option>
            <option value="ECE">ECE</option>
          </select>
          <div className="md:col-span-2 flex justify-end gap-2">
            {editingId && <button type="button" onClick={() => {setEditingId(null); setForm({});}} className="btn-secondary">Cancel</button>}
            <button type="submit" className="btn-primary">Broadcast Achievement</button>
          </div>
        </form>
      </section>

      <div className="grid grid-cols-1 gap-4">
        {achievements.map(ach => (
          <div key={ach.id} className="card flex justify-between items-center group hover:border-primary transition-all">
            <div>
              <h4 className="font-bold text-base">{ach.title}</h4>
              <p className="text-xs text-text-muted">{ach.student_name} • {ach.batch}</p>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => {setEditingId(ach.id); setForm(ach);}} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={16}/></button>
              <button onClick={() => confirm('Delete?') && deleteAchievement(ach.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ContentManager: React.FC = () => {
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<ContentSection>>({ title: '', content: '' });

  useEffect(() => {
    const unsubscribe = subscribeToContent(setSections);
    return () => unsubscribe();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === 'new') {
      // Need a createContentSection util or use setDoc with a slug
      const slug = form.section_name?.toLowerCase().replace(/\s+/g, '-');
      await createContentSection({ ...form, id: slug });
      setEditingId(null);
      setForm({});
    } else if (editingId) {
      await updateContentSection(editingId, form);
      setEditingId(null);
      setForm({});
    }
  };

  return (
    <div className="space-y-8">
      <section className="card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <FileText className="text-primary" size={20} />
            Site Content Editor
          </h3>
          <button 
            onClick={() => {setEditingId('new'); setForm({ section_name: '', title: '', content: '' });}}
            className="btn-primary py-2 text-xs"
          >
            <Plus size={14} /> New Section
          </button>
        </div>
        <p className="text-xs text-text-muted mb-8 italic">Manage institutional static content like History, About Us, and Infrastructure details.</p>
        
        <div className="space-y-4">
          {sections.map(sec => (
            <div key={sec.id} className="border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary-light px-2 py-1 rounded">{sec.section_name}</span>
                <button 
                  onClick={() => {setEditingId(sec.id); setForm(sec);}}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Edit Section
                </button>
              </div>
              <h4 className="font-bold text-lg mb-2">{sec.title}</h4>
              <p className="text-sm text-text-muted line-clamp-2">{sec.content}</p>
            </div>
          ))}
          {sections.length === 0 && (
              <div className="text-center py-10 opacity-30 italic">No content sections defined yet.</div>
          )}
        </div>
      </section>

      {editingId && (
        <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[2rem] p-8 w-full max-w-2xl shadow-2xl space-y-6"
          >
            <h3 className="text-xl font-bold">{editingId === 'new' ? 'New Content Section' : `Edit: ${form.section_name}`}</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              {editingId === 'new' && (
                <input value={form.section_name} onChange={e => setForm({...form, section_name: e.target.value})} placeholder="Section Name (e.g. About Us)" className="input-field" required />
              )}
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Title" className="input-field" required />
              <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={10} className="input-field" required />
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setEditingId(null)} className="btn-secondary">Close</button>
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export const SettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const [form, setForm] = useState<any>({ college_name: '', logo_url: '', contact_email: '', contact_phone: '', address: '' });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToSettings((data) => {
      if (data) {
        setSettings(data);
        setForm(data);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(form);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <section className="card">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
          <Settings size={20} className="text-primary" />
          Global Portal Settings
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">College Name</label>
            <input value={form.college_name} onChange={e => setForm({...form, college_name: e.target.value})} className="input-field" placeholder="GEC Vaishali" required />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Logo URL</label>
            <input value={form.logo_url} onChange={e => setForm({...form, logo_url: e.target.value})} className="input-field" placeholder="https://..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Contact Email</label>
              <input value={form.contact_email} onChange={e => setForm({...form, contact_email: e.target.value})} className="input-field" placeholder="tpo@gecv.ac.in" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Contact Phone</label>
              <input value={form.contact_phone} onChange={e => setForm({...form, contact_phone: e.target.value})} className="input-field" placeholder="+91 ..." />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Address</label>
            <textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="input-field" rows={3} placeholder="Full campus address..." />
          </div>
          
          <div className="pt-4 flex items-center gap-4">
            <button type="submit" className="btn-primary">Update System Config</button>
            {success && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 font-bold text-xs uppercase tracking-widest italic flex items-center gap-1"><Check size={14}/> Updated Successfully</motion.span>}
          </div>
        </form>
      </section>

      <section className="card bg-slate-50 border-dashed">
        <h4 className="font-bold text-sm mb-4">System Information</h4>
        <dl className="space-y-2 text-xs">
          <div className="flex justify-between"><dt className="text-text-muted">Database Engine</dt><dd className="font-bold">Cloud Firestore</dd></div>
          <div className="flex justify-between"><dt className="text-text-muted">Auth Provider</dt><dd className="font-bold">Firebase Auth</dd></div>
          <div className="flex justify-between"><dt className="text-text-muted">Asset Provider</dt><dd className="font-bold">GECV Cloud Storage</dd></div>
        </dl>
      </section>
    </div>
  );
};
