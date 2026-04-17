import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Trophy, Bell, Target, Award } from 'lucide-react';

const recruiters = [
  { name: 'METALMAN', logo: 'M' },
  { name: 'KRISHNA AUTOMATION', logo: 'KA' },
  { name: 'ICON POWER SOLUTIONS', logo: 'IPS' },
  { name: 'YOKOHAMA', logo: 'Y' },
  { name: 'SMART TECHLINK', logo: 'ST' },
  { name: 'PlanetSpark', logo: 'PS' },
  { name: 'TATA MOTORS', logo: 'T' },
  { name: 'indus TOWERS', logo: 'I' },
  { name: 'SANSERA ENGINEERING', logo: 'SE' },
  { name: 'BLUECOLD REFRIGERATION', logo: 'BC' },
  { name: 'VARROC', logo: 'V' },
  { name: 'ecospace INFRASTRUCTURES', logo: 'E' },
  { name: 'Growupp', logo: 'G' },
  { name: 'HCL', logo: 'H' },
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

        {/* HOD Message */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
          <div className="w-full md:w-1/3 text-right">
            <div className="faculty-card group">
              <img 
                src="https://i.pinimg.com/736x/6e/60/e4/6e60e4dc56bc5dc246371e317fe13852.jpg" 
                alt="MR. MUKESH KUMAR ROY" 
                className="faculty-img scale-x-[-1]"
                referrerPolicy="no-referrer"
              />
              <div className="mt-6">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-text-dark">MR. MUKESH KUMAR ROY</h3>
                <p className="text-[10px] font-black uppercase italic tracking-widest text-accent-orange">HOD, CIVIL ENGINEERING</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="message-card bg-white"
            >
              <div className="absolute top-8 right-0 w-12 h-1.5 bg-accent-orange rounded-l-full"></div>
              <h4 className="text-xl font-black uppercase italic tracking-tighter text-text-dark mb-6 text-right pr-6">
                Message by HOD Sir
              </h4>
              <div className="space-y-4 text-text-muted italic text-sm md:text-base leading-relaxed text-right">
                <p>
                  Welcome to the Civil Engineering department's career gateway. Our curriculum is designed to push the boundaries of traditional learning, integrating modern engineering practices with core theoretical foundations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* TPO Message */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-1/3">
            <div className="faculty-card group">
              <img 
                src="https://i.pinimg.com/736x/b3/d3/52/b3d3520eb64af0c0588b831f49fc5eb8.jpg" 
                alt="DR. SHIVANGI SAXENA" 
                className="faculty-img"
                referrerPolicy="no-referrer"
              />
              <div className="mt-6">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-text-dark">DR. SHIVANGI SAXENA</h3>
                <p className="text-[10px] font-black uppercase italic tracking-widest text-accent-orange">TPO HEAD, CIVIL ENGINEERING</p>
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
                Message by TPO Head
              </h4>
              <div className="space-y-4 text-text-muted italic text-[13px] md:text-sm leading-7">
                <p>
                  It gives us immense pleasure to extent to you a cordial invitation to participate in the campus placement process of GEC Vaishali. With a state-of-the-art infrastructure, highly dedicated team of faculty and with well equipped laboratory setup, GEC Vaishali provides a highly conductive environment for teaching and learning process.
                </p>
                <p>
                  We focus on developing managerial social and professional skills in our students with a belief that human asset is the core of todays corporate world. With this note, we look for you to be a part of our endeavour of making our students shine.
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
              <div key={i} className="recruiter-item flex flex-col gap-2">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-black text-lg shadow-inner">
                  {r.logo}
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-center">{r.name}</span>
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

          <div className="card max-w-3xl mx-auto p-12 bg-white rounded-[3rem] shadow-2xl overflow-hidden relative">
            <div className="flex items-end justify-center gap-6 md:gap-12 h-64 md:h-80 border-b-2 border-slate-100 pb-2 relative">
              <div className="flex flex-col items-center group flex-1 max-w-[100px]">
                <div className="text-sm font-black mb-4 group-hover:text-accent-orange transition-colors">22</div>
                <div className="w-full bg-[#34d399] rounded-t-2xl transition-all duration-700 h-[22%] group-hover:h-[25%] shadow-lg"></div>
                <div className="text-[10px] font-black mt-4 uppercase tracking-widest opacity-60">Batch 18</div>
              </div>
              <div className="flex flex-col items-center group flex-1 max-w-[100px]">
                <div className="text-sm font-black mb-4 group-hover:text-accent-orange transition-colors">45</div>
                <div className="w-full bg-[#34d399] rounded-t-2xl transition-all duration-700 h-[45%] group-hover:h-[48%] shadow-lg"></div>
                <div className="text-[10px] font-black mt-4 uppercase tracking-widest opacity-60">Batch 19</div>
              </div>
              <div className="flex flex-col items-center group flex-1 max-w-[100px]">
                <div className="text-sm font-black mb-4 group-hover:text-accent-orange transition-colors">53</div>
                <div className="w-full bg-[#34d399] rounded-t-2xl transition-all duration-700 h-[53%] group-hover:h-[56%] shadow-lg"></div>
                <div className="text-[10px] font-black mt-4 uppercase tracking-widest opacity-60">Batch 20</div>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-[10px] font-black text-text-muted/40 uppercase tracking-[0.3em] italic">
                NUMBER OF COMPANIES VISITING FOR PLACEMENTS — YEAR OVER YEAR GROWTH
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
        <section>
          <div className="flex flex-col items-center mb-16">
            <div className="w-16 h-1 bg-accent-orange rounded-full mb-6"></div>
            <h2 className="section-heading tracking-tight mb-4">OUR PLACED LEGENDS</h2>
            <p className="text-sm font-bold text-text-muted italic opacity-60">Batch 2026 - Hall of Fame</p>
          </div>

          <div className="max-w-4xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
            <img 
              src="https://i.pinimg.com/736x/b9/09/8b/b9098b4435a6af40f82f7072c8941590.jpg" 
              alt="2026 Batch Placement List" 
              className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>
      </div>
    </div>
  );
};
