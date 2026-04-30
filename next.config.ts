import type { NextConfig } from 'next';

const isStaticExport = true;

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  trailingSlash: true,
  distDir: 'out',
  basePath: '',
  // Enable compression for text files only, preserve video quality
  compress: true,
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'yet-another-react-lightbox',
    ],
    // optimizeCss: true, // Disabled to avoid critters dependency issues
    webpackBuildWorker: true,
  },
  // Security/cache headers (only supported in non-export deployments)
  ...(isStaticExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: '/(.*)',
              headers: [
                {
                  key: 'X-Frame-Options',
                  value: 'DENY',
                },
                {
                  key: 'X-Content-Type-Options',
                  value: 'nosniff',
                },
                {
                  key: 'Referrer-Policy',
                  value: 'strict-origin-when-cross-origin',
                },
                {
                  key: 'Permissions-Policy',
                  value: 'camera=(), microphone=(), geolocation=()',
                },
              ],
            },
            // Preserve video quality - prevent compression for video files
            {
              source: '/videos/(.*)',
              headers: [
                {
                  key: 'Cache-Control',
                  value: 'public, max-age=31536000, immutable',
                },
                {
                  key: 'Content-Encoding',
                  value: 'identity',
                },
              ],
            },
          ];
        },
      }),
  // Webpack configuration for better performance
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // Preserve video quality - don't compress video files
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      type: 'asset/resource',
      generator: {
        filename: 'videos/[name][ext]',
      },
    });

    return config;
  },
  // Power pack for better performance
  poweredByHeader: false,
  generateEtags: false,
};

export default nextConfig;
