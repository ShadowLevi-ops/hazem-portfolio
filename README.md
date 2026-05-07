# Hazem Designs Portfolio

A professional photography and videography portfolio website built with modern web technologies and industry-standard practices.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Performance Optimized**: Web Vitals monitoring, image optimization, code splitting
- **SEO Ready**: Comprehensive metadata, structured data, sitemap
- **Accessibility**: WCAG 2.1 compliant, keyboard navigation, screen reader support
- **Testing**: Unit tests (Jest), E2E tests (Playwright), visual regression testing
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks, TypeScript strict mode
- **CI/CD**: GitHub Actions workflow with automated testing and deployment
- **Security**: Content Security Policy, security headers, vulnerability scanning
- **Analytics**: Web Vitals tracking, error monitoring, user interaction analytics
- **PWA Ready**: Service worker, manifest, offline support

## 🛠️ Tech Stack

### Core Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Development Tools

- **Linting**: ESLint with Next.js, TypeScript, and accessibility rules
- **Formatting**: Prettier with Tailwind CSS plugin
- **Pre-commit**: Husky with lint-staged
- **Testing**: Jest + React Testing Library + Playwright
- **Bundle Analysis**: @next/bundle-analyzer
- **Performance**: Lighthouse CI

### Deployment & Monitoring

- **Static Export**: Optimized for CDN deployment
- **Analytics**: Custom analytics with Web Vitals tracking
- **Error Monitoring**: Built-in error boundary and tracking
- **Performance**: Core Web Vitals monitoring

## 📦 Installation

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn package manager
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/hazem-portfolio.git
cd hazem-portfolio

# Install dependencies
npm install

# Set up Husky pre-commit hooks
npm run prepare

# Start development server
npm run dev
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build            # Build for production
npm run start            # Start production server
npm run analyze          # Analyze bundle size

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # Run TypeScript type checking

# Testing
npm run test             # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui      # Run E2E tests with UI

# Performance
npm run lighthouse       # Run Lighthouse performance audit
```

### Development Workflow

1. **Create a new branch**: `git checkout -b feature/your-feature-name`
2. **Make changes**: Follow the code style guidelines
3. **Run tests**: `npm run test` and `npm run test:e2e`
4. **Check code quality**: `npm run lint` and `npm run type-check`
5. **Commit**: Pre-commit hooks will run automatically
6. **Push and create PR**: Follow the PR template

### Code Style Guidelines

- **TypeScript**: Use strict mode, explicit return types for public APIs
- **React**: Functional components with hooks, proper prop types
- **Styling**: Tailwind CSS utilities, follow the design system
- **Testing**: Write tests for all new components and utilities
- **Accessibility**: Ensure all interactive elements are keyboard accessible

## 🧪 Testing

### Unit Testing

- **Framework**: Jest with React Testing Library
- **Coverage**: 70% minimum threshold
- **Location**: `src/**/*.test.{ts,tsx}`

```bash
npm run test:coverage
```

### E2E Testing

- **Framework**: Playwright
- **Browsers**: Chromium, Firefox, WebKit
- **Location**: `tests/e2e/**/*.spec.ts`

```bash
npm run test:e2e
```

### Accessibility Testing

- **Automated**: ESLint jsx-a11y rules
- **Manual**: Keyboard navigation, screen reader testing
- **Tools**: Lighthouse accessibility audit

## 🚀 Deployment

### Vercel / Next.js Runtime

This project is configured for standard Next.js deployments (recommended on Vercel).

```bash
npm run build
npm run start
```

### Deployment Platforms

- **Vercel**: Recommended
- **Netlify**: Supported

## 🎞️ Video previews (fast hover/load)

To keep the grid smooth, the site supports optional lightweight preview videos for cards while keeping fullscreen/lightbox playback on the original full-quality files.

- **Full video**: `mediaUrl`
- **Preview video**: `previewMediaUrl` (optional)

### Generate previews

Requires `ffmpeg` installed and available on your PATH.

```bash
npm run videos:previews
```

This generates preview MP4s into `public/videos/previews/`.
Then, set `previewMediaUrl` in `src/data/portfolio-items.ts` like:

```ts
previewMediaUrl: '/videos/previews/11.mp4';
```

### Environment Variables

Create `.env.local` for local development:

```bash
# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Error tracking (optional)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn

# Domain for metadata
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📊 Performance

### Core Web Vitals

- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Optimization Features

- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- Font optimization with `next/font`
- Bundle analysis and tree shaking
- Service worker for caching (PWA)

### Monitoring

- Web Vitals tracking with analytics
- Error monitoring and reporting
- Performance observer for detailed metrics
- Lighthouse CI in GitHub Actions

## 🔒 Security

### Security Headers

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: Restricted camera, microphone, geolocation

### Best Practices

- Content Security Policy ready
- No exposed sensitive data
- Secure cookie handling
- Input sanitization
- Dependency vulnerability scanning

## 🎨 Design System

### Colors

- Primary: Custom color palette with dark/light mode support
- Semantic: Success, warning, error, info colors
- Neutral: Gray scale for text and backgrounds

### Typography

- Font stack: System fonts with fallbacks
- Scale: Responsive typography scale
- Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Components

- Design tokens in `globals.css`
- Consistent spacing and sizing
- Accessibility-first approach
- Mobile-responsive design

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Commit Convention

```
type(scope): description

feat: add new portfolio filter
fix: resolve image loading issue
docs: update README
style: format code
refactor: optimize performance
test: add unit tests
chore: update dependencies
```

## 📄 License

This project is private and proprietary. All rights reserved.

## 🤝 Support

For support or questions:

- Email: hazem@noveltyventures.uk
- WhatsApp: [+44 1737 67247](https://wa.me/0173767247)

## 🏗️ Architecture

### Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # UI primitives
│   └── layout/         # Layout components
├── data/               # Static data and content
├── lib/                # Utility functions and configurations
└── types/              # TypeScript type definitions

tests/
├── e2e/                # End-to-end tests
└── __mocks__/          # Test mocks

public/
├── images/             # Image assets
├── videos/             # Video assets
└── ...                 # Static files
```

### Key Design Decisions

- **App Router**: Using Next.js 13+ App Router for better performance
- **TypeScript Strict**: Enabled for better type safety
- **Static Export**: For optimal CDN performance
- **Component Library**: Radix UI for accessibility and consistency
- **Testing Strategy**: Unit + E2E testing for confidence
- **Performance First**: Web Vitals and Lighthouse monitoring

---

Built with ❤️ by Hazem Designs
