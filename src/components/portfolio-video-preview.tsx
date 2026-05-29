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
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  useEffect(() => {
    if (eager) {
      setShouldLoad(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const startLoad = () => setShouldLoad(true);
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
          if (entry.isIntersecting) {
            setShouldLoad(true);
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.2, rootMargin: '120px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      container.removeEventListener('mouseenter', startLoad);
      container.removeEventListener('touchstart', startLoad);
    };
  }, [eager, observeVisibility]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    const play = () => {
      void video.play().catch(() => {
        // Autoplay may be blocked; poster remains visible underneath.
      });
    };

    video.addEventListener('loadeddata', play);
    video.addEventListener('canplay', play);
    play();

    return () => {
      video.removeEventListener('loadeddata', play);
      video.removeEventListener('canplay', play);
    };
  }, [shouldLoad, currentSrc]);

  return (
    <div ref={containerRef} className={`absolute inset-0 z-[1] ${className}`}>
      {shouldLoad ? (
        <video
          ref={videoRef}
          src={currentSrc}
          className="pointer-events-none h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-hidden="true"
          onError={() => {
            if (currentSrc !== fallbackSrc) {
              setCurrentSrc(fallbackSrc);
            }
          }}
        />
      ) : null}
    </div>
  );
}
