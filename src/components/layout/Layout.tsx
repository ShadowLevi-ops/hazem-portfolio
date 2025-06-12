"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { InteractiveCursor } from '../interactive-cursor';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <div className={`relative flex min-h-screen flex-col ${!isMobile ? 'cursor-none' : ''}`}>
      {!isMobile && <InteractiveCursor />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <footer className="bg-background border-t p-3 text-center text-sm text-muted-foreground">
        © 2024 Hazem Portfolio. All rights reserved.
      </footer>
    </div>
  );
}; 