import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, Map, Navigation, ShieldAlert, Cpu, Lock } from 'lucide-react';

const StarNode = ({ x, y, active, onClick, name }: any) => (
  <button
    onClick={onClick}
    className="absolute group focus:outline-none"
    style={{ top: `${y}%`, left: `${x}%` }}
  >
    {/* Target Reticle (Only when active) */}
    {active && (
        <motion.div 
            layoutId="target-reticle"
            className="absolute -inset-6 border border-[#FF9F1C] rounded-full opacity-100"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-2 bg-[#FF9F1C]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[1px] h-2 bg-[#FF9F1C]" />
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-[1px] bg-[#FF9F1C]" />
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-[1px] bg-[#FF9F1C]" />
        </motion.div>
    )}

    {/* The Star */}
    <div className={`w-1 h-1 bg-white rounded-full group-hover:scale-150 transition-transform duration-300 ${active ? 'bg-[#FF9F1C] shadow-[0_0_10px_#FF9F1C]' : ''}`} />
    
    {/* Label */}
    <div className={`absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${active ? 'text-[#FF9F1C] opacity-100' : 'text-white/30 opacity-0 group-hover:opacity-100'}`}>
        {name}
    </div>
  </button>
);

const NavigationConsole: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState<number | null>(null);

  const systems = [
    { id: 1, x: 25, y: 35, name: "Miller's System", grav: "1.30g", dist: "14.2 AU", status: "Time Dilation Critical" },
    { id: 2, x: 50, y: 50, name: "Gargantua Singularity", grav: "Infinite", dist: "0.0 AU", status: "Event Horizon" },
    { id: 3, x: 75, y: 25, name: "Mann's System", grav: "0.80g", dist: "22.4 AU", status: "Atmosphere Frozen" },
    { id: 4, x: 35, y: 75, name: "Edmunds' System", grav: "0.98g", dist: "35.1 AU", status: "Habitable" },
    { id: 5, x: 80, y: 70, name: "Wolf-1061", grav: "1.10g", dist: "41.8 AU", status: "Scanning..." },
  ];

  const activeSys = systems.find(s => s.id === selected);
  const lockedSys = systems.find(s => s.id === locked);

  const handleLockTarget = () => {
    if (selected) {
      setLocked(selected);
    }
  };

  return (
    <section className="relative w-full py-24 bg-[#050505] border-y border-white/5 flex flex-col items-center">
      
      {/* HUD Header */}
      <div className="w-full max-w-5xl px-6 mb-12 flex justify-between items-end border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
            <Navigation className="w-5 h-5 text-[#FF9F1C]" />
            <h2 className="font-cinzel text-2xl text-white uppercase tracking-wider">Nav-Com Array</h2>
        </div>
        <div className="flex gap-8 font-mono text-[10px] text-white/40 uppercase tracking-widest">
            <span>Grid: Sector 4</span>
            <span>Ref: Solar-Relative</span>
            <span>Mode: Manual</span>
        </div>
      </div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 px-6">
        
        {/* LEFT: The Tactical Map (Planisphere) */}
        <div className="relative flex-1 aspect-[4/3] bg-black border border-white/10 rounded-sm overflow-hidden">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            {/* Radar Sweep */}
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 w-[150%] h-[150%] origin-bottom-right bg-gradient-to-t from-[#FF9F1C]/10 to-transparent opacity-20 -translate-x-full -translate-y-full"
                style={{ transformOrigin: "100% 100%" }}
            />

            {/* Central Axis */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10" />
            <div className="absolute top-0 left-1/2 h-full w-[1px] bg-white/10" />

            {/* Systems */}
            {systems.map((sys) => (
                <StarNode 
                    key={sys.id} 
                    {...sys} 
                    active={selected === sys.id}
                    onClick={() => setSelected(sys.id)}
                />
            ))}

            {/* Trajectory Vector Line */}
            {activeSys && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.line 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                        x1="50%" y1="50%"
                        x2={`${activeSys.x}%`} y2={`${activeSys.y}%`}
                        stroke="#FF9F1C"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        className="opacity-50"
                    />
                </svg>
            )}
        </div>

        {/* RIGHT: Data Readout */}
        <div className="w-full md:w-80 flex flex-col gap-4">
            <div className="flex-1 bg-white/5 border border-white/10 p-6 flex flex-col justify-between min-h-[300px]">
                {activeSys ? (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        key={activeSys.id}
                        className="space-y-6"
                    >
                        <div>
                            <span className="font-mono text-[10px] text-[#FF9F1C] uppercase mb-1 block">Target System</span>
                            <h3 className="font-cinzel text-2xl text-white leading-none">{activeSys.name}</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="font-mono text-[9px] text-white/40 uppercase block">Gravity</span>
                                <span className="font-mono text-lg text-white">{activeSys.grav}</span>
                            </div>
                            <div>
                                <span className="font-mono text-[9px] text-white/40 uppercase block">Distance</span>
                                <span className="font-mono text-lg text-white">{activeSys.dist}</span>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-4">
                            <span className="font-mono text-[9px] text-white/40 uppercase block mb-2">Environmental Status</span>
                            <div className="flex items-center gap-2 text-red-400">
                                <ShieldAlert className="w-4 h-4" />
                                <span className="font-mono text-xs uppercase">{activeSys.status}</span>
                            </div>
                        </div>

                        <div className="h-24 bg-black/50 border border-white/10 relative p-2 overflow-hidden flex items-end gap-[1px]">
                             {/* Fake Histogram */}
                             {Array.from({length: 30}).map((_, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: Math.random() * 100 + "%" }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: i * 0.05 }}
                                    className="flex-1 bg-[#FF9F1C]/30"
                                />
                             ))}
                        </div>
                    </motion.div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
                        <Crosshair className="w-12 h-12 text-white mb-4 animate-spin-slow" />
                        <span className="font-mono text-xs text-white uppercase tracking-widest">Select Vector</span>
                    </div>
                )}
            </div>

            <button 
                onClick={handleLockTarget}
                disabled={!selected}
                className={`w-full py-4 border font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                    locked === selected && selected 
                        ? "border-green-500 bg-green-500/20 text-green-500 cursor-default" 
                        : selected 
                            ? "border-[#FF9F1C] bg-[#FF9F1C]/10 text-[#FF9F1C] hover:bg-[#FF9F1C] hover:text-black"
                            : "border-white/20 bg-white/5 text-white/30 cursor-not-allowed"
                }`}
            >
                {locked === selected && selected ? (
                    <span className="flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4" />
                        Target Locked
                    </span>
                ) : "Lock Trajectory"}
            </button>
        </div>

      </div>
    </section>
  );
};

export default NavigationConsole;