import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Battery, Thermometer, Wifi, Disc, Server } from 'lucide-react';

const RandomGraph = () => {
  return (
    <div className="flex items-end gap-[2px] h-12 w-full">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: [Math.random() * 10 + 20 + "%", Math.random() * 80 + 20 + "%"] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.05 }}
          className="w-full bg-[#FF9F1C]/20 border-t border-[#FF9F1C]"
        />
      ))}
    </div>
  );
};

const RollingNumber = ({ label, value, unit }: { label: string, value: string, unit: string }) => (
  <div className="flex justify-between items-end border-b border-white/10 pb-2 mb-2">
    <span className="font-mono text-[10px] text-white/50 uppercase">{label}</span>
    <div className="flex items-baseline gap-1">
      <span className="font-mono text-xl text-[#FF9F1C]">{value}</span>
      <span className="font-mono text-[10px] text-[#FF9F1C]">{unit}</span>
    </div>
  </div>
);

const TelemetryDashboard: React.FC = () => {
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTicks(t => t + 1), 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-32 bg-black flex flex-col items-center border-t border-b border-white/10 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

        <div className="relative z-10 w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Header / Main Status */}
            <div className="col-span-1 md:col-span-12 mb-8 flex justify-between items-end border-b-2 border-white">
                <h2 className="font-cinzel text-4xl text-white uppercase">Telemetry</h2>
                <span className="font-mono text-[#FF9F1C] text-sm animate-pulse">LIVE FEED // SECURE</span>
            </div>

            {/* Col 1: Orbital Mechanics */}
            <div className="col-span-1 md:col-span-4 border border-white/20 p-6 bg-black/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6">
                    <Disc className="text-[#FF9F1C] w-4 h-4" />
                    <h3 className="font-mono text-sm text-white uppercase tracking-widest">Orbital Stability</h3>
                </div>
                
                <div className="relative w-full aspect-square border border-white/10 rounded-full flex items-center justify-center mb-6 bg-gradient-radial from-[#FF9F1C]/5 to-transparent">
                    {/* Outer orbit ring with glow */}
                    <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[90%] h-[90%] border border-[#FF9F1C]/20 rounded-full"
                    >
                        {/* Orbiting satellite */}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FF9F1C] rounded-full shadow-[0_0_10px_#FF9F1C]" />
                    </motion.div>
                    
                    {/* Middle orbit - dashed */}
                    <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[70%] h-[70%] border border-dashed border-[#FF9F1C]/40 rounded-full" 
                    >
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]" />
                    </motion.div>
                    
                    {/* Inner orbit */}
                    <motion.div 
                        animate={{ rotate: -360 }} 
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[50%] h-[50%] border border-white/30 rounded-full" 
                    >
                        <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_6px_#60A5FA]" />
                    </motion.div>
                    
                    {/* Central body with pulse */}
                    <div className="relative">
                        <div className="w-4 h-4 bg-[#FF9F1C] rounded-full shadow-[0_0_20px_#FF9F1C,0_0_40px_#FF9F1C50]" />
                        <motion.div 
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-[#FF9F1C] rounded-full"
                        />
                    </div>
                    
                    {/* Grid overlay */}
                    <div className="absolute inset-0 rounded-full overflow-hidden opacity-20">
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/30" />
                        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/30" />
                    </div>
                </div>

                <RollingNumber label="Inclination" value="23.4" unit="DEG" />
                <RollingNumber label="Eccentricity" value="0.0167" unit="RAD" />
                <RollingNumber label="Periapsis" value="147.1" unit="GM" />
            </div>

            {/* Col 2: Life Support */}
            <div className="col-span-1 md:col-span-4 grid grid-rows-2 gap-6">
                
                {/* Upper Block */}
                <div className="border border-white/20 p-6 bg-black/50 backdrop-blur-sm flex flex-col justify-between">
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Activity className="text-[#FF9F1C] w-4 h-4" />
                            <h3 className="font-mono text-sm text-white uppercase tracking-widest">Life Support</h3>
                        </div>
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                     </div>
                     
                     <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-[10px] font-mono text-white/50 mb-1">
                                <span>O2 LEVEL</span>
                                <span>98%</span>
                            </div>
                            <div className="w-full h-1 bg-white/10">
                                <motion.div 
                                    className="h-full bg-[#FF9F1C]" 
                                    animate={{ width: ["98%", "97%", "98%"] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] font-mono text-white/50 mb-1">
                                <span>CO2 SCRUBBERS</span>
                                <span>OPTIMAL</span>
                            </div>
                            <div className="w-full h-1 bg-white/10">
                                <div className="h-full w-[95%] bg-[#FF9F1C]" />
                            </div>
                        </div>
                     </div>
                </div>

                {/* Lower Block - Graph */}
                <div className="border border-white/20 p-6 bg-black/50 backdrop-blur-sm flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-4">
                        <Wifi className="text-[#FF9F1C] w-4 h-4" />
                        <h3 className="font-mono text-sm text-white uppercase tracking-widest">Signal Noise</h3>
                    </div>
                    <RandomGraph />
                </div>
            </div>

            {/* Col 3: System Resources */}
            <div className="col-span-1 md:col-span-4 border border-white/20 p-6 bg-black/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6">
                    <Server className="text-[#FF9F1C] w-4 h-4" />
                    <h3 className="font-mono text-sm text-white uppercase tracking-widest">Mainframe</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-white/5 border border-white/5 text-center">
                        <Battery className="w-6 h-6 text-white/50 mx-auto mb-2" />
                        <span className="block font-mono text-xl text-white">94%</span>
                        <span className="text-[10px] text-white/30">PWR_CELL_A</span>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 text-center">
                        <Thermometer className="w-6 h-6 text-white/50 mx-auto mb-2" />
                        <span className="block font-mono text-xl text-white">298K</span>
                        <span className="text-[10px] text-white/30">CORE_TEMP</span>
                    </div>
                </div>

                <div className="font-mono text-[10px] text-white/40 space-y-1 overflow-hidden h-32">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex justify-between border-b border-white/5 pb-1">
                            <span>{'>'} PROCESS_ID_{2049 + i + ticks}</span>
                            <span className="text-[#FF9F1C]">{Math.random() > 0.5 ? "OK" : "BUSY"}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    </section>
  );
};

export default TelemetryDashboard;