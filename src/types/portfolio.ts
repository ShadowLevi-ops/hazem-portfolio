export type PortfolioItemType = 'photography' | 'videography' | 'film';

export interface PortfolioItem {
  id: string;
  title: string;
  type: PortfolioItemType;
  /**
   * Canonical/full-quality media URL.
   * - For video: used by the fullscreen lightbox player.
   * - For photos: used directly.
   */
  mediaUrl: string;
  /**
   * Optional lightweight preview video for grid/featured cards.
   * When omitted, components fall back to `mediaUrl`.
   */
  previewMediaUrl?: string;
  thumbnailUrl?: string; // Optional thumbnail for videos or galleries
  client?: string; // Optional client name
  projectDetails?: string; // Added project details/category (optional)
  dominantColor?: string; // Optional dominant color for placeholder
  captionsUrl?: string; // Optional VTT captions for videos
  /** Landscape 16:9 vs portrait 9:16 — affects fullscreen lightbox sizing (grid stays portrait). Default portrait. */
  mediaOrientation?: 'horizontal' | 'vertical';
  /** Optional campaign stills shown as a scrollable strip in the fullscreen lightbox footer. */
  stills?: string[];
}
