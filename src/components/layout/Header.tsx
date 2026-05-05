'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const SECTION_IDS = [
  'featured',
  'portfolio',
  'services',
  'industries',
  'contact',
] as const;

const NAV_GROUPS: {
  label: string;
  items: { id: (typeof SECTION_IDS)[number]; label: string }[];
}[] = [
  {
    label: 'Work',
    items: [
      { id: 'featured', label: 'Featured' },
      { id: 'portfolio', label: 'Portfolio' },
    ],
  },
  {
    label: 'Studio',
    items: [
      { id: 'services', label: 'Services' },
      { id: 'industries', label: 'Industries' },
    ],
  },
];

export const Header = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);

  const navigateToSection = useCallback((sectionId: string) => {
    setIsMenuOpen(false);
    setDesktopMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) setMobileExpanded(null);
  }, [isMenuOpen]);

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 140;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      setIsScrolled(window.scrollY > 16);
      setScrollProgress(
        maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0
      );

      let next: string | null = null;
      for (let i = SECTION_IDS.length - 1; i >= 0; i -= 1) {
        const id = SECTION_IDS[i];
        if (!id) continue;
        const section = document.getElementById(id);
        if (!section) continue;
        if (scrollPosition >= section.offsetTop) {
          next = id;
          break;
        }
      }
      setActiveSection(next);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  const scrollToSection =
    (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      navigateToSection(sectionId);
    };

  return (
    <>
      <header
        className={`border-border/60 supports-[backdrop-filter]:bg-background/55 sticky top-0 z-50 w-full border-b backdrop-blur-2xl transition-all duration-300 ${
          isScrolled
            ? 'bg-background/90 shadow-[0_16px_42px_rgba(0,0,0,0.22)]'
            : 'bg-background/72'
        }`}
      >
        <div className="flex h-16 w-full items-center justify-between px-6 md:h-20 md:px-10">
          <Link
            href="/"
            className="text-foreground/95 hover:text-foreground flex shrink-0 items-baseline gap-1.5 transition-colors"
            aria-label="Giltmedia Studios home"
          >
            <span className="text-[12px] font-semibold tracking-[0.2em] uppercase md:text-[13px]">
              Giltmedia
            </span>
            <span className="text-[10px] tracking-[0.14em] uppercase opacity-80 md:text-[11px]">
              Studios
            </span>
          </Link>

          <DropdownMenu
            open={desktopMenuOpen}
            onOpenChange={setDesktopMenuOpen}
          >
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="text-foreground hover:text-primary border-border/60 hover:border-primary/30 hidden size-10 items-center justify-center rounded-md border border-transparent transition-colors md:inline-flex"
                aria-label="Open sections menu"
                aria-expanded={desktopMenuOpen}
              >
                <Menu className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
              {NAV_GROUPS.map((group, gi) => (
                <React.Fragment key={group.label}>
                  {gi > 0 ? <DropdownMenuSeparator /> : null}
                  <DropdownMenuLabel className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">
                    {group.label}
                  </DropdownMenuLabel>
                  {group.items.map(item => (
                    <DropdownMenuItem
                      key={item.id}
                      className={cn(
                        'cursor-pointer text-xs tracking-[0.12em] uppercase',
                        activeSection === item.id && 'bg-accent/60'
                      )}
                      onSelect={() => navigateToSection(item.id)}
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </React.Fragment>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={cn(
                  'cursor-pointer text-xs tracking-[0.12em] uppercase',
                  activeSection === 'contact' && 'bg-accent/60'
                )}
                onSelect={() => navigateToSection('contact')}
              >
                Contact
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            type="button"
            className="text-foreground hover:text-primary inline-flex size-10 items-center justify-center rounded-md transition-colors md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen(open => !open)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" strokeWidth={1.5} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            )}
          </button>
        </div>
        <div className="bg-primary/15 h-[3px] w-full">
          <div
            className="from-primary via-primary/80 to-primary/60 h-full bg-gradient-to-r transition-[width] duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
            aria-hidden="true"
          />
        </div>
      </header>

      {isMenuOpen ? (
        <div
          id="mobile-nav-panel"
          className="bg-background/96 fixed inset-0 z-40 flex flex-col items-center gap-2 overflow-y-auto pt-24 pb-12 backdrop-blur-xl md:hidden"
          role="dialog"
          aria-modal="true"
        >
          {NAV_GROUPS.map(group => {
            const open = mobileExpanded === group.label;
            return (
              <div key={group.label} className="w-full max-w-xs px-8">
                <button
                  type="button"
                  className="text-foreground hover:text-primary flex w-full items-center justify-between border-b border-white/10 py-3 text-left text-sm tracking-[0.18em] uppercase transition-colors"
                  aria-expanded={open}
                  onClick={() =>
                    setMobileExpanded(v =>
                      v === group.label ? null : group.label
                    )
                  }
                >
                  {group.label}
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 shrink-0 transition-transform duration-200',
                      open && 'rotate-180'
                    )}
                    aria-hidden="true"
                  />
                </button>
                {open ? (
                  <div className="border-border/40 border-l-primary/35 flex flex-col gap-1 border-l-2 py-3 pl-4">
                    {group.items.map(item => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="text-muted-foreground hover:text-primary text-xs tracking-[0.14em] uppercase transition-colors"
                        onClick={scrollToSection(item.id)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
          <a
            href="#contact"
            className="text-foreground hover:text-primary mt-2 text-sm tracking-[0.18em] uppercase transition-colors"
            onClick={scrollToSection('contact')}
          >
            Contact
          </a>
        </div>
      ) : null}
    </>
  );
};
