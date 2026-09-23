'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

/** Fullscreen viewer for a single still, layered above everything (including the lightbox). */
export function FullscreenStillViewer({
  src,
  onBack,
}: {
  src: string;
  onBack: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Capture phase + stopPropagation so a lightbox behind stays open.
        event.stopPropagation();
        event.preventDefault();
        onBack();
      }
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [onBack]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Click-to-dismiss backdrop; keyboard users close via the Back button or Escape. */}
      <div className="absolute inset-0" aria-hidden="true" onClick={onBack} />
      <button
        type="button"
        onClick={onBack}
        className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/25 bg-black/60 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-md transition-colors hover:bg-white/15 sm:top-6 sm:left-6 sm:text-sm"
      >
        <span aria-hidden="true">←</span> Back
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Still fullscreen"
        draggable={false}
        className="pointer-events-none relative max-h-[92dvh] max-w-[94vw] rounded-md object-contain shadow-2xl select-none"
      />
    </motion.div>
  );
}
