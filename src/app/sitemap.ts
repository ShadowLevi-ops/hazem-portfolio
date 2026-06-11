import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

const routes = [
  '',
  'book',
  'services/videography',
  'services/photography',
  'services/social-media',
  'case-studies/puma-solewhat-launch',
  'case-studies/tottenham-cny-campaign',
  'case-studies/giancarlo-gallifuoco-interview',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(route => ({
    url: route ? `${SITE_URL}/${route}/` : `${SITE_URL}/`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
