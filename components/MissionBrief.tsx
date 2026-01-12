import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Wind, Droplets, Database, Radio } from 'lucide-react';

const planets = [
  {
    id: "P-01",
    name: "Miller's Planet",
    type: "Super-Fluid",
    timeDilation: "1hr = 7yrs",
    desc: "A rhythmic landscape of mountain-sized waves. The proximity to Gargantua creates extreme gravitational time dilation.",
    img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop"
  },
  {
    id: "P-02",
    name: "Mann's Planet",
    type: "Frozen Ammonia",
    timeDilation: "Standard",
    desc: "A desolate ice world with clouds of frozen ammonia. Beautiful but deadly. Surface survivability is zero.",
    img: "https://images.unsplash.com/photo-1543789391-72997782626e?q=80&w=1964&auto=format&fit=crop"
  },
  {
    id: "P-03",
    name: "Edmunds' Planet",
    type: "Arid Habitat",
    timeDilation: "Standard",
    desc: "Atmosphere: 80% Nitrogen, 19% Oxygen. Breathable. Minimal water, but soil analysis indicates fertility.",
    img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1887&auto=format&fit=crop"
  },
];

const PlanetCard: React.FC<{ data: typeof planets[0], index: number }> = ({ data, index }) => {
  return (
    <div className="group relative h-[60vh] w-[80vw] md:w-[40vw] flex-shrink-0 border border-white/10 bg-black/50 overflow-hidden interactive transition-all duration-500 hover:border-[#FF9F1C]/50">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110"
        style={{ backgroundImage: `url(${data.img})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end">
        <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[#FF9F1C] text-xs border border-[#FF9F1C] px-2 py-1">{data.id}</span>
            <span className="font-mono text-white/40 text-xs uppercase">{data.type}</span>
        </div>
        
        <h3 className="font-cinzel text-4xl md:text-5xl text-white mb-2">{data.name}</h3>
        <p className="font-mono text-xs text-[#FF9F1C] mb-6 uppercase tracking-widest">Dilation: {data.timeDilation}</p>
        
        <p className="font-rajdhani text-lg text-gray-400 max-w-md leading-relaxed opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          {data.desc}
        </p>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
    </div>
  );
};

const MissionBrief: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform logic: Move container left as we scroll down. 
  // We use a large percentage to ensure it clears all items.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        <div className="absolute top-10 left-10 md:left-20 z-20">
          <h2 className="font-cinzel text-4xl md:text-6xl text-white">Target Systems</h2>
          <div className="h-1 w-20 bg-[#FF9F1C] mt-4" />
        </div>

        <motion.div style={{ x }} className="flex gap-10 pl-10 md:pl-20 items-center w-max">
            {planets.map((planet, i) => (
              <PlanetCard key={planet.id} data={planet} index={i} />
            ))}
            
            {/* Final Data Block */}
            <div className="h-[60vh] w-[40vw] flex-shrink-0 flex flex-col justify-center items-center border border-dashed border-white/20">
                <Database className="text-[#FF9F1C] w-12 h-12 mb-4 animate-pulse" />
                <span className="font-mono text-white/50 text-sm uppercase tracking-widest">End of Stream</span>
            </div>
        </motion.div>
        
        {/* Progress Bar */}
        <div className="absolute bottom-10 left-10 md:left-20 right-10 md:right-20 h-[1px] bg-white/10">
            <motion.div 
                style={{ scaleX: scrollYProgress, transformOrigin: "left" }} 
                className="h-full bg-[#FF9F1C]" 
            />
        </div>
      </div>
    </section>
  );
};

export default MissionBrief;