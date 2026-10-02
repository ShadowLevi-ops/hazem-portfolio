'use client';

import { useRef } from 'react';
import { VideoFullscreenControls } from '@/components/video-fullscreen-controls';

type CaseStudyVideoProps = {
  src: string;
  poster?: string | undefined;
  title: string;
};

export function CaseStudyVideo({ src, poster, title }: CaseStudyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="surface-card relative overflow-hidden rounded-xl">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        playsInline
        preload="auto"
        className="aspect-video w-full bg-black object-contain"
        aria-label={`${title} campaign video`}
      />
      <VideoFullscreenControls videoRef={videoRef} />
    </div>
  );
}
