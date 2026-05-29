export const CANONICAL_SITE_HOST = 'www.giltmedia.work';

/** Hostnames that should permanently redirect to the canonical GiltMedia domain. */
export const LEGACY_REDIRECT_HOSTS = [
  'giltmedia.work',
  'hazemdesign.work',
  'www.hazemdesign.work',
  'hazem-designs.vercel.app',
] as const;

export function shouldRedirectToCanonicalHost(host: string | null): boolean {
  if (!host) return false;

  const normalized = host.split(':')[0]?.toLowerCase();
  if (!normalized || normalized === CANONICAL_SITE_HOST) return false;

  return (LEGACY_REDIRECT_HOSTS as readonly string[]).includes(normalized);
}
