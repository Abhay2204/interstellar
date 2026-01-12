import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Thermometer, Zap, Activity, Moon, Shield } from 'lucide-react';

interface PodProps {
  status: 'stable' | 'critical' | 'empty';
  name: string;
  bpm: number;
  temp: number;
  index: number;
}

const Pod: React.FC<PodProps> = ({ status, name, bpm, temp, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const podId = 1000 + index * 111;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full md:w-[320px] h-[480px] border border-white/10 bg-gradient-to-b from-white/[0.03] to-black/50 backdrop-blur-sm overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Glass reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />
      
      {/* Frost overlay */}
      <motion.div 
        animate={{ opacity: isHovered ? 0.05 : 0.15 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" 
      />

      {/* Cold mist effect */}
      <motion.div
        animate={{ 
          opacity: isHovered ? 0 : [0.3, 0.5, 0.3],
          y: isHovered ? 20 : 0
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 h-full p-5 flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="font-mono text-[10px] text-white/30 block">POD_ID_{podId}</span>
            <span className="font-mono text-[9px] text-white/20 uppercase tracking-wider">
              {status === 'stable' ? 'HIBERNATION ACTIVE' : status === 'critical' ? 'ALERT: ANOMALY' : 'UNOCCUPIED'}
            </span>
          </div>
          <motion.div 
            animate={{ 
              scale: status === 'critical' ? [1, 1.3, 1] : 1,
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: status === 'critical' ? 0.5 : 2, repeat: Infinity }}
            className={`w-2.5 h-2.5 rounded-full ${
              status === 'stable' ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]' : 
              status === 'critical' ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]' : 
              'bg-white/20'
            }`} 
          />
        </div>

        {/* Body silhouette */}
        <div className="flex-1 relative flex items-center justify-center">
          <motion.div 
            animate={{ 
              opacity: isHovered ? 0.6 : 0.25,
              scale: isHovered ? 1.02 : 1
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-20 h-56 rounded-full bg-gradient-to-b from-cyan-900/40 via-blue-900/30 to-transparent blur-xl"
          />
          
          {/* Heartbeat line */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0.4 }}
            transition={{ duration: 0.4 }}
            className="absolute top-1/2 left-0 right-0 h-12 flex items-center justify-center overflow-hidden"
          >
            <svg viewBox="0 0 200 40" className="w-full h-full">
              <motion.path
                d="M0,20 L40,20 L50,20 L55,5 L60,35 L65,15 L70,25 L75,20 L160,20 L200,20"
                fill="none"
                stroke={status === 'critical' ? '#ef4444' : '#22c55e'}
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1],
                  opacity: [0, 0.8, 0]
                }}
                transition={{ 
                  duration: status === 'critical' ? 0.6 : 1.2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Biometrics */}
        <motion.div 
          animate={{ 
            opacity: isHovered ? 1 : 0.5,
            y: isHovered ? 0 : 8
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Heart className={`w-3.5 h-3.5 ${status === 'critical' ? 'text-red-500' : 'text-[#FF9F1C]'}`} />
              <span className="font-mono text-[10px] text-white/60 uppercase">Heart Rate</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`font-mono text-lg ${status === 'critical' ? 'text-red-400' : 'text-white'}`}>{bpm}</span>
              <span className="font-mono text-[9px] text-white/40">BPM</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Thermometer className="w-3.5 h-3.5 text-[#FF9F1C]" />
              <span className="font-mono text-[10px] text-white/60 uppercase">Core Temp</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-lg text-white">{temp}</span>
              <span className="font-mono text-[9px] text-white/40">°F</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Moon className="w-3.5 h-3.5 text-[#FF9F1C]" />
              <span className="font-mono text-[10px] text-white/60 uppercase">Sedation</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-lg text-white">{status === 'critical' ? '87.2' : '99.9'}</span>
              <span className="font-mono text-[9px] text-white/40">%</span>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/5">
          <span className="font-mono text-[9px] text-[#FF9F1C]/80 uppercase tracking-[0.2em] block mb-1">Subject</span>
          <h3 className="font-cinzel text-xl text-white tracking-wide">{name}</h3>
        </div>
      </div>
      
      {/* Scan line */}
      <motion.div 
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF9F1C]/60 to-transparent shadow-[0_0_8px_rgba(255,159,28,0.5)] pointer-events-none"
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-[#FF9F1C]/30" />
      <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-[#FF9F1C]/30" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-[#FF9F1C]/30" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-[#FF9F1C]/30" />
    </motion.div>
  );
};

const CryoSleepPods: React.FC = () => {
  const crew = [
    { name: 'Cooper', status: 'stable' as const, bpm: 42, temp: 94.2 },
    { name: 'Brand', status: 'stable' as const, bpm: 45, temp: 93.8 },
    { name: 'Romilly', status: 'critical' as const, bpm: 118, temp: 101.4 },
  ];

  return (
    <section className="w-full py-28 bg-gradient-to-b from-[#050505] to-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex items-center gap-5 mb-16"
        >
          <div className="w-1 h-14 bg-gradient-to-b from-[#FF9F1C] to-[#FF9F1C]/30" />
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Shield className="w-5 h-5 text-[#FF9F1C]" />
              <h2 className="font-cinzel text-3xl text-white uppercase tracking-wide">Cryostasis Chamber</h2>
            </div>
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.3em]">Crew Vitality Monitoring System</p>
          </div>
        </motion.div>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-6 mb-12 pb-6 border-b border-white/5"
        >
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-500" />
            <span className="font-mono text-xs text-white/50">2 STABLE</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-red-500" />
            <span className="font-mono text-xs text-white/50">1 CRITICAL</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="font-mono text-[10px] text-white/30">CHAMBER TEMP: -196°C</span>
          </div>
        </motion.div>

        {/* Pods */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {crew.map((member, i) => (
            <Pod 
              key={member.name}
              index={i}
              status={member.status}
              name={member.name}
              bpm={member.bpm}
              temp={member.temp}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center font-mono text-[10px] text-white/20 mt-12 uppercase tracking-widest"
        >
          Hibernation Protocol v2.4 // Auto-Wake on Proximity Alert
        </motion.p>
      </div>
    </section>
  );
};

export default CryoSleepPods;
