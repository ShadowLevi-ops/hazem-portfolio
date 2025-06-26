'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Header } from './Header';
import { AnimatedBackground } from '../animated-background';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AnimatedBackground />
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 pt-16"
      >
        {children}
      </motion.main>
      <footer className="bg-background text-muted-foreground border-t p-3 text-center text-sm">
        © 2024 Hazem Portfolio. All rights reserved.
      </footer>
    </div>
  );
};
