import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HUDOverlay from './components/HUDOverlay'; // New HUD
import HeroSection from './components/HeroSection';
import TelemetryDashboard from './components/TelemetryDashboard';
import NavigationConsole from './components/NavigationConsole'; // New Section
import MissionBrief from './components/MissionBrief';
import CryoSleepPods from './components/CryoSleepPods'; // New Section
import RelativityEngine from './components/RelativityEngine'; // New Section
import DockingMechanism from './components/DockingMechanism';
import TesseractGrid from './components/TesseractGrid';

import Footer from './components/Footer';
import Starfield from './components/Starfield';

const App: React.FC = () => {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Heavy, cinematic scroll physics
    const lenis = new Lenis({
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      // Check if hovering interactive elements
      if (target.closest('a') || target.closest('button') || target.closest('input') || target.closest('.interactive')) {
        setCursorVariant("hovered");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black text-white selection:bg-[#FF9F1C] selection:text-black">
      
      {/* HUD Frame Overlay - Fixed Viewport */}
      <HUDOverlay />

      {/* Custom Cursor System */}
      <motion.div 
        className="cursor-dot"
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      <motion.div 
        className={`cursor-ring ${cursorVariant}`}
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
      />

      <Starfield />
      <Navbar />
      
      <main className="w-full relative z-10">
        <HeroSection />
        <NavigationConsole />
        <TelemetryDashboard />
        <RelativityEngine />
        <MissionBrief />
        <CryoSleepPods />
        <DockingMechanism />
        <TesseractGrid />
      </main>

      <Footer />
    </div>
  );
};

export default App;