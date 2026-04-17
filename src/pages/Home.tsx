import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Briefcase, 
  ChevronRight,
  Quote,
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

const recruiters = [
  { name: 'METALMAN', domain: 'metalmanauto.com' },
  { name: 'KRISHNA AUTOMATION', domain: 'krishnaautomation.com' },
  { name: 'ICON POWER SOLUTIONS', domain: 'iconpower.in' },
  { name: 'YOKOHAMA', domain: 'yokohama-india.com' },
  { name: 'SMART TECHLINK', domain: 'smarttechlink.com' },
  { name: 'PlanetSpark', domain: 'planetspark.in' },
  { name: 'TATA MOTORS', domain: 'tatamotors.com' },
  { name: 'indus TOWERS', domain: 'industowers.com' },
  { name: 'SANSERA', domain: 'sansera.in' },
  { name: 'BLUECOLD', domain: 'bluecold.co.in' },
  { name: 'VARROC', domain: 'varroc.com' },
  { name: 'ecospace', domain: 'ecospace.in' },
  { name: 'Growupp', domain: 'growupp.in' },
  { name: 'HCL', domain: 'hcltech.com' },
];

const chartData = [
  { batch: 'BATCH 18', companies: 22 },
  { batch: 'BATCH 19', companies: 45 },
  { batch: 'BATCH 20', companies: 53 },
];

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08759df9a73?auto=format&fit=crop&q=80&w=2000" 
            alt="University Building" 
            className="w-full h-full object-cover opacity-30 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Badge className="bg-accent-orange text-navy hover:bg-accent-orange/90 font-black px-4 py-1.5 uppercase tracking-widest text-[10px]">
              Centrally Managed Career Portal
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase">
              EXCELLENCE <br /> 
              <span className="text-accent-orange italic">IN INDUSTRY</span> <br />
              INTEGRATION
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-medium max-w-xl leading-relaxed italic">
              Government Engineering College Vaishali Training & Placement cell bridges institutional excellence with global career opportunities.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-accent-orange text-navy hover:bg-accent-orange/90 font-black uppercase tracking-widest text-xs h-14 px-8 rounded-none">
                Register for Campus <ChevronRight className="ml-2" size={16} />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-black uppercase tracking-widest text-xs h-14 px-8 rounded-none">
                Portal Overview
              </Button>
            </div>
          </motion.div>

          <div className="hidden lg:grid grid-cols-2 gap-4">
            <StatsCard icon={<Building2 className="text-accent-orange" />} label="Partner Companies" value="250+" />
            <StatsCard icon={<Users className="text-accent-orange" />} label="Students Placed" value="1200+" />
            <StatsCard icon={<Briefcase className="text-accent-orange" />} label="Highest Package" value="18 LPA" />
            <StatsCard icon={<TrendingUp className="text-accent-orange" />} label="Growth Rate" value="45%" />
          </div>
        </div>
      </section>

      {/* Quick Links / Breadcrumbs area if needed */}
      <div className="bg-white border-b border-slate-200 py-4 px-8 shadow-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="container mx-auto flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <Link to="/notifications" className="hover:text-navy hover:translate-x-1 transition-all flex items-center gap-2">
            Placement Schedule <ChevronRight size={12} />
          </Link>
          <Link to="/achievements" className="hover:text-navy hover:translate-x-1 transition-all flex items-center gap-2">
             Batch Statistics <ChevronRight size={12} />
          </Link>
          <Link to="/about" className="hover:text-navy hover:translate-x-1 transition-all flex items-center gap-2">
            TPO Team <ChevronRight size={12} />
          </Link>
          <Link to="/gallery" className="hover:text-navy hover:translate-x-1 transition-all flex items-center gap-2">
             Campus Life <ChevronRight size={12} />
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-8 py-24 space-y-32">
        {/* Principal Message Section */}
        <section className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://i.pinimg.com/736x/30/93/d1/3093d190d475bc5df3881edca6b53a9c.jpg" 
                alt="Principal" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-navy/20" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent-orange/10 rounded-full blur-3xl -z-1" />
            <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 w-12 h-1/2 bg-accent-orange rounded-full hidden lg:block" />
          </div>
          
          <div className="md:col-span-7 space-y-8">
            <div className="space-y-2">
              <Badge className="bg-accent-orange/10 text-accent-orange border-none uppercase tracking-widest font-black text-[9px]">Leadership Perspective</Badge>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-navy leading-none">
                Message from the <br /> <span className="text-accent-orange italic font-serif">Principal's Desk</span>
              </h2>
            </div>
            
            <div className="relative p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/50">
              <Quote className="absolute top-6 left-6 text-accent-orange/20" size={48} />
              <div className="relative z-10 space-y-6 text-slate-600 leading-relaxed italic text-lg">
                <p>
                  "It gives me immense pleasure to welcome you to the Training and Placement Portal. Our institution is deeply committed to academic excellence, innovation, and the holistic development of every student."
                </p>
                <p>
                  "This Portal defines the professional trajectory of our students, ensuring they are industry-ready leaders prepared for global challenges."
                </p>
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-navy uppercase tracking-tighter text-xl">DR. ANANT KUMAR</h4>
                    <p className="text-[10px] font-bold text-accent-orange uppercase tracking-widest uppercase italic">Principal, GEC Vaishali</p>
                  </div>
                  <img src="https://upload.wikimedia.org/wikipedia/en/9/92/Government_Engineering_College%2C_Vaishali_Logo.png" alt="Seal" className="w-12 h-12 grayscale opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recruiters Section */}
        <section className="space-y-16">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-navy">OUR PARTNER ECOSYSTEM</h2>
            <p className="text-slate-500 font-medium leading-relaxed italic">
              Global leaders and emerging startups that consistently trust the engineering excellence cultivated at GEC Vaishali.
            </p>
            <div className="w-20 h-1.5 bg-accent-orange rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {recruiters.map((r, i) => (
              <Card key={i} className="group hover:border-accent-orange transition-all duration-300 rounded-2xl overflow-hidden border-slate-100 shadow-sm hover:shadow-xl">
                <CardContent className="p-6 flex flex-col items-center justify-center gap-4 h-full">
                  <div className="w-16 h-16 bg-white p-2 flex items-center justify-center transition-all group-hover:scale-110 duration-500">
                    <img 
                      src={`https://logo.clearbit.com/${r.domain}`} 
                      alt={r.name} 
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${r.name}&background=f1f5f9&color=64748b`;
                      }}
                    />
                  </div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center group-hover:text-navy transition-colors">{r.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-navy rounded-[4rem] p-4 lg:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-orange/5 rounded-full blur-[100px] -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] -ml-20 -mb-20" />
          
          <div className="grid lg:grid-cols-12 gap-16 relative z-10">
            <div className="lg:col-span-4 space-y-8 self-center">
              <Badge className="bg-accent-orange text-navy uppercase font-black px-4 py-1 tracking-widest text-[9px]">Growth Dynamics</Badge>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
                ACCELERATING <br /> <span className="text-accent-orange italic">PLACEMENTS</span>
              </h2>
              <div className="space-y-4 text-white/60 text-sm leading-relaxed italic">
                <p>
                  Our data reveals a consistent upward trajectory in corporate partnerships and student recruitment success over the last three batches.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-white italic">2.4X</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Efficiency Increase</span>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-accent-orange italic">50+</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">New Recrutiers</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 bg-white/5 backdrop-blur-md rounded-[3rem] p-8 border border-white/10 shadow-3xl">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 40, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="batch" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 900, textTransform: 'uppercase' }}
                      dy={15}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }}
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ background: '#0B1D3F', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)' }}
                      itemStyle={{ color: '#fff', fontWeight: 900, textTransform: 'uppercase', fontSize: '12px' }}
                    />
                    <Bar 
                      dataKey="companies" 
                      fill="url(#barGradient)"
                      radius={[15, 15, 0, 0]} 
                      barSize={80}
                      label={{ position: 'top', fill: '#fbbf24', fontSize: 14, fontWeight: 900, dy: -10 }}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-8">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic leading-relaxed">
                  Year-over-Year Growth in Corporate Recruitment Visits
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

const StatsCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-accent-orange transition-all duration-300 group rounded-[2rem]">
    <CardContent className="p-8 flex flex-col items-center text-center space-y-3">
      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">{value}</h4>
        <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{label}</p>
      </div>
    </CardContent>
  </Card>
);
