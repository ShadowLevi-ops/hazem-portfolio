'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { PortfolioItem } from '@/types/portfolio';

const TEASERS: Record<string, string> = {
  'video-16': 'Retail launch film for the H Street line drop.',
  'video-14': 'Festive football storytelling for Lunar New Year.',
  'photo-9': 'National campaign coverage across sports and community.',
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
                  <Image
                    src={src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <span className="text-primary-foreground/90 absolute top-3 left-3 rounded bg-black/45 px-2 py-1 text-[10px] tracking-[0.14em] uppercase backdrop-blur-sm md:text-xs">
                    {tag}
                  </span>
                  <div className="absolute right-0 bottom-0 left-0 p-4 md:p-5">
                    <h3 className="text-foreground font-serif text-lg leading-snug font-semibold tracking-tight md:text-xl">
                      {item.title}
                    </h3>
                    {teaser ? (
                      <p className="text-muted-foreground mt-2 line-clamp-2 text-xs leading-relaxed md:text-sm">
                        {teaser}
                      </p>
                    ) : null}
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
