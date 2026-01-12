import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Clock, Globe, Gauge, AlertTriangle } from 'lucide-react';

const RelativityEngine: React.FC = () => {
  const [gravity, setGravity] = useState(100);
  const [shipSeconds, setShipSeconds] = useState(0);
  const [earthSeconds, setEarthSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const gravityRef = useRef(gravity);

  // Keep ref in sync with state
  useEffect(() => {
    gravityRef.current = gravity;
  }, [gravity]);

  // Calculate time dilation factor
  const getTimeDilationFactor = useCallback((g: number): number => {
    if (g <= 100) return 1;
    if (g <= 120) return 1 + (g - 100) * 0.05; // 1x to 2x
    if (g <= 150) return 2 + (g - 120) * 0.5; // 2x to 17x
    if (g <= 180) return 17 + (g - 150) * 100; // 17x to 3017x
    return 3017 + (g - 180) * 10000; // Extreme near singularity
  }, []);

  const dilationFactor = getTimeDilationFactor(gravity);

  // Format time display
  const formatTime = (totalSeconds: number): string => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.floor(totalSeconds % 60);
    const ms = Math.floor((totalSeconds % 1) * 10);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  const formatEarthTime = (totalSeconds: number): { value: string; unit: string } => {
    if (totalSeconds < 60) return { value: totalSeconds.toFixed(1), unit: 'SEC' };
    if (totalSeconds < 3600) return { value: (totalSeconds / 60).toFixed(1), unit: 'MIN' };
    if (totalSeconds < 86400) return { value: (totalSeconds / 3600).toFixed(2), unit: 'HRS' };
    if (totalSeconds < 31536000) return { value: (totalSeconds / 86400).toFixed(2), unit: 'DAYS' };
    return { value: (totalSeconds / 31536000).toFixed(2), unit: 'YRS' };
  };

  // Single interval that reads current gravity from ref
  useEffect(() => {
    let intervalId: number | null = null;
    
    if (isRunning) {
      intervalId = window.setInterval(() => {
        const currentDilation = getTimeDilationFactor(gravityRef.current);
        setShipSeconds(prev => prev + 0.1);
        setEarthSeconds(prev => prev + 0.1 * currentDilation);
      }, 100);
    }
    
    return () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [isRunning, getTimeDilationFactor]);

  const resetClocks = () => {
    setShipSeconds(0);
    setEarthSeconds(0);
  };

  const earthTime = formatEarthTime(earthSeconds);
  const isExtreme = gravity > 150;
  const isCritical = gravity > 180;

  return (
    <section className="w-full py-24 bg-black border-y border-white/10 relative overflow-hidden">
      
      {/* Background grid distortion */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{ scale: 1 + (gravity - 100) / 200 }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(255,159,28,${(gravity - 100) / 200}) 0%, transparent 50%)`,
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: `${40 - (gravity - 100) / 5}px ${40 - (gravity - 100) / 5}px`
          }}
        />
      </motion.div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Gauge className="w-5 h-5 text-[#FF9F1C]" />
            <h2 className="font-cinzel text-3xl text-white uppercase tracking-wider">Relativity Engine</h2>
          </div>
          <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.3em]">
            Gravitational Time Dilation Simulator
          </p>
        </div>

        {/* Main Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Ship Time Clock */}
          <div className="border border-white/20 bg-black/80 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-[#FF9F1C]" />
              <span className="font-mono text-[10px] text-[#FF9F1C] uppercase tracking-widest">Ship Time (Local)</span>
            </div>
            <div className="font-mono text-3xl md:text-4xl text-white tabular-nums tracking-wider">
              {formatTime(shipSeconds)}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between font-mono text-[9px] text-white/40">
                <span>FRAME: SHIP</span>
                <span>τ (PROPER TIME)</span>
              </div>
            </div>
          </div>

          {/* Dilation Factor Display */}
          <div className={`border bg-black/80 p-6 backdrop-blur-sm transition-colors duration-300 ${isCritical ? 'border-red-500/50' : isExtreme ? 'border-yellow-500/50' : 'border-white/20'}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">Dilation Factor</span>
              {isCritical && <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />}
            </div>
            <div className="text-center">
              <span className={`font-mono text-4xl md:text-5xl tabular-nums ${isCritical ? 'text-red-500' : isExtreme ? 'text-yellow-500' : 'text-[#FF9F1C]'}`}>
                {dilationFactor < 1000 ? dilationFactor.toFixed(1) : dilationFactor.toExponential(1)}
              </span>
              <span className="font-mono text-lg text-white/50 ml-1">×</span>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <span className="font-mono text-[9px] text-white/40">
                dt/dτ = 1/√(1 - 2GM/rc²)
              </span>
            </div>
          </div>

          {/* Earth Time Clock */}
          <div className={`border bg-black/80 p-6 backdrop-blur-sm relative overflow-hidden transition-colors duration-300 ${isCritical ? 'border-red-500/50' : 'border-white/20'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="font-mono text-[10px] text-blue-400 uppercase tracking-widest">Earth Time (Relative)</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`font-mono text-3xl md:text-4xl tabular-nums ${isCritical ? 'text-red-400' : 'text-white/70'}`}>
                {earthTime.value}
              </span>
              <span className="font-mono text-sm text-white/40">{earthTime.unit}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between font-mono text-[9px] text-white/40">
                <span>FRAME: EARTH</span>
                <span>t (COORDINATE)</span>
              </div>
            </div>
            {isExtreme && (
              <motion.div 
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className={`absolute inset-0 pointer-events-none ${isCritical ? 'bg-red-500/10' : 'bg-yellow-500/10'}`}
              />
            )}
          </div>
        </div>

        {/* Gravity Slider */}
        <div className="bg-white/5 border border-white/10 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs text-white/60 uppercase tracking-widest">Gravitational Field Strength</span>
            <span className="font-mono text-lg text-[#FF9F1C]">{(gravity / 100).toFixed(2)}g</span>
          </div>
          
          <div className="relative h-12 flex items-center">
            <input 
              type="range" 
              min="100" 
              max="200" 
              value={gravity} 
              onChange={(e) => setGravity(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
            />
            
            {/* Track background */}
            <div className="w-full h-2 bg-white/10 rounded-full relative">
              {/* Danger zones */}
              <div className="absolute right-0 w-1/4 h-full bg-red-500/20 rounded-r-full" />
              <div className="absolute right-1/4 w-1/4 h-full bg-yellow-500/10" />
              
              {/* Active fill */}
              <div 
                className={`h-full rounded-full transition-colors duration-300 ${isCritical ? 'bg-red-500' : isExtreme ? 'bg-yellow-500' : 'bg-[#FF9F1C]'}`}
                style={{ width: `${gravity - 100}%` }}
              />
            </div>
            
            {/* Thumb */}
            <div 
              className={`absolute w-5 h-5 rounded-full border-2 border-white pointer-events-none z-20 transition-all duration-150 ${isCritical ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]' : isExtreme ? 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.8)]' : 'bg-[#FF9F1C] shadow-[0_0_15px_rgba(255,159,28,0.8)]'}`}
              style={{ left: `calc(${gravity - 100}% - 10px)` }}
            />
          </div>
          
          {/* Scale markers */}
          <div className="flex justify-between mt-4 font-mono text-[9px] text-white/30 uppercase">
            <span>1.0g Earth</span>
            <span>1.2g</span>
            <span className="text-yellow-500/60">1.5g Miller</span>
            <span className="text-red-500/60">2.0g Singularity</span>
          </div>
        </div>

        {/* Controls & Info */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-3">
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`px-6 py-2 border font-mono text-xs uppercase tracking-widest transition-colors ${isRunning ? 'border-white/30 text-white/60 hover:bg-white/10' : 'border-[#FF9F1C] text-[#FF9F1C] hover:bg-[#FF9F1C]/10'}`}
            >
              {isRunning ? 'Pause' : 'Resume'}
            </button>
            <button 
              onClick={resetClocks}
              className="px-6 py-2 border border-white/30 text-white/60 font-mono text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              Reset
            </button>
          </div>
          
          <div className="font-mono text-[10px] text-white/30 text-center md:text-right">
            <p>Based on Einstein's General Relativity</p>
            <p className="text-white/20">Miller's Planet: 1 hour = 7 Earth years</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RelativityEngine;
