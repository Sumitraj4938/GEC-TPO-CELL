import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-[8px] border-accent-orange pt-12 pb-8 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-accent-orange/40 uppercase tracking-widest mb-2 italic">
          TRAINING & PLACEMENT PORTAL
        </h2>
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-8 italic">
          GEC Vaishali, Bihar - 844101
        </p>
        
        <div className="flex justify-center items-center gap-4 text-[10px] font-black text-text-dark/40 uppercase tracking-[0.3em]">
          <span>© 2026 TPO PORTAL</span>
          <span className="w-1.5 h-1.5 bg-accent-orange rounded-full"></span>
          <span>GECV</span>
        </div>
      </div>
    </footer>
  );
};
