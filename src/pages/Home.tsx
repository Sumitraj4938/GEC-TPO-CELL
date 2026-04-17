import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Trophy, Bell, Target, Award } from 'lucide-react';
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

const recruiters = [
  { name: 'METALMAN', domain: 'metalmanauto.com', color: 'bg-slate-50' },
  { name: 'KRISHNA AUTOMATION', domain: 'krishnaautomation.com', color: 'bg-slate-50' },
  { name: 'ICON POWER SOLUTIONS', domain: 'iconpower.in', color: 'bg-slate-50' },
  { name: 'YOKOHAMA', domain: 'yokohama-india.com', color: 'bg-slate-50' },
  { name: 'SMART TECHLINK', domain: 'smarttechlink.com', color: 'bg-slate-50' },
  { name: 'PlanetSpark', domain: 'planetspark.in', color: 'bg-slate-50' },
  { name: 'TATA MOTORS', domain: 'tatamotors.com', color: 'bg-slate-50' },
  { name: 'indus TOWERS', domain: 'industowers.com', color: 'bg-slate-50' },
  { name: 'SANSERA', domain: 'sansera.in', color: 'bg-slate-50' },
  { name: 'BLUECOLD', domain: 'bluecold.co.in', color: 'bg-slate-50' },
  { name: 'VARROC', domain: 'varroc.com', color: 'bg-slate-50' },
  { name: 'ecospace', domain: 'ecospace.in', color: 'bg-slate-50' },
  { name: 'Growupp', domain: 'growupp.in', color: 'bg-slate-50' },
  { name: 'HCL', domain: 'hcltech.com', color: 'bg-slate-50' },
];

const chartData = [
  { batch: 'BATCH 18', companies: 22 },
  { batch: 'BATCH 19', companies: 45 },
  { batch: 'BATCH 20', companies: 53 },
];

export const Home: React.FC = () => {
  return (
    <div className="space-y-0 bg-[#F9FAFB]">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
        </defs>
      </svg>
      {/* Hero Section */}
      <section className="hero-card">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,1)_0%,transparent_70%)]"></div>
        <div className="max-w-4xl mx-auto relative z-10 px-6">
          <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest mb-8 italic">
            Career Portal from 2023
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8">
            Step Into Your <span className="text-accent-orange">Future</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed italic">
            Empowering the engineers of tomorrow by bridging the gap between academic excellence and industry standards.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-32">
        {/* Principal Message */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-1/3">
            <div className="faculty-card group">
              <img 
                src="https://i.pinimg.com/736x/30/93/d1/3093d190d475bc5df3881edca6b53a9c.jpg" 
                alt="Dr. Anant Kumar" 
                className="faculty-img"
                referrerPolicy="no-referrer"
              />
              <div className="mt-6">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-text-dark">DR. ANANT KUMAR</h3>
                <p className="text-[10px] font-black uppercase italic tracking-widest text-accent-orange">PRINCIPAL, GEC VAISHALI</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="message-card"
            >
              <h4 className="text-xl font-black uppercase italic tracking-tighter text-text-dark mb-6 pl-6">
                Message by Principal Sir
              </h4>
              <div className="space-y-4 text-text-muted italic text-sm md:text-base leading-relaxed">
                <p>
                  It gives me immense pleasure to welcome you to the Training and Placement Portal. Our institution is deeply committed to academic excellence, innovation, and the holistic development of every student.
                </p>
                <p>
                  This Portal defines the professional trajectory of our students, ensuring they are industry-ready leaders prepared for global challenges.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Recruiters Section */}
        <section>
          <div className="flex flex-col items-center mb-16">
            <div className="w-16 h-1 bg-accent-orange rounded-full mb-6"></div>
            <h2 className="section-heading tracking-tight mb-4">OUR PAST RECRUITERS</h2>
            <p className="text-sm font-bold text-text-muted italic opacity-60">Companies that have trusted GEC Vaishali talent</p>
          </div>
          
          <div className="recruiter-grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recruiters.map((r, i) => (
              <div key={i} className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-md transition-shadow group h-32">
                <div className={cn("w-16 h-16 rounded-xl flex items-center justify-center bg-white p-2 border border-slate-50 shadow-sm group-hover:border-primary transition-colors", r.color)}>
                  <img 
                    src={`https://logo.clearbit.com/${r.domain}`} 
                    alt={r.name} 
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${r.name}&background=random&color=fff`;
                    }}
                  />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors text-center">{r.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section>
          <div className="flex flex-col items-center mb-16">
            <div className="w-20 h-1.5 bg-[#FACC15] rounded-full mb-6"></div>
            <h2 className="text-3xl md:text-5xl font-black text-center uppercase italic tracking-tighter text-slate-900 mb-4">STRONG INTERACTION WITH INDUSTRY</h2>
            <p className="text-[10px] md:text-sm font-bold text-slate-400 text-center uppercase tracking-widest italic opacity-60">Regular Visit of Companies for Placement of Students</p>
          </div>

          <div className="max-w-4xl mx-auto p-12 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-50 relative">
            <div className="h-[450px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 40, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="batch" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900, textTransform: 'uppercase' }}
                    dy={15}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px' }}
                    itemStyle={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '12px' }}
                  />
                  <Bar 
                    dataKey="companies" 
                    fill="url(#barGradient)"
                    radius={[15, 15, 0, 0]} 
                    barSize={90}
                    label={{ position: 'top', fill: '#1e293b', fontSize: 14, fontWeight: 900, dy: -10 }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-12">
              <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] italic">
                NUMBER OF COMPANIES VISITING FOR PLACEMENTS — YEAR OVER YEAR GROWTH
              </p>
            </div>
          </div>
        </section>

        {/* Placement List Section */}
      </div>

      <footer className="mt-32">
        <div className="w-full h-1 bg-[#FACC15]"></div>
        <div className="bg-navy py-12 px-6 text-center space-y-4">
          <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-white">
            TRAINING & PLACEMENT PORTAL
          </h3>
          <p className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest italic">
            GEC Vaishali, Bihar - 844101
          </p>
          <div className="pt-8">
            <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em] font-mono">
              © 2026 TPO PORTAL • GECV
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
