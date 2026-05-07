'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { PortfolioItem } from '@/types/portfolio';
import { portfolioDisplayTitle } from '@/lib/portfolio-display';
import {
  projectCardTag,
  projectCardTeaser,
  projectCardClient,
  projectCardIndustry,
} from '@/lib/project-card-labels';

type FeaturedWorkProps = {
  items: PortfolioItem[];
  onSelect: (item: PortfolioItem) => void;
};

function FeaturedVideoPreview({
  src,
  poster,
  isPriority,
}: {
  src: string;
  poster: string | undefined;
  isPriority: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(isPriority);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const lowDataMode =
      Boolean(connection?.saveData) ||
      connection?.effectiveType?.includes('2g') ||
      connection?.effectiveType === '3g';

    if (lowDataMode) return;

    const eagerLoadOnHover = () => setShouldLoad(true);
    container.addEventListener('mouseenter', eagerLoadOnHover);
    container.addEventListener('touchstart', eagerLoadOnHover, {
      passive: true,
    });

    return () => {
      container.removeEventListener('mouseenter', eagerLoadOnHover);
      container.removeEventListener('touchstart', eagerLoadOnHover);
    };
  }, []);

  if (hasError) return null;

  return (
    <div ref={containerRef} className="absolute inset-0">
      <video
        ref={videoRef}
        className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.03] ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload={shouldLoad ? 'metadata' : 'none'}
        poster={poster}
        aria-hidden="true"
        onLoadedData={() => setIsReady(true)}
        onError={() => setHasError(true)}
      >
        {shouldLoad ? <source src={src} type="video/mp4" /> : null}
      </video>
    </div>
  );
}

export function FeaturedWork({ items, onSelect }: FeaturedWorkProps) {
  return (
    <section
      id="featured"
      className="section-shell border-border/40 border-b pb-16 md:pb-24"
      aria-labelledby="featured-heading"
    >
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <div className="section-header mb-10 md:mb-14">
          <p className="section-kicker">Selected work</p>
          <h2 id="featured-heading" className="section-title">
            Recent highlights
          </h2>
          <p className="section-copy">
            A snapshot of campaigns and stories—tap a card to open the full
            piece.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {items.map((item, idx) => {
            const isVideo = item.type === 'videography' || item.type === 'film';
            const src = isVideo
              ? item.thumbnailUrl || item.mediaUrl
              : item.mediaUrl;
            const tag = projectCardTag(item);
            const teaser = projectCardTeaser(item);
            const client = projectCardClient(item);
            const industry = projectCardIndustry(item);
            const displayTitle = portfolioDisplayTitle(item);

            return (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelect(item)}
                className="surface-card group hover:border-primary/45 relative flex w-full flex-col overflow-hidden rounded-md border border-transparent text-left transition-colors duration-300"
              >
                <div className="bg-muted relative aspect-[4/5] w-full overflow-hidden md:aspect-[3/4]">
                  {isVideo ? (
                    <FeaturedVideoPreview
                      src={item.previewMediaUrl ?? item.mediaUrl}
                      poster={item.thumbnailUrl}
                      isPriority={idx === 0}
                    />
                  ) : (
                    <Image
                      src={src}
                      alt={displayTitle}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute top-2 right-2 left-2 flex items-start justify-between gap-1 md:top-4 md:right-4 md:left-4 md:gap-2">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                      className="line-clamp-2 max-w-[64%] font-serif text-[10px] leading-tight font-semibold tracking-tight text-white transition-transform duration-300 group-hover:-translate-y-1 min-[380px]:max-w-[66%] min-[380px]:text-[13px] min-[380px]:leading-snug md:max-w-none md:text-base"
                    >
                      {displayTitle}
                    </motion.h3>
                    <span className="max-w-[36%] truncate rounded bg-black/45 px-1 py-0.5 text-[8px] tracking-[0.08em] text-white/90 uppercase backdrop-blur-sm min-[380px]:max-w-[34%] min-[380px]:px-1.5 min-[380px]:py-0.5 min-[380px]:text-[9px] min-[380px]:tracking-[0.1em] min-[420px]:px-2 min-[420px]:py-1 min-[420px]:text-[10px] md:max-w-none md:text-xs">
                      {tag}
                    </span>
                  </div>
                  <div className="absolute right-0 bottom-0 left-0 p-2 min-[380px]:p-2.5 min-[420px]:p-3 md:p-5">
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 0.28,
                        delay: Math.min(idx * 0.02, 0.16),
                      }}
                      className="mt-1.5 translate-y-0 rounded border border-white/20 bg-black/55 p-2 text-left opacity-100 backdrop-blur-sm transition-all duration-300 min-[380px]:mt-2 min-[380px]:rounded-md min-[380px]:p-2.5 min-[420px]:mt-3 min-[420px]:p-3 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
                    >
                      <p className="text-[8px] tracking-[0.08em] text-white/70 uppercase min-[380px]:text-[9px] min-[380px]:tracking-[0.1em] min-[420px]:text-[10px] min-[420px]:tracking-[0.14em]">
                        Project Brief
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-white min-[380px]:mt-1 min-[380px]:text-[11px] min-[380px]:leading-relaxed min-[420px]:line-clamp-3 min-[420px]:text-xs md:line-clamp-2 md:text-sm">
                        {teaser ||
                          'Campaign-focused visual storytelling piece.'}
                      </p>
                      <div className="mt-1 grid grid-cols-2 gap-1 text-[8px] min-[380px]:mt-1.5 min-[380px]:gap-1.5 min-[380px]:text-[9px] min-[420px]:mt-2 min-[420px]:gap-2 min-[420px]:text-[10px] md:text-xs">
                        <div>
                          <p className="tracking-[0.08em] text-white/70 uppercase min-[380px]:tracking-[0.1em] min-[420px]:tracking-[0.12em]">
                            Client
                          </p>
                          <p className="mt-px line-clamp-1 text-[9px] text-white min-[380px]:mt-0.5 min-[380px]:text-[10px] md:text-inherit">
                            {client}
                          </p>
                        </div>
                        <div>
                          <p className="tracking-[0.08em] text-white/70 uppercase min-[380px]:tracking-[0.1em] min-[420px]:tracking-[0.12em]">
                            Industry
                          </p>
                          <p className="mt-px line-clamp-1 text-[9px] text-white min-[380px]:mt-0.5 min-[380px]:text-[10px] md:text-inherit">
                            {industry}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
