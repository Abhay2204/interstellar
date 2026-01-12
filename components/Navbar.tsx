import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Disc } from 'lucide-react';

const Navbar: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time as HH:MM:SS
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTime(`T-MINUS ${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1 }}
      className="fixed top-0 left-0 w-full z-[60] px-6 md:px-12 py-6 flex justify-between items-center mix-blend-difference text-white"
    >
      <div className="flex items-center gap-3 group cursor-pointer">
        <Disc className="w-5 h-5 animate-spin-slow group-hover:text-[#F59E0B] transition-colors" />
        <div className="flex flex-col">
            <span className="text-xs font-bold tracking-[0.3em] uppercase">Endurance</span>
            <span className="text-[8px] font-mono opacity-50 tracking-widest">Lazarus Project</span>
        </div>
      </div>

      <div className="hidden md:flex gap-1 items-center">
         <span className="w-1 h-1 bg-white/50 rounded-full" />
         <div className="h-[1px] w-24 bg-white/20" />
         <span className="w-1 h-1 bg-white/50 rounded-full" />
      </div>

      <div className="flex flex-col items-end">
        <div className="text-[#F59E0B] font-mono text-sm tracking-widest tabular-nums">
            {time}
        </div>
        <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Mission Clock</span>
      </div>
    </motion.nav>
  );
};

export default Navbar;