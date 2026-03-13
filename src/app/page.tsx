'use client';

import React, { useState, useMemo, useCallback, Suspense } from 'react';
import { portfolioItems } from '@/data/portfolio-items';
import Video from 'yet-another-react-lightbox/plugins/video';
import type { Slide } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';
import { AnimatedHero } from '@/components/animated-hero';
import dynamic from 'next/dynamic';
import { analytics } from '@/lib/analytics';
import {
  PortfolioFilterSkeleton,
  VerticalCarouselSkeleton,
  PortfolioSectionSkeleton,
} from '@/components/loading-skeletons';
import ErrorBoundary from '@/components/ErrorBoundary';

// Optimized dynamic imports for faster initial load with prefetching
const PortfolioFilter = dynamic(
  () =>
    import('@/components/portfolio-filter').then(mod => ({
      default: mod.PortfolioFilter,
    })),
  {
    loading: () => <PortfolioFilterSkeleton />,
    ssr: false,
  }
);

const VerticalCarousel = dynamic(
  () =>
    import('@/components/vertical-carousel').then(mod => ({
      default: mod.VerticalCarousel,
    })),
  {
    loading: () => <VerticalCarouselSkeleton />,
    ssr: false,
  }
);

// Preload components when idle for better perceived performance
if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
  requestIdleCallback(() => {
    import('@/components/portfolio-filter');
    import('@/components/vertical-carousel');
  });
}

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

  // Memoized lightbox function
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    analytics.track({ name: 'lightbox_open', properties: { index } });
  }, []);

  return (
    <ErrorBoundary>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Skip to main content
      </a>

      <AnimatedHero />

      {/* About Section */}
      <section
        id="about"
        className="relative z-10 container mx-auto px-4 py-16 md:px-6 md:py-24 lg:px-8"
      >
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <motion.h2
            className="mb-6 text-center font-serif text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="from-foreground via-primary to-foreground bg-gradient-to-r bg-clip-text font-bold text-transparent">
              About
            </span>
          </motion.h2>
          <motion.div
            className="bg-primary/30 mx-auto mb-12 h-px w-16 md:mb-16 md:w-24"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          <motion.div
            className="space-y-6 text-center md:space-y-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <p className="text-muted-foreground font-sans text-sm leading-relaxed font-light tracking-tight md:text-base">
              Professional photographer and videographer specializing in visual
              storytelling for brands and creatives.
            </p>

            <p className="text-muted-foreground font-sans text-sm leading-relaxed font-light tracking-tight md:text-base">
              Based in Kuala Lumpur, Malaysia. Available for projects worldwide.
            </p>

            <div className="text-muted-foreground flex flex-col items-center gap-4 pt-4 text-xs font-light tracking-tight md:flex-row md:justify-center md:gap-6 md:text-sm">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>Kuala Lumpur, Malaysia</span>
              </div>
              <div className="bg-border h-4 w-px" />
              <a
                href="mailto:hazem@noveltyventures.uk"
                className="hover:text-primary flex items-center gap-2.5 transition-colors duration-300"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>hazem@noveltyventures.uk</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <main id="main-content">
        <Suspense fallback={<PortfolioSectionSkeleton />}>
          <section
            id="portfolio"
            className="relative z-10 container mx-auto px-4 pt-16 pb-16 md:px-6 md:pt-24 md:pb-24 lg:px-8"
          >
            <motion.div
              className="mb-12 text-center md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <motion.h2
                className="font-serif text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <span className="from-foreground via-primary to-foreground bg-gradient-to-r bg-clip-text font-bold text-transparent">
                  Portfolio
                </span>
              </motion.h2>
              <motion.div
                className="bg-primary/30 mx-auto mt-4 h-px w-16 md:mt-6 md:w-24"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </motion.div>

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
      </main>

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
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      />

      {/* Contact Section */}
      <section
        id="contact"
        className="relative z-10 container mx-auto px-4 py-16 md:px-6 md:py-24 lg:px-8"
      >
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <motion.h2
            className="mb-6 font-serif text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="from-foreground via-primary to-foreground bg-gradient-to-r bg-clip-text font-bold text-transparent">
              Contact
            </span>
          </motion.h2>
          <motion.div
            className="bg-primary/30 mx-auto mb-8 h-px w-16 md:w-24"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <motion.div
            className="flex flex-col items-center gap-4 md:flex-row md:justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <a
              href={`https://wa.me/60173767247?text=${encodeURIComponent(
                `Hi Hazem, I'd like to discuss a collaboration opportunity.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Hazem via WhatsApp"
              className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 hover:border-primary/50 rounded-sm border px-6 py-2.5 text-xs font-light tracking-tight backdrop-blur-sm transition-all duration-300 md:text-sm"
              onClick={() =>
                analytics.track({
                  name: 'cta_book_click',
                  properties: { channel: 'whatsapp' },
                })
              }
            >
              WhatsApp
            </a>
            <a
              href="mailto:hazem@noveltyventures.uk"
              className="text-muted-foreground hover:text-primary text-xs font-light tracking-tight transition-colors duration-300 md:text-sm"
            >
              hazem@noveltyventures.uk
            </a>
          </motion.div>
        </motion.div>
      </section>

      <ScrollToTopButton />
    </ErrorBoundary>
  );
}
