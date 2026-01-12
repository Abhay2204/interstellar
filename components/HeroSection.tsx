import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// --- Improved Particle System (Warp Dust) ---
const StarDustCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = Array.from({ length: 300 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw cinematic "dust"
      particles.forEach((p) => {
        p.x -= p.speed; // Drift left slightly
        if (p.x < 0) p.x = width;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none" />;
};

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.2]);
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  // Mouse Parallax for subtle depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const dampX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const dampY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set((clientX / window.innerWidth - 0.5) * 20); // range -10 to 10
    mouseY.set((clientY / window.innerHeight - 0.5) * 20);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden perspective-[2000px] pt-16"
    >
      <StarDustCanvas />

      {/* --- THE GARGANTUA BLACK HOLE --- */}
      {/* This structure simulates the gravitational lensing: 
          1. The Event Horizon (Black Sphere)
          2. The Accretion Disk (Flat Ring)
          3. The Lensed Disk (Bent Light over the top)
      */}
      <motion.div 
        style={{ scale, opacity, x: dampX, y: dampY }}
        className="relative z-10 w-[600px] h-[600px] md:w-[800px] md:h-[800px] flex items-center justify-center transform-style-3d"
      >
        
        {/* Lensed Arch (TOP) - The light from behind the hole bent over it */}
        <div className="absolute top-[15%] w-[90%] h-[40%] rounded-t-full border-t-[30px] border-[#FFA500] blur-[20px] opacity-60 z-0" />
        <div className="absolute top-[18%] w-[85%] h-[35%] rounded-t-full border-t-[10px] border-white blur-[10px] opacity-40 z-0" />

        {/* The Main Accretion Disk (Horizontal) */}
        {/* We flatten it to look like a disk */}
        <div className="absolute w-[140%] h-[30%] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(255,165,0,0.8)_45%,rgba(255,255,255,0.8)_50%,rgba(255,165,0,0.8)_55%,transparent_70%)] blur-[5px] z-20 mix-blend-screen opacity-90 transform rotate-[-5deg]" />
        
        {/* Sharp inner ring of the disk */}
        <div className="absolute w-[130%] h-[20%] border-[1px] border-white/30 rounded-[100%] z-20 transform rotate-[-5deg] opacity-70" />

        {/* The Event Horizon (Shadow) */}
        <div className="relative w-[30%] h-[30%] bg-black rounded-full shadow-[0_0_50px_rgba(0,0,0,1)] z-30">
            {/* Photon Ring (The thin ring of light trapped at the edge) */}
            <div className="absolute inset-[-2px] rounded-full border border-[#FF9F1C]/60 blur-[1px] opacity-80" />
            <div className="absolute inset-0 bg-black rounded-full" /> 
        </div>

        {/* Lensed Arch (BOTTOM) - The light from behind bent under */}
        <div className="absolute bottom-[15%] w-[90%] h-[40%] rounded-b-full border-b-[30px] border-[#FFA500] blur-[20px] opacity-60 z-40" />
        <div className="absolute bottom-[18%] w-[85%] h-[35%] rounded-b-full border-b-[10px] border-white blur-[10px] opacity-40 z-40" />

        {/* Anamorphic Lens Flare (Horizontal Streaks) */}
        <div className="absolute top-1/2 left-[-50%] w-[200%] h-[1px] bg-gradient-to-r from-transparent via-[#FF9F1C]/50 to-transparent blur-[1px] mix-blend-screen z-50 pointer-events-none" />

      </motion.div>


      {/* --- CINEMATIC TITLE --- */}
      <motion.div 
        style={{ y }}
        className="absolute z-50 flex flex-col items-center text-center bottom-32 md:bottom-48 pointer-events-none mix-blend-difference"
      >
        <motion.div
           initial={{ opacity: 0, letterSpacing: "1em" }}
           animate={{ opacity: 1, letterSpacing: "0.5em" }}
           transition={{ duration: 3, ease: "easeOut" }}
           className="mb-6"
        >
            <span className="font-mono text-[10px] text-white/60 uppercase">The End of Earth</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 2.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-cinzel text-6xl md:text-9xl text-white font-bold tracking-widest drop-shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
        >
          INTERSTELLAR
        </motion.h1>

        <motion.div
            initial={{ height: 0 }}
            animate={{ height: 60 }}
            transition={{ duration: 1.5, delay: 2 }}
            className="w-[1px] bg-gradient-to-b from-white/80 to-transparent mt-12 mx-auto"
        />
        
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 2, delay: 3 }}
            className="mt-4 font-mono text-[9px] uppercase tracking-[0.3em] text-white"
        >
            Scroll to Initiate Descent
        </motion.p>
      </motion.div>

      {/* Film Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50 mix-blend-overlay" />
      
      {/* Heavy Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_30%,black_100%)]" />

    </section>
  );
};

export default HeroSection;