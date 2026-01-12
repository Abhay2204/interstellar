import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-24 bg-black border-t border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,159,28,0.1)_0%,transparent_50%)]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center px-6"
      >
        <p className="font-cinzel text-xl text-white mb-6">"Do not go gentle into that good night."</p>
        
        <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-[1px] w-8 bg-white/20"></span>
            <span className="font-mono text-[10px] uppercase text-[#FF9F1C] tracking-[0.3em]">End of Transmission</span>
            <span className="h-[1px] w-8 bg-white/20"></span>
        </div>

        <p className="font-mono text-xs text-white/30">
            Cooper Station Archives // Sector 4
        </p>
      </motion.div>

    </footer>
  );
};

export default Footer;