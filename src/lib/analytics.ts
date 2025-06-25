// Analytics and monitoring utilities

// Types for analytics events
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  label?: string;
}

// Custom analytics implementation
class Analytics {
  private isProduction = process.env.NODE_ENV === 'production';
  private isClient = typeof window !== 'undefined';

  // Track custom events
  track(event: AnalyticsEvent) {
    if (!this.isClient || !this.isProduction) {
      console.log('Analytics Event:', event);
      return;
    }

    // Replace with your analytics service (Google Analytics, Mixpanel, etc.)
    // Example for Google Analytics 4:
    if (window.gtag) {
      window.gtag('event', event.name, {
        ...event.properties,
        timestamp: Date.now(),
      });
    }
  }

  // Track page views
  trackPageView(url: string, title?: string) {
    this.track({
      name: 'page_view',
      properties: {
        page_url: url,
        page_title: title || document.title,
      },
    });
  }

  // Track user interactions
  trackInteraction(element: string, action: string, value?: string) {
    this.track({
      name: 'user_interaction',
      properties: {
        element,
        action,
        value,
      },
    });
  }

  // Track performance metrics
  trackPerformance(metric: PerformanceMetric) {
    if (!this.isClient || !this.isProduction) {
      console.log('Performance Metric:', metric);
      return;
    }

    this.track({
      name: 'performance_metric',
      properties: {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_label: metric.label,
      },
    });
  }

  // Track errors
  trackError(error: Error, context?: string) {
    this.track({
      name: 'error',
      properties: {
        error_message: error.message,
        error_stack: error.stack,
        error_context: context,
        url: window.location.href,
        user_agent: navigator.userAgent,
      },
    });
  }
}

// Web Vitals tracking
export function trackWebVitals() {
  if (typeof window === 'undefined') return;

  // Track Core Web Vitals
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS((metric) => {
      analytics.trackPerformance({
        name: 'CLS',
        value: metric.value,
        label: metric.id,
      });
    });

    getFID((metric) => {
      analytics.trackPerformance({
        name: 'FID',
        value: metric.value,
        label: metric.id,
      });
    });

    getFCP((metric) => {
      analytics.trackPerformance({
        name: 'FCP',
        value: metric.value,
        label: metric.id,
      });
    });

    getLCP((metric) => {
      analytics.trackPerformance({
        name: 'LCP',
        value: metric.value,
        label: metric.id,
      });
    });

    getTTFB((metric) => {
      analytics.trackPerformance({
        name: 'TTFB',
        value: metric.value,
        label: metric.id,
      });
    });
  });
}

// Export singleton instance
export const analytics = new Analytics();

// Global error tracking
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    analytics.trackError(new Error(event.message), 'global_error_handler');
  });

  window.addEventListener('unhandledrejection', (event) => {
    analytics.trackError(
      new Error(event.reason?.message || 'Unhandled Promise Rejection'),
      'unhandled_promise_rejection'
    );
  });
}

// Performance observer for additional metrics
if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
  try {
    // Observe navigation timing
    const navObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          
          // Track page load time
          analytics.trackPerformance({
            name: 'page_load_time',
            value: navEntry.loadEventEnd - navEntry.navigationStart,
          });

          // Track DOM content loaded time
          analytics.trackPerformance({
            name: 'dom_content_loaded',
            value: navEntry.domContentLoadedEventEnd - navEntry.navigationStart,
          });
        }
      });
    });

    navObserver.observe({ entryTypes: ['navigation'] });

    // Observe resource timing for large resources
    const resourceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.transferSize && entry.transferSize > 50000) {
          analytics.trackPerformance({
            name: 'large_resource_load',
            value: entry.duration,
            label: entry.name,
          });
        }
      });
    });

    resourceObserver.observe({ entryTypes: ['resource'] });
  } catch (error) {
    console.warn('Performance Observer not supported:', error);
  }
}

// Declare global gtag function for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
} 