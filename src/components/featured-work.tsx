'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { PortfolioItem } from '@/types/portfolio';

const TEASERS: Record<string, string> = {
  'video-16': 'Retail launch film for the H Street line drop.',
  'video-14': 'Festive football storytelling for Lunar New Year.',
  'video-10': 'Immersive scuba recap cut for social-first storytelling.',
};

const INDUSTRIES: Record<string, string> = {
  'video-16': 'Fashion / Retail',
  'video-14': 'Sports / Entertainment',
  'video-10': 'Travel / Lifestyle',
};

const CLIENTS: Record<string, string> = {
  'video-16': 'PUMA x Solewhat',
  'video-14': 'Tottenham Hotspurs',
};

type FeaturedWorkProps = {
  items: PortfolioItem[];
  onSelect: (item: PortfolioItem) => void;
};

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
            const tag =
              item.projectDetails || (isVideo ? 'Video' : 'Photography');
            const teaser = TEASERS[item.id] ?? '';
            const client =
              CLIENTS[item.id] || item.client || 'Independent project';
            const industry = INDUSTRIES[item.id] || 'Creative';

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
                    <video
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      src={item.mediaUrl}
                      poster={item.thumbnailUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={item.title}
                    />
                  ) : (
                    <Image
                      src={src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute top-3 right-3 left-3 flex items-start justify-between gap-2 md:top-4 md:right-4 md:left-4">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                      className="font-serif text-sm leading-snug font-semibold tracking-tight text-white transition-transform duration-300 group-hover:-translate-y-1 md:text-base"
                    >
                      {item.title}
                    </motion.h3>
                    <span className="rounded bg-black/45 px-2 py-1 text-[10px] tracking-[0.14em] text-white/90 uppercase backdrop-blur-sm md:text-xs">
                      {tag}
                    </span>
                  </div>
                  <div className="absolute right-0 bottom-0 left-0 p-4 md:p-5">
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 0.28,
                        delay: Math.min(idx * 0.02, 0.16),
                      }}
                      className="mt-3 translate-y-1 rounded-md border border-white/20 bg-black/55 p-3 text-left opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <p className="text-[10px] tracking-[0.14em] text-white/70 uppercase">
                        Project Brief
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white md:text-sm">
                        {teaser ||
                          'Campaign-focused visual storytelling piece.'}
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] md:text-xs">
                        <div>
                          <p className="tracking-[0.12em] text-white/70 uppercase">
                            Client
                          </p>
                          <p className="mt-0.5 line-clamp-1 text-white">
                            {client}
                          </p>
                        </div>
                        <div>
                          <p className="tracking-[0.12em] text-white/70 uppercase">
                            Industry
                          </p>
                          <p className="mt-0.5 line-clamp-1 text-white">
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
