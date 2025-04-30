"use client";

import React from 'react';
import { ThemeProvider } from '../theme-provider';
import { Header } from './Header';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative flex min-h-screen flex-col">
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
        <footer className="bg-background border-t p-3 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Hazem Portfolio. All rights reserved.
          {/* TODO: Add social links or other footer content */}
        </footer>
      </div>
    </ThemeProvider>
  );
}; 