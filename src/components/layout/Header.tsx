'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
  const [activeSection, setActiveSection] = useState('portfolio');
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const sectionIds = ['portfolio', 'about', 'services', 'contact'];

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 140;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      setIsScrolled(window.scrollY > 16);
      setScrollProgress(
        maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0
      );

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
    <header
      className={`border-border/50 supports-[backdrop-filter]:bg-background/55 sticky top-0 z-40 w-full overflow-hidden border-b backdrop-blur-xl transition-all duration-300 ${
        isScrolled
          ? 'bg-background/85 shadow-[0_8px_30px_rgba(0,0,0,0.12)]'
          : 'bg-background/65'
      }`}
    >
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
      <div className="bg-primary/15 h-0.5 w-full">
        <div
          className="from-primary via-primary/80 to-primary/60 h-full bg-gradient-to-r transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />
      </div>
    </header>
  );
};
