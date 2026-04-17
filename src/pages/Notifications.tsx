import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Filter, 
  Calendar, 
  Link as LinkIcon, 
  FileText, 
  Image as ImageIcon,
  Clock,
  ChevronRight,
  Info
} from 'lucide-react';
import { Notification } from '@/src/types';
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/src/lib/utils';
import { subscribeToNotifications } from '@/src/lib/firestore-utils';
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeBatch, setActiveBatch] = useState<string>('All');

  useEffect(() => {
    const unsubscribe = subscribeToNotifications((notifs) => {
      setNotifications(notifs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredNotifs = notifications.filter(n => {
    const branchMatch = activeFilter === 'All' || n.branch === activeFilter;
    const batchMatch = activeBatch === 'All' || n.batch === activeBatch;
    return branchMatch && batchMatch;
  });

  const getAttachmentIcon = (type: string | undefined) => {
    switch (type) {
      case 'link': return <LinkIcon size={14} className="text-blue-500" />;
      case 'pdf': return <FileText size={14} className="text-red-500" />;
      case 'photo': return <ImageIcon size={14} className="text-green-500" />;
      default: return <Info size={14} className="text-slate-500" />;
    }
  };

  const getAttachmentLabel = (type: string | undefined) => {
    switch (type) {
      case 'link': return 'External Resource';
      case 'pdf': return 'Official Document (PDF)';
      case 'photo': return 'Gallery Image';
      default: return 'View Attachment';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-8 pb-8 border-b border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <Badge variant="outline" className="border-accent-orange text-accent-orange font-black uppercase text-[9px] tracking-widest px-3 py-1">
              Live Updates
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-navy">Notice <span className="text-accent-orange">Board</span></h1>
            <p className="text-slate-500 font-medium italic">Centrally managed notifications from the T&P Cell, GEC Vaishali.</p>
          </div>
          
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner">
            {['All', 'CSE', 'Civil', 'Mechanical', 'EE', 'ECE'].map((filter) => (
              <Button
                key={filter}
                variant="ghost"
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all h-8",
                  activeFilter === filter 
                    ? "bg-navy text-white shadow-lg" 
                    : "text-slate-500 hover:text-navy hover:bg-white"
                )}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 mr-4 border-r border-slate-200 pr-6 shrink-0">
             <Filter size={12} className="text-accent-orange" />
             Select Batch
          </div>
          <div className="flex flex-wrap gap-3">
            {['All', '2024', '2025', '2026', '2027'].map((batch) => (
              <button
                key={batch}
                onClick={() => setActiveBatch(batch)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border",
                  activeBatch === batch 
                    ? "bg-accent-orange text-navy border-accent-orange shadow-md shadow-accent-orange/20" 
                    : "bg-transparent text-slate-400 border-slate-200 hover:border-accent-orange/50 hover:text-accent-orange"
                )}
              >
                {batch === 'All' ? 'All Batches' : `Class of ${batch}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
             <div className="w-12 h-12 border-4 border-accent-orange/20 border-t-accent-orange rounded-full animate-spin"></div>
             <p className="font-bold text-xs uppercase tracking-widest text-slate-400 italic">Synchronizing notices...</p>
          </div>
        ) : filteredNotifs.length > 0 ? (
          filteredNotifs.map((notif, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={notif.id}
            >
              <Card className="group hover:border-accent-orange/30 transition-all duration-500 rounded-[2rem] overflow-hidden border-slate-100 shadow-xl shadow-slate-200/40 bg-white hover:translate-x-1">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Date/Icon Side */}
                    <div className="md:w-32 bg-navy p-6 flex flex-col items-center justify-center text-center space-y-2 group-hover:bg-navy/95 transition-colors">
                       <Bell size={24} className="text-accent-orange mb-2" />
                       <span className="text-white text-2xl font-black uppercase tracking-tighter italic">
                         {format(new Date(notif.created_at), 'dd')}
                       </span>
                       <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">
                         {format(new Date(notif.created_at), 'MMM yyyy')}
                       </span>
                    </div>

                    {/* Content Side */}
                    <div className="flex-1 p-8 space-y-4">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="space-y-1">
                          <div className="flex flex-wrap gap-2 mb-2">
                             <Badge className="bg-slate-100 text-slate-600 border-none uppercase text-[8px] font-black tracking-widest px-2 py-0.5">{notif.branch}</Badge>
                             {notif.batch && (
                               <Badge className="bg-accent-orange text-navy border-none uppercase text-[8px] font-black tracking-widest px-2 py-0.5">Batch {notif.batch}</Badge>
                             )}
                             {notif.role !== 'All' && (
                               <Badge className="bg-navy text-white border-none uppercase text-[8px] font-black tracking-widest px-2 py-0.5">{notif.role}s</Badge>
                             )}
                          </div>
                          <h3 className="font-black text-2xl uppercase tracking-tighter text-navy pr-4">
                            {notif.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl whitespace-nowrap">
                          <Clock size={12} className="text-accent-orange" />
                          <span>{formatDistanceToNow(new Date(notif.created_at))} ago</span>
                        </div>
                      </div>

                      <Separator className="bg-slate-100/50" />

                      <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap italic font-medium">
                        {notif.message}
                      </p>
                      
                      {notif.attachment_url && (
                        <div className="pt-4">
                          <Button asChild variant="outline" className="h-10 border-slate-200 hover:border-navy hover:bg-navy hover:text-white rounded-xl group/btn transition-all duration-300">
                            <a 
                              href={notif.attachment_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 px-6"
                            >
                              {getAttachmentIcon(notif.attachment_type)}
                              <span className="text-[10px] font-black uppercase tracking-widest">
                                {getAttachmentLabel(notif.attachment_type)}
                              </span>
                              <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-32 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200 p-12 space-y-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Filter size={40} className="text-slate-300" />
            </div>
            <div className="space-y-2">
              <h3 className="font-black text-2xl uppercase tracking-tighter text-navy">No Announcements Found</h3>
              <p className="text-slate-400 italic max-w-sm mx-auto font-medium">There are currently no official notices matching your filtered criteria. Keep checking back!</p>
            </div>
            <Button onClick={() => { setActiveFilter('All'); setActiveBatch('All'); }} className="bg-navy text-white rounded-xl">Clear All Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};
