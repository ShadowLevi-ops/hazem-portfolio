import { portfolioItems } from '@/data/portfolio-items';
import type { PortfolioItem } from '@/types/portfolio';

export type CaseStudy = {
  slug: string;
  portfolioId: string;
  title: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  relatedService: {
    label: string;
    href: string;
  };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'puma-solewhat-launch',
    portfolioId: 'video-16',
    title: 'PUMA x SOLEWHAT — H Street Line Launch',
    summary:
      'A launch film and social rollout for the PUMA x SOLEWHAT H Street drop — engineered as a content system, not a single hero asset. The work balances drop-day urgency with premium visual language: product hero moments, street-level atmosphere, and motion-led sequences cut for both long-form film and platform-native distribution.',
    challenge:
      'Streetwear launches live and die in the first 48 hours. The brief demanded campaign-grade polish at social speed — assets that could lead Instagram and Reels feeds, support retail and partner channels, and hold visual consistency across hero film, cutdowns, and repostable snippets. The constraint was time: one capture window, multiple formats, zero drift in grade, pacing, or brand tone.',
    approach:
      'We treated the shoot as modular narrative architecture — blocking product, environment, and human energy so each scene could function as a standalone social unit or as part of the master film. On the director side: controlled contrast in framing, deliberate rhythm in cut points, and a grade that kept leather, textile, and urban texture readable on mobile. On the campaign side: we mapped deliverables to rollout phases — hero launch film, 15–30s cutdowns, and loop-friendly micro-moments for stories and paid social. Edit pacing was built for hook → product reveal → brand stamp, with sound design supporting retention without overpowering the visual line.',
    outcome:
      'A cohesive launch package that read as one campaign across every touchpoint. The client left with a primary film for the drop, a bank of platform-ready cutdowns, and reusable assets that extended campaign shelf life beyond launch day — reducing the need for reshoots while keeping the H Street line visually dominant in feed.',
    relatedService: {
      label: 'Videography',
      href: '/services/videography',
    },
  },
  {
    slug: 'tottenham-cny-campaign',
    portfolioId: 'video-14',
    title: 'Chinese New Year 2026 × Tottenham Hotspur',
    summary:
      'A seasonal brand film for Tottenham Hotspur’s Chinese New Year 2026 activation — culturally resonant for the moment, globally consistent for the club, and cut for immediate social deployment under a compressed campaign window.',
    challenge:
      'CNY content sits at a difficult intersection: it must feel locally authentic to festive audiences while meeting the governance and visual standards of a major international sports brand. The timeline was tight — campaign-ready delivery with no extended revision runway — and the assets needed to work across vertical and horizontal placements without feeling like two different campaigns.',
    approach:
      'We structured the piece around a clear seasonal narrative arc — celebration, community, club identity — with editorial rhythm tuned for social retention rather than broadcast length. On the director side: warm tonal palette, intentional framing on gesture and atmosphere, and cut logic that builds emotional lift before the brand resolution. On the campaign side: we planned for platform-native formats from day one — vertical-first for Reels and stories, horizontal for broader club channels — with brand-safe composition in every frame. Pacing, supers, and end-card real estate were considered for thumb-stop performance and official-channel polish simultaneously.',
    outcome:
      'Campaign-ready assets delivered on schedule — festive enough for CNY, disciplined enough for global club standards. The package gave the team immediate rollout capability across social placements, with a single visual language that protected brand integrity while landing the cultural moment.',
    relatedService: {
      label: 'Social Media Content',
      href: '/services/social-media',
    },
  },
  {
    slug: 'scuba-recap',
    portfolioId: 'video-10',
    title: 'Redang Island Dive Centre — Scuba Trip Recap',
    summary:
      'A destination recap for Redang Island Dive Centre — translating raw trip and underwater coverage into a cinematic travel narrative built for social discovery, experience marketing, and long-term content reuse.',
    challenge:
      'Dive and travel footage is visually rich but structurally messy: mixed conditions, long days, and strong isolated moments that don’t naturally form a story. The objective was watch-through in short-form feeds while still conveying the scale, immersion, and aspiration of the Redang experience — and producing assets the client could repurpose without returning to shoot.',
    approach:
      'We edited around narrative progression — surface arrival, human energy, descent, underwater immersion, marine payoff — rather than a flat highlight reel. On the director side: fluid camera rhythm underwater, contrast between surface warmth and sub-surface cool tones, and cut points aligned to breath and movement so the piece feels like one journey. On the campaign side: the master recap was designed with extractable social modules — hero hooks, 15s snippets, and loop-friendly moments for ads, reposts, and seasonal pushes. Sound and pacing were calibrated for mobile-first viewing and silent-scroll tolerance where needed.',
    outcome:
      'A recap with stronger narrative cohesion and retention — not just beautiful clips, but a story that sells the trip. The client gained a primary film plus a set of reusable social assets suitable for organic, paid, and evergreen marketing without additional production.',
    relatedService: {
      label: 'Videography',
      href: '/services/videography',
    },
  },
];

export const CASE_STUDY_ENTRIES = CASE_STUDIES.map(study => ({
  portfolioId: study.portfolioId,
  href: `/case-studies/${study.slug}`,
}));

export type CaseStudyEntry = (typeof CASE_STUDY_ENTRIES)[number];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find(study => study.slug === slug);
}

export function getCaseStudyPortfolioItem(
  study: CaseStudy
): PortfolioItem | undefined {
  return portfolioItems.find(item => item.id === study.portfolioId);
}

export function caseStudyHref(slug: string): string {
  return `/case-studies/${slug}`;
}
