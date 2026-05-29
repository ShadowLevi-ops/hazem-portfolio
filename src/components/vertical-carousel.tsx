'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Expand } from 'lucide-react';
import type { PortfolioItem } from '@/types/portfolio';
import { portfolioDisplayTitle } from '@/lib/portfolio-display';
import {
  projectCardTag,
  projectCardTeaser,
  projectCardClient,
  projectCardIndustry,
} from '@/lib/project-card-labels';
import { PortfolioVideoPreview } from '@/components/portfolio-video-preview';
import { shouldPreferStaticMedia } from '@/lib/video-playback';

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
      const prefersReducedMotion = Boolean(reduceMotion);
      return shouldPreferStaticMedia() || prefersReducedMotion;
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
          className="p-5 will-change-transform md:p-10"
        >
          {/* Fewer columns = larger cards; info uses compact type */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-7 lg:grid-cols-3 lg:gap-8">
            {items.map((item, index) => {
              const isVideo =
                item.type === 'videography' || item.type === 'film';
              const fallbackVideoSrc = item.mediaUrl;
              const inferredPreviewSrc = fallbackVideoSrc.replace(
                '/videos/',
                '/videos/previews/'
              );
              const previewVideoSrc =
                item.previewMediaUrl ?? inferredPreviewSrc;
              const isOngoingProject =
                item.projectDetails === 'ONGOING PROJECT';
              const displayTitle = portfolioDisplayTitle(item);
              const tag = projectCardTag(item);
              const teaser = projectCardTeaser(item);
              const client = projectCardClient(item);
              const industry = projectCardIndustry(item);

              return (
                <motion.article
                  key={item.id}
                  className="group border-border/30 focus-visible:ring-primary bg-card/25 hover:border-primary/35 hover:bg-card/40 relative aspect-[9/16] cursor-pointer overflow-hidden rounded-md border transition-all duration-300 will-change-transform outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:rounded-lg"
                  role="button"
                  aria-label={`View ${displayTitle} - ${item.type}`}
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
                  </span>
                  {/* Optimized image with optional video hover preview */}
                  <div
                    className="relative h-full w-full will-change-transform"
                    style={{ backgroundColor: item.dominantColor || '#0b0b0b' }}
                  >
                    <Image
                      src={
                        isVideo
                          ? item.thumbnailUrl || '/images/p1.webp'
                          : item.mediaUrl
                      }
                      alt={displayTitle}
                      fill
                      className="object-cover transition-transform duration-200 ease-out will-change-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 34vw"
                      loading={index < 3 ? 'eager' : 'lazy'}
                      quality={index < 3 ? 70 : 55}
                      priority={index < 2}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />

                    {!lowDataMode && isVideo && (
                      <PortfolioVideoPreview
                        src={previewVideoSrc}
                        fallbackSrc={fallbackVideoSrc}
                        poster={item.thumbnailUrl || '/images/p1.webp'}
                        observeVisibility
                      />
                    )}
                  </div>

                  {/* Always-on bottom gradient for legibility */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/88 via-black/45 to-transparent" />

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
                      <div className="rounded-md bg-black/60 px-2 py-1 text-xs font-medium tracking-[0.12em] text-white uppercase backdrop-blur-sm md:px-2.5 md:py-1.5 md:text-xs">
                        {item.projectDetails || item.type}
                      </div>
                    </div>
                  )}

                  {!isOngoingProject ? (
                    <>
                      <div className="absolute top-2 right-2 left-2 flex items-start justify-between gap-1.5 md:top-3 md:right-3 md:left-3 md:gap-2">
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.05 }}
                          className="line-clamp-2 max-w-[66%] font-serif text-[10px] leading-snug font-semibold tracking-tight text-white transition-transform duration-300 group-hover:-translate-y-1 min-[380px]:max-w-[68%] min-[380px]:text-[11px] md:max-w-[70%] md:text-xs"
                        >
                          {displayTitle}
                        </motion.h3>
                        <span className="max-w-[34%] shrink-0 truncate rounded bg-black/45 px-1 py-0.5 text-[7px] tracking-[0.07em] text-white/90 uppercase backdrop-blur-sm min-[380px]:px-1.5 min-[380px]:py-0.5 min-[380px]:text-[8px] min-[380px]:tracking-[0.09em] md:max-w-none md:text-[10px]">
                          {tag}
                        </span>
                      </div>
                      <div className="absolute right-0 bottom-0 left-0 p-2 min-[380px]:p-3 md:p-4">
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{
                            duration: 0.28,
                            delay: Math.min(index * 0.02, 0.16),
                          }}
                          className="mt-1 translate-y-0 rounded border border-white/20 bg-black/55 px-2 py-1.5 text-left opacity-100 backdrop-blur-sm transition-all duration-300 min-[380px]:mt-1.5 min-[380px]:rounded-md min-[380px]:px-2.5 min-[380px]:py-2 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
                        >
                          <p className="text-[7px] tracking-[0.06em] text-white/65 uppercase min-[380px]:text-[8px]">
                            Project Brief
                          </p>
                          <p className="mt-0.5 line-clamp-2 text-[9px] leading-snug text-white/95 min-[380px]:text-[10px] min-[380px]:leading-relaxed md:line-clamp-2 md:text-[11px]">
                            {teaser ||
                              'Campaign-focused visual storytelling piece.'}
                          </p>
                          <div className="mt-1 hidden grid-cols-2 gap-x-2 gap-y-0.5 text-[7px] min-[380px]:mt-1.5 min-[380px]:gap-x-2.5 min-[380px]:text-[8px] md:grid md:text-[9px]">
                            <div>
                              <p className="tracking-[0.06em] text-white/60 uppercase">
                                Client
                              </p>
                              <p className="mt-px line-clamp-2 text-[8px] leading-tight text-white min-[380px]:text-[9px]">
                                {client}
                              </p>
                            </div>
                            <div>
                              <p className="tracking-[0.06em] text-white/60 uppercase">
                                Industry
                              </p>
                              <p className="mt-px line-clamp-2 text-[8px] leading-tight text-white min-[380px]:text-[9px]">
                                {industry}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </>
                  ) : (
                    <div className="absolute right-1 bottom-1 left-1 min-[380px]:right-1.5 min-[380px]:bottom-1.5 min-[380px]:left-1.5 min-[420px]:right-2 min-[420px]:bottom-2 min-[420px]:left-2 md:right-3 md:bottom-3 md:left-3">
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                          duration: 0.28,
                          delay: Math.min(index * 0.02, 0.16),
                        }}
                        className="translate-y-0 rounded bg-black/72 px-1.5 py-1 opacity-100 backdrop-blur-sm transition-all duration-300 min-[380px]:rounded-md min-[380px]:px-2 min-[380px]:py-1 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
                      >
                        <p className="line-clamp-2 font-serif text-[10px] leading-tight font-semibold tracking-tight text-white min-[380px]:text-[11px] md:text-xs">
                          {displayTitle}
                        </p>
                      </motion.div>
                    </div>
                  )}

                  <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-4 lg:p-5">
                    {/* Expand indicator - optimized for mobile */}
                    <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2">
                      <div className="rounded-full bg-white/20 p-1 backdrop-blur-sm md:p-1.5">
                        <Expand className="h-2.5 w-2.5 text-white md:h-3 md:w-3" />
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
