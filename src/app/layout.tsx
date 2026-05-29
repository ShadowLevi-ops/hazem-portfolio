import type { Metadata, Viewport } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Layout } from '@/components/layout/Layout';
import './globals.css';
import { cn } from '@/lib/utils';
import { SITE_URL } from '@/lib/site';

const montserrat = Montserrat({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  title: {
    default: 'Hazem Designs Work - Professional Photography & Videography',
    template: '%s | Hazem Designs',
  },
  description:
    'Professional photography, videography, and film portfolio showcasing creative visual storytelling. Specializing in portrait, commercial, and artistic photography with cutting-edge videography services.',
  keywords: [
    'photography',
    'videography',
    'film',
    'portfolio',
    'creative',
    'visual storytelling',
    'commercial photography',
    'portrait photography',
    'artistic photography',
    'video production',
    'cinematography',
  ],
  authors: [{ name: 'Hazem', url: 'mailto:hazem@noveltyventures.uk' }],
  creator: 'Hazem',
  publisher: 'Hazem Designs',
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
    title: 'Hazem Designs Work - Professional Photography & Videography',
    description:
      'Professional photography, videography, and film portfolio showcasing creative visual storytelling.',
    siteName: 'Hazem Designs',
    images: [
      {
        url: '/images/og-image.jpg', // Create this image
        width: 1200,
        height: 630,
        alt: 'Hazem Designs - Professional Photography & Videography',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hazem Designs Work - Professional Photography & Videography',
    description:
      'Professional photography, videography, and film portfolio showcasing creative visual storytelling.',
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
  '@type': 'Person',
  name: 'Hazem',
  jobTitle: 'Photographer & Videographer',
  url: SITE_URL,
  image: '/images/profile.jpg', // Add your profile image
  email: 'hazem@noveltyventures.uk',
  telephone: '+44 1737 67247',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'UK',
  },
  sameAs: [
    // Add your social media profiles
    'https://wa.me/0173767247',
  ],
  knowsAbout: [
    'Photography',
    'Videography',
    'Film Production',
    'Visual Storytelling',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Professional Photographer and Videographer',
  },
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
          montserrat.variable,
          inter.variable
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
