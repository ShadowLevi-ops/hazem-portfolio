'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border/50 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/favicon.png"
            alt="Hazem Logo"
            width={64}
            height={16}
            className="h-6 w-auto"
          />
        </Link>

        {/* Simple Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#portfolio"
            className="text-muted-foreground hover:text-foreground text-xs font-light tracking-tight transition-colors duration-300"
            onClick={e => {
              e.preventDefault();
              document
                .getElementById('portfolio')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Portfolio
          </a>
          <a
            href="#about"
            className="text-muted-foreground hover:text-foreground text-xs font-light tracking-tight transition-colors duration-300"
            onClick={e => {
              e.preventDefault();
              document
                .getElementById('about')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            About
          </a>
          <a
            href="#contact"
            className="text-muted-foreground hover:text-foreground text-xs font-light tracking-tight transition-colors duration-300"
            onClick={e => {
              e.preventDefault();
              document
                .getElementById('contact')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};
