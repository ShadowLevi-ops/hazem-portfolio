'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { portfolioItems } from '@/data/portfolio-items';
import Video from 'yet-another-react-lightbox/plugins/video';
import type { Slide } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Mail, MessageSquare, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { AnimatedHero } from '@/components/animated-hero';
import { PortfolioFilter } from '@/components/portfolio-filter';
import { VerticalCarousel } from '@/components/vertical-carousel';
import dynamic from 'next/dynamic';

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), {
  ssr: false,
  loading: () => (
    <div className="flex h-32 w-full items-center justify-center">
      Loading...
    </div>
  ),
});

export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Memoized filtered items for better performance
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return portfolioItems;
    if (activeFilter === 'video') {
      return portfolioItems.filter(
        item => item.type === 'videography' || item.type === 'film'
      );
    }
    return portfolioItems.filter(item => item.type === activeFilter);
  }, [activeFilter]);

  // Memoized categorized items
  const { photographyItems, videoItems, filterCounts } = useMemo(() => {
    const photography = portfolioItems.filter(
      item => item.type === 'photography'
    );
    const video = portfolioItems.filter(
      item => item.type === 'videography' || item.type === 'film'
    );

    const counts = {
      all: portfolioItems.length,
      photography: photography.length,
      video: video.length,
    };

    return {
      photographyItems: photography,
      videoItems: video,
      filterCounts: counts,
    };
  }, []);

  // Memoized slides array
  const allSlides: Slide[] = useMemo(
    () => [
      ...videoItems.map(item => ({
        type: 'video' as const,
        sources: [{ src: item.mediaUrl, type: 'video/mp4' }],
        title: item.title,
        description: `${item.camera ? item.camera + ' | ' : ''}${item.projectDetails || ''}`,
        poster: item.thumbnailUrl || '/videos/VT-1.png',
      })),
      ...photographyItems.map(item => ({
        src: item.mediaUrl,
        title: item.title,
        description: `${item.camera ? item.camera + ' | ' : ''}${item.projectDetails || ''}`,
      })),
    ],
    [videoItems, photographyItems]
  );

  // Memoized lightbox function
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  return (
    <>
      {/* Lightweight background - CSS only */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 absolute inset-0 bg-gradient-to-br via-transparent" />
      </div>

      <header className="bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-sm">
        <div className="container mx-auto flex h-14 items-center justify-between px-3 md:h-16 md:px-6 lg:px-10">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/favicon.png"
              alt="Hazem Logo"
              width={20}
              height={20}
              className="md:h-6 md:w-6"
              priority
            />
          </motion.div>
          <nav className="flex items-center">
            <div className="dropdown-container relative">
              <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:text-primary hover:bg-accent/10 flex items-center gap-1.5 rounded-full p-2 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="h-4 w-4 md:h-5 md:w-5" />
              </motion.button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-background absolute right-0 z-50 mt-2 w-44 rounded-md border py-1 shadow-lg md:w-48"
                  >
                    <motion.a
                      href="mailto:hazem@noveltyventures.uk"
                      className="hover:bg-accent hover:text-accent-foreground flex items-center gap-1.5 px-3 py-2 text-sm transition-colors md:px-4"
                      whileHover={{ x: 5 }}
                    >
                      <Mail className="h-3 w-3 md:h-3.5 md:w-3.5" />
                      <span>Email</span>
                    </motion.a>
                    <motion.a
                      href="https://wa.me/0173767247"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-accent hover:text-accent-foreground flex items-center gap-1.5 px-3 py-2 text-sm transition-colors md:px-4"
                      whileHover={{ x: 5 }}
                    >
                      <MessageSquare className="h-3 w-3 md:h-3.5 md:w-3.5" />
                      <span>WhatsApp</span>
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </div>
      </header>

      <AnimatedHero />

      {/* Portfolio Section with Filter */}
      <section
        id="portfolio"
        className="relative z-10 container mx-auto px-4 pt-8 pb-8 md:px-6 md:pt-12 md:pb-12 lg:px-8"
      >
        <motion.h2
          className="mb-6 text-center text-2xl font-bold md:mb-8 md:text-3xl lg:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="from-primary bg-gradient-to-r to-purple-500 bg-clip-text text-transparent">
            My Work
          </span>
        </motion.h2>

        <PortfolioFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={filterCounts}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <VerticalCarousel
              items={filteredItems}
              onItemClick={index => {
                const item = filteredItems[index];
                if (!item) return;

                const isVideo =
                  item.type === 'videography' || item.type === 'film';
                const slideIndex = isVideo
                  ? videoItems.findIndex(v => v.id === item.id)
                  : videoItems.length +
                    photographyItems.findIndex(p => p.id === item.id);
                openLightbox(slideIndex);
              }}
            />
          </motion.div>
        </AnimatePresence>
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={allSlides}
        plugins={[Video]}
      />
      <ScrollToTopButton />
    </>
  );
}
