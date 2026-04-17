import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Calendar } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy pt-24 pb-12 text-white overflow-hidden relative border-t border-white/5 mt-auto">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg p-1.5 shadow-xl">
               <img src="https://upload.wikimedia.org/wikipedia/en/9/92/Government_Engineering_College%2C_Vaishali_Logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h4 className="font-black text-sm uppercase tracking-tighter">GEC VAISHALI</h4>
              <p className="text-[8px] font-bold text-accent-orange uppercase tracking-widest">Training & Placement</p>
            </div>
          </div>
          <p className="text-white/40 text-xs italic leading-relaxed">
            Empowering technological innovation through elite engineering education and robust industry-academia partnerships.
          </p>
        </div>

        <FooterSection title="Quick Resources">
          <FooterLink to="/notifications">Notices & Schedules</FooterLink>
          <FooterLink to="/achievements">Placement Hall of Fame</FooterLink>
          <FooterLink to="/admin-login">Staff Login</FooterLink>
        </FooterSection>

        <FooterSection title="Departments">
          <FooterLink to="/branch/CSE">Computer Science</FooterLink>
          <FooterLink to="/branch/Civil">Civil Engineering</FooterLink>
          <FooterLink to="/branch/Mechanical">Mechanical Engineering</FooterLink>
          <FooterLink to="/branch/EE">Electrical Engineering</FooterLink>
        </FooterSection>

        <FooterSection title="Connect">
          <div className="text-white/40 text-xs space-y-4 italic">
            <div className="flex items-center gap-3">
              <MapPin size={14} className="text-accent-orange shrink-0" />
              <span>Govt. Engineering College, Vaishali, Bihar-844101</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={14} className="text-accent-orange shrink-0" />
              <span>tpo@gecv.ac.in</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={14} className="text-accent-orange shrink-0" />
              <span>Mon-Sat (9:00 AM - 5:00 PM)</span>
            </div>
          </div>
        </FooterSection>
      </div>
      
      <div className="container mx-auto px-8 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
         <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em] font-mono">
           © 2026 TPO PORTAL • GOVERNMENT ENGINEERING COLLEGE VAISHALI
         </p>
         <div className="flex gap-6 text-white/20 text-[9px] font-black uppercase tracking-[0.2em]">
           <span>Privacy Policy</span>
           <span>Terms of Service</span>
         </div>
      </div>
    </footer>
  );
};

const FooterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-6">
    <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-white/80 border-l-2 border-accent-orange pl-3">{title}</h4>
    <div className="flex flex-col gap-3">
      {children}
    </div>
  </div>
);

const FooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-white/40 text-xs hover:text-accent-orange hover:translate-x-1 transition-all italic font-medium">
    {children}
  </Link>
);
