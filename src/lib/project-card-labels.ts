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
  'photo-10': 'Performance portrait with expressive stage energy.',
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
  'video-4': 'Travel-commercial cut blending place and product.',
  'video-5': 'Concert recap with stage mood and crowd energy.',
  'video-6': 'Brand x music edit with a raw live vibe.',
  'video-7': 'Underwater travel short with immersive motion.',
  'video-8': 'Fast travel montage built for social viewing.',
  'video-9': 'Music performance recap with cinematic pacing.',
  'video-10': 'Dive trip highlight across island and underwater moments.',
  'video-11': 'Phuket travel cut with city and coastal scenes.',
  'video-12': 'Japan travel edit with clean cultural flow.',
  'video-13': 'Spurs social reel focused on fan culture.',
  'video-14': 'CNY campaign reel tied to Tottenham storytelling.',
  'video-15': 'Fanclub story highlighting regional passion.',
  'video-16': 'Launch film built around drop-day hype.',
  'video-17': 'Interview-led sports piece with polished delivery.',
  'video-18': 'Second interview cut with deeper narrative beats.',
  'video-19': 'Athlete profile focused on growth and ambition.',
  'video-20':
    'Social feature spotlighting Fuvahmulah dive tourism and local economic growth.',
};

/** Richer project brief copy for fullscreen/footer detail sections. */
export const FULLSCREEN_BRIEFS: Record<string, string> = {
  'photo-1':
    'Editorial travel still capturing Uluwatu Temple atmosphere and sacred architecture.',
  'photo-2':
    'Destination hospitality frame built to sell place, pace, and premium escape.',
  'photo-3':
    'Cultural architecture composition highlighting texture, geometry, and context.',
  'photo-4':
    'Coastal landscape image emphasizing scale, horizon depth, and visual drama.',
  'photo-5':
    'Urban lifestyle portrait blending subject energy with modern architectural framing.',
  'photo-6':
    'Architecture study focused on symmetry, structure, and tonal contrast.',
  'photo-7':
    'Scenic hero frame centered on iconic form and clean visual balance.',
  'photo-8':
    'Travel lifestyle moment capturing warmth, movement, and destination authenticity.',
  'photo-9':
    'Event portrait documenting athletic energy and community atmosphere.',
  'photo-10':
    'Performance still prioritizing expression, costume detail, and stage intensity.',
  'photo-11':
    'Companion performance frame with stronger motion and narrative tension.',
  'photo-12':
    'Launch-phase stadium teaser introducing venue scale and anticipation.',
  'photo-13':
    'Follow-up campaign image reinforcing stadium identity and rollout momentum.',
  'photo-14':
    'Third campaign visual crafted for continuity across promotional touchpoints.',
  'photo-15': 'Commercial product still with clean styling and premium finish.',
  'photo-16': 'Alternate product hero angle designed for campaign consistency.',
  'photo-17':
    'Final hero product frame optimized for digital and social deployment.',
  'video-1':
    'Cinematic travel short combining iconic landmarks with social-native pacing.',
  'video-2':
    'Commercial architecture reel positioning the property as a premium destination.',
  'video-3':
    'Sports highlight cut built around match intensity and fan momentum.',
  'video-4':
    'Travel-commercial piece integrating destination aesthetics with product storytelling.',
  'video-5':
    'Live concert recap preserving stage emotion and audience-scale energy.',
  'video-6':
    'Brand and music crossover capturing performance grit and youth-culture tone.',
  'video-7':
    'Underwater lifestyle short focused on immersion and fluid camera movement.',
  'video-8':
    'Fast-cut travel montage tailored for retention-first social viewing.',
  'video-9':
    'Performance-led music edit balancing cinematic rhythm and live atmosphere.',
  'video-10':
    'Destination dive highlight showcasing marine exploration and travel context.',
  'video-11':
    'Phuket destination reel blending city rhythm with coastal atmosphere.',
  'video-12':
    'Culture-forward Japan travel edit with clean sequencing and transitions.',
  'video-13':
    'Vertical-first Spurs social reel focused on club energy and fan culture.',
  'video-14':
    'Seasonal CNY campaign connecting festive storytelling with Tottenham identity.',
  'video-15':
    'Community sports feature spotlighting regional fan culture and engagement.',
  'video-16':
    'Retail launch film combining product energy with streetwear brand positioning.',
  'video-17':
    'Interview-led profile focused on clarity, personality, and editorial pacing.',
  'video-18':
    'Follow-up interview installment extending depth while maintaining continuity.',
  'video-19':
    'Athlete journey profile highlighting progression, ambition, and next-step narrative.',
  'video-20':
    'Social media feature positioning Extreme Dive Fuvahmulah at the forefront of tiger shark diving in Fuvahmulah, Maldives—showcasing the centre as a driver of island tourism, community visibility, and local economic momentum.',
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
  'video-20': 'Extreme Dive Fuvahmulah',
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
  'video-20': 'Travel',
};

export function projectCardTag(item: PortfolioItem): string {
  const isVideo = item.type === 'videography' || item.type === 'film';
  return item.projectDetails || (isVideo ? 'Video' : 'Photography');
}

export function projectCardTeaser(item: PortfolioItem): string {
  return CARD_TEASERS[item.id] ?? '';
}

export function projectFullscreenBrief(item: PortfolioItem): string {
  return FULLSCREEN_BRIEFS[item.id] ?? '';
}

export function projectCardClient(item: PortfolioItem): string {
  return CARD_CLIENTS[item.id] || item.client?.trim() || 'Independent project';
}

export function projectCardIndustry(item: PortfolioItem): string {
  return CARD_INDUSTRIES[item.id] || 'Creative';
}
