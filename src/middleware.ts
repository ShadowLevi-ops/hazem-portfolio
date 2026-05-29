import { NextResponse, type NextRequest } from 'next/server';
import {
  CANONICAL_SITE_HOST,
  shouldRedirectToCanonicalHost,
} from '@/lib/legacy-domains';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host');

  if (!shouldRedirectToCanonicalHost(host)) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.protocol = 'https:';
  destination.host = CANONICAL_SITE_HOST;

  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.png|apple-icon.png|robots.txt|sitemap.xml|manifest.json|videos/|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|ico|txt|xml|json|webmanifest)$).*)',
  ],
};
