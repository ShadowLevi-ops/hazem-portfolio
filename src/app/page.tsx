'use client';

import React, {
  useState,
  useMemo,
  useCallback,
  Suspense,
  useRef,
  useLayoutEffect,
} from 'react';
import { portfolioItems } from '@/data/portfolio-items';
import Video from 'yet-another-react-lightbox/plugins/video';
import type { Slide } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedHero } from '@/components/animated-hero';
import { FeaturedWork } from '@/components/featured-work';
import dynamic from 'next/dynamic';
import { analytics } from '@/lib/analytics';
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

const FEATURED_PROJECT_IDS: readonly string[] = [
  'video-16',
  'video-14',
  'video-10',
];

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

/**
 * Wraps slide media and pins the caption to the real video/img box. Video slides use a
 * full-size wrapper div (100%×100%), so absolute top/left on the outer box lands in the
 * letterboxing — we measure `video` / `img.yarl__slide_image` instead.
 */
function PortfolioLightboxSlideContainer({
  slide,
  children,
}: {
  slide: Slide;
  children: React.ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [anchor, setAnchor] = useState<{
    top: number;
    left: number;
    maxWidth: number;
  } | null>(null);

  const { title, description: desc } = slide as Slide & {
    title?: React.ReactNode;
    description?: React.ReactNode;
  };
  const hasTitle =
    title != null && (typeof title !== 'string' || title.trim().length > 0);
  const hasDesc =
    desc != null && (typeof desc !== 'string' || desc.trim().length > 0);

  const measure = useCallback(() => {
    const root = wrapRef.current;
    if (!root) return;

    const media = root.querySelector<HTMLElement>(
      'video, img.yarl__slide_image'
    );
    if (!media) {
      setAnchor(prev => (prev === null ? prev : null));
      return;
    }

    const rr = root.getBoundingClientRect();
    const mr = media.getBoundingClientRect();
    if (mr.width < 2 || mr.height < 2) {
      setAnchor(prev => (prev === null ? prev : null));
      return;
    }

    const next = {
      top: mr.top - rr.top,
      left: mr.left - rr.left,
      maxWidth: Math.max(120, Math.min(mr.width - 8, 352)),
    };
    setAnchor(prev => {
      if (
        prev &&
        prev.top === next.top &&
        prev.left === next.left &&
        prev.maxWidth === next.maxWidth
      ) {
        return prev;
      }
      return next;
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    const raf = requestAnimationFrame(() => measure());

    const root = wrapRef.current;
    if (!root) {
      return () => cancelAnimationFrame(raf);
    }

    const media = root.querySelector<HTMLElement>(
      'video, img.yarl__slide_image'
    );
    const ro = new ResizeObserver(() => measure());
    ro.observe(root);
    if (media) ro.observe(media);

    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure, slide, children]);

  if (!hasTitle && !hasDesc) {
    return <>{children}</>;
  }

  return (
    <div ref={wrapRef} className="relative h-full min-h-0 w-full min-w-0">
      {children}
      {anchor ? (
        <div
          className="pointer-events-none absolute z-[2] rounded-br-md border border-white/10 bg-black/60 px-2.5 py-2 text-left text-white shadow-sm backdrop-blur-sm sm:px-3 sm:py-2.5"
          style={{
            top: anchor.top,
            left: anchor.left,
            maxWidth: anchor.maxWidth,
          }}
          data-lightbox-caption=""
        >
          {hasTitle ? (
            <p className="text-[12px] leading-snug font-semibold tracking-[-0.01em] sm:text-[13px]">
              {title}
            </p>
          ) : null}
          {hasDesc ? (
            <p className="mt-0.5 text-[10px] leading-relaxed whitespace-pre-line text-white/90 sm:text-[11px]">
              {desc}
            </p>
          ) : null}
        </div>
      ) : null}
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

  const featuredItems = useMemo(
    () =>
      FEATURED_PROJECT_IDS.map(id =>
        portfolioItems.find(item => item.id === id)
      ).filter((item): item is PortfolioItem => Boolean(item)),
    []
  );
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
        title: portfolioDisplayTitle(item),
        description: lightboxCaptionDescription(item),
        poster: item.thumbnailUrl || '/videos/VT-1.png',
        // Horizontal 16:9 fills wide lightbox; vertical reels stay 9:16
        ...(isHorizontalVideoItem(item)
          ? { width: 1920, height: 1080 }
          : { width: 1080, height: 1920 }),
        controls: true,
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        preload: 'metadata' as const,
        controlsList: 'nodownload noplaybackrate' as const,
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

  const openPortfolioItem = useCallback(
    (item: PortfolioItem) => {
      const isVideo = item.type === 'videography' || item.type === 'film';
      const slideIndex = isVideo
        ? videoItems.findIndex(v => v.id === item.id)
        : videoItems.length + photographyItems.findIndex(p => p.id === item.id);
      if (slideIndex < 0) return;
      openLightbox(slideIndex);
      analytics.track({
        name: 'featured_work_click',
        properties: { id: item.id },
      });
    },
    [videoItems, photographyItems, openLightbox]
  );

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

      {featuredItems.length > 0 ? (
        <FeaturedWork items={featuredItems} onSelect={openPortfolioItem} />
      ) : null}

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
            <p className="section-kicker">Capabilities</p>
            <h2 className="section-title">Services</h2>
            <p className="section-copy">
              Strategy-led creative production built for social-first brands and
              campaigns.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {services.map(service => (
              <motion.div
                key={service}
                className="surface-card hover:border-primary/40 rounded-md px-3 py-3 text-center text-xs tracking-[0.14em] uppercase transition-all duration-300 hover:-translate-y-0.5 md:px-4 md:py-4 md:text-sm"
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
              Industries We Work With
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
                Explore selected work and tap any card to view full details.
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
        slides={allSlides}
        plugins={[Video]}
        render={{
          slideContainer: ({ slide, children }) => (
            <PortfolioLightboxSlideContainer slide={slide}>
              {children}
            </PortfolioLightboxSlideContainer>
          ),
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
            Let&apos;s Talk
          </motion.h2>
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
              href={`https://wa.me/60173767247?text=${encodeURIComponent(
                `Hi Hazem, I'd like to discuss a collaboration opportunity.`
              )}`}
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
          </motion.div>
        </motion.div>
      </section>

      <ScrollToTopButton />
    </ErrorBoundary>
  );
}
