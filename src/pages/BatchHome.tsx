import React, { useEffect, useState, useMemo } from 'react';
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
  GraduationCap,
  MessageSquare,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { Notification, Achievement } from '@/src/types';
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/src/lib/utils';
import { subscribeToNotifications, subscribeToAchievements } from '@/src/lib/firestore-utils';
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const BatchHome: React.FC = () => {
  const { batchId } = useParams<{ batchId: string }>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  const recruiters = [
    { name: 'METALMAN', logo: 'M' },
    { name: 'KRISHNA AUTOMATION', logo: '▲' },
    { name: 'ICON POWER SOLUTIONS', logo: '▲' },
    { name: 'YOKOHAMA', logo: '▲', sub: 'Off-Highway Tires' },
    { name: 'SMART TECHLINK', logo: '≡' },
    { name: 'PlanetSpark', logo: 'PlanetSpark', sub: 'EdTech' },
    { name: 'TATA MOTORS', logo: 'Φ' },
    { name: 'indus TOWERS', logo: 'indus' },
    { name: 'SANSERA ENGINEERING', logo: 'SANSERA' },
    { name: 'BLUECOLD REFRIGERATION', logo: '▲ BLUECOLD' },
    { name: 'VARROC', logo: '●' },
    { name: 'ecospace INFRASTRUCTURES', logo: 'ecospace' },
    { name: 'Growupp', logo: 'Growupp' },
    { name: 'HCL', logo: 'HCL' },
  ];

  const chartData = [
    { name: 'BATCH 18', value: 22 },
    { name: 'BATCH 19', value: 45 },
    { name: 'BATCH 20', value: 53 },
  ];

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
    <div className="bg-[#fcfcfc] min-h-screen animate-in fade-in duration-700">
      {/* Batch Navigation */}
      <div className="sticky top-[72px] md:top-[88px] z-40 bg-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg md:block">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
           <div className="flex items-center gap-2">
             <Badge className="bg-accent-orange text-navy font-black text-[8px] uppercase tracking-tighter">Portal {batchId}</Badge>
           </div>
           <nav className="flex items-center gap-8">
            <a href="#home" className="text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-accent-orange transition-colors">Home</a>
            <a href="#leadership" className="text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-accent-orange transition-colors">Leadership</a>
            <a href="#recruiters" className="text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-accent-orange transition-colors">Recruiters</a>
            <a href="#achievements" className="text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-accent-orange transition-colors">Achievements</a>
            <a href="#notifications" className="text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-accent-orange transition-colors">Notification</a>
           </nav>
        </div>
      </div>

      {/* Styled Hero Section matching screenshot */}
      <section id="home" className="relative py-24 md:py-32 px-6 overflow-hidden flex flex-col items-center justify-center text-center text-white bg-navy">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-25 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.4)_0%,transparent_70%)]"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto relative z-10 space-y-6"
        >
          <Badge className="bg-white/10 backdrop-blur-md text-white/80 border-white/20 uppercase tracking-[0.2em] font-black text-[9px] px-5 py-1.5">
            CAREER PORTAL FROM {parseInt(batchId || '2026') - 3}
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.9] uppercase">
            Step Into Your <span className="text-accent-orange">Future</span>
          </h1>
          <p className="text-white/60 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed italic uppercase tracking-wider">
            Empowering the engineers of tomorrow by bridging the gap between academic excellence and industry standards.
          </p>
        </motion.div>
      </section>

      {/* Leadership Messages Section (Alternating) */}
      <section id="leadership" className="max-w-7xl mx-auto px-6 py-20 md:py-32 space-y-32">
        {/* Message by HOD Sir */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            <div className="absolute -left-4 top-0 w-1 h-full bg-accent-orange rounded-full"></div>
            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 relative group overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent-orange/5 rounded-full blur-3xl group-hover:bg-accent-orange/10 transition-all duration-500"></div>
               <div className="flex items-center gap-4 mb-8">
                 <h2 className="text-2xl md:text-4xl font-black italic text-navy">Message by <span className="text-accent-orange underline decoration-[4px] underline-offset-8">HOD Sir</span></h2>
                 <div className="h-1 w-12 bg-accent-orange rounded-full"></div>
               </div>
               <p className="text-slate-500 text-base md:text-lg leading-relaxed italic font-medium">
                 "Welcome to the engineering department's career gateway. Our curriculum is designed to push the boundaries of traditional learning, integrating modern engineering practices with core theoretical foundations. We ensure every student in Batch {batchId} is ready to solve real-world challenges."
               </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-6 text-center"
          >
            <div className="relative inline-block group">
              <div className="absolute -inset-4 bg-accent-orange/10 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src="https://picsum.photos/seed/hod-gec/600/600" 
                alt="HOD Sir" 
                className="w-64 h-80 md:w-80 md:h-[28rem] object-cover rounded-[2.5rem] shadow-2xl relative z-10 border-4 border-white"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1 relative z-10">
              <h3 className="text-2xl font-black uppercase text-navy italic">MR. MUKESH KUMAR ROY</h3>
              <p className="text-[10px] font-black text-accent-orange uppercase tracking-[0.3em]">HOD, Engineering Department</p>
            </div>
          </motion.div>
        </div>

        {/* Message by TPO Head */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6 text-center"
          >
            <div className="relative inline-block group">
              <div className="absolute -inset-4 bg-accent-orange/10 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src="https://picsum.photos/seed/tpo-gec/600/600" 
                alt="TPO Head" 
                className="w-64 h-80 md:w-80 md:h-[28rem] object-cover rounded-[2.5rem] shadow-2xl relative z-10 border-4 border-white"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1 relative z-10">
              <h3 className="text-2xl font-black uppercase text-navy italic tracking-tight">DR. SHIVANGI SAXENA</h3>
              <p className="text-[10px] font-black text-accent-orange uppercase tracking-[0.3em]">TPO HEAD, GEC VAISHALI</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -right-4 top-0 w-1 h-full bg-accent-orange rounded-full"></div>
            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 relative group overflow-hidden">
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-orange/5 rounded-full blur-3xl group-hover:bg-accent-orange/10 transition-all duration-500"></div>
               <div className="flex items-center gap-4 mb-8">
                 <div className="h-1 w-12 bg-accent-orange rounded-full"></div>
                 <h2 className="text-2xl md:text-4xl font-black italic text-navy">Message by <span className="text-accent-orange underline decoration-[4px] underline-offset-8">TPO Head</span></h2>
               </div>
               <p className="text-slate-500 text-[13px] md:text-[15px] leading-relaxed italic font-medium">
                 "It gives us immense pleasure to extend to you a cordial invitation to participate in the campus placement process of GEC Vaishali. With a state-of-the-art infrastructure, highly dedicated team of faculty and with well equipped laboratory setup, GEC Vaishali provides a highly conductive environment for teaching and learning process. The students of Batch {batchId} are outperforming not only in the area of academics but at the same time are benchmarking in various co-curricular activities at the state and national level. We have well defined multi-focused training plans to ensure that wherever they get placed, they fit intellectually to sustain mutual benefits."
               </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recruiters Section */}
      <section id="recruiters" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
          <div className="text-center space-y-4">
             <div className="h-1 w-16 bg-accent-orange mx-auto rounded-full"></div>
             <h2 className="text-4xl md:text-6xl font-black text-navy italic tracking-tighter uppercase">Our Past <span className="text-accent-orange">Recruiters</span></h2>
             <p className="text-slate-400 font-bold italic uppercase tracking-widest text-[11px]">Companies that have trusted GEC Vaishali talent</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {recruiters.map((company, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl font-black text-navy mb-3 group-hover:scale-110 transition-transform">{company.logo}</div>
                <div className="text-[10px] font-black text-navy uppercase tracking-tighter leading-tight">{company.name}</div>
                {company.sub && <div className="text-[8px] font-bold text-slate-400 italic mt-1">{company.sub}</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Interaction Chart Section */}
      <section className="py-24 md:py-32 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          <div className="text-center space-y-4">
             <div className="h-1 w-16 bg-accent-orange mx-auto rounded-full"></div>
             <h2 className="text-4xl md:text-6xl font-black text-navy italic tracking-tighter uppercase leading-none">Strong Interaction <br /> <span className="text-accent-orange">With Industry</span></h2>
             <p className="text-slate-400 font-bold italic uppercase tracking-widest text-[11px]">Regular Visit of Companies for Placement of Students</p>
          </div>

          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-slate-100">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 900 }} 
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-navy p-4 rounded-xl shadow-2xl border border-white/10">
                            <p className="text-white font-black text-xs uppercase tracking-widest">{payload[0].payload.name}</p>
                            <p className="text-accent-orange text-2xl font-black italic">{payload[0].value} Companies</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={80}>
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.value > 40 ? '#4ade80' : entry.value > 25 ? '#22c55e' : '#86efac'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-12 space-y-1">
               <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] italic">Number of companies visiting for placements — Year over Year Growth</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7 space-y-20">
            {/* Batch Achievements */}
            <section id="achievements" className="scroll-mt-32 space-y-12">
              <div className="space-y-2">
                <Badge className="bg-navy text-white font-black uppercase text-[9px] tracking-widest">Hall of Fame</Badge>
                <h2 className="text-3xl font-black uppercase tracking-tight text-navy italic">
                  BATCH <span className="text-accent-orange">LAURELS</span>
                </h2>
              </div>
              
              <div className="space-y-8">
                {achievements.length > 0 ? achievements.map((ach) => (
                  <Card key={ach.id} className="group hover:border-accent-orange/30 transition-all duration-500 rounded-[2.5rem] overflow-hidden border-slate-100 shadow-xl shadow-slate-200/40 bg-white">
                    <CardContent className="p-8 flex items-start gap-8">
                       <div className="w-16 h-16 rounded-2xl bg-navy flex flex-col items-center justify-center border border-slate-100 shrink-0 group-hover:bg-accent-orange transition-all">
                         <Trophy size={24} className="text-accent-orange group-hover:text-navy transition-colors" />
                       </div>
                       <div className="space-y-3">
                         <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-accent-orange text-accent-orange text-[8px] font-black uppercase">{ach.branch}</Badge>
                            <span className="text-[10px] font-bold text-slate-300 italic">{ach.date ? format(new Date(ach.date), 'MMMM yyyy') : 'N/A'}</span>
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
                )) : (
                  <div className="text-left py-8 text-slate-400 italic text-sm font-medium">No recorded achievements for class of {batchId} yet.</div>
                )}
              </div>
            </section>
          </div>

          {/* Batch Notifications */}
          <div className="lg:col-span-5 space-y-20">
            <section id="notifications" className="scroll-mt-32 space-y-12">
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
                        Posted {notif.created_at ? formatDistanceToNow(new Date(notif.created_at)) : 'unknown time'} ago
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
