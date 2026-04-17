import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Bell, 
  Trophy, 
  User, 
  Link as LinkIcon, 
  FileText, 
  Image as ImageIcon, 
  ArrowRight,
  TrendingUp,
  LayoutGrid,
  Calendar,
  GraduationCap
} from 'lucide-react';
import { Notification, Achievement } from '@/src/types';
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/src/lib/utils';
import { subscribeToNotifications, subscribeToAchievements } from '@/src/lib/firestore-utils';
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";

export const BatchHome: React.FC = () => {
  const { batchId } = useParams<{ batchId: string }>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubNotifs = subscribeToNotifications((notifs) => {
      const filtered = notifs.filter(n => n.batch === batchId || n.batch === 'All');
      setNotifications(filtered);
    });

    const unsubAchievements = subscribeToAchievements((achs) => {
      const filtered = achs.filter(a => a.batch === batchId);
      setAchievements(filtered as Achievement[]);
      setLoading(false);
    });

    return () => {
      unsubNotifs();
      unsubAchievements();
    };
  }, [batchId]);

  const getAttachmentIcon = (type: string | undefined) => {
    switch (type) {
      case 'link': return <LinkIcon size={14} className="text-blue-500" />;
      case 'pdf': return <FileText size={14} className="text-red-500" />;
      case 'photo': return <ImageIcon size={14} className="text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-0 animate-in fade-in duration-700">
      {/* Batch Navigation */}
      <div className="sticky top-[72px] md:top-[88px] z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-center gap-12">
          <a href="#home" className="text-[10px] font-black uppercase tracking-[0.2em] text-navy hover:text-accent-orange transition-colors">Portal Home</a>
          <a href="#achievements" className="text-[10px] font-black uppercase tracking-[0.2em] text-navy hover:text-accent-orange transition-colors">Achievements</a>
          <a href="#notifications" className="text-[10px] font-black uppercase tracking-[0.2em] text-navy hover:text-accent-orange transition-colors">Notices</a>
        </div>
      </div>

      {/* Batch Hero Banner */}
      <section id="home" className="relative py-32 px-6 overflow-hidden flex flex-col items-center justify-center text-center text-white bg-navy">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.3)_0%,transparent_70%)]"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto relative z-10 space-y-8"
        >
          <div className="flex justify-center mb-6">
             <div className="w-20 h-20 rounded-full bg-accent-orange/20 border-2 border-accent-orange flex items-center justify-center">
               <GraduationCap size={40} className="text-accent-orange" />
             </div>
          </div>
          <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 uppercase tracking-[0.3em] font-black text-[9px] px-6 py-1.5 shadow-2xl">
            Institutional Batch Portal
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
            CLASS OF <br /> 
            <span className="italic text-accent-orange">{batchId}</span>
          </h1>
          <div className="w-24 h-2 bg-white/20 mx-auto rounded-full blur-[1px]"></div>
          <p className="text-white/70 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed italic">
            Dedicated career and placement ecosystem for the Batch of {batchId}. Track your progress, achievements, and official notices here.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        
        {/* Quick Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <Card className="bg-white border-slate-100 shadow-xl rounded-[2rem] p-8 flex items-center gap-6">
              <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center text-accent-orange">
                <Users size={32} />
              </div>
              <div className="space-y-1">
                <h4 className="text-3xl font-black text-navy italic">300+</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Candidates</p>
              </div>
           </Card>
           <Card className="bg-white border-slate-100 shadow-xl rounded-[2rem] p-8 flex items-center gap-6">
              <div className="w-16 h-16 bg-accent-orange rounded-2xl flex items-center justify-center text-navy">
                <TrendingUp size={32} />
              </div>
              <div className="space-y-1">
                <h4 className="text-3xl font-black text-navy italic">85%</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Placement Rate</p>
              </div>
           </Card>
           <Card className="bg-white border-slate-100 shadow-xl rounded-[2rem] p-8 flex items-center gap-6">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-navy">
                <Calendar size={32} />
              </div>
              <div className="space-y-1">
                <h4 className="text-3xl font-black text-navy italic">45+</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Drives Conducted</p>
              </div>
           </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7 space-y-20">
            {/* Batch Achievements */}
            <section id="achievements" className="space-y-12">
              <div className="space-y-2">
                <Badge className="bg-navy text-white font-black uppercase text-[9px] tracking-widest">Hall of Fame</Badge>
                <h2 className="text-3xl font-black uppercase tracking-tight text-navy italic">
                  BATCH <span className="text-accent-orange">LAURELS</span>
                </h2>
              </div>
              
              <div className="space-y-8">
                {achievements.map((ach) => (
                  <Card key={ach.id} className="group hover:border-accent-orange/30 transition-all duration-500 rounded-[2.5rem] overflow-hidden border-slate-100 shadow-xl shadow-slate-200/40 bg-white">
                    <CardContent className="p-8 flex items-start gap-8">
                       <div className="w-16 h-16 rounded-2xl bg-navy flex flex-col items-center justify-center border border-slate-100 shrink-0 group-hover:bg-accent-orange transition-all">
                         <Trophy size={24} className="text-accent-orange group-hover:text-navy transition-colors" />
                       </div>
                       <div className="space-y-3">
                         <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-accent-orange text-accent-orange text-[8px] font-black uppercase">{ach.branch}</Badge>
                            <span className="text-[10px] font-bold text-slate-300 italic">{format(new Date(ach.date), 'MMMM yyyy')}</span>
                         </div>
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

          {/* Batch Notifications */}
          <div id="notifications" className="lg:col-span-5 space-y-20">
            <section className="space-y-12">
              <div className="flex justify-between items-end border-b-2 border-slate-100 pb-4">
                <div className="space-y-1">
                   <h2 className="text-2xl font-black uppercase tracking-tight text-navy">
                    OFFICIAL <span className="text-accent-orange">NOTICES</span>
                  </h2>
                </div>
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
                                View Reference
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
                    No active updates for Class of {batchId}.
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
