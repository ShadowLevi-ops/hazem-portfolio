export const CASE_STUDY_ENTRIES = [
  {
    portfolioId: 'video-16',
    href: '/case-studies/puma-solewhat-launch',
  },
  {
    portfolioId: 'video-14',
    href: '/case-studies/tottenham-cny-campaign',
  },
  {
    portfolioId: 'video-10',
    href: '/case-studies/scuba-recap',
  },
] as const;

export type CaseStudyEntry = (typeof CASE_STUDY_ENTRIES)[number];
