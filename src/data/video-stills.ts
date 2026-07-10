/**
 * Curated footage stills per video, shown in the lightbox stills strip.
 * Frames are clipped by scripts/extract-video-stills.mjs, then hand-picked —
 * duplicates, motion-blurred, and underexposed frames are dropped.
 */
export const VIDEO_FOOTAGE_STILLS: Record<string, number[]> = {
  'video-1': [1, 4, 5],
  'video-2': [2, 5],
  'video-3': [1, 4],
  'video-4': [3, 4],
  'video-5': [1, 2, 4, 5],
  'video-6': [4, 5],
  'video-7': [1, 3, 5],
  'video-8': [3, 5],
  'video-9': [1, 2, 4],
  'video-10': [1, 3, 5],
  'video-12': [2, 3, 4],
  'video-13': [1, 3, 5],
  'video-14': [1, 2, 4],
  'video-15': [1, 3, 4, 5],
  'video-16': [1, 4, 5],
  'video-17': [2, 3, 5],
  'video-18': [1, 2, 5],
  'video-19': [1, 2, 3, 5],
  'video-20': [1, 2, 3, 4, 5],
  'video-22': [1, 2, 3, 5],
};
