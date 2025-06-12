"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { portfolioItems } from '@/data/portfolio-items';
import Video from "yet-another-react-lightbox/plugins/video";
import Captions from "yet-another-react-lightbox/plugins/captions";
import type { Slide } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { Expand, PlayCircle, Mail, MapPin, MessageSquare, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { AnimatedBackground } from '@/components/animated-background';
import { AnimatedHero } from '@/components/animated-hero';
import { PortfolioFilter } from '@/components/portfolio-filter';
import dynamic from 'next/dynamic';

const Masonry = dynamic(() => import('react-masonry-css'), { 
  ssr: false,
  loading: () => <div className="w-full h-32 flex items-center justify-center">Loading...</div>
});

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), { 
  ssr: false,
  loading: () => <div className="w-full h-32 flex items-center justify-center">Loading...</div>
});

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 3,
  500: 3
};

export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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

  // Filter portfolio items based on active filter
  const getFilteredItems = () => {
    if (activeFilter === 'all') return portfolioItems;
    return portfolioItems.filter(item => item.type === activeFilter);
  };

  const filteredItems = getFilteredItems();
  const photographyItems = portfolioItems.filter(item => item.type === 'photography');
  const videoItems = portfolioItems.filter(
    (item) => item.type === 'videography' || item.type === 'film'
  );

  // Calculate counts for filter buttons
  const filterCounts = {
    all: portfolioItems.length,
    photography: photographyItems.length,
    videography: portfolioItems.filter(item => item.type === 'videography').length,
    film: portfolioItems.filter(item => item.type === 'film').length,
  };

  const allSlides: Slide[] = [
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
  ];

  const openLightbox = (index: number) => {
    console.log("Attempting to open lightbox for index:", index, "Slide:", allSlides[index]);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <AnimatedBackground />
      
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

        {isLoading ? (
          <div className="w-full h-24 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex w-full"
                columnClassName="px-1"
              >
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => {
                    const isVideo = item.type === 'videography' || item.type === 'film';
                    const slideIndex = isVideo ? 
                      videoItems.findIndex(v => v.id === item.id) :
                      videoItems.length + photographyItems.findIndex(p => p.id === item.id);
                    
                    return (
                      <motion.div
                        key={item.id} 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.05,
                          layout: { duration: 0.3 }
                        }}
                        whileHover={{ 
                          scale: 1.02,
                          rotateY: 5,
                          rotateX: 5,
                        }}
                        className="mb-1.5 md:mb-2 cursor-pointer group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform-gpu"
                        style={{
                          transformStyle: 'preserve-3d',
                        }}
                        onClick={() => openLightbox(slideIndex)}
                      >
                        <Image 
                          src={isVideo ? (item.thumbnailUrl || '/images/p1.PNG') : item.mediaUrl} 
                          alt={`${item.title}`} 
                          width={400} 
                          height={isVideo ? 225 : 400}
                          loading="lazy"
                          className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                        
                        {/* Enhanced overlay with gradient and blur effect */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[1px] flex flex-col justify-end p-3"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <motion.h3 
                            className="text-white font-semibold text-sm md:text-base mb-1 truncate"
                            initial={{ y: 10, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            {item.title}
                          </motion.h3>
                          <motion.p 
                            className="text-gray-300 text-xs line-clamp-1"
                            initial={{ y: 10, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.15 }}
                          >
                            {item.camera || ''}
                          </motion.p>
                          <motion.p 
                            className="text-gray-300 text-xs line-clamp-1"
                            initial={{ y: 10, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {item.projectDetails || ''}
                          </motion.p>
                          
                          {/* Icon with enhanced animation */}
                          <motion.div
                            className="absolute top-3 right-3"
                            whileHover={{ 
                              scale: 1.2,
                              rotate: isVideo ? 360 : 0,
                            }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {isVideo ? (
                              <PlayCircle className="h-5 w-5 text-white drop-shadow-lg" />
                            ) : (
                              <Expand className="h-5 w-5 text-white drop-shadow-lg" />
                            )}
                          </motion.div>
                        </motion.div>

                        {/* Shimmer effect on hover */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                          initial={{ x: '-100%' }}
                          whileHover={{ 
                            x: '100%',
                            transition: { duration: 0.6, ease: "easeInOut" }
                          }}
                        >
                          <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12" />
                        </motion.div>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.p 
                    className="text-center text-muted-foreground col-span-full py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    No {activeFilter === 'all' ? '' : activeFilter} projects yet.
                  </motion.p>
                )}
              </Masonry>
            </motion.div>
          </AnimatePresence>
        )}
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
