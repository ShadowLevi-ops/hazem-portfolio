'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
  const [activeSection, setActiveSection] = useState('portfolio');

  useEffect(() => {
    const sectionIds = ['portfolio', 'about', 'services', 'contact'];

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i -= 1) {
        const id = sectionIds[i];
        if (!id) continue;
        const section = document.getElementById(id);
        if (!section) continue;
        if (scrollPosition >= section.offsetTop) {
          setActiveSection(id);
          return;
        }
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  const scrollToSection =
    (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    };

  const navItemClass = (sectionId: string) =>
    `flex h-full items-center border-b text-xs tracking-tight transition-all duration-300 ${
      activeSection === sectionId
        ? 'text-foreground border-primary/70 font-medium'
        : 'text-muted-foreground hover:text-foreground border-transparent font-light hover:border-primary/40'
    }`;

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border/50 z-40 w-full overflow-hidden border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-6 md:h-20 md:px-10">
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
        <nav className="hidden h-full items-center gap-6 md:flex">
          <a
            href="#portfolio"
            className={navItemClass('portfolio')}
            onClick={scrollToSection('portfolio')}
          >
            Portfolio
          </a>
          <a
            href="#about"
            className={navItemClass('about')}
            onClick={scrollToSection('about')}
          >
            About
          </a>
          <a
            href="#services"
            className={navItemClass('services')}
            onClick={scrollToSection('services')}
          >
            Services
          </a>
          <a
            href="#contact"
            className={navItemClass('contact')}
            onClick={scrollToSection('contact')}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};
