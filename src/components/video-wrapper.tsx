'use client';

import React, { useRef, useEffect } from 'react';

interface VideoWrapperProps {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function VideoWrapper({
  src,
  poster,
  className,
  style,
}: VideoWrapperProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set color space attributes to prevent oversaturation
    video.style.colorScheme = 'light dark';
    video.style.colorInterpolationFilters = 'sRGB';
    video.style.imageRendering = 'auto';
    video.style.filter = 'none';
    video.style.webkitFilter = 'none';

    // Add data attributes for color space
    video.setAttribute('data-color-space', 'srgb');
    video.setAttribute('data-color-gamut', 'srgb');
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={className}
      style={style}
      controls
      preload="metadata"
      playsInline
      // Ensure proper color space handling
      data-color-space="srgb"
      data-color-gamut="srgb"
    />
  );
}
