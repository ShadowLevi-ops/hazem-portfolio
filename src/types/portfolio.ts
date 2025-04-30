export type PortfolioItemType = 'photography' | 'videography' | 'film';

export interface PortfolioItem {
  id: string;
  title: string;
  type: PortfolioItemType;
  mediaUrl: string; // URL to the image or video file
  thumbnailUrl?: string; // Optional thumbnail for videos or galleries
  date?: string; // Optional date of creation/publication
  client?: string; // Optional client name
  camera?: string; // Added camera details (optional)
  projectDetails?: string; // Added project details/category (optional)
} 