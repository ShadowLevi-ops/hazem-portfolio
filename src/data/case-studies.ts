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
    title: 'PUMA x SOLEWHAT Launch',
    summary:
      'Social-first launch coverage built for speed, style consistency, and audience retention.',
    challenge:
      'Deliver launch assets that felt premium while staying agile for fast social distribution windows.',
    approach:
      'Designed a modular capture plan, then edited hero and cutdown variants for multi-platform rollouts.',
    outcome:
      'Produced a cohesive launch package that improved content consistency and extended campaign shelf life.',
    relatedService: {
      label: 'Videography',
      href: '/services/videography',
    },
  },
  {
    slug: 'tottenham-cny-campaign',
    portfolioId: 'video-14',
    title: 'Tottenham CNY Campaign',
    summary:
      'Fast-turnaround campaign storytelling for a seasonal sports audience.',
    challenge:
      'Create culturally relevant content under a tight campaign window while preserving global brand consistency.',
    approach:
      'Built a concise narrative structure and delivered platform-native edits that balanced brand and local relevance.',
    outcome:
      'Delivered polished assets ready for campaign deployment with minimal turnaround friction.',
    relatedService: {
      label: 'Social Media Content',
      href: '/services/social-media',
    },
  },
  {
    slug: 'scuba-recap',
    portfolioId: 'video-10',
    title: 'Scuba Trip Recap',
    summary:
      'Turning destination footage into a cohesive story viewers watch through.',
    challenge:
      'Convert long-form travel coverage into short, engaging edits with clear narrative momentum.',
    approach:
      'Structured highlights around moments of progression and contrast, then paced edits for retention in short-form feeds.',
    outcome:
      'Produced a recap package with stronger watchability and reusable snippets for campaign reposting.',
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
