import type { PortfolioItem } from '@/types/portfolio';
import { CARD_TEASERS } from '@/lib/project-card-labels';

const TYPE_LABEL: Record<PortfolioItem['type'], string> = {
  photography: 'Photography',
  videography: 'Video',
  film: 'Film',
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

/**
 * Multi-line meta under the title in the fullscreen lightbox (portfolio + highlights).
 */
export function lightboxCaptionDescription(item: PortfolioItem): string {
  const kind = TYPE_LABEL[item.type];
  const lines: string[] = [];

  if (item.projectDetails === 'ONGOING PROJECT') {
    lines.push('In production');
  } else if (
    item.projectDetails?.trim() &&
    !isPlaceholderProjectDetails(item.projectDetails)
  ) {
    lines.push(item.projectDetails.trim());
  }

  if (item.client?.trim()) {
    lines.push(`Client · ${item.client.trim()}`);
  }

  if (lines.length === 0) return kind;
  return [kind, ...lines].join('\n');
}
