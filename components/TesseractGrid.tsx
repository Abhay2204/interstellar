import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

// A single data column that reacts to mouse proximity
const DataColumn: React.FC<{ xIndex: number; mouseX: any; height: number }> = ({ xIndex, mouseX, height }) => {
  const columnRef = useRef<HTMLDivElement>(null);
  const [randomChars, setRandomChars] = useState("");

  useEffect(() => {
    // Generate random binary/hex string
    let str = "";
    for (let i = 0; i < 20; i++) {
        str += Math.random() > 0.5 ? "1" : "0";
    }
    setRandomChars(str.split("").join("\n"));
  }, []);

  // Distance calculation
  // We assume each column is roughly 20px wide
  const xPos = xIndex * 25; 
  const distance = useTransform(mouseX, (val: number) => {
    return Math.abs(val - xPos);
  });

  // Visual Transforms
  const yOffset = useTransform(distance, [0, 150], [-50, 0]);
  const opacity = useTransform(distance, [0, 200], [1, 0.1]);
  const color = useTransform(distance, [0, 100], ["#FF9F1C", "#333"]);
  const fontSize = useTransform(distance, [0, 100], ["14px", "10px"]);

  // Physics
  const smoothY = useSpring(yOffset, { stiffness: 150, damping: 15 });
  const smoothOp = useSpring(opacity, { stiffness: 150, damping: 20 });

  return (
    <motion.div
      style={{ 
        y: smoothY, 
        opacity: smoothOp, 
        color: color,
        fontSize: fontSize,
        left: xPos 
      }}
      className="absolute top-0 h-full w-[20px] flex flex-col items-center justify-center font-mono leading-none pointer-events-none select-none"
    >
      <pre className="text-center">{randomChars}</pre>
    </motion.div>
  );
};

const TesseractGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000);
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    // Calculate how many columns fit
    const updateCols = () => {
        const w = window.innerWidth;
        const count = Math.ceil(w / 25);
        setColumns(Array.from({ length: count }, (_, i) => i));
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background Matrix */}
      <div className="absolute inset-0 w-full h-full opacity-30">
          {columns.map((i) => (
              <DataColumn key={i} xIndex={i} mouseX={mouseX} height={800} />
          ))}
      </div>

      {/* Central Message */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="z-10 text-center bg-black/80 backdrop-blur-xl p-12 border border-white/10"
      >
        <h2 className="cinzel text-7xl md:text-9xl text-white tracking-[0.2em] mb-4">S T A Y</h2>
        <div className="flex justify-center gap-4 text-[#FF9F1C] mono text-xs uppercase tracking-widest">
            <span>Murph</span>
            <span>::</span>
            <span>Quantum Data Received</span>
        </div>
      </motion.div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none z-0" />
    </section>
  );
};

export default TesseractGrid;