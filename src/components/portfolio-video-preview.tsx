'use client';

import { useEffect, useRef, useState } from 'react';
import {
  attachTouchVideoUnlock,
  pausePreviewVideo,
  playPreviewVideo,
} from '@/lib/video-playback';

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
  const [isVisible, setIsVisible] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    attachTouchVideoUnlock();
  }, []);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  useEffect(() => {
    if (eager) {
      setShouldLoad(true);
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
          const visible =
            entry.isIntersecting && entry.intersectionRatio >= 0.08;
          setIsVisible(visible);

          if (visible) {
            setShouldLoad(true);
            return;
          }

          if (videoRef.current) {
            pausePreviewVideo(videoRef.current);
          }
        });
      },
      { threshold: [0, 0.08, 0.2, 0.45], rootMargin: '200px 0px' }
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

    const shouldPlay = observeVisibility ? isVisible : true;
    if (!shouldPlay) {
      pausePreviewVideo(video);
      return;
    }

    const play = () => {
      void playPreviewVideo(video);
    };

    video.addEventListener('loadeddata', play);
    video.addEventListener('canplay', play);
    video.addEventListener('canplaythrough', play);
    play();

    return () => {
      video.removeEventListener('loadeddata', play);
      video.removeEventListener('canplay', play);
      video.removeEventListener('canplaythrough', play);
    };
  }, [shouldLoad, currentSrc, isVisible, observeVisibility]);

  return (
    <div ref={containerRef} className={`absolute inset-0 z-[1] ${className}`}>
      {shouldLoad ? (
        <video
          ref={videoRef}
          data-portfolio-preview="true"
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
