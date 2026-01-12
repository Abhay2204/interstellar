import React, { useEffect, useRef } from 'react';

const Starfield: React.FC = () => {
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

    // Stars data
    const stars = Array.from({ length: 800 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2, // Depth factor
      brightness: Math.random(),
    }));

    let animationFrameId: number;

    const render = () => {
      // Clear with semi-transparent black for trails, or solid black for crispness.
      // We choose solid black to prevent accumulation artifacts.
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        // Update position based on depth
        // We simulate slight forward movement
        star.y -= 0.1 * star.z; 
        
        // Wrap around
        if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
        }

        // Draw
        const size = star.z * 1.2;
        const opacity = star.brightness * (star.z / 2); // Closer stars are brighter
        
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1]" />;
};

export default Starfield;