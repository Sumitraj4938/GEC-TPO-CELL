import React, { useState } from 'react';
import { User, Plus, Search, Mail, Trash2 } from 'lucide-react';
import { Branch } from '@/src/types';

export const ProfileManager: React.FC = () => {
  const [profiles, setProfiles] = useState([
    { id: '1', name: 'Dr. Amit Kumar', designation: 'HOD', branch: 'CSE', email: 'amit@gecv.ac.in' },
    { id: '2', name: 'Prof. Smita Singh', designation: 'TPO_HEAD', branch: 'CSE', email: 'smita@gecv.ac.in' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Staff & Faculty Profiles</h3>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md">
          <Plus size={18} /> Add Member
        </button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border text-[10px] font-bold text-text-muted uppercase tracking-widest">
                <th className="pb-4 pl-4">Member Info</th>
                <th className="pb-4">Department</th>
                <th className="pb-4">Designation</th>
                <th className="pb-4 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map(p => (
                <tr key={p.id} className="border-b border-slate-50 last:border-0 grow">
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary">
                        <User size={16} />
                      </div>
                      <div>
                        <div className="font-bold text-sm">{p.name}</div>
                        <div className="text-[10px] text-text-muted flex items-center gap-1">
                          <Mail size={10} /> {p.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="tag">{p.branch}</span>
                  </td>
                  <td className="py-4 text-xs font-bold text-text-muted">
                    {p.designation}
                  </td>
                  <td className="py-4 pr-4">
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const AchievementManager: React.FC = () => {
  return (
    <div className="card text-center py-12">
      <h3 className="font-bold text-xl mb-2">Achievement Hub</h3>
      <p className="text-text-muted">Post student success stories, awards, and placement records.</p>
      <div className="mt-8 text-sm opacity-50 italic">Component implementation in progress...</div>
    </div>
  );
};

export const ContentManager: React.FC = () => {
  return (
    <div className="card text-center py-12">
      <h3 className="font-bold text-xl mb-2">Campus Content Studio</h3>
      <p className="text-text-muted">Edit infrastructure details, labs, clubs, and college history.</p>
      <div className="mt-8 text-sm opacity-50 italic">Component implementation in progress...</div>
    </div>
  );
};
