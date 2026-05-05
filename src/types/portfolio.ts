export type PortfolioItemType = 'photography' | 'videography' | 'film';

export interface PortfolioItem {
  id: string;
  title: string;
  type: PortfolioItemType;
  mediaUrl: string; // URL to the image or video file
  thumbnailUrl?: string; // Optional thumbnail for videos or galleries
  client?: string; // Optional client name
  projectDetails?: string; // Added project details/category (optional)
  dominantColor?: string; // Optional dominant color for placeholder
  captionsUrl?: string; // Optional VTT captions for videos
  /** Landscape 16:9 vs portrait 9:16 — affects fullscreen lightbox sizing (grid stays portrait). Default portrait. */
  mediaOrientation?: 'horizontal' | 'vertical';
}
