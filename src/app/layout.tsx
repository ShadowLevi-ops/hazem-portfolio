import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Layout } from '@/components/layout/Layout';
import './globals.css';
import { cn } from '@/lib/utils';
import { SITE_URL, SITE_DESCRIPTION } from '@/lib/site';
import { fontVariables } from '@/lib/fonts';

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  title: {
    default: 'GiltMedia | Social Campaign Film & Videography',
    template: '%s | GiltMedia',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'GiltMedia',
    'videography',
    'social media content',
    'campaign film',
    'brand video',
    'photography',
    'Kuala Lumpur',
    'Malaysia',
    'visual storytelling',
    'content production',
  ],
  authors: [{ name: 'Hazem', url: 'mailto:hazem@noveltyventures.uk' }],
  creator: 'GiltMedia',
  publisher: 'GiltMedia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'GiltMedia | Social Campaign Film & Videography',
    description: SITE_DESCRIPTION,
    siteName: 'GiltMedia',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GiltMedia — Social Campaign Film & Videography',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GiltMedia | Social Campaign Film & Videography',
    description: SITE_DESCRIPTION,
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// Structured Data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'GiltMedia',
  url: SITE_URL,
  image: '/images/profile.jpg',
  email: 'hazem@noveltyventures.uk',
  telephone: '+60173767247',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kuala Lumpur',
    addressCountry: 'MY',
  },
  sameAs: ['https://wa.me/60173767247'],
  description: SITE_DESCRIPTION,
  areaServed: 'Malaysia',
  knowsAbout: [
    'Videography',
    'Social Media Content',
    'Campaign Film',
    'Visual Storytelling',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Critical resource preloading for faster initial load */}
        <link
          rel="preload"
          href="/giltmedia2.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/videos/VT-11.webp"
          as="image"
          type="image/webp"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body
        className={cn(
          'bg-background dark min-h-screen font-sans antialiased',
          fontVariables
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="dark">
            <Layout>{children}</Layout>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
