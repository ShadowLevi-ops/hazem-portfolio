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
  const services = [
    'Videography',
    'Photography',
    'Social Media',
    'Branding',
    'Websites',
    'Creative Strategy',
  ];
  const industries = [
    'Fashion',
    'Sports',
    'Hospitality',
    'Health & Beauty',
    'Automotive',
    'Tourism',
    'Real Estate',
    'Lifestyle',
  ];

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
          },
        ],
        title: item.title,
        description: `${item.camera ? item.camera + ' | ' : ''}${item.projectDetails || ''}`,
        poster: item.thumbnailUrl || '/videos/VT-1.png',
        // Reasonable default aspect for vertical reels
        width: 1080,
        height: 1920,
        controls: true,
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
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
              GiltMedia is a Kuala Lumpur-based creative studio for brands,
              agencies, and visionaries who want culturally relevant visual
              storytelling.
            </p>

            <p className="text-muted-foreground font-sans text-sm leading-relaxed font-light tracking-tight md:text-base">
              From short-form films to campaign photography, we build work that
              feels premium, modern, and built for impact.
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

      {/* Services Section */}
      <section
        id="services"
        className="relative z-10 container mx-auto px-4 pb-16 md:px-6 md:pb-24 lg:px-8"
      >
        <motion.div
          className="mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8 text-center md:mb-12">
            <h2 className="font-serif text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              <span className="from-foreground via-primary to-foreground bg-gradient-to-r bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-sm font-light tracking-tight md:text-base">
              Strategy-led creative production built for social-first brands and
              campaigns.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {services.map(service => (
              <motion.div
                key={service}
                className="surface-card hover:border-primary/40 rounded-md px-3 py-3 text-center text-xs font-light tracking-tight transition-all duration-300 hover:-translate-y-0.5 md:px-4 md:py-4 md:text-sm"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {service}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Industries Section */}
      <section className="relative z-10 container mx-auto px-4 pb-16 md:px-6 md:pb-24 lg:px-8">
        <motion.div
          className="mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-6 text-center md:mb-8">
            <h3 className="text-foreground text-lg font-bold tracking-tight md:text-xl">
              Industries We Work With
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {industries.map(industry => (
              <motion.span
                key={industry}
                className="glass rounded-md px-3 py-1.5 text-[10px] font-light tracking-tight md:px-4 md:py-2 md:text-xs"
                whileHover={{ y: -1 }}
              >
                {industry}
              </motion.span>
            ))}
          </div>
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
              Let&apos;s Talk
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
              className="from-primary to-primary/80 text-primary-foreground hover:to-primary rounded-full border border-transparent bg-gradient-to-r px-6 py-2.5 text-xs font-medium tracking-tight shadow-md shadow-black/15 transition-all duration-300 hover:-translate-y-0.5 md:px-8 md:py-3.5 md:text-base"
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
              className="text-muted-foreground hover:text-primary rounded-full border border-white/20 px-4 py-2 text-xs font-light tracking-tight backdrop-blur-sm transition-colors duration-300 md:text-base"
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
