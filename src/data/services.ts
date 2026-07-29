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
  { step: 'Teaser', note: '3 assets · early pull' },
  { step: 'Unveil', note: '4 assets · intent' },
  { step: 'Launch', note: '5 assets · convert' },
  { step: 'Extend', note: '10 assets · proof' },
] as const;

export const SERVICES: ServiceItem[] = [
  {
    id: 'teaser',
    code: 'PH-01',
    title: 'Teaser',
    hook: 'Spark curiosity before the drop.',
    deliverables: [
      'Cryptic Hero Graphic',
      'Vibe Video Hook',
      'VIP Pre-Launch Email',
    ],
    layout: 'hero',
    format: '3 assets',
  },
  {
    id: 'unveil',
    code: 'PH-02',
    title: 'Unveil',
    hook: 'Pull high-intent eyes in.',
    deliverables: [
      'Macro-Detail Carousel',
      'Form Factor Reveal',
      'Zero-Party Waitlist',
      'Partial Glimpse Teaser',
    ],
    layout: 'tall',
    format: '4 assets',
  },
  {
    id: 'launch',
    code: 'PH-03',
    title: 'Launch',
    hook: 'Primary conversion push.',
    deliverables: [
      'Core Hero Video',
      'Best Showcase Gallery',
      'Founder Letter',
      'Segmented Launch Blast',
      'Live Q&A Stream',
    ],
    layout: 'tall',
    format: '5 assets',
  },
  {
    id: 'extend',
    code: 'PH-04',
    title: 'Extend',
    hook: 'Scale through social proof.',
    deliverables: [
      'Unpolished BTS',
      'UGC & Context',
      'Micro-KOL Reviews',
      'Performance Retargeting',
    ],
    layout: 'wide',
    format: '10 assets',
  },
];
