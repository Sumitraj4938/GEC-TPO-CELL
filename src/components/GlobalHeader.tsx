import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/contexts/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';

export const GlobalHeader: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-navy border-b-[6px] border-accent-orange px-4 md:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-4 group">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden shadow-lg border-2 border-accent-orange/20">
          <img 
            src="https://picsum.photos/seed/gecv-logo/100/100" 
            alt="GEC Vaishali Logo" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="text-white">
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none group-hover:text-accent-orange transition-colors">
            TRAINING & PLACEMENT PORTAL
          </h1>
          <p className="text-[10px] md:text-xs font-bold text-accent-orange uppercase italic tracking-widest mt-0.5">
            CIVIL ENGINEERING, GEC VAISHALI
          </p>
        </div>
      </Link>

      <nav className="flex items-center gap-6 md:gap-10">
        <NavLink to="/" className={({ isActive }) => cn("nav-link", isActive && "active")}>
          Home
        </NavLink>
        <NavLink to="/notifications" className={({ isActive }) => cn("nav-link", isActive && "active")}>
          Notification
        </NavLink>
        <NavLink to="/achievements" className={({ isActive }) => cn("nav-link", isActive && "active")}>
          Achievement
        </NavLink>
        
        {user ? (
          <div className="flex items-center gap-4 pl-4 border-l border-white/10">
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
          <Link to="/admin" className="text-[10px] font-bold text-white bg-white/10 px-3 py-1 rounded border border-white/20 hover:bg-accent-orange hover:border-accent-orange transition-all">
            STAFF LOGIN
          </Link>
        )}
      </nav>
    </header>
  );
};
