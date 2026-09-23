'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FullscreenStillViewer } from '@/components/fullscreen-still-viewer';

export function CaseStudyStills({
  stills,
  title,
}: {
  stills: string[];
  title: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="surface-card space-y-4 rounded-xl p-6">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-serif text-xl">Stills</h2>
        <p className="text-muted-foreground text-[10px] tracking-[0.12em] uppercase">
          {stills.length} frames · tap to enlarge
        </p>
      </div>

      <div className="lightbox-stills-strip flex gap-3 overflow-x-auto pb-2">
        {stills.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(src)}
            aria-label={`View still ${index + 1} fullscreen`}
            className="border-border/60 focus-visible:ring-primary/70 hover:border-primary/40 relative h-56 shrink-0 cursor-zoom-in overflow-hidden rounded-lg border bg-black/40 transition-transform duration-200 hover:scale-[1.02] focus-visible:ring-2 focus-visible:outline-none sm:h-72"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${title} still ${index + 1}`}
              loading="lazy"
              draggable={false}
              className="h-full w-auto object-cover select-none"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active ? (
          <FullscreenStillViewer src={active} onBack={() => setActive(null)} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
