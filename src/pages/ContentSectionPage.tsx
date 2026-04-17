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
  Globe
} from 'lucide-react';
import { ContentSection } from '@/src/types';
import { motion } from 'framer-motion';

const contentMock: Record<string, Partial<ContentSection>> = {
  about: {
    title: 'About GEC Vaishali',
    content: "Government Engineering College, Vaishali (GEC Vaishali) is one of the premier technical institutions established by the Government of Bihar under the Department of Science and Technology. Established in 2018, the college aims to provide high-quality technical education to the youth of Bihar and beyond.\n\nOur campus is located in the historic district of Vaishali, known for its rich cultural heritage and being the birthplace of Lord Mahavira and the place where Lord Buddha delivered his last sermon. This historical background inspires our pursuit of knowledge and truth.",
    section_name: 'about'
  },
  infrastructure: {
    title: 'Infrastructure & Facilities',
    content: "Our campus is spread across a sprawling area designed to foster academic excellence. We provide:\n\n• Smart Classrooms with audio-visual aids\n• High-speed Wi-Fi connectivity throughout the campus\n• Central Library with over 10,000 volumes\n• State-of-the-art computer labs with latest software\n• Modern Workshop and Engineering drawing halls\n• Separate hostel facilities for boys and girls\n• Multipurpose Auditorium and Seminar halls",
    section_name: 'infrastructure'
  },
  placement: {
    title: 'Training & Placement Cell',
    content: "The T&P Cell at GEC Vaishali acts as a bridge between high-quality industry requirements and our talented student pool. Our placement strategy focuses on:\n\n1. Industrial Training: Mandatory internships at leading firms.\n2. Skill Development: Regular workshops on coding, soft skills, and aptitude.\n3. Career Counseling: One-on-one sessions for career path selection.\n4. Recruitment Support: Facilitating on-campus and off-campus drives.",
    section_name: 'placement'
  },
  courses: {
    title: 'Academic Programs',
    content: "GEC Vaishali offers Bachelor of Technology (B.Tech) degree in five major disciplines, affiliated to Bihar Engineering University (BEU), Patna:\n\n• Computer Science & Engineering (CSE) - 60 Seats\n• Civil Engineering - 60 Seats\n• Mechanical Engineering - 60 Seats\n• Electrical Engineering - 60 Seats\n• Electronics & Communication Engineering (ECE) - 60 Seats",
    section_name: 'courses'
  }
};

export const ContentSectionPage: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const content = contentMock[sectionId || 'about'];

  if (!content) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Section Not Found</h2>
        <Link to="/" className="text-primary hover:underline mt-4 block">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-muted">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={12} />
        <span className="text-primary">{content.title}</span>
      </nav>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
            {sectionId === 'about' && <History size={28} />}
            {sectionId === 'infrastructure' && <Building2 size={28} />}
            {sectionId === 'placement' && <GraduationCap size={28} />}
            {sectionId === 'courses' && <BookOpen size={28} />}
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">{content.title}</h1>
            <p className="text-text-muted font-medium">Official Institutional Information</p>
          </div>
        </div>

        <div className="card prose prose-slate max-w-none">
          {content.content?.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-text-dark text-lg leading-relaxed mb-6 whitespace-pre-wrap">
              {paragraph}
            </p>
          ))}
        </div>

        {sectionId === 'about' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card space-y-3">
              <Target className="text-primary" size={32} />
              <h3 className="font-bold text-xl">Our Mission</h3>
              <p className="text-text-muted text-sm leading-relaxed">To become a hub of technical excellence and research that contributes significantly to the socio-economic development of the region.</p>
            </div>
            <div className="card space-y-3">
              <Globe className="text-primary" size={32} />
              <h3 className="font-bold text-xl">Our Vision</h3>
              <p className="text-text-muted text-sm leading-relaxed">Providing accessible and quality engineering education that empowers students to be innovative leaders and ethical professionals.</p>
            </div>
          </div>
        )}

        {sectionId === 'infrastructure' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {['Library', 'Laboratories', 'Auditorium', 'Hostels', 'Sports', 'Cafeteria', 'Wi-Fi', 'Gym'].map(item => (
              <div key={item} className="card text-center p-4 hover:border-primary transition-colors cursor-default">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-2 text-primary font-bold">
                  {item[0]}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
