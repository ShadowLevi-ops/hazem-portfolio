"use client";

import React from 'react';
// import { ThemeProvider } from '../theme-provider'; // Removed redundant ThemeProvider import
// import { Header } from './Header'; // Remove Header import
import { motion } from 'framer-motion'; // Restore framer-motion import

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem> // Removed redundant ThemeProvider wrapper
      <div className="relative flex min-h-screen flex-col">
        {/* <Header /> */ /* Remove Header component */}
        <motion.main // Changed back to motion.main
          initial={{ opacity: 0 }} // Restore framer-motion props
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
    // </ThemeProvider>
  );
}; 