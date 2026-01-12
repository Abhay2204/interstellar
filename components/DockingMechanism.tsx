import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Lock } from 'lucide-react';

const DockingMechanism: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [locked, setLocked] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [frozenRotation, setFrozenRotation] = useState<number | null>(null);
  
  // Track scroll over a very long distance for precision control
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Physics for rotation
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  
  // Station rotates 180 degrees
  const rotate = useTransform(smoothProgress, [0, 1], [0, 180]); 
  
  // Visual Effects
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
  // Check for alignment "sweet spot" at 50% scroll (90 degrees)
  useMotionValueEvent(rotate, "change", (latest) => {
    if (confirmed) return; // Don't change if already confirmed
    
    // Let's say target is around 90 degrees (+/- 5)
    if (latest > 85 && latest < 95) {
        setLocked(true);
    } else {
        setLocked(false);
    }
  });

  const handleConfirmAlignment = () => {
    if (locked && !confirmed) {
      setConfirmed(true);
      setFrozenRotation(90); // Freeze at perfect alignment
      
      // Scroll to next section after a brief delay
      setTimeout(() => {
        const nextSection = containerRef.current?.nextElementSibling;
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    }
  };

  // Use frozen rotation if confirmed, otherwise use scroll-based rotation
  const displayRotation = confirmed && frozenRotation !== null ? frozenRotation : rotate;

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }} 
        />

        {/* HUD Data */}
        <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none z-20 p-10 flex flex-col justify-between">
            <div className="flex justify-between font-mono text-xs text-[#FF9F1C]">
                <span>RPM_MATCH: {locked || confirmed ? "LOCKED" : "ADJUSTING"}</span>
                <span>T-LOCK: {confirmed ? "CONFIRMED" : locked ? "ENGAGED" : "PENDING"}</span>
            </div>
            
            {/* Center Lock Message & Confirm Button */}
            {locked && !confirmed && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-24 pointer-events-auto">
                    <button 
                        onClick={handleConfirmAlignment}
                        className="flex items-center gap-2 font-mono text-green-500 text-xs tracking-[0.2em] bg-green-500/10 px-4 py-2 border border-green-500 hover:bg-green-500 hover:text-black transition-colors cursor-pointer"
                    >
                        <Lock className="w-3 h-3" />
                        CONFIRM ALIGNMENT
                    </button>
                </div>
            )}
            
            {confirmed && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-24">
                    <span className="flex items-center gap-2 font-mono text-green-500 text-xs tracking-[0.2em] bg-green-500/20 px-4 py-2 border border-green-500">
                        <Lock className="w-3 h-3" />
                        DOCKING SEQUENCE INITIATED
                    </span>
                </div>
            )}

            <div className="flex justify-between items-end font-mono text-xs text-white/40">
                <div className="flex flex-col gap-1">
                    <span>ROLL: 0.0</span>
                    <span>PITCH: 2.1</span>
                    <span>YAW: 0.0</span>
                </div>
                <span>REL_VEL: {locked || confirmed ? "0.0" : "67"} m/s</span>
            </div>
        </motion.div>

        {/* The Mechanism */}
        <div className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px] flex items-center justify-center">
            
            {/* The Station (Target) */}
            <motion.div 
                style={{ rotate: displayRotation, scale }}
                className={`absolute w-full h-full border-2 rounded-full flex items-center justify-center transition-colors duration-300 ${locked || confirmed ? "border-green-500/50 shadow-[0_0_50px_rgba(0,255,0,0.2)]" : "border-white/10"}`}
            >
                {/* Structural Rings */}
                <div className="absolute inset-8 border border-dashed border-white/10 rounded-full" />
                <div className="absolute inset-32 border border-white/5 rounded-full" />
                
                {/* Target Alignment Slot (Top) */}
                <div className={`absolute top-0 w-2 h-16 transition-colors duration-300 ${locked || confirmed ? "bg-green-500" : "bg-[#FF9F1C]"}`} /> 

                {/* Alignment Markers */}
                <div className="absolute top-1/2 left-1/2 w-[90%] h-[90%] -translate-x-1/2 -translate-y-1/2">
                     <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 transition-colors ${locked || confirmed ? "border-green-500" : "border-white/30"}`} />
                     <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 transition-colors ${locked || confirmed ? "border-green-500" : "border-white/30"}`} />
                     <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 transition-colors ${locked || confirmed ? "border-green-500" : "border-white/30"}`} />
                     <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 transition-colors ${locked || confirmed ? "border-green-500" : "border-white/30"}`} />
                </div>
            </motion.div>

            {/* The Reticle (Our View - rotates opposite to simulate us matching) */}
            {/* Actually, visually, if we are "rolling" to match, our view of the station stays fixed relative to us, but the universe spins. 
                However, for this effect, let's keep the Ranger fixed in center, and the Station spinning, 
                and we show a "Guidance Reticle" that is static (our ship) vs the moving station. */}
            
            <div className="absolute z-30 w-full h-full pointer-events-none flex items-center justify-center">
                 {/* This is our ship's alignment marker. It is static at the top (12 o'clock). 
                     When the Station's orange marker hits 12 o'clock (0 or 360 deg), we align.
                     Wait, we want the station to start misaligned and rotate INTO alignment.
                     The 'rotate' var goes 0 -> 180. 
                     Let's say perfect alignment is at 90 degrees.
                  */}
                 
                 {/* Static Reticle Frame */}
                 <div className={`w-[300px] h-[300px] border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 ${locked || confirmed ? "scale-110 border-green-500" : "scale-100"}`}>
                    <div className={`absolute -top-4 w-4 h-4 border border-white rotate-45 transition-colors ${locked || confirmed ? "bg-green-500 border-green-500" : "bg-transparent"}`} />
                 </div>
            </div>

            {/* The Ranger (Center Ship) */}
            <motion.div 
                className="relative z-10 w-48 h-48 bg-black border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(0,0,0,1)]"
            >
                <div className={`w-3 h-3 rounded-full transition-colors ${confirmed ? "bg-green-500" : locked ? "bg-green-500 animate-ping" : "bg-[#FF9F1C] animate-ping"}`} />
                <motion.div 
                    animate={confirmed ? { rotate: 0 } : { rotate: 360 }}
                    transition={confirmed ? {} : { duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-white/5 rounded-full" 
                />
            </motion.div>

        </div>
      </div>
    </section>
  );
};

export default DockingMechanism;