'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { portfolioItems } from '@/data/portfolio-items';
import Video from 'yet-another-react-lightbox/plugins/video';
import type { Slide } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedHero } from '@/components/animated-hero';
import dynamic from 'next/dynamic';

// Dynamic imports for performance
const PortfolioFilter = dynamic(
  () =>
    import('@/components/portfolio-filter').then(mod => ({
      default: mod.PortfolioFilter,
    })),
  {
    loading: () => (
      <div className="bg-muted/20 h-16 w-full animate-pulse rounded-lg" />
    ),
  }
);

const VerticalCarousel = dynamic(
  () =>
    import('@/components/vertical-carousel').then(mod => ({
      default: mod.VerticalCarousel,
    })),
  {
    loading: () => (
      <div className="bg-muted/20 h-96 w-full animate-pulse rounded-lg" />
    ),
  }
);

const ScrollToTopButton = dynamic(
  () =>
    import('@/components/scroll-to-top-button').then(mod => ({
      default: mod.ScrollToTopButton,
    })),
  {
    ssr: false,
  }
);

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white" />
    </div>
  ),
});

export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');

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
