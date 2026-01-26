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
        className="flex-1 pt-12 md:pt-16"
      >
        {children}
      </motion.main>
      <footer className="bg-background text-muted-foreground border-border/50 border-t py-8 text-center md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-[10px] font-light tracking-tight md:text-xs">
            © {new Date().getFullYear()} GiltMedia Studios. All rights
            reserved.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-light tracking-tight md:mt-6 md:text-xs">
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
