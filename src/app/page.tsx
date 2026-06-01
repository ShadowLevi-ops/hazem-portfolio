'use client';

import React, { useState, useMemo, useCallback, Suspense } from 'react';
import { portfolioItems } from '@/data/portfolio-items';
import type { Slide } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedHero } from '@/components/animated-hero';
import { CaseStudiesSection } from '@/components/case-studies-section';
import { FieldNotesSection } from '@/components/field-notes-section';
import { LightboxVideoPlayer } from '@/components/lightbox-video-player';
import dynamic from 'next/dynamic';
import { analytics } from '@/lib/analytics';
import Link from 'next/link';
import {
  PortfolioFilterSkeleton,
  VerticalCarouselSkeleton,
  PortfolioSectionSkeleton,
} from '@/components/loading-skeletons';
import ErrorBoundary from '@/components/ErrorBoundary';
import type { PortfolioItem } from '@/types/portfolio';
import {
  isHorizontalVideoItem,
  lightboxCaptionDescription,
  portfolioDisplayTitle,
} from '@/lib/portfolio-display';
import { getWhatsAppUrl, CONTACT_WHATSAPP_MESSAGE } from '@/lib/whatsapp';

type PortfolioVideoSlide = {
  type: 'video';
  sources: Array<{ src: string; type: string }>;
  poster?: string;
  width?: number;
  height?: number;
  title?: string;
  description?: string;
};

type PortfolioSlide = Slide | PortfolioVideoSlide;

const getItemSortTimestamp = (item: PortfolioItem): number => {
  const idMatch = item.id.match(/-(\d+)$/);
  if (idMatch?.[1]) return Number.parseInt(idMatch[1], 10);
  return 0;
};

const sortNewestFirst = (items: PortfolioItem[]): PortfolioItem[] =>
  [...items].sort((a, b) => getItemSortTimestamp(b) - getItemSortTimestamp(a));

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

/** Fullscreen info footer rendered under footage (no overlap). */
function PortfolioLightboxSlideFooter({ slide }: { slide: Slide }) {
  const { title, description: desc } = slide as Slide & {
    title?: React.ReactNode;
    description?: React.ReactNode;
  };
  const hasTitle =
    title != null && (typeof title !== 'string' || title.trim().length > 0);
  const hasDesc =
    desc != null && (typeof desc !== 'string' || desc.trim().length > 0);

  if (!hasTitle && !hasDesc) {
    return null;
  }

  const descLines =
    typeof desc === 'string'
      ? desc
          .split('\n')
          .map(line => line.trim())
          .filter(Boolean)
      : [];
  const typeLine = descLines[0] || '';
  const infoLines = descLines.slice(1);
  const infoRows = infoLines.map((line, index) => {
    const sep = line.indexOf('·');
    if (sep >= 0) {
      return {
        id: `${index}-${line}`,
        label: line.slice(0, sep).trim(),
        value: line.slice(sep + 1).trim(),
      };
    }
    return {
      id: `${index}-${line}`,
      label: 'Details',
      value: line,
    };
  });
  const caseStudyRow = infoRows.find(
    row => row.label.toLowerCase() === 'case study'
  );
  const detailRows = infoRows.filter(
    row => row.label.toLowerCase() !== 'case study'
  );

  return (
    <div className="lightbox-portfolio-footer min-h-0 w-full shrink-0 px-1 sm:px-2">
      <div
        className="rounded-lg border border-white/15 bg-black/82 px-3 py-2 text-left text-white shadow-lg backdrop-blur-md sm:px-4 sm:py-2.5"
        data-lightbox-caption=""
      >
        {hasTitle ? (
          <p className="text-sm leading-snug font-semibold tracking-[-0.01em] sm:text-base">
            {title}
          </p>
        ) : null}
        {typeLine ? (
          <p className="mt-1 text-[10px] font-medium tracking-[0.1em] text-white/75 uppercase sm:text-[11px]">
            {typeLine}
          </p>
        ) : null}

        {caseStudyRow || detailRows.length > 0 ? (
          <div className="lightbox-portfolio-footer-details mt-3 space-y-3">
            {caseStudyRow ? (
              <div className="border-primary/30 bg-primary/10 rounded-md border px-3 py-2.5 sm:px-3.5 sm:py-3">
                <p className="text-primary/90 text-[10px] tracking-[0.12em] uppercase">
                  Case Study
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-white/95 sm:text-sm">
                  {caseStudyRow.value}
                </p>
              </div>
            ) : null}

            {detailRows.length > 0 ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {detailRows.map(row => (
                  <div
                    key={row.id}
                    className={`rounded-md border border-white/10 bg-black/40 px-2.5 py-2 sm:px-3 sm:py-2.5 ${
                      row.label.toLowerCase() === 'project brief' ||
                      row.label.toLowerCase() === 'extended brief'
                        ? 'sm:col-span-2'
                        : ''
                    }`}
                  >
                    <p className="text-[9px] tracking-[0.1em] text-white/60 uppercase sm:text-[10px]">
                      {row.label}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-white/95 sm:text-xs">
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const portfolioItemsVisible = useMemo(
    () => portfolioItems.filter(item => item.id !== 'video-11'),
    []
  );

  const services = [
    { label: 'Videography', href: '/services/videography' },
    { label: 'Photography', href: '/services/photography' },
    { label: 'Social Media', href: '/services/social-media' },
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
    if (activeFilter === 'all') {
      const videos = sortNewestFirst(
        portfolioItemsVisible.filter(
          item => item.type === 'videography' || item.type === 'film'
        )
      );
      const photography = sortNewestFirst(
        portfolioItemsVisible.filter(item => item.type === 'photography')
      );
      return [...videos, ...photography];
    }

    if (activeFilter === 'video') {
      return sortNewestFirst(
        portfolioItemsVisible.filter(
          item => item.type === 'videography' || item.type === 'film'
        )
      );
    }
    return sortNewestFirst(
      portfolioItemsVisible.filter(item => item.type === activeFilter)
    );
  }, [activeFilter, portfolioItemsVisible]);

  // Memoized categorized items
  const { photographyItems, videoItems, filterCounts } = useMemo(() => {
    const photography = sortNewestFirst(
      portfolioItemsVisible.filter(item => item.type === 'photography')
    );
    const video = sortNewestFirst(
      portfolioItemsVisible.filter(
        item => item.type === 'videography' || item.type === 'film'
      )
    );

    const counts = {
      all: portfolioItemsVisible.length,
      photography: photography.length,
      video: video.length,
    };

    return {
      photographyItems: photography,
      videoItems: video,
      filterCounts: counts,
    };
  }, [portfolioItemsVisible]);

  // Memoized slides array
  const allSlides: PortfolioSlide[] = useMemo(
    () => [
      ...videoItems.map(item => ({
        type: 'video' as const,
        sources: [
          {
            src: item.mediaUrl,
            type: 'video/mp4',
          },
        ],
        title: portfolioDisplayTitle(item),
        description: lightboxCaptionDescription(item),
        poster: item.thumbnailUrl || '/videos/VT-1.webp',
        ...(isHorizontalVideoItem(item)
          ? { width: 1920, height: 1080 }
          : { width: 1080, height: 1920 }),
      })),
      ...photographyItems.map(item => ({
        src: item.mediaUrl,
        title: portfolioDisplayTitle(item),
        description: lightboxCaptionDescription(item),
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

      <FieldNotesSection />

      <CaseStudiesSection />

      {/* Services Section */}
      <section id="services" className="section-shell pb-16 md:pb-24">
        <motion.div
          className="mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-header">
            <p className="section-kicker">On set &amp; in edit</p>
            <h2 className="section-title">Services</h2>
            <p className="section-copy">
              One shoot day. Hero film, Reels, Stories, cutdowns. Built to ship,
              not sit in a folder.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {services.map(service => (
              <motion.div
                key={typeof service === 'string' ? service : service.label}
                className="surface-card hover:border-primary/40 rounded-md px-3 py-3 text-center text-xs tracking-[0.14em] uppercase transition-all duration-300 hover:-translate-y-0.5 md:px-4 md:py-4 md:text-sm"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {typeof service === 'string' ? (
                  service
                ) : (
                  <Link href={service.href} className="inline-block w-full">
                    {service.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="section-shell pb-16 md:pb-24">
        <motion.div
          className="mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-6 text-center md:mb-8">
            <h3 className="text-foreground text-lg font-semibold tracking-[0.12em] uppercase md:text-xl">
              Usually finds us on set for
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {industries.map(industry => (
              <motion.span
                key={industry}
                className="glass rounded-full px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase md:px-4 md:py-2 md:text-xs"
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
            className="section-shell pt-16 pb-16 md:pt-24 md:pb-24"
          >
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <motion.h2
                className="font-serif text-lg leading-tight font-semibold tracking-[-0.02em] sm:text-xl md:text-5xl"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                Portfolio
              </motion.h2>
              <motion.p
                className="text-muted-foreground mx-auto mt-2 max-w-2xl px-1 text-xs leading-relaxed md:mt-4 md:px-0 md:text-base"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                Scroll the feed. Tap anything. Full brief inside.
              </motion.p>
              <motion.div
                className="bg-primary/30 mx-auto mt-3 h-px w-12 md:mt-6 md:w-24"
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
        slides={allSlides as Slide[]}
        carousel={{ preload: 2 }}
        animation={{ fade: 260, swipe: 320 }}
        styles={{
          slide: {
            paddingTop: '3rem',
            paddingBottom: '1rem',
            overflow: 'hidden',
          },
        }}
        render={{
          slideContainer: ({ slide, children }) => (
            <div className="lightbox-portfolio-slide">
              <div className="lightbox-portfolio-media">{children}</div>
              <PortfolioLightboxSlideFooter slide={slide} />
            </div>
          ),
          slide: ({ slide, offset }) => {
            const portfolioSlide = slide as PortfolioSlide;
            if (
              !('type' in portfolioSlide) ||
              portfolioSlide.type !== 'video' ||
              offset !== 0
            ) {
              return undefined;
            }

            const src = portfolioSlide.sources[0]?.src;
            if (!src) return undefined;

            return (
              <LightboxVideoPlayer
                src={src}
                poster={portfolioSlide.poster}
                isActive={lightboxOpen && offset === 0}
              />
            );
          },
        }}
        on={{
          view: ({ index }) =>
            analytics.track({ name: 'lightbox_view', properties: { index } }),
        }}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      />

      {/* Contact Section */}
      <section id="contact" className="section-shell section-block">
        <motion.div
          className="mx-auto max-w-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <motion.h2
            className="mb-4 font-serif text-2xl leading-tight font-semibold tracking-[-0.02em] md:text-3xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Got a drop date?
          </motion.h2>
          <motion.p
            className="text-muted-foreground mx-auto mb-6 max-w-md text-sm leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            WhatsApp is fastest. Brief form works too.
          </motion.p>
          <motion.div
            className="bg-primary/30 mx-auto mb-6 h-px w-12 md:w-16"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <motion.div
            className="flex flex-col items-center gap-3 md:flex-row md:justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <a
              href={getWhatsAppUrl(CONTACT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Hazem via WhatsApp"
              className="from-primary to-primary/80 text-primary-foreground hover:to-primary rounded-full border border-transparent bg-gradient-to-r px-5 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase shadow-md shadow-black/15 transition-all duration-300 hover:-translate-y-0.5 md:px-6 md:py-2.5 md:text-sm"
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
              className="text-muted-foreground hover:text-primary rounded-full border border-white/20 px-3.5 py-1.5 text-[11px] tracking-[0.12em] uppercase backdrop-blur-sm transition-colors duration-300 md:px-4 md:py-2 md:text-sm"
            >
              hazem@noveltyventures.uk
            </a>
            <Link
              href="/book"
              className="text-muted-foreground hover:text-primary rounded-full border border-white/20 px-3.5 py-1.5 text-[11px] tracking-[0.12em] uppercase backdrop-blur-sm transition-colors duration-300 md:px-4 md:py-2 md:text-sm"
              onClick={() =>
                analytics.track({
                  name: 'cta_book_click',
                  properties: { channel: 'book_page' },
                })
              }
            >
              Brief Form
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <ScrollToTopButton />
    </ErrorBoundary>
  );
}
