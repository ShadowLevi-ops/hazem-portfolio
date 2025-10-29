'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Expand } from 'lucide-react';
import type { PortfolioItem } from '@/types/portfolio';
//

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
  if (items.length === 0) {
    return (
      <div className="text-muted-foreground flex h-64 items-center justify-center md:h-96">
        No items to display
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-7xl">
      {/* Optimized container */}
      <div className="from-background/50 to-background/80 relative overflow-hidden rounded-xl border bg-gradient-to-b backdrop-blur-sm md:rounded-2xl">
        <motion.div
          initial={{ opacity: 0, transform: 'translate3d(0,0,0)' }}
          animate={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="p-3 will-change-transform md:p-6"
        >
          {/* Optimized grid layout */}
          <div className="grid grid-cols-3 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
            {items.map((item, index) => {
              const isVideo =
                item.type === 'videography' || item.type === 'film';
              const isOngoingProject =
                item.projectDetails === 'ONGOING PROJECT';

              return (
                <motion.div
                  key={item.id}
                  className="group border-border/50 focus-visible:ring-primary relative aspect-[9/16] cursor-pointer overflow-hidden rounded-lg border shadow-lg will-change-transform outline-none hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-offset-2 md:rounded-xl"
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
                      <video
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
                        muted
                        loop
                        playsInline
                        preload="none"
                        poster={item.thumbnailUrl || '/images/p1.PNG'}
                        crossOrigin="anonymous"
                        onMouseEnter={e => {
                          const v = e.currentTarget;
                          // Start playback on hover without blocking
                          v.play().catch(() => {});
                        }}
                        onMouseLeave={e => {
                          const v = e.currentTarget;
                          v.pause();
                          v.currentTime = 0;
                        }}
                      >
                        <source src={item.mediaUrl} type="video/mp4" />
                        {item.captionsUrl && (
                          <track
                            kind="captions"
                            srcLang="en"
                            src={item.captionsUrl}
                            label="English captions"
                            default
                          />
                        )}
                      </video>
                    )}
                  </div>

                  {/* Simplified overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

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
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
