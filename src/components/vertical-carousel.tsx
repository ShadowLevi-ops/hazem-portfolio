'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Expand } from 'lucide-react';
import type { PortfolioItem } from '@/types/portfolio';

// Auto-playing video component with Intersection Observer
function VideoAutoPlay({
  src,
  poster,
  captionsUrl,
  lowDataMode,
}: {
  src: string;
  poster?: string;
  captionsUrl?: string;
  lowDataMode: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (lowDataMode) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const playWhenReady = () => {
      if (isInViewRef.current && video.readyState >= 2) {
        video.play().catch(() => {
          // Silently handle autoplay restrictions (e.g. some mobile browsers)
        });
      }
    };

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          isInViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            setShouldLoad(true);
            // Play once video has loaded (handled by canplay listener)
            playWhenReady();
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: '240px',
      }
    );

    observer.observe(container);

    video.addEventListener('canplay', playWhenReady);
    video.addEventListener('loadeddata', playWhenReady);

    const eagerLoadOnHover = () => setShouldLoad(true);
    container.addEventListener('mouseenter', eagerLoadOnHover);
    container.addEventListener('touchstart', eagerLoadOnHover, {
      passive: true,
    });

    return () => {
      observer.disconnect();
      video.removeEventListener('canplay', playWhenReady);
      video.removeEventListener('loadeddata', playWhenReady);
      container.removeEventListener('mouseenter', eagerLoadOnHover);
      container.removeEventListener('touchstart', eagerLoadOnHover);
      video.pause();
    };
  }, [src, lowDataMode]);

  if (hasError || lowDataMode) return null;

  return (
    <div ref={containerRef} className="absolute inset-0">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
        muted
        loop
        playsInline
        controls={false}
        preload={shouldLoad ? 'metadata' : 'none'}
        poster={poster}
        onError={() => {
          setHasError(true);
        }}
      >
        {shouldLoad && <source src={src} type="video/mp4" />}
        {captionsUrl && (
          <track
            kind="captions"
            srcLang="en"
            src={captionsUrl}
            label="English captions"
            default
          />
        )}
      </video>
    </div>
  );
}

interface VerticalCarouselProps {
  items: PortfolioItem[];
  onItemClick: (index: number) => void;
}

export function VerticalCarousel({
  items,
  onItemClick,
}: VerticalCarouselProps) {
  const showLabels = process.env.NEXT_PUBLIC_SHOW_LABELS === 'true';
  const reduceMotion = useReducedMotion();
  const [lowDataMode, setLowDataMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)');

    const getConnection = () =>
      (
        navigator as Navigator & {
          connection?: {
            saveData?: boolean;
            effectiveType?: string;
            addEventListener?: (type: string, listener: () => void) => void;
            removeEventListener?: (type: string, listener: () => void) => void;
          };
        }
      ).connection;

    const shouldUseLowDataMode = () => {
      const connection = getConnection();
      const saveData = Boolean(connection?.saveData);
      const effectiveType = connection?.effectiveType || '';
      const isSlowConnection =
        effectiveType.includes('2g') || effectiveType === '3g';

      // Mobile/coarse pointers and reduced-motion devices get poster-first cards.
      return saveData || isSlowConnection || mediaQuery.matches || reduceMotion;
    };

    const updateMode = () => setLowDataMode(shouldUseLowDataMode());
    updateMode();

    const connection = getConnection();
    mediaQuery.addEventListener('change', updateMode);
    connection?.addEventListener?.('change', updateMode);

    return () => {
      mediaQuery.removeEventListener('change', updateMode);
      connection?.removeEventListener?.('change', updateMode);
    };
  }, [reduceMotion]);

  if (items.length === 0) {
    return (
      <div className="text-muted-foreground flex h-64 items-center justify-center md:h-96">
        No items to display
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-7xl">
      {/* Refined container */}
      <div className="surface-card relative overflow-hidden rounded-lg backdrop-blur-sm md:rounded-xl">
        <motion.div
          initial={{ opacity: 0, transform: 'translate3d(0,0,0)' }}
          animate={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="p-4 will-change-transform md:p-8"
        >
          {/* Refined grid layout */}
          <div className="grid grid-cols-3 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8">
            {items.map((item, index) => {
              const isVideo =
                item.type === 'videography' || item.type === 'film';
              const isOngoingProject =
                item.projectDetails === 'ONGOING PROJECT';

              return (
                <motion.article
                  key={item.id}
                  className="group border-border/30 focus-visible:ring-primary bg-card/25 hover:border-primary/30 hover:bg-card/35 relative aspect-[9/16] cursor-pointer overflow-hidden rounded-md border transition-all duration-300 will-change-transform outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:rounded-lg"
                  role="button"
                  aria-label={`View ${item.title} - ${item.type}`}
                  aria-describedby={`item-description-${item.id}`}
                  whileHover={
                    reduceMotion
                      ? {}
                      : { scale: 1.02, transition: { duration: 0.15 } }
                  }
                  whileTap={
                    reduceMotion
                      ? {}
                      : { scale: 0.98, transition: { duration: 0.1 } }
                  }
                  onClick={() => onItemClick(index)}
                  initial={{ opacity: 0, transform: 'translate3d(0,0,0)' }}
                  animate={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(index * 0.02, 0.3),
                    ease: 'easeOut',
                  }}
                  style={{ transform: 'translate3d(0,0,0)' }}
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onItemClick(index);
                    }
                  }}
                >
                  <span id={`item-description-${item.id}`} className="sr-only">
                    {item.projectDetails || item.type}
                    {item.camera && ` - Shot with ${item.camera}`}
                  </span>
                  {/* Optimized image with optional video hover preview */}
                  <div
                    className="relative h-full w-full will-change-transform"
                    style={{ backgroundColor: item.dominantColor || '#0b0b0b' }}
                  >
                    <Image
                      src={
                        isVideo
                          ? item.thumbnailUrl || '/images/p1.PNG'
                          : item.mediaUrl
                      }
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-200 ease-out will-change-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
                      loading={index < 6 ? 'eager' : 'lazy'}
                      quality={index < 4 ? 85 : 70}
                      priority={index < 4}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />

                    {isVideo && (
                      <VideoAutoPlay
                        src={item.mediaUrl}
                        poster={item.thumbnailUrl || '/images/p1.PNG'}
                        lowDataMode={lowDataMode}
                        {...(item.captionsUrl && {
                          captionsUrl: item.captionsUrl,
                        })}
                      />
                    )}
                  </div>

                  {/* Refined overlay - darker */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Ongoing Project Overlay */}
                  {isOngoingProject && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="rounded-lg border border-white/30 bg-white/20 px-2 py-1 backdrop-blur-sm">
                          <div className="text-[10px] font-bold tracking-wide text-white">
                            ONGOING PROJECT
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showLabels && !isOngoingProject && (
                    <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2">
                      <div className="rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm md:px-2.5 md:py-1.5 md:text-xs">
                        {item.projectDetails || item.type}
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-4 lg:p-5">
                    {/* Expand indicator - optimized for mobile */}
                    <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2">
                      <div className="rounded-full bg-white/20 p-1 backdrop-blur-sm md:p-1.5">
                        <Expand className="h-2.5 w-2.5 text-white md:h-3 md:w-3" />
                      </div>
                    </div>

                    {/* Title overlay - fades in on hover */}
                    <div className="absolute right-3 bottom-3 left-3 md:right-4 md:bottom-4 md:left-4">
                      <div className="font-sans text-[10px] leading-tight font-bold tracking-tight text-white md:text-xs">
                        <div className="mb-1 line-clamp-2 break-words">
                          {item.title}
                        </div>
                        <div className="text-[9px] font-bold tracking-tight text-white/80 uppercase md:text-[10px]">
                          {item.type === 'videography' || item.type === 'film'
                            ? 'Video'
                            : 'Photography'}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
