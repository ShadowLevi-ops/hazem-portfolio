'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { portfolioItems } from '@/data/portfolio-items';
import { CASE_STUDY_ENTRIES } from '@/data/case-studies';
import { portfolioDisplayTitle } from '@/lib/portfolio-display';
import {
  projectCardClient,
  projectCardIndustry,
  projectCardTag,
  projectCardTeaser,
} from '@/lib/project-card-labels';
import { PortfolioVideoPreview } from '@/components/portfolio-video-preview';
import {
  getPreviewVideoSrc,
  isCoarsePointerDevice,
} from '@/lib/video-playback';

export function CaseStudiesSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isCoarsePointerDevice());
  }, []);

  const studies = useMemo(
    () =>
      CASE_STUDY_ENTRIES.flatMap(entry => {
        const item = portfolioItems.find(
          portfolioItem => portfolioItem.id === entry.portfolioId
        );
        return item ? [{ ...entry, item }] : [];
      }),
    []
  );

  if (studies.length === 0) return null;

  return (
    <section
      id="case-studies"
      className="section-shell border-border/40 border-b pt-12 pb-16 md:pt-16 md:pb-24"
      aria-labelledby="case-studies-heading"
    >
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <div className="section-header mb-10 md:mb-14">
          <p className="section-kicker">Launch logs</p>
          <h2 id="case-studies-heading" className="section-title">
            Case studies
          </h2>
          <p className="section-copy">
            Real launches. Tight timelines. Tap in for the full breakdown.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {studies.map(({ href, item }, index) => {
            const isVideo = item.type === 'videography' || item.type === 'film';
            const fallbackVideoSrc = item.mediaUrl;
            const previewVideoSrc = getPreviewVideoSrc(
              fallbackVideoSrc,
              item.previewMediaUrl
            );
            const imageSrc = isVideo
              ? item.thumbnailUrl || item.mediaUrl
              : item.mediaUrl;
            const displayTitle = portfolioDisplayTitle(item);
            const tag = projectCardTag(item);
            const teaser = projectCardTeaser(item);
            const client = projectCardClient(item);
            const industry = projectCardIndustry(item);

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <Link
                  href={href}
                  className="surface-card group hover:border-primary/45 focus-visible:ring-primary/60 relative flex h-full flex-col overflow-hidden rounded-md border border-transparent transition-all duration-300 outline-none hover:-translate-y-1 focus-visible:ring-2"
                >
                  <div className="bg-muted relative aspect-[4/5] w-full overflow-hidden md:aspect-[3/4]">
                    <Image
                      src={imageSrc}
                      alt={displayTitle}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading={index < 2 ? 'eager' : 'lazy'}
                      priority={index === 0}
                      quality={index < 2 ? 70 : 55}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                    {isVideo ? (
                      <PortfolioVideoPreview
                        src={previewVideoSrc}
                        fallbackSrc={fallbackVideoSrc}
                        poster={item.thumbnailUrl}
                        eager={isMobile ? index === 0 : index < 2}
                        observeVisibility
                        className="transition-all duration-500 group-hover:scale-[1.03]"
                      />
                    ) : null}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[10px] tracking-[0.12em] text-white/90 uppercase backdrop-blur-sm">
                      {tag}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
                    <div>
                      <p className="text-muted-foreground text-[10px] tracking-[0.14em] uppercase">
                        {client}
                      </p>
                      <h3 className="mt-1 font-serif text-lg leading-snug font-semibold tracking-tight">
                        {displayTitle}
                      </h3>
                    </div>
                    <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
                      {teaser || 'Campaign-focused visual storytelling piece.'}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] md:text-xs">
                      <div>
                        <p className="text-muted-foreground tracking-[0.1em] uppercase">
                          Client
                        </p>
                        <p className="mt-0.5 line-clamp-1">{client}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground tracking-[0.1em] uppercase">
                          Industry
                        </p>
                        <p className="mt-0.5 line-clamp-1">{industry}</p>
                      </div>
                    </div>
                    <span className="text-primary inline-flex items-center gap-1 text-[11px] font-semibold tracking-[0.12em] uppercase">
                      Read case study
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
