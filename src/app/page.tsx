"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { portfolioItems } from '@/data/portfolio-items';
import Video from "yet-another-react-lightbox/plugins/video";
import Captions from "yet-another-react-lightbox/plugins/captions";
import type { Slide } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { Mail, MessageSquare, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { AnimatedHero } from '@/components/animated-hero';
import { PortfolioFilter } from '@/components/portfolio-filter';
import { VerticalCarousel } from '@/components/vertical-carousel';
import dynamic from 'next/dynamic';

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), { 
  ssr: false,
  loading: () => <div className="w-full h-32 flex items-center justify-center">Loading...</div>
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
      return portfolioItems.filter(item => item.type === 'videography' || item.type === 'film');
    }
    return portfolioItems.filter(item => item.type === activeFilter);
  }, [activeFilter]);

  // Memoized categorized items
  const { photographyItems, videoItems, filterCounts } = useMemo(() => {
    const photography = portfolioItems.filter(item => item.type === 'photography');
    const video = portfolioItems.filter(
      (item) => item.type === 'videography' || item.type === 'film'
    );
    
    const counts = {
      all: portfolioItems.length,
      photography: photography.length,
      video: video.length,
    };

    return {
      photographyItems: photography,
      videoItems: video,
      filterCounts: counts
    };
  }, []);

  // Memoized slides array
  const allSlides: Slide[] = useMemo(() => [
    ...videoItems.map(item => ({
      type: 'video' as const,
      sources: [{ src: item.mediaUrl, type: 'video/mp4' }],
      title: item.title,
      description: `${item.camera ? item.camera + ' | ' : ''}${item.projectDetails || ''}`,
      poster: item.thumbnailUrl || '/videos/VT-1.png'
    })),
    ...photographyItems.map(item => ({ 
      src: item.mediaUrl,
      title: item.title,
      description: `${item.camera ? item.camera + ' | ' : ''}${item.projectDetails || ''}`,
    })),
  ], [videoItems, photographyItems]);

  // Memoized lightbox function
  const openLightbox = useCallback((index: number) => {
    console.log("Attempting to open lightbox for index:", index, "Slide:", allSlides[index]);
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, [allSlides]);

  return (
    <>
      {/* Lightweight background - CSS only */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:to-secondary/10" />
      </div>
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image 
              src="/favicon.png"
              alt="Hazem Logo"
              width={24} 
              height={24} 
              priority 
              className="h-6 w-auto"
            />
          </motion.div>
          <nav className="flex items-center">
            <div className="relative dropdown-container">
              <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1.5 hover:text-primary transition-colors p-2 rounded-full hover:bg-accent/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="h-5 w-5" />
              </motion.button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-background border rounded-md shadow-lg py-1 z-50"
                  >
                    <motion.a 
                      href="mailto:hazem@noveltyventures.uk"
                      className="flex items-center gap-1.5 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Email</span>
                    </motion.a>
                    <motion.a 
                      href="https://wa.me/0173767247"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
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
      <section id="portfolio" className="container mx-auto pt-8 md:pt-12 pb-6 md:pb-8 px-4 md:px-8 relative z-10">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
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
                onItemClick={(index) => {
                  const item = filteredItems[index];
                  const isVideo = item.type === 'videography' || item.type === 'film';
                  const slideIndex = isVideo ? 
                    videoItems.findIndex(v => v.id === item.id) :
                    videoItems.length + photographyItems.findIndex(p => p.id === item.id);
                  openLightbox(slideIndex);
                }}
                autoPlay={true}
                interval={5000}
              />
            </motion.div>
          </AnimatePresence>
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={allSlides}
        plugins={[Video, Captions]}
        captions={{
          showToggle: true,
          descriptionTextAlign: "center",
        }}
      />
      <ScrollToTopButton />
    </>
  );
}
