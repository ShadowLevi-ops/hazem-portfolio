'use client';

import React, { useState, useMemo, useCallback, Suspense } from 'react';
import { portfolioItems } from '@/data/portfolio-items';
import Video from 'yet-another-react-lightbox/plugins/video';
import type { Slide } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedHero } from '@/components/animated-hero';
import dynamic from 'next/dynamic';

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

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
  }, []);

  const openDrawer = useCallback((itemId: string) => {
    setSelectedItemId(itemId);
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setSelectedItemId(null);
  }, []);

  const selectedItem = useMemo(() => {
    return selectedItemId
      ? portfolioItems.find(i => i.id === selectedItemId) || null
      : null;
  }, [selectedItemId]);

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
            onFilterChange={setActiveFilter}
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
                onDetailsClick={item => openDrawer(item.id)}
              />
            </motion.div>
          </AnimatePresence>
        </section>
      </Suspense>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={allSlides}
        plugins={[Video]}
      />

      {/* Quick-view drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 transform transition-transform duration-300 ${
          drawerOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        aria-hidden={!drawerOpen}
      >
        <div className="container mx-auto px-4 pt-4 pb-6 md:px-6 lg:px-8">
          <div className="bg-background/95 rounded-t-2xl border p-4 shadow-xl backdrop-blur md:p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold md:text-lg">
                Project Details
              </h3>
              <button
                type="button"
                className="border-border hover:bg-accent rounded-md border px-2 py-1 text-sm"
                onClick={closeDrawer}
              >
                Close
              </button>
            </div>
            {selectedItem && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                  <div className="text-muted-foreground text-sm">Title</div>
                  <div className="text-base font-medium">
                    {selectedItem.title}
                  </div>
                  {selectedItem.projectDetails && (
                    <div className="mt-3">
                      <div className="text-muted-foreground text-sm">
                        Project
                      </div>
                      <div className="text-base">
                        {selectedItem.projectDetails}
                      </div>
                    </div>
                  )}
                  {selectedItem.client && (
                    <div className="mt-3">
                      <div className="text-muted-foreground text-sm">
                        Client
                      </div>
                      <div className="text-base">{selectedItem.client}</div>
                    </div>
                  )}
                  {selectedItem.camera && (
                    <div className="mt-3">
                      <div className="text-muted-foreground text-sm">
                        Camera
                      </div>
                      <div className="text-base">{selectedItem.camera}</div>
                    </div>
                  )}
                  {selectedItem.date && (
                    <div className="mt-3">
                      <div className="text-muted-foreground text-sm">Date</div>
                      <div className="text-base">{selectedItem.date}</div>
                    </div>
                  )}
                </div>
                <div className="">
                  <div className="text-muted-foreground text-sm">Preview</div>
                  <div className="relative mt-2 aspect-video w-full overflow-hidden rounded-lg border">
                    {selectedItem.type === 'videography' ||
                    selectedItem.type === 'film' ? (
                      <video
                        className="h-full w-full object-cover"
                        src={selectedItem.mediaUrl}
                        poster={selectedItem.thumbnailUrl || '/videos/VT-1.png'}
                        controls
                        playsInline
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={selectedItem.mediaUrl}
                        alt={selectedItem.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </>
  );
}
