'use client';

import { Maximize2, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useState, type RefObject } from 'react';
import {
  enterVideoFullscreenWithSound,
  unmuteVideo,
} from '@/lib/video-playback';

type VideoFullscreenControlsProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
};

export function VideoFullscreenControls({
  videoRef,
}: VideoFullscreenControlsProps) {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncMuted = () => setMuted(video.muted);
    const unmuteOnNativeFullscreen = () => {
      if (document.fullscreenElement === video) unmuteVideo(video);
    };
    const unmuteOnWebkitFullscreen = () => unmuteVideo(video);

    syncMuted();
    video.addEventListener('volumechange', syncMuted);
    video.addEventListener('webkitbeginfullscreen', unmuteOnWebkitFullscreen);
    document.addEventListener('fullscreenchange', unmuteOnNativeFullscreen);

    return () => {
      video.removeEventListener('volumechange', syncMuted);
      video.removeEventListener(
        'webkitbeginfullscreen',
        unmuteOnWebkitFullscreen
      );
      document.removeEventListener(
        'fullscreenchange',
        unmuteOnNativeFullscreen
      );
    };
  }, [videoRef]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      unmuteVideo(video);
    } else {
      video.muted = true;
    }
  };

  const openFullscreen = () => {
    const video = videoRef.current;
    if (video) void enterVideoFullscreenWithSound(video);
  };

  return (
    <div
      className="video-fullscreen-controls"
      role="presentation"
      onPointerDown={event => event.stopPropagation()}
      onPointerUp={event => event.stopPropagation()}
      onClick={event => event.stopPropagation()}
    >
      <button
        type="button"
        onClick={toggleSound}
        className="video-fullscreen-controls__button"
        aria-label={muted ? 'Turn sound on' : 'Mute video'}
      >
        {muted ? (
          <VolumeX className="size-5" aria-hidden />
        ) : (
          <Volume2 className="size-5" aria-hidden />
        )}
      </button>
      <button
        type="button"
        onClick={openFullscreen}
        className="video-fullscreen-controls__button video-fullscreen-controls__button--primary"
        aria-label="Watch fullscreen with sound"
      >
        <Maximize2 className="size-5" aria-hidden />
        <span>Fullscreen</span>
      </button>
    </div>
  );
}
