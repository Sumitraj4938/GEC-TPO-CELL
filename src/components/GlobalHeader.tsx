import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/contexts/AuthContext';
import { 
  LogOut, 
  User as UserIcon, 
  ChevronDown, 
  Bell, 
  Menu,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";

export const GlobalHeader: React.FC = () => {
  const { user, signOut } = useAuth();

  const branches = [
    { id: 'Civil', name: 'Civil Engineering' },
    { id: 'Mechanical', name: 'Mechanical Engineering' },
    { id: 'CSE', name: 'Computer Science' },
    { id: 'EE', name: 'Electrical Engineering' },
    { id: 'ECE', name: 'Electronics & Comm.' },
  ];

  return (
    <div className="w-full sticky top-0 z-50">
      {/* Top Info Bar */}
      <div className="hidden md:flex bg-navy/95 backdrop-blur-sm border-b border-white/5 py-2 px-8 justify-between items-center">
        <div className="flex items-center gap-6 text-[10px] font-medium text-white/60 tracking-wider">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            <Phone size={10} className="text-accent-orange" />
            <span>+91-6243-234567</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            <Mail size={10} className="text-accent-orange" />
            <span>tpo@gecv.ac.in</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            <MapPin size={10} className="text-accent-orange" />
            <span>Vaishali, Bihar 844101</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-bold text-accent-orange tracking-widest uppercase italic">
          Bihar Gov Innovation Excellence
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-navy border-b border-white/10 shadow-xl px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-4 group shrink-0">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-white p-[2px] rounded-xl overflow-hidden shadow-2xl shrink-0 group-hover:rotate-3 transition-transform duration-500">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/9/92/Government_Engineering_College%2C_Vaishali_Logo.png" 
              alt="GEC Vaishali Logo" 
              className="w-full h-full object-contain p-1"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-white border-l border-white/20 pl-4 py-1">
            <h1 className="text-base md:text-xl font-black uppercase tracking-tight leading-none group-hover:text-accent-orange transition-colors duration-300">
              Training & Placement
            </h1>
            <p className="text-[8px] md:text-[10px] font-bold text-[#FACC15] uppercase tracking-[0.2em] mt-1 opacity-80">
              {user?.branch ? `${user.branch} Engineering • GECV` : 'GEC Vaishali • Bihar'}
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavItems user={user} branches={branches} />
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link to="/notifications" className="relative p-2 text-white/80 hover:text-accent-orange transition-all hover:bg-white/5 rounded-lg group">
            <Bell size={20} className="group-hover:animate-bounce" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent-orange rounded-full border-2 border-navy"></span>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 px-2 text-white hover:bg-white/10 border border-white/10 rounded-lg flex items-center gap-2">
                  <div className="w-7 h-7 bg-accent-orange rounded-full flex items-center justify-center text-navy font-black text-xs">
                    {user.name?.[0] || 'A'}
                  </div>
                  <ChevronDown size={14} className="opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl">
                <DropdownMenuItem asChild className="p-3">
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    <UserIcon size={16} />
                    <span className="font-bold text-xs uppercase tracking-widest text-[#1e293b]">My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-3">
                  <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                    <ChevronDown size={16} className="rotate-90" />
                    <span className="font-bold text-xs uppercase tracking-widest">Admin Panel</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut} className="p-3 text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                  <LogOut size={16} />
                  <span className="font-bold text-xs uppercase tracking-widest">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/admin-login">
              <Button size="sm" className="bg-accent-orange hover:bg-accent-orange/90 text-navy font-black uppercase tracking-widest text-[10px] md:text-xs h-9 px-4 rounded-lg shadow-lg shadow-accent-orange/10">
                Admin Login
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10">
            <Menu size={24} />
          </Button>
        </div>
      </header>
    </div>
  );
};

const NavItems: React.FC<{ user: any; branches: any[] }> = ({ user, branches }) => {
  const batches = ['2024', '2025', '2026', '2027'];

  return (
    <>
      <NavItem to="/" label="Home" />
      
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1.5 text-white/90 hover:text-accent-orange transition-all duration-300 text-xs font-black uppercase tracking-widest outline-none group">
          Branches
          <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform duration-300" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 mt-4 p-2 rounded-2xl bg-white/95 backdrop-blur-md border-white/20 shadow-2xl">
          {branches.map((branch) => (
            <DropdownMenuItem key={branch.id} asChild className="p-0">
              <NavLink
                to={`/branch/${branch.id}`}
                className={({ isActive }) => cn(
                  "block w-full px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl",
                  isActive 
                    ? "bg-navy text-accent-orange" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-accent-orange"
                )}
              >
                {branch.name}
              </NavLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1.5 text-white/90 hover:text-accent-orange transition-all duration-300 text-xs font-black uppercase tracking-widest outline-none group">
          Batches
          <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform duration-300" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 mt-4 p-2 rounded-2xl bg-white/95 backdrop-blur-md border-white/20 shadow-2xl">
          {batches.map((batch) => (
            <DropdownMenuItem key={batch} asChild className="p-0">
              <NavLink
                to={`/batch/${batch}`}
                className={({ isActive }) => cn(
                  "block w-full px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl",
                  isActive 
                    ? "bg-navy text-accent-orange" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-accent-orange"
                )}
              >
                Class of {batch}
              </NavLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <NavItem to="/notifications" label="Notices" badge="Live" />
      <NavItem to="/achievements" label="Hall of Fame" />
    </>
  );
};

const NavItem: React.FC<{ to: string; label: string; badge?: string }> = ({ to, label, badge }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => cn(
      "text-white/80 hover:text-accent-orange transition-all duration-300 text-xs font-black uppercase tracking-widest relative py-2 group/nav",
      isActive && "text-accent-orange"
    )}
  >
    <div className="flex items-center gap-1.5">
      {label}
      {badge && (
        <span className="bg-accent-orange text-navy text-[8px] px-1.5 py-0.5 rounded-sm animate-pulse">
          {badge}
        </span>
      )}
    </div>
    <span className={cn(
      "absolute bottom-0 left-0 h-0.5 bg-accent-orange transition-all duration-500 rounded-full",
      "w-0 group-hover/nav:w-full"
    )}></span>
  </NavLink>
);

