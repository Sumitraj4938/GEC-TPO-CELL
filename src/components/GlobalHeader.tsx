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
        <NavLink to="/" className={({ isActive }) => cn("text-white/90 hover:text-[#FACC15] transition-colors duration-200 text-xs font-black uppercase tracking-widest relative group/nav", isActive && "text-[#FACC15]")}>
          {({ isActive }) => (
            <>
              Home
              <span className={cn("absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FACC15] transition-all group-hover/nav:w-full", isActive && "w-full")}></span>
            </>
          )}
        </NavLink>

        <div className="relative group/menu">
          <button 
            className="flex items-center gap-1 text-white/90 hover:text-[#FACC15] transition-colors duration-200 text-xs font-black uppercase tracking-widest outline-none"
            onClick={() => setIsBranchMenuOpen(!isBranchMenuOpen)}
            onMouseEnter={() => setIsBranchMenuOpen(true)}
          >
            Branches
            <ChevronDown size={14} className={cn("transition-transform duration-200", isBranchMenuOpen && "rotate-180")} />
          </button>
          
          <div 
            className={cn(
              "absolute top-full left-0 mt-4 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 transition-all duration-300 origin-top overflow-hidden",
              isBranchMenuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            )}
            onMouseLeave={() => setIsBranchMenuOpen(false)}
          >
            {branches.map((branch) => (
              <NavLink
                key={branch.id}
                to={`/branch/${branch.id}`}
                className={({ isActive }) => cn(
                  "block px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all",
                  isActive 
                    ? "text-accent-orange bg-slate-50" 
                    : "text-slate-600 hover:text-accent-orange hover:bg-slate-50"
                )}
                onClick={() => setIsBranchMenuOpen(false)}
              >
                {branch.name}
              </NavLink>
            ))}
          </div>
        </div>

        <NavLink to="/notifications" className={({ isActive }) => cn("text-white/90 hover:text-[#FACC15] transition-colors duration-200 text-xs font-black uppercase tracking-widest flex items-center gap-1.5 group/nav relative", isActive && "text-[#FACC15]")}>
          {({ isActive }) => (
            <>
              <Bell size={14} className={cn("transition-transform", isActive && "animate-bounce")} />
              Notification
              <span className={cn("absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FACC15] transition-all group-hover/nav:w-full", isActive && "w-full")}></span>
            </>
          )}
        </NavLink>
        
        <NavLink to="/achievements" className={({ isActive }) => cn("text-white/90 hover:text-[#FACC15] transition-colors duration-200 text-xs font-black uppercase tracking-widest relative group/nav", isActive && "text-[#FACC15]")}>
          {({ isActive }) => (
            <>
              Achievement
              <span className={cn("absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FACC15] transition-all group-hover/nav:w-full", isActive && "w-full")}></span>
            </>
          )}
        </NavLink>
        
      <div className="flex items-center gap-4">
        <Link to="/notifications" className="text-white hover:text-accent-orange transition-colors relative group/bell md:mr-2">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-orange rounded-full border-2 border-navy scale-0 group-hover/bell:scale-100 transition-transform"></span>
        </Link>

        {user && (
          <div className="flex items-center gap-4 pl-4 border-l border-white/10">
            <Link to="/admin" className="text-white hover:text-[#FACC15] transition-colors">
              <UserIcon size={18} />
            </Link>
          </div>
        )}
      </div>
      </nav>
    </header>
  );
};

