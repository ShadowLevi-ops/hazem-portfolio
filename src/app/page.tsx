'use client';

import React, { useState, useMemo, useCallback, Suspense } from 'react';
import { portfolioItems } from '@/data/portfolio-items';
import Video from 'yet-another-react-lightbox/plugins/video';
import type { Slide } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedHero } from '@/components/animated-hero';
import dynamic from 'next/dynamic';
import { analytics } from '@/lib/analytics';

// Optimized dynamic imports for faster initial load
const PortfolioFilter = dynamic(
  () =>
    import('@/components/portfolio-filter').then(mod => ({
      default: mod.PortfolioFilter,
    })),
  { loading: () => <div className="h-12 w-full bg-transparent" />, ssr: false }
);

const VerticalCarousel = dynamic(
  () =>
    import('@/components/vertical-carousel').then(mod => ({
      default: mod.VerticalCarousel,
    })),
  { loading: () => <div className="h-64 w-full bg-transparent" />, ssr: false }
);

const ScrollToTopButton = dynamic(
  () =>
    import('@/components/scroll-to-top-button').then(mod => ({
      default: mod.ScrollToTopButton,
    })),
  { ssr: false }
);

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), {
  ssr: false,
  loading: () => null,
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
        sources: [
          {
            src: item.mediaUrl,
            type: 'video/mp4',
            // Add color space attributes to prevent oversaturation
            colorSpace: 'srgb',
            colorGamut: 'srgb',
          },
        ],
        title: item.title,
        description: `${item.camera ? item.camera + ' | ' : ''}${item.projectDetails || ''}`,
        poster: item.thumbnailUrl || '/videos/VT-1.png',
        // Add video attributes for proper color handling
        attributes: {
          style: 'color-scheme: light dark; color-interpolation-filters: sRGB;',
          'data-color-space': 'srgb',
        },
      })),
      ...photographyItems.map(item => ({
        src: item.mediaUrl,
        title: item.title,
        description: `${item.camera ? item.camera + ' | ' : ''}${item.projectDetails || ''}`,
      })),
    ],
    [videoItems, photographyItems]
  );

  const selectedTitle = useMemo(() => {
    if (lightboxIndex < videoItems.length) {
      return videoItems[lightboxIndex]?.title || 'Homepage';
    }
    const photoIndex = lightboxIndex - videoItems.length;
    return photographyItems[photoIndex]?.title || 'Homepage';
  }, [lightboxIndex, videoItems, photographyItems]);

  // Memoized lightbox function
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    analytics.track({ name: 'lightbox_open', properties: { index } });
  }, []);

  return (
    <>
      <AnimatedHero />

      {/* Portfolio Section with Filter */}
      <Suspense fallback={<div className="h-96 w-full bg-transparent" />}>
        <section
          id="portfolio"
          className="relative z-10 container mx-auto px-4 pt-8 pb-8 md:px-6 md:pt-12 md:pb-12 lg:px-8"
        >
          <motion.h2
            className="mb-6 text-center text-2xl font-bold md:mb-8 md:text-3xl lg:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <span className="from-primary bg-gradient-to-r to-purple-500 bg-clip-text text-transparent">
              My Work
            </span>
          </motion.h2>

          <PortfolioFilter
            activeFilter={activeFilter}
            onFilterChange={filter => {
              setActiveFilter(filter);
              analytics.track({
                name: 'filter_change',
                properties: { filter },
              });
            }}
            counts={filterCounts}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
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
      </Suspense>

      <Lightbox
        open={lightboxOpen}
        close={() => {
          setLightboxOpen(false);
          analytics.track({ name: 'lightbox_close' });
        }}
        index={lightboxIndex}
        slides={allSlides}
        plugins={[Video]}
        on={{
          view: ({ index }) =>
            analytics.track({ name: 'lightbox_view', properties: { index } }),
        }}
      />

      {/* Floating booking button */}
      <a
        href={`${process.env.NEXT_PUBLIC_BOOKING_URL || 'https://cal.com/'}?context=${encodeURIComponent(selectedTitle)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary text-primary-foreground fixed right-4 bottom-4 z-40 rounded-full px-4 py-2 text-sm font-medium shadow-lg transition-transform hover:scale-105"
        onClick={() => analytics.track({ name: 'cta_book_click' })}
      >
        Book a shoot
      </a>

      <ScrollToTopButton />
    </>
  );
}
