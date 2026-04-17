import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Bell, 
  Trophy, 
  Cpu, 
  HardHat, 
  Settings2, 
  Zap, 
  User, 
  Link as LinkIcon, 
  FileText, 
  Image as ImageIcon, 
  PlusCircle, 
  Settings,
  ArrowRight,
  TrendingUp,
  LayoutGrid
} from 'lucide-react';
import { Branch, Notification, Achievement, Profile } from '@/src/types';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/src/lib/utils';
import { subscribeToNotifications } from '@/src/lib/firestore-utils';
import { useAuth } from '@/src/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";

const branchConfig: Record<string, { name: string; icon: any; color: string; accent: string }> = {
  CSE: { name: 'Computer Science & Engineering', icon: Cpu, color: 'bg-navy', accent: 'text-accent-orange' },
  Civil: { name: 'Civil Engineering', icon: HardHat, color: 'bg-accent-orange', accent: 'text-navy' },
  Mechanical: { name: 'Mechanical Engineering', icon: Settings2, color: 'bg-slate-800', accent: 'text-accent-orange' },
  EE: { name: 'Electrical Engineering', icon: Zap, color: 'bg-amber-600', accent: 'text-white' },
  ECE: { name: 'Electronics & Communication', icon: Zap, color: 'bg-cyan-700', accent: 'text-white' },
};

export const BranchHome: React.FC = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const config = branchConfig[branchId || 'CSE'];
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leadership, setLeadership] = useState<Profile[]>([]);
  const { user } = useAuth();

  const isStaff = user && ['super_admin', 'tpo_admin', 'hod_admin', 'admin', 'staff'].includes(user.role);

  useEffect(() => {
    const unsubscribe = subscribeToNotifications((notifs) => {
      const filtered = notifs.filter(n => n.branch === branchId || n.branch === 'All');
      setNotifications(filtered);
    });
    fetchBranchStaticData();
    return () => unsubscribe();
  }, [branchId]);

  const fetchBranchStaticData = async () => {
    if (branchId === 'Civil') {
      setLeadership([
        { 
          id: 'lead-1', 
          name: 'MR. MUKESH KUMAR ROY', 
          designation: 'HOD', 
          branch: 'Civil', 
          image_url: 'https://i.pinimg.com/736x/6e/60/e4/6e60e4dc56bc5dc246371e317fe13852.jpg',
          updated_at: new Date().toISOString() 
        },
        { 
          id: 'lead-2', 
          name: 'DR. SHIVANGI SAXENA', 
          designation: 'TPO_HEAD', 
          branch: 'Civil', 
          image_url: 'https://i.pinimg.com/736x/b3/d3/52/b3d3520eb64af0c0588b831f49fc5eb8.jpg',
          updated_at: new Date().toISOString() 
        },
      ]);
    } else {
      setLeadership([
        { id: '1', name: `Dr. Amit Kumar`, designation: 'HOD', branch: branchId as Branch, updated_at: new Date().toISOString() },
        { id: '2', name: `Prof. Smita Singh`, designation: 'TPO_HEAD', branch: branchId as Branch, updated_at: new Date().toISOString() },
      ]);
    }

    setAchievements([
      { id: '1', title: `${branchId} Innovation Award`, description: 'Granted to 5 teams for outstanding project work in the annual research exhibition.', student_name: 'Final Year Students', batch: '2025', date: '2024-03-01' },
      { id: '2', title: `Best Paper Presentation`, description: 'Awarded for the work on sustainable engineering technologies.', student_name: 'Aditya & Team', batch: '2024', date: '2024-01-15' },
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
      case 'link': return 'External Resource';
      case 'pdf': return 'Official Document';
      case 'photo': return 'Gallery';
      default: return 'View File';
    }
  };

  return (
    <div className="space-y-0 animate-in fade-in duration-700">
      {/* Branch Navigation */}
      <div className="sticky top-[72px] md:top-[88px] z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-center gap-12">
          <a href="#home" className="text-[10px] font-black uppercase tracking-[0.2em] text-navy hover:text-accent-orange transition-colors">Home</a>
          <a href="#leadership" className="text-[10px] font-black uppercase tracking-[0.2em] text-navy hover:text-accent-orange transition-colors">Mentors</a>
          <a href="#achievements" className="text-[10px] font-black uppercase tracking-[0.2em] text-navy hover:text-accent-orange transition-colors">Achievements</a>
          <a href="#notifications" className="text-[10px] font-black uppercase tracking-[0.2em] text-navy hover:text-accent-orange transition-colors">Notifications</a>
        </div>
      </div>

      {/* Branch Banner */}
      <section id="home" className={cn("relative py-32 px-6 overflow-hidden flex flex-col items-center justify-center text-center text-white", config.color)}>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-25 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.3)_0%,transparent_70%)]"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto relative z-10 space-y-8"
        >
          <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 uppercase tracking-[0.3em] font-black text-[9px] px-6 py-1.5 shadow-2xl">
            Established 2018
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
            DEPARTMENT <br /> 
            <span className={cn("italic", config.accent)}>OF {branchId}</span>
          </h1>
          <div className="w-24 h-2 bg-white/20 mx-auto rounded-full blur-[1px]"></div>
          <p className="text-white/70 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed italic">
            Engineering the future through specialized domain excellence and integrated professional training at GEC Vaishali.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        {/* Leadership Section */}
        <section id="leadership">
          <div className="flex flex-col items-center mb-20 text-center">
            <Badge variant="outline" className="border-accent-orange text-accent-orange font-black uppercase text-[9px] tracking-widest px-4 py-1 mb-4">Leadership</Badge>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-navy leading-none">
              FACULTY <span className="text-accent-orange italic">MENTORS</span>
            </h2>
            <p className="text-slate-400 font-medium italic mt-4 max-w-md">Guiding the academic and professional journey of our future engineers.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 max-w-5xl mx-auto">
            {leadership.map((prof, idx) => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={prof.id} 
                className="group relative"
              >
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative">
                  <img 
                    src={prof.image_url || `https://picsum.photos/seed/${branchId}-lead-${idx}/800/1000`} 
                    alt={prof.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-10 left-0 w-full text-center px-8 space-y-1">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white drop-shadow-lg">{prof.name}</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-orange italic">
                       {prof.designation === 'HOD' ? 'HEAD OF DEPARTMENT' : 'TPO COORDINATOR'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7 space-y-20">
            {/* Branch Achievements */}
            <section id="achievements" className="space-y-12">
              <div className="space-y-2">
                <Badge className="bg-navy text-white font-black uppercase text-[9px] tracking-widest">Achievements</Badge>
                <h2 className="text-3xl font-black uppercase tracking-tight text-navy italic">
                  RECENT <span className="text-accent-orange">LAURELS</span>
                </h2>
              </div>
              
              <div className="space-y-8">
                {achievements.map((ach) => (
                  <Card key={ach.id} className="group hover:border-accent-orange/30 transition-all duration-500 rounded-[2.5rem] overflow-hidden border-slate-100 shadow-xl shadow-slate-200/40 bg-white">
                    <CardContent className="p-8 flex items-start gap-8">
                       <div className="w-16 h-16 rounded-2xl bg-slate-50 flex flex-col items-center justify-center border border-slate-100 shrink-0 group-hover:bg-accent-orange/10 transition-colors">
                         <span className="text-xs font-black text-slate-300 group-hover:text-accent-orange italic">Class</span>
                         <span className="text-xl font-black text-navy italic">{ach.batch.slice(-2)}</span>
                       </div>
                       <div className="space-y-3">
                         <h4 className="text-xl font-black uppercase tracking-tight text-navy italic group-hover:text-accent-orange transition-colors">
                           {ach.title}
                         </h4>
                         <p className="text-slate-500 text-sm italic font-medium leading-relaxed">
                           {ach.description}
                         </p>
                         <div className="flex items-center gap-2 pt-2">
                            <User size={12} className="text-accent-orange" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                              {ach.student_name}
                            </span>
                         </div>
                       </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Branch Notices */}
          <div id="notifications" className="lg:col-span-5 space-y-20">
            <section className="space-y-12">
              <div className="flex justify-between items-end border-b-2 border-slate-100 pb-4">
                <div className="space-y-1">
                   <h2 className="text-2xl font-black uppercase tracking-tight text-navy">
                    DEPARTMENT <span className="text-accent-orange">NOTICES</span>
                  </h2>
                </div>
                {isStaff && (
                  <Button asChild size="sm" variant="outline" className="rounded-xl border-accent-orange/20 text-accent-orange hover:bg-accent-orange hover:text-navy">
                    <Link to={`/admin/notifications?branch=${branchId}`}>
                      <PlusCircle size={14} className="mr-2" /> CREATE
                    </Link>
                  </Button>
                )}
              </div>

              <div className="space-y-10 pl-4 border-l border-slate-100">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div key={notif.id} className="group relative pb-10 last:pb-0">
                      <div className="absolute -left-[1.3125rem] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-200 border-2 border-white group-hover:bg-accent-orange transition-colors"></div>
                      <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] italic mb-3">
                        Posted {formatDistanceToNow(new Date(notif.created_at))} ago
                      </div>
                      <h4 className="text-lg font-black uppercase tracking-tighter text-navy group-hover:text-accent-orange transition-colors mb-4 italic leading-tight">
                        {notif.title}
                      </h4>
                      <p className="text-slate-500 text-[13px] leading-relaxed italic font-medium">{notif.message}</p>
                      
                      {notif.attachment_url && (
                        <div className="mt-4">
                          <Button asChild variant="ghost" size="sm" className="h-8 rounded-lg hover:bg-slate-50 group/att">
                            <a 
                              href={notif.attachment_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              {getAttachmentIcon(notif.attachment_type)}
                              <span className="text-[9px] font-black uppercase tracking-widest text-navy">
                                {getAttachmentLabel(notif.attachment_type)}
                              </span>
                              <ArrowRight size={12} className="opacity-0 group-hover/att:opacity-100 translate-x-[-4px] group-hover/att:translate-x-0 transition-all" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-left py-8 text-slate-400 italic text-sm font-medium">
                    No active updates for this department.
                  </div>
                )}
              </div>
            </section>
            
            {/* Department Quick Stats Card */}
            <Card className="bg-navy rounded-[3rem] p-10 text-white shadow-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent-orange/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700"></div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-8 relative z-10 flex items-center gap-3">
                 <LayoutGrid className="text-accent-orange" />
                 QUICK METRICS
              </h3>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-white/5 p-6 rounded-[2rem] backdrop-blur-md border border-white/10 space-y-1">
                  <div className="text-3xl font-black text-accent-orange italic tracking-tighter">60+</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Student Intake</div>
                </div>
                <div className="bg-white/5 p-6 rounded-[2rem] backdrop-blur-md border border-white/10 space-y-1">
                  <div className="text-3xl font-black text-accent-orange italic tracking-tighter">12+</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Specialized Labs</div>
                </div>
                <div className="bg-white/5 p-6 rounded-[2rem] backdrop-blur-md border border-white/10 space-y-1">
                  <div className="text-3xl font-black text-accent-orange italic tracking-tighter">25+</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Core Projects</div>
                </div>
                <div className="bg-white/5 p-6 rounded-[2rem] backdrop-blur-md border border-white/10 space-y-1">
                  <div className="text-3xl font-black text-accent-orange italic tracking-tighter">98%</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Placement Ratio</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Placement List Section for Civil */}
        {branchId === 'Civil' && (
          <div className="space-y-32">
            <section className="space-y-16">
              <div className="flex flex-col items-center text-center space-y-4">
                <Badge className="bg-accent-orange text-navy uppercase font-black text-[9px] px-6 py-1.5 rounded-full">Excellence</Badge>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-navy leading-none font-serif">
                   CIVIL <span className="text-accent-orange italic">LEGENDS</span>
                </h2>
                <p className="text-slate-400 font-medium italic max-w-lg">Batch 2026 - Hall of Fame: Defining the future of infrastructure.</p>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto rounded-[4rem] overflow-hidden shadow-3xl border-[12px] border-white group relative"
              >
                <img 
                  src="https://i.pinimg.com/736x/b9/09/8b/b9098b4435a6af40f82f7072c8941590.jpg" 
                  alt="2026 Batch Placement List" 
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[4rem]"></div>
              </motion.div>
            </section>

            {/* Mock Interview Season Section */}
            <section className="space-y-16">
              <div className="flex flex-col items-center text-center space-y-4">
                <Badge className="bg-navy text-white uppercase font-black text-[9px] px-6 py-1.5 rounded-full">Development</Badge>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-navy leading-none">
                   MOCK INTERVIEW <span className="text-accent-orange italic">SERIES</span>
                </h2>
                <p className="text-slate-400 font-medium italic max-w-lg">Transforming academic potential into professional precision through rigorous simulations.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white aspect-square lg:aspect-video relative group"
                >
                  <img 
                    src="https://i.pinimg.com/736x/60/1d/bf/601dbfb9abb98aa44e1a31eda6a6812b.jpg" 
                    alt="Mock Interview 1" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors"></div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white aspect-square lg:aspect-video relative group"
                >
                  <img 
                    src="https://i.pinimg.com/736x/d4/2c/70/d42c70984e73aa4c7203ba7123b2dcf4.jpg" 
                    alt="Mock Interview 2" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors"></div>
                </motion.div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

// Add missing cn import
