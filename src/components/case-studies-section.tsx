'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const CASE_STUDIES = [
  {
    href: '/case-studies/puma-solewhat-launch',
    title: 'PUMA x SOLEWHAT Launch',
    client: 'PUMA x Solewhat',
    industry: 'Sports / Lifestyle',
    summary:
      'Launch film and cutdowns built for drop-day hype and multi-platform rollout.',
    image: '/videos/VT-16.webp',
  },
  {
    href: '/case-studies/tottenham-cny-campaign',
    title: 'Tottenham CNY Campaign',
    client: 'Tottenham Hotspurs',
    industry: 'Sports / Lifestyle',
    summary:
      'Culturally tuned CNY storytelling with global brand consistency under tight timelines.',
    image: '/videos/VT-14.webp',
  },
  {
    href: '/case-studies/scuba-recap',
    title: 'Scuba Recap',
    client: 'Redang Island Dive Centre',
    industry: 'Travel',
    summary:
      'Destination footage restructured into retention-focused edits and reusable snippets.',
    image: '/videos/VT-10.webp',
  },
] as const;

export function CaseStudiesSection() {
  return (
    <section
      id="case-studies"
      className="section-shell pb-16 md:pb-24"
      aria-labelledby="case-studies-heading"
    >
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <div className="section-header mb-10 md:mb-12">
          <p className="section-kicker">Deep dives</p>
          <h2 id="case-studies-heading" className="section-title">
            Case studies
          </h2>
          <p className="section-copy">
            How we plan, shoot, and edit campaign work for brands that need
            speed and polish.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {CASE_STUDIES.map((study, index) => (
            <motion.article
              key={study.href}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <Link
                href={study.href}
                className="surface-card group hover:border-primary/45 relative flex h-full flex-col overflow-hidden rounded-md border border-transparent transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[10px] tracking-[0.12em] text-white/90 uppercase backdrop-blur-sm">
                    {study.industry}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
                  <div>
                    <p className="text-muted-foreground text-[10px] tracking-[0.14em] uppercase">
                      {study.client}
                    </p>
                    <h3 className="mt-1 font-serif text-lg leading-snug font-semibold tracking-tight">
                      {study.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
                    {study.summary}
                  </p>
                  <span className="text-primary inline-flex items-center gap-1 text-[11px] font-semibold tracking-[0.12em] uppercase">
                    Read case study
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
