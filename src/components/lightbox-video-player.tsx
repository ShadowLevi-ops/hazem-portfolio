'use client';

import { useEffect, useRef } from 'react';
import { VideoFullscreenControls } from '@/components/video-fullscreen-controls';
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
      if (video.muted) {
        void attemptVideoPlay(video);
      } else if (video.paused) {
        void video.play().catch(() => undefined);
      }
    };

    video.addEventListener('canplay', play);
    play();

    return () => {
      video.removeEventListener('canplay', play);
      video.pause();
    };
  }, [src, isActive]);

  return (
    <div className="lightbox-video-shell">
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
      <VideoFullscreenControls videoRef={videoRef} />
    </div>
  );
}
