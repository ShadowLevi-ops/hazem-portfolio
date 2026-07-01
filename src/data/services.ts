export type ServiceItem = {
  id: string;
  code: string;
  title: string;
  hook: string;
  deliverables: string[];
  href?: string;
  /** Bento placement */
  layout: 'hero' | 'tall' | 'standard' | 'wide';
  format?: string;
};

export const SERVICE_PIPELINE = [
  { step: 'Brief', note: 'Goals + channels locked' },
  { step: 'Shoot', note: 'One day on set' },
  { step: 'Edit', note: 'Hero + cutdowns' },
  { step: 'Ship', note: 'Ready to post' },
] as const;

export const SERVICES: ServiceItem[] = [
  {
    id: 'videography',
    code: 'SVC-01',
    title: 'Videography',
    hook: 'Campaign films and social-native edits built for retention-first feeds.',
    deliverables: [
      'Hero film + platform cutdowns',
      '9:16 Reels & Stories',
      'Director-led pacing & grade',
    ],
    href: '/services/videography',
    layout: 'hero',
    format: '9:16 · 16:9',
  },
  {
    id: 'social-media',
    code: 'SVC-02',
    title: 'Social Media',
    hook: 'Content systems — not one-off posts that die in the folder.',
    deliverables: [
      'Platform-native edits',
      'Hook-first openers',
      'Posting-ready exports',
    ],
    href: '/services/social-media',
    layout: 'tall',
    format: 'Reels · TikTok',
  },
  {
    id: 'creative-strategy',
    code: 'SVC-03',
    title: 'Creative Strategy',
    hook: 'What to shoot, where it lives, and how it stacks into a campaign.',
    deliverables: [
      'Channel mapping & shotlists',
      'Content calendars',
      'Campaign narrative arcs',
    ],
    layout: 'wide',
  },
];
