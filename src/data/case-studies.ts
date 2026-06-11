import { portfolioItems } from '@/data/portfolio-items';
import type { PortfolioItem } from '@/types/portfolio';

export type CaseStudyMetric = {
  label: string;
  value: string;
};

export type CaseStudyResults = {
  period: string;
  platform: string;
  summary: string;
  metrics: CaseStudyMetric[];
};

export type CaseStudy = {
  slug: string;
  portfolioId: string;
  title: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  results?: CaseStudyResults;
  relatedService: {
    label: string;
    href: string;
  };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'puma-solewhat-launch',
    portfolioId: 'video-16',
    title: 'PUMA x SOLEWHAT: H Street Line Launch',
    summary:
      'A launch film and social rollout for the PUMA x SOLEWHAT H Street drop, engineered as a content system, not a single hero asset. The work balances drop-day urgency with premium visual language: product hero moments, street-level atmosphere, and motion-led sequences cut for both long-form film and platform-native distribution.',
    challenge:
      'Streetwear launches live and die in the first 48 hours. The brief demanded campaign-grade polish at social speed: assets that could lead Instagram and Reels feeds, support retail and partner channels, and hold visual consistency across hero film, cutdowns, and repostable snippets. The constraint was time: one capture window, multiple formats, zero drift in grade, pacing, or brand tone.',
    approach:
      'We treated the shoot as modular narrative architecture, blocking product, environment, and human energy so each scene could function as a standalone social unit or as part of the master film. On the director side: controlled contrast in framing, deliberate rhythm in cut points, and a grade that kept leather, textile, and urban texture readable on mobile. On the campaign side: we mapped deliverables to rollout phases, including a hero launch film, 15 to 30 second cutdowns, and loop-friendly micro-moments for stories and paid social. Edit pacing was built for hook → product reveal → brand stamp, with sound design supporting retention without overpowering the visual line.',
    outcome:
      'A cohesive launch package that read as one campaign across every touchpoint. The hero Instagram Reel delivered 14,738 video views, 908 engagements, and 8,956 organic reach—keeping the H Street line visually dominant in feed without additional reshoots.',
    results: {
      period: 'Thu, Feb 19, 2026 · 12:38 pm GMT',
      platform: 'Instagram Reel',
      summary: 'Organic performance on the hero Instagram Reel at publish.',
      metrics: [
        { label: 'Video views', value: '14,738' },
        { label: 'Engagements', value: '908' },
        { label: 'Comments', value: '11' },
        { label: 'Organic reach', value: '8,956' },
        { label: 'Engagement rate', value: '6.2%' },
      ],
    },
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
      'A seasonal brand film for Tottenham Hotspur’s Chinese New Year 2026 activation, culturally resonant for the moment, globally consistent for the club, and cut for immediate social deployment under a compressed campaign window.',
    challenge:
      'CNY content sits at a difficult intersection: it must feel locally authentic to festive audiences while meeting the governance and visual standards of a major international sports brand. The timeline was tight, with campaign-ready delivery and no extended revision runway, and the assets needed to work across vertical and horizontal placements without feeling like two different campaigns.',
    approach:
      'We structured the piece around a clear seasonal narrative arc: celebration, community, and club identity, with editorial rhythm tuned for social retention rather than broadcast length. On the director side: warm tonal palette, intentional framing on gesture and atmosphere, and cut logic that builds emotional lift before the brand resolution. On the campaign side: we planned for platform-native formats from day one, vertical-first for Reels and stories, horizontal for broader club channels, with brand-safe composition in every frame. Pacing, supers, and end-card real estate were considered for thumb-stop performance and official-channel polish simultaneously.',
    outcome:
      'Campaign-ready assets delivered on schedule, festive enough for CNY and disciplined enough for global club standards. The @spursofficial Instagram Reel reached 28,906 video views, 2,065 engagements, and 17,304 organic reach—landing the cultural moment with immediate rollout capability across social placements.',
    results: {
      period: 'Wed, Feb 18, 2026 · 6:12 am GMT',
      platform: 'Instagram Reel · @spursofficial',
      summary:
        'Organic performance on the hero @spursofficial Instagram Reel at publish.',
      metrics: [
        { label: 'Video views', value: '28,906' },
        { label: 'Engagements', value: '2,065' },
        { label: 'Comments', value: '36' },
        { label: 'Organic reach', value: '17,304' },
        { label: 'Engagement rate', value: '7.1%' },
      ],
    },
    relatedService: {
      label: 'Social Media Content',
      href: '/services/social-media',
    },
  },
  {
    slug: 'giancarlo-gallifuoco-interview',
    portfolioId: 'video-17',
    title: 'Tottenham Hotspur: Giancarlo Gallifuoco Profile Interview',
    summary:
      'An interview-led profile film for Tottenham Hotspur featuring former academy graduate Giancarlo Gallifuoco, translating a personal football journey—from a sceptical Facebook message to training alongside Harry Kane—into an editorial piece built for regional storytelling, club heritage, and long-form social distribution.',
    challenge:
      'Academy alumni stories are emotionally rich but easy to tell generically: static talking heads, flat pacing, and narrative that fails to connect past club experience with present regional relevance. The brief required Tottenham-grade production values on an interview format, authentic delivery from the subject without feeling promotional, and assets that could anchor ASEAN fan engagement while meeting global club standards.',
    approach:
      'We structured the interview around narrative beats rather than a linear Q&A: origin and disbelief, arrival at Tottenham, formative years in the academy, training alongside first-team icons, and the arc from London to Southeast Asia. On the director side: controlled lighting and composition for editorial clarity, cut logic that intercuts reactive moments with establishing context, and pacing that lets personality land without dragging. On the campaign side: a horizontal master film for club and partner channels, with extractable vertical snippets and quote-led hooks for Reels, stories, and regional fanclub reposts.',
    outcome:
      'A profile film that reads as genuine storytelling, not a press clip—with stronger retention through personal narrative and club credibility. The @spursofficial Instagram Reel reached 48,298 video views, 3,113 engagements, and 31,282 organic reach on publish day.',
    results: {
      period: 'Tue, Mar 10, 2026 · 11:20 am GMT',
      platform: 'Instagram Reel · @spursofficial',
      summary:
        'Organic performance on the hero @spursofficial Instagram Reel at publish.',
      metrics: [
        { label: 'Video views', value: '48,298' },
        { label: 'Engagements', value: '3,113' },
        { label: 'Comments', value: '32' },
        { label: 'Organic reach', value: '31,282' },
        { label: 'Engagement rate', value: '6.4%' },
      ],
    },
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
