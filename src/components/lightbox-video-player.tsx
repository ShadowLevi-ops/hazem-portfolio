'use client';

import { useEffect, useRef } from 'react';
import { attemptVideoPlay } from '@/lib/video-playback';

type LightboxVideoPlayerProps = {
  src: string;
  poster: string | undefined;
  isActive: boolean;
};

export function LightboxVideoPlayer({
  src,
  poster,
  isActive,
}: LightboxVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isActive) {
      video.pause();
      return;
    }

    video.load();
    const play = () => {
      void attemptVideoPlay(video);
    };

    video.addEventListener('canplay', play);
    play();

    return () => {
      video.removeEventListener('canplay', play);
      video.pause();
    };
  }, [src, isActive]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      controls
      autoPlay
      muted
      playsInline
      loop
      preload="auto"
      className="lightbox-video-player bg-black"
    />
  );
}
