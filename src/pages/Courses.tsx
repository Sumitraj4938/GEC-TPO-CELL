import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Cpu, HardHat, Settings2, Zap, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 'Civil',
    title: 'B.Tech in Civil Engineering',
    intake: 60,
    duration: '4 Years',
    icon: HardHat,
    description: 'Focuses on the design, construction, and maintenance of the physical and naturally built environment, including public works such as roads, bridges, canals, dams, airports, structural components of buildings, and railways.',
    color: 'border-accent-orange text-accent-orange bg-accent-orange/10'
  },
  {
    id: 'Mechanical',
    title: 'B.Tech in Mechanical Engineering',
    intake: 60,
    duration: '4 Years',
    icon: Settings2,
    description: 'Applies engineering physics, engineering mathematics, and materials science principles to design, analyze, manufacture, and maintain mechanical systems. It is one of the oldest and broadest of the engineering branches.',
    color: 'border-slate-600 text-slate-600 bg-slate-600/10'
  },
  {
    id: 'CSE',
    title: 'B.Tech in Computer Science & Engg.',
    intake: 60,
    duration: '4 Years',
    icon: Cpu,
    description: 'Integrates several fields of computer science and electronic engineering required to develop computer hardware and software. Focuses on algorithms, programming, logic computing, and theoretical foundations.',
    color: 'border-navy text-navy bg-navy/10'
  },
  {
    id: 'EE',
    title: 'B.Tech in Electrical Engineering',
    intake: 60,
    duration: '4 Years',
    icon: Zap,
    description: 'Deals with the study and application of electricity, electronics, and electromagnetism. Students learn to design, test, and manufacture electrical equipment like motors, radar and navigation systems, and power generation equipment.',
    color: 'border-amber-600 text-amber-600 bg-amber-600/10'
  },
  {
    id: 'ECE',
    title: 'B.Tech in Electronics & Comm.',
    intake: 60,
    duration: '4 Years',
    icon: Zap,
    description: 'Involves researching, designing, developing and testing of electronic equipment used in various systems. Electronics and Communication engineers also conceive and oversee the manufacturing of communications and broadcast systems.',
    color: 'border-cyan-700 text-cyan-700 bg-cyan-700/10'
  }
];

export const Courses: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="hero-card bg-navy">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_70%)]"></div>
        <div className="max-w-4xl mx-auto relative z-10 px-6 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest mb-8 italic text-white flex items-center gap-2 mx-auto w-max">
            <BookOpen size={14} /> ACADEMIC PROGRAMS
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8 text-white">
            EXPLORE OUR <span className="text-accent-orange">COURSES</span>
          </h1>
          <p className="text-white/80 text-base md:text-xl font-medium max-w-2xl mx-auto leading-relaxed italic">
            Comprehensive four-year B.Tech programs designed to forge industry-ready leaders of tomorrow.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-20">
        
        {/* Table/List Header Concept */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-16 h-1 bg-accent-orange rounded-full mb-6"></div>
          <h2 className="section-heading tracking-tight mb-4 text-center">UNDERGRADUATE (B.TECH) PROGRAMS</h2>
          <p className="text-sm font-bold text-text-muted italic opacity-60 text-center">Approved by AICTE and affiliated to Bihar Engineering University, Patna</p>
        </div>

        <div className="space-y-8">
          {courses.map((course, index) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card bg-white p-8 md:p-10 group hover:shadow-2xl transition-all border-l-8 border-l-navy hover:border-l-accent-orange"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border-2 ${course.color}`}>
                  <course.icon size={32} />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter text-text-dark italic">{course.title}</h3>
                      <div className="text-[10px] font-black text-text-muted/60 uppercase tracking-widest mt-2">
                        DEPARTMENT OF {course.title.replace('B.Tech in ', '')}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 text-center">
                        <div className="text-[10px] font-black text-text-muted/60 uppercase tracking-widest mb-1">INTAKE</div>
                        <div className="text-xl font-black text-navy">{course.intake}</div>
                      </div>
                      <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 text-center">
                        <div className="text-[10px] font-black text-text-muted/60 uppercase tracking-widest mb-1">DURATION</div>
                        <div className="text-xl font-black text-navy">4 YRS</div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-text-muted italic leading-relaxed text-sm">
                    {course.description}
                  </p>
                  
                  <div className="pt-4 flex">
                    <Link 
                      to={`/branch/${course.id}`}
                      className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-navy group-hover:text-accent-orange transition-colors"
                    >
                      VISIT DEPARTMENT DASHBOARD <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};
