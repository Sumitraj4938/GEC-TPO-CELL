import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/contexts/AuthContext';
import { LogOut, User as UserIcon, ChevronDown, Bell } from 'lucide-react';

export const GlobalHeader: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isBranchMenuOpen, setIsBranchMenuOpen] = useState(false);

  const branches = [
    { id: 'Civil', name: 'Civil Engineering' },
    { id: 'Mechanical', name: 'Mechanical Engineering' },
    { id: 'CSE', name: 'Computer Science' },
    { id: 'EE', name: 'Electrical Engineering' },
    { id: 'ECE', name: 'Electronics & Comm.' },
  ];

  return (
    <header className="bg-navy px-4 md:px-8 lg:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-3 group shrink-0">
        <div className="w-14 h-14 bg-[#FACC15] p-[2px] rounded-full overflow-hidden shadow-lg shrink-0">
          <div className="w-full h-full bg-navy rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/9/92/Government_Engineering_College%2C_Vaishali_Logo.png" 
              alt="GEC Vaishali Logo" 
              className="w-10 h-10 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="text-white">
          <h1 className="text-lg md:text-xl lg:text-2xl font-black uppercase tracking-tighter leading-none group-hover:text-accent-orange transition-colors">
            TRAINING & PLACEMENT PORTAL
          </h1>
          <p className="text-[9px] md:text-[10px] lg:text-xs font-bold text-[#FACC15] uppercase italic tracking-widest mt-1">
            {user?.branch ? `${user.branch} ENGINEERING, GEC VAISHALI` : 'GEC VAISHALI, BIHAR'}
          </p>
        </div>
      </Link>

      <nav className="flex items-center gap-6 md:gap-8 lg:gap-10">
        <NavLink to="/" className={({ isActive }) => cn("text-white/90 hover:text-[#FACC15] transition-colors duration-200 text-xs font-black uppercase tracking-widest", isActive && "text-[#FACC15] border-b-2 border-[#FACC15] pb-1")}>
          Home
        </NavLink>
        <NavLink to="/notifications" className={({ isActive }) => cn("text-white/90 hover:text-[#FACC15] transition-colors duration-200 text-xs font-black uppercase tracking-widest", isActive && "text-[#FACC15] border-b-2 border-[#FACC15] pb-1")}>
          Notification
        </NavLink>
        <NavLink to="/achievements" className={({ isActive }) => cn("text-white/90 hover:text-[#FACC15] transition-colors duration-200 text-xs font-black uppercase tracking-widest", isActive && "text-[#FACC15] border-b-2 border-[#FACC15] pb-1")}>
          Achievement
        </NavLink>
        
        {user && (
          <div className="flex items-center gap-4 pl-4 border-l border-white/10 ml-2">
            <Link to="/admin" className="text-white hover:text-[#FACC15] transition-colors">
              <UserIcon size={18} />
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

