'use client';

import { useEffect, useRef, useState } from 'react';

type PortfolioVideoPreviewProps = {
  src: string;
  fallbackSrc: string;
  poster: string | undefined;
  eager?: boolean;
  observeVisibility?: boolean;
  className?: string;
};

export function PortfolioVideoPreview({
  src,
  fallbackSrc,
  poster,
  eager = false,
  observeVisibility = false,
  className = '',
}: PortfolioVideoPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | null>(eager ? src : null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (eager) return;

    const container = containerRef.current;
    if (!container) return;

    const startLoad = () => setActiveSrc(current => current ?? src);
    container.addEventListener('mouseenter', startLoad);
    container.addEventListener('touchstart', startLoad, { passive: true });

    if (!observeVisibility) {
      return () => {
        container.removeEventListener('mouseenter', startLoad);
        container.removeEventListener('touchstart', startLoad);
      };
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = videoRef.current;
          if (!video) return;

          if (entry.isIntersecting) {
            setActiveSrc(current => current ?? src);
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.35, rootMargin: '80px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      container.removeEventListener('mouseenter', startLoad);
      container.removeEventListener('touchstart', startLoad);
    };
  }, [eager, observeVisibility, src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeSrc) return;

    setIsReady(false);
    setHasError(false);
    video.src = activeSrc;
    video.load();

    const playWhenReady = () => {
      setIsReady(true);
      void video.play().catch(() => {
        // Autoplay may be blocked on some mobile browsers.
      });
    };

    video.addEventListener('canplay', playWhenReady);
    video.addEventListener('loadeddata', playWhenReady);

    return () => {
      video.removeEventListener('canplay', playWhenReady);
      video.removeEventListener('loadeddata', playWhenReady);
      video.pause();
    };
  }, [activeSrc]);

  const handleError = () => {
    if (activeSrc === src && fallbackSrc !== src) {
      setActiveSrc(fallbackSrc);
      return;
    }
    setHasError(true);
  };

  if (hasError) return null;

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <video
        ref={videoRef}
        className={`pointer-events-none h-full w-full object-cover transition-opacity duration-300 ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload={activeSrc ? 'auto' : 'none'}
        poster={poster}
        aria-hidden="true"
        onError={handleError}
      />
    </div>
  );
}
