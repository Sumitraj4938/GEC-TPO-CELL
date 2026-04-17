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
    <header className="bg-navy border-b-[6px] border-accent-orange px-4 md:px-8 lg:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-4 group shrink-0">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden shadow-lg border-2 border-accent-orange/20 shrink-0">
          <img 
            src="https://i.pinimg.com/736x/21/2b/24/212b24b01e309259025008518973d092.jpg" 
            alt="GEC Vaishali Logo" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="text-white">
          <h1 className="text-lg md:text-xl lg:text-2xl font-black uppercase tracking-tighter leading-none group-hover:text-accent-orange transition-colors">
            TRAINING & PLACEMENT PORTAL
          </h1>
          <p className="text-[9px] md:text-[10px] lg:text-xs font-bold text-accent-orange uppercase italic tracking-widest mt-0.5">
            GEC VAISHALI, BIHAR
          </p>
        </div>
      </Link>

      <nav className="flex items-center gap-4 md:gap-6 lg:gap-8 flex-wrap justify-center">
        <NavLink to="/" className={({ isActive }) => cn("nav-link", isActive && "active")}>
          Home
        </NavLink>
        
        {/* Branches Dropdown */}
        <div 
          className="relative"
          onMouseEnter={() => setIsBranchMenuOpen(true)}
          onMouseLeave={() => setIsBranchMenuOpen(false)}
        >
          <button className="nav-link flex items-center gap-1 cursor-pointer">
            Branches <ChevronDown size={14} className={cn("transition-transform", isBranchMenuOpen && "rotate-180")} />
          </button>
          
          <div 
            className={cn(
              "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-2xl border-t-4 border-accent-orange transition-all origin-top-center overflow-hidden",
              isBranchMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
            )}
          >
            {branches.map((branch) => (
              <NavLink 
                key={branch.id} 
                to={`/branch/${branch.id}`}
                className={({ isActive }) => cn(
                  "block px-4 py-3 text-sm font-bold border-b border-slate-50 last:border-0 hover:bg-slate-50 hover:text-accent-orange transition-colors",
                  isActive ? "text-accent-orange bg-slate-50" : "text-navy"
                )}
                onClick={() => setIsBranchMenuOpen(false)}
              >
                {branch.name}
              </NavLink>
            ))}
          </div>
        </div>

        <NavLink to="/courses" className={({ isActive }) => cn("nav-link", isActive && "active")}>
          Courses
        </NavLink>
        <NavLink to="/notifications" className={({ isActive }) => cn("nav-link flex items-center gap-1.5", isActive && "active")}>
          {({ isActive }) => (
            <>
              <Bell size={16} className={cn(isActive && "text-accent-orange animate-pulse")} />
              Notices
            </>
          )}
        </NavLink>
        
        {user ? (
          <div className="flex items-center gap-4 pl-4 border-l border-white/10 ml-2">
            <Link to="/admin" className="text-white hover:text-accent-orange transition-colors">
              <UserIcon size={20} />
            </Link>
            <button 
              onClick={() => signOut()}
              className="text-white hover:text-red-500 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <Link to="/admin-login" className="ml-2 text-[10px] font-bold text-white bg-white/10 px-3 py-1.5 rounded border border-white/20 hover:bg-accent-orange hover:border-accent-orange transition-all whitespace-nowrap">
            STAFF LOGIN
          </Link>
        )}
      </nav>
    </header>
  );
};

