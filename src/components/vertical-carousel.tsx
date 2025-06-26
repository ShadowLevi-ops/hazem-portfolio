'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Expand } from 'lucide-react';
import type { PortfolioItem } from '@/types/portfolio';

interface VerticalCarouselProps {
  items: PortfolioItem[];
  onItemClick: (index: number) => void;
}

export function VerticalCarousel({
  items,
  onItemClick,
}: VerticalCarouselProps) {
  if (items.length === 0) {
    return (
      <div className="text-muted-foreground flex h-64 items-center justify-center md:h-96">
        No items to display
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-7xl">
      {/* Static masonry grid container */}
      <div className="from-background/50 to-background/80 relative overflow-hidden rounded-xl border bg-gradient-to-b backdrop-blur-sm md:rounded-2xl">
        {/* Static grid with full-scale masonry 9:16 ratio */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 25,
            duration: 1.2,
          }}
          className="p-3 md:p-6"
        >
          {/* Static masonry layout - Full-scale with 9:16 aspect ratio */}
          <div className="grid grid-cols-3 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
            {items.map((item, index) => {
              const isVideo =
                item.type === 'videography' || item.type === 'film';

              // Staggered animation for entrance
              const staggerDelay = index * 0.05;

              return (
                <motion.div
                  key={item.id}
                  className="group border-border/50 relative aspect-[9/16] cursor-pointer overflow-hidden rounded-lg border shadow-lg hover:shadow-2xl md:rounded-xl"
                  whileHover={{
                    scale: 1.02,
                    zIndex: 10,
                    transition: { duration: 0.2 },
                  }}
                  onClick={() => onItemClick(index)}
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: staggerDelay,
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                  }}
                >
                  {/* Static image without scroll animation */}
                  <div className="relative h-full w-full">
                    <Image
                      src={
                        isVideo
                          ? item.thumbnailUrl || '/images/p1.PNG'
                          : item.mediaUrl
                      }
                      alt={item.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>

                  {/* Enhanced overlay with subtle gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 via-transparent to-black/20 opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

                  <div className="absolute inset-0 flex flex-col justify-between p-3 md:p-4 lg:p-5">
                    {/* Top section - Type badge */}
                    <div className="flex justify-end">
                      <motion.div
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold backdrop-blur-sm md:px-3 md:py-1.5 ${
                          isVideo
                            ? 'border border-red-400/40 bg-red-500/25 text-red-200'
                            : 'border border-blue-400/40 bg-blue-500/25 text-blue-200'
                        }`}
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.3 + staggerDelay,
                          type: 'spring',
                          stiffness: 300,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {isVideo ? (
                          <Play className="h-2.5 w-2.5 md:h-3 md:w-3" />
                        ) : (
                          <Expand className="h-2.5 w-2.5 md:h-3 md:w-3" />
                        )}
                        <span className="text-xs">{item.type}</span>
                      </motion.div>
                    </div>

                    {/* Center section - Removed play button */}

                    {/* Bottom section - Hidden description details */}

                    {/* Enhanced hover expand indicator */}
                    <motion.div
                      className="absolute top-2 left-2 opacity-0 transition-all duration-300 group-hover:opacity-100 md:top-3 md:left-3"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <div className="rounded-full bg-white/20 p-1.5 backdrop-blur-sm md:p-2">
                        <Expand className="h-3 w-3 text-white md:h-4 md:w-4" />
                      </div>
                    </motion.div>
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
