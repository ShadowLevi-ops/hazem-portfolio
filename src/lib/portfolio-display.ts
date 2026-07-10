import type { PortfolioItem } from '@/types/portfolio';
import {
  CARD_TEASERS,
  projectCardIndustry,
  projectFullscreenBrief,
} from '@/lib/project-card-labels';
import { VIDEO_FOOTAGE_STILLS } from '@/data/video-stills';

const TYPE_LABEL: Record<PortfolioItem['type'], string> = {
  photography: 'Photography',
  videography: 'Video',
  film: 'Film',
};

const HIGHLIGHT_CASE_STUDIES: Record<string, string> = {
  'video-16':
    'PUMA x SOLEWHAT launch: modular capture and edit flow built for rapid social deployment, combining hero moments with platform-native cutdowns for longer campaign shelf life.',
  'video-14':
    'Tottenham CNY campaign: culturally tuned storytelling delivered under tight timelines while preserving global brand consistency across social placements.',
  'video-17':
    'Gallifuoco profile interview: academy-to-ASEAN narrative structured for editorial clarity, with extractable social hooks and Tottenham-grade production on a talking-head format.',
};

/** Data-entry placeholders — hide from portfolio info copy */
const PLACEHOLDER_PROJECT_DETAILS = new Set([
  'project category',
  'camera used',
]);

function isPlaceholderProjectDetails(value?: string): boolean {
  const s = value?.trim().toLowerCase();
  return !s || PLACEHOLDER_PROJECT_DETAILS.has(s);
}

/**
 * Stills shown in the lightbox strip: curated campaign stills when provided,
 * otherwise hand-picked frames clipped from the footage.
 */
export function portfolioStills(item: PortfolioItem): string[] | undefined {
  if (item.stills && item.stills.length > 0) return item.stills;

  const frames = VIDEO_FOOTAGE_STILLS[item.id];
  if (!frames || frames.length === 0) return undefined;

  const idMatch = item.id.match(/^video-(\d+)$/);
  if (!idMatch) return undefined;

  return frames.map(i => `/videos/stills/${idMatch[1]}-${i}.webp`);
}

/** 16:9 landscape clips — lightbox uses 1920×1080 (portfolio grid cards stay vertical). */
export function isHorizontalVideoItem(item: PortfolioItem): boolean {
  return (
    (item.type === 'videography' || item.type === 'film') &&
    item.mediaOrientation === 'horizontal'
  );
}

/**
 * Label shown in cards, lightbox, and alt text when `title` is missing or blank.
 */
export function portfolioDisplayTitle(item: PortfolioItem): string {
  const trimmed = item.title?.trim();
  if (trimmed) return trimmed;

  const details = item.projectDetails?.trim();
  if (details && details !== 'ONGOING PROJECT') return details;

  const client = item.client?.trim();
  if (client) return client;

  const idTail = item.id.replace(/^(photo|video)-/i, '');
  return `${TYPE_LABEL[item.type]} · ${idTail}`;
}

/**
 * Short line under the title on **portfolio grid** cards (not the Recent highlights section).
 */
export function portfolioGridBlurb(item: PortfolioItem): string {
  if (item.projectDetails === 'ONGOING PROJECT') {
    return 'In production — more soon.';
  }

  const curated = CARD_TEASERS[item.id];
  if (curated) return curated;

  const pd = item.projectDetails?.trim();
  if (pd && !isPlaceholderProjectDetails(pd) && pd !== 'ONGOING PROJECT') {
    return pd;
  }

  const client = item.client?.trim();
  if (client) {
    return `${TYPE_LABEL[item.type]} · ${client}`;
  }

  return `${TYPE_LABEL[item.type]} — tap for full screen.`;
}

function lightboxProjectBrief(item: PortfolioItem): string {
  const rich = projectFullscreenBrief(item).trim();
  if (rich) return rich;

  const curated = CARD_TEASERS[item.id]?.trim();
  if (curated) {
    // Card teasers may be intentionally shortened; avoid trailing ellipses in fullscreen.
    return curated.replace(/\.\.\.+$/, '').trim();
  }

  if (item.projectDetails === 'ONGOING PROJECT') {
    return 'In production — more soon.';
  }

  const pd = item.projectDetails?.trim();
  if (pd && !isPlaceholderProjectDetails(pd)) {
    return pd;
  }

  const client = item.client?.trim();
  if (client) {
    return `${TYPE_LABEL[item.type]} · ${client}`;
  }

  return `${TYPE_LABEL[item.type]} project.`;
}

function lightboxExtendedBrief(item: PortfolioItem, brief: string): string {
  const client = item.client?.trim();
  const clientLine =
    client && client.toLowerCase() !== 'independent project'
      ? `for ${client}`
      : 'for independent creative distribution';

  const isVideo = item.type === 'videography' || item.type === 'film';
  if (isVideo) {
    return `${brief} Cut in a director's-pass style ${clientLine}, shaping rhythm, transitions, and emotional beats so the final piece lands with cinematic energy across screens.`;
  }

  return `${brief} Framed in a director-led visual language ${clientLine}, balancing mood, composition, and tonal control to deliver a still that feels cinematic and intentional.`;
}

/**
 * Multi-line meta under the title in the fullscreen lightbox (portfolio + highlights).
 */
export function lightboxCaptionDescription(item: PortfolioItem): string {
  const kind = TYPE_LABEL[item.type];
  const lines: string[] = [];
  const brief = lightboxProjectBrief(item);
  const extendedBrief = lightboxExtendedBrief(item, brief);
  const highlightCaseStudy = HIGHLIGHT_CASE_STUDIES[item.id];

  lines.push(`Project Brief · ${brief}`);
  lines.push(`Extended Brief · ${extendedBrief}`);
  if (highlightCaseStudy) {
    lines.push(`Case Study · ${highlightCaseStudy}`);
  }

  if (item.client?.trim()) {
    lines.push(`Client · ${item.client.trim()}`);
  }

  const industry = projectCardIndustry(item);
  if (industry) {
    lines.push(`Industry · ${industry}`);
  }

  if (item.projectDetails === 'ONGOING PROJECT') {
    lines.push('Status · In production');
  }

  if (lines.length === 0) return kind;
  return [kind, ...lines].join('\n');
}
