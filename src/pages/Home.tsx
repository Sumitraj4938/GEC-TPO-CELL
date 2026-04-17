import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Trophy, Bell, Target, Award } from 'lucide-react';
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
  { name: 'METALMAN', logo: 'https://www.metalmanauto.com/wp-content/uploads/2021/08/logo.png' },
  { name: 'KRISHNA AUTOMATION', logo: 'https://krishnaautomation.com/wp-content/uploads/2021/04/Krishna-Automation-Logo.png' },
  { name: 'YOKOHAMA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Yokohama_Logo.svg/1280px-Yokohama_Logo.svg.png' },
  { name: 'PlanetSpark', logo: 'https://www.planetspark.in/images/logos/planetspark-logo.png' },
  { name: 'TATA MOTORS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/1200px-Tata_logo.svg.png' },
  { name: 'indus TOWERS', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Indus_Towers_logo.svg/1200px-Indus_Towers_logo.svg.png' },
  { name: 'SANSERA', logo: 'https://standard.com.my/wp-content/uploads/2022/07/sansera-logo.png' },
  { name: 'VARROC', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Varroc_Logo.png/1200px-Varroc_Logo.png' },
  { name: 'HCL TECH', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/HCL_Technologies_logo.svg/2560px-HCL_Technologies_logo.svg.png' },
  { name: 'ADANI', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Adani_Group_logo.svg/1200px-Adani_Group_logo.svg.png' },
];

const chartData = [
  { batch: 'Batch 18', companies: 22 },
  { batch: 'Batch 19', companies: 45 },
  { batch: 'Batch 20', companies: 53 },
  { batch: 'Batch 21', companies: 62 },
];

export const Home: React.FC = () => {
  return (
    <div className="space-y-0">
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
          
          <div className="recruiter-grid">
            {recruiters.map((r, i) => (
              <div key={i} className="recruiter-item flex flex-col gap-2 p-6 bg-white overflow-hidden group">
                <img 
                  src={r.logo} 
                  alt={r.name} 
                  className="h-10 w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${r.name}&background=random`;
                  }}
                  referrerPolicy="no-referrer"
                />
                <span className="text-[7px] font-black uppercase tracking-widest text-center mt-2 opacity-40">{r.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section>
          <div className="flex flex-col items-center mb-16">
            <div className="w-16 h-1 bg-accent-orange rounded-full mb-6"></div>
            <h2 className="section-heading tracking-tight mb-4">STRONG INTERACTION WITH INDUSTRY</h2>
            <p className="text-sm font-bold text-text-muted italic opacity-60">Regular Visit of Companies for Placement of Students</p>
          </div>

          <div className="card max-w-4xl mx-auto p-8 md:p-12 bg-white rounded-[3rem] shadow-2xl overflow-hidden">
            <div className="h-[400px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="batch" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                    itemStyle={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '10px' }}
                  />
                  <Bar dataKey="companies" radius={[12, 12, 0, 0]} barSize={60}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#F97316' : '#1E3A8A'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-12 bg-slate-50 py-4 rounded-2xl">
              <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] italic">
                NUMBER OF COMPANIES VISITING FOR PLACEMENTS — CONTINUOUS GROWTH
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section>
          <div className="flex flex-col items-center mb-16">
            <div className="w-16 h-1 bg-accent-orange rounded-full mb-6"></div>
            <h2 className="section-heading tracking-tight mb-4">MOCK INTERVIEW SEASON</h2>
            <p className="text-sm font-bold text-text-muted italic opacity-60">Preparing students for real-world recruitment challenges</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <img 
                src="https://i.pinimg.com/736x/60/1d/bf/601dbfb9abb98aa44e1a31eda6a6812b.jpg" 
                alt="Mock Interview 1" 
                className="w-full h-80 object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <img 
                src="https://i.pinimg.com/736x/d4/2c/70/d42c70984e73aa4c7203ba7123b2dcf4.jpg" 
                alt="Mock Interview 2" 
                className="w-full h-80 object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </section>

        {/* Placement List Section */}
      </div>
    </div>
  );
};
