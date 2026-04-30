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
        className="flex-1"
      >
        {children}
      </motion.main>
      <footer className="bg-background/88 text-muted-foreground border-border/50 border-t py-12 text-center backdrop-blur-sm md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase md:text-xs">
            © {new Date().getFullYear()} GiltMedia Studios. All rights
            reserved.
          </p>
          <div className="mt-5 flex items-center justify-center gap-4 text-[10px] tracking-[0.14em] uppercase md:mt-7 md:text-xs">
            <a
              href="mailto:hazem@noveltyventures.uk"
              className="hover:text-primary transition-colors duration-300"
            >
              hazem@noveltyventures.uk
            </a>
            <span className="text-border">•</span>
            <span>Kuala Lumpur, Malaysia</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
