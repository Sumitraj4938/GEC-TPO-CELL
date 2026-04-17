import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Users, 
  History, 
  Target, 
  ChevronRight,
  BookOpen,
  GraduationCap,
  Award,
  Globe,
  Home as HomeIcon,
  ShieldCheck,
  Zap,
  Microscope
} from 'lucide-react';
import { ContentSection } from '@/src/types';
import { motion } from 'framer-motion';
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { Button } from "@/src/components/ui/button";

const contentMock: Record<string, Partial<ContentSection>> = {
  about: {
    title: 'Institutional Profile',
    content: "Government Engineering College, Vaishali (GEC Vaishali) is one of the premier technical institutions established by the Government of Bihar under the Department of Science and Technology. Established in 2018, the college aims to provide high-quality technical education to the youth of Bihar and beyond.\n\nOur campus is located in the historic district of Vaishali, known for its rich cultural heritage and being the birthplace of Lord Mahavira and the place where Lord Buddha delivered his last sermon. This historical background inspires our pursuit of knowledge and truth.",
    section_name: 'about'
  },
  infrastructure: {
    title: 'World-Class Infrastructure',
    content: "Our campus is spread across a sprawling area designed to foster academic excellence. We provide:\n\n• Smart Classrooms with advanced audio-visual aids\n• High-speed fiber-optic Wi-Fi connectivity throughout the campus\n• Comprehensive Central Library with over 15,000 volumes and digital access\n• Specialized Engineering Laboratories with cutting-edge equipment\n• Modern Workshop and Engineering Design Studios\n• Dedicated residential hostels for students with 24/7 security\n• Professional Auditorium and Hi-tech Seminar Halls",
    section_name: 'infrastructure'
  },
  placement: {
    title: 'Career & Industry Relations',
    content: "The Training & Placement Cell at GEC Vaishali acts as a strategic bridge between high-quality industry requirements and our talented student reservoir. Our methodology focuses on:\n\n1. Strategic Industrial Partnerships: Integrated internships with industrial leaders.\n2. Holistic Skill Enhancement: Targeted training in algorithmic coding and soft skills.\n3. Personalized Career Mentorship: Professional guidance for distinct career paths.\n4. Corporate Recruitment Support: Seamless facilitation of placement operations.",
    section_name: 'placement'
  },
  achievements: {
    title: 'Placement Hall of Fame',
    content: "Our graduates have consistently secured positions in top-tier organizations across the globe. GEC Vaishali takes immense pride in the professional success of its alumni.\n\nFrom Batch 2018 to the present, our students have demonstrated exceptional technical prowess and leadership in sectors ranging from Software Development to Core Civil and Mechanical Engineering operations.",
    section_name: 'achievements'
  }
};

export const ContentSectionPage: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  // Handle /achievements by default if sectionId matches or fallback
  const currentSection = sectionId || (window.location.pathname.includes('achievements') ? 'achievements' : 'about');
  const content = contentMock[currentSection];

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-6">
        <h2 className="text-3xl font-black uppercase text-navy">Section Not Found</h2>
        <Button asChild className="bg-navy">
           <Link to="/">Return to Information Portal</Link>
        </Button>
      </div>
    );
  }

  const getIcon = () => {
    switch (currentSection) {
      case 'about': return <History size={32} className="text-accent-orange" />;
      case 'infrastructure': return <Building2 size={32} className="text-accent-orange" />;
      case 'placement': return <GraduationCap size={32} className="text-accent-orange" />;
      case 'achievements': return <Award size={32} className="text-accent-orange" />;
      default: return <BookOpen size={32} className="text-accent-orange" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 border-b border-slate-100 pb-4">
        <Link to="/" className="hover:text-navy hover:scale-105 transition-all flex items-center gap-2">
          <HomeIcon size={12} /> HOME
        </Link>
        <ChevronRight size={10} className="text-accent-orange" />
        <span className="text-navy">{content.title}</span>
      </nav>

      {/* Hero Section */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-20 h-20 bg-navy rounded-[2rem] flex items-center justify-center shadow-2xl shadow-navy/20 shrink-0 border-2 border-accent-orange/20">
            {getIcon()}
          </div>
          <div className="space-y-2 text-center md:text-left">
            <Badge variant="outline" className="border-accent-orange text-accent-orange font-black uppercase text-[9px] tracking-widest px-4 py-1">Institutional Archive</Badge>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-navy italic leading-none">{content.title}</h1>
            <p className="text-slate-500 font-medium italic text-lg">Official Documentation from Government Engineering College, Vaishali</p>
          </div>
        </div>

        <Separator className="bg-slate-100" />

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <Card className="rounded-[2.5rem] overflow-hidden border-slate-100 shadow-3xl shadow-slate-200/50 bg-white">
              <CardContent className="p-10 lg:p-12">
                <div className="prose prose-slate max-w-none space-y-8">
                  {content.content?.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-slate-600 text-lg md:text-xl leading-relaxed italic font-medium whitespace-pre-wrap">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {currentSection === 'about' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="rounded-[2rem] bg-navy text-white p-8 border-none relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-orange/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform" />
                  <Target className="text-accent-orange mb-4" size={32} />
                  <h3 className="font-black text-xl uppercase tracking-tighter italic mb-4">Strategic Mission</h3>
                  <p className="text-white/60 text-sm leading-relaxed italic font-medium">To become a hub of technical excellence and research that contributes significantly to the socio-economic development of the region through innovation and academic rigor.</p>
                </Card>
                <Card className="rounded-[2rem] bg-accent-orange text-navy p-8 border-none relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-navy/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform" />
                  <Globe className="mb-4" size={32} />
                  <h3 className="font-black text-xl uppercase tracking-tighter italic mb-4">Global Vision</h3>
                  <p className="text-navy/60 text-sm leading-relaxed italic font-medium">Providing accessible and quality engineering education that empowers students to be innovative global leaders and ethically grounded professionals.</p>
                </Card>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-8">
            {/* Sidebar quick facts */}
            <Card className="rounded-[2rem] border-slate-100 shadow-xl p-8 bg-slate-50 space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                <ShieldCheck size={14} className="text-accent-orange" /> Verified Profile
              </h4>
              <div className="space-y-6">
                <div className="space-y-1">
                   <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Affiliation</span>
                   <p className="text-sm font-black text-navy italic">Bihar Engineering University, Patna</p>
                </div>
                <div className="space-y-1">
                   <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">ESTABLISHED</span>
                   <p className="text-sm font-black text-navy italic">Year 2018</p>
                </div>
                <div className="space-y-1">
                   <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Location</span>
                   <p className="text-sm font-black text-navy italic">Vaishali, Bihar, India</p>
                </div>
              </div>
              <Separator className="bg-slate-200/50" />
              <div className="pt-2">
                <Button variant="outline" className="w-full rounded-xl border-navy/10 text-navy uppercase text-[9px] font-black tracking-widest hover:bg-navy hover:text-white h-10">
                  Institutional Records
                </Button>
              </div>
            </Card>

            {currentSection === 'infrastructure' && (
              <div className="space-y-4">
                {[
                  { icon: <Zap size={16} />, label: '24/7 Connectivity' },
                  { icon: <Microscope size={16} />, label: 'Research Labs' },
                  { icon: <Users size={16} />, label: 'Community Hub' },
                  { icon: <MapPin size={16} />, label: 'Dynamic Campus' }
                ].map((item, i) => (
                  <Card key={i} className="p-4 rounded-2xl border-slate-100 flex items-center gap-4 hover:border-accent-orange/30 transition-all cursor-default group">
                    <div className="w-10 h-10 rounded-xl bg-accent-orange/10 flex items-center justify-center text-accent-orange group-hover:bg-accent-orange group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy">{item.label}</span>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
