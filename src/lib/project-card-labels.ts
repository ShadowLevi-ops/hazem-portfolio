import type { PortfolioItem } from '@/types/portfolio';

/** Short summary line under “Project Brief” (same pool as Recent highlights). */
export const CARD_TEASERS: Record<string, string> = {
  'photo-1': 'Uluwatu temple mood in a clean travel frame.',
  'photo-2': 'Resort lifestyle shot with tropical energy.',
  'photo-3': 'Fresh Uluwatu angle with cultural detail.',
  'photo-4': 'Dramatic cliffscape with ocean depth.',
  'photo-5': 'Urban portrait framed by modern architecture.',
  'photo-6': 'Symmetry-led architecture with calm atmosphere.',
  'photo-7': 'Scenic Fuji frame with a calm tone.',
  'photo-8': 'Warm beach travel moment with natural flow.',
  'photo-9': 'Sports day portrait full of movement.',
  'photo-10': 'Performance portrait with expressive stage...',
  'photo-11': 'Companion stage frame with motion and character.',
  'photo-12': 'Stadium promo introducing scale and identity.',
  'photo-13': 'Follow-up stadium shot for launch momentum.',
  'photo-14': 'Final stadium promo for rollout consistency.',
  'photo-15': 'Clean product still with premium styling.',
  'photo-16': 'Alternate product angle focused on detail.',
  'photo-17': 'Hero product frame for campaign use.',
  'video-1': 'Cinematic travel short of iconic city moments.',
  'video-2': 'Commercial tower reel with a premium city feel.',
  'video-3': 'Match-day sports short with fan energy.',
  'video-4': 'Travel-commercial cut blending place and...',
  'video-5': 'Concert recap with stage mood and crowd energy.',
  'video-6': 'Brand x music edit with a raw live vibe.',
  'video-7': 'Underwater travel short with immersive motion.',
  'video-8': 'Fast travel montage built for social viewing.',
  'video-9': 'Music performance recap with cinematic pacing.',
  'video-10': 'Dive trip highlight across island and...',
  'video-11': 'Phuket travel cut with city and coastal scenes.',
  'video-12': 'Japan travel edit with clean cultural flow.',
  'video-13': 'Spurs social reel focused on fan culture.',
  'video-14': 'CNY campaign reel tied to Tottenham...',
  'video-15': 'Fanclub story highlighting regional passion.',
  'video-16': 'Launch film built around drop-day hype.',
  'video-17': 'Interview-led sports piece with polished...',
  'video-18': 'Second interview cut with deeper narrative...',
  'video-19': 'Athlete profile focused on growth and ambition.',
};

export const CARD_CLIENTS: Record<string, string> = {
  'video-1': 'Independent Project',
  'video-2': 'Triterra Metropolis',
  'video-3': 'Independent Project',
  'video-4': 'French Agency',
  'video-5': 'Zepp KL',
  'video-6': 'Malaysian Indie Band',
  'video-7': 'Independent Project',
  'video-8': 'Independent Project',
  'video-9': 'Midnight Fusic',
  'video-10': 'Redang Island Dive Centre',
  'video-12': 'Independent Project',
  'video-13': 'Tottenham Hotspurs',
  'video-16': 'PUMA x Solewhat',
  'video-14': 'Tottenham Hotspurs',
  'video-15': 'Tottenham Hotspurs',
  'video-17': 'Tottenham Hotspurs',
  'video-18': 'Tottenham Hotspurs',
  'video-19': 'Tottenham Hotspurs',
};

export const CARD_INDUSTRIES: Record<string, string> = {
  'video-1': 'Travel',
  'video-2': 'Commercial',
  'video-3': 'Sports',
  'video-4': 'Travel',
  'video-5': 'Music/Commercial',
  'video-6': 'Music/Commercial',
  'video-7': 'Travel',
  'video-8': 'Travel',
  'video-9': 'Music/Commercial',
  'video-16': 'Sports/Lifestyle',
  'video-10': 'Travel',
  'video-12': 'Travel',
  'video-13': 'Sports/Lifestyle',
  'video-14': 'Sports/Lifestyle',
  'video-15': 'Sports/Lifestyle',
  'video-17': 'Sports/Lifestyle',
  'video-18': 'Sports / Entertainment',
  'video-19': 'Sports / Entertainment',
};

export function projectCardTag(item: PortfolioItem): string {
  const isVideo = item.type === 'videography' || item.type === 'film';
  return item.projectDetails || (isVideo ? 'Video' : 'Photography');
}

export function projectCardTeaser(item: PortfolioItem): string {
  return CARD_TEASERS[item.id] ?? '';
}

export function projectCardClient(item: PortfolioItem): string {
  return CARD_CLIENTS[item.id] || item.client?.trim() || 'Independent project';
}

export function projectCardIndustry(item: PortfolioItem): string {
  return CARD_INDUSTRIES[item.id] || 'Creative';
}
