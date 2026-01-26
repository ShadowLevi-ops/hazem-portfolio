'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const particleCount = 20; // Reduced from 50 to 20
    const newParticles: Particle[] = [];
    const width = window.innerWidth || 1920;
    const height = window.innerHeight || 1080;

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3, // Reduced speed
        speedY: (Math.random() - 0.5) * 0.3, // Reduced speed
        opacity: Math.random() * 0.3 + 0.1, // Reduced opacity
      });
    }

    setParticles(newParticles);

    const interval = setInterval(() => {
      const currentWidth = window.innerWidth || 1920;
      const currentHeight = window.innerHeight || 1080;
      setParticles(prev =>
        prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + currentWidth) % currentWidth,
          y: (particle.y + particle.speedY + currentHeight) % currentHeight,
        }))
      );
    }, 100); // Reduced frequency from 50ms to 100ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="bg-primary/20 dark:bg-primary/30 absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [
              particle.opacity,
              particle.opacity * 0.3,
              particle.opacity,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 absolute inset-0 bg-gradient-to-br via-transparent" />
    </div>
  );
}
