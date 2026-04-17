import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Bell, Trophy, Cpu, HardHat, Settings2, Zap, User, Link as LinkIcon, FileText, Image as ImageIcon } from 'lucide-react';
import { Branch, Notification, Achievement, Profile } from '@/src/types';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/src/lib/utils';

const branchConfig: Record<string, { name: string; icon: any; color: string }> = {
  CSE: { name: 'Computer Science & Engineering', icon: Cpu, color: 'bg-navy' },
  Civil: { name: 'Civil Engineering', icon: HardHat, color: 'bg-accent-orange' },
  Mechanical: { name: 'Mechanical Engineering', icon: Settings2, color: 'bg-slate-800' },
  EE: { name: 'Electrical Engineering', icon: Zap, color: 'bg-amber-600' },
  ECE: { name: 'Electronics & Communication', icon: Zap, color: 'bg-cyan-700' },
};

export const BranchHome: React.FC = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const config = branchConfig[branchId || 'CSE'];
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leadership, setLeadership] = useState<Profile[]>([]);

  useEffect(() => {
    fetchBranchData();
  }, [branchId]);

  const fetchBranchData = async () => {
    // Mock data for branch-specific view
    setNotifications([
      { id: '1', title: `Message from HOD ${branchId}`, message: `Welcome to the ${config.name} department dashboard. We have some exciting updates for the upcoming semester regarding placements and industrial visits.`, branch: branchId as Branch, role: 'All', created_at: new Date().toISOString(), created_by: 'hod', is_scheduled: false },
      { id: '2', title: `TPO update - ${branchId}`, message: `New recruitment drive scheduled for final year students. Check eligibility in the placement cell.`, branch: branchId as Branch, role: 'All', created_at: new Date(Date.now() - 3600000 * 24).toISOString(), created_by: 'tpo', is_scheduled: false, attachment_type: 'pdf', attachment_url: 'https://example.com/eligibility.pdf' },
    ]);

    setAchievements([
      { id: '1', title: `${branchId} Innovation Award`, description: 'Granted to 5 teams for outstanding project work in the annual research exhibition.', student_name: 'Final Year Students', batch: '2025', date: '2024-03-01' },
      { id: '2', title: `Best Paper Presentation`, description: 'Awarded for the work on sustainable engineering technologies.', student_name: 'Aditya & Team', batch: '2024', date: '2024-01-15' },
    ]);

    setLeadership([
      { id: '1', name: `Dr. Amit Kumar`, designation: 'HOD', branch: branchId as Branch, updated_at: new Date().toISOString() },
      { id: '2', name: `Prof. Smita Singh`, designation: 'TPO_HEAD', branch: branchId as Branch, updated_at: new Date().toISOString() },
    ]);
  };

  const getAttachmentIcon = (type: string | undefined) => {
    switch (type) {
      case 'link': return <LinkIcon size={14} className="text-blue-500" />;
      case 'pdf': return <FileText size={14} className="text-red-500" />;
      case 'photo': return <ImageIcon size={14} className="text-green-500" />;
      default: return null;
    }
  };

  const getAttachmentLabel = (type: string | undefined) => {
    switch (type) {
      case 'link': return 'External Link';
      case 'pdf': return 'View PDF';
      case 'photo': return 'View Image';
      default: return 'Attachment';
    }
  };

  return (
    <div className="space-y-0">
      {/* Branch Banner */}
      <section className={cn("hero-card", config.color)}>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_70%)]"></div>
        <div className="max-w-4xl mx-auto relative z-10 px-6">
          <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest mb-8 italic">
            Department established 2018
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8">
            {config.name}
          </h1>
          <div className="w-20 h-2 bg-white/30 mx-auto rounded-full mb-8"></div>
          <p className="text-white/80 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed italic">
            Committed to excellence in technical education and producing globally competent engineers.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-32">
        {/* Leadership Section */}
        <section>
          <div className="flex flex-col items-center mb-16">
            <div className="w-16 h-1 bg-accent-orange rounded-full mb-6"></div>
            <h2 className="section-heading tracking-tight mb-4">DEPARTMENT LEADERSHIP</h2>
            <p className="text-sm font-bold text-text-muted italic opacity-60">The pillars of academic and professional guidance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {leadership.map((prof, idx) => (
              <div key={prof.id} className="flex flex-col items-center">
                <div className="faculty-card group">
                  <img 
                    src={`https://picsum.photos/seed/${branchId}-lead-${idx}/400/500`} 
                    alt={prof.name} 
                    className="faculty-img"
                    referrerPolicy="no-referrer"
                  />
                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-text-dark">{prof.name}</h3>
                    <p className="text-[10px] font-black uppercase italic tracking-widest text-accent-orange">
                       {prof.designation === 'HOD' ? 'HEAD OF DEPARTMENT' : 'TPO HEAD'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-24">
          <div className="lg:col-span-2 space-y-16">
            {/* Branch Achievements */}
            <section>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter text-text-dark mb-10 border-l-8 border-accent-orange pl-6">
                RECENT ACHIEVEMENTS
              </h2>
              <div className="space-y-8">
                {achievements.map((ach) => (
                  <motion.div 
                    whileHover={{ x: 10 }}
                    key={ach.id} 
                    className="card p-8 bg-white group hover:shadow-2xl transition-all border-l-4 border-l-accent-orange"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center font-black text-accent-orange border border-slate-100 italic">
                        {ach.batch.slice(-2)}
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xl font-black uppercase tracking-tighter text-text-dark italic">{ach.title}</h4>
                        <p className="text-text-muted italic text-sm leading-relaxed">{ach.description}</p>
                        <div className="text-[10px] font-black text-accent-orange uppercase tracking-widest">
                          {ach.student_name} • BATCH {ach.batch}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Branch Notices */}
          <div className="space-y-16">
            <section>
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-text-dark mb-10 border-l-6 border-navy pl-4">
                DEPARTMENT NOTICES
              </h2>
              <div className="space-y-10">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div key={notif.id} className="group border-b border-slate-100 pb-8 last:border-0">
                      <div className="text-[10px] font-black text-text-muted/40 uppercase tracking-[0.2em] italic mb-3">
                        {formatDistanceToNow(new Date(notif.created_at))} AGO
                      </div>
                      <h4 className="text-base font-black uppercase tracking-tighter text-text-dark group-hover:text-accent-orange transition-colors mb-4 italic">
                        {notif.title}
                      </h4>
                      <p className="text-text-muted text-[13px] leading-relaxed italic whitespace-pre-wrap">{notif.message}</p>
                      
                      {notif.attachment_url && (
                        <div className="mt-3 flex items-center">
                          <a 
                            href={notif.attachment_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[10px] font-bold px-3 py-1.5 rounded bg-slate-50 border border-slate-200 hover:border-primary hover:text-primary transition-colors text-text-dark uppercase tracking-widest"
                          >
                            {getAttachmentIcon(notif.attachment_type)}
                            {getAttachmentLabel(notif.attachment_type)}
                          </a>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-left py-8 text-text-muted italic text-sm">
                    No notifications for this department.
                  </div>
                )}
              </div>
            </section>
            
            <div className="bg-navy p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
              <h3 className="text-xl font-black uppercase italic tracking-tighter mb-4 relative z-10">QUICK STATS</h3>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="text-2xl font-black text-accent-orange italic">60+</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-white/40">SEATS</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="text-2xl font-black text-accent-orange italic">12+</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-white/40">LABS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add missing cn import
import { cn } from '@/src/lib/utils';
