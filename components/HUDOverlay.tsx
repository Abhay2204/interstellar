import React from 'react';

const HUDOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] w-full h-full p-6 md:p-12 flex flex-col justify-between">
      
      {/* Top Corners */}
      <div className="flex justify-between w-full">
        <div className="w-16 h-16 border-l-2 border-t-2 border-white/20 rounded-tl-3xl relative">
            <div className="absolute top-0 right-0 w-4 h-1 bg-[#FF9F1C]/50" />
            <div className="absolute bottom-0 left-0 w-1 h-4 bg-[#FF9F1C]/50" />
        </div>
        <div className="w-16 h-16 border-r-2 border-t-2 border-white/20 rounded-tr-3xl relative">
            <div className="absolute top-0 left-0 w-4 h-1 bg-[#FF9F1C]/50" />
            <div className="absolute bottom-0 right-0 w-1 h-4 bg-[#FF9F1C]/50" />
        </div>
      </div>

      {/* Center Reticle (faint) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/10 rounded-full" />

      {/* Bottom Corners */}
      <div className="flex justify-between w-full items-end">
        <div className="w-16 h-16 border-l-2 border-b-2 border-white/20 rounded-bl-3xl relative">
             <span className="absolute bottom-2 left-4 font-mono text-[8px] text-white/30 uppercase">SYS_READY</span>
        </div>
        
        {/* Decorative Bottom Bar */}
        <div className="h-[1px] w-full mx-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="w-16 h-16 border-r-2 border-b-2 border-white/20 rounded-br-3xl relative">
             <span className="absolute bottom-2 right-4 font-mono text-[8px] text-white/30 uppercase">v2.0.4</span>
        </div>
      </div>

      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-[101] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)] z-[100]" />
    </div>
  );
};

export default HUDOverlay;